# Claude 助手规则 - 上下文工程学习项目

## 核心原则

- 遵循安全最佳实践，永远不暴露敏感信息
- 保持代码质量，与现有模式保持一致
- 使用 TypeScript 确保类型安全
- 遵循既定的项目结构和约定
- **始终使用 pnpm 进行包管理** - 绝不使用 npm 或 yarn
- 单个组件文件不超过 500 行代码
- 优先使用函数组件和 React Hooks

## 项目背景

这是一个专注于 Token 计数工具和上下文工程的 Next.js 项目，包含：

- Token 计数和成本计算工具
- PRP（产品需求提示）生成系统
- 学习助手聊天机器人（规划中）
- Claude API 集成示例

## 代码规范

### TypeScript 规范

- **严格模式**: 启用 `strict: true`
- 所有新文件必须使用 TypeScript
- 所有函数必须有明确的类型注解
- **Interface vs Type**:
  - 对象结构使用 `interface`
  - 联合类型、工具类型使用 `type`
- **避免 any**: 使用 `unknown` 或具体类型
- 遵循现有的命名约定

### React 规范

- **组件类型**: 优先使用函数组件和 Hooks
- **组件命名**: PascalCase (例如: `ChatInterface.tsx`)
- **Props 类型**: 使用 interface 定义 Props
- **导出方式**: 组件使用 default export
- **性能优化**:
  - 使用 `React.memo` 避免不必要的重渲染
  - 使用 `useMemo` 和 `useCallback` 优化计算和回调
  - 实现代码分割和懒加载

### 代码质量

- 从正确的模块导入，保持依赖清晰
- 编写简洁、可读的代码
- 除非复杂逻辑需要，否则避免不必要的注释
- 使用有意义的变量和函数命名

## 文件组织结构

```
项目根目录/
├── src/                      # 源代码目录
│   ├── app/                 # Next.js App Router 页面
│   ├── components/          # 可复用 UI 组件
│   │   ├── chat/           # 聊天相关组件
│   │   ├── progress/       # 进度追踪组件
│   │   └── recommendations/ # 推荐相关组件
│   ├── lib/                # 库和工具函数
│   │   └── prp/           # PRP 生成器
│   ├── services/           # API 和业务逻辑
│   ├── store/              # 状态管理
│   ├── hooks/              # 自定义 React Hooks
│   └── types/              # TypeScript 类型定义
├── examples/               # 示例和模式
├── PRPs/                   # 产品需求提示文档
│   └── templates/         # PRP 模板
├── .claude/                # Claude 特定配置
│   └── commands/          # 自定义 slash 命令
└── __tests__/             # 测试文件
```

## 核心模块

### Token Counter 模块

位置: `src/app/token-counter/index.ts`

功能:

- 支持多种模型的基础 Token 计数
- 聊天补全消息格式化
- 成本计算工具
- 批处理能力
- 基于模板的计数

### PRP Generator 模块

位置: `src/lib/prp/`

功能:

- TypeScript 类型定义完善
- 生成结构化的产品需求文档
- 支持研究上下文、验证门禁等高级特性
- 单元测试覆盖率 100%

## 开发工作流

1. **分析现有代码模式** - 在做出更改之前，先了解现有实现
2. **使用 TodoWrite 系统** - 追踪任务进度
3. **充分测试更改** - 确保不破坏现有功能
4. **遵循项目结构** - 保持代码组织一致性
5. **编写测试** - 新功能必须包含单元测试

## 包管理

### 严格规定

- **独家使用 pnpm** - 所有包操作必须使用 pnpm
- **禁止使用**: npm、yarn 或其他包管理器

### 常用命令

```bash
pnpm install          # 安装依赖
pnpm add [package]    # 添加依赖
pnpm remove [package] # 移除依赖
pnpm run [script]     # 运行脚本
pnpm test             # 运行测试
pnpm test:ui          # 运行测试 UI
pnpm test:coverage    # 生成测试覆盖率报告
```

## 状态管理

- **本地状态**: 简单组件状态使用 `useState`
- **共享状态**: 复杂状态使用 Zustand 或 Redux
- **持久化策略**:
  - 会话数据: React state (内存中)
  - 学习进度: IndexedDB (持久化)
  - **禁止**: 不使用 localStorage/sessionStorage 存储重要数据

## 样式规范

- **主要方案**: Tailwind CSS
- **替代方案**: CSS Modules（组件特定样式）
- **组件库**: Ant Design（如需使用）
- **设计原则**:
  - 移动优先的响应式设计
  - 支持亮色/暗色主题
  - 保持一致的设计语言

## API 集成

### Claude API

封装位置: `services/claude.ts`（规划中）

要求:

- 实现完整的错误处理和重试机制
- 支持流式响应
- Token 使用监控
- 请求队列管理（避免速率限制）
- 添加请求/响应拦截器

### 最佳实践

- **模型选择**: 默认使用 `claude-sonnet-4-20250514`
- **上下文管理**:
  - 保留完整对话历史
  - 实现上下文窗口管理
  - 长对话时使用摘要
- **提示工程**:
  - 使用清晰的系统提示
  - 结构化输出格式
  - 提供少样本学习示例

## 测试要求

### 测试框架

- **单元测试**: Vitest
- **组件测试**: React Testing Library（待集成）
- **测试文件命名**: `ComponentName.test.ts` 或 `ComponentName.spec.ts`

### 测试覆盖率

