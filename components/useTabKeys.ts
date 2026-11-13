"use client";

import { useRef, type KeyboardEvent } from "react";

/** Left/Right arrow navigation for a role="tablist" (roving focus). Spread `onKeyDown` on the list, `ref(i)` on each tab. */
export function useTabKeys(count: number, active: number, select: (i: number) => void) {
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);

  function onKeyDown(e: KeyboardEvent) {
    const step = e.key === "ArrowRight" ? 1 : e.key === "ArrowLeft" ? -1 : 0;
    if (!step) return;
    e.preventDefault();
    const next = (active + step + count) % count;
    select(next);
    tabs.current[next]?.focus();
  }

  const ref = (i: number) => (el: HTMLButtonElement | null) => { tabs.current[i] = el; };
  return { onKeyDown, ref };
}
