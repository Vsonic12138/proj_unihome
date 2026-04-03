# Agent Instructions

## Build Commands

```bash
# Install dependencies
npm install

# Development server (port 3000)
npm run dev

# Production build
npm run build

# Start production server
npm run start

# Lint check (ESLint)
npm run lint
```

## Project Stack

- **Framework**: Next.js 15 (App Router), React 19, TypeScript 5
- **Styling**: Tailwind CSS v4, PostCSS
- **i18n**: next-intl (zh/en/ja)
- **Theme**: next-themes (dark mode)

## Code Style

### Imports
- Use `@/*` alias for `src/*` imports
- React imports: `import { useState, useCallback } from "react"`
- Next.js imports: `import Image from "next/image"`, `import Link from "next/link"`
- i18n: `import { useTranslations } from "next-intl"` (client) / `import { getTranslations } from "next-intl/server"` (server)

### Formatting
- Prettier with `prettier-plugin-tailwindcss`
- 2-space indentation
- Double quotes for strings
- Semicolons required

### Component Structure
```tsx
// Default exports, PascalCase
const ComponentName = ({ prop1, prop2 }: ComponentProps) => {
  // Hooks at top
  const t = useTranslations();
  const [state, setState] = useState(initial);

  // Callbacks with useCallback
  const handleClick = useCallback(() => { ... }, [deps]);

  // Render
  return ( ... );
};

export default ComponentName;
```

### TypeScript
- Prefer explicit types over `any`
- Interface/Type naming: PascalCase
- Props type: `ComponentNameProps` or inline `{ prop: type }`
- `strict: false` in tsconfig (be lenient)

### File Naming
- Components: `PascalCase/index.tsx` or `PascalCase.tsx`
- Utils: `camelCase.ts`
- Types: `kebab-case.ts` in `/types`
- Page components: `page.tsx` (Next.js convention)

### Accessibility
- All interactive elements need `aria-label`
- Buttons must be focusable with visible focus ring
- Use semantic HTML (`<button>` not `<div onClick>`)

### i18n
- Never hardcode UI text
- Use translation keys: `t('namespace.key')` or `t.raw('namespace')` for objects
- JSON files in `/messages/{locale}/`

### Styling
- Tailwind utility classes, responsive with `sm:`, `md:`, `lg:`
- Dark mode: `dark:` prefix
- Arbitrary values: `bg-[#FCFCFC]` when needed

### Error Handling
- Use optional chaining (`?.`) and nullish coalescing (`??`)
- Provide fallbacks for dynamic content

### Performance
- Use `useMemo` for expensive computations
- Use `useCallback` for event handlers passed to children
- Images: use `next/Image` with proper `sizes`

## Directory Structure

```
src/
  app/[locale]/       # Routed pages
  app/                # Layouts, providers, non-routed components
  components/         # Reusable components
  i18n/               # Routing and request config
  types/              # TypeScript types
  lib/                # Utilities
  styles/             # Global CSS
messages/             # Translation JSONs
```

## Client vs Server Components

- **Server by default** (async functions allowed)
- Add `"use client"` when using:
  - React hooks (useState, useEffect, etc.)
  - Browser APIs
  - Event handlers

## Notes

- Node.js >= 18.17.0 required
- Language cookie: `proj_uinhome-language`
- No test runner configured
