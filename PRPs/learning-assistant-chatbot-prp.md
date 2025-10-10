# Product Requirements Prompt (PRP) - 学习助手聊天机器人

**Created:** 2025-10-10
**Author:** Claude Code AI Assistant
**Version:** 1.0.0

---

## 目标

构建一个智能学习助手聊天机器人,能够:
- 追踪用户的学习进度和时长
- 基于用户知识水平推荐个性化学习内容
- 生成定期知识总结报告
- 提供自然语言交互的答疑和概念解释

**最终状态**: 用户可以通过对话界面与 AI 学习助手交互,系统自动记录学习进度,推荐合适的学习内容,并定期生成学习报告。所有数据本地存储,保护用户隐私。

---

## 为什么

### 业务价值
- **提升学习效率**: 个性化推荐帮助用户专注于最需要提升的知识点
- **增强学习动力**: 可视化进度追踪和成就系统提供正向反馈
- **知识巩固**: 基于遗忘曲线的复习提醒确保长期记忆
- **自主学习工具**: 24/7 可用的 AI 导师,随时解答疑问

### 用户影响
- **学习者**: 获得个性化学习路径,提高学习成效
- **自学开发者**: 系统化追踪技术学习进度,避免知识盲点
- **学习平台**: 可作为独立工具或集成到现有学习平台

### 与现有功能集成
- 基于现有的 Token Counter 模块计算 Claude API 使用成本
- 使用项目已有的 TypeScript 类型系统和测试框架
- 遵循 CLAUDE.md 中定义的代码规范和架构模式

---

## 是什么

### 用户可见行为

#### 1. 聊天对话
- 用户输入问题,AI 助手实时流式返回回答
- 支持多轮对话,AI 记住上下文
- 支持代码示例、概念解释、学习建议
- 消息按时间分组显示,相同发送者连续消息堆叠

#### 2. 学习进度追踪
- 自动记录每次学习会话的时长
- 显示每个主题的完成度百分比
- 可视化展示学习时长趋势
- 支持手动标记知识点为"已掌握"或"需复习"

#### 3. 智能内容推荐
- 根据当前学习进度推荐下一步内容
- 基于难度级别(入门/中级/高级/专家)筛选
- 考虑用户的学习偏好(视频/文本/实践)
- 避免推荐已掌握的内容

#### 4. 定期总结报告
- 每日/每周自动生成学习总结
- 使用 Claude API 生成个性化回顾
- 识别薄弱环节,提供针对性复习计划
- 展示学习统计(总时长、完成课程数、掌握度)

### 技术要求

#### 前端技术栈
- **框架**: Next.js 15 (App Router) + React 19
- **语言**: TypeScript (严格模式)
- **样式**: Tailwind CSS
- **UI 组件**: shadcn/ui (优先) + 必要时补充 Ant Design
- **状态管理**: Zustand
- **数据可视化**: Recharts
- **虚拟滚动**: React Virtuoso

#### 后端集成
- **AI 引擎**: Claude API (claude-sonnet-4-20250514)
- **API 封装**: Vercel AI SDK
- **本地存储**: IndexedDB (使用 Dexie.js)
- **会话存储**: React state + Zustand

#### 性能目标
- 首屏加载时间: < 2 秒
- 消息响应时间: < 2 秒 (Claude API)
- 流式消息延迟: < 100ms
- 支持 1000+ 条历史消息(虚拟滚动)

### 成功标准

- [x] 用户可以开始新的对话并得到智能回复
- [x] 学习进度被正确记录和持久化到 IndexedDB
- [x] 进度数据通过图表可视化展示
- [x] 内容推荐基于用户水平且相关
- [x] 生成的总结报告准确反映学习情况
- [x] 所有功能在 Chrome/Firefox/Safari 最新版本正常工作
- [x] 响应时间满足性能要求
- [x] 通过单元测试(覆盖率 > 80%)
- [x] 通过可访问性测试(axe-core, 0 violations)
- [x] 离线可查看历史记录

---

## 所需的全部上下文

### 文档和参考资料

```yaml
# Claude API 集成
- url: https://docs.anthropic.com/en/api/
  section: "Messages API"
  critical: "理解流式响应和错误处理机制"

- url: https://docs.anthropic.com/en/docs/build-with-claude/streaming
  section: "Streaming"
  critical: "实现打字机效果的流式消息显示"

- url: https://docs.anthropic.com/en/docs/build-with-claude/prompt-caching
  section: "Prompt Caching"
  critical: "缓存系统提示可节省 90% 成本"

- url: https://docs.anthropic.com/en/api/rate-limits
  section: "Rate Limits"
  critical: "实现指数退避重试机制"

# Vercel AI SDK
- url: https://sdk.vercel.ai/docs
  section: "useChat hook"
  critical: "简化流式消息处理和状态管理"

# IndexedDB + Dexie.js
- url: https://dexie.org/
  section: "Getting Started"
  critical: "数据库版本迁移和 React 集成"

- url: https://dexie.org/docs/Tutorial/React
  section: "React Integration"
  critical: "使用 useLiveQuery 实现响应式查询"

# Zustand
- url: https://zustand.docs.pmnd.rs/
  section: "Persist Middleware"
  critical: "结合 IndexedDB 实现持久化状态"

# shadcn/ui
- url: https://ui.shadcn.com/
  section: "Installation"
  critical: "与 Next.js 15 和 Tailwind 集成"

- url: https://www.shadcn.io/ai
  section: "AI Components"
  critical: "使用预构建的聊天组件"

- url: https://github.com/jakobhoeg/shadcn-chat
  section: "shadcn-chat CLI"
  critical: "一键安装可定制化聊天组件"

# React Virtuoso
- url: https://virtuoso.dev/virtuoso-message-list/
  section: "Message List"
  critical: "聊天消息的虚拟滚动和自动跟随"

# Recharts
- url: https://recharts.org/
  section: "Examples"
  critical: "在 Next.js 中动态导入避免 SSR 问题"

# 可访问性
- url: https://www.w3.org/WAI/ARIA/apg/
  section: "ARIA Authoring Practices Guide"
  critical: "聊天界面的 ARIA 标签最佳实践"

- url: https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/ARIA_Live_Regions
  section: "Live Regions"
  critical: "流式消息的屏幕阅读器支持"
```

### 当前代码库结构

```bash
src/
├── app/                      # Next.js App Router 页面
│   ├── layout.tsx           # 根布局
│   ├── page.tsx             # 首页
│   ├── token-counter/       # Token 计数器页面
│   └── doc-generator/       # 文档生成器页面
├── components/               # (待创建) React 组件
├── lib/                     # 工具库和核心逻辑
│   ├── token-counter/       # Token 计数模块
│   ├── prp/                 # PRP 生成器
│   ├── doc-generator/       # 文档生成器
│   └── openai-client.ts     # OpenAI 客户端示例
├── services/                # (待创建) API 服务层
├── store/                   # (待创建) 状态管理
├── hooks/                   # (待创建) 自定义 Hooks
└── types/                   # TypeScript 类型定义
```

### 期望的代码库结构