- **目标**: > 80% 代码覆盖率
- **重点测试**:
  - 组件渲染
  - 用户交互
  - API 调用
  - 状态更新
  - 边界情况

### 运行测试

```bash
pnpm test              # 交互式测试模式
pnpm test:run          # 运行所有测试一次
pnpm test:ui           # 打开测试 UI
pnpm test:coverage     # 生成覆盖率报告
```

## 错误处理

### 策略

- **API 错误**: 提供友好的用户提示
- **边界情况**: 使用 ErrorBoundary 组件
- **日志**: 开发环境详细，生产环境精简
- **降级方案**: API 失败时的备用体验

### 实现要求

- 所有异步操作必须有 try-catch
- 用户可见的错误信息要清晰、可操作
- 记录错误用于调试和监控

## 性能标准

### 目标指标

- **首屏加载**: < 2 秒
- **交互响应**: < 100ms
- **API 响应**: < 2 秒（Claude API）

### 优化策略

- **代码分割**: 使用动态 import
- **懒加载**: 非关键组件延迟加载
- **Tree shaking**: 移除未使用代码
- **虚拟滚动**: 处理大量历史消息
- **Memo 优化**: 避免不必要的重渲染

## 文档标准

- **组件文档**: 使用 JSDoc 注释
- **README**: 包含安装、运行、测试说明
- **CHANGELOG**: 记录版本变更（如需要）
- **类型文档**: 复杂类型添加注释说明

## Git 工作流

### 分支命名规范

- 功能分支: `feature/feature-name`
- 修复分支: `fix/bug-description`
- 重构分支: `refactor/component-name`

### 提交信息格式

```
type(scope): subject

body (可选)

footer (可选)
```

**类型**: feat, fix, docs, style, refactor, test, chore

**示例**:

```
feat(prp): add validation gates support

- Add ValidationGate type definition
- Implement validation gates generation
- Add unit tests for validation gates

Closes #123
```

## 安全考虑

- **API Key**: 使用环境变量 `.env.local`，永不提交到代码库
- **数据加密**: 敏感数据在存储前加密
- **XSS 防护**: 对用户输入进行适当转义
- **CORS**: 正确配置跨域策略
- **依赖安全**: 定期更新依赖，修复安全漏洞

## 可访问性 (a11y)

- **语义化 HTML**: 使用正确的 HTML 标签
- **ARIA 属性**: 添加必要的 ARIA 标签
- **键盘导航**: 支持完整的键盘操作
- **对比度**: 文本对比度 ≥ 4.5:1
- **屏幕阅读器**: 确保兼容主流屏幕阅读器

## 项目依赖

### 核心依赖

- **Next.js** (15.5.4): Web 框架
- **React** (19.1.0): UI 库
- **TypeScript** (^5): 类型系统
- **Tailwind CSS** (^4): 样式框架
- **tiktoken** (^1.0.22): Token 计数

### 开发依赖

- **Vitest** (^3.2.4): 单元测试
- **@vitest/ui** (^3.2.4): 测试 UI
- **happy-dom** (^20.0.0): DOM 模拟
- **ESLint** (^9): 代码检查

## 常见问题 (FAQ)

### Q: 如何处理大量历史消息?

A: 实现虚拟滚动，只渲染可见消息；旧消息归档到 IndexedDB

### Q: Claude API 速率限制如何处理?

A: 实现请求队列，添加指数退避重试机制，显示友好的等待提示

### Q: 是否支持离线功能?

A: 历史记录和进度数据本地存储，仅新对话需要网络连接

### Q: 如何测试 Claude API 集成?

A: 使用 Vitest 的 mock 功能模拟 API 响应

### Q: 为什么必须使用 pnpm?

A: pnpm 提供更快的安装速度、更好的磁盘空间利用率，且项目已配置为使用 pnpm

## 实施检查清单

开发完成前，请确认：

- [ ] 代码遵循 TypeScript 严格模式
- [ ] 组件拆分合理，遵循单一职责原则
- [ ] 实现完整的错误处理
- [ ] 添加单元测试（覆盖率 > 80%）
- [ ] 性能优化（memo、callback、lazy load）
- [ ] 可访问性检查通过
- [ ] 响应式设计验证
- [ ] API 错误降级方案已实现
- [ ] 文档完整（JSDoc、README）
- [ ] 使用 pnpm 管理依赖
- [ ] Git 提交信息规范
- [ ] 代码审查通过（如适用）

## PRP 生成器使用指南

### 命令行使用

```bash
# 使用 slash 命令生成 PRP
/generate-prp
```

### 程序化使用

```typescript
import { createPRPGenerator, type PRPContent } from '@/lib/prp';

const generator = createPRPGenerator();
const prpContent: PRPContent = {
  metadata: {
    featureName: 'My Feature',
    createdAt: new Date().toISOString(),
  },
  overview: 'Feature description...',
  // ... 其他字段
};

const prpMarkdown = generator.generate(prpContent);
generator.save(prpContent, 'my-feature-prp.md');
```

## 开发前必读

1. 阅读本文档了解项目规范
2. 查看 `PRPs/` 目录了解需求文档结构
3. 查看 `examples/` 目录的参考实现
4. 熟悉 Next.js App Router 和 React Server Components
5. 了解 Vitest 测试框架

## 持续改进

本文档会随着项目发展不断更新。如有疑问或建议，请：

- 创建 Issue 讨论
- 提交 PR 改进文档
- 与团队成员沟通
