// ReAct框架的核心类型
export interface Thought {
  content: string;
  timestamp: Date;
}

export interface Action {
  type: string;
  tool: string;
  input: any;
}

export interface Observation {
  result: any;
  success: boolean;
  error?: string;
}

export interface ReActStep {
  thought: Thought;
  action: Action;
  observation: Observation;
}

// 工具接口
export interface Tool {
  name: string;
  description: string;
  execute(input: any): Promise<any>;
}
