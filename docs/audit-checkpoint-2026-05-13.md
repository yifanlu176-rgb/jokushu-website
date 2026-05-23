# Audit Checkpoint - 2026-05-13

Current conclusion:

- The implementation is not aligned with `蓐収株式会社_品牌與網站策劃文檔_定稿版.md` in several core areas.
- The main issue is not infrastructure. The route matrix, Vercel target, and Formspree wiring are broadly correct.
- The main issue is page shape and brand tone: the result has drifted toward a generic marketing site instead of the restrained, book-like structure in the planning doc.

Confirmed mismatches to resume from:

1. Homepage
   - The planning doc requires a very minimal first screen: brand mark, one explanatory line, and a scroll cue.
   - Current `src/pages/index.astro` uses a full hero, CTA buttons, service cards, pricing, and contact blocks.
   - This is the largest spec mismatch.

2. Navigation and language switch
   - The planning doc specifies a fixed top navigation and a top-right bilingual switch (`中｜日`).
   - Current `src/components/Nav.astro` has only flat links plus a CTA.
   - No actual bilingual switch UI is present.

3. Visual system
   - The planning doc defines paper/ink tokens, restrained accent usage, and very limited motion.
   - Current `src/styles/global.css` and `src/styles/sections.css` still read like a conventional dark marketing site.

4. Contact flow
   - The planning doc’s contact page is a direct inquiry entry point with strict content structure.
   - Current `src/data/pages/contact.json` is a simplified business form layout with a different structure.
   - The thank-you redirect exists in code, but the submit flow still needs a strict alignment pass.

Confirmed alignments:

- `docs/route-matrix.md` correctly locks the first-release route plan.
- The repo keeps the existing `articles` content system.
- Formspree and Vercel are the active deployment/form assumptions.

Recommended resume order after restart:

1. Recheck homepage against the planning doc.
2. Rebuild navigation and bilingual switch to spec.
3. Rework contact page and form fields to match the taskbook/planning constraints.
4. Revisit global tokens and motion so the whole site matches the planning tone.

This checkpoint is intended to be resumed from the current audit state, not as a final implementation note.
