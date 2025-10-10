/**
 * PRP (Product Requirements Prompt) Generation Library
 *
 * A comprehensive toolkit for generating detailed product requirements
 * that enable AI agents to successfully implement features in one pass.
 */

export { PRPGenerator, createPRPGenerator, generatePRP, savePRP } from './generator';

export type {
  PRPContent,
  PRPMetadata,
  PRPGeneratorOptions,
  UserStory,
  AcceptanceCriteria,
  TechnicalRequirement,
  DesignConsideration,
  Dependency,
  ImplementationPhase,
  Risk,
  SuccessMetric,
  ResearchContext,
  ValidationGate,
} from './types';
