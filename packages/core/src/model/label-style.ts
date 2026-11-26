import type { Align } from "./align";
import type { Color } from "./color";
import type { FontWeight } from "./font-weight";

export type LabelStyle = Readonly<{
  font: string;
  weight: FontWeight;
  italic: boolean;
  uppercase: boolean;
  underline: boolean;
  size: number;
  color: Color;
  align: Align;
}>;
