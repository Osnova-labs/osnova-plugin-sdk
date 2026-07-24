import { defineExtension } from "@osnova/plugin-sdk";

export default defineExtension({
  manifest: {
    manifestVersion: "1",
    id: "osnova.example.note-linter",
    name: "Note Linter",
    version: "1.0.0",
    description: "Creates a portable report without writing to the project directly.",
    publisher: "osnova",
    license: "MIT",
    osnova: { minVersion: "0.2.0" },
    permissions: ["artifact:read", "artifact:create"],
    runtimes: [
      {
        id: "osnova.example.note-linter.runtime",
        kind: "node-process",
        lifecycle: "job",
        entry: "dist/index.js"
      }
    ],
    contributes: {
      tools: [
        {
          id: "osnova.example.note-linter.tool",
          title: "Note Linter",
          runtimeId: "osnova.example.note-linter.runtime"
        }
      ],
      artifactTypes: [
        {
          id: "osnova.example.note-linter.report",
          title: "Lint report",
          mediaTypes: ["text/markdown"],
          context: { mode: "automatic" }
        }
      ],
      operations: [
        {
          id: "osnova.example.note-linter.check",
          toolId: "osnova.example.note-linter.tool",
          version: "1",
          title: "Check note",
          inputSchema: { type: "object", properties: {}, additionalProperties: false },
          outputSchema: { type: "object" },
          accepts: ["osnova.note"],
          produces: ["osnova.example.note-linter.report"],
          risk: "project-write",
          agentVisibility: "automatic",
          execution: "job",
          timeoutSeconds: 30,
          cancellable: true,
          idempotent: true,
          permissions: ["artifact:read", "artifact:create"]
        }
      ]
    }
  },
  operations: {
    "osnova.example.note-linter.check": async ({ artifacts, outboxPath }) => ({
      structured: { checked: artifacts.length },
      artifacts: [
        {
          type: "osnova.example.note-linter.report",
          title: "Lint report",
          payloads: [{ path: "report.md", mediaType: "text/markdown" }]
        }
      ]
    })
  }
});
