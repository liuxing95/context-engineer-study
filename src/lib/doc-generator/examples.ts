import { DocExample } from './types';

export const defaultExamples: DocExample[] = [
  {
    topic: "React useState",
    complexity: 'intermediate',
    language: 'javascript',
    doc: `# React useState 钩子

## 简介
useState 是 React 的状态管理钩子，允许函数组件拥有自己的状态。它是最常用的 React Hook 之一。

## 核心概念
- 状态变量：保存组件的当前状态
- 更新函数：用于修改状态的函数
- 初始值：状态的初始值

## 代码示例

### 基础用法
\`\`\`javascript
import React, { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>当前计数: {count}</p>
      <button onClick={() => setCount(count + 1)}>
        增加
      </button>
    </div>
  );
}
\`\`\`

### 函数式更新
\`\`\`javascript
function Counter() {
  const [count, setCount] = useState(0);

  const increment = () => {
    setCount(prevCount => prevCount + 1);
  };

  return (
    <button onClick={increment}>
      点击次数: {count}
    </button>
  );
}
\`\`\`

## 最佳实践
- 使用函数式更新避免闭包陷阱
- 合理拆分状态，避免单个状态过于复杂
- 使用 TypeScript 提供类型安全

## 常见问题
**Q: 为什么状态不立即更新？**
A: setState 是异步的，React 会批量处理状态更新以优化性能。

**Q: 如何更新对象或数组状态？**
A: 需要创建新的对象或数组，而不是直接修改原有的。`
  },
  
  {
    topic: "Express.js 路由",
    complexity: 'intermediate',
    language: 'javascript',
    doc: `# Express.js 路由系统

## 简介
Express.js 路由用于定义应用程序如何响应客户端对特定端点的请求。

## 核心概念
- 路由方法：GET, POST, PUT, DELETE 等
- 路由路径：URL 模式匹配
- 路由处理器：处理请求的函数

## 代码示例

### 基础路由
\`\`\`javascript
const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.post('/users', (req, res) => {
  res.json({ message: '用户创建成功' });
});

app.listen(3000, () => {
  console.log('服务器运行在端口 3000');
});
\`\`\`

### 路由参数
\`\`\`javascript
app.get('/users/:id', (req, res) => {
  const userId = req.params.id;
  res.json({ userId, message: \`获取用户 \${userId}\` });
});

app.get('/posts/:postId/comments/:commentId', (req, res) => {
  const { postId, commentId } = req.params;
  res.json({ postId, commentId });
});
\`\`\`

## 最佳实践
- 使用路由分组和模块化
- 添加适当的错误处理
- 使用中间件进行身份验证

## 常见问题
**Q: 如何处理查询参数？**
A: 使用 req.query 对象访问 URL 查询参数。`
  },

  {
    topic: "Python 装饰器",
    complexity: 'advanced',
    language: 'python',
    doc: `# Python 装饰器

## 简介
装饰器是 Python 的一个强大特性，允许你修改或扩展函数或类的行为，而无需修改其源代码。

## 核心概念
- 高阶函数：接受函数作为参数或返回函数
- 闭包：内部函数访问外部函数的变量
- 语法糖：@decorator 语法

## 代码示例

### 简单装饰器
\`\`\`python
def timer(func):
    import time
    
    def wrapper(*args, **kwargs):
        start = time.time()
        result = func(*args, **kwargs)
        end = time.time()
        print(f"{func.__name__} 执行时间: {end - start:.4f}秒")
        return result
    
    return wrapper

@timer
def slow_function():
    import time
    time.sleep(1)
    return "完成"
\`\`\`

### 带参数的装饰器
\`\`\`python
def retry(max_attempts=3):
    def decorator(func):
        def wrapper(*args, **kwargs):
            for attempt in range(max_attempts):
                try:
                    return func(*args, **kwargs)
                except Exception as e:
                    if attempt == max_attempts - 1:
                        raise e
                    print(f"第 {attempt + 1} 次尝试失败: {e}")
            
        return wrapper
    return decorator

@retry(max_attempts=3)
def unreliable_function():
    import random
    if random.random() < 0.7:
        raise Exception("随机失败")
    return "成功"
\`\`\`

## 最佳实践
- 使用 functools.wraps 保持原函数元数据
- 合理使用装饰器，避免过度复杂化
- 考虑性能影响

## 常见问题
**Q: 如何在装饰器中保持原函数的元数据？**
A: 使用 @functools.wraps(func) 装饰包装函数。`
  }
];

export function getExamplesByComplexity(complexity: 'beginner' | 'intermediate' | 'advanced'): DocExample[] {
  return defaultExamples.filter(example => example.complexity === complexity);
}

export function getExamplesByLanguage(language: string): DocExample[] {
  return defaultExamples.filter(example => example.language === language);
}

export function getRelevantExamples(topic: string, count: number = 2): DocExample[] {
  // 简单的相关性匹配 - 可以后续改进为更智能的匹配
  const topicWords = topic.toLowerCase().split(' ');
  const scored = defaultExamples.map(example => {
    const exampleWords = example.topic.toLowerCase().split(' ');
    const score = topicWords.reduce((acc, word) => {
      return acc + (exampleWords.some(ew => ew.includes(word) || word.includes(ew)) ? 1 : 0);
    }, 0);
    return { example, score };
  });

  return scored
    .sort((a, b) => b.score - a.score)
    .slice(0, count)
    .map(item => item.example);
}