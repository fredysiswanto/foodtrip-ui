---
name: architecture-blueprint-generator
description: 'Comprehensive project architecture blueprint generator that analyzes codebases to create detailed architectural documentation. Detects technology stacks, architectural patterns, generates visual diagrams, and provides extensible blueprints for maintaining consistency.'
---

# Architecture Blueprint Generator

Create comprehensive architectural documentation for the FoodTrip monorepo.

## When to Use

- Document the overall monorepo structure
- Create architecture diagrams for new developers
- Document feature architectures
- Plan new features within existing patterns
- Validate architectural consistency

## What It Generates

- **Architectural Overview**: Feature-based architecture explanation
- **Visual Diagrams**: Mermaid diagrams showing component relationships
- **Technology Stack**: Detailed documentation of all technologies
- **Architectural Patterns**: How React Query, hooks, and API layer work together
- **Implementation Patterns**: Code examples showing how to add features
- **Data Flow**: How data moves through the system
- **Extension Guides**: How to add new features while preserving integrity

## Usage

Generate complete architecture blueprint:

```
Generate a comprehensive architecture blueprint for the FoodTrip monorepo focusing on feature-based architecture and React Query patterns
```

Document a specific feature architecture:

```
Generate an architecture blueprint for the Restaurant Management feature including component hierarchy, state management, and API integration
```

## Key Insights It Provides

For FoodTrip Admin:

- Monorepo structure (apps/admin, apps/client, packages/\*)
- Feature isolation patterns
- React Query for server state
- Custom hooks for business logic
- API layer architecture
- Form validation with Zod
- Error handling patterns
- Authentication & authorization flow

## Output Format

The skill generates a `Project_Architecture_Blueprint.md` document with:

- Executive summary
- Architecture detection results
- Component diagrams
- Layer organization
- Data architecture
- Technology decisions
- Extension points
- Development guidelines
