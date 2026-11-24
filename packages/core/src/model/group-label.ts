import type { LabelStyle } from "./label-style";

export type GroupLabel = Readonly<{
  custom: boolean;
  text: string;
  style: LabelStyle | null;
}>;
