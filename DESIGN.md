---
name: Jerry Nguyen - Wafer Lot Record
description: A data scientist's single-page profile read as a semiconductor wafer lot record.
colors:
  silicon-void: "#101314"
  silicon-deep: "#0c0f10"
  silicon-raised: "#15191b"
  contact-field: "#181129"
  text-primary: "#f0f2f3"
  text-body: "#c9cdd2"
  text-muted: "#8b949c"
  focus-violet: "#b3a6ff"
  key-white: "#ffffff"
  hairline: "#2a3035"
  hairline-strong: "#3d454b"
  lot-violet: "#7a5cff"
  lot-violet-line: "#6b58b8"
  lot-violet-fill: "#211a3c"
  yield-amber: "#e0a63a"
  yield-amber-line: "#a47a2b"
  yield-amber-fill: "#332911"
  fault-red: "#c05a45"
  fault-red-line: "#a8493a"
  fault-red-fill: "#331d18"
  qualification-slate: "#9aa4ad"
  qualification-line: "#5b666e"
  qualification-fill: "#1d2427"
typography:
  display:
    fontFamily: "Archivo, Helvetica Neue, Arial, sans-serif"
    fontSize: "clamp(3.4rem, 6.4vw, 5.6rem)"
    fontWeight: 600
    lineHeight: 0.88
    letterSpacing: "-0.035em"
  headline:
    fontFamily: "Archivo, Helvetica Neue, Arial, sans-serif"
    fontSize: "clamp(2rem, 3.6vw, 3.1rem)"
    fontWeight: 500
    lineHeight: 1
    letterSpacing: "-0.025em"
  title:
    fontFamily: "Archivo, Helvetica Neue, Arial, sans-serif"
    fontSize: "clamp(1.15rem, 1.5vw, 1.35rem)"
    fontWeight: 500
    lineHeight: 1.2
    letterSpacing: "-0.01em"
  body:
    fontFamily: "Archivo, Helvetica Neue, Arial, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.6
    letterSpacing: "normal"
  label:
    fontFamily: "JetBrains Mono, ui-monospace, SFMono-Regular, monospace"
    fontSize: "0.594rem"
    fontWeight: 400
    lineHeight: 1.4
    letterSpacing: "0.14em"
rounded:
  sm: "2px"
  notch: "12px"
  full: "9999px"
spacing:
  xs: "8px"
  sm: "16px"
  md: "24px"
  lg: "40px"
  xl: "64px"
  section: "clamp(52px, 6.5vw, 88px)"
components:
  button-primary:
    backgroundColor: "{colors.text-primary}"
    textColor: "{colors.silicon-void}"
    rounded: "{rounded.sm}"
    padding: "0 20px"
    height: "46px"
  button-primary-hover:
    backgroundColor: "{colors.lot-violet}"
    textColor: "#ffffff"
  site-die:
    backgroundColor: "{colors.lot-violet-fill}"
    textColor: "{colors.text-primary}"
    typography: "{typography.label}"
  nav-link:
    textColor: "{colors.text-muted}"
    typography: "{typography.label}"
---

# Design System: Jerry Nguyen - Wafer Lot Record

## Overview

**Creative North Star: "The Wafer Lot Record"**

The portfolio is read as a fab lot record: one measured silicon surface, each role a numbered site die, each outcome a yield reading. The page is dark because it is an inspection station, not a marketing page; light is scarce and earned by the dies and figures that carry evidence.

Density is deliberate: a 19 × 19 die field gives the wafer its real texture, while the record sections below stay quiet, hairline-ruled, and scannable. Nothing floats on cards. Depth comes from the field itself, the concentric wafer ring, and one scan pass, never from shadows.

**Key Characteristics:**
- One full-bleed wafer as the first artifact, not a hero banner.
- A locked four-category palette used as inspection ink.
- Hairline rows instead of cards; data tables instead of stat tiles.
- Archivo for voice, JetBrains Mono for measurement.
- Zero-JS inspection: dies are anchors, records take `:target` state.

## Colors

The palette is silicon grey with three inspection inks and one contact field; it is committed at page scale, not sprinkled as accents.

