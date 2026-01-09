---
agent: 'agent'
tools: ['read', 'edit', 'search', 'web', 'io.github.upstash/context7/*', 'microsoftdocs/mcp/*', 'memory']
description: '确保 .NET/C# 代码符合该解决方案/项目的最佳实践。'
---
# .NET/C# 最佳实践

你的任务是确保在 `${selection}` 中的 .NET/C# 代码符合本项目特定的最佳实践。这包括：

## 文档与结构

- 为所有公共类、接口、方法和属性创建详尽的 XML 文档注释。
- 在 XML 注释中包含参数描述和返回值描述。
- 遵循已建立的命名空间结构：`{Core|Console|App|Service}.{Feature}`。

## 设计模式与架构

- 使用主要构造函数（Primary Constructor）语法进行依赖注入（例如：`public class MyClass(IDependency dependency)`）。
- **模块化单体 (Modular Monolith)**: 按照功能垂直切片划分模块。模块间通过 `internal` 访问权限隔离，优先使用 **显式接口 (Explicit Interfaces)** 和 **依赖注入 (DI)** 进行同步通信。
- 遵循接口隔离原则（Interface Segregation），采用清晰的命名规范（接口以 'I' 为前缀）。
- 对于复杂对象的创建，遵循工厂（Factory）模式。

## 依赖注入（DI）与服务

- 使用构造函数进行依赖注入，并通过 `ArgumentNullException` 进行空值检查。
- 以适当的生命周期（Singleton, Scoped, Transient）注册服务。
- 使用 `Microsoft.Extensions.DependencyInjection` 模式。
- 实现服务接口以增强可测试性。

## 资源管理与本地化

- 使用 `ResourceManager` 处理本地化消息和错误字符串。
- 将 `LogMessages` 和 `ErrorMessages` 资源文件分开。
- 通过 `_resourceManager.GetString("MessageKey")` 访问资源。

## 异步（Async/Await）模式

- 为所有 I/O 操作和长时间运行的任务使用 `async/await`。
- 异步方法返回 `Task` 或 `Task<T>`。
- 在合适的地方使用 `ConfigureAwait(false)`。
- 正确处理异步异常。

## 测试标准

- 使用 XUnit 作为测试框架。
- 遵循 AAA 模式（Arrange, Act, Assert）。
- 使用 Moq 模拟依赖项。
- 测试成功和失败两种场景。
- 包含空参数验证测试。

## 验证实践 (Validation Practice)

- **避免构造函数膨胀**：禁止注入多个具体的 `IValidator<T>`。注入单一的 `IValidatorProvider` 或 `IServiceProvider` 动态获取验证器。
- **验证总管模式**：使用 `await validator.ValidateAsync(request)` 风格进行显式验证。
- **FluentValidation**：验证器应与 DTO 同属应用层，并使用程序集扫描自动注册。

## Semantic Kernel 与 AI 集成

- 使用 `Microsoft.SemanticKernel` 进行 AI 操作。
- 实现正确的 Kernel 配置和服务注册。
- 处理 AI 模型设置（ChatCompletion, Embedding 等）。
- 使用结构化输出模式（Structured Output Patterns）以获得可靠的 AI 响应。

## 错误处理与日志记录

- 使用 `Microsoft.Extensions.Logging` 进行结构化日志记录。
- 包含具有意义上下文的分范围日志（Scoped Logging）。
- 尽量使用LoggerMessage特性以提高性能。
- 抛出具有描述性信息的特定异常。
- 在预期失败的场景中使用 `try-catch` 块。

## 性能与安全

- 在适用情况下使用 C# 12+ 特性和 .NET 8 优化。
- 实现正确的输入验证和清理。
- 对数据库操作使用参数化查询。
- 遵循 AI/ML 操作的安全编码实践。

## 代码质量

- 确保符合 SOLID 原则。
- **现代 C# 优化**：默认使用 `sealed`；对 DTO 优先选择 `record` 及 `required init`；应用 `[ImmutableObject(true)]`；使用 `ThrowIfNull` 和集合表达式 `[]`。
- 通过基类和工具类避免代码重复。
- 使用反映领域（Domain）概念的有意义名称。
- 保持方法聚焦且具有高内聚性。
- 为资源实现适当的处置（Disposal）模式。
