import OpenAI from 'openai';

/**
 * OpenAI 客户端配置和管理
 */
export class OpenAIClient {
  private client: OpenAI | null = null;
  private apiKey: string | null = null;

  constructor() {
    this.initializeClient();
  }

  /**
   * 初始化 OpenAI 客户端
   */
  private initializeClient() {
    // 尝试从环境变量获取 API Key
    this.apiKey = process.env.OPENAI_API_KEY || 
                  process.env.NEXT_PUBLIC_OPENAI_API_KEY || 
                  null;

    if (this.apiKey) {
      this.client = new OpenAI({
        apiKey: this.apiKey,
        dangerouslyAllowBrowser: true, // 允许在浏览器中使用
        timeout: 10000, // 10秒超时
      });
    }
  }

  /**
   * 手动设置 API Key
   */
  setApiKey(apiKey: string) {
    this.apiKey = apiKey;
    this.client = new OpenAI({
      apiKey: this.apiKey,
      dangerouslyAllowBrowser: true,
      timeout: 10000, // 10秒超时
    });
  }

  /**
   * 检查客户端是否已配置
   */
  isConfigured(): boolean {
    return this.client !== null && this.apiKey !== null;
  }

  /**
   * 获取 OpenAI 客户端实例
   */
  getClient(): OpenAI {
    if (!this.client) {
      throw new Error('OpenAI client not configured. Please set OPENAI_API_KEY environment variable or call setApiKey()');
    }
    return this.client;
  }

  /**
   * 创建 Chat Completion
   */
  async createChatCompletion(
    messages: Array<{ role: string; content: string }>,
    model: string = 'gpt-4o-mini',
    options?: {
      temperature?: number;
      max_tokens?: number;
      top_p?: number;
      frequency_penalty?: number;
      presence_penalty?: number;
    }
  ) {
    const client = this.getClient();
    
    return await client.chat.completions.create({
      model,
      messages: messages as any,
      temperature: options?.temperature ?? 0.7,
      max_tokens: options?.max_tokens,
      top_p: options?.top_p ?? 1,
      frequency_penalty: options?.frequency_penalty ?? 0,
      presence_penalty: options?.presence_penalty ?? 0,
    });
  }

  /**
   * 获取可用的模型列表
   */
  async getAvailableModels() {
    const client = this.getClient();
    const models = await client.models.list();
    return models.data
      .filter(model => model.id.includes('gpt'))
      .map(model => ({
        id: model.id,
        created: model.created,
        owned_by: model.owned_by
      }));
  }
}

// 创建单例实例
export const openaiClient = new OpenAIClient();

// 导出便捷函数
export async function createChatCompletion(
  messages: Array<{ role: string; content: string }>,
  model: string = 'gpt-4o-mini',
  options?: Parameters<OpenAIClient['createChatCompletion']>[2]
) {
  return openaiClient.createChatCompletion(messages, model, options);
}