---
# Estado: propuesto | rechazado | aceptado | obsoleto | sustituido por [ADR-NNNN](NNNN-titulo.md)
status: aceptado
date: 2026-11-21
---

# Registrar las decisiones de arquitectura con ADRs en formato MADR

## Contexto y problema

Este proyecto migra `legacy/tag_generator.html` a un monorepo con varias apps (web, escritorio, API, admin) a lo largo de muchas fases. Por el camino hay que tomar decisiones que cuestan de revertir y que dependen unas de otras: herramienta de monorepo, ORM, autenticación, despliegue… ¿Cómo dejamos constancia de **qué** se decidió, **por qué** y **qué se descartó**, para que se entienda meses después sin depender de la memoria?

## Factores de decisión

- Es un proyecto de aprendizaje y de portfolio: el razonamiento importa tanto como el resultado.
- Las decisiones deben vivir junto al código, versionadas y revisables en PR.
- La mayoría de decisiones comparan varias herramientas, así que hay que registrar las alternativas descartadas.
- Poco coste de mantenimiento: un solo autor, sin herramientas extra.

## Opciones consideradas

- ADRs en el repo con la plantilla MADR
- ADRs en el repo con la plantilla de Nygard
- Wiki de GitHub
- Sin documento específico: mensajes de commit y descripciones de PR

## Decisión

Opción elegida: "ADRs en el repo con la plantilla MADR", porque es la única que cumple a la vez vivir junto al código y registrar explícitamente las opciones descartadas con sus pros y contras.

Convenciones:

- Los ADRs están en `docs/adr/`.
- Nombre del fichero: `NNNN-titulo-en-kebab-case.md`, con numeración correlativa de cuatro cifras.
- Cada ADR nuevo parte de [`template.md`](template.md). Las secciones marcadas como opcionales se pueden borrar.
- Un ADR aceptado no se reescribe. Si la decisión cambia, se crea un ADR nuevo y el anterior pasa a `sustituido por [ADR-NNNN](...)`.
- Merece un ADR cualquier decisión cara de revertir o que haga preguntar "¿por qué está hecho así?". Los detalles de implementación no lo necesitan.

### Consecuencias

- Bueno, porque el historial de decisiones queda versionado con el código y se revisa en el mismo PR que lo implementa.
- Bueno, porque obliga a comparar alternativas antes de elegir, y no a elegir por inercia.
- Malo, porque añade trabajo de escritura en cada decisión relevante.
- Malo, porque nada impide que un ADR quede desactualizado si se olvida crear el que lo sustituye.

### Confirmación

En la revisión de cada PR que introduce una herramienta o un cambio estructural, se comprueba que exista el ADR correspondiente.

## Pros y contras de las opciones

### ADRs en el repo con la plantilla MADR

- Bueno, porque tiene una sección específica para las opciones consideradas y sus pros y contras.
- Bueno, porque es Markdown versionado en git.
- Neutral, porque es más larga que Nygard, aunque las secciones opcionales se pueden quitar.

### ADRs en el repo con la plantilla de Nygard

- Bueno, porque es la plantilla más corta y conocida.
- Malo, porque no tiene un sitio explícito para las alternativas descartadas.

### Wiki de GitHub

- Bueno, porque es fácil de editar desde el navegador.
- Malo, porque vive fuera del repo principal: no se revisa en los PR ni sigue las ramas.

### Mensajes de commit y descripciones de PR

- Bueno, porque no requiere ningún esfuerzo adicional.
- Malo, porque el razonamiento queda disperso y es difícil de encontrar después.
- Malo, porque no hay sitio natural para las opciones descartadas.

## Más información

- [adr.github.io](https://adr.github.io/)
- [MADR](https://adr.github.io/madr/)
- [Documenting Architecture Decisions, Michael Nygard](https://cognitect.com/blog/2011/11/15/documenting-architecture-decisions)
