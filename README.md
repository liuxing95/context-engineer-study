# Context Engineer Study

Token 计数和上下文工程工具集，基于 Next.js 构建的现代化 Web 应用。

## 🚀 功能特性

- **🔢 实时 Token 计数器** - 支持多种 LLM 模型的实时 token 分析和成本估算
- **🤖 技术文档生成助手** - 基于上下文工程的智能文档生成系统
- **📊 Few-shot 学习** - 内置高质量示例库，支持智能示例选择
- **⚙️ 偏好配置** - 可定制的生成参数和用户偏好
- **🎯 上下文优化** - 智能 token 使用和成本控制

## 🛠️ 技术栈

- **前端框架**: Next.js 15.5.4 (App Router)
- **UI 框架**: React 19.1.0 + TypeScript
- **样式**: Tailwind CSS 4.0
- **AI 集成**: OpenAI GPT-4 API
- **Token 计数**: tiktoken
- **包管理**: pnpm (推荐)

## 📦 安装和运行

### 前置要求

- Node.js 18+ 
- pnpm (推荐) 或 npm

### 安装依赖

```bash
# 使用 pnpm (推荐)
pnpm install

# 或使用 npm
npm install
```

### 环境配置

1. 复制环境变量模板：
```bash
cp .env.local.example .env.local
```

2. 配置 OpenAI API Key (可选)：
```env
OPENAI_API_KEY=sk-your-openai-api-key-here
```

> 注意：如果不配置 API Key，系统将使用模拟模式演示功能

### 启动开发服务器

```bash
# 使用 pnpm
pnpm dev

# 或使用 npm
npm run dev
```

访问 [http://localhost:3000](http://localhost:3000) 查看应用。

## 📚 项目结构

```
├── .claude/                    # Claude 配置文件
├── examples/                   # 代码示例和模式
│   ├── components/            # React 组件示例
│   ├── doc-generator/         # 文档生成器使用示例
│   └── token-counter/         # Token 计数器示例
├── PRPs/                      # 产品需求提示词
│   └── templates/             # PRP 模板
├── src/
│   ├── app/                   # Next.js 应用页面
│   │   ├── doc-generator/     # 文档生成器页面
│   │   └── token-counter/     # Token 计数器页面
│   └── lib/                   # 核心库
│       ├── doc-generator/     # 文档生成核心
│       ├── openai-client.ts   # OpenAI 客户端
│       └── token-counter/     # Token 计数核心
├── use-cases/                 # 使用场景文档
├── CLAUDE.md                  # Claude 助手规则
└── INITIAL.md                 # 功能请求模板
```

## 🎯 核心模块

### Token 计数器

提供实时的 token 计数和成本分析：

```typescript
import { ChatTokenCounter } from './src/lib/token-counter';

const counter = new ChatTokenCounter('gpt-4');
const tokens = counter.countMessages(messages);
const cost = counter.calculateCost(inputText, outputText);
```

### 文档生成器

基于上下文工程的智能文档生成：

```typescript
import { DocumentationGenerator } from './src/lib/doc-generator';

const generator = new DocumentationGenerator('gpt-4');
const response = await generator.generateDocumentation({
  topic: 'React Hooks',
  preferences: {
    detailLevel: 'intermediate',
    codeLanguage: 'javascript'
  }
});
```

## 🔑 API Key 配置

### 方式一：环境变量 (推荐)

在 `.env.local` 文件中设置：
```env
OPENAI_API_KEY=sk-your-api-key-here
```

### 方式二：界面配置

在文档生成器页面点击 "配置 API Key" 按钮，输入您的 API Key。

### 获取 API Key

访问 [OpenAI Platform](https://platform.openai.com/api-keys) 创建 API Key。

## 📊 使用指南

### Token 计数器
1. 访问 `/token-counter` 页面
2. 选择 LLM 模型
3. 输入文本，实时查看 token 统计和成本估算

### 文档生成器
1. 访问 `/doc-generator` 页面
2. 配置 OpenAI API Key (可选)
3. 输入技术主题
4. 调整偏好设置
5. 生成高质量技术文档

## 🛡️ 安全说明

- API Key 仅在客户端内存中存储，不会发送到服务器
- 支持环境变量方式安全配置
- 提供降级模式，无 API Key 时使用模拟内容

## 🚦 脚本命令

```bash
# 开发
pnpm dev

# 构建
pnpm build

# 启动生产服务器
pnpm start

# 代码检查
pnpm lint

# 类型检查
pnpm type-check
```

## 🤝 贡献指南

1. Fork 项目
2. 创建功能分支: `git checkout -b feature/amazing-feature`
3. 提交更改: `git commit -m 'Add amazing feature'`
4. 推送分支: `git push origin feature/amazing-feature`
5. 提交 Pull Request

## 📄 许可证

本项目基于 MIT 许可证开源。详见 [LICENSE](LICENSE) 文件。

## 🙏 致谢

- [Next.js](https://nextjs.org) - React 框架
- [OpenAI](https://openai.com) - GPT API
- [tiktoken](https://github.com/openai/tiktoken) - Token 计数
- [Tailwind CSS](https://tailwindcss.com) - CSS 框架