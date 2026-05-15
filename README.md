# Jokushu Website

蓐収株式会社官网，基于 Astro 构建，按 `docs/jokushu-taskbook-v2_1.md` 的逐页规格实现。

## 运行环境

- Node.js `>= 22.12.0`
- npm

## 本地开发

```bash
npm install
npm run dev
```

默认地址：

```text
http://127.0.0.1:4321/
```

## 生产构建

```bash
npm run build
npm run preview
```

## 环境变量

本项目当前只依赖一个公开环境变量：

```env
PUBLIC_FORMSPREE_ENDPOINT=https://formspree.io/f/your_form_id
```

用途：

- `/contact` 通信页表单提交到 Formspree

如果未配置该变量：

- 页面仍可正常渲染
- “遣信 / 送る”按钮不会实际发送
- 页面会显示未配置提示

本地调试可复制 `.env.example` 为 `.env` 后填写真实值。

## 部署到 Vercel

1. 将仓库推送到 GitHub
2. 在 Vercel 导入该仓库
3. 在 Vercel Project Settings → Environment Variables 中添加：

```env
PUBLIC_FORMSPREE_ENDPOINT=https://formspree.io/f/your_form_id
```

4. 至少为 `Production` 启用该变量
5. 如需在预览分支测试表单，也为 `Preview` 启用
6. 重新部署

## 当前主要路由

- `/` 首页
- `/about` 源流
- `/services` 奉事总览
- `/services/fengshui`
- `/services/divination`
- `/services/fortune`
- `/services/strategy`
- `/articles` 文錄总览
- `/articles/[slug]` 文錄文章详情
- `/collections` 藏品
- `/contact` 通信
- `/contact/thanks` 通信回执

## 内容位置

- 页面结构文案：`src/data/pages/`
- 文錄正文：`src/content/articles/`
- 页面路由：`src/pages/`
- 公共组件：`src/components/`

## 文錄文章维护

新增或替换文章时，在 `src/content/articles/` 下放入一组双语 JSON：

- `your-slug.zh.json`
- `your-slug.ja.json`

要求：

- 两个文件的 `slug` 必须一致
- 当前支持的正文 block 类型：
  - `paragraph`
  - `heading`
  - `quote`
  - `divider`
  - `coda`

## 任务书

当前唯一有效的开发任务书：

`docs/jokushu-taskbook-v2_1.md`

旧版任务书与旧规格文件均已废弃，不应作为开发依据。
