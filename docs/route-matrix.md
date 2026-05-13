# Step 1 - Route Matrix

This document is the canonical route and content matrix for the first release.

Source priority:

1. `蓐收株式會社官網開發任務書_簡版.md`
2. `蓐收株式會社_品牌與網站策劃文檔_定稿版.md`
3. Existing repo code, only when it does not conflict with the two documents above

Fixed decisions:

- Service slugs are locked to the taskbook English labels: `fengshui`, `fortune`, `ritual`, `items`, `strategy`.
- `fengshui`, `fortune`, and `strategy` map to the planning doc's core service concepts.
- `ritual` and `items` are taskbook-added service lines; they do not exist as standalone service concepts in the planning doc and need fresh copy.
- `pricing` has copy already provided in the taskbook.
- `faq` only has required topics in the taskbook, so the Q&A body must be written during implementation.
- `cases` and `columns` are placeholders for the first release.
- `articles` stays as an existing content system, but it is not part of the first-release main navigation.

## Canonical Routes

| Route | Page title draft | Page type | Existing route handling | Content status | Source detail | Notes |
| --- | --- | --- | --- | --- | --- | --- |
| `/` | ホーム | Required | Rewrite | Copy exists | Planning doc chapter 2 page structure + chapter 3 home copy + chapter 4 visual spec + taskbook section 4 | Main landing page, full build |
| `/about` | 会社について | Required | Rewrite | Copy exists | Planning doc chapter 2 page structure + chapter 3 about copy + chapter 4 visual spec + taskbook section 2 | Brand story page, distinct from `/company` |
| `/services` | 奉事一覧 | Required | Rewrite | Copy exists | Planning doc chapter 2 service map + chapter 3 service overview copy + taskbook section 5 | Service hub page |
| `/services/fengshui` | 風水鑑定・空間環境コンサルティング | Required | New | Copy exists | Planning doc chapter 3 `相形度勢` service draft + taskbook section 5 | Slug locked to `fengshui` |
| `/services/fortune` | 命理・運勢相談 | Required | New | Copy exists | Planning doc chapter 3 `擇時推演` service draft + taskbook section 5 | Slug locked to `fortune` |
| `/services/ritual` | 道教科儀・祈願相談 | Required | New | Copy exists | Taskbook section 5 only; no standalone planning-doc service draft | Slug locked to `ritual`; taskbook-added service line |
| `/services/items` | 開運用品・文化商品 | Required | New | Copy exists | Taskbook section 5 only; no standalone planning-doc service draft | Slug locked to `items`; taskbook-added service line |
| `/services/strategy` | 事業戦略・文化企画 | Required | New | Copy exists | Planning doc chapter 3 `事體諮詢` concept + taskbook section 5 surface naming | Slug locked to `strategy`; planning concept and taskbook naming must be aligned in implementation |
| `/pricing` | 料金 | Required | New | Copy exists | Taskbook section 6 pricing table | Pricing table is already given |
| `/faq` | FAQ | Required | New | To be written | Taskbook section 8 topics only | Topics are given, answers need authoring |
| `/contact` | 初回相談・お問い合わせ | Required | New | Copy exists | Taskbook section 7 form fields + success copy + consent dependency on `/privacy` | Form fields and success copy are specified |
| `/contact/thanks` | 送信完了 | Supporting | New | Copy exists | Taskbook section 7 success flow | Post-submit thank-you page for Formspree `_next` redirect |
| `/company` | 会社概要 | Required | New | To be written | Taskbook section 2 basic company facts + taskbook section 9 legal/company-info requirements | Legal/company-info page, separate from `/about` |
| `/privacy` | プライバシーポリシー | Required | New | To be written | Taskbook section 9 privacy checklist | Privacy policy body must be authored |
| `/commerce-law` | 特定商取引法に基づく表記 | Required | New | To be written | Taskbook section 9 legal disclosure checklist | Legal disclosure page |
| `/terms` | 利用規約 | Required | New | To be written | Taskbook section 9 terms checklist | Terms body must be authored |
| `/cancellation` | キャンセルポリシー | Required | New | To be written | Taskbook section 9 cancellation checklist | Cancellation policy body must be authored |
| `/disclaimer` | 免責事項 | Required | New | To be written | Taskbook section 9 disclaimer checklist | Disclaimer body must be authored |
| `/cases` | 事例 | Placeholder | New | Placeholder | Taskbook section 3 placeholder page | First-release placeholder page |
| `/columns` | コラム | Placeholder | New | Placeholder | Taskbook section 3 placeholder page | First-release placeholder page |
| `/articles` | 文錄 | Deferred | Keep | Existing content | Current repo content system + planning doc archive notes | Keep for now, not in first-release main nav |
| `/articles/[slug]` | 文錄記事 | Deferred | Keep | Existing content | Current repo content system + planning doc archive notes | Keep existing article detail routes, but keep them out of first-release navigation |

## Dependency Notes

- `Layout`, `Nav`, `Footer`, and global design tokens must be established before page-by-page work starts.
- `privacy` must exist before the `contact` form consent text is finalized.
- `company` should not be confused with `about`; they are separate pages with different purposes.
- `faq` is not blocked by `pricing`, but both should be completed before final navigation polish.
- The current `src/pages/index.astro` is a full rewrite target, not an incremental patch target.
- The current `src/content/articles/*` collection is preserved, but it is not a first-release dependency.

## Execution Order

1. Foundation: layout, navigation, footer, tokens, SEO, Vercel deployment check
2. Core pages: home, about, services, pricing, faq, contact, company, legal pages
3. Service detail pages: five service routes
4. Form wiring and final QA
