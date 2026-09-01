"use client";

import { memo } from "react";
import { AppleMark } from "@/components/AppleMark";
import type { AppleSpec } from "@/lib/orchard";

type Props = {
  spec: AppleSpec;
  onToggle: (id: number) => void;
};

function Apple({ spec, onToggle }: Props) {
  const { id, x, y, size, seconds, clockwise, kind, hue, tilt } = spec;
  const dir = clockwise ? "normal" : "reverse";

  return (
    <button
      type="button"
      className="apple-anchor"
      style={{
        left: `${x}%`,
        top: `${y}%`,
        width: size,
        height: size * 1.2,
        zIndex: Math.round(size),
      }}
      onClick={() => onToggle(id)}
      aria-label={`${hue} apple, spinning ${clockwise ? "clockwise" : "counterclockwise"}. Click to reverse.`}
    >
      <span
        className="apple-scene"
        style={{ ["--tilt" as string]: `${tilt}deg` }}
      >
        {kind === "sliced" ? (
          <span
            className="apple-spin sliced"
            style={{
              animationDuration: `${seconds}s`,
              animationDirection: dir,
            }}
          >
            <span className="lobe left">
              <span className="card front clip-left">
                <AppleMark uid={`${id}-sl`} hue={hue} face="skin" />
              </span>
              <span className="card back clip-left">
                <AppleMark uid={`${id}-slb`} hue={hue} face="skin" />
              </span>
              <span className="slab" />
            </span>
            <span className="lobe right">
              <span className="card front clip-right">
                <AppleMark uid={`${id}-sr`} hue={hue} face="skin" />
              </span>
              <span className="card back clip-right">
                <AppleMark uid={`${id}-srb`} hue={hue} face="skin" />
              </span>
              <span className="slab" />
            </span>
          </span>
        ) : (
          <span
            className="apple-spin"
            style={{
              animationDuration: `${seconds}s`,
              animationDirection: dir,
            }}
          >
            <span className="card front">
              <AppleMark
                uid={`${id}-f`}
                hue={hue}
                face={kind === "half" ? "flesh" : "skin"}
              />
            </span>
            <span className="card back">
              <AppleMark uid={`${id}-b`} hue={hue} face="skin" />
            </span>
          </span>
        )}
      </span>
    </button>
  );
}

export default memo(Apple);
