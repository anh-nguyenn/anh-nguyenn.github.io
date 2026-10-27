---
name: Jerry Nguyen — Cozy Pixel Portfolio
description: A concise portfolio using the colors and mood of Jerry's panda artwork.
colors:
  background: "#fffefd"
  surface: "#f7f5f2"
  foreground: "#262239"
  secondary: "#50465a"
  muted: "#625c69"
  line: "#ddd8dc"
  accent: "#503c63"
typography:
  body:
    fontFamily: "Archivo, Helvetica Neue, Arial, sans-serif"
    fontSize: "1rem"
    lineHeight: 1.6
  display:
    fontFamily: "Archivo, Helvetica Neue, Arial, sans-serif"
    fontSize: "clamp(4.3rem, 6.5vw, 6.5rem)"
    fontWeight: 600
    letterSpacing: "-0.04em"
spacing:
  contentWidth: "1120px"
  desktopGutter: "32px"
  mobileGutter: "20px"
---

# Design System: Jerry Nguyen — Cozy Pixel Portfolio

## Purpose

Help a recruiter or collaborator understand Jerry's work and reach him quickly. The page starts with a direct introduction, then presents recent projects, experience, education, verified open source contributions, and contact details.

## Visual direction

The supplied Cozy Pixel Panda Coding Haven artwork leads the hero. The page uses a white ground with dark ink, plum links, amber framing, and muted mauve from the image. One framed image and squared details supply the playful character; the work below stays in compact ruled rows without extra illustrations or animation.

## Typography and color

Archivo is used throughout for readable copy and clear headings. The name is the largest element; section headings form a clear second level; role and project titles form the third. Body text stays readable at 16px. Dark ink and plum links sit on white surfaces.

## Layout

The 1120px container opens with text beside the supplied artwork. Below, four sections form an aligned 2×2 grid: experience, education, open source contribution, then recent projects. Open source repositories use a smaller two-column ruled grid within their section. At 860px and below the sections stack in reading order, and the repositories become a single list. The hero stacks at 760px. Dates align to the right on desktop and above the text on phones. Only the three most recent roles appear initially; earlier roles are in a native expandable section. Open source summaries include fuller descriptions, contributor labels, live stars, and topic tags. The contact block closes the page in a subtle tonal band.

## Interaction

The header links to the core sections. The main action opens email; the secondary action jumps to experience. Recent project links open their deployed sites; open source names open the upstream repositories. Repository star counts are embedded during each deployment, with approximate fallback counts if GitHub is unavailable. Keyboard focus remains visible, and reduced motion disables smooth scrolling.
