---
name: react-component
description: Creates a properly-typed React component with matching skeleton, dark mode support, and barrel export. Use when building new UI sections or reusable components.
---

# React Component

Creates a typed React component with matching skeleton, proper exports, and premium design aesthetics.

## When to use this skill

- Building a new UI section for a page (e.g., feature card, stats section)
- Creating a reusable component used across multiple pages
- Adding a new component to an existing feature area

## Where components live

| Type                  | Location                            |
|-----------------------|-------------------------------------|
| Page-specific section | `src/components/<page>/<Component>.tsx` |
| Shared across pages   | `src/components/shared/<Component>.tsx` |
| Layout elements       | `src/components/layout/<Component>.tsx` |
| UI primitives (Shadcn) | `src/components/ui/<component>.tsx`   |
| Skeletons             | `src/components/skeleton/<Component>Skeleton.tsx` |

## How to use it

### Step 1: Create the component file

#### Server Component (default — no interactivity)
```tsx
import { cn } from "@/lib/utils";

interface I<Component>Props {
  title: string;
  description?: string;
  className?: string;
}

export default function <Component>({ title, description, className }: I<Component>Props) {
  return (
    <section className={cn("py-16 px-4", className)}>
      <div className="container mx-auto max-w-6xl">
        <h2 className="text-3xl font-bold text-foreground">{title}</h2>
        {description && (
          <p className="mt-2 text-muted-foreground">{description}</p>
        )}
        {/* Component content */}
      </div>
    </section>
  );
}
```

#### Client Component (needs interactivity or animations)
```tsx
"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface I<Component>Props {
  items: I<Item>[];
  className?: string;
}

export default function <Component>({ items, className }: I<Component>Props) {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={cn("py-16 px-4", className)}
    >
      {/* Component content */}
    </motion.section>
  );
}
```

### Step 2: Define props interface

```tsx
interface I<Component>Props {
  // Required props
  title: string;
  items: IItem[];
  
  // Optional styling
  className?: string;
  variant?: "default" | "compact";
  
  // Event handlers (client components only)
  onSelect?: (id: string) => void;
}
```

**Rules:**
- Interface name: `I<Component>Props`
- Always include `className?: string` for styling flexibility
- Use `I` prefix for all interfaces
- Define complex item types in `src/interfaces/` or inline

### Step 3: Create matching skeleton

Create `src/components/skeleton/<Component>Skeleton.tsx`:

```tsx
import { Skeleton } from "@/components/ui/skeleton";

export default function <Component>Skeleton() {
  return (
    <section className="py-16 px-4">
      <div className="container mx-auto max-w-6xl space-y-4">
        <Skeleton className="h-9 w-1/3" />      {/* Title */}
        <Skeleton className="h-5 w-2/3" />      {/* Description */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          {Array.from({ length: 3 }).map((_, i) => (
            <Skeleton key={i} className="h-48 rounded-xl" />
          ))}
        </div>
      </div>
    </section>
  );
}
```

Export from `src/components/skeleton/index.ts`:
```tsx
export { default as <Component>Skeleton } from './<Component>Skeleton';
```

### Step 4: Use in a page

```tsx
import { Suspense } from "react";
import dynamic from "next/dynamic";
import { <Component>Skeleton } from "@/components/skeleton";

const <Component> = dynamic(() => import("@/components/<page>/<Component>"));

// In JSX:
<Suspense fallback={<<Component>Skeleton />}>
  <<Component> title="..." items={data} />
</Suspense>
```

## Design guidelines

### DO use these patterns
- **Glassmorphism cards**: `bg-card/50 backdrop-blur-sm border border-border/50 rounded-xl`
- **Gradient text**: `bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent`
- **Hover glow**: `hover:shadow-lg hover:shadow-primary/10 transition-all duration-300`
- **Fade-in animation**: `initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}`
- **Stagger children**: Use `variants` with `staggerChildren: 0.1`
- **Dark mode**: Always test with both themes. Use `text-foreground`, `bg-background`, `text-muted-foreground`

### DON'T
- Use hardcoded colors (`text-red-500`) — use CSS variable colors (`text-destructive`)
- Skip dark mode support
- Create components without a matching skeleton
- Use inline styles — always use Tailwind utilities&nbsp;

## Component structure order

1. `"use client"` directive (if needed)
2. React imports
3. Next.js imports (`next/link`, `next/image`)
4. Third-party imports (Framer Motion, Lucide icons)
5. Internal imports (`@/components`, `@/lib`, `@/interfaces`)
6. Props interface
7. Component function
8. Hooks → Derived state → Handlers → Return JSX

## Checklist

- [ ] Component created in the correct directory
- [ ] Props typed with `I<Component>Props` interface
- [ ] `className` prop supported via `cn()` utility
- [ ] Matching skeleton created in `src/components/skeleton/`
- [ ] Skeleton exported from skeleton barrel `index.ts`
- [ ] Works in both dark and light mode
- [ ] Premium design with proper spacing, typography, and subtle effects
- [ ] Animations use Framer Motion with 200–400ms duration
- [ ] `"use client"` added only if component needs interactivity
- [ ] All images use `next/image`, all links use `next/link`
