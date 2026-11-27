import { DEFAULT_GROUP_LABEL, type GroupLabel } from "./model/group-label";
import { DEFAULT_STYLE, type LabelStyle } from "./model/label-style";
import { normalizeStyle } from "./normalize-style";

export function normalizeGroupLabel(label?: unknown): GroupLabel {
  if (typeof label !== "object" || label === null || Array.isArray(label))
    return DEFAULT_GROUP_LABEL;

  const l = label as Record<string, unknown>;

  if ("custom" in l) {
    return {
      text: typeof l.text === "string" ? l.text : "",
      custom: typeof l.custom === "boolean" && l.custom,
      style: l.style ? normalizeStyle(l.style) : null,
    };
  }

  const normalizedStyle = normalizeStyle(l);
  const custom = (Object.keys(DEFAULT_STYLE) as (keyof LabelStyle)[]).some(
    (key) => normalizedStyle[key] !== DEFAULT_STYLE[key],
  );
  return {
    text: typeof l.text === "string" ? l.text : "",
    custom,
    style: custom ? normalizedStyle : null,
  };
}
