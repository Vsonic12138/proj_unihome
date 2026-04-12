# Repository Guidelines

## Project Structure & Module Organization
This repository is a `Next.js 15` App Router site with `Payload CMS` integration. Application routes live under `src/app`, with localized pages in `src/app/[locale]`. Reusable UI components are in `src/components`, i18n loading logic is in `src/i18n`, and CMS collections, globals, blocks, and admin customizations are under `src/payload`. Translation dictionaries are stored in `messages/{en,zh,ja}`. Static assets belong in `public/`. Operational notes and migration plans live in `docs/`, while CMS utilities and seed scripts live in `scripts/payload/`.

## Build, Test, and Development Commands
- `npm install`: install project dependencies.
- `npm run dev`: start the local Next.js dev server.
- `npm run build`: create the production build.
- `npm run start`: run the production build locally.
- `npm run lint`: run the Next.js ESLint ruleset.
- `npm run generate:types`: regenerate Payload types after schema changes.
- `npm run seed:payload` and `npm run publish:all`: seed or publish CMS content when content models change.

## Coding Style & Naming Conventions
Use TypeScript for all new app code. Follow the existing 2-space indentation and keep imports clean and grouped. Components and CMS schema files use `PascalCase` filenames such as `HeroBlock.ts` or `LocaleSwitcher.tsx`; utility and route-support files use `camelCase` or framework naming like `request.ts` and `page.tsx`. Run `npm run lint` before submitting changes. Formatting is handled by `Prettier` with `prettier-plugin-tailwindcss`, so keep Tailwind classes sortable instead of hand-grouping them.

## Testing Guidelines
There is no dedicated automated test suite configured in this repository today. At minimum, run `npm run lint` and manually verify affected localized routes, key CMS-backed pages, and any modified API preview flow. If you add automated tests later, place them near the feature or in a clear `tests/` directory and use names ending in `.test.ts` or `.test.tsx`.

## Commit & Pull Request Guidelines
Recent history follows a versioned Conventional Commit style, for example `V1.20.7 chore(config): ...` and `V1.20.6 style(format): ...`. Keep the `Vx.y.z type(scope): summary` pattern, use imperative summaries, and keep scopes specific. PRs should include a short description, impacted routes or CMS areas, linked issues when available, and screenshots for UI changes. Mention any required content migration, seeding, or publish steps in the PR body.

## Configuration & Content Notes
Check `payload.config.ts`, `next.config.mjs`, and `src/middleware.ts` before changing routing, locales, or CMS behavior. Do not edit generated snapshots in `backups/` unless the task is explicitly about content restore/export.
