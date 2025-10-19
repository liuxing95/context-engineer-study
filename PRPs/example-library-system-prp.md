# 产品需求提示 (PRP) - 可复用示例管理系统

**创建日期**: 2025-10-19  
**版本**: 1.0.0  
**作者**: AI Assistant  
**功能名称**: 可复用示例管理系统 (Example Library System)

---

## 目标

构建一个完整的示例管理系统，用于存储、管理和检索技术文档示例。系统应支持 CRUD 操作、智能搜索、质量评分、A/B 测试和效果追踪。集成向量数据库实现语义搜索，提供直观的 Web 界面进行示例管理。

**最终状态**: 一个功能完善的 Next.js Web 应用，开发者可以轻松添加、编辑、搜索和管理代码示例，并通过数据分析优化示例质量。

---

## 为什么

### 业务价值

- **提升文档质量**: 通过统一管理高质量示例，提升技术文档的整体水平
- **加速开发效率**: 开发者可快速找到相关示例，减少重复劳动
- **数据驱动优化**: 通过追踪和 A/B 测试，持续改进示例效果

### 用户影响

- **内容创作者**: 可系统化管理示例库，避免重复创建相似示例
- **文档消费者**: 通过语义搜索快速找到最相关的示例
- **项目管理者**: 通过数据分析了解哪些示例最有价值

### 集成点

- 与现有的 `doc-generator` 模块集成，作为示例来源
- 扩展现有的 `DocExample` 类型定义
- 可作为独立模块供其他功能使用

---

## 是什么

### 功能概述

1. **示例 CRUD 管理**

   - 创建、读取、更新、删除示例
   - 批量导入/导出功能
   - 版本历史追踪

2. **分类和标签系统**

   - 多维度分类（语言、复杂度、主题）
   - 自定义标签
   - 标签自动建议

3. **搜索功能**

   - 关键词搜索
   - 语义搜索（向量相似度）
   - 高级过滤（按语言、复杂度、标签）
   - 搜索结果排序和分页

4. **质量评分系统**

   - 多维度评分（清晰度、实用性、完整性）
   - 用户评分和反馈
   - 自动质量检测（代码可运行性、文档完整性）

5. **A/B 测试框架**

   - 对比不同示例版本的效果
   - 流量分配和统计显著性检验
   - 测试结果可视化

6. **效果追踪**

   - 查看次数、使用次数统计
   - 用户反馈收集
   - 效果指标仪表板

7. **向量数据库集成**
   - 示例嵌入向量生成
   - 相似示例推荐
   - 语义搜索功能

### 成功标准

- [x] 所有 CRUD 操作正常工作，响应时间 < 500ms
- [x] 搜索功能准确率 > 85%，响应时间 < 1s
- [x] 语义搜索能找到语义相似但关键词不同的示例
- [x] 质量评分系统覆盖所有示例，评分准确反映示例质量
- [x] A/B 测试框架能正确分配流量并统计结果
- [x] 效果追踪数据准确无误
- [x] 单元测试覆盖率 > 80%
- [x] 界面友好，移动端适配良好
- [x] 所有操作都有适当的加载状态和错误处理

---

## 所需的全部上下文

### 文档和参考资料

```yaml
必读文档:
  - url: 'https://docs.pinecone.io/docs/quickstart'
    section: 'TypeScript SDK'
    critical: '向量数据库初始化、索引创建、向量插入和查询'

  - url: 'https://platform.openai.com/docs/guides/embeddings'
    section: 'text-embedding-3-small'
    critical: '生成文本嵌入向量，用于语义搜索'

  - url: 'https://nextjs.org/docs/app/building-your-application/data-fetching/server-actions-and-mutations'
    section: 'Server Actions'
    critical: 'Next.js 服务器操作处理数据变更'

  - url: 'https://www.prisma.io/docs/getting-started/quickstart'
    section: 'TypeScript & PostgreSQL'
    critical: '数据库 ORM，管理示例数据持久化（可选）'

  - url: 'https://react.dev/reference/react/useMemo'
    section: 'useMemo'
    critical: '优化搜索结果和过滤性能'

  - file: 'src/lib/doc-generator/examples.ts'
    why: '现有示例数据结构和工具函数的参考实现'

  - file: 'src/lib/doc-generator/types.ts'
    why: 'DocExample 接口定义，需要扩展此类型'

  - file: 'src/lib/doc-generator/context-builder.ts'
    why: '示例选择和相关性匹配的现有逻辑'

  - file: 'src/lib/prp/__tests__/generator.test.ts'
    why: '测试模式参考，用于编写本功能的测试'
```

### 当前代码库结构

```
src/
├── app/                         # Next.js App Router
│   ├── doc-generator/          # 现有文档生成器
│   ├── token-counter/          # Token 计数器
│   └── page.tsx                # 首页
├── lib/                        # 核心库
│   ├── doc-generator/          # 文档生成逻辑
│   │   ├── examples.ts         # 示例数据和工具函数
│   │   ├── types.ts            # 类型定义
│   │   └── context-builder.ts  # 上下文构建器
│   ├── prp/                    # PRP 生成器
│   ├── token-counter/          # Token 计数
│   └── openai-client.ts        # OpenAI 客户端
└── components/                 # 可复用组件（待创建）
```

### 期望的代码库结构

```
src/
├── app/
│   ├── example-library/        # 新增：示例库应用
│   │   ├── page.tsx           # 主页面
│   │   ├── [id]/              # 示例详情页
│   │   │   └── page.tsx
│   │   └── api/               # API 路由（可选）
│   │       ├── examples/      # 示例 CRUD
│   │       └── search/        # 搜索 API
├── lib/
│   ├── example-library/        # 新增：示例库核心逻辑
│   │   ├── index.ts           # 主导出
│   │   ├── types.ts           # 类型定义
│   │   ├── storage.ts         # 数据存储层
│   │   ├── search.ts          # 搜索引擎
│   │   ├── embeddings.ts      # 向量嵌入
│   │   ├── quality-scorer.ts  # 质量评分
│   │   ├── ab-testing.ts      # A/B 测试
│   │   ├── analytics.ts       # 效果追踪
│   │   └── __tests__/         # 单元测试
│   │       ├── storage.test.ts
│   │       ├── search.test.ts
│   │       ├── quality-scorer.test.ts
│   │       └── ab-testing.test.ts
└── components/
    └── example-library/        # 新增：示例库 UI 组件
        ├── ExampleList.tsx    # 示例列表
        ├── ExampleCard.tsx    # 示例卡片
        ├── ExampleEditor.tsx  # 示例编辑器
        ├── SearchBar.tsx      # 搜索栏
        ├── FilterPanel.tsx    # 过滤面板
        ├── QualityIndicator.tsx # 质量指示器
        └── AnalyticsDashboard.tsx # 分析仪表板
```

### 已知陷阱和库的特性

```typescript
// ❌ 陷阱 1: Next.js 客户端组件忘记 'use client'
// 解决方案: 任何使用 hooks 或事件处理的组件必须添加 'use client'

// ❌ 陷阱 2: OpenAI Embeddings API 速率限制
// 解决方案: 实现批量处理和速率限制，单次请求不超过 100 个文本

// ❌ 陷阱 3: Pinecone 免费层限制（1 个索引，10K 向量）
// 解决方案: 设计时考虑扩展性，使用命名空间组织数据

// ❌ 陷阱 4: 向量搜索结果可能不稳定
// 解决方案: 结合关键词搜索和语义搜索，使用混合排序

// ❌ 陷阱 5: TypeScript 严格模式要求明确类型
// 解决方案: 所有函数必须有返回类型注解，避免使用 any

// ❌ 陷阱 6: React 状态更新导致不必要的重渲染
// 解决方案: 使用 useMemo、useCallback 和 React.memo 优化性能

// ❌ 陷阱 7: 大量示例数据导致页面加载慢
// 解决方案: 实现虚拟滚动或分页加载

// ❌ 陷阱 8: 浏览器存储限制（IndexedDB 约 50MB-100MB）
// 解决方案: 定期清理旧数据，或使用服务器端存储

// ⚠️ 重要: 项目使用 pnpm，不要使用 npm 或 yarn
// ⚠️ 重要: 严格遵循现有的 TypeScript 配置（strict: true）
```

