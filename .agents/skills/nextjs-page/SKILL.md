---
name: nextjs-page
description: Creates a new Next.js App Router page with layout, loading skeleton, and optional error boundary. Use when adding a new route/page to the frontend.
---

# Next.js Page

Creates a fully wired App Router page with loading state, optional layout, and proper route group placement.

## When to use this skill

- Adding a new route/page to the application
- Creating a new section that needs its own URL
- Adding a page within an existing route group

## How to use it

### Step 1: Determine the route group

| Group       | Path prefix     | Auth Required | Layout        |
| ----------- | --------------- | ------------- | ------------- |
| `(public)`  | Marketing pages | No            | PublicLayout  |
| `(auth)`    | Protected pages | Yes           | AuthLayout    |
| `(info)`    | Info pages      | No            | InfoLayout    |
| `(product)` | Product pages   | Varies        | ProductLayout |

### Step 2: Create the page directory

```
src/app/(<group>)/<page-name>/
├── page.tsx        # The page component
├── loading.tsx     # Loading skeleton (required)
└── layout.tsx      # Optional local layout
```

### Step 3: Create `page.tsx`

#### Server Component page (preferred)

```tsx
import { Suspense } from "react";
import dynamic from "next/dynamic";
import { <PageSection>Skeleton } from "@/components/skeleton";

// Dynamic imports for below-the-fold content
const HeavySection = dynamic(() => import("@/components/<page>/HeavySection"));

// Static import for above-the-fold content
import HeroSection from "@/components/<page>/HeroSection";

export default function <PageName>Page() {
  return (
    <>
      <HeroSection />

      <Suspense fallback={<HeavySectionSkeleton />}>
        <HeavySection />
      </Suspense>
    </>
  );
}
```

#### Client Component page (when needed)

```tsx
"use client";

import { useState, useEffect } from "react";
import { api } from "@/lib";
import { I<Data>Response } from "@/interfaces";

export default function <PageName>Page() {
  const [data, setData] = useState<I<Data>Response | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const result = await api.get<I<Data>Response>('/endpoint');
        setData(result);
      } catch (error) {
        console.error('Failed to load data:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  if (loading) return <LoadingSkeleton />;

  return ( /* page content */ );
}
```

### Step 4: Create `loading.tsx`

```tsx
import { <Page>Skeleton } from "@/components/skeleton";

export default function Loading() {
  return <<Page>Skeleton />;
}
```

### Step 5: Create the skeleton component

Add to `src/components/skeleton/<Page>Skeleton.tsx`:

```tsx
import { Skeleton } from "@/components/ui/skeleton";

export default function <Page>Skeleton() {
  return (
    <div className="container mx-auto px-4 py-8 space-y-6">
      {/* Match the final page layout structure */}
      <Skeleton className="h-10 w-1/3" />
      <Skeleton className="h-64 w-full rounded-xl" />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Skeleton className="h-32 rounded-lg" />
        <Skeleton className="h-32 rounded-lg" />
        <Skeleton className="h-32 rounded-lg" />
      </div>
    </div>
  );
}
```

Then export from `src/components/skeleton/index.ts`:

```tsx
export { default as <Page>Skeleton } from './<Page>Skeleton';
```

### Step 6: Add metadata (SEO)

For **static** metadata:

```tsx
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "<Page Title> | TempMail",
  description: "<Compelling page description for search engines>",
};
```

For **dynamic** metadata:

```tsx
export async function generateMetadata({ params }): Promise<Metadata> {
  return {
    title: `${params.name} | TempMail`,
    description: `...`,
  };
}
```

### Step 7: Add navigation link (if applicable)

Update the header/sidebar navigation to include the new page link using `next/link`:

```tsx
import Link from "next/link";

<Link href="/<page-name>">Page Name</Link>;
```

## Checklist

- [ ] Page created in correct route group `(public)`, `(auth)`, etc.
- [ ] `page.tsx` uses Server Component by default (add `"use client"` only if needed)
- [ ] `loading.tsx` created with skeleton fallback
- [ ] Skeleton component created in `src/components/skeleton/`
- [ ] Skeleton exported from skeleton `index.ts` barrel
- [ ] Metadata (title + description) added for SEO
- [ ] Heavy sections use `next/dynamic` + `Suspense`
- [ ] Navigation link added (header, sidebar, or footer) if applicable
- [ ] Page works in both dark and light mode
- [ ] All imports use `@/` path alias
