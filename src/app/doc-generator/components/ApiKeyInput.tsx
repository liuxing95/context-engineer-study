'use client';

import { useState, useEffect } from 'react';
import { openaiClient } from '../../../lib/openai-client';

interface ApiKeyInputProps {
  onApiKeyChange?: (configured: boolean) => void;
}

export default function ApiKeyInput({ onApiKeyChange }: ApiKeyInputProps) {
  const [apiKey, setApiKey] = useState('');
  const [isConfigured, setIsConfigured] = useState(false);
  const [showInput, setShowInput] = useState(false);

  useEffect(() => {
    const configured = openaiClient.isConfigured();
    setIsConfigured(configured);
    onApiKeyChange?.(configured);
  }, [onApiKeyChange]);

  const handleSetApiKey = () => {
    if (apiKey.trim()) {
      try {
        openaiClient.setApiKey(apiKey.trim());
        setIsConfigured(true);
        setShowInput(false);
        setApiKey('');
        onApiKeyChange?.(true);
      } catch (error) {
        console.error('设置 API Key 失败:', error);
      }
    }
  };

  const handleClearApiKey = () => {
    setIsConfigured(false);
    setShowInput(false);
    setApiKey('');
    onApiKeyChange?.(false);
  };

  if (isConfigured) {
    return (
      <div className="bg-green-50 p-4 rounded-lg border border-green-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="w-3 h-3 bg-green-500 rounded-full mr-3"></div>
            <span className="text-green-800 font-medium">OpenAI API 已连接</span>
          </div>
          <button
            onClick={handleClearApiKey}
            className="text-green-600 hover:text-green-800 text-sm underline"
          >
            重新配置
          </button>
        </div>
        <p className="text-green-700 text-sm mt-1">
          现在可以使用真实的 GPT-4o Mini 生成高质量文档
        </p>
      </div>
    );
  }

  return (
    <div className="bg-amber-50 p-4 rounded-lg border border-amber-200">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center">
          <div className="w-3 h-3 bg-amber-500 rounded-full mr-3"></div>
          <span className="text-amber-800 font-medium">OpenAI API 未配置</span>
        </div>
        <button
          onClick={() => setShowInput(!showInput)}
          className="text-amber-600 hover:text-amber-800 text-sm underline"
        >
          {showInput ? '取消' : '配置 API Key'}
        </button>
      </div>
      
      {showInput && (
        <div className="space-y-3">
          <div>
            <label htmlFor="api-key" className="block text-sm font-medium text-amber-800 mb-1">
              OpenAI API Key
            </label>
            <div className="flex gap-2">
              <input
                type="password"
                id="api-key"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                placeholder="sk-..."
                className="flex-1 px-3 py-2 border border-amber-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 text-sm"
              />
              <button
                onClick={handleSetApiKey}
                disabled={!apiKey.trim()}
                className="px-4 py-2 bg-amber-600 text-white rounded-md hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-amber-500 disabled:opacity-50 disabled:cursor-not-allowed text-sm font-medium"
              >
                设置
              </button>
            </div>
          </div>
          <div className="text-xs text-amber-700 space-y-1">
            <p>• 获取 API Key: <a href="https://platform.openai.com/api-keys" target="_blank" rel="noopener noreferrer" className="underline">https://platform.openai.com/api-keys</a></p>
            <p>• 或者设置环境变量: OPENAI_API_KEY</p>
            <p>• API Key 仅存储在浏览器内存中，刷新页面后需重新输入</p>
          </div>
        </div>
      )}
      
      {!showInput && (
        <p className="text-amber-700 text-sm">
          未配置 API Key，将使用模拟内容进行演示
        </p>
      )}
    </div>
  );
}