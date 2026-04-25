# Jokushu Website — 功能 Backlog

本檔案記錄日後想在 Astro 架構上實作的功能想法。

來源：Astro 框架遷移之前，codex CLI 曾在舊架構上做過 9 個探索性分支。這些分支因架構已重做而於 2026-04-25 全部刪除，但其中部分功能想法仍有保留價值。本檔案是篩選後的精煉版。

歷史分支完整清單見 `docs/legacy-codex-branches.md`。

---

## 🟢 高優先級（建議近期排入）

這些是商業網站運營的基礎能力，與內容/設計無關，重做成本低、價值明確。

### 1. 法律頁面與信任元素

**做什麼**：新增法律相關頁面與 UI 元素：
- 隱私政策（プライバシーポリシー）
- 特定商取引法に基づく表記（B2C 必備）
- 服務條款（利用規約）
- Footer 區的免責聲明
- 預訂表單的信任徽章與同意 checkbox

**為什麼**：日本商業網站的法律基本盤。特商法表記是 B2C 收費服務的法律義務；隱私政策影響表單收集個資的合法性。沒有這些，網站從合規角度看是不能正式對外接單的。

**Astro 實作要點**：
- 用 content collections 管理法律文件內容（將來改條款只改 markdown）
- Footer 做成共用 component
- 預訂表單的同意 checkbox 與信任徽章寫進表單 component

**原 codex commit**：`438c4c6` — Add legal pages, footer disclosures, and booking trust/consent sections

---

### 2. 預訂表單真實提交流程（Cloudflare Worker 後端）

**做什麼**：把目前的展示型預訂表單接到真實後端：
- 表單資料寫入儲存層（Cloudflare KV / D1 / 第三方 CRM）
- 提交後寄通知信給客戶與蓐収側
- 基本的反垃圾（rate limit、honeypot、Turnstile）
- 提交成功/失敗的 UI 回饋

**為什麼**：網站從「展示」變「能接單」的關鍵一步。沒有這個，目前的預訂表單只是好看的擺設。

**Astro 實作要點**：
- Astro 與 Cloudflare Pages/Workers 整合本來就好（用 `@astrojs/cloudflare` adapter）
- API endpoint 可以放在 `src/pages/api/booking.ts`
- 寄信用 Cloudflare 的 Email Workers 或第三方（Resend、SendGrid）
- 與上面 #1 的同意 checkbox 邏輯共用

**原 codex commit**：`13ccfc3` — Implement real booking submission flow with Cloudflare Worker

**依賴**：建議與 #1 一起做，因為法律同意與表單提交是綁在一起的。

---

### 3. SEO 基礎建設

**做什麼**：補齊 SEO 必要元素：
- 每頁的 `<title>` / `<meta description>` / Open Graph / Twitter Card
- Schema.org 結構化資料（LocalBusiness、Service、Article、BreadcrumbList）
- `robots.txt`
- `sitemap.xml`（自動生成）
- canonical URL

**為什麼**：獲客起點。風水/占卜這類服務高度依賴搜尋曝光，沒做 SEO 基礎建設等於放棄自然流量。

**Astro 實作要點**：
- 用 `@astrojs/sitemap` 整合自動生成 sitemap
- 結構化資料用 JSON-LD 寫在 layout component 裡，按頁面類型注入不同 schema
- meta 用 props 從每頁傳入 layout
- 多語言時注意 `hreflang` 設定（呼應下面 #4）

**原 codex commit**：`840302a` — Add foundational SEO metadata, structured data, and crawl files

---

### 4. 首頁無障礙性與多語言 UX

**做什麼**：
- 鍵盤可訪問性、aria 標籤、語意化 HTML
- 顏色對比、focus indicator
- 多語言切換體驗（中/日/英）：URL 結構、`hreflang`、語言切換器、翻譯內容管理

**為什麼**：
- 無障礙性：日本與歐盟對網站無障礙性的法規愈來愈嚴；對所有訪客也是基本尊重
- 多語言：蓐収目標客戶橫跨日中（也可能英），雙語/三語架構是核心競爭力，不是錦上添花

**Astro 實作要點**：
- Astro 原生支援 i18n routing（Astro 4+）：`src/pages/[lang]/...` 或 `astro.config.mjs` 的 i18n 設定
- 翻譯內容用 content collections 或 i18n 字典檔
- 無障礙性用 axe DevTools / Lighthouse 自動掃，做到 90 分以上

**原 codex commit**：`1130ae0` — Enhance index accessibility and bilingual UX behavior

---

## 🟡 中優先級（內容/設計層級的想法）

這些是「概念有意思但需要重新設計」的，不急。

### 5. 主題 Hub 頁面

**做什麼**：為博客建立「主題集合頁」——例如「奇門遁甲入門」、「居家風水案例」、「八字命理基礎」這類 hub 頁面，每個 hub 聚合該主題下的所有文章，並提供導讀。

**為什麼**：對 SEO（topic clusters）和讀者導航都有幫助。比扁平的「所有文章列表」資訊密度高得多，也展現專業度。

**Astro 實作要點**：
- Astro content collections 加 tag/topic 欄位
- 動態路由 `src/pages/topics/[topic].astro` 讀取該主題的所有文章
- 每個 hub 頁面可以有獨立的長文導讀（手寫，不是自動生成）

**原 codex commit**：`8930c78` — 擴展博客內容架構並新增主題 Hub 頁面

---

### 6. About 頁的八卦視覺設計

**做什麼**：About 頁的視覺主視覺，圍繞「八卦」做設計。

**為什麼**：About 頁是品牌調性的重要承載。蓐収的核心是中國形上學，視覺需要承接這個專業感。

**現況的曖昧**：原 codex 分支對「動態 vs 靜態」、「先天 vs 後天」八卦做了多種試驗，沒有定論。建議重做時不要參考這些舊試驗，直接從你自己的設計判斷出發。

**Astro 實作要點**：
- 純設計決策，技術上沒有特別障礙
- 若要動態效果，建議用 CSS animation 或 SVG，不要引入重型動畫庫
- 若是靜態，直接 SVG 內嵌即可

**原 codex commits**：`65302ac`、`0cdc4d6`、`bcab1a9`（三個方向不同的試驗）

---

## 🔴 已棄案（不重做）

下列 codex 分支的工作已不適用於 Astro 架構，列在這裡只是備查。

- **refactor static article pages with shared css and template spec**（`1b467ea`）
  → 在純靜態頁時代要解的「共用 CSS 與 template」問題，Astro 用 layout/component 系統原生解決了。

---

## 維護說明

- 完成某項功能時，請從本檔案移除對應條目，並在 commit 訊息註明：`feat: implement BACKLOG #N - <功能名>`
- 新功能想法可直接 append 到對應優先級區塊
- 若某項想法經過評估不再需要，移到「已棄案」區並註明原因
- 本檔案是單人專案的輕量 backlog，不是正式 issue tracker；若日後團隊擴大，可遷移到 GitHub Issues 或 Linear/Notion
