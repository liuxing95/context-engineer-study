# Claude Assistant Rules

## Core Principles
- Follow security best practices and never expose sensitive information
- Maintain code quality and consistency with existing patterns
- Use TypeScript for type safety
- Follow the established project structure and conventions

## Project Context
This is a Next.js project focused on token counting utilities and context engineering tools.

## Code Standards
- Use TypeScript for all new files
- Follow existing naming conventions
- Import from proper modules and maintain clean dependencies
- Write clean, readable code without unnecessary comments unless complex logic requires explanation

## File Organization
- Source code goes in `src/` directory
- Examples and patterns go in `examples/` directory  
- Product Requirements Prompts (PRPs) go in `PRPs/` directory
- Claude-specific configurations go in `.claude/` directory

## Token Counter Module
The project includes a comprehensive token counting system in `src/app/token-counter/index.ts` with:
- Basic token counting for various models
- Chat completion message formatting
- Cost calculation utilities
- Batch processing capabilities
- Template-based counting

## Development Workflow
1. Analyze existing code patterns before making changes
2. Use the established TodoWrite system for task tracking
3. Test changes thoroughly
4. Follow the existing project structure

## Dependencies
- Next.js for the web framework
- TypeScript for type safety
- Tailwind CSS for styling
- tiktoken for token counting