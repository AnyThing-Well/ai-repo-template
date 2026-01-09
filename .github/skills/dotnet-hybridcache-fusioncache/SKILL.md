---
name: dotnet-hybridcache-fusioncache
description: .NET HybridCache 与 FusionCache 的 L1/L2 多级缓存实践：选型、注册、序列化、失效与多节点一致性（Backplane）。
---

# HybridCache + FusionCache：L1/L2 多级缓存

此 skill 用于在 .NET / ASP.NET Core 项目里落地“本地内存缓存（L1）+ 分布式缓存（L2）”的**可靠**实现。

你将得到：

- **HybridCache（Microsoft 官方）**：统一的 L1/L2 API、stampede protection、可配置序列化、tag 失效（逻辑）。
- **FusionCache（OSS）**：在 L1/L2 基础上，提供更强的弹性能力（fail-safe、soft/hard timeouts、backplane 多节点一致性、可观测性等）。
- **组合用法**：用 FusionCache 作为 `HybridCache` 抽象的实现（适配器），既能保持代码对 Microsoft 抽象的依赖，又能拥有 FusionCache 的增强特性。

## 何时使用此 Skill

- 你想把 `IMemoryCache` / `IDistributedCache` 的手写样板代码替换为更一致、更难写错的抽象。
- 你需要 L1（内存）+ L2（Redis/SQL/Postgres 等）以解决：冷启动、横向扩容、多实例共享缓存。
- 你遇到高并发热点 key，需要 **cache stampede（缓存击穿/雪崩式回源）保护**。
- 你在多节点（多 pod / 多实例）环境需要**缓存一致性**，避免“某个节点更新后其他节点 L1 仍旧读旧值”。

## 权威依据（建议优先参考）

