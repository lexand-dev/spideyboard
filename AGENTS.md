# Agent Guidelines for miro-clone

<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

<!-- convex-ai-start -->
This project uses [Convex](https://convex.dev) as its backend.

When working on Convex code, **always read `convex/_generated/ai/guidelines.md` first** for important guidelines on how to correctly use Convex APIs and patterns. The file contains rules that override what you may have learned about Convex from training data.

Convex agent skills for common tasks can be installed by running `npx convex ai-files install`.
<!-- convex-ai-end -->

---

## Build Commands

```bash
# Development
npm run dev          # Start development server
bun run dev          # Alternative (project uses bun)

# Production
npm run build        # Build for production
npm run start        # Start production server

# Code Quality
npm run lint         # Run ESLint
```

**No test suite is currently configured.** If adding tests, use Vitest or Jest with the project's package manager.

---

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript 5+
- **Styling**: Tailwind CSS v4 + shadcn/ui
- **Icons**: @hugeicons/react + @hugeicons/core-free-icons
- **Auth**: Clerk (@clerk/nextjs)
- **Backend**: Convex
- **Package Manager**: bun (preferred) or npm

---

## Code Style

### File Organization

```
app/                    # Next.js App Router
├── (dashboard)/        # Route group for dashboard
│   ├── _components/    # Private components (prefixed with _)
│   ├── layout.tsx      # Dashboard layout
│   └── page.tsx        # Dashboard page
├── layout.tsx          # Root layout
└── page.tsx            # Root page

components/
├── ui/                 # shadcn/ui components
└── ...                 # Feature components

lib/
├── utils.ts            # Utilities (cn function)
└── ...

convex/                 # Backend functions
├── schema.ts          # Database schema
├── auth.config.ts     # Auth configuration
└── ...                # Queries, mutations, actions
```

### Component Structure

**File naming**: kebab-case (e.g., `organization-sidebar.tsx`)
**Export naming**: PascalCase (e.g., `export function OrganizationSidebar`)
**Component files**: `.tsx` extension
**Utility files**: `.ts` extension

### Imports

**Order**:
1. React imports (`import * as React from "react"`)
2. External libraries (e.g., `import { cva } from "class-variance-authority"`)
3. Internal imports (e.g., `import { cn } from "@/lib/utils"`)
4. Component imports (e.g., `import { Button } from "@/components/ui/button"`)
5. Type imports

**Path aliases**:
- `@/` → project root
- Use absolute paths, never relative paths beyond 2 levels

**Example**:
```typescript
import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { HugeiconsIcon } from "@hugeicons/react"
import { Add01Icon } from "@hugeicons/core-free-icons"
```

### TypeScript

- **Always** use explicit types for function parameters and return types
- **Never** use `any` type
- Use `type` for type aliases, `interface` for object shapes
- Use `Record<>` instead of plain objects for typed dictionaries
- Import types with `import { type MyType }` when only used as type

**Example**:
```typescript
interface ComponentProps {
  className?: string
  variant?: "default" | "outline"
}

type ComponentVariant = "default" | "outline"

export function Component({ className, variant }: ComponentProps) {
  return <div className={cn(className)} />
}
```

### React Patterns

- **Server Components**: Default for App Router, no `"use client"` directive
- **Client Components**: Add `"use client"` at top of file
- **Hooks**: Use custom hooks for reusable logic, prefix with `use`
- **Context**: Use `React.createContext` with proper null checking

**Example**:
```typescript
"use client"

export function ClientComponent() {
  const context = useContext(MyContext)
  if (!context) {
    throw new Error("Component must be used within Provider")
  }
  return <div>{context.value}</div>
}
```

### Tailwind CSS

- Use shadcn design tokens (CSS variables like `--primary`, `--muted`)
- Use `oklch()` for custom colors in `globals.css`
- Prefer `group-*` utilities for nested component styling
- Use `data-*` attributes for component states
- Use `@apply` sparingly, prefer inline classes

**Example**:
```tsx
<Button
  variant="default"
  size="default"
  className="hover:bg-primary/90 data-[active=true]:bg-primary"
>
  Click
</Button>
```

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

### Convex Guidelines

**CRITICAL**: Read `convex/_generated/ai/guidelines.md` for complete Convex patterns.

Key points:
- Always use validators for function args (`v.string()`, `v.id()`)
- Use `ctx.runQuery`, `ctx.runMutation`, `ctx.runAction` for internal calls
- Never use `.filter()` in queries; use indexes
- Never use `.collect()` for unbounded results; use `.take(n)`
- Use `Doc<"tableName">` for document types
- Use `Id<"tableName">` for ID types

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

---

## Best Practices

1. **Accessibility**
   - Use semantic HTML elements
   - Add `aria-*` attributes where needed
   - Ensure color contrast ratios
   - Support keyboard navigation

2. **Performance**
   - Use Server Components by default
   - Add `"use client"` only when needed (hooks, browser APIs)
   - Lazy load heavy components with `next/dynamic`

3. **Code Quality**
   - Run `npm run lint` before completing changes
   - No ESLint errors (warnings acceptable for generated files)
   - Use TypeScript strict mode patterns

4. **Responsive Design**
   - Mobile-first approach
   - Use Tailwind responsive prefixes (`sm:`, `lg:`, `xl:`)
   - Test at common breakpoints (375px, 768px, 1024px, 1280px)

5. **Security**
   - Never expose API keys or secrets
   - Use environment variables for sensitive data
   - Validate all user input in mutations

---

## Common Patterns

### Client/Server Component Boundary

```tsx
// Server Component (default)
export default function Page() {
  return <ClientWrapper />
}

// Client Component
"use client"
export function ClientWrapper() {
  const { state } = useSidebar()
  return <div>{state}</div>
}
```

### Using shadcn Components

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

### Conditional Rendering

```tsx
{isLoading ? (
  <Skeleton className="h-4 w-full" />
) : (
  <div>{data}</div>
)}
```
