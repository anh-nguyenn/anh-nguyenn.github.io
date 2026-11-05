import type Lenis from "lenis";

/**
 * Shared, mutable runtime state. It is read every frame by the WebGL scene,
 * so it deliberately lives outside React state.
 */
export const state = {
  /** Continuous scroll position: section index + progress through that section. */
  t: 0,
  /** Lenis scroll velocity (px/frame). */
  velocity: 0,
  /** Normalised pointer, -1..1. */
  px: 0,
  py: 0,
  /** Pointer in CSS pixels. */
  cx: 0,
  cy: 0,
  /** Image URL of the hovered project, or null. */
  hoverSrc: null as string | null,
  /** True when the first frame has rendered (or when no WebGL is used). */
  ready: false,
};

export const bus = {
  lenis: null as Lenis | null,
  curtain: null as HTMLElement | null,
  busy: false,
};

export const SECTION_IDS = ["top", "experience", "projects", "open-source", "education", "contact"] as const;

export function prefersReducedMotion() {
  return typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function glMode(): "on" | "off" {
  return typeof document !== "undefined" && document.documentElement.dataset.gl === "on" ? "on" : "off";
}

export function markReady() {
  state.ready = true;
}

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

function jump(el: HTMLElement) {
  if (bus.lenis) bus.lenis.scrollTo(el, { immediate: true, force: true });
  else el.scrollIntoView({ behavior: "auto", block: "start" });
}

/** Smooth, in-page scroll (used for small hops such as the hero cue). */
export function scrollToId(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  history.replaceState(null, "", id === "top" ? window.location.pathname : `#${id}`);
  if (bus.lenis) bus.lenis.scrollTo(el, { duration: 1.4 });
  else el.scrollIntoView({ behavior: prefersReducedMotion() ? "auto" : "smooth", block: "start" });
}

/** Page-transition navigation: a curtain wipes across, the page jumps, the curtain lifts. */
export async function navigateTo(id: string) {
  const el = document.getElementById(id);
  if (!el || bus.busy) return;
  const curtain = bus.curtain;
  const hash = id === "top" ? window.location.pathname : `#${id}`;

  if (!curtain || prefersReducedMotion()) {
    history.replaceState(null, "", hash);
    jump(el);
    return;
  }

  bus.busy = true;
  curtain.dataset.label = el.dataset.title ?? "";
  curtain.className = "curtain is-in";
  await wait(620);
  history.replaceState(null, "", hash);
  jump(el);
  curtain.className = "curtain is-out";
  await wait(700);
  curtain.className = "curtain";
  bus.busy = false;
}
