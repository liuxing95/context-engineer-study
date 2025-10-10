name: "基础 PRP 模板 v2 - 富上下文验证循环版"
description: |

## 目的

专为 AI 代理优化的模板，通过提供充足的上下文和自我验证能力，实现迭代优化并生成可工作的代码。

## 核心原则

1. **上下文为王**: 包含所有必要的文档、示例和注意事项
2. **验证循环**: 提供 AI 可执行的测试/检查命令并进行修复
3. **信息密集**: 使用代码库中的关键词和模式
4. **渐进式成功**: 从简单开始，验证后再增强
5. **全局规则**: 确保遵循 CLAUDE.md 中的所有规则

---

## 目标

[需要构建的内容 - 明确说明最终状态和期望]

## 为什么

- [业务价值和用户影响]
- [与现有功能的集成]
- [解决的问题以及为谁解决]

## 是什么

[用户可见的行为和技术要求]

### 成功标准

- [ ] [具体的可衡量结果]

## 所需的全部上下文

### 文档和参考资料（列出实现功能所需的所有上下文）

```yaml
# 必读 - 将这些包含在你的上下文窗口中
- url: [官方 API 文档 URL]
  why: [你需要的具体章节/方法]

- file: [path/to/example.tsx]
  why: [要遵循的模式，要避免的陷阱]

- doc: [库文档 URL]
  section: [关于常见陷阱的具体章节]
  critical: [防止常见错误的关键见解]

- docfile: [PRPs/ai_docs/file.md]
  why: [用户粘贴到项目中的文档]
```

### 当前代码库结构（在项目根目录运行 `tree` 获取代码库概览）

```bash
# 示例:
src/
├── app/                 # Next.js App Router 页面
├── components/          # React 组件
├── lib/                # 工具库和帮助函数
├── services/           # API 和业务逻辑
└── types/              # TypeScript 类型定义
```

### 期望的代码库结构（需要添加的文件及其职责）

```bash
# 示例:
src/
├── components/
│   └── NewFeature/    # 新功能组件
│       ├── index.tsx  # 主组件
│       └── types.ts   # 组件类型定义
└── services/
    └── newFeature.ts  # 新功能服务层
```

### 我们代码库的已知陷阱和库的特性

```typescript
// 关键: [库名称] 需要 [特定设置]
// 示例: Next.js App Router 需要 'use client' 指令用于客户端组件
// 示例: 这个 ORM 不支持超过 1000 条记录的批量插入
// 示例: 我们使用 pnpm 进行包管理，不使用 npm 或 yarn
// 示例: 严格的 TypeScript 模式已启用，所有函数需要类型注解
```

## 实施蓝图

### 数据模型和结构

创建核心数据模型，确保类型安全和一致性。

```typescript
// 示例:
// TypeScript 接口
interface User {
  id: string;
  name: string;
  email: string;
  createdAt: Date;
}

// Zod 模式（用于运行时验证）
import { z } from 'zod';

const UserSchema = z.object({
  id: z.string().uuid(),
  name: z.string().min(1),
  email: z.string().email(),
  createdAt: z.date(),
});

// React 组件 Props
interface FeatureProps {
  data: User;
  onUpdate: (user: User) => void;
  isLoading?: boolean;
}
```

### 按完成顺序列出的任务清单

```yaml
任务 1: 创建类型定义
  文件: src/types/newFeature.ts
  操作:
    - 定义核心接口
    - 导出类型别名
    - 添加 JSDoc 注释
  参考: src/types/existingFeature.ts

任务 2: 实现服务层
  文件: src/services/newFeature.ts
  操作:
    - 创建 API 调用函数
    - 实现错误处理
    - 添加请求/响应类型
  参考: src/services/claude.ts（模式）

任务 3: 创建 React 组件
  文件: src/components/NewFeature/index.tsx
  操作:
    - 创建函数组件
    - 实现 Props 接口
    - 使用 React.memo 优化
    - 添加错误边界
  参考: src/components/Chat/index.tsx

任务 4: 添加样式
  操作:
    - 使用 Tailwind CSS 类
    - 确保响应式设计
    - 支持暗色模式
  参考: 现有组件的 Tailwind 模式

任务 5: 编写单元测试
  文件: src/components/NewFeature/__tests__/index.test.tsx
  操作:
    - 测试组件渲染
    - 测试用户交互
    - 测试边界情况
  参考: src/lib/prp/__tests__/generator.test.ts

任务 6: 集成到应用
  文件: src/app/feature/page.tsx
  操作:
    - 创建 Next.js 页面
    - 导入并使用组件
    - 添加元数据
```

### 每个任务的伪代码（根据需要添加）

