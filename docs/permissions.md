# Permissions

Permissions объявляются в plugin manifest и проверяются host.

## Начальные permissions

- `project:read`
- `project:write`
- `notes:read`
- `notes:write`
- `assets:read`
- `assets:write`
- `commands:register`
- `ai:use`

Desktop-клиент должен проверять permissions до передачи host APIs в plugin code.
