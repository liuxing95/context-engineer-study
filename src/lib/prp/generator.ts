/**
 * PRP (Product Requirements Prompt) Generator
 *
 * This module provides utilities to generate comprehensive Product Requirements Prompts
 * that enable one-pass implementation success by AI agents.
 */

import { writeFileSync, readFileSync, existsSync } from 'fs';
import { join } from 'path';
import type {
  PRPContent,
  PRPGeneratorOptions,
  AcceptanceCriteria,
  TechnicalRequirement,
  ImplementationPhase,
  Risk,
  UserStory,
  DesignConsideration,
  Dependency,
  SuccessMetric,
  ValidationGate,
  ResearchContext,
} from './types';

export class PRPGenerator {
  private options: Required<PRPGeneratorOptions>;
  private defaultTemplatePath: string;

  constructor(options: PRPGeneratorOptions = {}) {
    this.defaultTemplatePath = join(process.cwd(), 'PRPs', 'templates', 'base-prp.md');
    this.options = {
      templatePath: options.templatePath || this.defaultTemplatePath,
      outputPath: options.outputPath || join(process.cwd(), 'PRPs'),
      includeArchitectureDiagram: options.includeArchitectureDiagram ?? true,
      includeCodeExamples: options.includeCodeExamples ?? true,
      confidenceThreshold: options.confidenceThreshold ?? 7,
    };
  }

  /**
   * Generate a complete PRP document
   */
  generate(content: PRPContent): string {
    this.validateContent(content);

    const sections = [
      this.generateHeader(content),
      this.generateOverview(content),
      this.generateUserStory(content.userStory),
      this.generateResearchContext(content.researchContext),
      this.generateAcceptanceCriteria(content.acceptanceCriteria),
      this.generateTechnicalRequirements(content.technicalRequirements),
      this.generateDesignConsiderations(content.designConsiderations),
      this.generateDependencies(content.dependencies),
      this.generateSuccessMetrics(content.successMetrics),
      this.generateImplementationTimeline(content.implementationTimeline),
      this.generateValidationGates(content.validationGates),
      this.generateRiskAssessment(content.riskAssessment),
      this.generateConfidenceScore(content.confidenceScore),
      this.generateAdditionalNotes(content.additionalNotes),
    ];

    return sections.filter(Boolean).join('\n\n');
  }

  /**
   * Save PRP to file
   */
  save(content: PRPContent, filename?: string): string {
    const prpContent = this.generate(content);
    const outputFilename = filename || `${this.slugify(content.metadata.featureName)}-prp.md`;
    const outputPath = join(this.options.outputPath, outputFilename);

    writeFileSync(outputPath, prpContent, 'utf-8');
    return outputPath;
  }

  /**
   * Load template file
   */
  loadTemplate(): string | null {
    if (existsSync(this.options.templatePath)) {
      return readFileSync(this.options.templatePath, 'utf-8');
    }
    return null;
  }

  private validateContent(content: PRPContent): void {
    if (!content.metadata?.featureName) {
      throw new Error('Feature name is required');
    }
    if (!content.overview) {
      throw new Error('Overview is required');
    }
    if (!content.userStory) {
      throw new Error('User story is required');
    }
    if (content.confidenceScore !== undefined) {
      if (content.confidenceScore < 1 || content.confidenceScore > 10) {
        throw new Error('Confidence score must be between 1 and 10');
      }
    }
  }

  private generateHeader(content: PRPContent): string {
    const { metadata } = content;
    return `# Product Requirements Prompt (PRP) - ${metadata.featureName}

**Created:** ${metadata.createdAt}${metadata.author ? `\n**Author:** ${metadata.author}` : ''}${metadata.version ? `\n**Version:** ${metadata.version}` : ''}`;
  }

  private generateOverview(content: PRPContent): string {
    return `## Overview\n\n${content.overview}`;
  }

  private generateUserStory(userStory: UserStory): string {
    return `## User Story\n\nAs a **${userStory.actor}**, I want **${userStory.goal}**, so that **${userStory.benefit}**.`;
  }

  private generateResearchContext(context?: ResearchContext): string {
    if (!context) return '';

    const sections: string[] = ['## Research Context'];

    if (context.documentationUrls && context.documentationUrls.length > 0) {
      sections.push('### Documentation References');
      sections.push(context.documentationUrls.map(url => `- ${url}`).join('\n'));
    }

    if (context.codeExamples && context.codeExamples.length > 0) {
      sections.push('### Code Examples');
      sections.push(context.codeExamples.map(example => `- ${example}`).join('\n'));
    }

    if (context.existingPatterns && context.existingPatterns.length > 0) {
      sections.push('### Existing Patterns');
      sections.push(context.existingPatterns.map(pattern => `- ${pattern}`).join('\n'));
    }

    if (context.libraryQuirks && context.libraryQuirks.length > 0) {
      sections.push('### Library Quirks & Gotchas');
      sections.push(context.libraryQuirks.map(quirk => `- ${quirk}`).join('\n'));
    }

    return sections.join('\n\n');
  }

  private generateAcceptanceCriteria(criteria: AcceptanceCriteria[]): string {
    const items = criteria.map(c => `- [${c.completed ? 'x' : ' '}] ${c.description}`).join('\n');
    return `## Acceptance Criteria\n\n${items}`;
  }