```typescript
// 任务 2: 服务层实现
// 伪代码 - 包含关键细节，不写完整代码

// 模式: 始终先验证输入（参见 src/lib/validators.ts）
export async function createFeature(input: CreateFeatureInput): Promise<FeatureResult> {
  // 验证: 使用 Zod 模式
  const validated = CreateFeatureSchema.parse(input); // 抛出 ZodError

  // 陷阱: Claude API 需要速率限制
  try {
    // 关键: API 密钥从环境变量获取
    const apiKey = process.env.CLAUDE_API_KEY;
    if (!apiKey) throw new Error('Missing API key');

    // 模式: 使用现有的重试机制
    const result = await withRetry(
      () => claudeApi.createCompletion({
        model: 'claude-sonnet-4-20250514',
        messages: [...],
      }),
      { attempts: 3, backoff: 'exponential' }
    );

    // 模式: 标准化响应格式
    return formatResponse(result); // 参见 src/utils/responses.ts
  } catch (error) {
    // 模式: 友好的错误处理
    handleApiError(error); // 参见 src/utils/errors.ts
  }
}
```

```typescript
// 任务 3: React 组件实现
// 伪代码

'use client'; // 关键: Next.js 客户端组件需要此指令

export default function NewFeature({ data, onUpdate, isLoading = false }: FeatureProps) {
  // 模式: 使用 React Hooks
  const [state, setState] = useState<FeatureState>(initialState);

  // 性能: 使用 useCallback 避免重渲染
  const handleUpdate = useCallback((newData: User) => {
    // 验证: 客户端验证
    const validated = validateUser(newData);
    onUpdate(validated);
  }, [onUpdate]);

  // 模式: 加载状态处理
  if (isLoading) {
    return <LoadingSpinner />; // 参见 src/components/Loading.tsx
  }

  // 模式: 使用 Tailwind CSS 类
  return (
    <div className="flex flex-col gap-4 p-4">
      {/* 组件内容 */}
    </div>
  );
}

// 性能: 使用 memo 优化
export default React.memo(NewFeature);
```

### 集成点

```yaml
数据库:
  - 迁移: "添加 'feature_enabled' 列到 users 表"
  - 索引: "CREATE INDEX idx_feature_lookup ON users(feature_id)"

配置:
  - 添加到: .env.local
  - 模式: "FEATURE_API_KEY=your_key_here"
  - 注意: 永远不要提交 .env.local 到版本控制

路由:
  - 添加到: src/app/feature/page.tsx
  - 模式: Next.js App Router 约定

依赖:
  - 安装: "pnpm add [package-name]"
  - 类型: "pnpm add -D @types/[package-name]"
```

## 验证循环

### 级别 1: 语法和样式

```bash
# 首先运行这些 - 在继续之前修复任何错误
pnpm run lint              # ESLint 检查
pnpm run type-check        # TypeScript 类型检查

# 预期: 没有错误。如果有错误，阅读错误信息并修复。
```

### 级别 2: 单元测试（每个新功能/文件/函数使用现有的测试模式）

```typescript
// 创建 NewFeature.test.tsx，包含以下测试用例:
import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import NewFeature from '../index';

describe('NewFeature', () => {
  it('正常路径：基本功能工作', () => {
    render(<NewFeature data={mockData} onUpdate={mockFn} />);
    expect(screen.getByText('Expected Text')).toBeInTheDocument();
  });

  it('验证错误：无效输入触发错误', () => {
    expect(() => {
      validateInput('');
    }).toThrow(ValidationError);
  });

  it('加载状态：正确显示加载指示器', () => {
    render(<NewFeature data={mockData} onUpdate={mockFn} isLoading={true} />);
    expect(screen.getByRole('status')).toBeInTheDocument();
  });

  it('用户交互：点击触发更新', () => {
    const onUpdate = vi.fn();
    render(<NewFeature data={mockData} onUpdate={onUpdate} />);

    fireEvent.click(screen.getByRole('button'));
    expect(onUpdate).toHaveBeenCalledWith(expect.any(Object));
  });
});
```

```bash
# 运行并迭代直到通过:
pnpm test                  # 运行所有测试
pnpm test NewFeature       # 运行特定测试
pnpm test:ui               # 打开测试 UI
pnpm test:coverage         # 生成覆盖率报告

# 如果失败: 阅读错误，理解根本原因，修复代码，重新运行（永远不要通过 mock 来使测试通过）
```

### 级别 3: 集成测试

```bash
# 启动开发服务器
pnpm dev

# 在浏览器中测试
# 打开: http://localhost:3000/feature

# 测试 API 端点（如果适用）
curl -X POST http://localhost:3000/api/feature \
  -H "Content-Type: application/json" \
  -d '{"param": "test_value"}'

# 预期: {"status": "success", "data": {...}}
# 如果错误: 检查浏览器控制台和终端日志
```

### 级别 4: 手动测试检查清单

- [ ] 功能在桌面浏览器中工作
- [ ] 功能在移动设备上工作（响应式）
- [ ] 暗色模式正确显示
- [ ] 亮色模式正确显示
- [ ] 错误状态友好显示
- [ ] 加载状态正确显示
- [ ] 键盘导航工作
- [ ] 屏幕阅读器可访问（基本检查）

