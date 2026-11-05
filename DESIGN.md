---
name: Jerry Nguyen — Studio Proof Portfolio
description: An editorial portfolio that treats Jerry's work as a carefully set proof sheet.
colors:
  background: "oklch(97.2% 0.006 215)"
  surface: "oklch(94% 0.009 215)"
  foreground: "oklch(16% 0.032 250)"
  secondary: "oklch(34% 0.022 245)"
  line: "oklch(84% 0.010 225)"
  accent: "oklch(68% 0.172 50)"
typography:
  body:
    fontFamily: "Geist, Arial, sans-serif"
    fontSize: "1rem"
    lineHeight: 1.55
  display:
    fontFamily: "Hedvig Letters Serif, Georgia, serif"
    fontSize: "clamp(6rem, 12.4vw, 13.2rem)"
    fontWeight: 400
    letterSpacing: "-0.055em"
spacing:
  contentWidth: "1440px"
  desktopGutter: "64px"
  mobileGutter: "16px"
---

# Design System: Jerry Nguyen — Studio Proof Portfolio

## Purpose

Help a recruiter or collaborator understand Jerry's shipped projects, professional experience, and open source work, then contact him. The single page stays direct and scannable.

## Visual direction

A cool proof-paper ground, dark ink, fine rules, and one orange signal give the page an editorial feel. Jerry's name is the oversized first impression. A layered JN object gives it a spatial counterpoint: an extruded ink plate, two translucent proof sheets, orbital lines, a grid, and a soft cast shadow. Raised planes then carry that depth through experience, both projects, the open-source index, education, and contact. The two project screenshots appear in full at their natural ratios. The open-source plane sits on a dark stage.

## Typography and color

Hedvig Letters Serif sets the name and headings; Geist carries all body copy, navigation, labels, and metadata. The page uses sentence case without tracked labels. Orange is reserved for the main action, the name's period, and subtle link or crop marks. All color and font values live in `src/app/tokens.css`.

## Layout

A centered 1440px container uses 64px desktop gutters and 16px phone gutters. The shorter hero lets experience enter the first desktop viewport. Experience and education use a left heading beside detailed entries on raised sheets. Projects use two image-led floating planes on desktop and stack on phones; their screenshots are never cropped. Open source uses a dark elevated plane with two columns on desktop and one on phones. The final repository spans both desktop columns. The existing experience disclosure remains native.

## Interaction

The header links to experience, projects, and contact. The hero opens email or jumps to experience. The JN object settles once on load and tilts gently toward a mouse or pen pointer. Each content plane responds to the pointer with a smaller spring tilt, creating depth throughout the page. Project screenshots lift slightly on hover and keyboard focus and link directly to their projects. Reduced-motion preferences disable the entrance, pointer response, screenshot lift, and smooth scrolling; the static shadows and edges still convey depth. Repository stars are embedded during deployment with fallback values. The visitor counter remains live and links to its detailed statistics. Keyboard focus is visible, including on the dark index.

## Implementation

`src/app/page.tsx` owns the single page. `src/components/HeroScene.tsx` owns the pointer-responsive scene; `src/components/SpatialSurface.tsx` applies the same motion language to content panels. Content remains sourced from `src/data/work.ts`, `src/data/education.ts`, `src/data/recentProjects.ts`, and `src/data/openSource.ts`. `src/app/globals.css` holds page composition; `src/app/tokens.css` and `src/app/base.css` hold the design tokens and base rules.
