# Agent Guidelines for miro-clone

<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

Next.js 16 has breaking changes — APIs, conventions, and file structure may differ from training data.
Read relevant docs in `node_modules/next/dist/docs/` before writing code.
<!-- END:nextjs-agent-rules -->

<!-- convex-ai-start -->
This project uses Convex as backend. **Always read `convex/_generated/ai/guidelines.md` first** for Convex patterns.
<!-- convex-ai-end -->

---

## Build Commands

```bash
bun run dev      # Development server (preferred)
npm run dev      # Alternative
npm run build    # Production build
npm run start    # Start production server
npm run lint     # ESLint
```

**No test suite configured.** If adding tests, use Vitest with bun as package manager.

---

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript 5+ (strict mode enabled)
- **Styling**: Tailwind CSS v4 + shadcn/ui
- **Icons**: @hugeicons/react + @hugeicons/core-free-icons
- **Auth**: Clerk (@clerk/nextjs)
- **Backend**: Convex
- **Package Manager**: bun (preferred) or npm

---

## File Organization

```
app/              # Next.js App Router pages
├── globals.css   # Global styles + CSS variables
├── layout.tsx    # Root layout
└── page.tsx      # Root page

components/
├── ui/           # shadcn/ui components
└── ...           # Feature components

lib/
└── utils.ts      # cn() utility function

convex/
├── schema.ts     # Database schema
└── auth.config.ts # Convex auth config
```

---

## Code Style

### Imports Order

1. React imports (`import * as React from "react"`)
2. External libraries (e.g., `import { cva } from "class-variance-authority"`)
3. Internal imports (e.g., `import { cn } from "@/lib/utils"`)
4. Component imports (e.g., `import { Button } from "@/components/ui/button"`)
5. Type imports (`import { type MyType }`)

Path aliases: `@/` → project root. Use absolute paths, avoid relative paths beyond 2 levels.

### TypeScript

- **Always** use explicit types for function parameters and return types
- **Never** use `any` type
- Use `type` for type aliases, `interface` for object shapes
- Use `Record<>` instead of plain objects for typed dictionaries
- Import types with `import { type MyType }` when only used as type

```typescript
interface ComponentProps {
  className?: string
  variant?: "default" | "outline"
}

export function Component({ className, variant }: ComponentProps) {
  return <div className={cn(className)} />
}
```

### Component Patterns

- **Server Components**: Default for App Router (no `"use client"` directive)
- **Client Components**: Add `"use client"` at top of file
- **File naming**: kebab-case (`my-component.tsx`)
- **Export naming**: PascalCase (`export function MyComponent`)
- **Context**: Use `React.createContext` with proper null checking and guards

### Tailwind CSS

- Use shadcn design tokens (CSS variables like `--primary`, `--muted`)
- Use `oklch()` for custom colors in `globals.css`
- Prefer `group-*` utilities for nested component styling
- Use `data-*` attributes for component states
- Use `@apply` sparingly, prefer inline classes

### Naming Conventions

- **Components**: PascalCase (`MyComponent`)
- **Functions**: camelCase (`handleClick`)
- **Constants**: SCREAMING_SNAKE_CASE
- **Files**: kebab-case (`my-component.tsx`)
- **CSS classes**: kebab-case (Tailwind utilities)
- **Types/Interfaces**: PascalCase

### Error Handling

- Use `try/catch` for async operations
- Never swallow errors silently
- Provide meaningful error messages
- Use TypeScript types for error states

---

## Convex Guidelines

**CRITICAL**: Read `convex/_generated/ai/guidelines.md` for complete Convex patterns.

Key points:
- Always use validators for function args (`v.string()`, `v.id()`)
- Use `ctx.runQuery`, `ctx.runMutation`, `ctx.runAction` for internal calls
- Never use `.filter()` in queries; use indexes
- Never use `.collect()` for unbounded results; use `.take(n)`
- Use `Doc<"tableName">` for document types
- Use `Id<"tableName">` for ID types

---

## Using shadcn Components

```tsx
import { Button } from "@/components/ui/button"
import { HugeiconsIcon } from "@hugeicons/react"
import { Add01Icon } from "@hugeicons/core-free-icons"

export function MyComponent() {
  return (
    <Button variant="default" size="default">
      <HugeiconsIcon icon={Add01Icon} className="h-4 w-4" />
      Add Item
    </Button>
  )
}
```

---

## Best Practices

1. **Accessibility**: Use semantic HTML, `aria-*` attributes, color contrast, keyboard navigation
2. **Performance**: Server Components by default, `"use client"` only when needed, lazy load with `next/dynamic`
3. **Code Quality**: Run `npm run lint` before completing, no ESLint errors
4. **Responsive Design**: Mobile-first, use Tailwind prefixes (`sm:`, `lg:`, `xl:`)
5. **Security**: Never expose secrets, validate all user input in Convex mutations

---

## Design System

### Colors (Spider-Man Minimal Theme)

Primary accent: Spider red `oklch(0.55 0.22 27)`
Sidebar: Dark `oklch(0.15 0.01 260)`
Background: White `oklch(0.985 0 0)`

### Typography

- Font: Inter (loaded via `next/font/google`)
- Headings: Bold, semantic hierarchy
- Body: Regular weight, comfortable line-height

### Spacing

- Base unit: 4px (Tailwind default)
- Component padding: Consistent with shadcn defaults
- Page margins: 24px (p-6)