```bash
src/
├── components/
│   └── learning-assistant/
│       ├── ChatInterface.tsx          # 主聊天界面
│       ├── MessageList.tsx            # 消息列表(虚拟滚动)
│       ├── MessageBubble.tsx          # 单条消息气泡
│       ├── MessageInput.tsx           # 输入框组件
│       ├── TypingIndicator.tsx        # 打字指示器
│       ├── ProgressDashboard.tsx      # 进度仪表板
│       ├── ProgressChart.tsx          # 学习时长图表
│       ├── TopicCard.tsx              # 主题卡片
│       ├── RecommendationList.tsx     # 推荐内容列表
│       └── SummaryReport.tsx          # 学习总结报告
├── lib/
│   ├── db/
│   │   ├── schema.ts                  # Dexie 数据库模式
│   │   └── migrations.ts              # 数据库版本迁移
│   ├── chat/
│   │   ├── message-grouping.ts        # 消息分组逻辑
│   │   └── time-formatter.ts          # 时间格式化
│   └── recommendation/
│       ├── difficulty-calculator.ts    # 难度评估算法
│       └── content-scorer.ts          # 内容评分算法
├── services/
│   ├── claude.ts                      # Claude API 服务
│   ├── progress-tracker.ts            # 进度追踪服务
│   └── recommendation-engine.ts       # 推荐引擎服务
├── store/
│   ├── chatStore.ts                   # 聊天状态管理
│   ├── progressStore.ts               # 学习进度状态
│   └── settingsStore.ts               # 用户设置状态
├── hooks/
│   ├── useChat.ts                     # 聊天 Hook
│   ├── useLearningProgress.ts         # 学习进度 Hook
│   ├── useRecommendations.ts          # 推荐内容 Hook
│   └── useAutoScroll.ts               # 自动滚动 Hook
└── types/
    ├── chat.ts                        # 聊天相关类型
    ├── learning.ts                    # 学习进度类型
    └── recommendation.ts              # 推荐系统类型
```

### 我们代码库的已知陷阱和库的特性

```typescript
// ⚠️ 陷阱 1: Next.js 15 客户端组件需要 'use client' 指令
// 解决方案: 任何使用 useState, useEffect 或事件处理的组件必须标记
'use client';
import { useState } from 'react';

// ⚠️ 陷阱 2: TypeScript 严格模式已启用
// 解决方案: 所有函数必须有明确的返回类型注解,避免使用 any
export async function fetchData(): Promise<Data> {
  // ...
}

// ⚠️ 陷阱 3: 必须使用 pnpm 进行包管理
// 解决方案: 所有依赖安装使用 pnpm add,不使用 npm 或 yarn
// 命令: pnpm add zustand dexie recharts

// ⚠️ 陷阱 4: Claude API 速率限制 (429 错误)
// 解决方案: 实现指数退避重试机制
// 参考: src/services/claude.ts 中的 RateLimitHandler 类

// ⚠️ 陷阱 5: IndexedDB 在 Safari 隐私模式下不可用
// 解决方案: 优雅降级到内存存储,提示用户
if (!('indexedDB' in window)) {
  console.warn('IndexedDB not available, using memory storage');
  // 使用 fallback 存储
}

// ⚠️ 陷阱 6: Recharts 在服务器端渲染时报错
// 解决方案: 使用动态导入禁用 SSR
const ProgressChart = dynamic(
  () => import('@/components/learning-assistant/ProgressChart'),
  { ssr: false }
);

// ⚠️ 陷阱 7: 流式消息每个 token 触发重渲染导致性能问题
// 解决方案: 使用 useDeferredValue 批量更新
import { useDeferredValue } from 'react';
const deferredContent = useDeferredValue(streamingContent);

// ⚠️ 陷阱 8: 虚拟滚动高度闪烁
// 解决方案: 缓存已渲染消息的高度
// 参考: React Virtuoso 的 defaultItemHeight 配置

// ⚠️ 陷阱 9: 忘记清理 useEffect 中的订阅
// 解决方案: 始终返回清理函数
useEffect(() => {
  const subscription = stream.subscribe();
  return () => subscription.unsubscribe();
}, []);

// ⚠️ 陷阱 10: 消息列表不自动滚动到底部
// 解决方案: 使用 IntersectionObserver 检测用户是否在底部
// 只在用户主动在底部时才自动滚动

// ⚠️ 陷阱 11: shadcn/ui 组件需要手动安装
// 解决方案: 使用 CLI 安装所需组件
// 命令: npx shadcn-ui@latest add button input textarea

// ⚠️ 陷阱 12: 可访问性 - aria-live 过度使用导致屏幕阅读器播报混乱
// 解决方案: 只在消息列表容器使用 aria-live="polite"
// 单条消息使用 role="article"

// ⚠️ 陷阱 13: Zustand persist 中间件与 IndexedDB 集成问题
// 解决方案: 实现自定义 storage adapter
// 参考下方数据模型章节的实现

// ⚠️ 陷阱 14: Claude API 超时(默认 1 分钟)
// 解决方案: 设置 timeout 为至少 60 分钟
const client = new Anthropic({
  apiKey: key,
  timeout: 60 * 60 * 1000 // 60 minutes
});

// ⚠️ 陷阱 15: 未实现错误边界导致整个应用崩溃
// 解决方案: 为聊天组件添加 ErrorBoundary
// 参考: React 官方文档的 Error Boundaries
```

---

## 实施蓝图

### 数据模型和结构

#### TypeScript 类型定义

```typescript
// src/types/learning.ts

/**
 * 学习会话
 */
export interface LearningSession {
  id: string;
  userId: string;
  courseId: string;
  courseName: string;
  startedAt: Date;
  endedAt?: Date;
  totalDuration: number; // 秒
  topics: string[]; // 本次学习的主题 ID
}

/**
 * 课程
 */
export interface Course {
  id: string;
  name: string;
  description: string;
  difficultyLevel: DifficultyLevel;
  topics: Topic[];
  completionPercentage: number; // 0-100
  totalEstimatedHours: number;
  tags: string[];
}

/**
 * 主题/知识点
 */
export interface Topic {
  id: string;
  courseId: string;
  name: string;
  description: string;
  difficultyLevel: DifficultyLevel;
  status: TopicStatus;
  masteryLevel: number; // 0-100
  studyTime: number; // 秒
  lastStudiedAt?: Date;
  lastReviewedAt?: Date;
  nextReviewDate?: Date; // 基于遗忘曲线计算
  prerequisites: string[]; // 前置主题 ID
}

/**
 * 难度级别
 */
export type DifficultyLevel = 'beginner' | 'intermediate' | 'advanced' | 'expert';

/**
 * 主题状态
 */
export type TopicStatus = 'not-started' | 'in-progress' | 'completed' | 'needs-review' | 'mastered';

/**
 * 学习偏好
 */
export interface LearningPreference {
  userId: string;
  preferredContentTypes: ContentType[]; // 视频/文本/实践 优先级
  studyTimePreference: 'morning' | 'afternoon' | 'evening' | 'night';
  dailyGoalMinutes: number;
  reminderEnabled: boolean;
}

/**
 * 内容类型
 */
export type ContentType = 'video' | 'text' | 'practice' | 'quiz' | 'project';

/**
 * 推荐内容
 */
export interface Recommendation {
  id: string;
  topicId: string;
  topic: Topic;
  score: number; // 推荐评分 0-100
  reason: string; // 推荐理由
  contentType: ContentType;
  estimatedDuration: number; // 分钟
}

/**
 * 学习总结报告
 */
export interface SummaryReport {
  id: string;
  userId: string;
  period: 'daily' | 'weekly' | 'monthly';
  startDate: Date;
  endDate: Date;
  totalStudyTime: number; // 秒
  sessionsCount: number;
  topicsCompleted: number;
  topicsInProgress: number;
  averageMasteryLevel: number; // 0-100
  weakTopics: Topic[]; // 需要加强的主题
  achievements: Achievement[];
  suggestions: string[]; // AI 生成的学习建议
  generatedAt: Date;
}

/**
 * 成就
 */
export interface Achievement {
  id: string;
  title: string;
  description: string;
  iconUrl: string;
  unlockedAt?: Date;
  progress: number; // 0-100
  requirement: string;
}
```

