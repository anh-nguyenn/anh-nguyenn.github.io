"use client";

import { useEffect, useRef } from "react";
import { prefersReducedMotion, state } from "@/lib/motion";

const MIN_MS = 1700;
const MAX_MS = 6500;

/** Percentage counter that finishes only once the scene is ready, then wipes away. */
export default function Preloader() {
  const root = useRef<HTMLDivElement>(null);
  const digits = useRef<HTMLSpanElement>(null);
  const bar = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = root.current;
    const html = document.documentElement;
    if (!el) return;
    if (prefersReducedMotion()) {
      html.dataset.loaded = "1";
      window.dispatchEvent(new Event("portfolio:loaded"));
      return;
    }

    const start = performance.now();
    let value = 0;
    let raf = 0;
    let finishing = false;

    const finish = () => {
      finishing = true;
      el.classList.add("is-done");
      window.setTimeout(() => {
        html.dataset.loaded = "1";
        window.dispatchEvent(new Event("portfolio:loaded"));
      }, 350);
      window.setTimeout(() => el.classList.add("is-gone"), 1300);
    };

    const tick = (now: number) => {
      const elapsed = now - start;
      const timed = Math.min(1, elapsed / MIN_MS) * 100;
      const ready = state.ready || elapsed > MAX_MS;
      const target = ready ? timed : Math.min(timed, 90);
      value += (target - value) * 0.12;
      if (ready && value > 99.4 && !finishing) value = 100;
      const shown = Math.round(value);
      if (digits.current) digits.current.textContent = String(shown).padStart(3, "0");
      if (bar.current) bar.current.style.transform = `scaleX(${value / 100})`;
      if (value >= 100) {
        if (!finishing) finish();
        return;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <div className="preloader" ref={root} role="status" aria-live="off">
      <span className="visually-hidden">Loading portfolio</span>
      <div className="preloader-top" aria-hidden="true">
        <span>Jerry Nguyen</span>
        <span>Portfolio — 2026</span>
      </div>
      <div className="preloader-count" aria-hidden="true">
        <span ref={digits}>000</span>
        <span className="preloader-pct">%</span>
      </div>
      <span className="preloader-bar" aria-hidden="true"><span ref={bar} /></span>
    </div>
  );
}
