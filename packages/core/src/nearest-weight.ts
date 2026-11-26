import type { FontWeight } from "./model/font-weight";

export const FALLBACK_WEIGHT: FontWeight = 400;
export function nearestWeight(
  availableWeights: readonly FontWeight[],
  target: number,
) {
  if (availableWeights.length === 0) return FALLBACK_WEIGHT;
  return availableWeights.reduce((best, w) =>
    Math.abs(w - target) < Math.abs(best - target) ? w : best,
  );
}
