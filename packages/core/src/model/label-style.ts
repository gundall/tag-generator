import type { Color } from "./color";

export type LabelStyle = Readonly<{
  font: string;
  weight: 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900;
  italic: boolean;
  uppercase: boolean;
  underline: boolean;
  size: number;
  color: Color;
  align: "left" | "right" | "center";
}>;
