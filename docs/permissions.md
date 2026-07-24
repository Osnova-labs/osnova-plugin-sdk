# Permissions and risk

Extension Manifest v1 can request:

- `project:read`
- `artifact:read`
- `artifact:create`
- `network:use`
- `models:use`
- `models:install`
- `compute:gpu`
- `native:execute`
- `external:apps`
- `secrets:read`
- `background:run`

An operation cannot request a permission absent from its package manifest.
The host also derives effective permissions from the selected runtime. Remote or
network-enabled runtimes add `network:use`, GPU adds `compute:gpu`, model mounts
add `models:use`, and a native process adds `native:execute`. Omitting them from
an Operation never weakens host policy.

Permissions are an upper bound, not automatic approval. Each invocation is also
classified as `safe-read`, `project-write`, `network-egress`,
`external-side-effect` or `privileged`. The last three require a user decision or
a saved rule scoped to the project and operation.

Node permissions reduce accidental access but do not make arbitrary JavaScript a
secure sandbox. Unsigned native or node packages require explicit trust; OCI is
the isolation option for untrusted heavy runtimes.
