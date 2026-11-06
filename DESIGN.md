---
name: "苏木 · Personal Blog"
description: "An author's journal: warm paper, botanical ink, and writing before categories."
colors:
  paper: "#f8f8f3"
  ink: "#253a31"
  muted: "#59685f"
  accent: "#315f49"
  feature: "#e9eee4"
  rule: "#d9dfd5"
  paper-dark: "#191e1b"
  ink-dark: "#e5ebe1"
  muted-dark: "#a8b7ab"
  accent-dark: "#b4d1ac"
  feature-dark: "#26372d"
  rule-dark: "#3c4a3f"
typography:
  display:
    fontFamily: '"Sumu Serif", "Noto Serif SC", "Source Han Serif SC", "Songti SC", "SimSun", serif'
    fontSize: "clamp(2.7rem, 4.2vw, 3.8rem)"
    fontWeight: 500
    lineHeight: 1.5
    letterSpacing: "-0.025em"
  headline:
    fontFamily: '"Sumu Serif", "Noto Serif SC", "Source Han Serif SC", "Songti SC", "SimSun", serif'
    fontSize: "34px"
    fontWeight: 500
    lineHeight: 1.55
  title:
    fontFamily: '"Noto Sans SC", -apple-system, BlinkMacSystemFont, "Segoe UI", "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei UI", "Microsoft YaHei", "Source Han Sans SC", sans-serif'
    fontSize: "21px"
    fontWeight: 600
    lineHeight: 1.6
    letterSpacing: "-0.015em"
  body:
    fontFamily: '"Noto Sans SC", -apple-system, BlinkMacSystemFont, "Segoe UI", "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei UI", "Microsoft YaHei", "Source Han Sans SC", sans-serif'
    fontSize: "16px"
    lineHeight: 1.9
  label:
    fontFamily: '"Noto Sans SC", -apple-system, BlinkMacSystemFont, "Segoe UI", "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei UI", "Microsoft YaHei", "Source Han Sans SC", sans-serif'
    fontSize: "12px"
  navigation:
    fontFamily: '"Noto Sans SC", -apple-system, BlinkMacSystemFont, "Segoe UI", "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei UI", "Microsoft YaHei", "Source Han Sans SC", sans-serif'
    fontSize: "13.5px"
    fontWeight: 500
rounded:
  control: "6px"
  feature: "16px"
  navigation: "4px"
spacing:
  link-gap: "12px"
  inline-gap: "20px"
  action-gap: "24px"
  section-gap: "32px"
  mobile-column-gap: "40px"
components:
  reading-link:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.paper}"
    rounded: "{rounded.control}"
    padding: "3px 18px"
    height: "44px"
  reading-link-hover:
    backgroundColor: "{colors.accent}"
    textColor: "{colors.paper}"
  quiet-link:
    textColor: "{colors.muted}"
    height: "44px"
  featured-post:
    backgroundColor: "{colors.feature}"
    textColor: "{colors.ink}"
    rounded: "{rounded.feature}"
    padding: "38px 36px 28px"
  post-row:
    textColor: "{colors.ink}"
    padding: "29px 0 27px"
  search-field:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    rounded: "{rounded.control}"
    height: "46px"
  navigation-link:
    typography: "{typography.navigation}"
    rounded: "{rounded.navigation}"
    padding: "0.35rem 0.7rem"
  return-to-top:
    backgroundColor: "{colors.feature}"
    textColor: "{colors.ink}"
    rounded: "{rounded.control}"
    size: "44px"
---

# Design System: 苏木 · Personal Blog

## Overview

**Creative North Star: "An Author's Journal"**

Warm paper, botanical ink, calm serif titles and thin rules make the homepage feel like a personal place to read. Authorship and real writing lead; technical notes remain available without becoming the site's identity. Preserve the name 苏木, existing wordmark and natural Chinese voice.

