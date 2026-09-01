"use client";

import { useCallback, useEffect, useId, useRef, useState } from "react";
import Apple from "@/components/Apple";
import {
  createApple,
  createOrchard,
  INITIAL_APPLES,
  MAX_APPLES,
  MIN_APPLES,
  type AppleSpec,
} from "@/lib/orchard";

export default function Orchard() {
  const [apples, setApples] = useState<AppleSpec[]>(() =>
    createOrchard(INITIAL_APPLES),
  );
  const nextId = useRef(INITIAL_APPLES + 1);
  const live = useId();

  const add = useCallback(() => {
    setApples((current) => {
      if (current.length >= MAX_APPLES) return current;
      const id = nextId.current;
      nextId.current += 1;
      return [...current, createApple(id, Math.random)];
    });
  }, []);

  const remove = useCallback(() => {
    setApples((current) =>
      current.length <= MIN_APPLES ? current : current.slice(0, -1),
    );
  }, []);

  const toggle = useCallback((id: number) => {
    setApples((current) =>
      current.map((apple) =>
        apple.id === id ? { ...apple, clockwise: !apple.clockwise } : apple,
      ),
    );
  }, []);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "+" || event.key === "=" || event.key === "ArrowUp") {
        event.preventDefault();
        add();
      }
      if (event.key === "-" || event.key === "_" || event.key === "ArrowDown") {
        event.preventDefault();
        remove();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [add, remove]);

  return (
    <div className="orchard">
      {apples.map((spec) => (
        <Apple key={spec.id} spec={spec} onToggle={toggle} />
      ))}

      <div className="dock">
        <button
          type="button"
          className="dock-btn"
          onClick={remove}
          disabled={apples.length <= MIN_APPLES}
          aria-label="Fewer apples"
        >
          −
        </button>
        <span className="dock-count" aria-live="polite" id={live}>
          {apples.length}
        </span>
        <button
          type="button"
          className="dock-btn"
          onClick={add}
          disabled={apples.length >= MAX_APPLES}
          aria-label="More apples"
        >
          +
        </button>
      </div>
    </div>
  );
}
