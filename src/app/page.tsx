import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Context Engineer Study
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Token 计数和上下文工程工具集
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">
          <Link
            href="/token-counter"
            className="bg-white p-6 rounded-lg shadow-sm border hover:shadow-md transition-shadow"
          >
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              🔢 实时 Token 计数器
            </h2>
            <p className="text-gray-600">
              实时计算文本的 token 数量，支持多种 LLM 模型，包含成本估算功能
            </p>
          </Link>

          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              📊 上下文分析工具
            </h2>
            <p className="text-gray-600 mb-4">
              分析和优化 AI 对话的上下文使用效率
            </p>
            <span className="text-sm text-gray-500">即将推出</span>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              💡 提示工程助手
            </h2>
            <p className="text-gray-600 mb-4">
              帮助优化 AI 提示词，提高响应质量和效率
            </p>
            <span className="text-sm text-gray-500">即将推出</span>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              📈 使用统计面板
            </h2>
            <p className="text-gray-600 mb-4">
              跟踪和分析 token 使用模式，优化成本控制
            </p>
            <span className="text-sm text-gray-500">即将推出</span>
          </div>
        </div>

        <div className="mt-12 bg-white p-6 rounded-lg shadow-sm border">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">功能特性</h3>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 text-gray-600">
            <li className="flex items-center">
              ✅ 支持多种 OpenAI 模型
            </li>
            <li className="flex items-center">
              ✅ 实时 token 计数
            </li>
            <li className="flex items-center">
              ✅ 成本估算和预算控制
            </li>
            <li className="flex items-center">
              ✅ Chat Completion 格式支持
            </li>
            <li className="flex items-center">
              ✅ 响应式设计
            </li>
            <li className="flex items-center">
              ✅ TypeScript 支持
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
