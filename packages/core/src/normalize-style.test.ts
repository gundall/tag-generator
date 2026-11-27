import { describe, expect, it } from "vitest";
import { normalizeStyle } from "./normalize-style";
import { DEFAULT_STYLE } from "./model/label-style";

describe("normalizeStyle", () => {
  it("Trae el objeto por defecto si mandamos algo que no sea object", () => {
    expect(normalizeStyle(false)).toEqual(DEFAULT_STYLE);
    expect(normalizeStyle(0)).toEqual(DEFAULT_STYLE);
  });
  it("Trae el objeto por defecto si mandamos null", () => {
    expect(normalizeStyle(null)).toEqual(DEFAULT_STYLE);
  });
  it("Trae el objeto por defecto si mandamos un array", () => {
    expect(normalizeStyle([])).toEqual(DEFAULT_STYLE);
  });
  it("Usa la fuente por defecto si la fuente es una propiedad heredada", () => {
    expect(normalizeStyle({ font: "toString" })).toEqual(DEFAULT_STYLE);
  });
  it("Trae la fuente solicitada y los datos derivados de esta", () => {
    expect(normalizeStyle({ font: "roboto" })).toEqual({
      ...DEFAULT_STYLE,
      font: "roboto",
      weight: 700,
      italic: false,
    });
    expect(
      normalizeStyle({ font: "caveat", weight: 200, italic: true }),
    ).toEqual({
      ...DEFAULT_STYLE,
      font: "caveat",
      weight: 400,
      italic: false,
    });
    expect(
      normalizeStyle({ font: "poppins", weight: 200, italic: true }),
    ).toEqual({
      ...DEFAULT_STYLE,
      font: "poppins",
      weight: 200,
      italic: true,
    });
  });
  it("Trae el weight por defecto si no está permitido", () => {
    expect(normalizeStyle({ weight: "acc" })).toEqual({
      ...DEFAULT_STYLE,
    });
    expect(normalizeStyle({ weight: "200" })).toEqual({
      ...DEFAULT_STYLE,
      weight: 200,
    });
  });
  it("Trae el tamaño solicitado", () => {
    expect(normalizeStyle({ size: 56 })).toEqual({
      ...DEFAULT_STYLE,
      size: 56,
    });
  });
  it("Trae el tamaño máximo o mínimo si nos pasamos o nos quedamos cortos, respectivamente", () => {
    expect(normalizeStyle({ size: 124 })).toEqual({
      ...DEFAULT_STYLE,
      size: 96,
    });
    expect(normalizeStyle({ size: 1 })).toEqual({
      ...DEFAULT_STYLE,
      size: 8,
    });
  });
  it("Trae el align solicitado", () => {
    expect(normalizeStyle({ align: "center" })).toEqual({
      ...DEFAULT_STYLE,
      align: "center",
    });
  });
  it("Trae align por defecto si no es válido", () => {
    expect(normalizeStyle({ align: "ritgh" })).toEqual({
      ...DEFAULT_STYLE,
      align: "left",
    });
  });
  it("Trae el color por defecto si no es válido", () => {
    expect(normalizeStyle({ color: "morado" })).toEqual({
      ...DEFAULT_STYLE,
    });
    expect(normalizeStyle({ color: ["#fff"] })).toEqual({
      ...DEFAULT_STYLE,
    });
  });
  it("Trae el color solicitado", () => {
    expect(normalizeStyle({ color: "#000000" })).toEqual({
      ...DEFAULT_STYLE,
      color: "#000000",
    });
    expect(normalizeStyle({ color: "#333" })).toEqual({
      ...DEFAULT_STYLE,
      color: "#333",
    });
  });
  it("uppercase se conserva y valor extraño devuelve por defecto", () => {
    expect(normalizeStyle({ uppercase: true })).toEqual({
      ...DEFAULT_STYLE,
      uppercase: true,
    });
    expect(normalizeStyle({ uppercase: "yes" })).toEqual({
      ...DEFAULT_STYLE,
    });
  });
  it("underline se conserva y valor extraño devuelve por defecto", () => {
    expect(normalizeStyle({ underline: true })).toEqual({
      ...DEFAULT_STYLE,
      underline: true,
    });
    expect(normalizeStyle({ underline: "yes" })).toEqual({
      ...DEFAULT_STYLE,
    });
  });
});
