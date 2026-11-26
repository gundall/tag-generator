export type Color = `#${string}`;

export function isColor(value: unknown): value is Color {
  return typeof value === "string" && /^#([a-fA-F0-9]{3}){1,2}$/.test(value);
}
