# Copilot Instructions for j26-components

## Repository Overview

This is the **Scouterna Design System Components** monorepo containing:
- **Stencil Web Components** (packages/ui-webc) - source of truth for all components
- **React Component Wrappers** (packages/ui-react) - auto-generated from Stencil
- **Design Tokens** (packages/design-tokens) - CSS variables and theme values
- **Storybook Documentation** (packages/storybook) - component demos and documentation

**Languages**: TypeScript, CSS, React, Stencil
**Tooling**: Biome (linting/formatting), Changesets (releases), Plop (generators)

## Critical Build Requirements

**ALWAYS run commands in this exact order to avoid build failures:**

### 1. Initial Setup
```bash
pnpm install  # Required before ANY other command
```

### 2. Full Build (required after changes)
```bash
pnpm build  # Builds design-tokens → ui-webc → ui-react in dependency order
```

**Build sequence is critical:**
- design-tokens MUST build first (generates CSS variables)
- ui-webc depends on design-tokens being built
- ui-react is auto-generated from ui-webc build output
- Never run individual package builds unless explicitly testing

### 3. Development Mode
```bash
pnpm dev  # Runs all packages in watch mode, starts Storybook on :6006
```

### 4. Linting (CI runs this)
```bash
pnpm lint       # Check for errors
pnpm lint:fix   # Auto-fix formatting/imports
```

**CI Requirement**: Code MUST pass `biome ci --error-on-warnings .` - warnings are treated as errors in CI.

## Project Architecture & File Locations

### Component Structure
Each component lives in `packages/ui-webc/src/components/{name}/`:
- `{name}.tsx` - Stencil component (source of truth)
- `{name}.css` - Component styles (uses design tokens)
- `readme.md` - **AUTO-GENERATED** documentation (never edit manually)

Component naming convention: All components use `scout-{name}` tag name (e.g., `scout-button`)

### Key Configuration Files
- `/package.json` - Root workspace scripts
- `/pnpm-workspace.yaml` - Monorepo workspace config
- `/biome.json` - Linting and formatting rules
- `/.node-version` - Node version (24.5)
- `/.changeset/config.json` - Release configuration
- `/packages/ui-webc/stencil.config.ts` - Stencil build config with React output target

### Generated Files (Never Edit Directly)
- `packages/ui-react/lib/components/stencil-generated/**` - Auto-generated from Stencil
- `packages/ui-webc/src/components.d.ts` - Auto-generated type definitions
- `packages/ui-webc/src/components/*/readme.md` - Auto-generated docs
- `packages/design-tokens/dist/**` - Generated from tokens/ JSON files

### Design Tokens
Source: `packages/design-tokens/tokens/**/*.json`  
Output: `packages/design-tokens/dist/tokens.css` (imported in components)  
Build warnings about "Unknown CSS Font Shorthand properties" are **expected and safe to ignore**.

## Component Development Workflow

### Creating New Components
```bash
pnpm plop  # Interactive generator creates all boilerplate
```

This creates:
- Component in `packages/ui-webc/src/components/{name}/`
- Storybook story in `packages/storybook/src/stories/{name}.stories.tsx`

### Modifying Existing Components

1. Edit source in `packages/ui-webc/src/components/{name}/{name}.tsx`
2. Edit styles in `packages/ui-webc/src/components/{name}/{name}.css`
3. **Rebuild**: `pnpm build` (triggers React wrapper regeneration)
4. Test in Storybook: `pnpm dev` then visit http://localhost:6006
5. Add changeset: `pnpm changeset` (required for releases)

**Component Props**: Use JSDoc comments in .tsx file - they auto-generate into readme.md tables.

### Form Input Components Pattern
Input-like components (checkbox, radio-button, select, input) follow this pattern:
- Must have `name` prop for form submission
- Must have `value` prop
- Must emit `scoutChecked` or `scoutInputChange` events with `{ checked/value, element }` payload
- Must support `disabled` prop
- Must emit internal `_scoutFieldId` event for field association

## Testing

### Unit Tests (Stencil)
```bash
cd packages/ui-webc
pnpm test  # Runs spec and e2e tests with Stencil's test runner
```

Tests are rare in this codebase - only `utils.spec.ts` exists currently.

### Visual Testing
Use Storybook for manual visual testing. Build and preview with:
```bash
pnpm build  # Build all packages first
cd packages/storybook
pnpm dev    # Starts on port 6006
```

## Release Process (Changesets)

**Every user-facing change REQUIRES a changeset:**

1. After making changes, run:
```bash
pnpm changeset
```

2. Select affected packages (usually `@scouterna/ui-webc` and `@scouterna/ui-react`)
3. Choose version bump type (patch/minor/major)
4. Describe changes (appears in changelog)
5. Commit the generated `.changeset/*.md` file with your changes

**Important**: Regular commits without changesets don't appear in changelogs or trigger releases.

## CI/CD Pipelines

### Code Quality Check (runs on all pushes/PRs)
- Workflow: `.github/workflows/code-quality.yml`
- Runs: `biome ci --error-on-warnings .`
- **Warnings = Failure** - must fix before merge

### Release Process (main branch only)
- Workflow: `.github/workflows/release.yml`
- Triggered: On push to `main`
- Actions:
  1. Runs `pnpm install`
  2. Runs `pnpm build`
  3. Creates release PR with version bumps (if changesets exist)
  4. Publishes to npm when release PR is merged
  5. Triggers Storybook deployment to GitHub Pages

### Storybook Deployment
- Workflow: `.github/workflows/deploy-github-pages.yml`
- Builds Storybook from `packages/storybook/storybook-static`
- Deploys to GitHub Pages

**To replicate CI locally:**
```bash
pnpm install
pnpm build
biome ci --error-on-warnings .
```

## Common Pitfalls & Workarounds

1. **"Cannot find module" errors**: Run `pnpm install && pnpm build` - React types won't exist until Stencil builds.

2. **Storybook shows old component**: After editing a component, MUST run `pnpm build` to regenerate React wrappers before Storybook reflects changes.

3. **Biome errors about imports**: Run `pnpm lint:fix` - Biome auto-organizes imports.

4. **Design token warnings**: Warnings about "Unknown CSS Font Shorthand properties" during token build are expected and can be ignored.

5. **Component readme.md out of sync**: These are auto-generated - edit JSDoc in the .tsx file, then rebuild.

6. **pnpm workspace resolution failures**: Ensure packages are built in order. Root `pnpm build` handles this automatically.

## PR Review Guidelines

### Component Documentation

**DO NOT** suggest adding comments to the props and events tables in component readme.md files. These tables are auto-generated from the component source code and should remain comment-free to maintain consistency with the generation process.

Example of tables where comments should NOT be suggested:
- Props tables showing component properties
- Events tables documenting component events

The documentation for these items should be maintained in the source code itself, not in the generated tables.

## Trust These Instructions

These instructions are comprehensive and tested. Only search for additional information if:
- Instructions are incomplete for your specific task
- Instructions are found to be incorrect
- You need to understand implementation details not covered here

For component changes, always check existing components (e.g., button, checkbox) as reference implementations before searching extensively.
