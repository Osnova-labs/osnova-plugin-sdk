import { definePlugin } from "@osnova/plugin-sdk";

export default definePlugin({
  manifest: {
    id: "basic-plugin",
    name: "Basic Plugin",
    version: "0.1.0",
    entry: "src/index.ts",
    permissions: ["commands:register"],
    osnova: {
      minVersion: "0.1.0"
    }
  },
  activate(context) {
    context.commands.register({
      id: "basic-plugin.hello",
      title: "Hello",
      run(commandContext) {
        commandContext.ui.notify("Hello from Basic Plugin");
      }
    });
  }
});
