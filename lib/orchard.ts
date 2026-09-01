export type AppleKind = "whole" | "half" | "sliced";
export type AppleHue = "crimson" | "forest" | "honey";

export type AppleSpec = {
  id: number;
  x: number;
  y: number;
  size: number;
  seconds: number;
  clockwise: boolean;
  kind: AppleKind;
  hue: AppleHue;
  tilt: number;
};

const KINDS: AppleKind[] = ["whole", "half", "sliced", "sliced", "whole"];
const HUES: AppleHue[] = ["crimson", "crimson", "crimson", "forest", "honey"];

export function mulberry32(seed: number) {
  let a = seed >>> 0;
  return () => {
    a += 0x6d2b79f5;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export function createApple(id: number, rand: () => number): AppleSpec {
  return {
    id,
    x: 12 + rand() * 76,
    y: 12 + rand() * 62,
    size: 86 + rand() * 92,
    seconds: 4.2 + rand() * 7.5,
    clockwise: rand() > 0.45,
    kind: KINDS[Math.floor(rand() * KINDS.length)] ?? "whole",
    hue: HUES[Math.floor(rand() * HUES.length)] ?? "crimson",
    tilt: (rand() - 0.5) * 18,
  };
}

export function createOrchard(count: number, seed = 20260901): AppleSpec[] {
  const rand = mulberry32(seed);
  return Array.from({ length: count }, (_, i) => createApple(i + 1, rand));
}

export const MIN_APPLES = 1;
export const MAX_APPLES = 36;
export const INITIAL_APPLES = 7;
