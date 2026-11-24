import type { ExportOptions } from "./export-options";
import type { Group } from "./group";
import type { LabelStyle } from "./label-style";
import type { Palette } from "./palette";

export type State = Readonly<{
  palette: Palette;
  groups: readonly Group[];
  labelStyle: LabelStyle;
  exportOptions: ExportOptions;
}>;
