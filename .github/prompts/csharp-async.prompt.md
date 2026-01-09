---
agent: 'agent'
tools: ['read/problems', 'edit/editFiles', 'search/changes', 'search/codebase', 'web', 'io.github.upstash/context7/*', 'microsoftdocs/mcp/*', 'memory']
description: '获取 C# 异步编程的最佳实践'
---

# C# 异步编程（Async Programming）最佳实践

你的目标是帮助我遵循 C# 异步编程的最佳实践。

## 命名规范

- 所有异步方法必须使用 'Async' 后缀。
- 在适用时，使异步方法名称与其同步版本匹配（例如，`GetDataAsync()` 对应 `GetData()`）。

## 返回类型

- 当方法返回一个值时，返回 `Task<T>`。
- 当方法不返回值时，返回 `Task`。
- 在高性能场景下考虑使用 `ValueTask<T>` 以减少分配（Allocations）。
- 除事件处理程序（Event Handlers）外，避免为异步方法返回 `void`。

## 异常处理

- 在 `await` 表达式周围使用 `try/catch` 块。
- 避免在异步方法中吞没异常。
- 在类库代码中适当使用 `ConfigureAwait(false)` 以防止死锁（Deadlocks）。
- 在返回 `Task` 的异步方法中，使用 `Task.FromException()` 传播异常，而不是直接抛出。

## 性能

- 使用 `Task.WhenAll()` 并行执行多个任务。
- 使用 `Task.WhenAny()` 实现超时（Timeouts）或获取第一个完成的任务。
- 仅透传任务结果时，避免不必要的 `async/await`。
- 考虑为长时间运行的操作使用取消令牌（Cancellation Tokens）。

## 常见陷阱

- 严禁在异步代码中使用 `.Wait()`、`.Result` 或 `.GetAwaiter().GetResult()`。
- 避免混合使用阻塞代码和异步代码。
- 不要创建 `async void` 方法（事件处理程序除外）。
- 始终对返回 `Task` 的方法进行 `await`。

## 实现模式

- 为长时间运行的操作实现异步命令模式（Async Command Pattern）。
- 使用异步流（`IAsyncEnumerable<T>`）异步处理序列。
- 在公共 API 中考虑使用基于任务的异步模式（TAP）。

在检查我的 C# 代码时，请识别这些问题，并提出符合这些最佳实践的改进建议。
