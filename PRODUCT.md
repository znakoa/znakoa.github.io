# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Readers of a Chinese personal blog who want to get to know the author, read recent posts, or find the author's development notes. The owner explicitly confirmed that the site must feel like a personal blog rather than a knowledge base.

## Product Purpose

苏木 is a personal blog about frontend development, projects and everyday updates. The homepage introduces the person and their writing, recommends a useful starting point and makes recent posts easy to find.

## Capabilities and Constraints

- Existing Docusaurus 3.10.2, React 19 and TypeScript site. Keep the existing article routes, blog archives, technical notes, search, author page and light/dark themes working.
- Current task: redesign the complete homepage and repair mobile navigation. The user chose editorial discovery and an overall redesign, then clarified that personal blogging takes priority over a knowledge-library presentation.
- Preserve unrelated pages and factual content. Do not manufacture article dates, achievements, reading statistics or personal information.
- Deployment uses the existing GitHub Pages project and custom domain. Publishing is separate from this local implementation.

## Brand Commitments

Keep the name 苏木, existing Logo and Chinese voice. Give authorship and writing more prominence than topic inventories. Technical documents remain accessible as notes, with a secondary role on the homepage.

## Evidence on Hand

- `blog/`: dated posts about building and maintaining the blog, with real titles, excerpts and slugs.
- `src/pages/about.tsx`: the author's public frontend role and background.
- `docs/`: frontend notes, framework topics and engineering articles.
- `static/img/logo.svg`: existing brand asset.

## Product Principles

1. Introduce the author before presenting content categories.
2. Let real articles establish the blog's character.
3. Use a small number of clear reading choices and keep archives available.
4. Derive recent posts from the blog's actual metadata.
5. Make mobile reading and navigation as usable as desktop.
