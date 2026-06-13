export type Permission =
  | "project:read"
  | "project:write"
  | "notes:read"
  | "notes:write"
  | "assets:read"
  | "assets:write"
  | "commands:register"
  | "ai:use";

export interface PluginManifest {
  id: string;
  name: string;
  version: string;
  description?: string;
  entry: string;
  permissions: Permission[];
  osnova: {
    minVersion: string;
  };
}

export interface CommandDefinition {
  id: string;
  title: string;
  description?: string;
  run: CommandHandler;
}

export type CommandHandler = (context: CommandContext) => Promise<void> | void;

export interface CommandContext {
  project?: {
    rootPath: string;
    manifest: unknown;
  };
  ui: {
    notify(message: string): void;
  };
}

export interface CommandsApi {
  register(command: CommandDefinition): void;
}

export interface PluginContext {
  manifest: PluginManifest;
  commands: CommandsApi;
}

export interface OsnovaPlugin {
  manifest: PluginManifest;
  activate(context: PluginContext): Promise<void> | void;
  deactivate?(): Promise<void> | void;
}

export function definePlugin(plugin: OsnovaPlugin): OsnovaPlugin {
  return plugin;
}
