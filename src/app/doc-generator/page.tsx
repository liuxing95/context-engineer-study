'use client';

import { useState, useEffect } from 'react';
import { DocumentationGenerator, GenerationRequest, GenerationResponse, UserPreferences } from '../../lib/doc-generator';
import ApiKeyInput from './components/ApiKeyInput';

export default function DocGeneratorPage() {
  const [generator, setGenerator] = useState<DocumentationGenerator | null>(null);
  const [topic, setTopic] = useState('');
  const [preferences, setPreferences] = useState<UserPreferences>({
    codeLanguage: 'javascript',
    detailLevel: 'intermediate',
    outputFormat: 'markdown',
    includeExamples: true,
    exampleCount: 2
  });
  
  const [generatedDoc, setGeneratedDoc] = useState<GenerationResponse | null>(null);
  const [contextInfo, setContextInfo] = useState<any>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [customPrompt, setCustomPrompt] = useState('');
  const [apiConfigured, setApiConfigured] = useState(false);

  // 初始化生成器
  useEffect(() => {
    const docGen = new DocumentationGenerator('gpt-4o-mini');
    setGenerator(docGen);

    return () => {
      docGen.free();
    };
  }, []);

  // 更新偏好设置
  useEffect(() => {
    if (generator) {
      generator.updatePreferences(preferences);
    }
  }, [generator, preferences]);

  const handleGenerate = async () => {
    if (!generator || !topic.trim()) return;

    setIsGenerating(true);
    try {
      const request: GenerationRequest = {
        topic: topic.trim(),
        preferences,
        customPrompt: customPrompt.trim() || undefined
      };

      // 首先获取上下文信息用于显示
      const contextData = await generator.generateContext(request);
      setContextInfo(contextData);

      // 然后生成文档
      const response = await generator.generateDocumentation(request);
      setGeneratedDoc(response);
    } catch (error) {
      console.error('生成文档时出错:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  const handlePreferenceChange = <K extends keyof UserPreferences>(
    key: K,
    value: UserPreferences[K]
  ) => {
    setPreferences(prev => ({
      ...prev,
      [key]: value
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-6">
            🤖 技术文档生成助手
          </h1>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* 左侧：配置面板 */}
            <div className="space-y-6">
              {/* API Key 配置 */}
              <ApiKeyInput onApiKeyChange={setApiConfigured} />
              {/* 主题输入 */}
              <div>
                <label htmlFor="topic" className="block text-sm font-medium text-gray-700 mb-2">
                  技术主题 *
                </label>
                <input
                  type="text"
                  id="topic"
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  placeholder="例如：React Hooks、Express.js 路由、Python 装饰器"
                  className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              {/* 偏好设置 */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="text-lg font-medium text-gray-900 mb-4">偏好设置</h3>
                
                <div className="grid grid-cols-1 gap-4">
                  {/* 编程语言 */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      代码语言
                    </label>
                    <select
                      value={preferences.codeLanguage}
                      onChange={(e) => handlePreferenceChange('codeLanguage', e.target.value)}
                      className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="javascript">JavaScript</option>
                      <option value="typescript">TypeScript</option>
                      <option value="python">Python</option>
                      <option value="java">Java</option>
                      <option value="cpp">C++</option>
                      <option value="go">Go</option>
                    </select>
                  </div>

                  {/* 复杂度级别 */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      复杂度级别
                    </label>
                    <select
                      value={preferences.detailLevel}
                      onChange={(e) => handlePreferenceChange('detailLevel', e.target.value as any)}
                      className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="beginner">初学者</option>
                      <option value="intermediate">中级</option>
                      <option value="advanced">高级</option>
                    </select>
                  </div>

                  {/* 输出格式 */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      输出格式
                    </label>
                    <select
                      value={preferences.outputFormat}
                      onChange={(e) => handlePreferenceChange('outputFormat', e.target.value as any)}
                      className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="markdown">Markdown</option>
                      <option value="html">HTML</option>
                      <option value="json">JSON</option>
                    </select>
                  </div>

                  {/* 示例数量 */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Few-shot 示例数量: {preferences.exampleCount}
                    </label>
                    <input
                      type="range"
                      min="1"
                      max="5"
                      value={preferences.exampleCount}
                      onChange={(e) => handlePreferenceChange('exampleCount', parseInt(e.target.value))}
                      className="w-full"
                    />
                  </div>
                </div>
              </div>

              {/* 自定义提示 */}
              <div>
                <label htmlFor="custom-prompt" className="block text-sm font-medium text-gray-700 mb-2">
                  自定义提示（可选）
                </label>
                <textarea
                  id="custom-prompt"
                  value={customPrompt}
                  onChange={(e) => setCustomPrompt(e.target.value)}
                  placeholder="添加特定的要求或约束..."
                  rows={3}
                  className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
                />
              </div>

              {/* 生成按钮 */}
              <button
                onClick={handleGenerate}
                disabled={!topic.trim() || isGenerating}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isGenerating ? '生成中...' : apiConfigured ? '🚀 生成技术文档 (GPT-4o Mini)' : '🚀 生成技术文档 (演示模式)'}
              </button>
            </div>

            {/* 右侧：上下文信息和预览 */}
            <div className="space-y-6">
              {/* 上下文信息 */}
              {contextInfo && (
                <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                  <h3 className="text-lg font-medium text-blue-900 mb-3">📊 上下文分析</h3>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="font-medium text-blue-800">Token 数量:</span>
                      <span className="ml-2 text-blue-900">{contextInfo.tokenCount}</span>
                    </div>
                    <div>
                      <span className="font-medium text-blue-800">示例数量:</span>
                      <span className="ml-2 text-blue-900">{contextInfo.context.examples.length}</span>
                    </div>
                    <div className="col-span-2">
                      <span className="font-medium text-blue-800">使用的示例:</span>
                      <div className="mt-1">
                        {contextInfo.context.examples.map((ex: any, idx: number) => (
                          <span key={idx} className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded mr-2 mb-1">
                            {ex.topic}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* 生成的文档预览 */}
              {generatedDoc && (
                <div className="bg-white border rounded-lg overflow-hidden">
                  <div className="bg-gray-50 px-4 py-3 border-b">
                    <h3 className="text-lg font-medium text-gray-900">📄 生成的文档</h3>
                    <div className="mt-1 text-sm text-gray-600">
                      生成时间: {generatedDoc.metadata.generationTime}ms | 
                      Token 数量: {generatedDoc.metadata.tokenCount}
                    </div>
                  </div>
                  <div className="p-4 max-h-96 overflow-y-auto">
                    <pre className="whitespace-pre-wrap text-sm text-gray-800 font-mono">
                      {generatedDoc.content}
                    </pre>
                  </div>
                </div>
              )}

              {/* 提示信息 */}
              {!generatedDoc && !isGenerating && (
                <div className="bg-gray-50 p-8 rounded-lg text-center">
                  <div className="text-gray-400 text-4xl mb-4">📝</div>
                  <p className="text-gray-600">
                    输入技术主题，配置偏好设置，然后点击生成按钮开始创建技术文档
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}