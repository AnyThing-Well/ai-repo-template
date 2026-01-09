---
agent: 'agent'
tools: ['read/problems', 'read/readFile', 'edit/editFiles', 'search', 'web', 'io.github.upstash/context7/*', 'microsoftdocs/mcp/*', 'memory']
description: '获取 XUnit 单元测试（包括数据驱动测试）的最佳实践'
---

# XUnit 最佳实践

你的目标是帮助我使用 XUnit 编写有效的单元测试，涵盖标准测试和数据驱动（Data-driven）测试方法。

## 项目设置

- 使用独立的测试项目，命名规范为 `[ProjectName].Tests`。
- 引用 `Microsoft.NET.Test.Sdk`、`xunit` 和 `xunit.runner.visualstudio` 包。
- 创建与被测类对应的测试类（例如，对应 `Calculator` 的 `CalculatorTests`）。
- 使用 .NET SDK 测试命令：`dotnet test`。

## 测试结构

- 不需要测试类属性（与 MSTest/NUnit 不同）。
- 对于简单测试，使用带有 `[Fact]` 属性的测试方法。
- 遵循 Arrange-Act-Assert (AAA) 模式。
- 使用模式 `MethodName_Scenario_ExpectedBehavior` 命名测试。
- 使用构造函数进行初始化（Setup），使用 `IDisposable.Dispose()` 进行清理（Teardown）。
- 使用 `IClassFixture<T>` 在同一类测试间共享上下文。
- 使用 `ICollectionFixture<T>` 在多个测试类间共享上下文。

## 标准测试

- 使测试聚焦于单一行为。
- 避免在一个测试方法中测试多个行为。
- 使用能表达意图的清晰断言（Assertions）。
- 仅包含验证测试用例所需的断言。
- 确保测试是独立且幂等的（可以按任何顺序运行）。
- 避免测试间的相互依赖。

## 数据驱动测试

- 使用 `[Theory]` 结合数据源属性。
- 对于内联测试数据，使用 `[InlineData]`。
- 对于基于方法的测试数据，使用 `[MemberData]`。
- 对于基于类的测试数据，使用 `[ClassData]`。
- 通过实现 `DataAttribute` 创建自定义数据属性。
- 在数据驱动测试中使用有意义的参数名称。

## 断言 (Assertions)

- 使用 `Assert.Equal` 进行值相等判断。
- 使用 `Assert.Same` 进行引用相等判断。
- 使用 `Assert.True`/`Assert.False` 判断布尔条件。
- 使用 `Assert.Contains`/`Assert.DoesNotContain` 判断集合内容。
- 使用 `Assert.Matches`/`Assert.DoesNotMatch` 进行正则表达式匹配。
- 使用 `Assert.Throws<T>` 或 `await Assert.ThrowsAsync<T>` 测试异常。
- 考虑使用 Fluent Assertions 库以提高断言的可读性。

## 模拟（Mocking）与隔离

- 配合 XUnit 考虑使用 Moq 或 NSubstitute。
- 模拟依赖项以隔离被测单元。
- 使用接口（Interfaces）来简化 Mock。
- 考虑为复杂的测试设置使用依赖注入（DI）容器。

## 测试组织

- 按功能或组件对测试进行分组。
- 使用 `[Trait("Category", "CategoryName")]` 进行分类。
- 使用集合固定装置（Collection Fixtures）对具有共享依赖项的测试进行分组。
- 考虑使用输出助手（`ITestOutputHelper`）进行测试诊断。
- 在 `Fact` 或 `Theory` 属性中使用 `Skip = "原因"` 有条件地跳过测试。
