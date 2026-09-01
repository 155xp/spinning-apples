"use client";

import { memo, useState } from "react";
import { AppleMark } from "@/components/AppleMark";
import type { AppleSpec } from "@/lib/orchard";

type Props = {
  spec: AppleSpec;
  onToggle: (id: number) => void;
};

function Apple({ spec, onToggle }: Props) {
  const { id, x, y, size, seconds, clockwise, kind, hue, tilt } = spec;
  const dir = clockwise ? "normal" : "reverse";
  const [pulse, setPulse] = useState(0);

  return (
    <button
      type="button"
      className={
        pulse === 0
          ? "apple-anchor"
          : pulse % 2 === 1
            ? "apple-anchor pulse-a"
            : "apple-anchor pulse-b"
      }
      style={{
        left: `${x}%`,
        top: `${y}%`,
        width: size,
        height: size * 1.2,
        zIndex: Math.round(size),
      }}
      onAnimationEnd={(event) => {
        if (event.animationName === "apple-pulse") setPulse(0);
      }}
      onClick={() => {
        setPulse((n) => n + 1);
        onToggle(id);
      }}
      aria-label={`${hue} apple, spinning ${clockwise ? "clockwise" : "counterclockwise"}. Click to reverse.`}
    >
      <span className="apple-nudge">
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
              <span className="slice-row">
                <span className="half-wrap left">
                  <AppleMark uid={`${id}-sl`} hue={hue} face="skin" />
                  <span className="cut-edge" />
                </span>
                <span className="half-wrap right">
                  <AppleMark uid={`${id}-sr`} hue={hue} face="skin" />
                  <span className="cut-edge" />
                </span>
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
      </span>
    </button>
  );
}

export default memo(Apple);
