---
name: webapp-testing
description: 用于与本地 Web 应用交互和测试的 Playwright 工具包。支持前端功能验证、UI 行为调试、浏览器截图捕获和浏览器日志查看。
---

# Web 应用测试

此 skill 使用 Playwright 自动化实现本地 Web 应用的全面测试和调试。

## 何时使用此 Skill

当你需要以下功能时使用此 skill：

- 在真实浏览器中测试前端功能
- 验证 UI 行为和交互
- 调试 Web 应用问题
- 为文档或调试捕获截图
- 检查浏览器 console 日志
- 验证表单提交和用户流
- 检查响应式设计在不同视口中的表现

## 前置条件

- 系统上已安装 Node.js
- 本地运行的 Web 应用（或可访问的 URL）
- 如果未安装 Playwright，将自动安装

## 核心功能

### 1. 浏览器自动化

- 导航到 URL
- 点击按钮和链接
- 填充表单字段
- 选择下拉列表
- 处理对话框和 alert

### 2. 验证

- 断言元素存在
- 验证文本内容
- 检查元素可见性
- 验证 URL
- 测试响应式行为

### 3. 调试

- 捕获截图
- 查看 console 日志
- 检查 network 请求
- 调试失败的测试

## 使用示例

### 示例 1：基本导航测试

```javascript
// 导航到页面并验证标题
await page.goto('http://localhost:3000');
const title = await page.title();
console.log('页面标题:', title);
```

### 示例 2：表单交互

```javascript
// 填充并提交表单
await page.fill('#username', 'testuser');
await page.fill('#password', 'password123');
await page.click('button[type="submit"]');
await page.waitForURL('**/dashboard');
```

### 示例 3：截图捕获

```javascript
// 为调试捕获截图
await page.screenshot({ path: 'debug.png', fullPage: true });
```

## 指导原则

1. **始终验证应用是否运行** - 在运行测试前检查本地服务器是否可访问
2. **使用显式等待** - 等待元素或导航完成后再进行交互
3. **失败时捕获截图** - 获取截图以帮助调试问题
4. **清理资源** - 完成后始终关闭浏览器
5. **优雅处理超时** - 为缓慢操作设置合理的超时时间
6. **增量测试** - 从简单交互开始，然后进行复杂流程
7. **明智选择选择器** - 优先使用 data-testid 或基于 role 的选择器，而不是 CSS 类

## 常见模式

### 模式：等待元素

```javascript
await page.waitForSelector('#element-id', { state: 'visible' });
```

### 模式：检查元素是否存在

```javascript
const exists = await page.locator('#element-id').count() > 0;
```

### 模式：获取 Console 日志

```javascript
page.on('console', msg => console.log('浏览器日志:', msg.text()));
```

### 模式：处理错误

```javascript
try {
  await page.click('#button');
} catch (error) {
  await page.screenshot({ path: 'error.png' });
  throw error;
}
```
