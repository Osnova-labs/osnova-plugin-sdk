# Черновик Commands API

Плагины регистрируют команды во время activation.

```ts
context.commands.register({
  id: "basic-plugin.hello",
  title: "Hello",
  run(commandContext) {
    commandContext.ui.notify("Hello from plugin");
  }
});
```

## Правила

- Command IDs должны быть глобально уникальными.
- Command IDs должны иметь префикс plugin ID.
- Команды могут использовать только возможности, покрытые заявленными permissions.
- Host отвечает за отображение команд, выполнение и обработку ошибок.
