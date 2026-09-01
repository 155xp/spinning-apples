import type { AppleHue } from "@/lib/orchard";

export const SKIN: Record<
  AppleHue,
  { mid: string; dark: string; light: string; blush: string }
> = {
  crimson: {
    mid: "#c4122e",
    dark: "#6d0b1a",
    light: "#ef3d52",
    blush: "#ff7a86",
  },
  forest: {
    mid: "#5c8f28",
    dark: "#2f4d14",
    light: "#86b84a",
    blush: "#c6e07a",
  },
  honey: {
    mid: "#e0a21a",
    dark: "#8a5c0c",
    light: "#f3c64a",
    blush: "#ffe7a3",
  },
};

export const APPLE_PATH =
  "M50 19.5C50 19.5 47.4 6.2 36.8 8.1C42.9 2.6 52.6 8.4 54.4 17.4C67.8 6 89.2 16.8 87.6 45.8C86.1 77.4 70 102.8 50 110.6C30 102.8 13.9 77.4 12.4 45.8C10.8 16.8 32.2 6 45.6 17.4C47.2 7.4 57.4 2 64.2 7.6C53.6 6.2 50 19.5 50 19.5Z";

type MarkProps = {
  hue: AppleHue;
  face: "skin" | "flesh";
  uid: string;
};

export function AppleMark({ hue, face, uid }: MarkProps) {
  const c = SKIN[hue];
  const gid = `g-${uid}`;

  return (
    <svg viewBox="0 0 100 120" aria-hidden="true" className="apple-mark">
      <defs>
        <radialGradient id={`${gid}-body`} cx="34%" cy="30%" r="72%">
          <stop offset="0%" stopColor={c.light} />
          <stop offset="42%" stopColor={c.mid} />
          <stop offset="100%" stopColor={c.dark} />
        </radialGradient>
        <radialGradient id={`${gid}-flesh`} cx="48%" cy="42%" r="70%">
          <stop offset="0%" stopColor="#fff6e0" />
          <stop offset="55%" stopColor="#f3e2bc" />
          <stop offset="100%" stopColor="#e2c894" />
        </radialGradient>
        <linearGradient id={`${gid}-leaf`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#8ec85a" />
          <stop offset="100%" stopColor="#2f5a1c" />
        </linearGradient>
      </defs>

      {face === "skin" ? (
        <path d={APPLE_PATH} fill={`url(#${gid}-body)`} />
      ) : (
        <>
          <path d={APPLE_PATH} fill={`url(#${gid}-flesh)`} />
          <path
            d={APPLE_PATH}
            fill="none"
            stroke={c.mid}
            strokeWidth="3.4"
            strokeLinejoin="round"
          />
          <ellipse cx="50" cy="64" rx="7.2" ry="11" fill="#d7b57a" opacity="0.55" />
          <ellipse cx="50" cy="64" rx="3.1" ry="8.4" fill="#c49a5a" opacity="0.7" />
          <g fill="#2a1b10">
            <ellipse cx="50" cy="52.2" rx="1.35" ry="2.5" />
            <ellipse
              cx="58.4"
              cy="58.6"
              rx="1.35"
              ry="2.5"
              transform="rotate(68 58.4 58.6)"
            />
            <ellipse
              cx="55.4"
              cy="69.4"
              rx="1.35"
              ry="2.5"
              transform="rotate(140 55.4 69.4)"
            />
            <ellipse
              cx="44.6"
              cy="69.4"
              rx="1.35"
              ry="2.5"
              transform="rotate(-140 44.6 69.4)"
            />
            <ellipse
              cx="41.6"
              cy="58.6"
              rx="1.35"
              ry="2.5"
              transform="rotate(-68 41.6 58.6)"
            />
          </g>
        </>
      )}

      <path
        d="M51 23C50.2 12 56 4.2 66 1.4"
        fill="none"
        stroke="#3b2414"
        strokeWidth="2.4"
        strokeLinecap="round"
      />
      <path
        d="M54 17C74 4 94 18 80 34C72 25 62 22 54 17Z"
        fill={`url(#${gid}-leaf)`}
      />
      <path
        d="M62 20C70 14 78 20 74 26"
        fill="none"
        stroke="#1f3d12"
        strokeWidth="0.8"
        strokeLinecap="round"
        opacity="0.55"
      />

      {face === "skin" ? (
        <>
          <ellipse
            cx="33"
            cy="44"
            rx="13"
            ry="20"
            fill="#fff"
            opacity="0.2"
            transform="rotate(-22 33 44)"
          />
          <ellipse
            cx="72"
            cy="70"
            rx="3.2"
            ry="2.1"
            fill={c.dark}
            opacity="0.45"
            transform="rotate(18 72 70)"
          />
          <circle cx="68" cy="58" r="1.15" fill={c.dark} opacity="0.35" />
          <circle cx="76" cy="63" r="0.8" fill={c.dark} opacity="0.3" />
        </>
      ) : null}
    </svg>
  );
}