- Microsoft Learn：HybridCache 概览与动机（统一 L1/L2、stampede protection、可配置序列化）
  - [Overview of caching in ASP.NET Core（HybridCache）](https://learn.microsoft.com/en-us/aspnet/core/performance/caching/overview?view=aspnetcore-10.0#hybridcache)
- Microsoft Learn：HybridCache 详细用法（GetOrCreateAsync、options、tags、序列化、AOT 注意事项）
  - [HybridCache library in ASP.NET Core](https://learn.microsoft.com/en-us/aspnet/core/performance/caching/hybrid?view=aspnetcore-10.0)
- FusionCache GitHub Docs：
  - L1/L2（Cache Levels）：[CacheLevels.md](https://github.com/ZiggyCreatures/FusionCache/blob/main/docs/CacheLevels.md)
  - Backplane（多节点同步）：[Backplane.md](https://github.com/ZiggyCreatures/FusionCache/blob/main/docs/Backplane.md)
  - Fail-Safe：[FailSafe.md](https://github.com/ZiggyCreatures/FusionCache/blob/main/docs/FailSafe.md)
  - Timeouts：[Timeouts.md](https://github.com/ZiggyCreatures/FusionCache/blob/main/docs/Timeouts.md)
  - Cache Stampede：[CacheStampede.md](https://github.com/ZiggyCreatures/FusionCache/blob/main/docs/CacheStampede.md)
  - Microsoft HybridCache 适配：[MicrosoftHybridCache.md](https://github.com/ZiggyCreatures/FusionCache/blob/main/docs/MicrosoftHybridCache.md)

## 概念速记：L1/L2 是什么

- **L1（本地内存缓存）**：每个实例自己的内存，速度最快，但进程重启丢失，且多实例之间天然不一致。
- **L2（分布式缓存）**：Redis / SQL / Postgres 等共享存储，用于跨实例共享与冷启动加速，但访问更慢、更容易受网络波动影响。

理想策略：

- 热数据优先命中 L1；
- L1 miss 再查 L2；
- L2 miss 才回源（DB/HTTP）；
- 写入时通常写 L1+L2；
- 多节点场景要考虑“别的节点 L1 什么时候失效”。

## 选型建议：HybridCache vs FusionCache

### 用 HybridCache（Microsoft）更合适的场景

- 你只需要一个**官方统一抽象**来替代 `IMemoryCache`+`IDistributedCache` 的样板。
- 你不需要（或暂时不想引入）更复杂的弹性特性（fail-safe、backplane 等）。
- 你更偏好 Microsoft 提供的默认实现与配置方式。

### 用 FusionCache 更合适的场景

- 你在生产上非常在意**降级与韧性**：
  - 回源慢时用 stale 兜底（fail-safe + soft/hard timeout）；
  - 分布式缓存/网络抖动不应拖垮请求；
  - 希望更多可观测性（日志 + OpenTelemetry）。
- 你是**多节点**环境且在意一致性：想要 backplane 让其它节点尽快同步/失效本地 L1。

### “两全其美”：用 FusionCache 实现 HybridCache 抽象

Microsoft 文档也明确提到可以使用自定义 `HybridCache` 实现（示例指向 FusionCache）。

推荐方式：

- 业务代码依赖 `HybridCache`（抽象/契约稳定、便于替换）；
- DI 中用 FusionCache 的适配器把它暴露为 `HybridCache`；
- 需要更强能力的地方也可以直接注入 `IFusionCache`。

## HybridCache：关键最佳实践

### 1) 统一使用 `GetOrCreateAsync`，并让 key 有“语义前缀”

- key 必须唯一标识数据；建议形如：`"orders:{region}:{orderId}"`。
- 避免把**未清洗的用户输入**直接作为 key，防止 key flooding / 安全问题。
- HybridCache 默认实现对 key 长度有上限（默认 1024，可配置），超出会绕过缓存并记录日志。

### 2) 了解 Local/L2 的行为与多节点限制

- HybridCache 会先查 **primary（本地）**，miss 再查 **secondary（分布式）**，再回源并写入两级。
- Microsoft 文档明确提示：
  - 通过 key/tag 失效会作用于当前节点与 L2，但**其他节点的 in-memory L1 不会被主动清理**。
  - 多节点一致性如果是硬需求，需要额外机制（比如 FusionCache backplane）。

### 3) Tag 失效是“逻辑失效”

- HybridCache 的 tag 不会立刻物理删除 IMemoryCache/IDistributedCache 中的数据。
- 它更像一个“版本/黑名单”机制：带 tag 的数据在读取时被视为 miss，数据本体依然按 TTL 自然过期。

### 4) 处理对象复用与线程安全

- HybridCache 为兼容旧 `IDistributedCache` 习惯，默认会保持“每次读取都反序列化得到新实例”的行为，避免共享实例导致并发修改 bug。
- 如果你缓存的是不可变对象，且希望启用复用优化，需要按 Microsoft 指引标记类型不可变（例如 `sealed` + `[ImmutableObject(true)]`）。

### 5) AOT/Trimming 注意事项

- Native AOT 下不能依赖运行时反射序列化。
- 如果缓存自定义类型，优先用 `System.Text.Json` source generator 或配置 AOT 友好的序列化方案。

## FusionCache：关键最佳实践

### 1) 明确 L1+L2 并配置序列化

- L2 使用任何 `IDistributedCache` 实现。
- 由于 L2 存 `byte[]`，FusionCache 需要 `IFusionCacheSerializer`。
- 如果你的 L2 是 Redis：建议引入对应的 serializer 包（System.Text.Json / Newtonsoft / MessagePack / Protobuf 等）。

### 2) Level-specific options：让 L1/L2 不同 TTL

- `MemoryCacheDuration` / `DistributedCacheDuration` 允许 L1 与 L2 不同 TTL。
- 如果没有 backplane，可用较短的 `MemoryCacheDuration` 缓解不一致窗口（只是缓解，不是根治）。

### 3) Backplane：多节点一致性的“正解”

FusionCache 的 backplane 会在 Set/Remove/Expire 等操作后发布通知：

- 其他节点接到通知后，会按需移除/刷新自己的 L1（不会广播大 payload）。
- FusionCache 会采取“LAZY + 只对已有 L1 的节点做适度 PASSIVE”的策略：既保持一致性，又避免无谓流量。

### 4) Fail-Safe：用过期值兜底，避免故障直接打到用户

- 典型配置：正常 TTL（Duration）+ 允许 stale 最大时间（FailSafeMaxDuration）+ 失败后节流（FailSafeThrottleDuration）。
- 不仅能在异常时触发，也能通过 `ctx.Fail(...)` 用结果模式触发（避免 throw 带来的性能开销）。

### 5) Soft/Hard Timeouts：回源慢就先返回 stale，同时后台完成更新

- `FactorySoftTimeout`：有 stale 可用时，宁可快返回 stale，也不等慢回源。
- `FactoryHardTimeout`：无论有没有 stale，都不愿意等待太久；会抛出 synthetic timeout。
- 默认允许“超时后后台继续完成并更新缓存”。

### 6) 序列化问题要尽早暴露

FusionCache 文档建议用本地可用的 `MemoryDistributedCache` / SQLite 类实现作为 L2，
在开发环境提前发现（反）序列化配置问题（比如多态/抽象类型无法反序列化）。

## 推荐落地配方（可直接当提示词/模板用）

### 配方 A：只用 HybridCache（Microsoft），L1+L2（Redis）

- 添加包：`Microsoft.Extensions.Caching.Hybrid`
- 注册：
  - `AddHybridCache()`
  - 再注册一个 `IDistributedCache`（例如 `AddStackExchangeRedisCache`），HybridCache 会将其作为 L2。

示例（关键点）：

- 用 `HybridCacheEntryOptions` 配置 `Expiration` 与 `LocalCacheExpiration`。
- 需要 tags 时在 `GetOrCreateAsync` 里传 tags，并用 `RemoveByTagAsync` 做逻辑失效。

### 配方 B：只用 FusionCache（IFusionCache），L1+L2+Backplane（Redis）

- L2：`IDistributedCache`（Redis）
- Serializer：`IFusionCacheSerializer`（例如 System.Text.Json serializer 包）
- Backplane：Redis backplane（推荐多节点）

关键点：

- 多节点一定要 backplane，否则 L1 会出现不一致窗口。
- 对热点 key：开启 fail-safe + factory timeouts。

### 配方 C：业务依赖 HybridCache，但底层用 FusionCache（推荐）

- 注册 FusionCache，并调用 `.AsHybridCache()` 暴露为 `HybridCache`。
- 多缓存实例场景可用 `.AsKeyedHybridCache("Foo")` 并使用 keyed services 注入。

优点：

- 代码对 Microsoft `HybridCache` 抽象依赖更“长寿”；
- 仍然可以获得 FusionCache 的 backplane/fail-safe/timeouts 等增强能力；
- 同一个底层实例可同时通过 `HybridCache` 与 `IFusionCache` 访问，并共享 stampede protection。

## 常见坑 / 反模式

- 多节点只配 L2 不配 backplane，却期望“立刻一致”。这通常会导致读旧值的窗口。
- 缓存可变对象并在读后修改，导致共享实例/并发 bug（尤其当你尝试启用对象复用或引用共享时）。
- key 设计不稳定（包含随机值、未清洗输入、无命名空间），导致缓存污染与命中率灾难。
- L2 序列化未在开发期验证，生产才暴露反序列化失败。

## 使用示例（提示语模板）

- “把这段使用 `IDistributedCache` 的代码改为 `HybridCache.GetOrCreateAsync`，并补齐 key 规范与 entry options（Expiration + LocalCacheExpiration）。”
- “当前服务多 pod，缓存更新后偶发读旧值：请用 FusionCache backplane 方案消除不一致窗口，并给出 DI 注册示例。”
- “对热点 key 增加 fail-safe（最大 2 小时）+ soft timeout（100ms）+ 背景完成更新，确保数据库抖动时仍能快速响应。”
- “我们要用 Microsoft 的 HybridCache 抽象，但需要 fail-safe/backplane：请用 FusionCache 的 `.AsHybridCache()` 适配器落地。”
