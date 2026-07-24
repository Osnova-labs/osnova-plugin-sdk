# osnova-plugin-sdk

Extension SDK и Developer Kit для Osnova Reborn.

## Статус

Extension Manifest v1, operation handlers, artifact candidates, context
providers, package validation и headless CLI.

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
- `defineExtension`
- `defineTool` / `defineOperation`
- `defineArtifactType` / `defineContextProvider`
- `defineConnector` / `defineModelProvider`
- manifest lint, testkit и portable package format

`definePlugin` сохранен как compatibility API для экспериментального формата
0.1. Новые расширения используют `defineExtension`.

## Шаблон

`templates/basic-plugin` содержит минимальный пакет плагина.

## Связанные репозитории

- `osnova-desktop` загружает плагины и проверяет permissions.
- `osnova-core` предоставляет общие типы проекта.
- `osnova-plugins` содержит каталог плагинов.

## Правила участия

SDK должен оставаться явным и стабильным. Не добавляйте host APIs без понятной permission model и пути enforcement на стороне desktop-клиента.
