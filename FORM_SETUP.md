# 表单功能设置指南

表单功能已经配置完成，使用 Formspree 服务（免费）。

## 🚀 快速设置（5分钟）

### 1. 注册 Formspree 账号

访问：https://formspree.io/register

- 使用邮箱注册（免费账号每月 50 次提交）
- 验证邮箱

### 2. 创建表单

1. 登录后点击 "New Form"
2. 表单名称：`Jokushu Booking Form`
3. 创建后会得到一个表单 ID，格式如：`xyzabc123`

### 3. 更新网站代码

打开 `src/pages/index.astro`，找到第 226 行：

```html
<form id="bookingForm" action="https://formspree.io/f/YOUR_FORM_ID" method="POST">
```

将 `YOUR_FORM_ID` 替换为你的表单 ID：

```html
<form id="bookingForm" action="https://formspree.io/f/xyzabc123" method="POST">
```

### 4. 测试表单

1. 保存文件
2. 访问 http://localhost:4322/#booking
3. 填写并提交表单
4. 检查 Formspree 后台是否收到提交

## ✨ 功能特性

### 已实现的功能

- ✅ 异步提交（不刷新页面）
- ✅ 提交状态显示（成功/失败）
- ✅ 表单验证（必填字段）
- ✅ 双语支持（中英文）
- ✅ 自动记录提交语言
- ✅ 错误处理

### 表单字段

- **name** - 姓名
- **contact** - 联系方式（Email/LINE/WeChat）
- **service** - 咨询服务类型
- **message** - 咨询主题/问题描述
- **_subject** - 邮件主题（自动设置）
- **_language** - 提交语言（自动设置）

## 📧 接收通知

### 邮件通知

Formspree 会将表单提交发送到你注册的邮箱。

### 自定义邮件模板（可选）

在 Formspree 后台可以：
- 设置自动回复邮件
- 自定义邮件模板
- 添加多个接收邮箱
- 设置 Webhook 集成

## 🔧 高级配置（可选）

### 1. 防垃圾邮件

在 Formspree 后台启用：
- reCAPTCHA 验证
- 蜜罐字段
- 提交频率限制

### 2. 重定向页面

在表单中添加：
```html
<input type="hidden" name="_next" value="https://yoursite.com/thank-you">
```

### 3. 自定义回复邮件

在 Formspree 后台设置：
- 自动回复内容
- 回复邮件地址
- 邮件模板

## 💡 替代方案

如果不想使用 Formspree，可以选择：

### 1. Netlify Forms（如果部署到 Netlify）

```html
<form name="booking" method="POST" data-netlify="true">
  <!-- 表单字段 -->
</form>
```

### 2. Google Forms

创建 Google 表单，嵌入到网站中。

### 3. 自建后端

使用 Node.js + Express + Nodemailer 搭建表单后端。

## 📊 监控表单提交

### Formspree 后台

- 查看所有提交记录
- 导出为 CSV
- 查看提交统计

### 邮件通知

每次提交都会收到邮件通知，包含：
- 提交时间
- 所有表单字段内容
- 提交者 IP（可选）

## ❓ 常见问题

**Q: 免费版够用吗？**
A: 免费版每月 50 次提交，对于初期网站足够。如果需要更多，可升级到付费版（$10/月，1000次提交）。

**Q: 表单提交后没有收到邮件？**
A: 检查垃圾邮件文件夹，或在 Formspree 后台查看提交记录。

**Q: 可以自定义成功消息吗？**
A: 可以，修改 `src/pages/index.astro` 中的成功消息文本。

**Q: 如何添加更多字段？**
A: 在表单中添加新的 input/select/textarea，并设置 `name` 属性即可。

## 🎯 下一步

1. 注册 Formspree 账号
2. 获取表单 ID
3. 更新代码中的 `YOUR_FORM_ID`
4. 测试表单提交
5. 部署到生产环境

完成后，你的网站就有了完整的表单功能！
