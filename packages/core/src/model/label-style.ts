import type { Align } from "./align";
import type { Color } from "./color";
import type { FontWeight } from "./font-weight";

export const DEFAULT_STYLE: LabelStyle = {
  font: "inter",
  weight: 700,
  italic: false,
  uppercase: false,
  underline: false,
  size: 18,
  color: "#0F172A",
  align: "left",
};

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
