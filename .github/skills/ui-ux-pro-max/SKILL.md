---
name: ui-ux-pro-max
description: "UI/UX 设计情报。包含 50 种风格、21 种调色板、50 种字体搭配、20 种图表、9 种技术栈（React, Next.js, Vue, Svelte, SwiftUI, React Native, Flutter, Tailwind, shadcn/ui）。操作：plan, build, create, design, implement, review, fix, improve, optimize, enhance, refactor, check UI/UX 代码。项目：website, landing page, dashboard, admin panel, e-commerce, SaaS, portfolio, blog, mobile app, .html, .tsx, .vue, .svelte。元素：button, modal, navbar, sidebar, card, table, form, chart。风格：glassmorphism, claymorphism, minimalism, brutalism, neumorphism, bento grid, dark mode, responsive, skeuomorphism, flat design。主题：调色板、可访问性、动画、布局、排版、字体搭配、间距、悬停、阴影、渐变。集成：用于组件搜索和示例的 shadcn/ui MCP。"
---

# UI/UX Pro Max - 设计情报 (Design Intelligence)

包含 UI 风格、调色板、字体搭配、图表类型、产品建议、UX 指南以及特定技术栈最佳实践的可查数据库。

## 前置条件 (Prerequisites)

检查是否已安装 Python：

```bash
python3 --version || python --version
```

如果未安装 Python，请根据操作系统进行安装：

**macOS:**
```bash
brew install python3
```

**Ubuntu/Debian:**
```bash
sudo apt update && sudo apt install python3
```

**Windows:**
```powershell
winget install Python.Python.3.12
```

---

## 如何使用此 Skill (How to Use This Skill)

当用户请求进行 UI/UX 相关工作（设计、构建、创建、实现、评审、修复、改进）时，请遵循以下工作流：

### 步骤 1：分析用户需求

从用户请求中提取关键信息：
- **产品类型 (Product type)**：SaaS, e-commerce, portfolio, dashboard, landing page 等。
- **风格关键词 (Style keywords)**：minimal, playful, professional, elegant, dark mode 等。
- **行业 (Industry)**：healthcare, fintech, gaming, education 等。
- **技术栈 (Stack)**：React, Vue, Next.js，或默认为 `html-tailwind`。

### 步骤 2：搜索相关领域 (Domains)

多次使用 `search.py` 以收集全面信息。持续搜索直到获得足够的上下文。

```bash
python3 .claude/skills/ui-ux-pro-max/scripts/search.py "<keyword>" --domain <domain> [-n <max_results>]
```

**推荐搜索顺序：**

1. **Product** - 获取产品类型的风格建议
2. **Style** - 获取详细风格指南（颜色、效果、框架）
3. **Typography** - 获取字体搭配及 Google Fonts 导入
4. **Color** - 获取调色板（Primary, Secondary, CTA, Background, Text, Border）
5. **Landing** - 获取页面结构（如果是落地页）
6. **Chart** - 获取图表建议（如果是仪表盘/数据分析）
7. **UX** - 获取最佳实践和反模式
8. **Stack** - 获取特定技术栈指南（默认：html-tailwind）

### 步骤 3：技术栈指南 (默认: html-tailwind)

如果用户未指定技术栈，请**默认为 `html-tailwind`**。

```bash
python3 .claude/skills/ui-ux-pro-max/scripts/search.py "<keyword>" --stack html-tailwind
```

可用技术栈：`html-tailwind`, `react`, `nextjs`, `vue`, `svelte`, `swiftui`, `react-native`, `flutter`, `shadcn`

---

## 搜索参考 (Search Reference)

### 可用领域 (Available Domains)

| 领域 (Domain) | 用途 | 示例关键词 |
|--------|---------|------------------|
| `product` | 产品类型建议 | SaaS, e-commerce, portfolio, healthcare, beauty, service |
| `style` | UI 风格、颜色、效果 | glassmorphism, minimalism, dark mode, brutalism |
| `typography` | 字体搭配、Google Fonts | elegant, playful, professional, modern |
| `color` | 按产品类型划分的调色板 | saas, ecommerce, healthcare, beauty, fintech, service |
| `landing` | 页面结构、CTA 策略 | hero, hero-centric, testimonial, pricing, social-proof |
| `chart` | 图表类型、库建议 | trend, comparison, timeline, funnel, pie |
| `ux` | 最佳实践、反模式 | animation, accessibility, z-index, loading |
| `prompt` | AI 提示词、CSS 关键词 | (风格名称) |

### 可用技术栈 (Available Stacks)

| 技术栈 (Stack) | 关注点 |
|-------|-------|
| `html-tailwind` | Tailwind 工具类、响应式、a11y (默认) |
| `react` | 状态、Hooks、性能、模式 |
| `nextjs` | SSR, 路由, 图像, API 路由 |
| `vue` | Composition API, Pinia, Vue Router |
| `svelte` | Runes, stores, SvelteKit |
| `swiftui` | Views, State, Navigation, Animation |
| `react-native` | 组件, 导航, 列表 |
| `flutter` | Widgets, State, Layout, Theming |
| `shadcn` | shadcn/ui 组件、主题、表单、模式 |

---

## 示例工作流 (Example Workflow)

**用户请求：** "Làm landing page cho dịch vụ chăm sóc da chuyên nghiệp" (为一个专业的护肤服务制作落地页)

**AI 应当：**

