import { Action, Observation, ReActStep, Thought, Tool } from './types';

export class ReActFrameWork {
  private tools: Map<string, Tool> = new Map();
  private maxIterations: number = 10;
  private history: ReActStep[] = [];

  constructor(maxIterations: number = 10) {
    this.maxIterations = maxIterations;
  }

  // 注册工具
  registerTool(tool: Tool): void {
    this.tools.set(tool.name, tool);
  }

  // 主执行循环
  async execute(
    question: string,
    model: any,
  ): Promise<{
    answer: string;
    steps: ReActStep[];
    iterations: number;
  }> {
    this.history = [];
    let currentContext = question;
    let iterations = 0;

    while (iterations < this.maxIterations) {
      iterations++;

      // 1. 思考阶段
      const thought = await this.think(currentContext, model);

      // 检查是否已得出最终答案
      if (this.isFinalAnswer(thought)) {
        return {
          answer: this.extractAnswer(thought.content),
          steps: this.history,
          iterations,
        };
      }

      // 2. 行动阶段
      const action = await this.act(thought, model);

      // 3. 观察阶段
      const observation = await this.observe(action);

      // 记录步骤
      this.history.push({ thought, action, observation });

      // 更新上下文
      currentContext = this.updateContext(currentContext, thought, action, observation);
    }

    // 达到最大迭代次数，返回当前最佳答案
    return {
      answer: '达到最大迭代次数，未能完全解决问题',
      steps: this.history,
      iterations,
    };
  }

  private async think(context: string, model: any): Promise<Thought> {
    const prompt = this.buildThoughtPrompt(context);

    const response = await model.generate(prompt);

    return {
      content: response,
      timestamp: new Date(),
    };
  }

  private async act(thought: Thought, model: any): Promise<Action> {
    const prompt = this.buildActionPrompt(thought);
    const response = await model.generate(prompt);

    return this.parseAction(response);
  }

  private async observe(action: Action): Promise<Observation> {
    const tool = this.tools.get(action.tool);

    if (!tool) {
      return {
        result: null,
        success: false,
        error: `Tool ${action.tool} not found`,
      };
    }

    try {
      const result = await tool.execute(action.input);
      return {
        result,
        success: true,
      };
    } catch (error: any) {
      return {
        result: null,
        success: false,
        error: error.message,
      };
    }
  }

  private buildThoughtPrompt(context: string): string {
    let prompt = `Given the current context, think about what to do next.

Context: ${context}

`;

    if (this.history.length > 0) {
      prompt += 'Previous steps:\n';
      this.history.forEach((step, i) => {
        prompt += `Step ${i + 1}:
  Thought: ${step.thought.content}
  Action: ${step.action.tool}(${JSON.stringify(step.action.input)})
  Observation: ${JSON.stringify(step.observation.result)}
`;
      });
    }

    prompt += '\nThought:';
    return prompt;
  }

  private buildActionPrompt(thought: Thought): string {
    const toolList = Array.from(this.tools.values())
      .map((t) => `- ${t.name}: ${t.description}`)
      .join('\n');

    return `Based on your thought, choose an action.

Thought: ${thought.content}

Available tools:
${toolList}

Action (format: tool_name(input)):`;
  }

  private parseAction(response: string): Action {
    // 解析格式: tool_name(input)
    const match = response.match(/(\w+)\((.*)\)/);
    if (!match) {
      throw new Error(`Invalid action format: ${response}`);
    }

    return {
      type: 'tool_call',
      tool: match[1],
      input: JSON.parse(match[2] || '{}'),
    };
  }

  private isFinalAnswer(thought: Thought): boolean {
    const indicators = ['final answer is', 'therefore, the answer', '结论是', '最终答案'];

    const content = thought.content.toLowerCase();
    return indicators.some((indicator) => content.includes(indicator));
  }

  private extractAnswer(thoughtContent: string): string {
    // 提取最终答案的逻辑
    const match = thoughtContent.match(/(?:answer is|答案是)[:\s]*(.+)/i);
    return match ? match[1].trim() : thoughtContent;
  }

  private updateContext(
    currentContext: string,
    thought: Thought,
    action: Action,
    observation: Observation,
  ): string {
    return `${currentContext}

Thought: ${thought.content}
Action: ${action.tool}(${JSON.stringify(action.input)})
Observation: ${JSON.stringify(observation.result)}`;
  }
}
