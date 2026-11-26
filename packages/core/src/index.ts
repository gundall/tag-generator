// API pública de @tag-generator/core: las apps solo importan desde aquí.

// Modelo
export type { Color } from "./model/color";
export type { ColorPair } from "./model/color-pair";
export type { ExportOptions } from "./model/export-options";
export type { FontWeight } from "./model/font-weight";
export type { Group } from "./model/group";
export type { GroupLabel } from "./model/group-label";
export type { LabelStyle } from "./model/label-style";
export type { Palette } from "./model/palette";
export type { State } from "./model/state";
export type { Tag } from "./model/tag";

// Funciones
export { nearestWeight } from "./nearest-weight";
