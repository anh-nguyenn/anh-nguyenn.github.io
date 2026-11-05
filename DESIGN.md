---
name: Jerry Nguyen — Spatial Scroll Portfolio
description: A single-page portfolio told as a scroll through one persistent 3D scene.
colors:
  background: "oklch(14% 0.02 255)"
  surface: "oklch(18% 0.022 255)"
  foreground: "oklch(96% 0.008 85)"
  secondary: "oklch(86% 0.012 85)"
  muted: "oklch(73% 0.016 250)"
  line: "oklch(32% 0.02 255)"
  accent: "oklch(72% 0.17 52)"
typography:
  body:
    fontFamily: "Geist, Arial, sans-serif"
    fontSize: "1rem"
    lineHeight: 1.55
  display:
    fontFamily: "Geist, Arial, sans-serif"
    fontWeight: 600
    letterSpacing: "-0.06em"
  mono:
    fontFamily: "Geist Mono, ui-monospace, monospace"
spacing:
  desktopGutter: "64px"
  mobileGutter: "16px"
---

# Design System: Jerry Nguyen — Spatial Scroll Portfolio

## Purpose

Present experience first, then projects, open source, education and contact, as one continuous scroll. Real HTML text is layered over a single fixed WebGL canvas. The scene responds to scroll and pointer but never carries content.

## Visual direction

Dark, high-contrast canvas with very large, tightly tracked grotesque type and a single orange accent. One procedural hero object (a soft, distorting form) drifts to the side of the text in each section while the camera flies forward through thin rings and dust. Monospace labels give a technical, editorial register.

## Experience

- **Preloader:** a percentage counter that finishes only when the scene is ready, then wipes away.
- **Scroll:** Lenis smooth scrolling. GSAP ScrollTrigger maps each section to a continuous position that drives the camera and object keyframes.
- **Reveals:** headings and blocks reveal on entering the viewport (masked words, fades).
- **Project hover:** a WebGL plane showing the project screenshot follows the cursor with a velocity-driven RGB shift. Keyboard focus triggers it too.
- **Menu and transitions:** a full-screen menu overlay; in-page links wipe a coloured curtain across the screen before jumping.
- **Cursor:** a trailing ring that grows over links and shows a label on projects and email.
- **Sound:** an optional, off-by-default ambient drone (Web Audio), toggled in the header.

## Fallbacks and accessibility

- The 3D bundle is a separate lazy chunk, loaded after the page `load` event and only when `html[data-gl="on"]`.
- `data-gl` is set before first paint from: reduced motion, coarse pointer or narrow viewport, Save-Data, low device memory. It flips to `off` if WebGL is unavailable.
- With `off`: static CSS orb instead of the canvas, project screenshots shown inline, no custom cursor.
- `prefers-reduced-motion`: no preloader, no Lenis, no reveals, no curtain; native scrolling and instant anchor jumps.
- Text stays real HTML. The menu is a modal dialog with focus trap, Escape to close, and an inert page behind it. Links keep their destinations and the `#section` hashes still work.

## Implementation

`src/app/layout.tsx` holds the boot script and `SiteShell` (preloader, scene host, header and menu, cursor, runtime). `src/components/PortfolioPage.tsx` renders the sections from the existing data files. `src/components/three/Scene.tsx` is the whole 3D scene. `src/lib/motion.ts` holds shared runtime state and navigation. Styles live in `src/app/experience.css`; tokens in `src/app/tokens.css`.
