import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  webpack: (config, { isServer }) => {
    // 处理 tiktoken WASM 文件
    config.experiments = {
      asyncWebAssembly: true,
      layers: true,
    };

    // 添加 WASM 文件处理规则
    config.module.rules.push({
      test: /\.wasm$/,
      type: 'webassembly/async',
    });

    // 如果是客户端构建，添加 tiktoken 的 fallback
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
      };
    }

    return config;
  },
};

export default nextConfig;
