---
agent: agent
description: '使用 Playwright MCP 进行网站探索和测试'
tools: ['search/changes', 'search/codebase', 'edit/editFiles', 'web/fetch', 'read/problems', 'execute/getTerminalOutput', 'execute/runInTerminal', 'read/terminalLastCommand', 'read/terminalSelection', 'execute/createAndRunTask', 'execute/runTask', 'read/getTaskOutput', 'execute/runTests', 'search', 'search/searchResults', 'read/terminalLastCommand', 'read/terminalSelection', 'execute/testFailure', 'playwright/*']
model: 'Claude Sonnet 4.5'
---

# 网站探索和自动化测试

你的目标是探索网站并识别关键功能。

## 具体指导

1. 使用 Playwright MCP Server 导航到提供的 URL。如果未提供 URL，请要求用户提供一个。
2. 识别并与 3-5 个核心功能或用户流程交互。
3. 记录用户交互、相关 UI 元素（及其定位器）和预期结果。
4. 完成后关闭浏览器上下文。
5. 提供一份简明的发现总结。
6. 基于探索提出并生成测试用例。