---

## 实施蓝图

### 数据模型和结构

#### 核心类型定义

```typescript
// src/lib/example-library/types.ts

import { DocExample } from '../doc-generator/types';

/**
 * 扩展的示例类型，添加管理所需的字段
 */
export interface EnhancedExample extends DocExample {
  id: string; // 唯一标识符
  createdAt: Date; // 创建时间
  updatedAt: Date; // 更新时间
  author?: string; // 作者
  tags: string[]; // 标签列表
  category: ExampleCategory; // 主分类
  qualityScore?: QualityScore; // 质量评分
  analytics?: ExampleAnalytics; // 效果数据
  version: number; // 版本号
  vectorId?: string; // Pinecone 向量 ID
}

/**
 * 示例分类
 */
export interface ExampleCategory {
  primary: string; // 主分类（如：React, Node.js）
  secondary?: string; // 子分类（如：Hooks, Express）
  domain?: string; // 领域（如：Frontend, Backend）
}

/**
 * 质量评分
 */
export interface QualityScore {
  overall: number; // 总分 (0-100)
  clarity: number; // 清晰度 (0-100)
  usefulness: number; // 实用性 (0-100)
  completeness: number; // 完整性 (0-100)
  codeQuality: number; // 代码质量 (0-100)
  userRatings?: UserRating[]; // 用户评分
  autoScore?: number; // 自动评分
}

/**
 * 用户评分
 */
export interface UserRating {
  userId: string;
  score: number; // 1-5 星
  comment?: string;
  timestamp: Date;
}

/**
 * 效果分析数据
 */
export interface ExampleAnalytics {
  views: number; // 查看次数
  uses: number; // 使用次数
  likes: number; // 点赞数
  dislikes: number; // 点踩数
  lastViewed?: Date; // 最后查看时间
  averageTimeSpent?: number; // 平均停留时间（秒）
  bounceRate?: number; // 跳出率 (0-1)
}

/**
 * A/B 测试配置
 */
export interface ABTest {
  id: string;
  name: string;
  description: string;
  variantA: string; // 示例 ID A
  variantB: string; // 示例 ID B
  startDate: Date;
  endDate?: Date;
  trafficSplit: number; // 流量分配比例 (0-1)
  status: 'running' | 'completed' | 'paused';
  results?: ABTestResults;
}

/**
 * A/B 测试结果
 */
export interface ABTestResults {
  variantAMetrics: VariantMetrics;
  variantBMetrics: VariantMetrics;
  winner?: 'A' | 'B' | 'tie';
  confidence: number; // 统计置信度 (0-1)
  sampleSize: number;
}

/**
 * 变体指标
 */
export interface VariantMetrics {
  impressions: number;
  uses: number;
  conversionRate: number;
  averageRating: number;
  averageTimeSpent: number;
}

/**
 * 搜索选项
 */
export interface SearchOptions {
  query: string;
  filters?: SearchFilters;
  limit?: number;
  offset?: number;
  sortBy?: 'relevance' | 'date' | 'rating' | 'views';
  sortOrder?: 'asc' | 'desc';
  useSemanticSearch?: boolean; // 是否使用语义搜索
}

/**
 * 搜索过滤器
 */
export interface SearchFilters {
  languages?: string[];
  complexities?: ('beginner' | 'intermediate' | 'advanced')[];
  tags?: string[];
  categories?: string[];
  minQualityScore?: number;
  dateRange?: {
    start: Date;
    end: Date;
  };
}

/**
 * 搜索结果
 */
export interface SearchResult {
  examples: EnhancedExample[];
  total: number;
  page: number;
  pageSize: number;
  hasMore: boolean;
}

/**
 * 存储配置
 */
export interface StorageConfig {
  type: 'memory' | 'indexeddb' | 'server';
  apiEndpoint?: string; // 服务器存储时使用
}

/**
 * 向量数据库配置
 */
export interface VectorDBConfig {
  provider: 'pinecone' | 'local';
  apiKey?: string;
  environment?: string;
  indexName?: string;
  dimension?: number; // 向量维度
}
```

#### Zod 验证模式

```typescript
// src/lib/example-library/validation.ts

import { z } from 'zod';

export const ExampleCategorySchema = z.object({
  primary: z.string().min(1),
  secondary: z.string().optional(),
  domain: z.string().optional(),
});

export const QualityScoreSchema = z.object({
  overall: z.number().min(0).max(100),
  clarity: z.number().min(0).max(100),
  usefulness: z.number().min(0).max(100),
  completeness: z.number().min(0).max(100),
  codeQuality: z.number().min(0).max(100),
});

export const EnhancedExampleSchema = z.object({
  id: z.string().uuid(),
  topic: z.string().min(1),
  doc: z.string().min(10),
  complexity: z.enum(['beginner', 'intermediate', 'advanced']).optional(),
  language: z.string().optional(),
  createdAt: z.date(),
  updatedAt: z.date(),
  author: z.string().optional(),
  tags: z.array(z.string()),
  category: ExampleCategorySchema,
  qualityScore: QualityScoreSchema.optional(),
  version: z.number().int().positive(),
});

export const SearchOptionsSchema = z.object({
  query: z.string(),
  filters: z
    .object({
      languages: z.array(z.string()).optional(),
      complexities: z.array(z.enum(['beginner', 'intermediate', 'advanced'])).optional(),
      tags: z.array(z.string()).optional(),
      categories: z.array(z.string()).optional(),
      minQualityScore: z.number().min(0).max(100).optional(),
    })
    .optional(),
  limit: z.number().int().positive().max(100).optional(),
  offset: z.number().int().min(0).optional(),
  sortBy: z.enum(['relevance', 'date', 'rating', 'views']).optional(),
  sortOrder: z.enum(['asc', 'desc']).optional(),
  useSemanticSearch: z.boolean().optional(),
});
```

---

## 按完成顺序列出的任务清单

### 阶段 1: 基础架构（第 1-2 天）

#### 任务 1.1: 创建类型定义和验证模式

- **文件**: `src/lib/example-library/types.ts`
- **操作**:
  - 定义所有核心接口
  - 扩展现有的 DocExample 类型
  - 添加 JSDoc 注释
- **参考**: `src/lib/doc-generator/types.ts`
- **预计时间**: 2 小时

#### 任务 1.2: 实现数据存储层

- **文件**: `src/lib/example-library/storage.ts`
- **操作**:
  - 实现 ExampleStorage 类
  - 支持内存存储（初期）和 IndexedDB（后期）
  - CRUD 操作实现
  - 批量操作支持
- **参考**: 现有的数据处理模式
- **依赖**: 任务 1.1
- **预计时间**: 4 小时

#### 任务 1.3: 编写存储层测试

- **文件**: `src/lib/example-library/__tests__/storage.test.ts`
- **操作**:
  - 测试所有 CRUD 操作
  - 测试边界情况
  - 测试并发操作
  - 达到 > 80% 覆盖率
- **参考**: `src/lib/prp/__tests__/generator.test.ts`
- **依赖**: 任务 1.2
- **预计时间**: 3 小时

### 阶段 2: 搜索功能（第 3-4 天）

#### 任务 2.1: 实现基础搜索引擎

- **文件**: `src/lib/example-library/search.ts`
- **操作**:
  - 关键词搜索实现
  - 过滤功能实现
  - 排序和分页
  - 搜索结果评分算法
- **参考**: `src/lib/doc-generator/examples.ts:getRelevantExamples`
- **依赖**: 任务 1.2
- **预计时间**: 5 小时