```bash
# 1. 搜索产品类型
python3 .claude/skills/ui-ux-pro-max/scripts/search.py "beauty spa wellness service" --domain product

# 2. 搜索风格 (基于行业: beauty, elegant)
python3 .claude/skills/ui-ux-pro-max/scripts/search.py "elegant minimal soft" --domain style

# 3. 搜索排版 (Typography)
python3 .claude/skills/ui-ux-pro-max/scripts/search.py "elegant luxury" --domain typography

# 4. 搜索调色板
python3 .claude/skills/ui-ux-pro-max/scripts/search.py "beauty spa wellness" --domain color

# 5. 搜索落地页结构
python3 .claude/skills/ui-ux-pro-max/scripts/search.py "hero-centric social-proof" --domain landing

# 6. 搜索 UX 指南
python3 .claude/skills/ui-ux-pro-max/scripts/search.py "animation" --domain ux
python3 .claude/skills/ui-ux-pro-max/scripts/search.py "accessibility" --domain ux

# 7. 搜索技术栈指南 (默认: html-tailwind)
python3 .claude/skills/ui-ux-pro-max/scripts/search.py "layout responsive" --stack html-tailwind
```

**然后：** 综合所有搜索结果并实现设计。

---

## 优化结果的小贴士 (Tips for Better Results)

1. **关键词要具体** - "healthcare SaaS dashboard" > "app"
2. **多次搜索** - 不同的关键词会展示不同的见解
3. **组合领域** - Style + Typography + Color = 完整的设计系统
4. **始终检查 UX** - 针对常见问题搜索 "animation", "z-index", "accessibility"
5. **使用技术栈标志 (Stack flag)** - 获取针对实现的最佳实践
6. **迭代** - 如果第一次搜索不匹配，尝试不同的关键词

---

## 专业 UI 开发通用规则 (Common Rules for Professional UI)

以下是常被忽视但能让 UI 显得专业的关键点：

### 图标与视觉元素 (Icons & Visual Elements)

| 规则 | 推荐 (Do) | 禁止 (Don't) |
|------|----|----- |
| **禁止使用表情图标** | 使用 SVG 图标 (Heroicons, Lucide, Simple Icons) | 使用 🎨 🚀 ⚙️ 等表情作为 UI 图标 |
| **稳定的悬停状态** | 悬停时使用颜色/不透明度过渡 | 使用会引起布局偏移的缩放变换 (Scale) |
| **正确的品牌 Logo** | 查找 Simple Icons 的官方 SVG | 猜测或使用错误的 Logo 路径 |
| **一致的图标大小** | 使用固定的 viewBox (24x24) 以及 w-6 h-6 | 随机混合不同的图标大小 |

### 交互与光标 (Interaction & Cursor)

| 规则 | 推荐 (Do) | 禁止 (Don't) |
|------|----|----- |
| **光标指针 (Pointer)** | 为所有可点击/可悬停的卡片添加 `cursor-pointer` | 在交互元素上保留默认光标 |
| **悬停反馈** | 提供视觉反馈（颜色、阴影、边框） | 没有任何指示元素可交互 |
| **平滑过渡** | 使用 `transition-colors duration-200` | 瞬时状态更改或过慢 (>500ms) |

### 亮/暗模式对比度 (Light/Dark Mode Contrast)

| 规则 | 推荐 (Do) | 禁止 (Don't) |
|------|----|----- |
| **亮模式下的玻璃卡片** | 使用 `bg-white/80` 或更高的不透明度 | 使用 `bg-white/10` (透明度过高) |
| **亮模式文本对比度** | 文本使用 `#0F172A` (slate-900) | 正文文本使用 `#94A3B8` (slate-400) |
| **亮模式静音文本** | 最低使用 `#475569` (slate-600) | 使用 gray-400 或更浅的颜色 |
| **边框可见度** | 亮模式下使用 `border-gray-200` | 使用 `border-white/10` (不可见) |

### 布局与间距 (Layout & Spacing)

| 规则 | 推荐 (Do) | 禁止 (Don't) |
|------|----|----- |
| **悬浮导航栏 (Navbar)** | 添加 `top-4 left-4 right-4` 间距 | 导航栏紧贴 `top-0 left-0 right-0` |
| **内容填充** | 考虑固定导航栏的高度 | 让内容隐藏在固定元素下方 |
| **一致的最大宽度** | 统一使用 `max-w-6xl` 或 `max-w-7xl` | 混合使用不同的容器宽度 |

---

## 交付前审核清单 (Pre-Delivery Checklist)

在交付 UI 代码之前，请核对以下各项：

### 视觉质量 (Visual Quality)
- [ ] 未使用表情作为图标（使用 SVG 替代）
- [ ] 所有图标来自一致的图标集 (Heroicons/Lucide)
- [ ] 品牌 Logo 正确（从 Simple Icons 验证）
- [ ] 悬停状态不会引起布局偏移
- [ ] 直接使用主题色（如 bg-primary），而非 var() 包装器

### 交互 (Interaction)
- [ ] 所有可点击元素都有 `cursor-pointer`
- [ ] 悬停状态提供清晰的视觉反馈
- [ ] 过渡平滑 (150-300ms)
- [ ] 焦点状态 (Focus states) 对键盘导航可见

### 亮/暗模式 (Light/Dark Mode)
- [ ] 亮模式文本有足够的对比度（最低 4.5:1）
- [ ] 玻璃/透明元素在亮模式下可见
- [ ] 两种模式下边框均可见
- [ ] 交付前测试两种模式

### 布局 (Layout)
- [ ] 悬浮元素与边缘有适当间距
- [ ] 没有内容隐藏在固定导航栏下方
- [ ] 在 320px, 768px, 1024px, 1440px 下具有响应性
- [ ] 移动端没有水平滚动条

### 可访问性 (Accessibility)
- [ ] 所有图像都有 alt 文本
- [ ] 表单输入有标签 (Labels)
- [ ] 颜色不是唯一的指示方式
- [ ] 尊重 `prefers-reduced-motion` 设置
