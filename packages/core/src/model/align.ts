export const ALIGNS = ["left", "center", "right"] as const;

export type Align = (typeof ALIGNS)[number]; // "left" | "center" | "right"

export function isAlign(value: unknown): value is Align {
  return ALIGNS.includes(value as Align);
}