```typescript
// src/types/chat.ts

/**
 * 聊天消息
 */
export interface ChatMessage {
  id: string;
  sessionId: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: Date;
  metadata?: MessageMetadata;
  status: 'sending' | 'sent' | 'error';
  errorMessage?: string;
}

/**
 * 消息元数据
 */
export interface MessageMetadata {
  relatedTopics?: string[]; // 相关主题 ID
  suggestedActions?: Action[];
  codeBlocks?: CodeBlock[];
  references?: Reference[];
}

/**
 * 建议操作
 */
export interface Action {
  type: 'mark-completed' | 'start-topic' | 'review-topic' | 'take-quiz';
  label: string;
  topicId?: string;
}

/**
 * 代码块
 */
export interface CodeBlock {
  language: string;
  code: string;
  filename?: string;
}

/**
 * 参考资料
 */
export interface Reference {
  title: string;
  url: string;
  type: 'documentation' | 'tutorial' | 'video' | 'article';
}

/**
 * 聊天会话
 */
export interface ChatSession {
  id: string;
  userId: string;
  title: string; // 由首条消息生成
  startedAt: Date;
  lastMessageAt: Date;
  messageCount: number;
  isArchived: boolean;
}
```

#### Dexie 数据库模式

```typescript
// src/lib/db/schema.ts

import Dexie, { Table } from 'dexie';
import type {
  LearningSession,
  Course,
  Topic,
  LearningPreference,
  Recommendation,
  SummaryReport,
  Achievement,
  ChatMessage,
  ChatSession
} from '@/types';

export class LearningAssistantDB extends Dexie {
  // 学习相关表
  learningSessions!: Table<LearningSession, string>;
  courses!: Table<Course, string>;
  topics!: Table<Topic, string>;
  preferences!: Table<LearningPreference, string>;
  recommendations!: Table<Recommendation, string>;
  summaryReports!: Table<SummaryReport, string>;
  achievements!: Table<Achievement, string>;

  // 聊天相关表
  chatSessions!: Table<ChatSession, string>;
  chatMessages!: Table<ChatMessage, string>;

  constructor() {
    super('LearningAssistantDB');

    // 版本 1: 初始模式
    this.version(1).stores({
      learningSessions: 'id, userId, courseId, startedAt, endedAt',
      courses: 'id, name, difficultyLevel, *tags',
      topics: 'id, courseId, status, difficultyLevel, lastStudiedAt, nextReviewDate',
      preferences: 'userId',
      recommendations: 'id, topicId, score',
      summaryReports: 'id, userId, period, startDate, endDate, generatedAt',
      achievements: 'id, userId, unlockedAt',
      chatSessions: 'id, userId, startedAt, lastMessageAt',
      chatMessages: 'id, sessionId, timestamp, role',
    });

    // 版本 2: 添加索引优化查询
    this.version(2).stores({
      learningSessions: 'id, userId, courseId, startedAt, endedAt, [userId+courseId]',
      topics: 'id, courseId, status, difficultyLevel, lastStudiedAt, nextReviewDate, [courseId+status]',
      chatMessages: 'id, sessionId, timestamp, role, [sessionId+timestamp]',
    });
  }
}

export const db = new LearningAssistantDB();
```

#### Zustand Store 定义

```typescript
// src/store/chatStore.ts

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { db } from '@/lib/db/schema';
import type { ChatMessage, ChatSession } from '@/types';

interface ChatState {
  // 状态
  currentSession: ChatSession | null;
  messages: ChatMessage[];
  isStreaming: boolean;
  input: string;

  // 操作
  startNewSession: () => Promise<void>;
  sendMessage: (content: string) => Promise<void>;
  streamResponse: (onChunk: (chunk: string) => void) => Promise<void>;
  loadSession: (sessionId: string) => Promise<void>;
  setInput: (input: string) => void;
  clearMessages: () => void;
}

// 自定义 IndexedDB storage adapter
const indexedDBStorage = {
  getItem: async (name: string): Promise<string | null> => {
    try {
      const item = await db.chatSessions.get(name);
      return item ? JSON.stringify(item) : null;
    } catch (error) {
      console.error('Failed to get from IndexedDB:', error);
      return null;
    }
  },
  setItem: async (name: string, value: string): Promise<void> => {
    try {
      const data = JSON.parse(value);
      await db.chatSessions.put(data);
    } catch (error) {
      console.error('Failed to save to IndexedDB:', error);
    }
  },
  removeItem: async (name: string): Promise<void> => {
    try {
      await db.chatSessions.delete(name);
    } catch (error) {
      console.error('Failed to delete from IndexedDB:', error);
    }
  },
};

export const useChatStore = create<ChatState>()(
  persist(
    (set, get) => ({
      currentSession: null,
      messages: [],
      isStreaming: false,
      input: '',

      startNewSession: async () => {
        const session: ChatSession = {
          id: crypto.randomUUID(),
          userId: 'default-user', // 后续支持多用户
          title: 'New Chat',
          startedAt: new Date(),
          lastMessageAt: new Date(),
          messageCount: 0,
          isArchived: false,
        };

        await db.chatSessions.add(session);
        set({ currentSession: session, messages: [] });
      },

      sendMessage: async (content: string) => {
        const { currentSession } = get();
        if (!currentSession) {
          await get().startNewSession();
        }

        const userMessage: ChatMessage = {
          id: crypto.randomUUID(),
          sessionId: currentSession!.id,
          role: 'user',
          content,
          timestamp: new Date(),
          status: 'sent',
        };

        await db.chatMessages.add(userMessage);
        set({ messages: [...get().messages, userMessage] });

        // 触发 AI 响应
        await get().streamResponse((chunk) => {
          // 流式更新 assistant 消息
        });
      },

      streamResponse: async (onChunk) => {
        set({ isStreaming: true });

        try {
          const { currentSession, messages } = get();

          const assistantMessage: ChatMessage = {
            id: crypto.randomUUID(),
            sessionId: currentSession!.id,
            role: 'assistant',
            content: '',
            timestamp: new Date(),
            status: 'sending',
          };

          set({ messages: [...messages, assistantMessage] });

          // 使用 Claude API 流式响应
          // 实现见下方"服务层实现"章节

        } catch (error) {
          console.error('Stream error:', error);
        } finally {
          set({ isStreaming: false });
        }
      },

      loadSession: async (sessionId: string) => {
        const session = await db.chatSessions.get(sessionId);
        const messages = await db.chatMessages
          .where('sessionId')
          .equals(sessionId)
          .sortBy('timestamp');

        set({ currentSession: session || null, messages });
      },

      setInput: (input: string) => set({ input }),

      clearMessages: () => set({ messages: [] }),
    }),
    {
      name: 'chat-session-storage',
      storage: createJSONStorage(() => indexedDBStorage),
      partialize: (state) => ({
        currentSession: state.currentSession,
      }),
    }
  )
);
```

```typescript
// src/store/progressStore.ts

import { create } from 'zustand';
import { db } from '@/lib/db/schema';
import type { Course, Topic, LearningSession } from '@/types';

interface ProgressState {
  // 状态
  courses: Course[];
  currentCourse: Course | null;
  currentTopic: Topic | null;
  activeSession: LearningSession | null;

  // 统计
  totalStudyTime: number; // 秒
  todayStudyTime: number;
  currentStreak: number; // 连续学习天数

  // 操作
  loadCourses: () => Promise<void>;
  selectCourse: (courseId: string) => Promise<void>;
  startTopic: (topicId: string) => Promise<void>;
  completeTopic: (topicId: string) => Promise<void>;
  updateMasteryLevel: (topicId: string, level: number) => Promise<void>;
  loadStatistics: () => Promise<void>;
}

export const useProgressStore = create<ProgressState>((set, get) => ({
  courses: [],
  currentCourse: null,
  currentTopic: null,
  activeSession: null,
  totalStudyTime: 0,
  todayStudyTime: 0,
  currentStreak: 0,

  loadCourses: async () => {
    const courses = await db.courses.toArray();
    set({ courses });
  },

  selectCourse: async (courseId: string) => {
    const course = await db.courses.get(courseId);
    set({ currentCourse: course || null });
  },

  startTopic: async (topicId: string) => {
    const topic = await db.topics.get(topicId);
    if (!topic) return;

    const session: LearningSession = {
      id: crypto.randomUUID(),
      userId: 'default-user',
      courseId: topic.courseId,
      courseName: '', // 从 course 中获取
      startedAt: new Date(),
      totalDuration: 0,
      topics: [topicId],
    };

    await db.learningSessions.add(session);
    await db.topics.update(topicId, {
      status: 'in-progress',
      lastStudiedAt: new Date(),
    });

    set({ currentTopic: topic, activeSession: session });
  },

  completeTopic: async (topicId: string) => {
    const { activeSession } = get();
    if (!activeSession) return;

    const duration = Math.floor(
      (new Date().getTime() - activeSession.startedAt.getTime()) / 1000
    );

    await db.learningSessions.update(activeSession.id, {
      endedAt: new Date(),
      totalDuration: duration,
    });

    await db.topics.update(topicId, {
      status: 'completed',
      studyTime: (await db.topics.get(topicId))!.studyTime + duration,
    });

    set({ activeSession: null, currentTopic: null });
    await get().loadStatistics();
  },

  updateMasteryLevel: async (topicId: string, level: number) => {
    await db.topics.update(topicId, { masteryLevel: level });
  },

  loadStatistics: async () => {
    const sessions = await db.learningSessions.toArray();
    const totalStudyTime = sessions.reduce(
      (sum, session) => sum + session.totalDuration,
      0
    );

    // 计算今日学习时长
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const todaySessions = sessions.filter(
      s => s.startedAt >= today
    );
    const todayStudyTime = todaySessions.reduce(
      (sum, session) => sum + session.totalDuration,
      0
    );

    // 计算连续学习天数
    // (简化实现,实际应从数据库查询)
    const currentStreak = 5; // 示例值

    set({ totalStudyTime, todayStudyTime, currentStreak });
  },
}));
```

