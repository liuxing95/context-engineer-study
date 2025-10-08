import { ContextBuilder } from './context-builder';
import { openaiClient } from '../openai-client';
import {
  GenerationRequest,
  GenerationResponse,
  Memory,
  ContextConfig,
  UserPreferences,
} from './types';

export class DocumentationGenerator {
  private contextBuilder: ContextBuilder;
  private memory: Memory;

  constructor(model: string = 'gpt-4o-mini') {
    this.contextBuilder = new ContextBuilder(model);
    this.memory = {
      generatedSections: [],
      userPreferences: {
        codeLanguage: 'javascript',
        detailLevel: 'intermediate',
        outputFormat: 'markdown',
        includeExamples: true,
        exampleCount: 2,
      },
      sessionHistory: [],
    };
  }

  /**
   * 更新用户偏好
   */
  updatePreferences(preferences: Partial<UserPreferences>) {
    this.memory.userPreferences = {
      ...this.memory.userPreferences,
      ...preferences,
    };
  }

  /**
   * 生成技术文档上下文（不包含实际的LLM调用）
   */
  async generateContext(request: GenerationRequest): Promise<{
    context: ContextConfig;
    messages: Array<{ role: string; content: string }>;
    tokenCount: number;
  }> {
    const startTime = Date.now();

    // 构建上下文
    const context = this.contextBuilder.buildContext(request, this.memory);

    // 构建消息
    const messages = this.contextBuilder.buildMessages(context);

    // 计算token数量
    const tokenCount = this.contextBuilder.calculateTokens(context);

    // 更新内存
    this.memory.sessionHistory.push(request.topic);

    return {
      context,
      messages,
      tokenCount,
    };
  }

  /**
   * 生成技术文档（调用 OpenAI API）
   */
  async generateDocumentation(request: GenerationRequest): Promise<GenerationResponse> {
    const startTime = Date.now();

    const { context, messages, tokenCount } = await this.generateContext(request);

    try {
      // 检查 OpenAI 客户端是否已配置
      if (!openaiClient.isConfigured()) {
        // 如果没有配置 API Key，返回模拟内容
        const mockContent = this.generateMockDocumentation(request.topic, context);
        const generationTime = Date.now() - startTime;
        
        return {
          content: mockContent,
          metadata: {
            tokenCount,
            generationTime,
            model: 'mock-gpt-4o-mini',
            examples_used: context.examples.map((ex) => ex.topic),
          },
        };
      }

      // 调用实际的 OpenAI API
      const response = await openaiClient.createChatCompletion(
        messages,
        'gpt-4o-mini',
        {
          temperature: 0.7,
          max_tokens: 2000,
        }
      );

      const generationTime = Date.now() - startTime;

      // 更新内存
      this.memory.generatedSections.push(request.topic);

      return {
        content: response.choices[0].message.content || '',
        metadata: {
          tokenCount,
          generationTime,
          model: 'gpt-4o-mini',
          examples_used: context.examples.map((ex) => ex.topic),
        },
      };
    } catch (error) {
      console.warn('OpenAI API 调用失败，使用模拟内容:', error);
      
      // API 调用失败时的降级处理
      const mockContent = this.generateMockDocumentation(request.topic, context);
      const generationTime = Date.now() - startTime;
      
      return {
        content: mockContent + '\n\n⚠️ 注意：由于 API 调用失败，此内容为模拟生成',
        metadata: {
          tokenCount,
          generationTime,
          model: 'fallback-mock',
          examples_used: context.examples.map((ex) => ex.topic),
        },
      };
    }
  }

  /**
   * 生成模拟文档内容（用于演示）
   */
  private generateMockDocumentation(topic: string, context: ContextConfig): string {
    const { outputFormat, constraints, memory } = context;

    return `# ${topic}

## 简介
${topic} 是现代开发中的重要技术。本文档将详细介绍其核心概念、使用方法和最佳实践。

## 核心概念
- **基础概念**: ${topic} 的基本原理和作用
- **应用场景**: 主要的使用场景和适用环境
- **技术优势**: 相比其他方案的优势

## 代码示例

### 基础用法
\`\`\`${memory.userPreferences.codeLanguage}
// ${topic} 基础示例
function example() {
  // 这里是示例代码
  console.log('${topic} 示例');
}
\`\`\`

### 进阶用法
\`\`\`${memory.userPreferences.codeLanguage}
// ${topic} 进阶示例
class Advanced${topic.replace(/\s+/g, '')} {
  constructor() {
    this.initialize();
  }
  
  initialize() {
    // 初始化逻辑
  }
}
\`\`\`

## 最佳实践
- 遵循官方推荐的使用方式
- 注意性能优化和错误处理
- 保持代码的可读性和可维护性

## 常见问题

**Q: 如何快速上手 ${topic}？**
A: 建议从基础概念开始，逐步学习核心功能。

**Q: 有哪些需要注意的坑？**
A: 主要注意版本兼容性和配置细节。

---
*文档生成时间: ${new Date().toLocaleString()}*
*复杂度级别: ${memory.userPreferences.detailLevel}*`;
  }

  /**
   * 获取当前内存状态
   */
  getMemory(): Memory {
    return { ...this.memory };
  }

  /**
   * 重置内存
   */
  resetMemory() {
    this.memory = {
      generatedSections: [],
      userPreferences: this.memory.userPreferences, // 保留用户偏好
      sessionHistory: [],
    };
  }

  /**
   * 释放资源
   */
  free() {
    this.contextBuilder.free();
  }
}

// 导出类型和主要组件
export * from './types';
export * from './examples';
export { ContextBuilder } from './context-builder';
