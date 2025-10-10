---
description: 为新功能生成产品需求提示 (PRP)
---

# 生成产品需求提示 (PRP)

## 功能文件: $ARGUMENTS

为通用功能实现生成一份完整的 PRP（产品需求提示），包含彻底的研究分析。确保将上下文传递给 AI 代理，使其能够进行自我验证和迭代优化。首先阅读功能文件以理解需要创建什么、提供的示例如何帮助以及其他需要考虑的因素。

AI 代理只能获取你附加到 PRP 中的上下文和训练数据。假设 AI 代理可以访问代码库并具有与你相同的知识截止日期，因此你的研究发现必须包含在 PRP 中或被引用。该代理具有网络搜索能力，因此可以传递文档和示例的 URL。

## 研究流程

### 1. 代码库分析

**目标**: 理解现有模式和约定

```typescript
// 执行以下研究步骤:
// 1. 搜索代码库中类似的功能或模式
// 2. 识别需要在 PRP 中引用的文件
// 3. 注意需要遵循的现有约定
// 4. 检查测试模式以确定验证方法
```

**具体操作**:
- 使用 Glob 工具搜索相关文件模式
- 使用 Grep 工具搜索关键词和代码模式
- 使用 Read 工具阅读相关文件
- 记录重要的代码位置（文件路径:行号）

**示例搜索查询**:
```bash
# 搜索类似组件
*.tsx 中包含 "useState" 和 "useCallback"

# 搜索 API 集成模式
services/*.ts 中包含 "async function"

# 搜索测试模式
**/*.test.ts 或 **/*.spec.ts
```

### 2. 外部研究

**目标**: 收集最佳实践和文档

```typescript
// 执行以下研究步骤:
// 1. 在线搜索类似功能或模式
// 2. 查找库文档（包含具体 URL）
// 3. 寻找实现示例（GitHub/StackOverflow/博客）
// 4. 研究最佳实践和常见陷阱
```

**研究清单**:
- [ ] 官方库文档链接（带具体章节）
- [ ] GitHub 上的实现示例
- [ ] Stack Overflow 上的常见问题和解决方案
- [ ] 技术博客中的最佳实践
- [ ] 已知的版本兼容性问题
- [ ] 性能优化建议

**文档链接格式**:
```yaml
- url: https://example.com/docs/feature
  section: "Authentication"
  why: "需要了解 OAuth 2.0 流程实现"

- url: https://github.com/user/repo/blob/main/example.ts
  why: "参考错误处理模式"
```

### 3. 用户澄清（如需要）

**何时询问**:
- 功能需求不明确时
- 多种实现方式需要选择时
- 需要确认技术栈或依赖时

**询问示例**:
```typescript
// 问题模板:
// 1. "这个功能应该遵循 [具体模式] 还是 [替代模式]？可以在 [文件路径] 找到参考。"
// 2. "集成点应该在 [位置A] 还是 [位置B]？"
// 3. "是否有特定的设计要求或 UI 库偏好？"
```

## PRP 生成

使用 `PRPs/templates/base-prp.md` 作为模板生成完整的 PRP。

### 关键上下文（必须传递给 AI 代理）

#### 1. 文档链接

```yaml
# 格式示例
documentation:
  - url: "https://react.dev/reference/react/useState"
    section: "API Reference"
    critical: "理解状态更新的批处理机制"

  - url: "https://nextjs.org/docs/app/building-your-application/routing"
    section: "App Router"
    critical: "服务器组件 vs 客户端组件的区别"

  - url: "https://www.typescriptlang.org/docs/handbook/2/generics.html"
    section: "Generic Functions"
    critical: "类型安全的 API 调用"
```

#### 2. 代码示例

```typescript
// 从代码库中提取真实的代码片段
// 示例来源: src/components/Chat/index.tsx:45-67

// ✅ 好的示例（遵循此模式）
interface ChatProps {
  messages: Message[];
  onSend: (message: string) => void;
  isLoading?: boolean;
}

export default function Chat({ messages, onSend, isLoading = false }: ChatProps) {
  const [input, setInput] = useState('');

  const handleSend = useCallback(() => {
    if (input.trim()) {
      onSend(input);
      setInput('');
    }
  }, [input, onSend]);

  return (
    <div className="flex flex-col gap-4">
      {/* 组件内容 */}
    </div>
  );
}
```