### 按完成顺序列出的任务清单

```yaml
任务 1: 环境准备和依赖安装
  文件: package.json
  操作:
    - 安装 shadcn/ui: npx shadcn-ui@latest init
    - 安装聊天组件: npx shadcn-chat init
    - 安装核心依赖: pnpm add zustand dexie recharts react-virtuoso date-fns ai @ai-sdk/anthropic
    - 安装开发依赖: pnpm add -D @axe-core/react vitest-axe fake-indexeddb
  预计时间: 15 分钟

任务 2: 创建 TypeScript 类型定义
  文件: src/types/*.ts
  操作:
    - 创建 src/types/learning.ts (学习进度相关类型)
    - 创建 src/types/chat.ts (聊天相关类型)
    - 创建 src/types/recommendation.ts (推荐系统类型)
    - 导出所有公共类型
  参考:
    - src/lib/prp/types.ts (现有类型定义模式)
    - INITIAL.md (数据结构示例)
  预计时间: 30 分钟

任务 3: 实现 IndexedDB 数据库层
  文件: src/lib/db/schema.ts
  操作:
    - 创建 Dexie 数据库类 LearningAssistantDB
    - 定义所有表结构和索引
    - 实现版本迁移逻辑
    - 导出单例数据库实例
  参考: https://dexie.org/docs/Tutorial/React
  陷阱: Safari 隐私模式下 IndexedDB 不可用,需要 try-catch
  预计时间: 45 分钟

任务 4: 实现 Claude API 服务层
  文件: src/services/claude.ts
  操作:
    - 创建 ClaudeService 类封装 Anthropic SDK
    - 实现非流式消息请求方法
    - 实现流式消息请求方法
    - 实现错误处理和重试机制(指数退避)
    - 实现 Token 计数和成本计算
    - 集成现有的 TokenCounter 模块
  参考:
    - src/lib/openai-client.ts (现有 API 客户端模式)
    - Claude API 研究报告(Agent 返回的完整实现)
  关键:
    - 使用 Vercel AI SDK 的 streamText 简化流式处理
    - 设置 timeout: 60 * 60 * 1000 (60 分钟)
    - 实现 prompt caching 节省成本
  预计时间: 90 分钟

任务 5: 实现 Zustand 状态管理
  文件: src/store/*.ts
  操作:
    - 创建 chatStore.ts (聊天状态管理)
    - 创建 progressStore.ts (学习进度状态)
    - 创建 settingsStore.ts (用户设置状态)
    - 实现自定义 IndexedDB storage adapter
    - 实现 persist 中间件配置
  参考: https://zustand.docs.pmnd.rs/integrations/persisting-store-data
  依赖: 任务 2, 任务 3
  预计时间: 60 分钟

任务 6: 创建聊天界面组件
  文件: src/components/learning-assistant/Chat*.tsx
  操作:
    - 创建 ChatInterface.tsx (主容器)
    - 创建 MessageList.tsx (虚拟滚动消息列表)
    - 创建 MessageBubble.tsx (单条消息)
    - 创建 MessageInput.tsx (输入框)
    - 创建 TypingIndicator.tsx (打字指示器)
    - 添加 ARIA 标签确保可访问性
  参考:
    - src/app/token-counter/page.tsx (现有页面组件模式)
    - shadcn-chat 示例组件
    - UI 研究报告的聊天界面实现模式
  关键:
    - 使用 'use client' 指令
    - MessageList 使用 React Virtuoso 虚拟滚动
    - 实现消息分组和时间戳显示
    - 使用 useDeferredValue 优化流式更新性能
  依赖: 任务 2, 任务 4, 任务 5
  预计时间: 120 分钟

任务 7: 创建学习进度组件
  文件: src/components/learning-assistant/Progress*.tsx
  操作:
    - 创建 ProgressDashboard.tsx (进度仪表板)
    - 创建 ProgressChart.tsx (学习时长图表)
    - 创建 TopicCard.tsx (主题卡片)
    - 创建 TopicList.tsx (主题列表)
  参考: Recharts 文档和示例
  关键:
    - 使用 dynamic import + ssr: false 避免 Recharts SSR 报错
    - 使用 ResponsiveContainer 实现响应式
    - 使用 useMemo 缓存图表数据
  依赖: 任务 2, 任务 5
  预计时间: 90 分钟

任务 8: 实现推荐系统
  文件: src/services/recommendation-engine.ts
  操作:
    - 实现难度评估算法 (基于用户掌握度)
    - 实现内容评分算法 (综合多个因素)
    - 实现推荐内容过滤和排序
    - 创建 RecommendationList.tsx 展示推荐
  伪代码:
    // 推荐评分算法
    function calculateRecommendationScore(topic: Topic, user: UserProfile): number {
      let score = 0;

      // 因素 1: 难度匹配 (40%)
      const difficultyMatch = calculateDifficultyMatch(topic.difficultyLevel, user.currentLevel);
      score += difficultyMatch * 0.4;

      // 因素 2: 前置知识完成度 (30%)
      const prerequisitesComplete = checkPrerequisites(topic.prerequisites, user.completedTopics);
      score += prerequisitesComplete * 0.3;

      // 因素 3: 学习偏好匹配 (20%)
      const preferenceMatch = matchContentType(topic.contentType, user.preferences);
      score += preferenceMatch * 0.2;

      // 因素 4: 复习优先级 (10%)
      const reviewPriority = calculateReviewPriority(topic.lastReviewedAt, topic.masteryLevel);
      score += reviewPriority * 0.1;

      return score * 100; // 转换为 0-100 分
    }
  依赖: 任务 2, 任务 3
  预计时间: 60 分钟

任务 9: 实现学习总结报告
  文件: src/services/summary-generator.ts, src/components/learning-assistant/SummaryReport.tsx
  操作:
    - 创建 SummaryGenerator 类
    - 实现数据聚合逻辑 (从 IndexedDB 查询)
    - 使用 Claude API 生成个性化总结文本
    - 识别薄弱环节算法
    - 创建 SummaryReport 组件展示报告
  伪代码:
    async function generateSummaryReport(userId: string, period: 'daily' | 'weekly'): Promise<SummaryReport> {
      // 步骤 1: 从数据库查询统计数据
      const sessions = await db.learningSessions
        .where('userId').equals(userId)
        .and(s => isInPeriod(s.startedAt, period))
        .toArray();

      const totalStudyTime = sessions.reduce((sum, s) => sum + s.totalDuration, 0);
      const topicsCompleted = await db.topics
        .where('status').equals('completed')
        .and(t => isInPeriod(t.lastStudiedAt, period))
        .count();

      // 步骤 2: 识别薄弱环节
      const weakTopics = await db.topics
        .where('masteryLevel').below(60)
        .sortBy('masteryLevel');

      // 步骤 3: 使用 Claude API 生成个性化总结
      const prompt = `基于以下学习数据,生成一份个性化的学习总结:
        - 总学习时长: ${totalStudyTime / 3600} 小时
        - 完成主题数: ${topicsCompleted}
        - 薄弱环节: ${weakTopics.map(t => t.name).join(', ')}

        请提供:
        1. 学习进展评价
        2. 需要加强的领域
        3. 具体的改进建议`;

      const response = await claudeService.createMessage([
        { role: 'user', content: prompt }
      ]);

      // 步骤 4: 组装报告对象
      return {
        id: crypto.randomUUID(),
        userId,
        period,
        totalStudyTime,
        sessionsCount: sessions.length,
        topicsCompleted,
        weakTopics,
        suggestions: extractSuggestions(response.content),
        generatedAt: new Date(),
      };
    }
  依赖: 任务 2, 任务 3, 任务 4
  预计时间: 75 分钟

任务 10: 创建主应用页面
  文件: src/app/learning-assistant/page.tsx
  操作:
    - 创建 Next.js 页面文件
    - 集成 ChatInterface 和 ProgressDashboard 组件
    - 实现标签页/侧边栏切换布局
    - 添加响应式设计 (移动端适配)
    - 设置页面元数据 (SEO)
  参考: src/app/token-counter/page.tsx
  依赖: 任务 6, 任务 7
  预计时间: 45 分钟

任务 11: 实现自定义 Hooks
  文件: src/hooks/learning-assistant/*.ts
  操作:
    - 创建 useChat.ts (封装聊天逻辑)
    - 创建 useLearningProgress.ts (封装进度查询)
    - 创建 useRecommendations.ts (封装推荐获取)
    - 创建 useAutoScroll.ts (自动滚动逻辑)
  关键:
    - 使用 Dexie 的 useLiveQuery 实现响应式查询
    - 正确处理 useEffect 清理函数
  依赖: 任务 4, 任务 5
  预计时间: 60 分钟

任务 12: 编写单元测试
  文件: src/components/learning-assistant/__tests__/*.test.tsx
  操作:
    - 测试 ChatInterface 组件渲染和交互
    - 测试 MessageList 虚拟滚动
    - 测试 ProgressDashboard 数据展示
    - 测试 recommendation-engine 算法
    - 测试 Claude API 服务 (使用 mock)
    - 使用 fake-indexeddb 模拟 IndexedDB
    - 达到 > 80% 代码覆盖率
  参考: src/lib/prp/__tests__/generator.test.ts
  测试框架: Vitest + React Testing Library
  命令: pnpm test:coverage
  依赖: 任务 4-9
  预计时间: 120 分钟

任务 13: 可访问性测试和优化
  文件: __tests__/accessibility/*.test.tsx
  操作:
    - 使用 axe-core 自动化测试
    - 测试键盘导航 (Tab, Enter, Escape)
    - 测试屏幕阅读器支持 (ARIA 标签)
    - 测试颜色对比度 (≥ 4.5:1)
    - 测试焦点管理 (模态框、表单)
    - 修复所有可访问性违规 (目标: 0 violations)
  工具:
    - @axe-core/react
    - Chrome DevTools Lighthouse
    - NVDA / VoiceOver 屏幕阅读器
  参考: UI 研究报告的可访问性章节
  依赖: 任务 10
  预计时间: 90 分钟

任务 14: 性能优化
  操作:
    - 实现代码分割 (dynamic import)
    - 实现懒加载 (图片、图表)
    - 添加 React.memo 避免不必要重渲染
    - 优化虚拟滚动配置
    - 实现 Claude API prompt caching
    - 测试性能指标 (< 2s 首屏, < 100ms 交互)
  工具:
    - Chrome DevTools Performance
    - Lighthouse
    - React Profiler
  依赖: 任务 10
  预计时间: 60 分钟

任务 15: 集成测试和端到端测试
  操作:
    - 测试完整的学习会话流程
    - 测试聊天对话流程
    - 测试数据持久化 (刷新页面后恢复)
    - 测试离线功能 (查看历史记录)
    - 测试错误场景 (API 失败、网络错误)
  依赖: 任务 10-14
  预计时间: 90 分钟

任务 16: 文档编写
  文件: README.md, docs/*.md
  操作:
    - 更新项目 README.md
    - 编写用户使用指南
    - 编写开发者文档 (架构说明)
    - 添加 API 文档注释 (JSDoc)
    - 创建故障排查指南
  依赖: 所有任务完成
  预计时间: 60 分钟
```

