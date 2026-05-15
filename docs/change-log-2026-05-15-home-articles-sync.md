# 2026-05-15 首页文錄同步修正

## 背景

线上首页「近期文錄」仍读取旧版 Markdown 文章集合与旧 slug 映射，未与当前 `/articles` 章节的 JSON 文章源保持一致。

## 修正内容

- 首页文錄区改为直接复用 `src/lib/articles.ts`
- 列表来源改为当前文錄 JSON 文章集合
- 首页固定显示按日期倒序的最新四篇文章
- 移除 `src/data/pages/home.json` 中已失效的旧文章映射数据

## 影响

- 首页 `/` 的「近期文錄」现与 `/articles` 保持同源
- 后续新增或替换文章时，只需维护 `src/content/articles/` 下的双语 JSON
