import type { ColorPair } from "./color-pair";
import type { GroupLabel } from "./group-label";
import type { Tag } from "./tag";

export type Group = Readonly<{
  id: number;
  tags: readonly Tag[];
  color: ColorPair | null;
  label: GroupLabel;
}>;