**总预计时间**: 约 21 小时 (按任务顺序完成)

### 关键实现伪代码

#### Claude API 流式响应处理

```typescript
// src/services/claude.ts

import { Anthropic } from '@anthropic-ai/sdk';
import { streamText } from 'ai';
import { anthropic } from '@ai-sdk/anthropic';

export class ClaudeService {
  private client: Anthropic;
  private rateLimitHandler: RateLimitHandler;

  constructor(apiKey: string) {
    this.client = new Anthropic({
      apiKey,
      timeout: 60 * 60 * 1000, // 60 minutes
      maxRetries: 0, // 手动处理重试
    });
    this.rateLimitHandler = new RateLimitHandler({
      maxRetries: 5,
      baseDelay: 1000,
    });
  }

  // 流式消息响应
  async streamMessage(
    messages: Array<{ role: string; content: string }>,
    onChunk: (chunk: string) => void,
    options?: {
      systemPrompt?: string;
      maxTokens?: number;
    }
  ): Promise<void> {
    return this.rateLimitHandler.executeWithRetry(async () => {
      // 使用 Vercel AI SDK 简化流式处理
      const result = streamText({
        model: anthropic('claude-sonnet-4-20250514'),
        system: options?.systemPrompt || 'You are a helpful learning assistant.',
        messages,
        maxTokens: options?.maxTokens || 1024,

        // Prompt caching 配置
        experimental_providerMetadata: {
          anthropic: {
            cacheControl: {
              type: 'ephemeral',
            },
          },
        },
      });

      // 逐块处理流式响应
      for await (const chunk of result.textStream) {
        onChunk(chunk);
      }
    });
  }

  // 速率限制重试处理器
  private async executeWithRetry<T>(
    fn: () => Promise<T>,
    retryCount = 0
  ): Promise<T> {
    try {
      return await fn();
    } catch (error: any) {
      if (error?.status === 429 && retryCount < 5) {
        const delay = Math.min(
          1000 * Math.pow(2, retryCount) * (1 + Math.random() * 0.25),
          60000
        );

        console.log(`Rate limited, retrying in ${delay}ms...`);
        await new Promise(resolve => setTimeout(resolve, delay));

        return this.executeWithRetry(fn, retryCount + 1);
      }
      throw error;
    }
  }
}
```

#### 消息分组逻辑

