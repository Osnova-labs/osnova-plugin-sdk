import assert from "node:assert/strict";
import { defineExtension, validateExtensionManifest, type ExtensionManifest } from "./index.js";
import { invokeTestOperation } from "./testkit.js";

const manifest: ExtensionManifest = {
  manifestVersion: "1",
  id: "osnova.test.extension",
  name: "Test",
  version: "1.0.0",
  osnova: { minVersion: "0.2.0" },
  permissions: ["artifact:create"],
  contributes: {
    tools: [{ id: "osnova.test.extension.tool", title: "Test" }],
    operations: [
      {
        id: "osnova.test.extension.run",
        toolId: "osnova.test.extension.tool",
        version: "1",
        title: "Run",
        inputSchema: { type: "object", required: ["value"] },
        outputSchema: { type: "object" },
        risk: "project-write",
        agentVisibility: "automatic",
        execution: "immediate",
        idempotent: true,
        permissions: ["artifact:create"]
      }
    ]
  }
};

assert.equal(validateExtensionManifest(manifest).valid, true);
const invalidOci: ExtensionManifest = {
  ...manifest,
  runtimes: [{ id: "osnova.test.extension.oci", kind: "oci", lifecycle: "shared", image: "example.invalid/tool@sha256:deadbeef" }]
};
assert.match(validateExtensionManifest(invalidOci).issues.join("\n"), /must use job lifecycle/);
const remoteWithoutOperationPermission: ExtensionManifest = {
  ...manifest,
  permissions: ["network:use"],
  runtimes: [{ id: "osnova.test.extension.remote", kind: "remote", lifecycle: "job", endpoint: "https://example.invalid/rpc" }],
  contributes: {
    tools: [{ id: "osnova.test.extension.remote-tool", title: "Remote", runtimeId: "osnova.test.extension.remote" }],
    operations: [{ ...manifest.contributes.operations![0], id: "osnova.test.extension.remote-run", toolId: "osnova.test.extension.remote-tool", permissions: [], risk: "safe-read" }]
  }
};
assert.match(validateExtensionManifest(remoteWithoutOperationPermission).issues.join("\n"), /requires network:use permission because of its runtime/);
const nativeWithoutTrust: ExtensionManifest = {
  ...manifest,
  runtimes: [{ id: "osnova.test.extension.native", kind: "native-process", lifecycle: "job", entry: "tool" }]
};
assert.match(validateExtensionManifest(nativeWithoutTrust).issues.join("\n"), /requires native:execute permission/);
const unsafeSchema: ExtensionManifest = {
  ...manifest,
  contributes: {
    ...manifest.contributes,
    operations: [{ ...manifest.contributes.operations![0], inputSchema: { type: "object", properties: { value: { type: "string", pattern: "(a+)+$" } } } }]
  }
};
assert.match(validateExtensionManifest(unsafeSchema).issues.join("\n"), /unsafe or invalid regex/);
const extension = defineExtension({
  manifest,
  operations: {
    "osnova.test.extension.run": ({ input }) => ({ structured: { value: input.value } })
  }
});
const result = await invokeTestOperation(extension, { operationId: "osnova.test.extension.run", input: { value: 42 } });
assert.deepEqual(result.structured, { value: 42 });
await assert.rejects(
  invokeTestOperation(extension, {
    operationId: "osnova.test.extension.run",
    input: { value: 42 },
    grantedPermissions: []
  }),
  /Missing permissions/
);
process.stdout.write("Extension SDK self-test passed.\n");
