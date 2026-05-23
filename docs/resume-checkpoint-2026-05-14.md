# Resume Checkpoint - 2026-05-14

Current status for this workstream:

- The visual system token reset in `src/styles/global.css` is complete and confirmed in local preview.
- The fixed top navigation and `中｜日` switch in `src/components/Nav.astro` are complete and confirmed in local preview.
- The homepage structure rewrite in `src/pages/index.astro` is complete and confirmed in local preview.
- The remaining scoped task is step 4 only: check all pages under the new paper/ink palette for readability and visual consistency.

Confirmed completed steps:

1. Global visual tokens
   - `src/styles/global.css` was rewritten to the planning doc's paper/ink system.
   - Main background is now `#F5EFE3`.
   - Main text is now `#1F1A15`.
   - Accent red is now `#A0522D`.
   - Serif-first type system was switched to `Noto Serif JP` / `Noto Serif SC`.
   - `font-weight: 700` was removed from this global layer.

2. Navigation
   - `src/components/Nav.astro` now uses the fixed top structure from the planning doc.
   - The main nav now reads: `源流 / 奉事 / 文錄 / 藏品 / 通信`.
   - `中｜日` was added as a real UI state, not just decorative text.
   - `src/layouts/Layout.astro` now carries the minimal language-state script for the nav switch.
   - `src/styles/nav.css` was rewritten to match the restrained paper-book visual direction.

3. Homepage
   - `src/pages/index.astro` was rewritten away from the marketing-style hero and card stack.
   - The first screen now only contains the brand name, explanatory lines, and scroll cue.
   - The homepage now follows the restrained sequence implemented in this round:
     - opening
     - tagline
     - source intro
     - service overview
     - recent writings
     - contact closing
   - `src/data/pages/home.json` was rewritten to support that structure.
   - The writings section now reuses the existing `articles` content system instead of inventing a second content path.
   - `src/styles/sections.css` now includes homepage-specific layout and bilingual display rules for this structure.

Build status:

- `npm run build` passed after step 1.
- `npm run build` passed after step 2.
- `npm run build` passed after step 3.

Known runtime note:

- During this session, Astro local preview repeatedly served stale content because an older `astro dev` process still held `127.0.0.1:4321`.
- If preview looks outdated next time, first kill stale dev processes and restart local preview cleanly before judging the UI.

Files already changed in this round:

- `src/styles/global.css`
- `src/components/Nav.astro`
- `src/styles/nav.css`
- `src/layouts/Layout.astro`
- `src/pages/index.astro`
- `src/data/pages/home.json`
- `src/styles/sections.css`

Next step only:

4. Check all pages under the new palette for:
   - text/background contrast
   - button/link readability
   - cards, legal pages, article pages, forms, and footer consistency
   - leftover dark-theme or marketing-style visual leakage

Do not resume by redoing steps 1-3. Resume from step 4 only.
