// Example: Basic Documentation Generator Usage
import { DocumentationGenerator } from '../../src/lib/doc-generator';

async function basicExample() {
  // 初始化文档生成器
  const generator = new DocumentationGenerator('gpt-4o-mini');

  // 设置用户偏好
  generator.updatePreferences({
    codeLanguage: 'typescript',
    detailLevel: 'intermediate',
    outputFormat: 'markdown',
    exampleCount: 2
  });

  // 生成文档
  const request = {
    topic: 'React useEffect Hook',
    preferences: {
      detailLevel: 'intermediate' as const,
      codeLanguage: 'javascript'
    }
  };

  try {
    const response = await generator.generateDocumentation(request);
    
    console.log('Generated Documentation:');
    console.log(response.content);
    
    console.log('\nMetadata:');
    console.log(`Token Count: ${response.metadata.tokenCount}`);
    console.log(`Generation Time: ${response.metadata.generationTime}ms`);
    console.log(`Examples Used: ${response.metadata.examples_used.join(', ')}`);
    
  } catch (error) {
    console.error('Error generating documentation:', error);
  } finally {
    // 清理资源
    generator.free();
  }
}

// 运行示例
basicExample();