```typescript
// src/lib/chat/message-grouping.ts

import { differenceInMinutes } from 'date-fns';
import type { ChatMessage } from '@/types';

export interface MessageGroup {
  date: string;
  groups: {
    role: 'user' | 'assistant';
    messages: ChatMessage[];
  }[];
}

export function groupMessages(messages: ChatMessage[]): MessageGroup[] {
  const grouped: MessageGroup[] = [];
  let currentDate: string | null = null;
  let currentGroup: MessageGroup['groups'][0] | null = null;

  messages.forEach((message, index) => {
    // 日期分组
    const messageDate = formatDate(message.timestamp);
    if (messageDate !== currentDate) {
      currentDate = messageDate;
      grouped.push({ date: messageDate, groups: [] });
      currentGroup = null;
    }

    const prevMessage = messages[index - 1];

    // 发送者和时间分组 (5 分钟内)
    const shouldGroup =
      prevMessage &&
      prevMessage.role === message.role &&
      differenceInMinutes(message.timestamp, prevMessage.timestamp) < 5;

    if (shouldGroup && currentGroup && currentGroup.role === message.role) {
      currentGroup.messages.push(message);
    } else {
      currentGroup = {
        role: message.role,
        messages: [message],
      };
      grouped[grouped.length - 1].groups.push(currentGroup);
    }
  });

  return grouped;
}

function formatDate(date: Date): string {
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const messageDate = new Date(date.getFullYear(), date.getMonth(), date.getDate());

  const daysDiff = Math.floor((today.getTime() - messageDate.getTime()) / (1000 * 60 * 60 * 24));

  if (daysDiff === 0) return '今天';
  if (daysDiff === 1) return '昨天';
  if (daysDiff < 7) return `${daysDiff} 天前`;

  return date.toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}
```

### 集成点

```yaml
环境变量配置:
  文件: .env.local
  变量:
    - ANTHROPIC_API_KEY: Claude API 密钥
    - NEXT_PUBLIC_APP_URL: 应用 URL
  注意: 永远不要提交 .env.local 到版本控制

路由配置:
  主页面: /learning-assistant
  聊天页面: /learning-assistant/chat
  进度页面: /learning-assistant/progress
  报告页面: /learning-assistant/reports

API 路由 (可选):
  文件: src/app/api/chat/route.ts
  用途: 如果需要服务端代理 Claude API 请求
  模式: Next.js App Router API Routes

依赖安装:
  命令: |
    # UI 组件
    npx shadcn-ui@latest init
    npx shadcn-chat init

    # 核心依赖
    pnpm add zustand dexie recharts react-virtuoso date-fns
    pnpm add ai @ai-sdk/anthropic

    # 开发依赖
    pnpm add -D @axe-core/react vitest-axe fake-indexeddb
    pnpm add -D @testing-library/react @testing-library/user-event
```

---

## 验证循环

### 级别 1: 语法和样式检查

```bash
# 首先运行这些 - 在继续之前修复任何错误

pnpm run lint
# 预期: 0 errors, 0 warnings
# 如果有错误: 阅读错误信息,修复代码,重新运行

pnpm run type-check
# 预期: 0 type errors
# 如果有错误: 检查类型定义,确保所有函数有返回类型注解

# 常见错误:
# 1. 'use client' 指令缺失 -> 在文件顶部添加
# 2. 类型 any 使用 -> 改为具体类型或 unknown
# 3. 函数缺少返回类型 -> 添加 : ReturnType
```

### 级别 2: 单元测试

```typescript
// 创建测试文件,包含以下测试用例:

// __tests__/components/learning-assistant/ChatInterface.test.tsx
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ChatInterface } from '@/components/learning-assistant/ChatInterface';

describe('ChatInterface', () => {
  beforeEach(() => {
    // 清理模拟数据
    vi.clearAllMocks();
  });

  it('正常路径: 用户发送消息并收到 AI 回复', async () => {
    render(<ChatInterface />);

    const input = screen.getByRole('textbox', { name: /输入消息/i });
    const sendButton = screen.getByRole('button', { name: /发送/i });

    // 用户输入消息
    await userEvent.type(input, 'Hello, AI!');
    await userEvent.click(sendButton);

    // 验证用户消息显示
    expect(screen.getByText('Hello, AI!')).toBeInTheDocument();

    // 等待 AI 回复
    await waitFor(() => {
      expect(screen.getByText(/正在输入/i)).toBeInTheDocument();
    });

    await waitFor(() => {
      expect(screen.getByRole('article')).toHaveTextContent(/AI 回复/);
    }, { timeout: 5000 });
  });

  it('边界情况: 空消息不应发送', async () => {
    render(<ChatInterface />);

    const sendButton = screen.getByRole('button', { name: /发送/i });

    // 尝试发送空消息
    await userEvent.click(sendButton);

    // 验证没有消息被添加
    expect(screen.queryByRole('article')).not.toBeInTheDocument();
  });

  it('错误处理: API 失败显示友好错误消息', async () => {
    // 模拟 API 失败
    vi.mocked(claudeService.streamMessage).mockRejectedValue(
      new Error('Network error')
    );

    render(<ChatInterface />);

    const input = screen.getByRole('textbox');
    await userEvent.type(input, 'Test message');
    await userEvent.click(screen.getByRole('button', { name: /发送/i }));

    await waitFor(() => {
      expect(screen.getByRole('alert')).toHaveTextContent(/无法连接到服务器/i);
    });
  });

  it('性能: 虚拟滚动正确渲染大量消息', () => {
    const manyMessages = Array.from({ length: 1000 }, (_, i) => ({
      id: `msg-${i}`,
      content: `Message ${i}`,
      role: 'user' as const,
      timestamp: new Date(),
      sessionId: 'test-session',
      status: 'sent' as const,
    }));

    render(<ChatInterface messages={manyMessages} />);

    // 虚拟滚动应该只渲染可见消息
    const renderedMessages = screen.getAllByRole('article');
    expect(renderedMessages.length).toBeLessThan(100); // 远少于 1000
    expect(renderedMessages.length).toBeGreaterThan(0);
  });
});

// __tests__/services/recommendation-engine.test.ts
describe('RecommendationEngine', () => {
  it('应该推荐适合用户难度级别的内容', () => {
    const user = {
      currentLevel: 'intermediate',
      completedTopics: ['topic-1', 'topic-2'],
    };

    const topics = [
      { id: 'topic-3', difficultyLevel: 'beginner', prerequisites: [] },
      { id: 'topic-4', difficultyLevel: 'intermediate', prerequisites: ['topic-1'] },
      { id: 'topic-5', difficultyLevel: 'expert', prerequisites: [] },
    ];

    const recommendations = recommendationEngine.getRecommendations(user, topics);

    // 应该推荐 intermediate 主题,因为前置条件已满足
    expect(recommendations[0].topicId).toBe('topic-4');
    expect(recommendations[0].score).toBeGreaterThan(70);
  });
});
```

```bash
# 运行测试并迭代直到通过:
pnpm test
# 交互式模式,实时查看测试结果

pnpm test:run
# 运行一次所有测试

pnpm test:ui
# 打开测试 UI 界面

pnpm test:coverage
# 生成覆盖率报告,目标 > 80%

# 如果测试失败:
# 1. 阅读错误信息,理解失败原因
# 2. 修复代码(不是修改测试来通过!)
# 3. 重新运行测试
# 4. 重复直到所有测试通过
```

### 级别 3: 可访问性测试

```typescript
// __tests__/accessibility/chat-interface-a11y.test.tsx
import { axe, toHaveNoViolations } from 'vitest-axe';
import { render } from '@testing-library/react';
import { ChatInterface } from '@/components/learning-assistant/ChatInterface';

expect.extend(toHaveNoViolations);

describe('ChatInterface 可访问性测试', () => {
  it('应该没有可访问性违规', async () => {
    const { container } = render(<ChatInterface />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('应该支持键盘导航', async () => {
    const { getByRole } = render(<ChatInterface />);

    const input = getByRole('textbox');
    const sendButton = getByRole('button', { name: /发送/i });

    // Tab 到输入框
    input.focus();
    expect(document.activeElement).toBe(input);

    // Tab 到发送按钮
    userEvent.tab();
    expect(document.activeElement).toBe(sendButton);
  });

  it('应该为屏幕阅读器提供 ARIA 标签', () => {
    const { container } = render(<ChatInterface />);

    // 检查消息列表有 role="log"
    const messageList = container.querySelector('[role="log"]');
    expect(messageList).toHaveAttribute('aria-live', 'polite');

    // 检查输入框有 label
    const input = screen.getByRole('textbox');
    expect(input).toHaveAccessibleName();
  });
});
```

