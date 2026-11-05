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

A cool proof-paper ground, dark ink, fine rules, and one orange signal give the page an editorial feel. Jerry's name is the oversized first impression. A typographic plane formed from his initials adds depth through a short entrance animation. Experience follows the hero. The two project screenshots appear in full at their natural ratios, with crop marks aligned to their edges. A dark open source index, a compact education record, and an email-led contact close follow.

## Typography and color

Hedvig Letters Serif sets the name and headings; Geist carries all body copy, navigation, labels, and metadata. The page uses sentence case without tracked labels. Orange is reserved for the main action, the name's period, and subtle link or crop marks. All color and font values live in `src/app/tokens.css`.

## Layout

A centered 1440px container uses 64px desktop gutters and 16px phone gutters. The shorter hero lets experience enter the first desktop viewport. Experience and education use a left heading beside detailed entries. Projects use two image-led columns on desktop and stack on phones; their screenshots are never cropped. Open source uses two columns on desktop and one on phones. The final repository spans both desktop columns. The existing experience disclosure remains native.

## Interaction

The header links to experience, projects, and contact. The hero opens email or jumps to experience. Project links and repository names retain their existing destinations. The typographic plane settles once on load; reduced-motion preferences disable this motion and smooth scrolling. Repository stars are embedded during deployment with fallback values. The visitor counter remains live and links to its detailed statistics. Keyboard focus is visible.

## Implementation

`src/app/page.tsx` owns the single page. Content remains sourced from `src/data/work.ts`, `src/data/education.ts`, `src/data/recentProjects.ts`, and `src/data/openSource.ts`. `src/app/globals.css` holds page composition; `src/app/tokens.css` and `src/app/base.css` hold the design tokens and base rules.