  private generateTechnicalRequirements(requirements: TechnicalRequirement[]): string {
    const grouped = this.groupBy(requirements, 'category');
    const sections: string[] = ['## Technical Requirements'];

    for (const [category, items] of Object.entries(grouped)) {
      sections.push(`### ${category}`);
      sections.push(
        items.map(item => {
          const priority = item.priority ? ` *[${item.priority.toUpperCase()}]*` : '';
          return `- [ ] ${item.description}${priority}`;
        }).join('\n')
      );
    }

    return sections.join('\n\n');
  }

  private generateDesignConsiderations(considerations: DesignConsideration[]): string {
    const sections: string[] = ['## Design Considerations'];

    for (const consideration of considerations) {
      sections.push(`### ${consideration.category}`);
      sections.push(consideration.requirements.map(req => `- ${req}`).join('\n'));
    }

    return sections.join('\n\n');
  }

  private generateDependencies(dependencies: Dependency[]): string {
    const grouped = this.groupBy(dependencies, 'type');
    const sections: string[] = ['## Dependencies'];

    for (const [type, items] of Object.entries(grouped)) {
      sections.push(`### ${this.capitalizeFirst(type)}s`);
      sections.push(
        items.map(dep => {
          const version = dep.version ? `@${dep.version}` : '';
          const required = dep.required ? ' **(Required)**' : ' *(Optional)*';
          return `- ${dep.name}${version}${required}`;
        }).join('\n')
      );
    }

    return sections.join('\n\n');
  }

  private generateSuccessMetrics(metrics: SuccessMetric[]): string {
    const sections: string[] = ['## Success Metrics'];

    for (const metric of metrics) {
      sections.push(`### ${metric.category}`);
      sections.push(metric.metrics.map(m => `- ${m}`).join('\n'));
    }

    return sections.join('\n\n');
  }

  private generateImplementationTimeline(phases: ImplementationPhase[]): string {
    const sections: string[] = ['## Implementation Timeline'];

    for (const phase of phases) {
      const duration = phase.duration ? ` (${phase.duration})` : '';
      sections.push(`### Phase ${phase.phase}: ${phase.title}${duration}`);
      sections.push(phase.description);

      if (phase.tasks && phase.tasks.length > 0) {
        sections.push('**Tasks:**');
        sections.push(phase.tasks.map(task => `- [ ] ${task}`).join('\n'));
      }
    }

    return sections.join('\n\n');
  }

  private generateValidationGates(gates?: ValidationGate[]): string {
    if (!gates || gates.length === 0) return '';

    const sections: string[] = ['## Validation Gates'];
    sections.push('Run these commands to validate the implementation:\n');

    for (const gate of gates) {
      const desc = gate.description ? ` - ${gate.description}` : '';
      sections.push(`**${this.capitalizeFirst(gate.type)} Check**${desc}\n\`\`\`bash\n${gate.command}\n\`\`\``);
    }

    return sections.join('\n\n');
  }

  private generateRiskAssessment(risks: Risk[]): string {
    const sections: string[] = ['## Risk Assessment'];

    for (const risk of risks) {
      sections.push(`### ${risk.title}`);
      sections.push(`**Impact:** ${this.capitalizeFirst(risk.impact)} | **Probability:** ${this.capitalizeFirst(risk.probability)}`);
      sections.push(`**Description:** ${risk.description}`);
      sections.push(`**Mitigation:** ${risk.mitigation}`);
    }

    return sections.join('\n\n');
  }

  private generateConfidenceScore(score?: number): string {
    if (score === undefined) return '';

    const level = score >= 8 ? 'High' : score >= 5 ? 'Medium' : 'Low';
    const emoji = score >= 8 ? '🟢' : score >= 5 ? '🟡' : '🔴';

    return `## Implementation Confidence\n\n**Score:** ${emoji} ${score}/10 (${level})\n\n${this.getConfidenceMessage(score)}`;
  }

  private getConfidenceMessage(score: number): string {
    if (score >= 8) {
      return 'This PRP contains comprehensive context and should enable successful one-pass implementation.';
    } else if (score >= 5) {
      return 'This PRP provides good context but may require some clarification during implementation.';
    } else {
      return 'This PRP may need additional research and context before implementation.';
    }
  }

  private generateAdditionalNotes(notes?: string): string {
    if (!notes) return '';
    return `## Additional Notes\n\n${notes}`;
  }

  private groupBy<T extends Record<string, any>>(array: T[], key: keyof T): Record<string, T[]> {
    return array.reduce((result, item) => {
      const groupKey = String(item[key]);
      if (!result[groupKey]) {
        result[groupKey] = [];
      }
      result[groupKey].push(item);
      return result;
    }, {} as Record<string, T[]>);
  }

  private slugify(text: string): string {
    return text
      .toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim();
  }

  private capitalizeFirst(text: string): string {
    return text.charAt(0).toUpperCase() + text.slice(1);
  }
}

/**
 * Convenience function to create a new PRP generator
 */
export function createPRPGenerator(options?: PRPGeneratorOptions): PRPGenerator {
  return new PRPGenerator(options);
}

/**
 * Quick generate function
 */
export function generatePRP(content: PRPContent, options?: PRPGeneratorOptions): string {
  const generator = new PRPGenerator(options);
  return generator.generate(content);
}

/**
 * Quick save function
 */
export function savePRP(content: PRPContent, filename?: string, options?: PRPGeneratorOptions): string {
  const generator = new PRPGenerator(options);
  return generator.save(content, filename);
}
