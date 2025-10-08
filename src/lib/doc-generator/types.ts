export interface DocExample {
  topic: string;
  doc: string;
  complexity?: 'beginner' | 'intermediate' | 'advanced';
  language?: string;
}

export interface Memory {
  generatedSections: string[];
  userPreferences: UserPreferences;
  sessionHistory: string[];
}

export interface UserPreferences {
  codeLanguage: string;
  detailLevel: 'beginner' | 'intermediate' | 'advanced';
  outputFormat: 'markdown' | 'html' | 'json';
  includeExamples: boolean;
  exampleCount: number;
}

export interface RAGConfig {
  enabled: boolean;
  sources: string[];
  topK: number;
  threshold?: number;
}

export interface Tool {
  name: string;
  description: string;
  parameters?: Record<string, any>;
}

export interface Constraints {
  length: string;
  codeExamples: string;
  complexity: string;
  maxTokens?: number;
}

export interface OutputFormat {
  type: 'markdown' | 'html' | 'json';
  structure: string[];
  template?: string;
}

export interface ContextConfig {
  systemPrompt: string;
  examples: DocExample[];
  memory: Memory;
  ragConfig: RAGConfig;
  tools: Tool[];
  constraints: Constraints;
  outputFormat: OutputFormat;
  userQuery: string;
}

export interface GenerationRequest {
  topic: string;
  preferences?: Partial<UserPreferences>;
  constraints?: Partial<Constraints>;
  customPrompt?: string;
}

export interface GenerationResponse {
  content: string;
  metadata: {
    tokenCount: number;
    generationTime: number;
    model: string;
    examples_used: string[];
  };
}