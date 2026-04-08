# React Component Scaffold Skill

This skill documents a reusable pattern for scaffolding React component architecture across projects.

Pattern:

- Create `src/components/common/` for small primitives (Button, Input) with strict TypeScript props
- Create `src/components/forms/` for React Hook Form wrappers (FormWrapper, FormField, FormButton)
- Create `src/components/features/` for domain-specific components that compose common primitives
- Create `src/hooks/` to encapsulate business logic and Redux interactions

Usage:
- Use this scaffold when starting a new feature to maintain consistency and testability.

