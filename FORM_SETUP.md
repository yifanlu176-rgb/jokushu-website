# Formspree / Vercel 配置

本项目的通信页 `/contact` 使用 Formspree，不依赖自建后端。

## 必要环境变量

```env
PUBLIC_FORMSPREE_ENDPOINT=https://formspree.io/f/your_form_id
```

注意：

- 变量名必须是 `PUBLIC_FORMSPREE_ENDPOINT`
- 值必须是完整 endpoint，不是单独的 form id
- 因为前端需要读取，所以必须使用 `PUBLIC_` 前缀

## Vercel 配置

在 Vercel 项目中添加该环境变量：

1. 打开项目
2. 进入 `Settings`
3. 进入 `Environment Variables`
4. 新增：

   - Name: `PUBLIC_FORMSPREE_ENDPOINT`
   - Value: `https://formspree.io/f/your_form_id`

5. 至少启用：

   - `Production`

6. 如需测试预览分支，也启用：

   - `Preview`

保存后重新部署。

## 本地开发配置

在仓库根目录创建 `.env`：

```env
PUBLIC_FORMSPREE_ENDPOINT=https://formspree.io/f/your_form_id
```

然后重启开发服务器：

```bash
npm run dev
```

## 当前表单字段

通信页按任务书 v2.1 保留 3 个业务字段：

- `name`
- `contact`
- `message`

同时还会提交这些辅助字段：

- `_subject`
- `_language`
- `_next`
- `_gotcha`

## 当前行为

如果 `PUBLIC_FORMSPREE_ENDPOINT` 已配置：

- 点击“遣信 / 送る”会向 Formspree 提交
- 成功后跳转 `/contact/thanks`

如果未配置：

- 页面会显示未配置提示
- 按钮不会实际发送

## 调试检查

如果按钮无法发送，优先检查：

1. Vercel 环境变量名是否拼写正确
2. endpoint 是否是完整 `https://formspree.io/f/...`
3. 修改变量后是否重新部署
4. 浏览器当前语言对应的表单字段是否填写完整