#### 3. 已知陷阱

```typescript
// 关键陷阱和解决方案

// ❌ 陷阱 1: Next.js 客户端组件忘记添加 'use client'
// 解决方案: 任何使用 hooks 或事件处理的组件必须在文件顶部添加 'use client'

// ❌ 陷阱 2: TypeScript 严格模式下的类型错误
// 解决方案: 所有函数必须有明确的返回类型注解

// ❌ 陷阱 3: pnpm 工作区依赖问题
// 解决方案: 使用 pnpm add [package] 而不是 npm install

// ❌ 陷阱 4: Claude API 速率限制
// 解决方案: 实现指数退避重试机制（参考 src/services/retryUtils.ts）

// ❌ 陷阱 5: React 组件内对象定义导致的重渲染
// 解决方案: 使用 useMemo 或将对象定义移到组件外部
```

#### 4. 现有模式

```typescript
// 项目中需要遵循的模式

// 模式 1: 错误处理（参考 src/services/claude.ts:89-102）
try {
  const result = await apiCall();
  return { success: true, data: result };
} catch (error) {
  if (error instanceof ApiError) {
    return { success: false, error: error.message };
  }
  throw error;
}

// 模式 2: 状态管理（参考 src/store/chatStore.ts）
import { create } from 'zustand';

interface StoreState {
  data: Data[];
  addData: (item: Data) => void;
}

export const useStore = create<StoreState>((set) => ({
  data: [],
  addData: (item) => set((state) => ({ data: [...state.data, item] })),
}));

// 模式 3: 异步组件（Next.js App Router）
export default async function Page() {
  const data = await fetchData(); // 服务器端获取
  return <ClientComponent data={data} />;
}
```

### 实施蓝图

#### 第一步: 提供伪代码展示方法

```typescript
/**
 * 功能: 用户认证服务
 * 文件: src/services/auth.ts
 */

// 伪代码 - 展示关键逻辑，不写完整实现

import { z } from 'zod';

// 1. 定义验证模式
const LoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

type LoginInput = z.infer<typeof LoginSchema>;

// 2. 实现主函数
export async function login(input: LoginInput): Promise<AuthResult> {
  // 步骤 1: 验证输入
  const validated = LoginSchema.parse(input);

  // 步骤 2: 调用 API
  // 关键: 使用现有的 API 客户端（参考 src/services/apiClient.ts）
  const response = await apiClient.post('/auth/login', {
    email: validated.email,
    password: validated.password,
  });

  // 步骤 3: 处理响应
  // 模式: 标准化响应格式（参考 src/types/api.ts）
  if (response.success) {
    // 步骤 4: 存储 token
    // 注意: 使用 httpOnly cookie，不用 localStorage
    await setAuthCookie(response.data.token);

    return {
      success: true,
      user: response.data.user,
    };
  }

  // 步骤 5: 错误处理
  // 模式: 友好的错误消息（参考 src/utils/errorMessages.ts）
  return {
    success: false,
    error: getErrorMessage(response.error),
  };
}
```

#### 第二步: 引用真实文件的模式

```yaml
参考文件:
  - src/services/claude.ts: "API 调用和错误处理模式"
  - src/components/Chat/index.tsx: "React 组件结构和 hooks 使用"
  - src/lib/validators.ts: "Zod 验证模式"
  - src/types/api.ts: "API 响应类型定义"
```

#### 第三步: 错误处理策略

```typescript
// 错误处理层级

// 级别 1: 输入验证错误
try {
  const validated = Schema.parse(input);
} catch (error) {
  if (error instanceof z.ZodError) {
    // 返回友好的验证错误消息
    return { error: formatZodError(error) };
  }
}

// 级别 2: API 调用错误
try {
  const response = await apiCall();
} catch (error) {
  if (error instanceof NetworkError) {
    // 网络错误 - 提示用户检查连接
    return { error: '网络连接失败，请检查网络设置' };
  }
  if (error instanceof RateLimitError) {
    // 速率限制 - 实现重试
    return await retryWithBackoff(apiCall);
  }
  // 其他错误 - 记录并提示通用错误
  console.error('API Error:', error);
  return { error: '服务暂时不可用，请稍后重试' };
}

// 级别 3: 组件级错误边界
// 参考 src/components/ErrorBoundary.tsx
```

