---
description: '构建 C# 应用程序的指南'
applyTo: '**/*.cs'
---

# C# 开发

## C# 指令
- 始终使用最新版本的 C#，目前为 C# 14 特性。
- 为每个函数编写清晰、简洁的注释。

## 通用指令
- 在审查代码更改时，仅提出高置信度的建议。
- 编写具有良好可维护性实践的代码，包括关于为何做出某些设计决定的说明注释。
- 处理边缘情况并编写清晰的异常处理。
- 对于库或外部依赖项，在注释中提及它们的用法和目的。

## Naming Conventions

- Follow PascalCase for component names, method names, and public members.
- Use camelCase for private fields and local variables.
- Prefix interface names with "I" (e.g., IUserService).

## 性能与设计优化 (Optimizations)

- **异步优先**: 始终优先使用异步 API 处理 I/O、数据访问及长耗时操作。禁止在异步上下文中调用 `.Wait()` 或 `.Result`，防止线程池饥饿。
- **避免不必要的 Task.Run**: 不要在常规 ASP.NET Core 控制器或中间件中使用 `Task.Run` 来包装同步代码试图使其“异步”，除非是为了迁移大量繁重的 CPU 密集型任务。
- **高效处理集合**: 对于大型集合，优先返回 `IAsyncEnumerable<T>` 或实现分页，避免一次性加载所有数据到内存。
- **显式密封**: 默认将类声明为 `sealed`（除非设计为基类），以启用编译器去虚化优化。
- **防错初始化**: 优先使用 `readonly` 字段及 `required init` 属性，确保对象在初始化后不可变且关键数据不缺失。
- **数据容器**: 优先使用 `record` (或 `record struct`) 定义 DTO、值对象及纯数据模型。
- **显式不可变性**: 对 `record` 或不可变 DTO 使用 `[ImmutableObject(true)]` 特性，为设计器和工具链提供明确的不可变意图提示。
- **现代化防御编程**: 使用 `ArgumentNullException.ThrowIfNull(param)` 替代传统的空检查方案，提升代码简洁性与 JIT 优化友好度。
- **集合表达式**: 优先使用 `[]` (Collection Expressions) 初始化集合，以获得潜在的类型推导性能提升。
- **资源复用**: 对于 HTTP 调用，始终通过 `IHttpClientFactory` 获取实例，禁止直接 `new HttpClient()` 造成套接字耗尽。
- **内存优化**: 在热点路径（Hot Code Paths）中尽量减少大对象分配；频繁使用的大型字节数组应使用 `ArrayPool<T>` 缓冲池。

## Formatting

- Apply code-formatting style defined in `.editorconfig`.
- Prefer file-scoped namespace declarations and single-line using directives.
- Insert a newline before the opening curly brace of any code block (e.g., after `if`, `for`, `while`, `foreach`, `using`, `try`, etc.).
- Ensure that the final return statement of a method is on its own line.
- Use pattern matching and switch expressions wherever possible.
- Use `nameof` instead of string literals when referring to member names.
- Ensure that XML doc comments are created for any public APIs. When applicable, include `<example>` and `<code>` documentation in the comments.

## 项目设置与结构策略

- 指导用户使用适当的模板创建新的 .NET 项目。
- 解释每个生成的文件和文件夹的用途，以建立对项目结构的理解。
- 演示如何使用功能文件夹（Feature folders）、领域驱动设计（DDD）或**模块化单体 (Modular Monolith)** 原则组织代码。对于模块化单体，强调模块间的 `internal` 隔离。优先通过定义良好的接口契约进行同步通信。
- 通过模型（Models）、服务（Services）和数据访问层（Data access layers）展示适当的关注点分离。
- 解释 ASP.NET Core 10 中的 `Program.cs` 和配置系统，包括 environment 特定的设置。

## 可空引用类型 (Nullable Reference Types)

- Declare variables non-nullable, and check for `null` at entry points.
- Always use `is null` or `is not null` instead of `== null` or `!= null`.
- Trust the C# null annotations and don't add null checks when the type system says a value cannot be null.

## 数据访问模式 (Data Access Patterns)

- Guide the implementation of a data access layer using Entity Framework Core.
- Explain different options (SQL Server, SQLite, In-Memory) for development and production.
- Demonstrate repository pattern implementation and when it's beneficial.
- Show how to implement database migrations and data seeding.
- Explain efficient query patterns to avoid common performance issues.

## 身份验证与授权 (Authentication and Authorization)

- Guide users through implementing authentication using JWT Bearer tokens.
- Explain OAuth 2.0 and OpenID Connect concepts as they relate to ASP.NET Core.
- Show how to implement role-based and policy-based authorization.
- Demonstrate integration with Microsoft Entra ID (formerly Azure AD).
- Explain how to secure both controller-based and Minimal APIs consistently.

## 验证与错误处理 (Validation and Error Handling)

- **FluentValidation 统一验证**：注入单一的 `IValidatorProvider` 接口，通过 `await _validatorProvider.ValidateAsync(dto)` 动态执行验证。严禁在构造函数中注入多个 `IValidator<T>`。
- 强调验证器 (`AbstractValidator<T>`) 应位于应用层，并随功能文件夹或模块部署。
- **序列化规范**: 默认使用 `System.Text.Json`。它针对 UTF-8 进行了优化且支持异步读写，性能优于 `Newtonsoft.Json`。只有在旧系统集成且必须使用 `Newtonsoft.Json` 特性时才考虑切换。
- 演示使用中间件的全局异常处理策略。
- Show how to create consistent error responses across the API.
- Explain problem details (RFC 7807) implementation for standardized error responses.

## API 版本控制与文档 (API Versioning and Documentation)

- Guide users through implementing and explaining API versioning strategies.
- Demonstrate Swagger/OpenAPI implementation with proper documentation.
- Show how to document endpoints, parameters, responses, and authentication.
- Explain versioning in both controller-based and Minimal APIs.
- Guide users on creating meaningful API documentation that helps consumers.

## 日志记录与监控 (Logging and Monitoring)

- Guide the implementation of structured logging using Serilog or other providers.
- Explain the logging levels and when to use each.
- Demonstrate integration with Application Insights for telemetry collection.
- Show how to implement custom telemetry and correlation IDs for request tracking.
- Explain how to monitor API performance, errors, and usage patterns.

## 测试 (Testing)

- Always include test cases for critical paths of the application.
- Guide users through creating unit tests.
- Do not emit "Act", "Arrange" or "Assert" comments.
- Copy existing style in nearby files for test method names and capitalization.
- Explain integration testing approaches for API endpoints.
- Demonstrate how to mock dependencies for effective testing.
- Show how to test authentication and authorization logic.
- Explain test-driven development principles as applied to API development.

## 性能优化 (Performance Optimization)

- 指导用户实现缓存策略（内存、分布式、响应缓存）。
- 解释异步编程模式及其对 API 性能的重要性。
- 为大数据集演示分页、过滤和排序。
- 展示如何实现压缩和其他性能优化。
- 解释如何衡量和基准测试（Benchmark）API 性能。

## 部署与 DevOps

- 指导用户使用 .NET 内置的容器支持（`dotnet publish --os linux --arch x64 -p:PublishProfile=DefaultContainer`）将 API 容器化。
- 解释手动创建 Dockerfile 与 .NET 容器发布功能之间的差异。
- 解释 .NET 应用程序的 CI/CD 流水线。
- 演示部署到 Azure App Service、Azure Container Apps 或其他托管选项。
- 展示如何实现健康检查（Health checks）和就绪探针（Readiness probes）。
- 解释不同部署阶段的环境特定配置。