This is the implemented homepage system, extracted from `src/pages/index.module.css` and `src/pages/index.tsx`. Its color variables are scoped to the homepage. Shared navigation and the footer retain the existing `src/css/custom.css` system; article, archive, author and document pages have not been migrated to the homepage palette or typography. The surface composition and approved direction provenance live in `.impeccable/surfaces/home.md`.

**Key Characteristics:**

- A personal introduction and real writing establish the tone.
- A restrained green accent and tonal surfaces sit on warm paper.
- Serif display titles pair with practical system sans serif body text.
- Thin rules, open article rows and generous reading space provide structure.
- Light and dark themes, visible focus and reduced motion are part of the implementation.

## Colors

The homepage uses one botanical accent with quiet paper, text and divider roles; frontmatter contains the exact values for both themes.

### Primary

- **Botanical Green** (`accent`): punctuation, hover emphasis, selection and homepage focus outlines.
- **Pale Botanical Green** (`accent-dark`): the corresponding emphasis in dark mode.

### Neutral

- **Warm Paper / Night Paper** (`paper` / `paper-dark`): the homepage canvas and search field.
- **Botanical Ink / Light Ink** (`ink` / `ink-dark`): headings and controls; inverted against paper on the primary reading action.
- **Quiet Ink / Quiet Light Ink** (`muted` / `muted-dark`): descriptions, dates and supporting links.
- **Pressed Leaf / Night Leaf** (`feature` / `feature-dark`): the featured article and small utility controls.
- **Paper Rule / Night Rule** (`rule` / `rule-dark`): article dividers, sidebar separation and field borders.

**The Paired Theme Rule.** Swap all six homepage color roles together in dark mode; preserve text, surface and focus relationships.

The shared shell continues to use its existing `--sc-*` variables and route accent. Do not substitute homepage tokens into those surfaces as an incidental documentation change. Sidecar tonal ramps are generated color studies, not additional shipped CSS tokens.

## Typography

**Display Font:** Sumu Serif, followed by Noto Serif SC, Source Han Serif SC, Songti SC, SimSun and generic serif.
**Body Font:** the existing system CJK sans serif stack recorded in frontmatter; no new network font dependency.

Sumu Serif is a self-hosted Noto Serif SC subset at weight (500), with `font-display: swap`. The file and its OFL license are in `static/fonts/`. The subset covers the present homepage display copy; when adding display text, check glyph coverage and preserve the license. Fallback glyphs may use the rest of the declared stack.

- **Display:** the introductory title uses the frontmatter clamp, with a smaller tablet size (42px) and mobile clamp (`clamp(2.5rem, 10.5vw, 3.15rem)`), line height (1.45) on mobile.
- **Headline:** the featured article uses the serif headline role, adjusting to (30px), (27px) and (29px) at the implemented desktop, tablet and mobile breakpoints.
- **Section title:** a serif heading at (27px), requested weight (600); mobile (25px). Only a (500) font face is bundled, so the heavier request uses browser matching or synthesis.
- **Title:** article-row titles use the sans serif title role; mobile (19px).
- **Body:** article excerpts use the body role and a maximum measure (68ch); mobile (15px). Introductory and featured descriptions are (15px), sidebar prose (14px), with relaxed line heights (1.85–1.95).
- **Label:** dates use tabular numerals. Keep metadata compact and sentence case; no new monospaced homepage label system is introduced.

**The Two Voices Rule.** Use the declared serif stack for the homepage's editorial display and section headings; keep article-row titles, body text and controls in the existing sans serif stack.

## Layout

The homepage container is capped at (1160px), with width `min(1160px, calc(100% - 96px))`. The opening grid uses columns (1.25fr / 1fr), gap (88px) and vertical padding (84px / 80px). The reading area pairs a flexible article stream with a side column (272px), separated by a gap (80px) and a thin rule. These are the current home composition, not a template imposed on every route.

At (1100px) the opening and reading gaps tighten and the side column becomes (250px). At (800px), page gutters become (24px) per side and the side column is (215px). At (640px), gutters become (20px), both grids become one column, and the introduction, featured article, recent writing, personal sidebar, notes and search follow the reading order. The sidebar's vertical rule becomes a horizontal separation. The shared navigation switches at (996px), independently of these homepage breakpoints.

