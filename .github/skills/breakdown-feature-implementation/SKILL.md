---
name: breakdown-feature-implementation
description: 'Creates detailed feature implementation plans following monorepo structure. Provides system architecture diagrams, database schema design, API specifications, component hierarchy, and phased implementation steps.'
---

# Feature Implementation Breakdown

Create detailed implementation plans for new admin features following FoodTrip patterns.

## When to Use

- Planning a new feature (Food, Dishes, Users, Trips)
- Breaking down complex features into phases
- Documenting technical approach before coding
- Ensuring architectural consistency
- Planning API changes
- Designing database schema changes

## What It Provides

For each feature, you get:

1. **System Architecture Diagram**
   - Frontend layer (React components)
   - API layer (endpoints, validation)
   - Business logic (hooks, services)
   - Data layer (queries, mutations)
   - Infrastructure (storage, caching)

2. **Database Schema Design**
   - Entity-relationship diagrams
   - Field specifications with types
   - Indexing strategies
   - Foreign key relationships
   - Migration strategy

3. **API Design Specifications**
   - Endpoints with full specs
   - Request/response formats (TypeScript types)
   - Authentication requirements
   - Error handling strategies
   - Rate limiting & caching

4. **Frontend Architecture**
   - Component hierarchy
   - State management flow (React Query)
   - Custom hooks needed
   - Form components & validation
   - UI component selection

5. **Phased Implementation Plan**
   - Phase 1: API endpoints
   - Phase 2: React Query hooks
   - Phase 3: Form components
   - Phase 4: List/Table components
   - Phase 5: Integration & testing

## Usage

Plan a new feature:

```
Create a detailed implementation plan for the Food Management feature similar to the existing Restaurant Management feature
```

Plan dishes feature:

```
Break down the Dish Category feature implementation following the FoodTrip admin architecture patterns
```

Plan with specific requirements:

```
Create implementation plan for User Management with roles (admin, restaurant-admin, user) and permission-based access control
```

## Key Information It Captures

- Feature requirements from PRD
- Technical architecture diagrams (Mermaid)
- Database schema (Mermaid ERD)
- API specifications (TypeScript interfaces)
- Component hierarchy (tree structure)
- State management approach (React Query patterns)
- Error handling strategy
- Security considerations
- Performance optimizations
- Testing approach

## Output Location

Generated at: `/docs/implementation-plans/{feature-name}-plan.md`
