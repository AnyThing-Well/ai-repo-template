---
description: 'Vue.js 3 开发标准和最佳实践，包括 Composition API 和 TypeScript'
applyTo: '**/*.vue, **/*.ts, **/*.js, **/*.scss'
---

# Vue.js 3 开发指南

如何使用 Composition API、TypeScript 和现代最佳实践构建高质量 Vue.js 3 应用程序的指导。

## 项目背景
- Vue 3.x with Composition API 作为默认选择
- TypeScript 用于类型安全
- 单文件组件 (`.vue`) 搭配 `<script setup>` 语法
- 现代化构建工具（推荐 Vite）
- 使用 Pinia 进行应用状态管理
- 遵循 Vue 官方风格指南和最佳实践

## 开发标准

### 架构设计
- 优先使用 Composition API（`setup` 函数和 composables）而不是 Options API
- 按功能或领域组织组件和 composables 以提高可扩展性
- 区分 UI 聚焦的组件（展示型）和逻辑聚焦的组件（容器型）
- 在 `composables/` 目录中提取可复用的逻辑
- 按领域结构化 Pinia 存储模块，明确定义 actions、state 和 getters

### TypeScript 集成
- 在 `tsconfig.json` 中启用 `strict` 模式以获得最大类型安全
- 使用 `defineComponent` 或 `<script setup lang="ts">` 搭配 `defineProps` 和 `defineEmits`
- 利用 `PropType<T>` 进行 props 类型定义和默认值
- 为复杂 props 和 state 结构使用 interfaces 或 type aliases
- 为事件处理器、refs 和 `useRoute`/`useRouter` hooks 定义类型
- 实现泛型组件和 composables

### 组件设计
- 遵循组件的单一职责原则
- 组件名称使用 PascalCase，文件名使用 kebab-case
- 保持组件小型化，关注单一职责
- 使用 `<script setup>` 语法以获得简洁性和性能
- 使用 TypeScript 验证 props，仅在必要时使用运行时检查
- 优先使用 slots 和 scoped slots 实现灵活的组件组合

### 状态管理
- 使用 Pinia 管理全局状态，通过 `defineStore` 定义 stores
- 对于简单的本地状态，在 `setup` 中使用 `ref` 和 `reactive`
- 使用 `computed` 处理派生状态
- 为复杂结构保持状态规范化
- 在 Pinia stores 中使用 actions 处理异步逻辑
- 利用 store plugins 实现持久化或调试

### Composition API 模式
- 为共享逻辑创建可复用的 composables，如 `useFetch`、`useAuth`
- 使用 `watch` 和 `watchEffect` 搭配精确的依赖列表
- 在 `onUnmounted` 或 `watch` 清理回调中清理副作用
- 谨慎使用 `provide`/`inject` 进行深层依赖注入
- 使用 `useAsyncData` 或第三方数据工具（Vue Query）

### 样式处理
- 使用 `<style scoped>` 进行组件级样式或 CSS Modules
- 考虑使用功能优先框架（Tailwind CSS）快速开发
- 遵循 BEM 或功能型 CSS 命名规范
- 利用 CSS 自定义属性实现主题和设计令牌
- 实现移动优先、响应式设计，使用 CSS Grid 和 Flexbox
- 确保样式可访问性（对比度、焦点状态）

### 性能优化
- 使用动态导入和 `defineAsyncComponent` 进行组件懒加载
- 使用 `<Suspense>` 处理异步组件加载的备用方案
- 对静态或不常变化的元素应用 `v-once` 和 `v-memo`
- 使用 Vue DevTools Performance 标签进行性能分析
- 避免不必要的 watchers；优先使用 `computed`
- Tree-shake 未使用的代码，利用 Vite 的优化特性

### 数据获取
- 使用 composables 如 `useFetch`（Nuxt）或库如 Vue Query
- 明确处理加载、错误和成功状态
- 在组件卸载或参数变化时取消过期请求
- 实现乐观更新搭配失败回滚
- 缓存响应并使用后台重新验证

### 错误处理
- 使用全局错误处理器（`app.config.errorHandler`）处理未捕获的错误
- 在 `try/catch` 中包装风险逻辑，提供用户友好的错误消息
- 在组件中使用 `errorCaptured` hook 设置本地错误边界
- 优雅地显示备用 UI 或错误告警
- 将错误日志记录到外部服务（Sentry、LogRocket）

### 表单和验证
- 使用 VeeValidate 或 @vueuse/form 库进行声明式验证
- 使用受控 `v-model` 绑定构建表单
- 使用防抖对 blur 或 input 事件进行验证以提高性能
- 在 composables 中处理文件上传和复杂多步表单
- 确保无障碍标签、错误公告和焦点管理

### 路由
- 使用 Vue Router 4 搭配 `createRouter` 和 `createWebHistory`
- 实现嵌套路由和路由级代码分割
- 使用导航守卫（`beforeEnter`、`beforeEach`）保护路由
- 在 `setup` 中使用 `useRoute` 和 `useRouter` 进行程序化导航
- 正确管理查询参数和动态路由段
- 通过路由 meta 字段实现面包屑数据

### 测试
- 使用 Vue Test Utils 和 Vitest 编写单元测试
- 关注行为而非实现细节
- 使用 `mount` 和 `shallowMount` 进行组件隔离
- 根据需要 mock 全局 plugins（router、Pinia）
- 使用 Cypress 或 Playwright 添加端到端测试
- 使用 axe-core 集成测试无障碍性

### 安全性
- 避免使用 `v-html`；严格清理任何 HTML 输入
- 使用 CSP headers 缓解 XSS 和注入攻击
- 验证和转义模板和指令中的数据
- 对所有 API 请求使用 HTTPS
- 将敏感令牌存储在 HTTP-only cookies 中，不用 `localStorage`

### 无障碍性
- 使用语义化 HTML 元素和 ARIA 属性
- 为 modals 和动态内容管理焦点
- 为交互式组件提供键盘导航
- 为图像和图标添加有意义的 `alt` 文本
- 确保色彩对比符合 WCAG AA 标准

## 实现过程
1. 规划组件和 composables 架构
2. 使用 Vue 3 和 TypeScript 初始化 Vite 项目
3. 定义 Pinia stores 和 composables
4. 创建核心 UI 组件和布局
5. 集成路由和导航
6. 实现数据获取和状态逻辑
7. 构建带验证和错误状态的表单
8. 添加全局错误处理和备用 UI
9. 添加单元测试和 E2E 测试
10. 优化性能和打包体积
11. 确保无障碍合规性
12. 记录组件、composables 和 stores 文档

## 附加指南
- 遵循 Vue 官方风格指南（vuejs.org/style-guide）
- 使用 ESLint（搭配 `plugin:vue/vue3-recommended`）和 Prettier 保持代码一致性
- 编写有意义的 commit 消息并保持清晰的 git 历史
- 定期更新依赖并审计漏洞
- 使用 JSDoc/TSDoc 记录复杂逻辑
- 使用 Vue DevTools 进行调试和性能分析

## 常见模式
- Renderless components 和 scoped slots 实现灵活 UI
- 使用 provide/inject 的复合组件
- 用于横切关注点的自定义指令
- 用于 modals 和 overlays 的 Teleport
- 用于全局工具的 Plugin 系统（i18n、analytics）
- 用于参数化逻辑的 Composable 工厂