The homepage uses small inline gaps (12–24px), open section separation and rules rather than repeated boxed modules. Recent-post excerpts retain their readable measure. The writing anchor has a scroll offset (95px) for the shared header.

## Elevation & Depth

The homepage uses tonal layering and borders, with no card shadows. The featured article's quiet oversized “文” mark is decorative, sits behind the content and is hidden from assistive technology. The shared navigation is also shadowless. Existing Docusaurus overlays and document treatments remain outside this homepage rule; a search focus ring is an interaction indicator, not surface elevation.

**The Quiet Surface Rule.** On the homepage, use paper, the feature tone and thin rules to separate content; preserve its flat resting surfaces.

The introductory arrival lasts (650ms), with easing `cubic-bezier(0.16, 1, 0.3, 1)`, a small vertical settle (9px) and blur (1.2px). It only runs when reduced motion is not requested. Global reduced-motion rules shorten animations and transitions; the return-to-top action uses immediate scrolling when reduced motion is requested.

## Shapes

Controls use the compact control radius; the featured article uses the softer feature radius. Article rows remain open and rectangular, divided by rules (1px). Shared navigation links retain their existing smaller radius. Icons are inline stroked SVG arrows or search symbols; decorative glyph artwork is not a substitute for a control icon.

## Components

### Buttons and reading links

The primary reading link uses ink on paper inversion, compact horizontal padding and minimum height (44px); hover changes its background to accent. Secondary links remain quiet text with inline SVG arrows, a minimum height (44px) and an underline on hover. Homepage keyboard focus uses an accent outline (2px) with offset (5px). On mobile the primary action uses padding (4px 14px) and type (13px).

The return-to-top button is (44px) square, uses the feature tone, a rule border and the control radius. It becomes visible after scrolling beyond (640px), then returns to the top on activation. The article-row reading link is (36px) high on desktop and (44px) on mobile.

### Featured article and post rows

The featured article uses the feature tone, the feature radius, no shadow and the padding recorded in frontmatter. Its title and reading action are separate links. Dates and descriptions come from normalized blog metadata, not a second editorial dataset. The recent-writing rows use the title/body hierarchy, quiet dates and a bottom rule. The feed excludes the featured article and shows up to four recent published posts in reverse chronological order; it keeps an archive link.

### Search field

The homepage search is a labeled GET form to `/search` using `q`. The field uses paper, a rule border and the control radius, with a (46px) input and icon-button area. The placeholder uses muted ink. Focus within changes the border to accent and adds an outline (2px) with offset (3px). The icon button receives the feature background on hover. Its accessible label remains present even though its icon is an SVG.

### Navigation

Keep the shared wordmark proportions at height (31px), light/dark logo assets, text navigation and the existing shell colors. Shared links use the navigation type role and a short underline for the active item, driven by the route accent. Mobile menu controls are (44px) square; search uses a (44px) minimum height, and shortcut hints are hidden to preserve room. The logo, menu, search, article routes, notes and author page remain working navigation destinations. This documents the narrow shared-shell fixes, not a restyling of article or document components.

## Do's and Don'ts

### Do:

- **Do** preserve 苏木, the wordmark and the conversational Chinese voice.
- **Do** apply the six homepage color roles as light/dark pairs.
- **Do** give editorial display titles the declared serif stack and keep reading text in the system sans serif stack.
- **Do** preserve visible keyboard focus, labeled controls, reduced-motion behavior and the mobile reading order.
- **Do** derive dates, descriptions and article destinations from the real blog metadata.

### Don't:

- **Don't** turn the personal-blog homepage into a topic matrix, catalog or knowledge-base dashboard.
- **Don't** manufacture publication dates, readership totals or personal achievements.
- **Don't** treat the homepage's one-feature composition as a compulsory layout for other routes.
- **Don't** migrate article, archive, author or document-page styling merely because this homepage system exists.
