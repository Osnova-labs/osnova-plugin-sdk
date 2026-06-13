# osnova-plugin-sdk

Минимальный TypeScript SDK для плагинов Osnova.

## Статус

Стартовая основа SDK.

## Лицензия

MIT.

## Команды

```bash
pnpm install
pnpm build
pnpm typecheck
```

## Поверхность SDK

- `definePlugin`
- `PluginManifest`
- объявления permissions
- черновик регистрации команд
- черновик host context

## Шаблон

`templates/basic-plugin` содержит минимальный пакет плагина.

## Связанные репозитории

- `osnova-desktop` загружает плагины и проверяет permissions.
- `osnova-core` предоставляет общие типы проекта.
- `osnova-plugins` содержит каталог плагинов.

## Правила участия

SDK должен оставаться явным и стабильным. Не добавляйте host APIs без понятной permission model и пути enforcement на стороне desktop-клиента.
