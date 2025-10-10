# 学习助手聊天机器人 - 初始需求

## FEATURE:

构建一个智能学习助手聊天机器人,能够帮助用户追踪学习进度、推荐个性化内容,并提供定期知识总结。

### 核心功能:

1. **学习进度追踪**

   - 记录用户完成的课程/章节/知识点
   - 追踪每个主题的学习时长
   - 支持多个学习路径/课程的并行追踪
   - 持久化存储学习历史数据

2. **智能内容推荐**

   - 基于用户当前知识水平推荐下一步学习内容
   - 根据学习进度和难度曲线智能调整推荐
   - 支持难度级别: 入门、中级、高级、专家
   - 考虑用户的学习偏好(视频/文本/实践等)

3. **定期知识总结**

   - 每日/每周生成学习总结报告
   - 使用 Claude API 生成个性化的知识点回顾
   - 识别需要复习的薄弱环节
   - 提供记忆曲线优化的复习计划

4. **交互式对话**
   - 自然语言理解用户的学习查询
   - 支持提问、答疑、概念解释
   - 记住上下文,支持多轮对话
   - 友好的对话界面

### 技术要求:

- **前端**: React + TypeScript
- **UI 组件**: 使用 Ant Design 或 Material-UI
- **对话引擎**: 集成 Claude API (Sonnet 4)
- **状态管理**: Redux 或 Zustand
- **数据存储**:
  - 本地存储: IndexedDB (学习进度)
  - 会话存储: React state (对话历史)
- **数据可视化**: 使用 Recharts 展示学习进度和统计

### 非功能性需求:

- **性能**: 消息响应时间 < 2 秒
- **可用性**: 支持离线查看历史记录
- **可扩展性**: 易于添加新的学习内容源
- **隐私**: 所有学习数据本地存储,不上传到服务器

## EXAMPLES:

在 `examples/` 目录中应包含以下参考实现:

1. **chat-interface.tsx** - 聊天界面组件示例

   - 消息列表渲染
   - 输入框和发送功能
   - 打字指示器
   - 消息时间戳格式化

2. **claude-api-integration.ts** - Claude API 调用示例

   - API 请求封装
   - 流式响应处理
   - 错误处理和重试逻辑
   - Token 使用优化

3. **progress-tracker.tsx** - 进度追踪组件

   - 进度条/环形图展示
   - 完成度百分比计算
   - 里程碑标记
   - 动画效果

4. **recommendation-engine.ts** - 推荐算法示例

   - 基于难度的过滤逻辑
   - 个性化评分算法
   - 学习路径生成

5. **knowledge-graph.tsx** - 知识图谱可视化
   - 节点和边的渲染
   - 交互式探索
   - 高亮已学习内容

## DOCUMENTATION:

### API 文档:

- **Claude API**: https://docs.anthropic.com/en/api/
  - 重点参考: Messages API, Streaming responses
  - 需要实现 token 计数和成本估算

### UI 库文档:

- **Ant Design**: https://ant.design/components/overview/
  - 使用组件: Chat, Progress, Card, Timeline, Badge
- **Recharts**: https://recharts.org/
  - 图表类型: AreaChart (学习时长), PieChart (知识分布), RadarChart (能力雷达)

### 数据存储:

- **IndexedDB API**: https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API
  - 用于持久化学习进度和历史记录
  - 需要实现数据库版本迁移机制

### 学习理论参考:

- **艾宾浩斯遗忘曲线**: 复习间隔计算
- **费曼学习法**: 知识点解释和总结生成
- **布鲁姆认知分类**: 难度级别划分

## OTHER CONSIDERATIONS:

### 1. 数据结构设计

```typescript
interface LearningProgress {
  userId: string;
  courses: Course[];
  totalStudyTime: number;
  lastActiveDate: Date;
}

interface Course {
  id: string;
  name: string;
  topics: Topic[];
  difficultyLevel: 'beginner' | 'intermediate' | 'advanced' | 'expert';
  completionPercentage: number;
}

interface Topic {
  id: string;
  name: string;
  status: 'not-started' | 'in-progress' | 'completed' | 'needs-review';
  studyTime: number;
  lastReviewedDate: Date;
  masteryLevel: number; // 0-100
}

interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  metadata?: {
    relatedTopics?: string[];
    suggestedActions?: string[];
  };
}
```

### 2. 常见陷阱

- **避免**: 在 React artifacts 中使用 localStorage (不支持)
- **使用**: React state 存储会话数据, IndexedDB 存储持久化数据
- **Claude API**: 注意速率限制,实现请求队列
- **性能**: 大量历史消息时,实现虚拟滚动
- **错误处理**: Claude API 失败时,提供友好的降级体验

### 3. 推荐策略

- 新用户: 从基础内容开始,收集反馈调整难度
- 已有进度: 分析薄弱环节,优先推荐巩固内容
- 学习曲线: 保持适度挑战(当前水平 +1 难度)
- 多样性: 混合理论和实践,避免单一内容类型

### 4. 隐私和安全

- 所有对话历史仅存储在用户浏览器中
- 不收集用户个人信息
- Claude API 调用应通过后端代理(如需要)
- 实现数据导出和清除功能

### 5. 可访问性

- 支持键盘快捷键(回车发送,Esc 清空输入)
- ARIA 标签完整性
- 色彩对比度符合 WCAG 2.1 AA 标准
- 支持屏幕阅读器

### 6. 未来扩展点

- 支持学习小组/协作学习
- 集成外部学习平台 (Coursera, Udemy 等)
- 游戏化元素(徽章、排行榜、成就系统)
- 语音输入/输出
- 多语言支持

## SUCCESS CRITERIA:

- [ ] 用户可以开始新的对话并得到智能回复
- [ ] 学习进度被正确记录和可视化
- [ ] 内容推荐基于用户水平且相关
- [ ] 生成的总结报告准确反映学习情况
- [ ] 所有功能在 Chrome/Firefox/Safari 最新版本正常工作
- [ ] 响应时间满足性能要求
- [ ] 通过所有单元测试和集成测试
