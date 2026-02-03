# Scouterna Design System Components

A monorepo containing Stencil Web Components, generated React components, design
tokens, documentation in Storybook.

## Prerequisites

- Node.js (v24 or higher)
- pnpm (v10.7.0 or higher)

## Getting Started

```bash
# Install dependencies
pnpm install

# Start development (builds tokens and components and starts Storybook)
pnpm dev
```

## Project Structure

```
j26-web-components/
├── packages/
│   ├── design-tokens/    # Design tokens (CSS variables and more)
│   ├── ui-webc/          # Stencil Web Components
│   ├── ui-react/         # Generated React components
│   └── storybook/        # Storybook documentation
├── package.json          # Root package with scripts
└── pnpm-workspace.yaml   # Workspace configuration
```

## Creating a new component

From the root directory, run the plop generator and follow the prompts:
```bash
pnpm plop
```

## Releasing

This project uses [Changesets](https://github.com/changesets/changesets) to manage releases and changelogs.

### Creating a Release

1. **Add a changeset**: Run `pnpm changeset` and follow the prompts to describe your changes
2. **Commit the changeset**: The generated changeset file should be committed to your branch
3. **Automated PR creation**: When your changes are merged to main, a release PR will be automatically created
4. **Merge to release**: When the release PR is merged, the following happens automatically:
   - A new version is published to npm
   - The changelog is updated
   - Storybook documentation is built and deployed to GitHub Pages

**Note**: Regular commits do not generate changelog entries. Only changesets create changelog entries.

## Helpful resources

- [Shadow DOM and accessibility: the trouble with ARIA](https://nolanlawson.com/2022/11/28/shadow-dom-and-accessibility-the-trouble-with-aria/)
- [Shadow DOM and events](https://it.javascript.info/shadow-dom-events)