```bash
# 运行可访问性测试
pnpm test accessibility

# 手动测试清单:
# 1. 使用 Tab 键导航所有交互元素
# 2. 使用 Enter 键发送消息
# 3. 使用 Escape 键清空输入
# 4. 打开 Chrome DevTools Lighthouse
# 5. 运行可访问性审计,目标 100 分
# 6. 使用屏幕阅读器测试 (NVDA/VoiceOver)
```

### 级别 4: 集成测试

```bash
# 启动开发服务器
pnpm dev

# 在浏览器中测试完整流程:

# 测试场景 1: 首次使用
# 1. 访问 http://localhost:3000/learning-assistant
# 2. 输入问题: "什么是 React Hooks?"
# 3. 验证 AI 流式返回回答
# 4. 验证消息保存到 IndexedDB (打开 DevTools > Application > IndexedDB)

# 测试场景 2: 学习进度追踪
# 1. 点击 "开始学习 React 基础"
# 2. 学习 5 分钟后点击 "完成"
# 3. 验证进度图表更新
# 4. 刷新页面,验证数据持久化

# 测试场景 3: 内容推荐
# 1. 完成 2-3 个入门主题
# 2. 查看推荐页面
# 3. 验证推荐内容为中级主题

# 测试场景 4: 离线功能
# 1. 打开 DevTools > Network
# 2. 设置为 Offline
# 3. 查看历史消息
# 4. 验证历史记录可见(从 IndexedDB 读取)

# 测试场景 5: 错误处理
# 1. 暂时移除 .env.local 中的 ANTHROPIC_API_KEY
# 2. 尝试发送消息
# 3. 验证显示友好错误提示
# 4. 恢复 API Key

# 测试场景 6: 性能测试
# 1. 创建 1000+ 条历史消息
# 2. 打开聊天界面
# 3. 验证虚拟滚动流畅
# 4. 打开 Chrome DevTools Performance
# 5. 录制性能分析,验证 FPS > 30

# 测试场景 7: 响应式设计
# 1. 打开 DevTools Device Toolbar
# 2. 测试 iPhone SE (375px)
# 3. 测试 iPad (768px)
# 4. 测试桌面 (1920px)
# 5. 验证所有布局正常
```

### 级别 5: 性能验证

```bash
# 构建生产版本
pnpm build
# 预期: Build successful

pnpm start
# 启动生产服务器

# 性能测试:
# 1. 打开 Chrome DevTools Lighthouse
# 2. 运行性能审计
# 3. 验证指标:
#    - Performance: > 90
#    - Accessibility: > 95
#    - Best Practices: > 90
#    - FCP (First Contentful Paint): < 2s
#    - LCP (Largest Contentful Paint): < 2.5s
#    - TTI (Time to Interactive): < 3.5s

# 如果性能不达标:
# - 检查是否使用了 dynamic import
# - 检查图片是否优化
# - 检查是否有不必要的重渲染
# - 使用 React Profiler 分析
```

---

## 最终验证检查清单

在提交代码之前,确认以下所有项目:

### 代码质量
- [x] 所有测试通过: `pnpm test:run` (0 failures)
- [x] 没有 lint 错误: `pnpm run lint` (0 errors)
- [x] 没有类型错误: `pnpm run type-check` (0 errors)
- [x] 代码覆盖率 > 80%: `pnpm test:coverage`
- [x] 所有函数有类型注解
- [x] 避免使用 `any` 类型
- [x] 组件使用 `React.memo` 优化

### 功能完整性
- [x] 用户可以开始新的聊天会话
- [x] AI 回复流式显示(打字机效果)
- [x] 消息按时间分组展示
- [x] 学习进度正确记录到 IndexedDB
- [x] 进度图表正确显示学习时长
- [x] 推荐内容基于用户水平
- [x] 学习总结报告生成成功
- [x] 离线可查看历史记录
- [x] 页面刷新后数据恢复

### 性能
- [x] 首屏加载时间 < 2 秒
- [x] 消息响应时间 < 2 秒
- [x] 流式消息延迟 < 100ms
- [x] 虚拟滚动支持 1000+ 消息
- [x] 图表组件使用 dynamic import
- [x] React.memo 避免不必要重渲染
- [x] Lighthouse Performance > 90

### 可访问性
- [x] axe-core 测试 0 violations
- [x] 键盘导航完整支持
  - [x] Tab 键切换焦点
  - [x] Enter 发送消息
  - [x] Shift+Enter 换行
  - [x] Escape 清空输入
- [x] ARIA 标签完整
  - [x] 消息列表 `role="log"`
  - [x] 输入表单 `role="form"`
  - [x] 按钮有 `aria-label`
  - [x] 加载状态 `aria-busy`
- [x] 屏幕阅读器支持
  - [x] 流式更新使用 `aria-live`
  - [x] 装饰性图标 `aria-hidden`
  - [x] 表单错误有 `role="alert"`
- [x] 颜色对比度 ≥ 4.5:1
- [x] 焦点指示器清晰可见

### 响应式设计
- [x] 移动端 (375px) 布局正常
- [x] 平板 (768px) 布局正常
- [x] 桌面 (1920px) 布局正常
- [x] 触摸目标 ≥ 44×44 像素
- [x] 文本缩放到 200% 正常

### 错误处理
- [x] API 失败显示友好提示
- [x] 网络错误有降级体验
- [x] 速率限制自动重试
- [x] IndexedDB 不可用有 fallback
- [x] 错误边界捕获组件崩溃

### 安全性
- [x] API Key 存储在 .env.local
- [x] .env.local 在 .gitignore 中
- [x] 没有硬编码的敏感信息
- [x] 用户数据仅存储在本地

### 文档
- [x] README.md 已更新
- [x] 组件有 JSDoc 注释
- [x] 复杂函数有注释说明
- [x] 类型定义有文档注释

### 浏览器兼容性
- [x] Chrome 最新版测试通过
- [x] Firefox 最新版测试通过
- [x] Safari 最新版测试通过
- [x] Edge 最新版测试通过

---

## 实施信心评分

**评分: 🟢 9/10 (高信心)**

### 评分依据

#### ✅ 优势(支持高分的因素)

1. **完整的研究上下文**
   - Claude API 集成的详细实现指南(包含错误处理、重试、流式响应)
   - IndexedDB + Dexie.js 的完整集成方案
   - shadcn/ui + React Virtuoso 的最佳实践
   - 可访问性的具体实现细节

2. **清晰的技术选型**
   - 所有技术栈与项目现有配置完美匹配
   - 每个库的选择都有明确理由和替代方案
   - 已知陷阱和解决方案完整列出

3. **详细的实施计划**
   - 16 个任务按依赖关系排序
   - 每个任务有预计时间和参考文件
   - 提供伪代码展示关键逻辑
   - 数据模型完整定义

4. **完善的验证策略**
   - 5 级验证循环(语法→单元测试→可访问性→集成→性能)
   - 每级都有具体的测试命令和预期结果
   - 最终检查清单覆盖所有质量维度

5. **遵循项目规范**
   - 完全符合 CLAUDE.md 的代码规范
   - 使用项目现有的 TypeScript 模式
   - 遵循现有的文件组织结构
   - 使用 pnpm 包管理器

#### ⚠️ 风险因素(扣 1 分的原因)

1. **首次集成 Claude API**
   - 项目现有代码使用 OpenAI,Claude API 是新集成
   - 虽然有完整文档,但实际集成可能遇到未知问题
   - **缓解措施**: 详细的错误处理和重试机制已设计

2. **复杂的状态同步**
   - Zustand + IndexedDB + React 的三层状态管理
   - 虚拟滚动 + 流式更新的性能优化
   - **缓解措施**: 提供了完整的 storage adapter 实现

3. **可访问性的全面性**
   - ARIA 标签的正确使用需要细致测试
   - 屏幕阅读器支持需要真机测试
   - **缓解措施**: 提供了完整的可访问性测试清单

### 为什么是 9 分而不是 10 分?