#### 任务 2.2: 集成向量嵌入

- **文件**: `src/lib/example-library/embeddings.ts`
- **操作**:
  - 集成 OpenAI Embeddings API
  - 批量生成嵌入向量
  - 实现速率限制和重试
  - 向量缓存机制
- **参考**: `src/lib/openai-client.ts`
- **依赖**: 任务 1.2
- **预计时间**: 4 小时

#### 任务 2.3: 实现语义搜索（可选：使用 Pinecone 或本地向量）

- **文件**: `src/lib/example-library/vector-search.ts`
- **操作**:
  - 集成 Pinecone（或实现本地向量搜索）
  - 向量索引管理
  - 相似度搜索
  - 混合搜索（关键词 + 语义）
- **依赖**: 任务 2.2
- **预计时间**: 6 小时

#### 任务 2.4: 编写搜索功能测试

- **文件**: `src/lib/example-library/__tests__/search.test.ts`
- **操作**:
  - 测试关键词搜索
  - 测试过滤和排序
  - 测试语义搜索（mock）
  - 性能测试
- **依赖**: 任务 2.1, 2.3
- **预计时间**: 3 小时

### 阶段 3: 质量评分系统（第 5 天）

#### 任务 3.1: 实现质量评分引擎

- **文件**: `src/lib/example-library/quality-scorer.ts`
- **操作**:
  - 多维度评分算法
  - 自动代码质量检测
  - 文档完整性检查
  - 用户评分聚合
- **依赖**: 任务 1.2
- **预计时间**: 5 小时

#### 任务 3.2: 编写质量评分测试

- **文件**: `src/lib/example-library/__tests__/quality-scorer.test.ts`
- **操作**:
  - 测试各维度评分
  - 测试边界情况
  - 测试评分稳定性
- **依赖**: 任务 3.1
- **预计时间**: 2 小时

### 阶段 4: A/B 测试和分析（第 6 天）

#### 任务 4.1: 实现 A/B 测试框架

- **文件**: `src/lib/example-library/ab-testing.ts`
- **操作**:
  - 流量分配算法
  - 测试配置管理
  - 指标收集
  - 统计显著性计算
- **依赖**: 任务 1.2
- **预计时间**: 5 小时

#### 任务 4.2: 实现效果追踪

- **文件**: `src/lib/example-library/analytics.ts`
- **操作**:
  - 事件追踪（查看、使用、评分）
  - 指标聚合
  - 时间序列数据
  - 导出功能
- **依赖**: 任务 1.2
- **预计时间**: 3 小时

#### 任务 4.3: 编写 A/B 测试和分析测试

- **文件**: `src/lib/example-library/__tests__/ab-testing.test.ts`
- **文件**: `src/lib/example-library/__tests__/analytics.test.ts`
- **操作**:
  - 测试流量分配
  - 测试指标计算
  - 测试边界情况
- **依赖**: 任务 4.1, 4.2
- **预计时间**: 3 小时

### 阶段 5: UI 组件（第 7-9 天）

#### 任务 5.1: 创建基础 UI 组件

- **文件**: `src/components/example-library/ExampleCard.tsx`
- **文件**: `src/components/example-library/QualityIndicator.tsx`
- **操作**:
  - 示例卡片组件（显示示例摘要）
  - 质量指示器组件（可视化评分）
  - 响应式设计
  - 暗色模式支持
- **参考**: 现有组件的 Tailwind 样式
- **依赖**: 任务 1.1
- **预计时间**: 4 小时

#### 任务 5.2: 创建搜索和过滤组件

- **文件**: `src/components/example-library/SearchBar.tsx`
- **文件**: `src/components/example-library/FilterPanel.tsx`
- **操作**:
  - 搜索栏（实时搜索建议）
  - 过滤面板（多维度过滤）
  - 防抖优化
  - 使用 useCallback 和 useMemo
- **参考**: `src/app/doc-generator/page.tsx`（表单处理）
- **依赖**: 任务 2.1
- **预计时间**: 5 小时

#### 任务 5.3: 创建示例列表和编辑器

- **文件**: `src/components/example-library/ExampleList.tsx`
- **文件**: `src/components/example-library/ExampleEditor.tsx`
- **操作**:
  - 虚拟滚动列表（处理大量数据）
  - Markdown 编辑器（编辑示例内容）
  - 实时预览
  - 表单验证
- **依赖**: 任务 5.1, 5.2
- **预计时间**: 6 小时

#### 任务 5.4: 创建分析仪表板

- **文件**: `src/components/example-library/AnalyticsDashboard.tsx`
- **操作**:
  - 指标卡片（查看、使用、评分）
  - 趋势图表（使用简单的 SVG 或 chart 库）
  - A/B 测试结果展示
- **依赖**: 任务 4.2
- **预计时间**: 5 小时

#### 任务 5.5: 编写组件测试

- **文件**: `src/components/example-library/__tests__/*.test.tsx`
- **操作**:
  - 测试组件渲染
  - 测试用户交互
  - 测试边界情况
- **参考**: 现有测试模式（如有）
- **依赖**: 任务 5.1-5.4
- **预计时间**: 4 小时

### 阶段 6: 页面集成（第 10 天）

#### 任务 6.1: 创建主页面

- **文件**: `src/app/example-library/page.tsx`
- **操作**:
  - 集成搜索、过滤和列表组件
  - 实现状态管理
  - 服务器端数据获取（如适用）
  - 加载和错误状态
- **参考**: `src/app/doc-generator/page.tsx`
- **依赖**: 任务 5.3
- **预计时间**: 4 小时

#### 任务 6.2: 创建示例详情页

- **文件**: `src/app/example-library/[id]/page.tsx`
- **操作**:
  - 显示完整示例内容
  - 评分和反馈功能
  - 相似示例推荐
  - 元数据显示
- **依赖**: 任务 6.1
- **预计时间**: 3 小时

#### 任务 6.3: 创建管理页面

- **文件**: `src/app/example-library/manage/page.tsx`
- **操作**:
  - 示例编辑和删除
  - 批量操作
  - A/B 测试配置
  - 分析仪表板
- **依赖**: 任务 5.4, 6.1
- **预计时间**: 4 小时

#### 任务 6.4: 更新首页导航

- **文件**: `src/app/page.tsx`
- **操作**:
  - 添加示例库入口链接
  - 更新描述
- **依赖**: 任务 6.1
- **预计时间**: 30 分钟

### 阶段 7: 集成和优化（第 11 天）

#### 任务 7.1: 集成到文档生成器

- **文件**: `src/lib/doc-generator/index.ts`
- **操作**:
  - 从示例库获取示例
  - 替换硬编码示例
  - 保持向后兼容
- **依赖**: 任务 2.1
- **预计时间**: 2 小时

#### 任务 7.2: 性能优化

- **操作**:
  - 添加 React.memo
  - 优化搜索算法
  - 实现缓存策略
  - 代码分割
- **依赖**: 所有功能完成
- **预计时间**: 3 小时

#### 任务 7.3: 错误处理和边界情况

- **操作**:
  - 添加 ErrorBoundary
  - 完善错误提示
  - 处理离线情况
  - 空状态设计
- **依赖**: 所有功能完成
- **预计时间**: 2 小时

### 阶段 8: 文档和部署（第 12 天）

#### 任务 8.1: 编写文档

- **文件**: `src/lib/example-library/README.md`
- **操作**:
  - API 文档
  - 使用示例
  - 架构说明
  - 故障排除
- **预计时间**: 2 小时

#### 任务 8.2: 最终测试和修复

- **操作**:
  - 运行所有测试
  - 修复发现的 bug
  - 性能测试
  - 可访问性检查
- **预计时间**: 3 小时

---

## 验证循环

### 级别 1: 语法和样式