### Primary
- **Lot Violet** (#7a5cff): applied-ML work and the active record state. Its fills use **Violet Die** (#211a3c) with **Violet Line** (#6b58b8) so white die text stays legible.
- **Yield Amber** (#e0a63a): AI, research, and automation sites; fill #332911, line #a47a2b.
- **Fault Red** (#c05a45): data-engineering sites; fill #331d18, line #a8493a.

### Neutral
- **Silicon Void** (#101314): the page ground; the only background for records.
- **Silicon Deep** (#0c0f10): wafer interior and ring bed.
- **Silicon Raised** (#15191b): the ring between the wafer and the page.
- **Contact Field** (#181129): the closing contact block and footer, the one place the ground warms toward violet.
- **Text Primary** (#f0f2f3): names, headings, figures.
- **Text Body** (#c9cdd2): running copy on the dark ground.
- **Text Muted** (#8b949c): labels, coordinates, sources.
- **Hairline** (#2a3035) / **Hairline Strong** (#3d454b): die borders and section rules.
- **Qualification Slate** (#9aa4ad): education sites; fill #1d2427, line #5b666e.

### Named Rules
**The Five-Colour Rule.** Violet, amber, red, and slate are inspection categories, not decoration. No color appears outside the legend's four roles.

**The Ink-On-Silicon Rule.** Text is never tinted toward the page. On a die fill, use Text Primary; on the ground, use Text Body or Text Muted. Never grey on a colored surface.

## Typography

**Display Font:** Archivo (with Helvetica Neue, Arial)
**Body Font:** Archivo
**Label/Mono Font:** JetBrains Mono

**Character:** An industrial grotesque carries the voice; a narrow technical mono carries anything measured. The pairing reads like a tool label, not an editorial magazine.

### Hierarchy
- **Display** (600, clamp(3.4rem, 6.4vw, 5.6rem), 0.88): the name only, set in two lines.
- **Headline** (500, clamp(2rem, 3.6vw, 3.1rem), 1): section titles — Process record, Qualification record, Inspection log, Service log.
- **Title** (500, clamp(1.15rem, 1.5vw, 1.35rem), 1.2): role title, degree, award name.
- **Body** (400, 1rem, 1.6): positioning, outcomes, descriptions; measures stay at 62ch or less.
- **Label** (400 mono, 0.594rem, 0.14em, uppercase): lot codes, coordinates, dates, figure sources.

### Named Rules
**The Measured-Type Rule.** Mono is reserved for lot codes, coordinates, dates, quantities, and die names. It is never a costume for ordinary prose.

## Layout

A 1320px container with 24px gutters holds everything except the full-bleed contact field. The first viewport is a two-column instrument face: 58% wafer, 42% record header, with the wafer sized by `min(100% - 48px, calc(100svh - 310px), 640px)` so the whole face fits a laptop screen.

Below the hero, sections stack on one ground, separated by 1px rules, each opened by a headline and a right-aligned lot code on the same baseline. Records use a three-column grid (site code, record, dates); service records drop the site column. Awards use date, title/issuer, and detail. At 900px the hero stacks with the name first and the wafer second; at 560px records collapse to a single text column and die names abbreviate.

Spacing follows one rhythm: `section` padding above and below, 30px heading-to-content, 24px inside records, and more space above a heading than below it.

## Elevation & Depth

There are no drop shadows. Depth is drawn with three devices: the wafer's concentric ring (1px lines at a 22px offset), the die field's tonal steps from #090c0d to #161c1e, and the single scan pass. The contact field is the only tonal plane change at page scale.

Borders carry all separation. The only inset rule is the 1px violet outline of a targeted record; never add a soft shadow to a record or button.

## Shapes

Dies are squares with 2px gaps, clipped by a circle. The wafer is the only round form; the notch is a 26px cut at the bottom edge. Buttons, rows, and inputs use a 2px radius — nearly square, like a panel control. No pills, no rounded cards, no glass.

## Components

- **Site die**: a grid item spanning 2–3 tracks, filled with its category tint, 1px category line, number and name centered. It is an anchor to its record. Hover brightens; focus uses the global ring.
- **Primary button**: Text Primary ground, Silicon Void text, 46px tall, 2px radius. Hover flips to Lot Violet with white text.
- **Nav link**: mono label in Text Muted, full status-bar height for a 64px touch target; hover to Text Primary.
- **Record row**: three-column hairline row; `:target` adds a Violet Die ground with an inset 1px violet rule.
- **Measurement row**: mono figure (clamp 1.55–2rem) against a label and a mono source, separated by hairlines.
- **Status bar**: 64px sticky bar, mono labels, brand at left, three nav links at right.

## Do's and Don'ts

- Do keep the wafer as the first artifact; never demote it to a decorative image.
- Do keep every figure traceable to its source role in the same row or measurement.
- Do use the category inks only on dies, ticks, and target states.
- Do keep records as hairline rows on the ground.
- Don't add cards, shadows, gradients, glass, or glow.
- Don't use mono for prose or a serif for display.
- Don't add a kicker above a heading; the headline carries itself.
- Don't invent metrics, roles, clients, or testimonials.
- Don't animate anything beyond the single scan pass and state transitions.