#### 第四步: 按完成顺序列出任务

```yaml
任务清单:
  - task_id: "1"
    name: "创建 TypeScript 类型定义"
    file: "src/types/auth.ts"
    operations:
      - "定义 User 接口"
      - "定义 AuthResult 类型"
      - "定义 LoginInput/RegisterInput 接口"
      - "导出所有公共类型"
    reference: "src/types/api.ts（遵循现有模式）"
    estimated_time: "15分钟"

  - task_id: "2"
    name: "实现认证服务层"
    file: "src/services/auth.ts"
    operations:
      - "创建 login() 函数"
      - "创建 register() 函数"
      - "创建 logout() 函数"
      - "实现 token 管理"
      - "添加错误处理"
    reference: "src/services/claude.ts（API 调用模式）"
    dependencies: ["1"]
    estimated_time: "45分钟"

  - task_id: "3"
    name: "创建认证 UI 组件"
    file: "src/components/Auth/LoginForm.tsx"
    operations:
      - "创建 LoginForm 组件"
      - "实现表单验证"
      - "添加加载和错误状态"
      - "实现密码可见性切换"
      - "添加无障碍属性"
    reference: "src/components/Chat/MessageInput.tsx（表单模式）"
    dependencies: ["1", "2"]
    estimated_time: "60分钟"

  - task_id: "4"
    name: "添加样式和响应式设计"
    file: "src/components/Auth/LoginForm.tsx"
    operations:
      - "使用 Tailwind CSS 类"
      - "实现移动端适配"
      - "添加暗色模式支持"
      - "添加动画效果"
    reference: "现有组件的 Tailwind 模式"
    dependencies: ["3"]
    estimated_time: "30分钟"

  - task_id: "5"
    name: "编写单元测试"
    file: "src/services/__tests__/auth.test.ts"
    operations:
      - "测试 login() 函数各种场景"
      - "测试 register() 函数"
      - "测试错误处理"
      - "测试 token 管理"
      - "达到 > 80% 覆盖率"
    reference: "src/lib/prp/__tests__/generator.test.ts"
    dependencies: ["2"]
    estimated_time: "45分钟"

  - task_id: "6"
    name: "编写组件测试"
    file: "src/components/Auth/__tests__/LoginForm.test.tsx"
    operations:
      - "测试组件渲染"
      - "测试表单提交"
      - "测试验证错误显示"
      - "测试加载状态"
      - "测试用户交互"
    reference: "现有组件测试模式"
    dependencies: ["3"]
    estimated_time: "45分钟"

  - task_id: "7"
    name: "集成到应用"
    file: "src/app/login/page.tsx"
    operations:
      - "创建登录页面"
      - "导入 LoginForm 组件"
      - "添加页面元数据"
      - "实现登录成功后重定向"
    dependencies: ["3", "4"]
    estimated_time: "20分钟"

  - task_id: "8"
    name: "添加路由保护"
    file: "src/middleware.ts"
    operations:
      - "实现认证中间件"
      - "保护需要登录的路由"
      - "处理未授权访问"
    dependencies: ["2"]
    estimated_time: "30分钟"
```

### 验证门禁（必须可执行）

```bash
# 这些命令必须在实现完成后能够运行并通过

# 验证级别 1: 语法和样式检查
pnpm run lint              # ESLint 检查，期望: 0 errors
pnpm run type-check        # TypeScript 类型检查，期望: 0 errors

# 验证级别 2: 单元测试
pnpm test auth             # 运行认证相关测试
pnpm test:coverage         # 生成覆盖率报告，期望: > 80%

# 验证级别 3: 集成测试
pnpm dev                   # 启动开发服务器
# 手动测试: 访问 http://localhost:3000/login
# 测试用例:
#   1. 提交空表单 -> 显示验证错误
#   2. 提交无效邮箱 -> 显示格式错误
#   3. 提交正确凭证 -> 成功登录并重定向
#   4. 提交错误凭证 -> 显示友好错误消息

# 验证级别 4: 性能检查
pnpm build                 # 生产构建，期望: 成功
# 检查: 页面加载时间 < 2s
# 检查: 首次输入延迟 < 100ms
```

## ⚠️ 关键提醒

