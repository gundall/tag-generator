---
# Estado: propuesto | rechazado | aceptado | obsoleto | sustituido por [ADR-NNNN](NNNN-titulo.md)
status: aceptado
date: 2026-11-21
---

# Usar pnpm workspaces sin orquestador de tareas para la gestión del monorepo

## Contexto y problema

El monorepo tendrá un paquete de dominio (packages/core) y varias apps que dependen de él (apps/web, apps/desktop, apps/api y apps/admin). pnpm workspaces ya enlaza los paquetes locales entre sí, ejecuta scripts en todos ellos y respeta el orden de dependencias, pero repite cada tarea entera aunque el paquete no haya cambiado. Los orquestadores de tareas como Turborepo o Nx añaden caché y ejecución solo de lo afectado, a cambio de más configuración y más abstracción. Todavía no sabemos en qué momento el tamaño del repo hará que el CI vaya lento.

¿Basta con pnpm workspaces o conviene añadir desde el principio un orquestador de tareas?

<!-- Opcional -->

## Factores de decisión

- **Aprendizaje:** entender cómo funciona un monorepo con pnpm workspaces (enlaces, scripts recursivos, filtros) antes de usar herramientas que lo abstraen.
- **Reversibilidad:** coste de cambiar de opinión más adelante, tanto para añadir como para quitar la herramienta.
- **Complejidad:** configuración, convenciones propias y conceptos nuevos que introduce cada opción.
- **Tiempo de CI:** el repo tiene un número de paquetes acotado (5) y pequeño; el ahorro de una caché debe compensar su coste.

## Opciones consideradas

- pnpm workspaces sin orquestador
- pnpm workspaces + Turborepo
- pnpm workspaces + Nx

## Decisión

Opción elegida: "pnpm workspaces sin orquestador", porque es la que más favorece el aprendizaje de los fundamentos, y la que resta complejidad a la cantidad de conocimientos que hay que adquirir inicialmente. Además, porque añadir un orquestador más adelante es barato (reversibilidad) y con cinco paquetes el ahorro de caché todavía no compensa (tiempo de CI).

<!-- Opcional -->

### Consecuencias

- Bueno, porque permitirá aprender de forma secuencial primero los fundamentos de pnpm, y más adelante usarlos como base para entender los de los orquestadores de tareas.
- Bueno, porque pasar a usar Turborepo es añadir turbo.json y modificar algunos scripts, no tiene gran impacto.
- Malo, porque cualquier cambio en una aplicación o paquete repetirá todos los scripts en todos, salvo que lo mitiguemos (lo cual requerirá filtrado a mano).
- Malo, porque habrá que mantener a mano estos filtrados de mitigación que vendrían ya declarados en la configuración del orquestador.
- Neutral, porque esta decisión se revisará con un ADR nuevo si la ejecución habitual del CI supera los 10 minutos.

<!-- Opcional -->

### Confirmación

Se comprueba en revisión de PR que no existen ni turbo.json ni nx.json en directorio base del proyecto, que no tengamos ninguna dependencia de Turborepo o Nx en el package.json, y revisar periódicamente la duración de las ejecuciones de CI en GitHub Actions frente al umbral de revisión.
