// ============================================
// Token 计数工具集 - 基于 tiktoken
// ============================================

import { encoding_for_model, TiktokenModel } from 'tiktoken';

// ============================================
// 1. 基础 Token 计数器
// ============================================

export class TokenCounter {
  model: string;
  encoder: any;
  prices: Record<string, { input: number; output: number }>;

  constructor(model = 'gpt-4o-mini') {
    this.model = model;
    this.encoder = encoding_for_model(model as TiktokenModel);
    this.prices = {
      'gpt-4o-mini': { input: 0.00015, output: 0.0006 },
      'gpt-4o': { input: 0.0025, output: 0.01 },
      'gpt-4': { input: 0.03, output: 0.06 },
      'gpt-4-turbo': { input: 0.01, output: 0.03 },
      'gpt-3.5-turbo': { input: 0.0005, output: 0.0015 },
      'gpt-4-32k': { input: 0.06, output: 0.12 },
    };
  }

  // 计算文本的 token 数量
  count(text: string): number {
    if (!text) return 0;
    return this.encoder.encode(text).length;
  }

  // 计算多段文本
  countMultiple(texts: string[]): number {
    return texts.reduce((total, text) => total + this.count(text), 0);
  }

  // 计算成本
  calculateCost(inputText: string, outputText: string) {
    const inputTokens = this.count(inputText);
    const outputTokens = this.count(outputText);
    const price = this.prices[this.model] || this.prices['gpt-4o-mini'];

    return {
      inputTokens,
      outputTokens,
      totalTokens: inputTokens + outputTokens,
      inputCost: (inputTokens / 1000) * price.input,
      outputCost: (outputTokens / 1000) * price.output,
      totalCost: (inputTokens / 1000) * price.input + (outputTokens / 1000) * price.output,
    };
  }

  // 释放内存
  free() {
    this.encoder.free();
  }
}

// ============================================
// 2. Chat Completion 专用计数器
// ============================================

export class ChatTokenCounter extends TokenCounter {
  // 计算 Chat Completion 格式的 messages
  countMessages(messages: Array<{ role: string; content: string; name?: string }>): number {
    let totalTokens = 0;

    // 每个消息的固定开销
    const tokensPerMessage = 3;
    // 每个 name 字段的开销
    const tokensPerName = 1;

    for (const message of messages) {
      totalTokens += tokensPerMessage;

      // 计算各字段的 tokens
      if (message.role) {
        totalTokens += this.count(message.role);
      }
      if (message.content) {
        totalTokens += this.count(message.content);
      }
      if (message.name) {
        totalTokens += this.count(message.name);
        totalTokens += tokensPerName;
      }
    }

    // 对话结束时的特殊 token
    totalTokens += 3;

    return totalTokens;
  }

  // 估算回复的 token 预留空间
  estimateReplyTokens(
    maxTokens: number,
    messages: Array<{ role: string; content: string; name?: string }>,
  ): number {
    const messageTokens = this.countMessages(messages);
    return Math.max(0, maxTokens - messageTokens);
  }
}