**在开始编写 PRP 之前，必须完成以下步骤:**

1. **彻底的研究和代码库探索**
   - 使用 Glob 和 Grep 工具搜索相关文件
   - 使用 Read 工具阅读关键文件
   - 记录所有重要的参考位置

2. **收集完整的上下文**
   - 官方文档链接（带具体章节）
   - 代码库中的实现示例
   - 已知的陷阱和解决方案
   - 现有的测试模式

3. **确认实施方案**
   - 验证技术选型是否合适
   - 确认与现有架构的兼容性
   - 识别所有依赖和集成点

4. **准备验证策略**
   - 定义可执行的测试命令
   - 准备手动测试检查清单
   - 设定明确的成功标准

**只有在完成上述所有研究和准备工作后，才能开始编写 PRP。**

## PRP 质量评分

使用以下标准对生成的 PRP 进行 1-10 分评分:

### 8-10 分（高质量 - 可直接实施）
- ✅ 包含所有必要的文档链接和具体章节
- ✅ 提供真实的代码示例或详细的伪代码
- ✅ 列出所有已知陷阱和具体解决方案
- ✅ 清晰的验证步骤和可执行命令
- ✅ 完整的测试策略和覆盖率要求
- ✅ 所有边界情况和错误场景都已考虑
- ✅ 任务依赖关系清晰
- ✅ 时间估算合理

### 5-7 分（中等质量 - 需要少量澄清）
- ⚠️ 大部分上下文已提供
- ⚠️ 可能需要小的澄清
- ⚠️ 某些边界情况未明确
- ⚠️ 测试覆盖可能不完整

### 1-4 分（低质量 - 需要重新研究）
- ❌ 缺少关键上下文
- ❌ 需要更多研究
- ❌ 要求不明确
- ❌ 验证策略不完整

**目标**: 每个 PRP 的信心评分应 ≥ 7 分

## TypeScript 特定要求

### 类型定义清单
- [ ] 所有接口使用 `interface` 定义
- [ ] 联合类型使用 `type` 定义
- [ ] 所有函数有明确的返回类型注解
- [ ] 避免使用 `any`，使用 `unknown` 或具体类型
- [ ] 导出所有公共类型

### React 组件清单
- [ ] Props 使用 interface 定义
- [ ] 组件使用函数声明或箭头函数
- [ ] 客户端组件添加 'use client' 指令
- [ ] 复杂组件使用 React.memo
- [ ] Hooks 有正确的依赖数组

### 测试清单
- [ ] 使用 Vitest 框架
- [ ] 测试文件命名: `*.test.ts` 或 `*.spec.ts`
- [ ] 覆盖正常路径、错误路径和边界情况
- [ ] 组件测试使用 React Testing Library
- [ ] 目标覆盖率 > 80%

## 示例 PRP 结构

最终生成的 PRP 应该遵循 `PRPs/templates/base-prp.md` 的结构，包含:

1. **元数据**: 功能名称、创建日期、版本
2. **目标**: 需要构建什么
3. **为什么**: 业务价值和用户影响
4. **是什么**: 技术要求和成功标准
5. **所需的全部上下文**: 文档、代码示例、陷阱
6. **实施蓝图**: 数据模型、任务清单、伪代码
7. **验证循环**: 语法检查、单元测试、集成测试
8. **最终验证检查清单**: 确保所有要求都已满足

---

## 使用示例

```bash
# 假设用户提供了功能文件: PRPs/features/user-auth.md
# 执行命令:
/generate-prp PRPs/features/user-auth.md

# 工作流程:
# 1. 读取功能文件内容
# 2. 分析代码库中的相关模式
# 3. 研究外部文档和示例
# 4. 生成完整的 PRP 文档
# 5. 保存到 PRPs/user-auth-prp.md
# 6. 返回信心评分和摘要
```

## 最终输出

生成的 PRP 应该能够让 AI 代理:
1. **理解上下文**: 通过文档和代码示例完全理解需求
2. **自我验证**: 通过可执行的测试命令验证实现
3. **迭代优化**: 根据测试结果进行修复和改进
4. **一次成功**: 在首次尝试中生成可工作的代码

**记住**: PRP 的质量直接决定了实施的成功率。宁可多花时间研究和准备，也不要匆忙生成低质量的 PRP。
