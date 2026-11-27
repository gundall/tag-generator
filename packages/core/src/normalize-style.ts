import { isAlign } from "./model/align";
import { isColor } from "./model/color";
import type { FontCatalog } from "./model/font";
import type { FontWeight } from "./model/font-weight";
import { DEFAULT_STYLE, type LabelStyle } from "./model/label-style";
import { nearestWeight } from "./nearest-weight";

export const ALL_WEIGHTS: FontWeight[] = [
  100, 200, 300, 400, 500, 600, 700, 800, 900,
];
export const FONTS: FontCatalog = {
  inter: { name: "Inter", weights: ALL_WEIGHTS, italic: true },
  roboto: { name: "Roboto", weights: ALL_WEIGHTS, italic: true },
  montserrat: { name: "Montserrat", weights: ALL_WEIGHTS, italic: true },
  poppins: { name: "Poppins", weights: ALL_WEIGHTS, italic: true },
  "open-sans": {
    name: "Open Sans",
    weights: [300, 400, 500, 600, 700, 800],
    italic: true,
  },
  lato: { name: "Lato", weights: [100, 300, 400, 700, 900], italic: true },
  nunito: {
    name: "Nunito",
    weights: [200, 300, 400, 500, 600, 700, 800, 900],
    italic: true,
  },
  raleway: { name: "Raleway", weights: ALL_WEIGHTS, italic: true },
  "dm-sans": { name: "DM Sans", weights: ALL_WEIGHTS, italic: true },
  "space-grotesk": {
    name: "Space Grotesk",
    weights: [300, 400, 500, 600, 700],
    italic: false,
  },
  oswald: {
    name: "Oswald",
    weights: [200, 300, 400, 500, 600, 700],
    italic: false,
  },
  "bebas-neue": { name: "Bebas Neue", weights: [400], italic: false },
  "playfair-display": {
    name: "Playfair Display",
    weights: [400, 500, 600, 700, 800, 900],
    italic: true,
  },
  merriweather: {
    name: "Merriweather",
    weights: [300, 400, 500, 600, 700, 800, 900],
    italic: true,
  },
  "source-serif-4": {
    name: "Source Serif 4",
    weights: [200, 300, 400, 500, 600, 700, 800, 900],
    italic: true,
  },
  caveat: { name: "Caveat", weights: [400, 500, 600, 700], italic: false },
};

export function normalizeStyle(style: unknown): LabelStyle {
  if (typeof style !== "object" || style === null || Array.isArray(style))
    return DEFAULT_STYLE;

  const s = style as Record<string, unknown>;

  const font =
    typeof s.font === "string" && Object.hasOwn(FONTS, s.font)
      ? s.font
      : DEFAULT_STYLE.font;
  const fontInfo = FONTS[font];

  const normalizedStyle: LabelStyle = {
    font: font,
    weight: nearestWeight(
      fontInfo.weights,
      Number(s.weight) || DEFAULT_STYLE.weight,
    ),
    italic: s.italic === true && fontInfo.italic,
    size: Math.min(96, Math.max(8, Number(s.size) || DEFAULT_STYLE.size)),
    align: isAlign(s.align) ? s.align : DEFAULT_STYLE.align,
    color: isColor(s.color) ? s.color : DEFAULT_STYLE.color,
    uppercase:
      typeof s.uppercase === "boolean" ? s.uppercase : DEFAULT_STYLE.uppercase,
    underline:
      typeof s.underline === "boolean" ? s.underline : DEFAULT_STYLE.underline,
  };

  return normalizedStyle;
}
