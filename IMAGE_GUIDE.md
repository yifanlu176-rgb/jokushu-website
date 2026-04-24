# 图片优化指南

本项目已配置图片优化功能，支持自动压缩、格式转换和懒加载。

## 📁 图片目录结构

```
public/images/
├── hero/          # 首页 Hero 区域图片
├── cases/         # 案例图片
├── blog/          # 博客文章配图
└── icons/         # 图标和小图片
```

## 🎨 使用占位图片组件

项目提供了 `PlaceholderImage` 组件，用于生成 SVG 占位图片：

```astro
---
import PlaceholderImage from '../components/PlaceholderImage.astro';
---

<PlaceholderImage
  icon="☰"
  width={400}
  height={300}
  bgColor="#181510"
  iconColor="#c9a553"
/>
```

### 参数说明

- `icon` - 显示的图标/emoji（默认：☰）
- `width` - 宽度（默认：400）
- `height` - 高度（默认：300）
- `bgColor` - 背景色（默认：#181510）
- `iconColor` - 图标颜色（默认：#c9a553）

## 🖼️ 使用优化图片组件

使用 `OptimizedImage` 组件自动优化图片：

```astro
---
import OptimizedImage from '../components/OptimizedImage.astro';
---

<!-- 本地图片 -->
<OptimizedImage
  src="/images/cases/case1.jpg"
  alt="案例图片"
  width={800}
  height={600}
  loading="lazy"
/>

<!-- 外部图片 -->
<OptimizedImage
  src="https://example.com/image.jpg"
  alt="外部图片"
  width={800}
  height={600}
/>
```

### 功能特性

- ✅ 自动转换为 WebP 格式
- ✅ 响应式图片（自动生成多种尺寸）
- ✅ 懒加载（默认启用）
- ✅ 自动压缩优化
- ✅ 支持外部图片

## 📸 添加真实图片

### 1. 案例图片

将案例图片放入 `public/images/cases/`：

```
public/images/cases/
├── restaurant-fengshui.jpg
├── home-arrangement.jpg
└── business-timing.jpg
```

然后在首页更新：

```astro
<div class="case-img">
  <OptimizedImage
    src="/images/cases/restaurant-fengshui.jpg"
    alt="大阪市某餐廳旺場風水改造"
    width={400}
    height={300}
  />
</div>
```

### 2. 文章配图

在文章 Markdown 中使用：

```markdown
![图片描述](/images/blog/article-image.jpg)
```

或使用 HTML：

```html
<img src="/images/blog/article-image.jpg" alt="图片描述" loading="lazy">
```

### 3. Hero 背景图

添加 Hero 背景图：

```astro
<section id="hero" style="background-image: url('/images/hero/background.jpg');">
  <!-- Hero 内容 -->
</section>
```

## 🎯 图片优化最佳实践

### 1. 图片尺寸建议

- **Hero 背景**：1920x1080px
- **案例卡片**：800x600px（4:3 比例）
- **博客配图**：1200x800px
- **缩略图**：400x300px

### 2. 文件格式

- **照片**：JPG（压缩后上传）
- **图标/插图**：PNG 或 SVG
- **背景图**：JPG（大图）或 WebP

### 3. 文件大小

- 单张图片不超过 500KB
- 使用在线工具压缩：
  - [TinyPNG](https://tinypng.com/)
  - [Squoosh](https://squoosh.app/)
  - [ImageOptim](https://imageoptim.com/)

### 4. 命名规范

使用描述性的文件名：

```
✅ restaurant-fengshui-osaka.jpg
✅ home-interior-kobe.jpg
❌ IMG_1234.jpg
❌ photo.jpg
```

## 🔧 高级配置

### 自定义图片质量

在 `astro.config.mjs` 中配置：

```javascript
export default defineConfig({
  image: {
    service: {
      entrypoint: 'astro/assets/services/sharp',
      config: {
        quality: 80,
        format: ['webp', 'avif']
      }
    }
  }
});
```

### 响应式图片

使用 `srcset` 生成多种尺寸：

```astro
<Image
  src={myImage}
  widths={[400, 800, 1200]}
  sizes="(max-width: 600px) 400px, (max-width: 900px) 800px, 1200px"
  alt="响应式图片"
/>
```

## 📊 性能监控

### 检查图片优化效果

1. 构建项目：`npm run build`
2. 检查 `dist/` 目录中的图片
3. 使用 Chrome DevTools 查看网络请求

### 性能指标

- **LCP (Largest Contentful Paint)** < 2.5s
- **图片格式**：WebP 优先
- **懒加载**：首屏外的图片使用 lazy loading

## 🎨 占位图片方案

当前使用 SVG 占位图片的优势：

1. **零依赖**：不需要外部图片文件
2. **可定制**：颜色、图标可自由调整
3. **轻量级**：SVG 文件极小
4. **响应式**：自动适应容器大小

未来可以替换为真实图片，只需更新组件即可。

## 💡 图片来源建议

### 免费图库

- [Unsplash](https://unsplash.com/) - 高质量免费图片
- [Pexels](https://www.pexels.com/) - 免费商用图片
- [Pixabay](https://pixabay.com/) - 免费图片和插图

### 注意事项

- 确保有使用权限
- 注明图片来源（如需要）
- 避免使用有版权争议的图片

## 🚀 部署注意事项

### Vercel/Netlify

图片优化会在构建时自动处理，无需额外配置。

### 自定义服务器

确保服务器支持：
- WebP 格式
- 正确的 MIME 类型
- Gzip/Brotli 压缩

## ❓ 常见问题

**Q: 为什么使用 SVG 占位图片？**
A: 在没有真实图片时，SVG 占位图片提供了美观的视觉效果，且文件极小。

**Q: 如何批量优化图片？**
A: 使用 ImageOptim、TinyPNG 等工具批量压缩后再上传。

**Q: 图片加载慢怎么办？**
A: 检查图片大小，使用懒加载，考虑使用 CDN。

**Q: 可以使用外部图片吗？**
A: 可以，但建议将重要图片下载到本地，以确保可用性和加载速度。
