"use client";

import { useEffect, useState } from "react";

/**
 * Index that advances every `ms` unless paused or the user prefers reduced motion.
 * Any index change (auto or manual) restarts the countdown; resuming from a pause restarts it too.
 */
export function useAutoAdvance(count: number, paused: boolean, ms = 6000) {
  const [index, setIndex] = useState(0);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const onChange = () => setReduced(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    if (paused || reduced) return;
    const t = setTimeout(() => setIndex((i) => (i + 1) % count), ms);
    return () => clearTimeout(t);
  }, [index, paused, reduced, count, ms]);

  return [index, setIndex, reduced] as const;
}