## 最终验证检查清单

- [ ] 所有测试通过: `pnpm test:run`
- [ ] 没有 lint 错误: `pnpm run lint`
- [ ] 没有类型错误: `pnpm run type-check`
- [ ] 手动测试成功: [具体步骤]
- [ ] 错误情况优雅处理
- [ ] 日志信息丰富但不冗长
- [ ] 文档已更新（如需要）
- [ ] 可访问性检查通过
- [ ] 性能符合标准（< 2s 加载）
- [ ] 代码审查通过（如适用）

---

## 要避免的反模式

- ❌ 不要在现有模式有效时创建新模式
- ❌ 不要因为"应该能工作"就跳过验证
- ❌ 不要忽略失败的测试 - 修复它们
- ❌ 不要在 TypeScript 中使用 `any` 类型
- ❌ 不要硬编码应该在配置中的值
- ❌ 不要捕获所有异常 - 要具体
- ❌ 不要忘记在客户端组件中使用 'use client'
- ❌ 不要使用 npm/yarn - 始终使用 pnpm
- ❌ 不要在没有 memo 的情况下创建复杂组件
- ❌ 不要忘记清理 useEffect 中的副作用
- ❌ 不要在组件内部定义对象/数组（会导致重渲染）
- ❌ 不要跳过 JSDoc 注释（对复杂函数）

---

## TypeScript 特定最佳实践

### 类型定义模式

```typescript
// ✅ 好: 使用 interface 定义对象结构
interface User {
  id: string;
  name: string;
}

// ✅ 好: 使用 type 定义联合类型
type Status = 'idle' | 'loading' | 'success' | 'error';

// ✅ 好: 导出所有公共类型
export type { User, Status };

// ❌ 坏: 使用 any
function process(data: any) { } // 不要这样做

// ✅ 好: 使用泛型或 unknown
function process<T>(data: T) { }
function process(data: unknown) { }
```

### React 组件模式

```typescript
// ✅ 好: Props interface
interface ButtonProps {
  label: string;
  onClick: () => void;
  variant?: 'primary' | 'secondary';
  disabled?: boolean;
}

// ✅ 好: 使用函数组件和类型化的 props
export default function Button({
  label,
  onClick,
  variant = 'primary',
  disabled = false
}: ButtonProps) {
  return <button onClick={onClick} disabled={disabled}>{label}</button>;
}

// ✅ 好: 使用 React.FC 的替代方案（更推荐）
const Button = ({ label, onClick }: ButtonProps): JSX.Element => {
  return <button onClick={onClick}>{label}</button>;
};
```

### Hooks 模式

```typescript
// ✅ 好: 类型化的 useState
const [count, setCount] = useState<number>(0);
const [user, setUser] = useState<User | null>(null);

// ✅ 好: 类型化的 useCallback
const handleClick = useCallback((id: string) => {
  console.log(id);
}, []);

// ✅ 好: 类型化的 useMemo
const expensiveValue = useMemo<number>(() => {
  return computeExpensiveValue(data);
}, [data]);

// ✅ 好: 自定义 Hook 返回类型
function useFeature(): [boolean, () => void] {
  const [enabled, setEnabled] = useState(false);
  const toggle = () => setEnabled(!enabled);
  return [enabled, toggle];
}
```

---

## Next.js 特定注意事项

### 客户端 vs 服务器组件

```typescript
// ✅ 服务器组件（默认）
// app/page.tsx
export default async function Page() {
  const data = await fetchData(); // 可以直接使用 async/await
  return <div>{data}</div>;
}

// ✅ 客户端组件（需要交互）
// components/Interactive.tsx
'use client'; // 必须在文件顶部

import { useState } from 'react';

export default function Interactive() {
  const [count, setCount] = useState(0);
  return <button onClick={() => setCount(count + 1)}>{count}</button>;
}
```

### API 路由

```typescript
// ✅ 好: app/api/feature/route.ts
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    // 验证输入
    const validated = FeatureSchema.parse(body);

    // 处理请求
    const result = await processFeature(validated);

    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json(
      { error: 'Invalid request' },
      { status: 400 }
    );
  }
}
```

---

## 信心评分指南

根据以下标准对 PRP 进行 1-10 评分:

### 8-10 分（高信心）
- ✅ 包含所有必要的文档链接
- ✅ 提供具体的代码示例或伪代码
- ✅ 列出已知的陷阱和解决方案
- ✅ 清晰的验证步骤和命令
- ✅ 完整的测试策略
- ✅ 所有边界情况都已考虑

### 5-7 分（中等信心）
- ⚠️ 大部分上下文已提供
- ⚠️ 可能需要小的澄清
- ⚠️ 某些边界情况未明确

### 1-4 分（低信心）
- ❌ 缺少关键上下文
- ❌ 需要更多研究
- ❌ 要求不明确

**目标**: 争取信心评分 ≥ 7
