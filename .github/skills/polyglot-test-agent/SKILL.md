---
name: polyglot-test-agent
description: 'Generates comprehensive, workable unit tests for TypeScript/React code using multi-agent pipeline. Use when asked to generate tests, write unit tests, improve test coverage, or test a codebase. Produces tests that compile, pass, and follow project conventions.'
---

# Polyglot Test Generation Skill

Generate comprehensive unit tests for your TypeScript/React admin features and utilities.

## When to Use

- Generate tests for React components (hooks, custom hooks)
- Test API client functions
- Create tests for utility functions
- Improve test coverage for existing code
- Add tests for new features

## How It Works

The skill coordinates a **Research → Plan → Implement** pipeline:

1. **Research Phase**: Analyzes your codebase for:
   - Testing framework (Jest)
   - Project structure
   - Build commands
   - Existing test patterns

2. **Planning Phase**: Creates structured implementation plan:
   - Groups files into logical phases
   - Prioritizes by complexity
   - Specifies test cases
   - Defines success criteria

3. **Implementation Phase**: Executes each phase:
   - Reads source files
   - Writes tests following your patterns
   - Builds to verify compilation
   - Runs tests to verify they pass
   - Fixes errors if needed

## Usage

Generate tests for your React Query hooks:

```
Generate unit tests for apps/admin/src/features/restaurant/hooks
```

Generate tests for API layer:

```
Generate tests for packages/api/client.ts with focus on error handling
```

Generate tests for a specific component:

```
Add tests for apps/admin/src/features/restaurant/components/RestaurantForm.tsx
```

## Coverage Types

- **Happy path**: Valid inputs produce expected outputs
- **Edge cases**: Empty values, boundaries, special characters
- **Error cases**: Invalid inputs, null handling, exceptions
- **Integration**: API calls, React Query queries, mutations

## Project Info

- **Test Framework**: Jest
- **React Version**: 19.2.x
- **TypeScript**: Strict mode
- **Test Patterns**: React Query hooks, custom hooks, utility functions
