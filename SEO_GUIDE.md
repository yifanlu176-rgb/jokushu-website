# SEO 优化指南

本项目已完成全面的 SEO 优化，包括 sitemap、robots.txt、meta 标签、结构化数据等。

## ✅ 已实现的 SEO 功能

### 1. Sitemap（站点地图）

自动生成 XML sitemap，帮助搜索引擎发现和索引所有页面。

**位置：** `/sitemap-index.xml`（构建后自动生成）

**配置：** `astro.config.mjs`
```javascript
sitemap({
  i18n: {
    defaultLocale: 'zh',
    locales: {
      zh: 'zh-TW',
      en: 'en-US',
    },
  },
})
```

### 2. Robots.txt

告诉搜索引擎哪些页面可以抓取。

**位置：** `/public/robots.txt`

**内容：**
- 允许所有搜索引擎抓取
- 指向 sitemap 位置
- 支持 Google、Bing、百度等主流搜索引擎

### 3. Meta 标签

每个页面都包含完整的 meta 标签：

**基础 Meta：**
- `title` - 页面标题
- `description` - 页面描述
- `author` - 作者信息
- `canonical` - 规范链接
- `keywords` - 关键词

**Open Graph（社交媒体分享）：**
- `og:type` - 内容类型（website/article）
- `og:url` - 页面 URL
- `og:title` - 分享标题
- `og:description` - 分享描述
- `og:image` - 分享图片
- `og:locale` - 语言区域

**Twitter Card：**
- `twitter:card` - 卡片类型
- `twitter:title` - 标题
- `twitter:description` - 描述
- `twitter:image` - 图片

### 4. 结构化数据（Schema.org）

使用 JSON-LD 格式添加结构化数据，帮助搜索引擎理解网站内容。

**类型：** `ProfessionalService`

**包含信息：**
- 公司名称和描述
- Logo 和图片
- 地址和地理位置
- 服务类型
- 联系方式

### 5. 地理位置标签

针对本地 SEO 优化：
- `geo.region` - JP-27（大阪）
- `geo.placename` - Osaka
- `geo.position` - 经纬度坐标
- `ICBM` - 地理坐标

## 🎯 SEO 最佳实践

### 1. 页面标题优化

**格式：** `页面名称 | 蓐収株式会社`

**示例：**
- 首页：`蓐収株式会社 | 玄學・風水・命理`
- 文章：`奇門遁甲入門 | 蓐収株式会社`

**要点：**
- 长度控制在 50-60 字符
- 包含主要关键词
- 品牌名称放在后面

### 2. 描述优化

**长度：** 150-160 字符

**要点：**
- 简洁描述页面内容
- 包含目标关键词
- 吸引用户点击

### 3. 关键词策略

**主要关键词：**
- 风水、奇门遁甲、命理、玄学
- 大阪、在日华人
- 风水咨询、室内布置
- 八字、紫微斗数

**长尾关键词：**
- 大阪风水咨询
- 在日华人风水服务
- 奇门遁甲择日
- 日本购房风水

### 4. URL 结构

**当前结构：**
```
https://www.jokushu.co.jp/
https://www.jokushu.co.jp/articles/
https://www.jokushu.co.jp/articles/qimen/
```

**优点：**
- 简洁清晰
- 语义化
- 易于记忆

### 5. 内部链接

**已实现：**
- 首页链接到文章列表
- 文章列表链接到具体文章
- 文章页面返回首页链接

**建议：**
- 在文章中添加相关文章推荐
- 添加面包屑导航
- 服务页面互相链接

## 📊 性能优化（影响 SEO）

### Core Web Vitals

**LCP (Largest Contentful Paint)：**
- 目标：< 2.5s
- 优化：图片懒加载、WebP 格式

**FID (First Input Delay)：**
- 目标：< 100ms
- 优化：最小化 JavaScript

**CLS (Cumulative Layout Shift)：**
- 目标：< 0.1
- 优化：固定图片尺寸、避免动态内容

### 移动端优化

- ✅ 响应式设计
- ✅ 触摸友好的按钮
- ✅ 快速加载速度
- ✅ 移动端导航

## 🔧 配置说明

### 更新网站 URL

在 `astro.config.mjs` 中更新：

