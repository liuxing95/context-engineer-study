import { ReActFrameWork } from './base';
import { Action, Observation, ReActStep, Thought } from './types';

export class ReActWithMemory extends ReActFrameWork {
  private shortTermMemory: ReActStep[] = [];
  private longTermMemory: Map<string, any> = new Map();
  private memoryWindow: number = 5;

  constructor(maxIterations: number = 10, memoryWindow: number = 5) {
    super(maxIterations);
    this.memoryWindow = memoryWindow;
  }

  async execute(question: string, model: any): Promise<any> {
    // 检查长期记忆中是否有相似问题
    const cachedAnswer = this.checkLongTermMemory(question);
    if (cachedAnswer) {
      return {
        answer: cachedAnswer,
        steps: [],
        iterations: 0,
        fromCache: true,
      };
    }

    const result = await super.execute(question, model);

    // 存储到长期记忆
    this.storeLongTermMemory(question, result);

    return result;
  }

  protected updateContext(
    currentContext: string,
    thought: Thought,
    action: Action,
    observation: Observation,
  ): string {
    // 更新短期记忆
    this.shortTermMemory.push({ thought, action, observation });

    // 保持记忆窗口大小
    if (this.shortTermMemory.length > this.memoryWindow) {
      this.shortTermMemory.shift();
    }

    // 构建包含记忆的上下文
    let contextWithMemory = currentContext + '\n\nRecent memory:\n';

    this.shortTermMemory.forEach((step, i) => {
      contextWithMemory += `Memory ${i + 1}: ${step.thought.content}\n`;
    });

    return contextWithMemory;
  }

  private checkLongTermMemory(question: string): any {
    // 简化的相似度检查
    for (const [key, value] of this.longTermMemory) {
      if (this.calculateSimilarity(question, key) > 0.9) {
        return value.answer;
      }
    }
    return null;
  }

  private storeLongTermMemory(question: string, result: any): void {
    this.longTermMemory.set(question, result);

    // 限制长期记忆大小
    if (this.longTermMemory.size > 100) {
      const firstKey = this.longTermMemory.keys().next().value;
      this.longTermMemory.delete(firstKey!);
    }
  }

  private calculateSimilarity(str1: string, str2: string): number {
    // 简化的相似度计算
    const words1 = new Set(str1.toLowerCase().split(' '));
    const words2 = new Set(str2.toLowerCase().split(' '));

    const intersection = new Set([...words1].filter((x) => words2.has(x)));
    const union = new Set([...words1, ...words2]);

    return intersection.size / union.size;
  }
}
