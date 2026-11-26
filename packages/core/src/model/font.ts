import type { FontWeight } from "./font-weight";

type Font = Readonly<{
  name: string;
  weights: readonly FontWeight[];
  italic: boolean;
}>;

export type FontCatalog = Record<string, Font>;
