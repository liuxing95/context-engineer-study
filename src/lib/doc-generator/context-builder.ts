import { ChatTokenCounter } from '../token-counter';
import { 
  ContextConfig, 
  DocExample, 
  Memory, 
  UserPreferences, 
  GenerationRequest,
  Constraints,
  OutputFormat
} from './types';
import { getRelevantExamples, getExamplesByComplexity } from './examples';

export class ContextBuilder {
  private tokenCounter: ChatTokenCounter;

  constructor(model: string = 'gpt-4o-mini') {
    this.tokenCounter = new ChatTokenCounter(model);
  }

  /**
   * 构建系统提示词（控制在50 tokens内）
   */
  buildSystemPrompt(preferences: UserPreferences): string {
    const basePrompt = `你是一位技术文档写作专家。
输出：结构清晰、示例丰富、易于理解的技术文档。
格式：${preferences.outputFormat === 'markdown' ? 'Markdown，代码用 ``` 包裹' : preferences.outputFormat}。`;
    
    const tokens = this.tokenCounter.count(basePrompt);
    if (tokens > 50) {
      // 如果超过50tokens，使用简化版本
      return `技术文档专家。输出清晰的${preferences.outputFormat}格式文档。`;
    }
    
    return basePrompt;
  }

  /**
   * 选择最相关的Few-shot示例
   */
  selectExamples(topic: string, preferences: UserPreferences): DocExample[] {
    let examples: DocExample[] = [];
    
    // 首先按复杂度筛选
    const complexityExamples = getExamplesByComplexity(preferences.detailLevel);
    
    // 然后按相关性选择
    const relevantExamples = getRelevantExamples(topic, preferences.exampleCount);
    
    // 合并并去重，优先相关性
    examples = relevantExamples.filter(ex => 
      complexityExamples.some(ce => ce.topic === ex.topic)
    );
    
    // 如果没有匹配的复杂度示例，回退到相关性示例
    if (examples.length === 0) {
      examples = relevantExamples.slice(0, Math.min(2, preferences.exampleCount));
    }
    
    return examples;
  }

  /**
   * 构建约束条件
   */
  buildConstraints(request: GenerationRequest): Constraints {
    const defaultConstraints: Constraints = {
      length: "每个部分 200-300 字",
      codeExamples: "至少 2 个可运行的示例",
      complexity: "适合中级开发者"
    };

    if (request.constraints) {
      return { ...defaultConstraints, ...request.constraints };
    }

    if (request.preferences?.detailLevel) {
      switch (request.preferences.detailLevel) {
        case 'beginner':
          defaultConstraints.complexity = "适合初级开发者，解释基础概念";
          defaultConstraints.length = "每个部分 150-250 字";
          break;
        case 'advanced':
          defaultConstraints.complexity = "适合高级开发者，包含深入分析";
          defaultConstraints.length = "每个部分 300-500 字";
          defaultConstraints.codeExamples = "至少 3 个复杂示例";
          break;
      }
    }

    return defaultConstraints;
  }

  /**
   * 构建输出格式
   */
  buildOutputFormat(preferences: UserPreferences): OutputFormat {
    const baseStructure = [
      "# 标题",
      "## 简介",
      "## 核心概念",
      "## 代码示例",
      "## 最佳实践",
      "## 常见问题"
    ];

    if (preferences.detailLevel === 'advanced') {
      baseStructure.splice(4, 0, "## 深入分析", "## 性能考虑");
    }

    if (preferences.detailLevel === 'beginner') {
      baseStructure.splice(2, 0, "## 前置知识");
    }

    return {
      type: preferences.outputFormat,
      structure: baseStructure
    };
  }

  /**
   * 构建完整上下文配置
   */
  buildContext(request: GenerationRequest, memory?: Memory): ContextConfig {
    // 设置默认偏好
    const preferences: UserPreferences = {
      codeLanguage: 'javascript',
      detailLevel: 'intermediate',
      outputFormat: 'markdown',
      includeExamples: true,
      exampleCount: 2,
      ...request.preferences
    };

    // 构建各个组件
    const systemPrompt = this.buildSystemPrompt(preferences);
    const examples = this.selectExamples(request.topic, preferences);
    const constraints = this.buildConstraints(request);
    const outputFormat = this.buildOutputFormat(preferences);

    // 创建默认内存
    const defaultMemory: Memory = {
      generatedSections: [],
      userPreferences: preferences,
      sessionHistory: [],
      ...memory
    };

    return {
      systemPrompt,
      examples,
      memory: defaultMemory,
      ragConfig: {
        enabled: false, // 暂时禁用，后续可以实现
        sources: [],
        topK: 3
      },
      tools: [], // 暂时为空，后续可以添加
      constraints,
      outputFormat,
      userQuery: request.customPrompt || `生成关于 ${request.topic} 的技术文档`
    };
  }

  /**
   * 构建最终的消息数组（用于OpenAI API）
   */
  buildMessages(config: ContextConfig): Array<{role: string, content: string}> {
    const messages: Array<{role: string, content: string}> = [];

    // 1. 系统提示
    messages.push({
      role: 'system',
      content: config.systemPrompt
    });

    // 2. Few-shot 示例
    config.examples.forEach(example => {
      messages.push({
        role: 'user',
        content: `请为 "${example.topic}" 生成技术文档`
      });
      messages.push({
        role: 'assistant',
        content: example.doc
      });
    });

    // 3. 约束条件和格式要求
    const constraintsText = `
请按照以下要求生成文档：

**长度要求**: ${config.constraints.length}
**代码示例**: ${config.constraints.codeExamples}
**复杂度**: ${config.constraints.complexity}

**输出结构**:
${config.outputFormat.structure.join('\n')}

**语言偏好**: ${config.memory.userPreferences.codeLanguage}
    `.trim();

    messages.push({
      role: 'user',
      content: constraintsText
    });

    // 4. 用户查询
    messages.push({
      role: 'user',
      content: config.userQuery
    });

    return messages;
  }

  /**
   * 计算上下文的token数量
   */
  calculateTokens(config: ContextConfig): number {
    const messages = this.buildMessages(config);
    return this.tokenCounter.countMessages(messages);
  }

  /**
   * 释放资源
   */
  free() {
    this.tokenCounter.free();
  }
}