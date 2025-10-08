// Example: Context Analysis and Token Optimization
import { DocumentationGenerator, ContextBuilder } from '../../src/lib/doc-generator';

async function contextAnalysisExample() {
  const generator = new DocumentationGenerator('gpt-4o-mini');
  
  // 分析不同配置对 token 使用的影响
  const topics = ['React Hooks', 'Node.js Streams', 'TypeScript Generics'];
  const configurations = [
    { detailLevel: 'beginner' as const, exampleCount: 1 },
    { detailLevel: 'intermediate' as const, exampleCount: 2 },
    { detailLevel: 'advanced' as const, exampleCount: 3 }
  ];

  console.log('📊 Context Analysis Report\n');
  console.log('Topic'.padEnd(20) + 'Level'.padEnd(15) + 'Examples'.padEnd(10) + 'Tokens');
  console.log('='.repeat(60));

  for (const topic of topics) {
    for (const config of configurations) {
      const request = {
        topic,
        preferences: {
          detailLevel: config.detailLevel,
          exampleCount: config.exampleCount,
          codeLanguage: 'javascript',
          outputFormat: 'markdown' as const,
          includeExamples: true
        }
      };

      try {
        const context = await generator.generateContext(request);
        
        console.log(
          topic.padEnd(20) + 
          config.detailLevel.padEnd(15) + 
          config.exampleCount.toString().padEnd(10) + 
          context.tokenCount
        );
        
      } catch (error) {
        console.error(`Error analyzing ${topic}:`, error);
      }
    }
    console.log('-'.repeat(60));
  }

  // 分析内存使用
  const memory = generator.getMemory();
  console.log('\n📝 Memory Status:');
  console.log(`Generated Sections: ${memory.generatedSections.length}`);
  console.log(`Session History: ${memory.sessionHistory.length}`);
  console.log(`User Preferences:`, memory.userPreferences);

  generator.free();
}

// 运行分析
contextAnalysisExample();