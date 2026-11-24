---
# Estado: propuesto | rechazado | aceptado | obsoleto | sustituido por [ADR-NNNN](NNNN-titulo.md)
status: aceptado
date: 2026-11-24
---

# Validar los mensajes de commit con hooks nativos de git versionados en `.githooks/`

## Contexto y problema

El proyecto adopta Conventional Commits desde el primer commit y lo valida con commitlint. Para que la validación sea automática, commitlint debe ejecutarse en el hook `commit-msg` de git, que recibe el mensaje y cancela el commit si el script termina con error. Los hooks viven por defecto en `.git/hooks/`, que no se versiona, así que no llegan a quien clona el repositorio.

¿Cómo instalamos y compartimos el hook `commit-msg`?

## Factores de decisión

- **Aprendizaje:** entender cómo funcionan los hooks de git antes de usar herramientas que lo abstraen.
- **Compartición:** el hook debe estar versionado y activarse en cualquier clon sin pasos manuales difíciles de recordar.
- **Dependencias:** número de herramientas y configuración extra que añade cada opción.
- **Escalabilidad:** facilidad para añadir más hooks en el futuro (p. ej. `pre-commit` con lint).

## Opciones consideradas

- Hooks nativos en `.git/hooks/`, sin versionar
- Hooks nativos versionados en `.githooks/` con `core.hooksPath`
- husky
- lefthook

## Decisión

Opción elegida: "Hooks nativos versionados en `.githooks/` con `core.hooksPath`", porque permite entender el mecanismo real de los hooks (aprendizaje), queda versionado en el repo (compartición) y no añade ninguna dependencia. Es, de hecho, lo mismo que husky automatiza.

Convenciones:

- Cada hook es un script de shell en `.githooks/` con el nombre exacto que espera git (`commit-msg`, `pre-commit`…).
- git busca los hooks en esa carpeta gracias a `git config core.hooksPath .githooks`.
- Como `core.hooksPath` es configuración local de cada clon, se aplica automáticamente con un script `prepare` en el `package.json` raíz, que pnpm ejecuta tras `pnpm install`.

### Consecuencias

- Bueno, porque no hay ninguna dependencia extra: solo git y un script de shell.
- Bueno, porque el funcionamiento es transparente: no hay capa intermedia entre git y el script.
- Bueno, porque pasar a husky o lefthook más adelante es sencillo, ya que hacen lo mismo por debajo.
- Malo, porque si alguien clona el repo sin ejecutar `pnpm install`, el hook no se activa.
- Malo, porque añadir hooks más complejos (p. ej. lint solo sobre los ficheros preparados) habrá que escribirlo a mano.
- Neutral, porque los hooks locales se pueden saltar con `git commit --no-verify`; la garantía real llegará con la validación en CI y la protección de `main` (fase 3).

### Confirmación

- Un commit con un mensaje no convencional se rechaza y uno convencional se acepta: `git commit --allow-empty -m "<mensaje>"`.
- En revisión de PR se comprueba que los hooks nuevos se añaden en `.githooks/` y no en otro sitio.

## Más información

- Este ADR no estaba en el plan original del tutorial: surgió en la fase 0 al decidir cómo instalar el hook de commitlint. Los ADR posteriores del tutorial se han renumerado a partir del 0004.
- [Git hooks](https://git-scm.com/docs/githooks)
- [`core.hooksPath`](https://git-scm.com/docs/git-config#Documentation/git-config.txt-corehooksPath)
- [commitlint: local setup](https://commitlint.js.org/guides/local-setup.html)