```bash
# 在每次实现后运行这些命令
pnpm run lint              # ESLint 检查，期望: 0 errors
pnpm run type-check        # TypeScript 类型检查，期望: 0 errors

# 如果有错误，仔细阅读错误信息并修复
# 常见错误: 缺少类型注解、未使用的变量、导入路径错误
```

### 级别 2: 单元测试

```bash
# 运行特定模块的测试
pnpm test storage          # 测试存储层
pnpm test search           # 测试搜索功能
pnpm test quality-scorer   # 测试质量评分
pnpm test ab-testing       # 测试 A/B 测试
pnpm test analytics        # 测试分析功能

# 运行所有测试
pnpm test:run              # 运行所有测试一次
pnpm test:coverage         # 生成覆盖率报告，期望: > 80%

# 如果测试失败:
# 1. 阅读错误消息，理解根本原因
# 2. 修复代码或测试
# 3. 重新运行测试
# 4. 永远不要通过改变断言来使测试通过
```

### 级别 3: 集成测试

```bash
# 启动开发服务器
pnpm dev

# 手动测试清单:
# 1. 打开 http://localhost:3000/example-library
# 2. 测试搜索功能
#    - 输入关键词，验证结果相关性
#    - 测试过滤器（语言、复杂度、标签）
#    - 测试排序（相关性、日期、评分）
# 3. 测试 CRUD 操作
#    - 创建新示例
#    - 编辑现有示例
#    - 删除示例
#    - 批量操作
# 4. 测试质量评分
#    - 查看自动评分
#    - 添加用户评分
#    - 验证评分更新
# 5. 测试 A/B 测试
#    - 创建测试
#    - 查看流量分配
#    - 查看测试结果
# 6. 测试分析仪表板
#    - 查看指标
#    - 验证数据准确性
# 7. 测试语义搜索（如已实现）
#    - 输入语义相似但词汇不同的查询
#    - 验证能找到相关示例
```

### 级别 4: 性能验证

```bash
# 构建生产版本
pnpm build                 # 期望: 成功构建，无警告

# 性能检查清单:
# - 首屏加载时间 < 2s
# - 搜索响应时间 < 1s
# - CRUD 操作响应时间 < 500ms
# - 大量数据（1000+ 示例）性能良好
# - 移动端性能可接受

# 使用浏览器 DevTools:
# - Lighthouse 评分 > 90 (Performance)
# - 无内存泄漏
# - 无过度重渲染
```

### 级别 5: 可访问性和兼容性

```bash
# 可访问性检查:
# - 键盘导航工作正常
# - 屏幕阅读器友好（使用 NVDA/JAWS 测试）
# - 文本对比度 ≥ 4.5:1
# - ARIA 标签正确

# 浏览器兼容性:
# - Chrome 最新版
# - Firefox 最新版
# - Safari 最新版
# - Edge 最新版
# - 移动浏览器（iOS Safari, Chrome Mobile）

# 响应式设计:
# - 桌面（1920x1080）
# - 平板（768x1024）
# - 手机（375x667）
```

---

## 最终验证检查清单

在提交代码前，确保以下所有项目都已完成：

### 功能完整性

- [ ] 所有 CRUD 操作正常工作
- [ ] 搜索功能准确且快速
- [ ] 质量评分系统正常运行
- [ ] A/B 测试框架功能完整
- [ ] 效果追踪数据准确
- [ ] 语义搜索功能正常（如已实现）

### 代码质量

- [ ] 所有测试通过: `pnpm test:run`
- [ ] 测试覆盖率 > 80%: `pnpm test:coverage`
- [ ] 没有 lint 错误: `pnpm run lint`
- [ ] 没有类型错误: `pnpm run type-check`
- [ ] 代码符合 CLAUDE.md 规范

### 用户体验

- [ ] 界面友好直观
- [ ] 所有操作有加载状态
- [ ] 错误处理友好
- [ ] 空状态设计良好
- [ ] 移动端适配良好
- [ ] 暗色模式支持

### 性能

- [ ] 首屏加载 < 2s
- [ ] 搜索响应 < 1s
- [ ] 无明显性能瓶颈
- [ ] 大数据集处理良好

### 可访问性

- [ ] 键盘导航完整
- [ ] ARIA 标签正确
- [ ] 屏幕阅读器友好
- [ ] 文本对比度达标

### 文档

- [ ] 代码注释完整
- [ ] API 文档清晰
- [ ] README 包含使用说明
- [ ] JSDoc 注释完整

### 集成

- [ ] 与文档生成器集成正常
- [ ] 不破坏现有功能
- [ ] 首页导航已更新

---

## 伪代码和实现指导

### 存储层实现

```typescript
// src/lib/example-library/storage.ts
// 伪代码 - 展示核心逻辑

import { EnhancedExample, StorageConfig } from './types';
import { v4 as uuidv4 } from 'uuid';

export class ExampleStorage {
  private examples: Map<string, EnhancedExample>;
  private config: StorageConfig;

  constructor(config: StorageConfig = { type: 'memory' }) {
    this.examples = new Map();
    this.config = config;
    // 陷阱: 如果使用 IndexedDB，需要异步初始化
    // 解决方案: 提供 async init() 方法
  }

  /**
   * 创建新示例
   * 模式: 自动生成 ID、时间戳和版本
   */
  async create(
    example: Omit<EnhancedExample, 'id' | 'createdAt' | 'updatedAt' | 'version'>,
  ): Promise<EnhancedExample> {
    // 验证: 使用 Zod 验证输入
    // const validated = EnhancedExampleSchema.parse({...});

    const newExample: EnhancedExample = {
      ...example,
      id: uuidv4(),
      createdAt: new Date(),
      updatedAt: new Date(),
      version: 1,
      tags: example.tags || [],
      analytics: {
        views: 0,
        uses: 0,
        likes: 0,
        dislikes: 0,
      },
    };

    this.examples.set(newExample.id, newExample);

    // 如果配置了持久化，保存到 IndexedDB 或服务器
    // await this.persist(newExample);

    return newExample;
  }

  /**
   * 读取示例
   * 模式: 返回副本，避免外部修改
   */
  async read(id: string): Promise<EnhancedExample | null> {
    const example = this.examples.get(id);
    return example ? { ...example } : null;
  }

  /**
   * 更新示例
   * 模式: 增量更新，保留版本历史
   */
  async update(id: string, updates: Partial<EnhancedExample>): Promise<EnhancedExample> {
    const existing = this.examples.get(id);
    if (!existing) {
      throw new Error(`Example not found: ${id}`);
    }

    const updated: EnhancedExample = {
      ...existing,
      ...updates,
      id: existing.id, // 不允许修改 ID
      createdAt: existing.createdAt, // 不允许修改创建时间
      updatedAt: new Date(),
      version: existing.version + 1,
    };

    this.examples.set(id, updated);
    // await this.persist(updated);

    return { ...updated };
  }

  /**
   * 删除示例
   * 模式: 软删除或硬删除（根据需求）
   */
  async delete(id: string): Promise<boolean> {
    // 关键: 同时删除相关的向量数据
    // await this.deleteVector(id);

    return this.examples.delete(id);
  }

  /**
   * 列出所有示例
   * 模式: 支持分页
   */
  async list(options?: { limit?: number; offset?: number }): Promise<EnhancedExample[]> {
    const all = Array.from(this.examples.values());
    const { limit = 50, offset = 0 } = options || {};

    return all.slice(offset, offset + limit);
  }

  /**
   * 批量操作
   * 性能: 使用 Promise.all 并行处理
   */
  async bulkCreate(
    examples: Array<Omit<EnhancedExample, 'id' | 'createdAt' | 'updatedAt' | 'version'>>,
  ): Promise<EnhancedExample[]> {
    return Promise.all(examples.map((ex) => this.create(ex)));
  }
}
```

### 搜索引擎实现

