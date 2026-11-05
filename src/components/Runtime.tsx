"use client";

import { useEffect } from "react";
import { bus, navigateTo, prefersReducedMotion, scrollToId, state } from "@/lib/motion";

/**
 * Behaviour with no markup of its own: Lenis smooth scroll, GSAP ScrollTrigger
 * (drives the 3D camera), scroll-reveal observer and in-page link handling.
 */
export default function Runtime() {
  useEffect(() => {
    const reduced = prefersReducedMotion();
    let disposed = false;

    // --- in-page links go through the page transition --------------------------------
    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const a = (e.target as Element | null)?.closest?.<HTMLAnchorElement>('a[href^="#"]');
      if (!a) return;
      const id = a.getAttribute("href")!.slice(1);
      if (!id || !document.getElementById(id)) return;
      e.preventDefault();
      window.dispatchEvent(new Event("portfolio:navigate"));
      if (a.dataset.scroll === "smooth") scrollToId(id);
      else void navigateTo(id);
    };
    document.addEventListener("click", onClick);

    // --- scroll reveals ----------------------------------------------------------------
    const observe = () => {
      const items = document.querySelectorAll<HTMLElement>("[data-reveal]:not(.in)");
      if (reduced || !("IntersectionObserver" in window)) {
        items.forEach((n) => n.classList.add("in"));
        return;
      }
      const io = new IntersectionObserver(
        (entries) => entries.forEach((en) => {
          if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); }
        }),
        { rootMargin: "0px 0px -12% 0px", threshold: 0.05 },
      );
      items.forEach((n) => io.observe(n));
      cleanupFns.push(() => io.disconnect());
    };

    const cleanupFns: Array<() => void> = [];

    const setup = async () => {
      observe();
      const hash = window.location.hash.slice(1);

      if (reduced) {
        if (hash) document.getElementById(hash)?.scrollIntoView();
        return;
      }

      const [{ default: gsap }, { ScrollTrigger }, { default: Lenis }] = await Promise.all([
        import("gsap"),
        import("gsap/ScrollTrigger"),
        import("lenis"),
      ]);
      if (disposed) return;
      gsap.registerPlugin(ScrollTrigger);

      const lenis = new Lenis({ lerp: 0.09, wheelMultiplier: 0.95, smoothWheel: true });
      bus.lenis = lenis;
      lenis.on("scroll", (e: { velocity: number }) => { state.velocity = e.velocity; ScrollTrigger.update(); });
      const tick = (time: number) => lenis.raf(time * 1000);
      gsap.ticker.add(tick);
      gsap.ticker.lagSmoothing(0);

      // One trigger per section drives the continuous camera position `state.t`.
      const sections = Array.from(document.querySelectorAll<HTMLElement>("[data-section]"));
      const triggers = sections.map((el, index) =>
        ScrollTrigger.create({
          trigger: el,
          start: "top 60%",
          end: "bottom 60%",
          onUpdate: (self) => { state.t = index + self.progress; },
          onToggle: (self) => {
            if (self.isActive) window.dispatchEvent(new CustomEvent("portfolio:section", { detail: { id: el.id, index, title: el.dataset.title } }));
          },
        }),
      );

      if (hash && document.getElementById(hash)) lenis.scrollTo(document.getElementById(hash)!, { immediate: true, force: true });

      cleanupFns.push(() => {
        triggers.forEach((t) => t.kill());
        gsap.ticker.remove(tick);
        lenis.destroy();
        bus.lenis = null;
      });
    };

    const begin = () => { if (!disposed) void setup().catch(() => undefined); };
    if (document.documentElement.dataset.loaded === "1") begin();
    else window.addEventListener("portfolio:loaded", begin, { once: true });

    return () => {
      disposed = true;
      document.removeEventListener("click", onClick);
      window.removeEventListener("portfolio:loaded", begin);
      cleanupFns.forEach((fn) => fn());
    };
  }, []);

  return null;
}
