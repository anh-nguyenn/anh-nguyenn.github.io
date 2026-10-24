# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Recruiters and hiring managers evaluating Jerry for data science and applied ML roles; potential clients and collaborators assessing whether he can solve a specific technical problem; peers and the broader tech community browsing his work. Most arrive with limited time from a CV, LinkedIn, GitHub, a referral, or a job application.

## Product Purpose

A concise single-page portfolio that presents Jerry Nguyen's selected work experience, education, and contact routes. Success is a conversation: an email, LinkedIn message, referral, or interview, not a long browsing session.

## Positioning

A data scientist who applies machine learning and analytics to real operational systems, currently semiconductor manufacturing at GlobalFoundries, with hands-on AI engineering, data engineering, automation, and digital transformation experience across consulting and public-sector work. The depth is evidenced by NTU First Class Honours in Information Engineering & Media and a final-year thesis unifying LLMs with knowledge graphs for reliable chatbot interaction.

## Operating Context

Visitors arrive from a CV, LinkedIn, GitHub, referrals, or job applications, often on mobile, and scan for fit in under a minute. They may open linked PDFs or images for detail. Contact happens by email, LinkedIn, or GitHub.

## Capabilities and Constraints

- Current surface is a single-page profile: hero, professional facts, work experience, education, and contact.
- Detail routes for education, work, projects, and blog were removed in the July 2026 redesign and are legacy, not current product scope.
- Current copy is sourced from `src/data/work.ts` and `src/data/education.ts`; older project and blog data remain in the repository but are not part of the current surface.
- Static export deployed to the GitHub Pages user site at `https://anh-nguyenn.github.io/` through `.github/workflows/deploy-pages.yml`.
- Stack: Next.js App Router, React, TypeScript, Tailwind CSS v4, static export.
- Existing metrics and assets are approved for public use as written; future work must not invent new claims, clients, testimonials, or benchmarks.
- No blog or writing surface is current.

## Brand Commitments

- Public name: Jerry Nguyen; full name: Jerry Nguyen Tuan Anh.
- Based in Singapore.
- Voice in current copy: direct, understated, technical, first-person, no hype.
- Contact channels: nguyentuananh.kmf@gmail.com, github.com/jerrynguyentuananh, linkedin.com/in/jerrynguyentuananh.
- Photos, PDFs, and project images in `public/` are approved for use.

## Evidence on Hand

- Six roles in `src/data/work.ts`: GlobalFoundries, SimplifyNext, NIE, BearingPoint, Keppel, and IRAS, with dates, locations, and outcome metrics (8x query speed, 15% efficiency gain, 70% review reduction, 20% satisfaction gain, four major clients).
- Two education entries in `src/data/education.ts`: NTU B.Eng in Information Engineering & Media (Highest Distinction, Dean's List) and a Korea University winter exchange (A+).
- Six project entries in `src/data/projects.ts` with images under `public/projects/`.
- Supporting PDFs under `public/pdf/` and photos under `public/ntu/`, `public/ku/`, and `public/`.
- Contact and social profiles listed above.
- No testimonials, press coverage, or client logos are documented; do not fabricate them.

## Product Principles

1. Earn contact through credibility: every section should make the case for a conversation faster than a CV does.
2. Lead with operational impact, not tool lists; metrics and shipped outcomes carry the argument.
3. Stay concise: a single page, scannable in under a minute, with detail only where it earns its place.
4. Preserve factual accuracy: use approved content and never inflate roles, metrics, or client relationships.
5. Respect the visitor's context: fast, accessible, and readable on a phone between other tasks.

## Accessibility & Inclusion

WCAG 2.2 AA: keyboard access, visible focus, semantic structure, sufficient contrast, reduced-motion support, and responsive behavior.
