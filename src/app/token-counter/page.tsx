'use client';

import { useState, useEffect, useMemo } from 'react';
import { ChatTokenCounter } from '../../lib/token-counter';

export default function TokenCounterPage() {
  const [inputText, setInputText] = useState('');
  const [messages, setMessages] = useState([
    { role: 'system', content: 'You are a helpful assistant.' },
    { role: 'user', content: '' }
  ]);
  const [selectedModel, setSelectedModel] = useState('gpt-4o-mini');
  const [counter, setCounter] = useState<ChatTokenCounter | null>(null);

  // Initialize counter when model changes
  useEffect(() => {
    if (counter) {
      counter.free();
    }
    const newCounter = new ChatTokenCounter(selectedModel);
    setCounter(newCounter);

    return () => {
      if (newCounter) {
        newCounter.free();
      }
    };
  }, [selectedModel]);

  // Update messages when input changes
  useEffect(() => {
    setMessages(prev => [
      prev[0], // Keep system message
      { role: 'user', content: inputText }
    ]);
  }, [inputText]);

  // Calculate token counts
  const tokenData = useMemo(() => {
    if (!counter) return null;

    const totalTokens = counter.countMessages(messages);
    const inputTokens = counter.count(inputText);
    const systemTokens = counter.count(messages[0].content);
    
    return {
      totalTokens,
      inputTokens,
      systemTokens,
      messageOverhead: totalTokens - inputTokens - systemTokens
    };
  }, [counter, messages, inputText]);

  const models = [
    { value: 'gpt-4o-mini', label: 'GPT-4o Mini' },
    { value: 'gpt-4o', label: 'GPT-4o' },
    { value: 'gpt-4', label: 'GPT-4' },
    { value: 'gpt-4-turbo', label: 'GPT-4 Turbo' },
    { value: 'gpt-3.5-turbo', label: 'GPT-3.5 Turbo' },
    { value: 'gpt-4-32k', label: 'GPT-4 32K' }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-6">
            实时 Token 计数器
          </h1>

          {/* Model Selection */}
          <div className="mb-6">
            <label htmlFor="model-select" className="block text-sm font-medium text-gray-700 mb-2">
              选择模型
            </label>
            <select
              id="model-select"
              value={selectedModel}
              onChange={(e) => setSelectedModel(e.target.value)}
              className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              {models.map((model) => (
                <option key={model.value} value={model.value}>
                  {model.label}
                </option>
              ))}
            </select>
          </div>

          {/* Text Input */}
          <div className="mb-6">
            <label htmlFor="text-input" className="block text-sm font-medium text-gray-700 mb-2">
              输入文本
            </label>
            <textarea
              id="text-input"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="在这里输入您的文本，系统会实时计算 token 数量..."
              rows={8}
              className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
            />
            <p className="mt-1 text-sm text-gray-500">
              字符数: {inputText.length}
            </p>
          </div>

          {/* Token Count Display */}
          {tokenData && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                <h3 className="text-sm font-medium text-blue-800 mb-1">总 Token 数</h3>
                <p className="text-2xl font-bold text-blue-900">{tokenData.totalTokens}</p>
              </div>
              <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                <h3 className="text-sm font-medium text-green-800 mb-1">用户输入</h3>
                <p className="text-2xl font-bold text-green-900">{tokenData.inputTokens}</p>
              </div>
              <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                <h3 className="text-sm font-medium text-yellow-800 mb-1">系统提示</h3>
                <p className="text-2xl font-bold text-yellow-900">{tokenData.systemTokens}</p>
              </div>
              <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
                <h3 className="text-sm font-medium text-purple-800 mb-1">消息开销</h3>
                <p className="text-2xl font-bold text-purple-900">{tokenData.messageOverhead}</p>
              </div>
            </div>
          )}

          {/* Cost Estimation */}
          {tokenData && counter && (
            <div className="bg-gray-50 p-4 rounded-lg border">
              <h3 className="text-sm font-medium text-gray-800 mb-2">成本估算</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <p className="text-xs text-gray-600">输入成本</p>
                  <p className="text-lg font-semibold text-gray-900">
                    ${((tokenData.totalTokens / 1000) * (counter.prices[selectedModel]?.input || 0)).toFixed(6)}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-600">预估输出成本 (1000 tokens)</p>
                  <p className="text-lg font-semibold text-gray-900">
                    ${((1000 / 1000) * (counter.prices[selectedModel]?.output || 0)).toFixed(6)}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-600">总预估成本</p>
                  <p className="text-lg font-semibold text-gray-900">
                    ${(
                      (tokenData.totalTokens / 1000) * (counter.prices[selectedModel]?.input || 0) +
                      (1000 / 1000) * (counter.prices[selectedModel]?.output || 0)
                    ).toFixed(6)}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Messages Preview */}
          <div className="mt-6">
            <h3 className="text-sm font-medium text-gray-800 mb-2">消息结构预览</h3>
            <div className="bg-gray-50 p-4 rounded-lg border max-h-40 overflow-y-auto">
              <pre className="text-xs text-gray-700 whitespace-pre-wrap">
                {JSON.stringify(messages, null, 2)}
              </pre>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}