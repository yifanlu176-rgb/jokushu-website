# Article Page Template Spec

适用范围：`article-*.html`

## 固定 DOM 结构（不可改动）

```html
<nav>
  <a class="nav-logo" href="index.html">蓐収株式会社<span>JOKUSHU CO., LTD.</span></a>
  <a class="nav-back" href="index.html#blog">← 返回文章列表</a>
</nav>

<div class="article-hero">
  <p class="article-eyebrow">...</p>
  <h1 class="article-title">...</h1>
  <div class="article-meta">
    <span class="meta-item">日期</span>
    <div class="meta-divider"></div>
    <span class="meta-item">蓐収株式会社</span>
    <div class="meta-divider"></div>
    <span class="meta-item">閱讀時長</span>
  </div>
</div>

<div class="article-body">
  <!-- 正文 -->
</div>

<div class="article-footer">
  <div class="cta-box">
    <h3>有相關問題想進一步諮詢？</h3>
    <p>蓐収株式会社提供免費三十分鐘初次諮詢，歡迎預約線上交流。</p>
    <a class="btn-primary" href="index.html#booking">預約免費初談</a>
  </div>
  <div class="related-articles">
    <h4>相關文章</h4>
    <div class="related-list">
      <a class="related-item" href="...">...</a>
    </div>
  </div>
</div>
```

## 样式引用规范（固定）

每篇文章头部统一保留：

```html
<link rel="stylesheet" href="assets/css/base.css">
<link rel="stylesheet" href="assets/css/article.css">
```

## 新增文章“最小改动流程”

新增 `article-*.html` 时，仅允许改动以下字段：

1. `<title>`
2. meta 描述（如有）
3. `.article-meta` 中日期与阅读时长
4. `.article-body` 正文内容
5. 页面文件名 slug（例如 `article-your-slug.html`）

**禁止改动**：

- nav DOM 结构
- article-meta DOM 层级
- CTA DOM 结构与文案
- related-list 容器层级与 class 命名
- CSS 文件路径

## 可选 SSG 路线（保留静态部署）

后续可引入极轻量 SSG（11ty 或 Astro）生成 `article-*.html`，
以同一模板输出静态文件并直接部署到现有静态托管环境。