```typescript
// src/lib/example-library/search.ts
// 伪代码

import { EnhancedExample, SearchOptions, SearchResult, SearchFilters } from './types';
import { ExampleStorage } from './storage';

export class SearchEngine {
  constructor(private storage: ExampleStorage) {}

  /**
   * 执行搜索
   * 模式: 先过滤，再评分，最后排序
   */
  async search(options: SearchOptions): Promise<SearchResult> {
    // 验证: 使用 Zod 验证搜索选项
    // const validated = SearchOptionsSchema.parse(options);

    // 步骤 1: 获取所有候选
    let candidates = await this.storage.list({ limit: 10000 }); // 根据实际情况调整

    // 步骤 2: 应用过滤器
    if (options.filters) {
      candidates = this.applyFilters(candidates, options.filters);
    }

    // 步骤 3: 计算相关性评分
    const scored = this.scoreResults(candidates, options.query);

    // 步骤 4: 排序
    const sorted = this.sortResults(
      scored,
      options.sortBy || 'relevance',
      options.sortOrder || 'desc',
    );

    // 步骤 5: 分页
    const { limit = 20, offset = 0 } = options;
    const paginated = sorted.slice(offset, offset + limit);

    return {
      examples: paginated,
      total: sorted.length,
      page: Math.floor(offset / limit) + 1,
      pageSize: limit,
      hasMore: offset + limit < sorted.length,
    };
  }

  /**
   * 应用过滤器
   * 模式: 链式过滤，每次返回新数组
   */
  private applyFilters(examples: EnhancedExample[], filters: SearchFilters): EnhancedExample[] {
    let result = examples;

    // 语言过滤
    if (filters.languages && filters.languages.length > 0) {
      result = result.filter((ex) => filters.languages!.includes(ex.language || ''));
    }

    // 复杂度过滤
    if (filters.complexities && filters.complexities.length > 0) {
      result = result.filter((ex) =>
        filters.complexities!.includes(ex.complexity || 'intermediate'),
      );
    }

    // 标签过滤（示例必须包含所有指定标签）
    if (filters.tags && filters.tags.length > 0) {
      result = result.filter((ex) => filters.tags!.every((tag) => ex.tags.includes(tag)));
    }

    // 分类过滤
    if (filters.categories && filters.categories.length > 0) {
      result = result.filter((ex) => filters.categories!.includes(ex.category.primary));
    }

    // 质量分数过滤
    if (filters.minQualityScore !== undefined) {
      result = result.filter((ex) => (ex.qualityScore?.overall || 0) >= filters.minQualityScore!);
    }

    // 日期范围过滤
    if (filters.dateRange) {
      const { start, end } = filters.dateRange;
      result = result.filter((ex) => ex.createdAt >= start && ex.createdAt <= end);
    }

    return result;
  }

  /**
   * 计算相关性评分
   * 算法: TF-IDF 简化版或简单的关键词匹配
   */
  private scoreResults(
    examples: EnhancedExample[],
    query: string,
  ): Array<EnhancedExample & { score: number }> {
    // 陷阱: 空查询应返回所有结果，评分基于其他因素
    if (!query.trim()) {
      return examples.map((ex) => ({
        ...ex,
        score: this.calculateDefaultScore(ex),
      }));
    }

    const queryWords = query.toLowerCase().split(/\s+/);

    return examples.map((ex) => {
      let score = 0;

      // 标题匹配（权重最高）
      const topicLower = ex.topic.toLowerCase();
      queryWords.forEach((word) => {
        if (topicLower.includes(word)) {
          score += 10;
        }
      });

      // 文档内容匹配
      const docLower = ex.doc.toLowerCase();
      queryWords.forEach((word) => {
        const matches = (docLower.match(new RegExp(word, 'g')) || []).length;
        score += matches * 2;
      });

      // 标签匹配
      ex.tags.forEach((tag) => {
        const tagLower = tag.toLowerCase();
        if (queryWords.some((word) => tagLower.includes(word))) {
          score += 5;
        }
      });

      // 质量加成
      if (ex.qualityScore) {
        score += ex.qualityScore.overall / 10;
      }

      // 热度加成
      if (ex.analytics) {
        score += Math.log(ex.analytics.views + 1) * 0.5;
        score += Math.log(ex.analytics.uses + 1) * 1.0;
      }

      return { ...ex, score };
    });
  }

  /**
   * 默认评分（无查询时）
   * 基于质量、热度和新鲜度
   */
  private calculateDefaultScore(ex: EnhancedExample): number {
    let score = 0;

    // 质量分
    if (ex.qualityScore) {
      score += ex.qualityScore.overall;
    }

    // 热度分
    if (ex.analytics) {
      score += Math.log(ex.analytics.views + 1) * 2;
      score += Math.log(ex.analytics.uses + 1) * 5;
      score += (ex.analytics.likes - ex.analytics.dislikes) * 0.5;
    }

    // 新鲜度分（最近创建的加分）
    const daysSinceCreation = (Date.now() - ex.createdAt.getTime()) / (1000 * 60 * 60 * 24);
    score += Math.max(0, 10 - daysSinceCreation / 30);

    return score;
  }

  /**
   * 排序结果
   */
  private sortResults(
    examples: Array<EnhancedExample & { score: number }>,
    sortBy: 'relevance' | 'date' | 'rating' | 'views',
    order: 'asc' | 'desc',
  ): Array<EnhancedExample & { score: number }> {
    const sorted = [...examples];

    sorted.sort((a, b) => {
      let comparison = 0;

      switch (sortBy) {
        case 'relevance':
          comparison = a.score - b.score;
          break;
        case 'date':
          comparison = a.createdAt.getTime() - b.createdAt.getTime();
          break;
        case 'rating':
          comparison = (a.qualityScore?.overall || 0) - (b.qualityScore?.overall || 0);
          break;
        case 'views':
          comparison = (a.analytics?.views || 0) - (b.analytics?.views || 0);
          break;
      }

      return order === 'asc' ? comparison : -comparison;
    });

    return sorted;
  }

  /**
   * 语义搜索（集成向量搜索）
   * 关键: 结合关键词搜索和向量搜索
   */
  async semanticSearch(query: string, topK: number = 10): Promise<EnhancedExample[]> {
    // 步骤 1: 生成查询向量
    // const queryVector = await this.embeddings.generateEmbedding(query);

    // 步骤 2: 从向量数据库查询
    // const vectorResults = await this.vectorDB.search(queryVector, topK * 2);

    // 步骤 3: 获取完整示例数据
    // const examples = await Promise.all(
    //   vectorResults.map(r => this.storage.read(r.id))
    // );

    // 步骤 4: 结合关键词搜索结果
    // const keywordResults = await this.search({ query, limit: topK * 2 });

    // 步骤 5: 混合排序（向量相似度 + 关键词相关性）
    // return this.mergeResults(vectorResults, keywordResults, topK);

    // 占位符实现
    return [];
  }
}
```

### 质量评分实现

````typescript
// src/lib/example-library/quality-scorer.ts
// 伪代码

import { EnhancedExample, QualityScore } from './types';

export class QualityScorer {
  /**
   * 计算示例的整体质量评分
   * 模式: 多维度评分加权平均
   */
  async scoreExample(example: EnhancedExample): Promise<QualityScore> {
    // 各维度评分
    const clarity = this.scoreClarity(example);
    const usefulness = await this.scoreUsefulness(example);
    const completeness = this.scoreCompleteness(example);
    const codeQuality = this.scoreCodeQuality(example);

    // 加权平均
    const overall = Math.round(
      clarity * 0.2 + usefulness * 0.3 + completeness * 0.25 + codeQuality * 0.25,
    );

    return {
      overall,
      clarity,
      usefulness,
      completeness,
      codeQuality,
      userRatings: example.qualityScore?.userRatings,
    };
  }