```javascript
export default defineConfig({
  site: 'https://your-domain.com', // 替换为实际域名
  // ...
});
```

同时更新：
- `public/robots.txt` 中的 Sitemap URL
- Layout 中的结构化数据 URL

### 更新联系信息

在 `src/layouts/Layout.astro` 的结构化数据中更新：

```json
{
  "telephone": "+81-XX-XXXX-XXXX",
  "email": "contact@jokushu.com"
}
```

### 添加 Google Analytics

在 `src/layouts/Layout.astro` 的 `<head>` 中添加：

```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>
```

### 添加 Google Search Console

1. 访问 [Google Search Console](https://search.google.com/search-console)
2. 添加网站
3. 验证所有权（推荐使用 HTML 标签方法）
4. 提交 sitemap：`https://your-domain.com/sitemap-index.xml`

## 📈 SEO 检查清单

### 部署前检查

- [ ] 更新 `astro.config.mjs` 中的 `site` URL
- [ ] 更新 `robots.txt` 中的 Sitemap URL
- [ ] 更新结构化数据中的联系信息
- [ ] 检查所有页面的 title 和 description
- [ ] 测试所有内部链接
- [ ] 验证 sitemap 生成正确

### 部署后检查

- [ ] 提交 sitemap 到 Google Search Console
- [ ] 提交 sitemap 到 Bing Webmaster Tools
- [ ] 使用 [Google Rich Results Test](https://search.google.com/test/rich-results) 测试结构化数据
- [ ] 使用 [PageSpeed Insights](https://pagespeed.web.dev/) 测试性能
- [ ] 使用 [Mobile-Friendly Test](https://search.google.com/test/mobile-friendly) 测试移动端
- [ ] 检查 Open Graph 标签（使用 Facebook Debugger）

### 持续优化

- [ ] 定期更新内容
- [ ] 添加新文章
- [ ] 监控搜索排名
- [ ] 分析用户行为
- [ ] 优化转化率

## 🛠️ SEO 工具推荐

### 免费工具

1. **Google Search Console** - 监控搜索表现
2. **Google Analytics** - 分析用户行为
3. **PageSpeed Insights** - 性能测试
4. **Lighthouse** - 综合评分
5. **Screaming Frog** - 网站爬虫（免费版 500 页）

### 在线工具

1. **[SEO Site Checkup](https://seositecheckup.com/)** - SEO 综合检查
2. **[GTmetrix](https://gtmetrix.com/)** - 性能分析
3. **[Ahrefs Webmaster Tools](https://ahrefs.com/webmaster-tools)** - 免费 SEO 工具
4. **[Ubersuggest](https://neilpatel.com/ubersuggest/)** - 关键词研究

## 📝 内容 SEO 建议

### 文章优化

1. **标题：** 包含目标关键词，吸引点击
2. **首段：** 在前 100 字内出现主要关键词
3. **小标题：** 使用 H2、H3 结构化内容
4. **内部链接：** 链接到相关文章
5. **外部链接：** 引用权威来源
6. **图片：** 添加 alt 文本
7. **长度：** 至少 1000 字以上

### 关键词密度

- 主关键词：1-2%
- 相关关键词：自然分布
- 避免关键词堆砌

### 用户体验

- 段落简短（3-4 行）
- 使用列表和要点
- 添加图片和视觉元素
- 提供清晰的行动号召

## 🌐 多语言 SEO

### 当前实现

- 中文（繁体）为主要语言
- 英文为辅助语言
- 使用 `data-lang` 属性切换内容

### 改进建议

1. **独立 URL：**
   - `/zh/` - 中文版本
   - `/en/` - 英文版本

2. **hreflang 标签：**
```html
<link rel="alternate" hreflang="zh-TW" href="https://www.jokushu.co.jp/zh/" />
<link rel="alternate" hreflang="en-US" href="https://www.jokushu.co.jp/en/" />
```

3. **语言选择器：**
   - 明确的语言切换按钮
   - 记住用户语言偏好

## 📞 技术支持

如有 SEO 相关问题，可以：
1. 查看 [Astro SEO 文档](https://docs.astro.build/en/guides/integrations-guide/sitemap/)
2. 使用 Google Search Console 诊断
3. 参考本文档的检查清单

---

**最后更新：** 2025-04-25
**版本：** 1.0