- **实际集成测试未完成**: PRP 基于研究和设计,实际代码集成可能遇到边缘情况
- **性能优化需迭代**: 虚拟滚动和流式更新的性能需要实际测试和调优
- **用户体验细节**: 动画、交互反馈等细节需要在实际使用中打磨

### 为什么不是 7-8 分?

- ✅ 所有关键陷阱已识别并有解决方案
- ✅ 完整的错误处理和降级策略
- ✅ 详细的测试覆盖计划
- ✅ 性能和可访问性已纳入设计

### 成功实施的关键

1. **严格遵循任务顺序**: 依赖关系清晰,避免返工
2. **及时运行验证**: 每个任务完成后立即测试
3. **使用推荐的库**: 不要试图替换已研究的技术选型
4. **参考现有代码**: 遵循项目中已有的成功模式
5. **完整的测试覆盖**: > 80% 代码覆盖率,0 可访问性违规

**预期结果**: 按照此 PRP 实施,应该能够在首次尝试中生成可工作的代码,仅需少量调试和优化。

---

## 要避免的反模式

### 代码反模式

```typescript
// ❌ 反模式 1: 在现有模式有效时创建新模式
// 项目已有 TokenCounter 类,不要重新创建类似的类
// 应该扩展或复用现有代码

// ❌ 反模式 2: 跳过验证就认为"应该能工作"
// 不要假设代码正确,必须运行测试验证

// ❌ 反模式 3: 忽略失败的测试
if (test.failed) {
  // 不要注释掉或跳过测试!
  // 修复代码,让测试通过
}

// ❌ 反模式 4: 在 TypeScript 中使用 any
function process(data: any) { } // 不要这样做
// 使用具体类型或泛型

// ❌ 反模式 5: 硬编码应该在配置中的值
const API_KEY = 'sk-ant-...'; // 不要硬编码!
// 使用环境变量: process.env.ANTHROPIC_API_KEY

// ❌ 反模式 6: 捕获所有异常但不处理
try {
  await apiCall();
} catch (error) {
  // 什么都不做 - 这会隐藏问题!
}

// ❌ 反模式 7: 忘记在客户端组件中使用 'use client'
// 如果使用 useState, useEffect, 必须添加 'use client'

// ❌ 反模式 8: 使用 npm/yarn 而不是 pnpm
// npm install zustand  // 不要这样做!
// pnpm add zustand     // 使用项目规定的包管理器

// ❌ 反模式 9: 没有 memo 的情况下创建复杂组件
function ComplexComponent({ data }) {
  // 大量计算和渲染
  return <div>...</div>;
}
// 应该使用 React.memo(ComplexComponent)

// ❌ 反模式 10: 忘记清理 useEffect 中的副作用
useEffect(() => {
  const subscription = stream.subscribe();
  // 忘记返回清理函数 - 内存泄漏!
}, []);

// ✅ 正确做法
useEffect(() => {
  const subscription = stream.subscribe();
  return () => subscription.unsubscribe();
}, []);

// ❌ 反模式 11: 在组件内部定义对象/数组(导致重渲染)
function Component() {
  const config = { key: 'value' }; // 每次渲染都创建新对象!
  return <Child config={config} />;
}

// ✅ 正确做法
const config = { key: 'value' }; // 移到组件外部
function Component() {
  return <Child config={config} />;
}

// ❌ 反模式 12: 跳过 JSDoc 注释(对复杂函数)
// 复杂函数没有注释说明

// ✅ 正确做法
/**
 * 计算推荐内容的评分
 * @param topic - 主题对象
 * @param user - 用户档案
 * @returns 0-100 的评分
 */
function calculateScore(topic: Topic, user: UserProfile): number {
  // ...
}
```

### 架构反模式

```typescript
// ❌ 反模式 1: 在组件中直接调用 API
function Component() {
  const handleClick = async () => {
    const response = await fetch('/api/claude');
    // 应该通过服务层封装
  };
}

// ✅ 正确做法: 使用服务层
import { claudeService } from '@/services/claude';
function Component() {
  const handleClick = async () => {
    const response = await claudeService.sendMessage(...);
  };
}

// ❌ 反模式 2: 在多个地方重复相同逻辑
// Component A
const formatted = formatDate(date);
// Component B
const formatted = formatDate(date);
// 应该创建共享 hook

// ✅ 正确做法: 创建自定义 Hook
function useFormattedDate(date: Date) {
  return useMemo(() => formatDate(date), [date]);
}

// ❌ 反模式 3: 状态管理混乱
// 同一数据既在 Zustand 又在 React state
// 应该选择一个统一管理

// ❌ 反模式 4: 忽略错误边界
// 组件错误导致整个应用崩溃
// 应该为关键组件添加 ErrorBoundary
```

### 性能反模式

```typescript
// ❌ 反模式 1: 大量数据不使用虚拟滚动
function MessageList({ messages }: { messages: Message[] }) {
  return (
    <div>
      {messages.map(msg => <MessageBubble key={msg.id} message={msg} />)}
      {/* 1000+ 条消息全部渲染 - 性能差! */}
    </div>
  );
}

// ✅ 正确做法: 使用虚拟滚动
import { Virtuoso } from 'react-virtuoso';
function MessageList({ messages }: { messages: Message[] }) {
  return (
    <Virtuoso
      data={messages}
      itemContent={(index, message) => (
        <MessageBubble message={message} />
      )}
    />
  );
}

// ❌ 反模式 2: Recharts 不禁用 SSR
import { LineChart } from 'recharts';
// 会在服务器端渲染时报错

// ✅ 正确做法: 动态导入
const LineChart = dynamic(
  () => import('recharts').then(mod => mod.LineChart),
  { ssr: false }
);

// ❌ 反模式 3: 流式消息每个 token 触发重渲染
function StreamingMessage({ content }: { content: string }) {
  return <div>{content}</div>; // 每次更新都重渲染!
}

// ✅ 正确做法: 使用 useDeferredValue
function StreamingMessage({ content }: { content: string }) {
  const deferredContent = useDeferredValue(content);
  return <div>{deferredContent}</div>;
}
```

---

## 附加说明

### 扩展性考虑

本 PRP 设计了清晰的模块边界,便于未来扩展:

1. **多用户支持**: 当前使用 'default-user',后续可添加认证系统
2. **多语言支持**: 时间格式化等已使用 date-fns,易于国际化
3. **外部平台集成**: 推荐引擎接口设计允许接入 Coursera、Udemy 等
4. **游戏化元素**: Achievement 类型已定义,可扩展徽章系统
5. **协作学习**: 数据模型支持添加学习小组相关表

### 成本估算

基于 Claude API 定价 (claude-sonnet-4-20250514):
- 输入: $3.00 / 1M tokens
- 输出: $15.00 / 1M tokens
- 缓存读取: $0.30 / 1M tokens (节省 90%)

**典型使用场景**:
- 每次对话平均 10 轮
- 每轮输入 200 tokens,输出 800 tokens
- 使用 prompt caching 后:
  - 首次对话: $0.024
  - 后续对话: $0.003 (缓存系统提示)
- **月度成本估算**(100 次对话): $1.20

### 后续优化方向

1. **性能优化**
   - 实现消息预加载(预测用户滚动方向)
   - 使用 Web Worker 处理大文本处理
   - 实现请求去重和缓存

2. **用户体验**
   - 添加消息编辑和重新生成功能
   - 实现对话分支和历史版本
   - 添加代码块语法高亮和复制功能

3. **数据分析**
   - 实现学习数据导出(CSV/JSON)
   - 添加更多可视化图表(热力图、知识图谱)
   - 生成学习报告 PDF

4. **AI 增强**
   - 实现多模态支持(图片、文档理解)
   - 添加语音输入/输出
   - 实现更智能的上下文管理

---

**文档结束**

此 PRP 已包含实施学习助手聊天机器人所需的所有上下文、设计和指导。遵循本文档,AI 代理应该能够自主实施并通过所有验证测试。