import type { LabelStyle } from "./label-style";

export const DEFAULT_GROUP_LABEL: GroupLabel = {
  text: "",
  custom: false,
  style: null,
};

export type GroupLabel = Readonly<{
  custom: boolean;
  text: string;
  style: LabelStyle | null;
}>;
