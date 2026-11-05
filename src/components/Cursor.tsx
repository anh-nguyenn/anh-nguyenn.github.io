"use client";

import { useEffect, useRef } from "react";
import { prefersReducedMotion } from "@/lib/motion";

/** A trailing ring that grows over interactive elements. Native cursor stays visible. */
export default function Cursor() {
  const ring = useRef<HTMLDivElement>(null);
  const label = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ring.current;
    if (!el || prefersReducedMotion() || !window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    document.documentElement.dataset.pointer = "ring";

    let x = -100, y = -100, tx = -100, ty = -100, raf = 0, visible = false;
    const loop = () => {
      x += (tx - x) * 0.2;
      y += (ty - y) * 0.2;
      el.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      raf = requestAnimationFrame(loop);
    };
    const move = (e: PointerEvent) => {
      tx = e.clientX;
      ty = e.clientY;
      if (!visible) {
        visible = true;
        x = tx;
        y = ty;
        el.classList.add("is-visible");
      }
    };
    const over = (e: Event) => {
      const t = (e.target as Element | null)?.closest?.<HTMLElement>("a, button, [data-cursor]");
      el.classList.toggle("is-active", !!t);
      const text = t?.closest<HTMLElement>("[data-cursor]")?.dataset.cursor ?? "";
      el.classList.toggle("has-label", !!text);
      if (label.current) label.current.textContent = text;
    };
    const leave = () => { visible = false; el.classList.remove("is-visible"); };

    raf = requestAnimationFrame(loop);
    window.addEventListener("pointermove", move, { passive: true });
    document.addEventListener("pointerover", over);
    document.documentElement.addEventListener("pointerleave", leave);
    return () => {
      cancelAnimationFrame(raf);
      delete document.documentElement.dataset.pointer;
      window.removeEventListener("pointermove", move);
      document.removeEventListener("pointerover", over);
      document.documentElement.removeEventListener("pointerleave", leave);
    };
  }, []);

  return (
    <div className="cursor" ref={ring} aria-hidden="true">
      <span className="cursor-ring"><span ref={label} /></span>
    </div>
  );
}
