"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { glMode, markReady, state } from "@/lib/motion";

// The whole 3D bundle (three, R3F, drei) is a separate chunk, fetched only on capable devices.
const Scene = dynamic(() => import("./three/Scene"), { ssr: false });

function hasWebGL() {
  try {
    const canvas = document.createElement("canvas");
    return !!(canvas.getContext("webgl2") || canvas.getContext("webgl"));
  } catch {
    return false;
  }
}

/** Hosts the single persistent canvas, or the static fallback when WebGL is not appropriate. */
export default function SceneHost() {
  const [on, setOn] = useState(false);

  useEffect(() => {
    const root = document.documentElement;
    if (glMode() !== "on" || !hasWebGL()) {
      root.dataset.gl = "off";
      markReady();
      return;
    }

    // Start loading the scene only once the page itself has finished loading.
    const start = () => {
      const idle = window.requestIdleCallback ?? ((cb: () => void) => window.setTimeout(cb, 1));
      idle(() => setOn(true), { timeout: 1200 } as IdleRequestOptions);
    };
    if (document.readyState === "complete") start();
    else window.addEventListener("load", start, { once: true });

    // Never let a slow scene hold the preloader forever.
    const failsafe = window.setTimeout(markReady, 6000);

    const move = (e: PointerEvent) => {
      if (e.pointerType === "touch") return;
      state.cx = e.clientX;
      state.cy = e.clientY;
      state.px = (e.clientX / window.innerWidth) * 2 - 1;
      state.py = -((e.clientY / window.innerHeight) * 2 - 1);
    };
    const over = (e: Event) => {
      const el = (e.target as Element | null)?.closest?.<HTMLElement>("[data-preview]");
      if (el) {
        state.hoverSrc = el.dataset.preview ?? null;
        if (e.type === "focusin") {
          const r = el.getBoundingClientRect();
          state.cx = r.left + r.width * 0.55;
          state.cy = r.top + r.height / 2;
        }
      }
    };
    const out = (e: Event) => {
      const el = (e.target as Element | null)?.closest?.("[data-preview]");
      const to = (e as PointerEvent).relatedTarget as Element | null;
      if (el && !(to && el.contains(to))) state.hoverSrc = null;
    };

    window.addEventListener("pointermove", move, { passive: true });
    document.addEventListener("pointerover", over);
    document.addEventListener("pointerout", out);
    document.addEventListener("focusin", over);
    document.addEventListener("focusout", out);
    return () => {
      window.clearTimeout(failsafe);
      window.removeEventListener("load", start);
      window.removeEventListener("pointermove", move);
      document.removeEventListener("pointerover", over);
      document.removeEventListener("pointerout", out);
      document.removeEventListener("focusin", over);
      document.removeEventListener("focusout", out);
    };
  }, []);

  return (
    <>
      <div className="gl-fallback" aria-hidden="true" />
      <div className="gl" aria-hidden="true">
        {on && <Scene />}
      </div>
    </>
  );
}
