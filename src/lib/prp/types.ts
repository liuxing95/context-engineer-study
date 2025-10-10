/**
 * Types for PRP (Product Requirements Prompt) generation
 */

export interface PRPMetadata {
  featureName: string;
  createdAt: string;
  author?: string;
  version?: string;
}

export interface UserStory {
  actor: string;
  goal: string;
  benefit: string;
}

export interface AcceptanceCriteria {
  description: string;
  completed: boolean;
}

export interface TechnicalRequirement {
  category: string;
  description: string;
  priority?: 'high' | 'medium' | 'low';
}

export interface DesignConsideration {
  category: string;
  requirements: string[];
}

export interface Dependency {
  name: string;
  type: 'library' | 'api' | 'service' | 'feature';
  version?: string;
  required: boolean;
}

export interface ImplementationPhase {
  phase: number;
  title: string;
  description: string;
  duration?: string;
  tasks?: string[];
}

export interface Risk {
  title: string;
  description: string;
  impact: 'high' | 'medium' | 'low';
  probability: 'high' | 'medium' | 'low';
  mitigation: string;
}

export interface SuccessMetric {
  category: string;
  metrics: string[];
}

export interface ResearchContext {
  documentationUrls?: string[];
  codeExamples?: string[];
  existingPatterns?: string[];
  libraryQuirks?: string[];
}

export interface ValidationGate {
  type: 'syntax' | 'style' | 'test' | 'lint';
  command: string;
  description?: string;
}

export interface PRPContent {
  metadata: PRPMetadata;
  overview: string;
  userStory: UserStory;
  acceptanceCriteria: AcceptanceCriteria[];
  technicalRequirements: TechnicalRequirement[];
  designConsiderations: DesignConsideration[];
  dependencies: Dependency[];
  researchContext?: ResearchContext;
  implementationTimeline: ImplementationPhase[];
  riskAssessment: Risk[];
  successMetrics: SuccessMetric[];
  validationGates?: ValidationGate[];
  confidenceScore?: number; // 1-10 scale
  additionalNotes?: string;
}

export interface PRPGeneratorOptions {
  templatePath?: string;
  outputPath?: string;
  includeArchitectureDiagram?: boolean;
  includeCodeExamples?: boolean;
  confidenceThreshold?: number;
}