  /**
   * 评分维度 1: 清晰度
   * 基于文档结构、长度和可读性
   */
  private scoreClarity(example: EnhancedExample): number {
    let score = 50; // 基础分

    // 检查文档结构
    const doc = example.doc;
    const hasTitle = /^#\s+/.test(doc);
    const hasSections = (doc.match(/^##\s+/gm) || []).length >= 2;
    const hasCodeBlocks = (doc.match(/```/g) || []).length >= 2;

    if (hasTitle) score += 10;
    if (hasSections) score += 15;
    if (hasCodeBlocks) score += 15;

    // 检查文档长度（太短或太长都扣分）
    const wordCount = doc.split(/\s+/).length;
    if (wordCount < 50) {
      score -= 20;
    } else if (wordCount > 2000) {
      score -= 10;
    } else {
      score += 10;
    }

    return Math.max(0, Math.min(100, score));
  }

  /**
   * 评分维度 2: 实用性
   * 基于用户反馈和使用统计
   */
  private async scoreUsefulness(example: EnhancedExample): Promise<number> {
    let score = 50; // 基础分

    // 用户评分
    if (example.qualityScore?.userRatings && example.qualityScore.userRatings.length > 0) {
      const avgRating =
        example.qualityScore.userRatings.reduce((sum, r) => sum + r.score, 0) /
        example.qualityScore.userRatings.length;
      score += (avgRating - 3) * 20; // 3 星为中性，1-5 星映射到 -40 到 +40
    }

    // 使用统计
    if (example.analytics) {
      const { uses, views } = example.analytics;
      const useRate = views > 0 ? uses / views : 0;
      score += useRate * 30; // 使用率高的示例更实用
    }

    return Math.max(0, Math.min(100, score));
  }

  /**
   * 评分维度 3: 完整性
   * 检查必要元素是否齐全
   */
  private scoreCompleteness(example: EnhancedExample): number {
    let score = 0;

    // 必要字段
    if (example.topic && example.topic.length > 3) score += 10;
    if (example.doc && example.doc.length > 100) score += 15;
    if (example.complexity) score += 10;
    if (example.language) score += 10;
    if (example.tags && example.tags.length > 0) score += 10;

    // 文档内容检查
    const doc = example.doc;
    const hasIntro = /简介|介绍|introduction/i.test(doc);
    const hasExamples = /示例|例子|example/i.test(doc);
    const hasBestPractices = /最佳实践|best practice/i.test(doc);
    const hasCaveats = /注意|陷阱|caveat|pitfall/i.test(doc);

    if (hasIntro) score += 10;
    if (hasExamples) score += 15;
    if (hasBestPractices) score += 10;
    if (hasCaveats) score += 10;

    return Math.max(0, Math.min(100, score));
  }

  /**
   * 评分维度 4: 代码质量
   * 检查代码示例的质量
   */
  private scoreCodeQuality(example: EnhancedExample): number {
    let score = 50; // 基础分

    // 提取代码块
    const codeBlocks = example.doc.match(/```[\s\S]*?```/g) || [];

    if (codeBlocks.length === 0) {
      return 30; // 没有代码示例扣分
    }

    codeBlocks.forEach((block) => {
      const code = block.replace(/```[^\n]*\n|```/g, '');

      // 检查代码长度（适中为好）
      const lines = code.split('\n').length;
      if (lines >= 5 && lines <= 50) {
        score += 5;
      }

      // 检查是否有注释
      if (/\/\/|\/\*|\#/.test(code)) {
        score += 5;
      }

      // 检查是否有错误处理
      if (/try|catch|throw|error/i.test(code)) {
        score += 5;
      }

      // 检查是否有类型注解（TypeScript）
      if (/:\s*(string|number|boolean|any|unknown|void)/.test(code)) {
        score += 5;
      }
    });

    return Math.max(0, Math.min(100, score / codeBlocks.length));
  }

  /**
   * 聚合用户评分
   */
  aggregateUserRatings(userRatings: Array<{ score: number }>): number {
    if (userRatings.length === 0) return 50;

    const total = userRatings.reduce((sum, r) => sum + r.score, 0);
    const avg = total / userRatings.length;

    // 将 1-5 星映射到 0-100
    return (avg / 5) * 100;
  }
}
````

### A/B 测试框架实现

```typescript
// src/lib/example-library/ab-testing.ts
// 伪代码

import { ABTest, ABTestResults, VariantMetrics } from './types';
import { v4 as uuidv4 } from 'uuid';

export class ABTestingFramework {
  private tests: Map<string, ABTest>;
  private assignments: Map<string, 'A' | 'B'>; // userId -> variant

  constructor() {
    this.tests = new Map();
    this.assignments = new Map();
  }

  /**
   * 创建新的 A/B 测试
   */
  createTest(name: string, variantA: string, variantB: string, trafficSplit: number = 0.5): ABTest {
    const test: ABTest = {
      id: uuidv4(),
      name,
      description: '',
      variantA,
      variantB,
      startDate: new Date(),
      trafficSplit,
      status: 'running',
    };

    this.tests.set(test.id, test);
    return test;
  }

  /**
   * 为用户分配变体
   * 模式: 使用一致性哈希，确保同一用户总是看到相同变体
   */
  assignVariant(testId: string, userId: string): 'A' | 'B' {
    // 检查是否已有分配
    const key = `${testId}:${userId}`;
    const existing = this.assignments.get(key);
    if (existing) {
      return existing;
    }

    // 获取测试配置
    const test = this.tests.get(testId);
    if (!test || test.status !== 'running') {
      return 'A'; // 默认返回 A
    }

    // 使用哈希函数确保一致性
    const hash = this.hashString(`${testId}${userId}`);
    const variant: 'A' | 'B' = hash < test.trafficSplit ? 'A' : 'B';

    this.assignments.set(key, variant);
    return variant;
  }

  /**
   * 简单哈希函数
   * 返回 0-1 之间的值
   */
  private hashString(str: string): number {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i);
      hash = (hash << 5) - hash + char;
      hash = hash & hash; // Convert to 32bit integer
    }
    return Math.abs(hash) / 2147483647; // Normalize to 0-1
  }

  /**
   * 记录事件（曝光、点击、转化等）
   */
  trackEvent(
    testId: string,
    userId: string,
    eventType: 'impression' | 'use' | 'rating',
    value?: number,
  ): void {
    const variant = this.assignVariant(testId, userId);

    // 这里应该将事件存储到数据库或分析系统
    // 实际实现中需要持久化存储
    console.log(
      `Event tracked: Test ${testId}, User ${userId}, Variant ${variant}, Event ${eventType}, Value ${value}`,
    );
  }

  /**
   * 计算测试结果
   * 包含统计显著性检验
   */
  async calculateResults(testId: string): Promise<ABTestResults> {
    // 这里是简化的实现
    // 实际需要从数据库查询所有事件数据

    // 假设我们有这些数据
    const variantAMetrics: VariantMetrics = {
      impressions: 1000,
      uses: 150,
      conversionRate: 0.15,
      averageRating: 4.2,
      averageTimeSpent: 120,
    };

    const variantBMetrics: VariantMetrics = {
      impressions: 1000,
      uses: 180,
      conversionRate: 0.18,
      averageRating: 4.5,
      averageTimeSpent: 140,
    };

    // 计算统计显著性（使用 Z-test）
    const { winner, confidence } = this.calculateSignificance(variantAMetrics, variantBMetrics);

    return {
      variantAMetrics,
      variantBMetrics,
      winner,
      confidence,
      sampleSize: variantAMetrics.impressions + variantBMetrics.impressions,
    };
  }

  /**
   * 计算统计显著性
   * 使用 Z-test 比较两个转化率
   */
  private calculateSignificance(
    metricsA: VariantMetrics,
    metricsB: VariantMetrics,
  ): { winner: 'A' | 'B' | 'tie'; confidence: number } {
    const pA = metricsA.conversionRate;
    const pB = metricsB.conversionRate;
    const nA = metricsA.impressions;
    const nB = metricsB.impressions;

    // 合并转化率
    const pPool = (pA * nA + pB * nB) / (nA + nB);

    // 标准误差
    const se = Math.sqrt(pPool * (1 - pPool) * (1 / nA + 1 / nB));

    // Z 分数
    const z = Math.abs(pA - pB) / se;

    // 从 Z 分数计算置信度（简化）
    const confidence = 1 - Math.exp((-z * z) / 2);

    // 判断赢家
    let winner: 'A' | 'B' | 'tie';
    if (confidence > 0.95) {
      winner = pA > pB ? 'A' : 'B';
    } else {
      winner = 'tie';
    }

    return { winner, confidence };
  }

  /**
   * 停止测试
   */
  stopTest(testId: string): void {
    const test = this.tests.get(testId);
    if (test) {
      test.status = 'completed';
      test.endDate = new Date();
    }
  }
}
```

---

## 研究上下文

### 关键库和工具

#### Pinecone 向量数据库

```yaml
library: '@pinecone-database/pinecone'
version: '^2.0.0'
documentation: 'https://docs.pinecone.io/docs/quickstart'
key_features:
  - 托管向量数据库
  - 快速相似度搜索
  - 免费层支持（1 个索引，10K 向量）
  - TypeScript SDK 完善
installation: 'pnpm add @pinecone-database/pinecone'
notes: '需要注册获取 API Key，免费层有限制'
```

#### OpenAI Embeddings

```yaml
library: "openai"
version: "^6.2.0" (已安装)
model: "text-embedding-3-small"
documentation: "https://platform.openai.com/docs/guides/embeddings"
key_features:
  - 文本转向量嵌入
  - 高质量语义表示
  - 支持多语言
  - 成本较低（$0.02 / 1M tokens）
usage_pattern: |
  const response = await openai.embeddings.create({
    model: "text-embedding-3-small",
    input: "Your text here"
  });
  const embedding = response.data[0].embedding; // 1536 维向量
```

#### React Testing Library

```yaml
library: '@testing-library/react'
version: '待安装'
documentation: 'https://testing-library.com/react'
why: '测试 React 组件，模拟用户交互'
installation: 'pnpm add -D @testing-library/react @testing-library/jest-dom'
```

### 现有代码库模式

#### 1. 数据结构扩展

```typescript
// 参考: src/lib/doc-generator/types.ts
// 模式: 扩展现有类型而不是重新定义

// ✅ 好的做法
export interface EnhancedExample extends DocExample {
  // 添加新字段
  id: string;
  createdAt: Date;
  // ...
}

// ❌ 不好的做法
export interface EnhancedExample {
  // 复制所有字段
  topic: string;
  doc: string;
  // ...
}
```

#### 2. 异步操作和错误处理

```typescript
// 参考: src/lib/openai-client.ts (如果存在)
// 模式: 统一的错误处理

// ✅ 好的做法
export async function generateEmbedding(text: string): Promise<number[]> {
  try {
    const response = await openai.embeddings.create({
      model: 'text-embedding-3-small',
      input: text,
    });

    return response.data[0].embedding;
  } catch (error) {
    if (error instanceof OpenAIError) {
      // 处理 OpenAI 特定错误
      console.error('OpenAI API Error:', error.message);
      throw new Error(`Failed to generate embedding: ${error.message}`);
    }
    throw error;
  }
}
```

#### 3. React 组件模式

```typescript
// 参考: src/app/doc-generator/page.tsx
// 模式: 'use client' + hooks + TypeScript

// ✅ 好的做法
'use client';

import { useState, useCallback, useMemo } from 'react';
import type { SearchOptions, SearchResult } from '@/lib/example-library/types';

interface SearchBarProps {
  onSearch: (options: SearchOptions) => void;
  isLoading?: boolean;
}

export default function SearchBar({ onSearch, isLoading = false }: SearchBarProps) {
  const [query, setQuery] = useState('');

  const handleSearch = useCallback(() => {
    if (query.trim()) {
      onSearch({ query: query.trim() });
    }
  }, [query, onSearch]);

  return (
    <div className="flex gap-2">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
        className="flex-1 px-4 py-2 border rounded-lg"
        placeholder="搜索示例..."
        disabled={isLoading}
      />
      <button
        onClick={handleSearch}
        disabled={isLoading || !query.trim()}
        className="px-6 py-2 bg-blue-500 text-white rounded-lg disabled:opacity-50"
      >
        {isLoading ? '搜索中...' : '搜索'}
      </button>
    </div>
  );
}
```

#### 4. 测试模式

```typescript
// 参考: src/lib/prp/__tests__/generator.test.ts
// 模式: describe + it + expect

import { describe, it, expect, beforeEach, vi } from 'vitest';
import { ExampleStorage } from '../storage';
import type { EnhancedExample } from '../types';

describe('ExampleStorage', () => {
  let storage: ExampleStorage;
  let mockExample: Omit<EnhancedExample, 'id' | 'createdAt' | 'updatedAt' | 'version'>;

  beforeEach(() => {
    storage = new ExampleStorage({ type: 'memory' });
    mockExample = {
      topic: 'Test Topic',
      doc: 'Test documentation content',
      complexity: 'intermediate',
      language: 'typescript',
      tags: ['test', 'example'],
      category: {
        primary: 'Testing',
        secondary: 'Unit Tests',
      },
    };
  });

  describe('create', () => {
    it('should create new example with generated id', async () => {
      const created = await storage.create(mockExample);

      expect(created.id).toBeDefined();
      expect(created.topic).toBe(mockExample.topic);
      expect(created.version).toBe(1);
    });

    it('should initialize analytics with zero values', async () => {
      const created = await storage.create(mockExample);

      expect(created.analytics).toEqual({
        views: 0,
        uses: 0,
        likes: 0,
        dislikes: 0,
      });
    });
  });

  describe('read', () => {
    it('should return example by id', async () => {
      const created = await storage.create(mockExample);
      const read = await storage.read(created.id);

      expect(read).toEqual(created);
    });

    it('should return null for non-existent id', async () => {
      const read = await storage.read('non-existent-id');

      expect(read).toBeNull();
    });
  });

  // 更多测试...
});
```

---

## 已知陷阱和解决方案（详细）

### 陷阱 1: 向量数据库同步问题

**问题**: 示例数据更新后，向量数据可能不同步

**解决方案**:

```typescript
// 在更新示例时，同时更新向量
async update(id: string, updates: Partial<EnhancedExample>): Promise<EnhancedExample> {
  const updated = await this.storage.update(id, updates);

  // 如果内容发生变化，重新生成向量
  if (updates.doc || updates.topic) {
    const embedding = await this.embeddings.generateEmbedding(
      `${updated.topic} ${updated.doc}`
    );
    await this.vectorDB.upsert(id, embedding, { ...updated });
  }

  return updated;
}
```

### 陷阱 2: 大量示例导致性能问题

**问题**: 一次性加载所有示例会导致页面卡顿

**解决方案**:

```typescript
// 使用虚拟滚动或分页加载
// 推荐库: react-window 或 react-virtual

import { useVirtualizer } from '@tanstack/react-virtual';

function ExampleList({ examples }: { examples: EnhancedExample[] }) {
  const parentRef = useRef<HTMLDivElement>(null);

  const virtualizer = useVirtualizer({
    count: examples.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 200, // 估计每个项目的高度
    overscan: 5, // 预渲染额外的项目
  });

  return (
    <div ref={parentRef} style={{ height: '600px', overflow: 'auto' }}>
      <div style={{ height: `${virtualizer.getTotalSize()}px`, position: 'relative' }}>
        {virtualizer.getVirtualItems().map((virtualRow) => (
          <div
            key={virtualRow.index}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              transform: `translateY(${virtualRow.start}px)`,
            }}
          >
            <ExampleCard example={examples[virtualRow.index]} />
          </div>
        ))}
      </div>
    </div>
  );
}
```

### 陷阱 3: 搜索性能问题

**问题**: 复杂搜索和过滤操作耗时过长

**解决方案**:

```typescript
// 使用 Web Worker 处理搜索
// src/lib/example-library/search-worker.ts

// 在 Worker 中执行搜索
self.addEventListener('message', async (e) => {
  const { query, examples, filters } = e.data;

  // 执行搜索逻辑
  const results = performSearch(query, examples, filters);

  self.postMessage(results);
});

// 在主线程中使用
const searchWorker = new Worker(new URL('./search-worker.ts', import.meta.url));

searchWorker.postMessage({ query, examples, filters });
searchWorker.onmessage = (e) => {
  setSearchResults(e.data);
};
```

### 陷阱 4: IndexedDB 存储限制

**问题**: 浏览器 IndexedDB 有存储限制（通常 50-100MB）

**解决方案**:

```typescript
// 实现存储清理策略
class ExampleStorage {
  private async cleanupOldData(): Promise<void> {
    const storageEstimate = await navigator.storage.estimate();
    const usagePercent = (storageEstimate.usage || 0) / (storageEstimate.quota || 1);

    if (usagePercent > 0.8) {
      // 删除最旧的或最少使用的示例
      const examples = await this.list();
      const sorted = examples.sort((a, b) => {
        const scoreA = (a.analytics?.views || 0) + a.createdAt.getTime() / 1000000;
        const scoreB = (b.analytics?.views || 0) + b.createdAt.getTime() / 1000000;
        return scoreA - scoreB;
      });

      // 删除底部 20%
      const toDelete = sorted.slice(0, Math.floor(sorted.length * 0.2));
      for (const example of toDelete) {
        await this.delete(example.id);
      }
    }
  }
}
```

### 陷阱 5: 向量搜索冷启动慢

**问题**: 首次生成向量时需要调用 API，速度慢

**解决方案**:

```typescript
// 预生成常见查询的向量缓存
const COMMON_QUERIES = [
  'React hooks',
  'TypeScript types',
  'async await',
  'API integration',
  // ...
];

async function preloadQueryEmbeddings(): Promise<void> {
  const cache = new Map<string, number[]>();

  for (const query of COMMON_QUERIES) {
    const embedding = await generateEmbedding(query);
    cache.set(query, embedding);
  }

  // 存储到 localStorage 或 IndexedDB
  localStorage.setItem('query_embeddings_cache', JSON.stringify(Array.from(cache.entries())));
}

// 在应用启动时调用
useEffect(() => {
  preloadQueryEmbeddings();
}, []);
```

---

## 要避免的反模式

### ❌ 反模式 1: 在组件内部定义对象

```typescript
// ❌ 错误
function ExampleCard() {
  const style = { padding: '1rem' }; // 每次渲染都创建新对象
  return <div style={style}>...</div>;
}

// ✅ 正确
const cardStyle = { padding: '1rem' }; // 组件外定义

function ExampleCard() {
  return <div style={cardStyle}>...</div>;
}

// 或使用 useMemo
function ExampleCard() {
  const style = useMemo(() => ({ padding: '1rem' }), []);
  return <div style={style}>...</div>;
}
```

### ❌ 反模式 2: 过度使用 any

```typescript
// ❌ 错误
function processExample(data: any): any {
  return data.something;
}

// ✅ 正确
function processExample(data: EnhancedExample): Partial<EnhancedExample> {
  return {
    id: data.id,
    topic: data.topic,
  };
}
```

### ❌ 反模式 3: 忽略错误处理

```typescript
// ❌ 错误
async function fetchExamples() {
  const response = await api.getExamples();
  return response.data;
}

// ✅ 正确
async function fetchExamples(): Promise<EnhancedExample[]> {
  try {
    const response = await api.getExamples();
    return response.data;
  } catch (error) {
    if (error instanceof NetworkError) {
      console.error('Network error fetching examples:', error);
      throw new Error('无法连接到服务器，请检查网络连接');
    }
    if (error instanceof ValidationError) {
      console.error('Invalid data received:', error);
      throw new Error('接收到无效数据');
    }
    throw error;
  }
}
```

### ❌ 反模式 4: 不使用 useCallback 导致子组件重渲染

```typescript
// ❌ 错误
function ParentComponent() {
  const [query, setQuery] = useState('');

  const handleSearch = (newQuery: string) => {
    // 每次渲染都创建新函数
    setQuery(newQuery);
  };

  return <SearchBar onSearch={handleSearch} />;
}

// ✅ 正确
function ParentComponent() {
  const [query, setQuery] = useState('');

  const handleSearch = useCallback((newQuery: string) => {
    setQuery(newQuery);
  }, []); // 函数引用保持不变

  return <SearchBar onSearch={handleSearch} />;
}
```

---

## 实施信心评分

**评分**: 🟢 **8/10** (高信心)

### 评分理由

**优势** ✅:

1. **完整的上下文**: 提供了所有必要的文档链接、代码示例和陷阱解决方案
2. **参考现有模式**: 基于代码库中已验证的实现模式
3. **详细的伪代码**: 核心功能都有清晰的实现指导
4. **完整的测试策略**: 包含单元测试、集成测试和性能测试
5. **清晰的任务分解**: 12 天的详细实施计划，任务依赖关系明确
6. **已知陷阱处理**: 列出了所有关键陷阱和具体解决方案

**潜在挑战** ⚠️:

1. **向量数据库集成**: Pinecone 需要注册和配置，可能遇到 API 限制问题（已提供解决方案）
2. **A/B 测试复杂度**: 统计显著性计算可能需要调整（已提供基础实现）

**建议**:

- 首先实现核心 CRUD 和搜索功能，验证通过后再添加高级特性
- 向量搜索可以作为可选功能，初期使用关键词搜索
- A/B 测试可以简化为简单的流量分配和指标收集

---

## 额外资源

### 推荐阅读

```yaml
- title: 'Vector Search Best Practices'
  url: 'https://www.pinecone.io/learn/vector-search/'
  why: '了解向量搜索的最佳实践'

- title: 'A/B Testing Statistics'
  url: 'https://www.optimizely.com/optimization-glossary/ab-testing/'
  why: '理解 A/B 测试的统计学基础'

- title: 'React Performance Optimization'
  url: 'https://react.dev/learn/render-and-commit'
  why: '优化 React 应用性能'

- title: 'TypeScript Deep Dive'
  url: 'https://basarat.gitbook.io/typescript/'
  why: '深入理解 TypeScript 类型系统'
```

### 工具和库

```yaml
必需:
  - zod: "运行时类型验证"
  - uuid: "生成唯一 ID"

推荐:
  - @tanstack/react-virtual: "虚拟滚动，处理大列表"
  - date-fns: "日期处理"
  - lodash-es: "工具函数（按需导入）"

可选:
  - @pinecone-database/pinecone: "向量数据库"
  - dexie: "IndexedDB 封装（更易用）"
  - chart.js 或 recharts: "图表库（分析仪表板）"
```

---

## 总结

这个 PRP 提供了构建可复用示例管理系统的完整指南，包含：

1. **清晰的目标和业务价值**: 理解为什么要构建这个系统
2. **完整的类型定义**: 所有数据结构都已定义
3. **详细的实施计划**: 12 天分 8 个阶段的任务清单
4. **核心功能伪代码**: 存储、搜索、评分、A/B 测试的实现指导
5. **全面的测试策略**: 从单元测试到性能测试
6. **已知陷阱和解决方案**: 预防常见问题
7. **参考现有代码模式**: 保持代码一致性

通过遵循这个 PRP，开发者应该能够在 **2 周内** 实现一个功能完整的示例管理系统，测试覆盖率达到 80% 以上，性能和用户体验都符合标准。

**下一步**: 按照任务清单开始实施，从阶段 1 的类型定义和存储层开始。
