import { describe, expect, it } from "vitest";
import { FALLBACK_WEIGHT, nearestWeight } from "./nearest-weight";
import type { FontWeight } from "./model/font-weight";

const LISTA_PROVISIONAL_WEIGHTS: readonly FontWeight[] = [400, 700];

describe("nearestWeight", () => {
  it("Devuelve un weight por defecto si la lista está vacía", () => {
    expect(nearestWeight([], 700)).toBe(FALLBACK_WEIGHT);
    expect(nearestWeight([], 500)).toBe(FALLBACK_WEIGHT);
  });
  it("Devuelve el weight solicitado si está disponible", () => {
    expect(nearestWeight(LISTA_PROVISIONAL_WEIGHTS, 700)).toBe(700);
  });
  it("Devuelve el más cercano al número dado", () => {
    expect(nearestWeight(LISTA_PROVISIONAL_WEIGHTS, 654)).toBe(700);
  });
  it("Devuelve el primer número de la lista si el dado es menor", () => {
    expect(nearestWeight(LISTA_PROVISIONAL_WEIGHTS, 1)).toBe(400);
  });
  it("Devuelve el último número de la lista si el dado es mayor", () => {
    expect(nearestWeight(LISTA_PROVISIONAL_WEIGHTS, 100000)).toBe(700);
  });
  it("Resuelve el empate con el elemento que aparece primero en la lista", () => {
    expect(nearestWeight(LISTA_PROVISIONAL_WEIGHTS, 550)).toBe(400);
  });
});
