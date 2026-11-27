import { describe, expect, it } from "vitest";
import { normalizeGroupLabel } from "./normalize-group-label";
import { DEFAULT_GROUP_LABEL } from "./model/group-label";
import { DEFAULT_STYLE } from "./model/label-style";

describe("normalizeGroupLabel", () => {
  it("Must return a default group label if label not exists, if it's not an object, or if it is null or an array", () => {
    expect(normalizeGroupLabel()).toEqual(DEFAULT_GROUP_LABEL);
    expect(normalizeGroupLabel(null)).toEqual(DEFAULT_GROUP_LABEL);
    expect(normalizeGroupLabel("casa")).toEqual(DEFAULT_GROUP_LABEL);
    expect(normalizeGroupLabel(234)).toEqual(DEFAULT_GROUP_LABEL);
    expect(normalizeGroupLabel(["carros", 423])).toEqual(DEFAULT_GROUP_LABEL);
  });
  it("Must return the same passed object if style: null is passed", () => {
    expect(
      normalizeGroupLabel({
        text: "Test prueba 1",
        custom: false,
        style: null,
      }),
    ).toEqual({
      text: "Test prueba 1",
      custom: false,
      style: null,
    });
  });
  it("Must return an object with a normalized style", () => {
    expect(
      normalizeGroupLabel({
        text: "Test prueba 2",
        custom: true,
        style: { size: 24 },
      }),
    ).toEqual({
      text: "Test prueba 2",
      custom: true,
      style: { ...DEFAULT_STYLE, size: 24 },
    });
  });
  it("Must respect the style", () => {
    expect(
      normalizeGroupLabel({
        text: "Test prueba 3",
        custom: false,
        style: {
          ...DEFAULT_STYLE,
          color: "#fff",
        },
      }),
    ).toEqual({
      text: "Test prueba 3",
      custom: false,
      style: { ...DEFAULT_STYLE, color: "#fff" },
    });
  });
  it("Must return an empty text when the text provided is not of type string", () => {
    expect(
      normalizeGroupLabel({
        text: 234,
        custom: true,
        style: false,
      }),
    ).toEqual({
      text: "",
      custom: true,
      style: null,
    });
  });
  it("Must return custom: false when the custom property provided is not boolean", () => {
    expect(
      normalizeGroupLabel({
        custom: "no",
      }),
    ).toEqual({
      text: "",
      custom: false,
      style: null,
    });
  });
  it("LEGACY LABELS: Must return custom: true and the customized style", () => {
    expect(
      normalizeGroupLabel({
        text: "Test prueba 4",
        size: 24,
      }),
    ).toEqual({
      text: "Test prueba 4",
      custom: true,
      style: { ...DEFAULT_STYLE, size: 24 },
    });
  });
  it("LEGACY LABELS: Must return custom: false and style: null if no style is passed", () => {
    expect(
      normalizeGroupLabel({
        text: "Test prueba 5",
      }),
    ).toEqual({
      text: "Test prueba 5",
      custom: false,
      style: null,
    });
  });
  it("LEGACY LABELS: Must return custom: false and style: null if we pass an style property directly on the object, and its value matches the default value", () => {
    expect(
      normalizeGroupLabel({
        text: "Test prueba 6",
        size: 18,
      }),
    ).toEqual({
      text: "Test prueba 6",
      custom: false,
      style: null,
    });
  });
  it("LEGACY LABELS: Must return custom: true and style filled with a max/min value of the properties provided, if there are ones", () => {
    expect(
      normalizeGroupLabel({
        text: "Test prueba 7",
        size: 200,
      }),
    ).toEqual({
      text: "Test prueba 7",
      custom: true,
      style: { ...DEFAULT_STYLE, size: 96 },
    });
  });
});
