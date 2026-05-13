# 联系表单设置（Formspree）

当前项目的联系表单方案采用 **Formspree**。它不依赖自建后端，前端只需要配置表单 `action` 地址，适合部署到 Vercel。

## 选择原因

- 对静态站点友好
- 不需要数据库
- 表单字段简单时最省事

## 配置步骤

1. 注册 Formspree 账号
2. 在后台新建一个表单
3. 复制表单 ID
4. 把部署环境变量 `PUBLIC_FORMSPREE_ENDPOINT` 设成你的 Formspree 地址，或直接把页面中的表单 `action` 改成你的 Formspree 地址

示例：

```html
<form id="contactForm" action="https://formspree.io/f/YOUR_FORM_ID" method="POST">
```

替换成真实 ID 后：

```html
<form id="contactForm" action="https://formspree.io/f/xyzabc123" method="POST">
```

## 推荐字段

- `name`
- `contact`
- `service`
- `message`
- `_subject`
- `_language`

## 可选增强

- `_next` 用于提交成功后的跳转
- 蜜罐字段用于基础反垃圾
- Formspree 后台可开启通知邮件和自动回复

## 不采用的方案

- Google Forms
- 自建 API + 邮件服务

## 下一步

1. 注册 Formspree
2. 创建表单
3. 更新部署环境变量 `PUBLIC_FORMSPREE_ENDPOINT`
4. 本地测试提交
5. 部署到 Vercel
