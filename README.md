# 蓐収株式会社网站 - Astro 重构版

这是使用 Astro 框架重构的现代化版本，具有更好的可维护性和性能。

## 📁 项目结构

```
jokushu-astro/
├── src/
│   ├── components/       # 可复用组件
│   │   ├── Nav.astro    # 导航栏（含语言切换）
│   │   └── Footer.astro # 页脚
│   ├── layouts/         # 页面布局
│   │   └── Layout.astro # 主布局模板
│   ├── pages/           # 页面路由
│   │   └── index.astro  # 首页
│   ├── styles/          # 样式文件
│   │   ├── global.css   # 全局样式和变量
│   │   ├── nav.css      # 导航栏样式
│   │   ├── sections.css # Hero 和 Services 样式
│   │   └── components.css # 其他组件样式
│   └── content/         # 内容文件（未来用于文章）
├── public/              # 静态资源
└── package.json
```

## ✨ 主要改进

### 代码组织
- ✅ CSS 提取到独立文件，不再内联
- ✅ 组件化：Nav、Footer 只需维护一次
- ✅ 布局模板：所有页面共享同一布局
- ✅ 清晰的目录结构

### 功能增强
- ✅ 语言切换持久化（使用 localStorage）
- ✅ 更好的 SEO 支持
- ✅ 自动优化和打包
- ✅ 开发服务器热重载

### 性能优化
- ✅ 静态生成，加载速度快
- ✅ CSS 自动压缩
- ✅ 更小的 JavaScript 体积

## 🚀 开发指南

### 启动开发服务器
```bash
npm run dev
```
访问 http://localhost:4321

### 构建生产版本
```bash
npm run build
```

### 预览生产版本
```bash
npm run preview
```

## 📝 下一步建议

1. **文章系统** - 使用 Astro Content Collections 管理文章
2. **表单功能** - 接入 Formspree 或 Netlify Forms
3. **多语言优化** - 使用 Astro i18n 插件
4. **部署** - 推荐 Vercel、Netlify 或 Cloudflare Pages

## 📚 技术栈

- Astro 5.0 - 静态站点生成器
- TypeScript - 类型安全
- 原生 CSS - 保留原有视觉风格

详细文档：https://docs.astro.build
