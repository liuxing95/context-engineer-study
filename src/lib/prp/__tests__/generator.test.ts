/**
 * Unit tests for PRP Generator
 */

import { describe, it, expect, beforeEach, vi } from 'vitest';
import { PRPGenerator, createPRPGenerator, generatePRP } from '../generator';
import type { PRPContent } from '../types';

describe('PRPGenerator', () => {
  let generator: PRPGenerator;
  let mockPRPContent: PRPContent;

  beforeEach(() => {
    generator = new PRPGenerator();

    mockPRPContent = {
      metadata: {
        featureName: 'Test Feature',
        createdAt: '2025-10-10',
        author: 'Test Author',
        version: '1.0.0',
      },
      overview: 'This is a test feature overview',
      userStory: {
        actor: 'developer',
        goal: 'test the PRP generator',
        benefit: 'ensure it works correctly',
      },
      acceptanceCriteria: [
        { description: 'Feature should work', completed: false },
        { description: 'Tests should pass', completed: true },
      ],
      technicalRequirements: [
        {
          category: 'Backend',
          description: 'Implement API endpoint',
          priority: 'high',
        },
        {
          category: 'Frontend',
          description: 'Create UI component',
          priority: 'medium',
        },
      ],
      designConsiderations: [
        {
          category: 'UI/UX',
          requirements: ['Responsive design', 'Accessible interface'],
        },
      ],
      dependencies: [
        {
          name: 'react',
          type: 'library',
          version: '19.1.0',
          required: true,
        },
        {
          name: 'optional-lib',
          type: 'library',
          required: false,
        },
      ],
      successMetrics: [
        {
          category: 'Performance',
          metrics: ['Load time < 2s', 'Response time < 100ms'],
        },
      ],
      implementationTimeline: [
        {
          phase: 1,
          title: 'Setup',
          description: 'Initial setup and configuration',
          duration: '1 week',
          tasks: ['Create project structure', 'Install dependencies'],
        },
      ],
      riskAssessment: [
        {
          title: 'Technical Complexity',
          description: 'Implementation may be complex',
          impact: 'high',
          probability: 'medium',
          mitigation: 'Use proven patterns and thorough testing',
        },
      ],
      confidenceScore: 8,
    };
  });

  describe('Constructor and Options', () => {
    it('should create instance with default options', () => {
      expect(generator).toBeInstanceOf(PRPGenerator);
    });

    it('should create instance with custom options', () => {
      const customGenerator = new PRPGenerator({
        includeArchitectureDiagram: false,
        confidenceThreshold: 5,
      });
      expect(customGenerator).toBeInstanceOf(PRPGenerator);
    });
  });

  describe('Content Validation', () => {
    it('should throw error if feature name is missing', () => {
      const invalidContent = {
        ...mockPRPContent,
        metadata: { ...mockPRPContent.metadata, featureName: '' },
      };

      expect(() => generator.generate(invalidContent)).toThrow('Feature name is required');
    });

    it('should throw error if overview is missing', () => {
      const invalidContent = {
        ...mockPRPContent,
        overview: '',
      };

      expect(() => generator.generate(invalidContent)).toThrow('Overview is required');
    });

    it('should throw error if user story is missing', () => {
      const invalidContent = {
        ...mockPRPContent,
        userStory: null as any,
      };

      expect(() => generator.generate(invalidContent)).toThrow('User story is required');
    });

    it('should throw error if confidence score is out of range', () => {
      const invalidContent = {
        ...mockPRPContent,
        confidenceScore: 15,
      };

      expect(() => generator.generate(invalidContent)).toThrow('Confidence score must be between 1 and 10');
    });

    it('should accept confidence score within valid range', () => {
      const validContent = {
        ...mockPRPContent,
        confidenceScore: 5,
      };

      expect(() => generator.generate(validContent)).not.toThrow();
    });
  });

  describe('PRP Generation', () => {
    it('should generate complete PRP document', () => {
      const result = generator.generate(mockPRPContent);

      expect(result).toContain('# Product Requirements Prompt (PRP) - Test Feature');
      expect(result).toContain('**Created:** 2025-10-10');
      expect(result).toContain('**Author:** Test Author');
      expect(result).toContain('**Version:** 1.0.0');
    });

    it('should include overview section', () => {
      const result = generator.generate(mockPRPContent);

      expect(result).toContain('## Overview');
      expect(result).toContain('This is a test feature overview');
    });

    it('should include user story section', () => {
      const result = generator.generate(mockPRPContent);

      expect(result).toContain('## User Story');
      expect(result).toContain('As a **developer**');
      expect(result).toContain('I want **test the PRP generator**');
      expect(result).toContain('so that **ensure it works correctly**');
    });

    it('should include acceptance criteria with checkboxes', () => {
      const result = generator.generate(mockPRPContent);

      expect(result).toContain('## Acceptance Criteria');
      expect(result).toContain('- [ ] Feature should work');
      expect(result).toContain('- [x] Tests should pass');
    });

    it('should include technical requirements grouped by category', () => {
      const result = generator.generate(mockPRPContent);

      expect(result).toContain('## Technical Requirements');
      expect(result).toContain('### Backend');
      expect(result).toContain('Implement API endpoint');
      expect(result).toContain('*[HIGH]*');
      expect(result).toContain('### Frontend');
      expect(result).toContain('Create UI component');
    });

    it('should include design considerations', () => {
      const result = generator.generate(mockPRPContent);

      expect(result).toContain('## Design Considerations');
      expect(result).toContain('### UI/UX');
      expect(result).toContain('- Responsive design');
      expect(result).toContain('- Accessible interface');
    });

    it('should include dependencies with required/optional indicators', () => {
      const result = generator.generate(mockPRPContent);

      expect(result).toContain('## Dependencies');
      expect(result).toContain('react@19.1.0 **(Required)**');
      expect(result).toContain('optional-lib *(Optional)*');
    });

    it('should include success metrics', () => {
      const result = generator.generate(mockPRPContent);

      expect(result).toContain('## Success Metrics');
      expect(result).toContain('### Performance');
      expect(result).toContain('- Load time < 2s');
    });

    it('should include implementation timeline', () => {
      const result = generator.generate(mockPRPContent);

      expect(result).toContain('## Implementation Timeline');
      expect(result).toContain('### Phase 1: Setup (1 week)');
      expect(result).toContain('Initial setup and configuration');
      expect(result).toContain('- [ ] Create project structure');
    });

    it('should include risk assessment', () => {
      const result = generator.generate(mockPRPContent);

      expect(result).toContain('## Risk Assessment');
      expect(result).toContain('### Technical Complexity');
      expect(result).toContain('**Impact:** High | **Probability:** Medium');
      expect(result).toContain('**Mitigation:** Use proven patterns and thorough testing');
    });

    it('should include confidence score with emoji indicator', () => {
      const result = generator.generate(mockPRPContent);

      expect(result).toContain('## Implementation Confidence');
      expect(result).toContain('**Score:** 🟢 8/10 (High)');
    });
  });

  describe('Research Context', () => {
    it('should include research context if provided', () => {
      const contentWithResearch = {
        ...mockPRPContent,
        researchContext: {
          documentationUrls: ['https://docs.example.com'],
          codeExamples: ['src/examples/example.ts'],
          existingPatterns: ['Use factory pattern'],
          libraryQuirks: ['Known issue with async'],
        },
      };

      const result = generator.generate(contentWithResearch);

      expect(result).toContain('## Research Context');
      expect(result).toContain('### Documentation References');
      expect(result).toContain('https://docs.example.com');
      expect(result).toContain('### Code Examples');
      expect(result).toContain('src/examples/example.ts');
      expect(result).toContain('### Existing Patterns');
      expect(result).toContain('Use factory pattern');
      expect(result).toContain('### Library Quirks & Gotchas');
      expect(result).toContain('Known issue with async');
    });

    it('should not include research context if not provided', () => {
      const result = generator.generate(mockPRPContent);

      expect(result).not.toContain('## Research Context');
    });
  });

  describe('Validation Gates', () => {
    it('should include validation gates if provided', () => {
      const contentWithGates = {
        ...mockPRPContent,
        validationGates: [
          {
            type: 'lint' as const,
            command: 'pnpm run lint',
            description: 'Check code style',
          },
          {
            type: 'test' as const,
            command: 'pnpm test',
          },
        ],
      };

      const result = generator.generate(contentWithGates);

      expect(result).toContain('## Validation Gates');
      expect(result).toContain('**Lint Check** - Check code style');
      expect(result).toContain('pnpm run lint');
      expect(result).toContain('**Test Check**');
      expect(result).toContain('pnpm test');
    });
  });

  describe('Confidence Messages', () => {
    it('should show high confidence message for score >= 8', () => {
      const content = { ...mockPRPContent, confidenceScore: 9 };
      const result = generator.generate(content);

      expect(result).toContain('comprehensive context and should enable successful one-pass implementation');
    });

    it('should show medium confidence message for score 5-7', () => {
      const content = { ...mockPRPContent, confidenceScore: 6 };
      const result = generator.generate(content);

      expect(result).toContain('good context but may require some clarification');
    });

    it('should show low confidence message for score < 5', () => {
      const content = { ...mockPRPContent, confidenceScore: 3 };
      const result = generator.generate(content);

      expect(result).toContain('may need additional research and context');
    });
  });

  describe('Additional Notes', () => {
    it('should include additional notes if provided', () => {
      const contentWithNotes = {
        ...mockPRPContent,
        additionalNotes: 'Remember to update documentation after implementation.',
      };

      const result = generator.generate(contentWithNotes);

      expect(result).toContain('## Additional Notes');
      expect(result).toContain('Remember to update documentation');
    });

    it('should not include additional notes section if not provided', () => {
      const result = generator.generate(mockPRPContent);

      expect(result).not.toContain('## Additional Notes');
    });
  });

  describe('Utility Functions', () => {
    it('should create generator using factory function', () => {
      const gen = createPRPGenerator();
      expect(gen).toBeInstanceOf(PRPGenerator);
    });

    it('should generate PRP using convenience function', () => {
      const result = generatePRP(mockPRPContent);
      expect(result).toContain('# Product Requirements Prompt (PRP) - Test Feature');
    });
  });

  describe('Edge Cases', () => {
    it('should handle empty arrays gracefully', () => {
      const minimalContent: PRPContent = {
        metadata: {
          featureName: 'Minimal Feature',
          createdAt: '2025-10-10',
        },
        overview: 'Minimal overview',
        userStory: {
          actor: 'user',
          goal: 'test',
          benefit: 'validation',
        },
        acceptanceCriteria: [],
        technicalRequirements: [],
        designConsiderations: [],
        dependencies: [],
        successMetrics: [],
        implementationTimeline: [],
        riskAssessment: [],
      };

      const result = generator.generate(minimalContent);
      expect(result).toContain('# Product Requirements Prompt (PRP) - Minimal Feature');
      expect(result).toContain('## Overview');
    });

    it('should handle special characters in feature name', () => {
      const content = {
        ...mockPRPContent,
        metadata: {
          ...mockPRPContent.metadata,
          featureName: 'Feature with "Quotes" & Special <Chars>',
        },
      };

      const result = generator.generate(content);
      expect(result).toContain('Feature with "Quotes" & Special <Chars>');
    });

    it('should handle multi-line descriptions', () => {
      const content = {
        ...mockPRPContent,
        overview: 'Line 1\n\nLine 2\n\nLine 3',
      };

      const result = generator.generate(content);
      expect(result).toContain('Line 1');
      expect(result).toContain('Line 2');
      expect(result).toContain('Line 3');
    });
  });
});
