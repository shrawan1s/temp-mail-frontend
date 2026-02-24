# Frontend Rules — TempMail Frontend (Next.js)

> These rules define the coding standards, architectural patterns, and best practices
> for the TempMail Next.js frontend. Every code change **must** follow these rules.

---

## 1. Tech Stack & Tooling

| Layer           | Technology                                          |
| --------------- | --------------------------------------------------- |
| Framework       | Next.js 15 (App Router, React Server Components)    |
| Language        | TypeScript 5 — strict mode enabled                  |
| UI Library      | React 19                                            |
| Styling         | TailwindCSS 3 + CSS Variables (via `globals.css`)   |
| Component Lib   | Shadcn/ui (Radix UI primitives, default style)      |
| Icons           | Lucide React (primary), React Icons (supplementary) |
| Animations      | Framer Motion                                       |
| Forms           | React Hook Form + Zod resolver                      |
| State           | React Context (AuthContext)                          |
| HTTP Client     | Native `fetch` via `src/lib/api.ts` wrapper          |
| Notifications   | Sonner (toast notifications)                         |
| Font            | Geist (Sans + Mono)                                  |
| Charts          | Recharts                                             |
| Payments        | Razorpay (client SDK)                                |
| Theme           | `next-themes` (dark/light mode)                      |
| Package Mgr     | **pnpm** (always use `pnpm`, never `npm`/`yarn`)    |
| Linting         | ESLint (Next.js config)                              |

---

## 2. Project Architecture

```
src/
├── app/                       # Next.js App Router (pages & layouts)
│   ├── (auth)/                # Auth-protected route group
│   ├── (info)/                # Info pages route group
│   ├── (product)/             # Product pages route group
│   ├── (public)/              # Public pages route group
│   ├── auth/                  # Auth callback routes
│   ├── layout.tsx             # Root layout (providers, fonts, metadata)
│   ├── page.tsx               # Home page
│   ├── globals.css            # Global styles + CSS variables + Tailwind
│   ├── error.tsx              # Global error boundary
│   ├── not-found.tsx          # 404 page
│   └── loading.tsx            # Global loading state
├── components/                # All React components
│   ├── ui/                    # Shadcn/ui primitives (Button, Dialog, etc.)
│   ├── layout/                # Header, Footer, Sidebar
│   ├── home/                  # Home page sections
│   ├── about/                 # About page components
│   ├── auth/                  # Auth forms & components
│   ├── contact/               # Contact page components
│   ├── pricing/               # Pricing page components
│   ├── ads/                   # Ad components
│   ├── guards/                # Route guard components
│   ├── shared/                # Cross-page shared components
│   ├── skeleton/              # Skeleton loading components
│   └── utils/                 # Utility components
├── context/                   # React Context providers
├── enums/                     # TypeScript enums
│   └── index.ts               # Barrel export
├── hooks/                     # Custom React hooks
├── interfaces/                # TypeScript interfaces & types
│   └── index.ts               # Barrel export
└── lib/                       # Utility functions & services
    ├── api.ts                 # API client (fetch wrapper)
    ├── auth.ts                # Auth utilities
    ├── payment.ts             # Payment utilities
    ├── validation.ts          # Zod schemas
    ├── utils.ts               # General utilities (cn helper)
    ├── ads.ts                 # Ad service
    └── index.ts               # Barrel export
```

### Key Architecture Rules

1. **App Router** — all routing uses Next.js App Router with route groups.
2. **Server Components by default** — only add `"use client"` when truly needed (interactivity, hooks, browser APIs).
3. **Route Groups** — use parenthesized folders `(auth)`, `(public)`, etc. for layout grouping without URL segments.
4. **Component colocation** — page-specific components go in their feature folder, shared ones in `shared/`.
5. **No business logic in components** — delegate to `lib/` utilities and custom hooks.
6. **Path alias** — always import with `@/` prefix (maps to `./src/*`).

---

## 3. Naming Conventions

### Files

| Type            | Pattern                        | Example                     |
| --------------- | ------------------------------ | --------------------------- |
| Page            | `page.tsx`                     | `app/(public)/about/page.tsx` |
| Layout          | `layout.tsx`                   | `app/(auth)/layout.tsx`     |
| Loading         | `loading.tsx`                  | `app/loading.tsx`           |
| Error           | `error.tsx`                    | `app/error.tsx`             |
| Component       | `PascalCase.tsx`               | `HeroSection.tsx`           |
| Skeleton        | `<Component>Skeleton.tsx`      | `HeroSkeleton.tsx`          |
| Hook            | `use-<name>.ts` or `use<Name>.ts` | `use-mobile.tsx`        |
| Interface       | `<scope>.interface.ts`         | `auth.interface.ts`         |
| Enum            | `<scope>.enum.ts`              | `payment.enum.ts`           |
| Lib utility     | `<scope>.ts`                   | `api.ts`, `validation.ts`   |
| Barrel          | `index.ts`                     | Always named `index.ts`     |

### Code

| Element                | Convention         | Example                       |
| ---------------------- | ------------------ | ----------------------------- |
| Components             | PascalCase         | `HeroSection`, `StatCard`     |
| Props interfaces       | `I<Component>Props`| `IHeroSectionProps`           |
| Interfaces (general)   | Prefix with `I`    | `IAuthResponse`               |
| Type aliases           | PascalCase         | `AuthFormData`                |
| Enums                  | PascalCase         | `PlanType`                    |
| Enum members           | UPPER_SNAKE_CASE   | `FREE`, `PREMIUM`             |
| Hooks                  | `use` prefix       | `useRazorpay()`, `useToast()` |
| Functions              | camelCase          | `handleSubmit()`              |
| Variables              | camelCase          | `isLoading`                   |
| Constants              | UPPER_SNAKE_CASE   | `API_BASE_URL`                |
| CSS variables          | kebab-case         | `--primary`, `--muted`        |
| Tailwind classes       | kebab-case (default) | `text-primary`, `bg-card`   |

---

## 4. Component Rules

### General

- **One component per file** — component name must match filename.
- Default export for page-level and dynamically imported components.
- Named exports for shared/utility components.
- Props interface defined in the same file or in `interfaces/`.

### Server Components (Default)

- No `"use client"` directive.
- Can `async/await` directly.
- Can access server-only APIs.
- Cannot use `useState`, `useEffect`, or event handlers.

### Client Components

- Mark with `"use client"` at the top of the file.
- Only use when the component needs:
  - State (`useState`, `useReducer`)
  - Effects (`useEffect`, `useLayoutEffect`)
  - Event handlers (`onClick`, `onChange`)
  - Browser APIs (`window`, `document`, `localStorage`)
  - Third-party client libraries (Framer Motion, Recharts)

### Component Structure (Recommended Order)

```tsx
"use client";                        // 1. Client directive (if needed)

import { ... } from "react";        // 2. React imports
import { ... } from "next/...";     // 3. Next.js imports
import { ... } from "@/components"; // 4. Internal imports
import { ... } from "@/lib";        // 5. Utility imports
import { ... } from "@/interfaces"; // 6. Type imports

// 7. Component-local types/interfaces
interface IMyComponentProps { ... }

// 8. Component definition
export default function MyComponent({ prop1, prop2 }: IMyComponentProps) {
  // 9. Hooks
  // 10. Derived state / computed values
  // 11. Event handlers
  // 12. Render
  return ( ... );
}
```

---

## 5. Styling Rules

### TailwindCSS

- Use Tailwind utility classes as the **primary** styling approach.
- Use the `cn()` helper (from `@/lib/utils`) for conditional class merging:
  ```tsx
  <div className={cn("base-class", isActive && "active-class")} />
  ```
- **Dark mode**: use `dark:` prefix. The app uses class-based dark mode via `next-themes`.
- Use CSS variables defined in `globals.css` for theme-consistent colors:
  - `hsl(var(--primary))`, `hsl(var(--background))`, `hsl(var(--muted))`, etc.
- **Responsive**: use Tailwind breakpoints (`sm:`, `md:`, `lg:`, `xl:`). Mobile-first approach.

### Design Aesthetics (CRITICAL)

- **Premium feel** — every UI must look polished and premium.
- Use gradient backgrounds, glassmorphism, subtle glow effects, and refined shadows.
- Add micro-animations with Framer Motion for hover states, page transitions, and reveals.
- Use Geist font family — never fall back to system defaults without good reason.
- Follow the established color palette in `globals.css` — do not introduce ad-hoc colors.
- Dark mode must be **first-class** — never leave dark mode as an afterthought.

### Shadcn/ui

- UI primitives live in `src/components/ui/` — **never modify Shadcn files directly** unless extending.
- Import from `@/components/ui/<component>`.
- Use `variants` via `class-variance-authority` for component variants.
- Base color: `neutral`. CSS variables enabled.
- Icon library: `lucide-react`.

---

## 6. State Management

### Context

- Auth state via `AuthContext` in `src/context/`.
- Context providers wrap the app in `layout.tsx`.
- Keep contexts focused — one context per concern.
- Avoid deeply nested context providers. If more than 3, create a `Providers` wrapper.

### Local State

- Prefer `useState` for simple component state.
- Use `useReducer` for complex state transitions.
- Lift state up only when multiple siblings need it.

### Rules

- **No global state libraries** (Redux, Zustand, etc.) unless explicitly decided.
- Server state should come from Server Components or API calls, not client state.
- Cache server data appropriately (consider SWR/React Query for future expansion).

---

## 7. Data Fetching

### API Client (`src/lib/api.ts`)

- All API calls go through the centralized `api.ts` wrapper.
- **Never** use raw `fetch()` in components — always use the API utility.
- Handle errors consistently:
  ```typescript
  try {
    const data = await apiClient.get('/auth/me');
  } catch (error) {
    // Handle via toast or error boundary
  }
  ```

### Server-Side

- Use `async` Server Components for data fetching when possible.
- Apply `Suspense` boundaries with skeleton fallbacks:
  ```tsx
  <Suspense fallback={<HeroSkeleton />}>
    <HeroSection />
  </Suspense>
  ```

### Client-Side

- Fetch in `useEffect` or custom hooks.
- Always handle loading, error, and empty states.
- Show skeleton components during loading — **never** a blank screen.

---

## 8. Forms & Validation

- Use **React Hook Form** for all forms.
- Use **Zod** for schema validation via `@hookform/resolvers/zod`.
- Zod schemas live in `src/lib/validation.ts`.
- Form types derive from Zod schemas using `z.infer<typeof schema>`.
- Show validation errors inline below the corresponding field.
- Use Sonner toasts for success/error notifications after submission.

---

## 9. Routing & Navigation

### Route Groups

| Group        | Purpose             | Auth Required |
| ------------ | ------------------- | ------------- |
| `(public)`   | Marketing pages     | No            |
| `(auth)`     | Auth-protected pages| Yes           |
| `(info)`     | Info pages          | No            |
| `(product)`  | Product pages       | Varies        |

### Rules

- Use `next/link` for all internal navigation — never `<a>` tags for internal links.
- Use `next/navigation` hooks (`useRouter`, `usePathname`, `useSearchParams`) for programmatic navigation.
- Route guards in `src/components/guards/` — wrap protected layouts.
- Dynamic routes use `[param]` folder convention.
- Prefer parallel routes and intercepting routes for modals.

---

## 10. Performance

### Code Splitting

- Use `next/dynamic` for heavy, below-the-fold sections:
  ```tsx
  const FAQ = dynamic(() => import("@/components/home/FAQ"));
  ```
- Wrap dynamic components with `Suspense` + skeleton fallback.
- **HeroSection**: always statically imported (above the fold).

### Images

- Use `next/image` for all images — never raw `<img>` tags.
- Always specify `width`, `height`, or `fill`.
- Use `priority` on above-the-fold images.
- Use WebP format when possible.

### Bundle

- Avoid importing entire icon libraries. Import individual icons:
  ```tsx
  // ✅ Good
  import { Mail, Shield } from "lucide-react";

  // ❌ Bad
  import * as Icons from "lucide-react";
  ```

---

## 11. Loading & Skeleton States

- **Every** page and dynamically loaded section must have a skeleton.
- Skeletons live in `src/components/skeleton/`.
- Skeleton naming: `<Component>Skeleton.tsx`.
- Barrel export from `src/components/skeleton/index.ts`.
- Skeletons must **match the final layout** — same dimensions, same structure.
- Use the `Skeleton` UI component from Shadcn/ui for consistent pulse animation.
- **Both themes**: skeletons must look correct in dark and light mode.

---

## 12. Error Handling

### Error Boundaries

- Global error boundary: `src/app/error.tsx` (client component with `"use client"`).
- 404 page: `src/app/not-found.tsx`.
- Both must be visually polished — consistent with the app's premium design.

### API Errors

- Handle in `src/lib/api.ts` — standardize error format.
- Show user-friendly error messages (toasts via Sonner).
- Never expose raw error messages or stack traces to the user.
- Retry logic for transient failures (network errors) when appropriate.

---

## 13. Type Safety

### Interfaces (`src/interfaces/`)

- All interfaces prefixed with `I`.
- Organized by domain: `auth.interface.ts`, `payment.interface.ts`, etc.
- Barrel exported via `src/interfaces/index.ts`.
- Import from barrel:
  ```tsx
  import { IAuthResponse, IUser } from "@/interfaces";
  ```

### Enums (`src/enums/`)

- Domain-specific enums: `payment.enum.ts`, `ad.enum.ts`.
- Barrel exported via `src/enums/index.ts`.
- Prefer string enums for readability and serialization.

### Rules

- **No `any` type** — use proper types or `unknown` with type guards.
- Props must always be typed via interfaces.
- API response types must be defined in `interfaces/`.
- Use `z.infer<>` for form types derived from Zod schemas.

---

## 14. Accessibility (a11y)

- All interactive elements must be keyboard accessible.
- Use semantic HTML: `<main>`, `<nav>`, `<section>`, `<article>`, `<header>`, `<footer>`.
- All images must have meaningful `alt` text.
- Use `aria-label` on icon-only buttons.
- Color contrast must meet WCAG AA standards in both themes.
- Use Radix UI primitives (via Shadcn/ui) — they handle a11y out of the box.
- Test with keyboard navigation.

---

## 15. SEO

- Each page must have:
  - Descriptive `<title>` (via `metadata` export or `generateMetadata`).
  - `<meta name="description">` with compelling summary.
  - Proper heading hierarchy: single `<h1>`, sequential `<h2>`–`<h6>`.
- Use semantic HTML5 elements.
- Use `next/head` or metadata API — never hardcode `<head>` content.
- All interactive elements must have unique, descriptive `id` attributes.

---

## 16. Imports

### Order (enforced by convention)

1. React / React DOM
2. Next.js (`next/link`, `next/image`, `next/dynamic`, etc.)
3. Third-party libraries (Framer Motion, Radix, Zod, etc.)
4. Internal aliases (`@/components/`, `@/lib/`, `@/interfaces/`, etc.)
5. Relative imports (`./<file>`) — use only within the same module
6. Type-only imports (`import type { ... }`)

### Barrel Exports

- Every directory with multiple exports must have an `index.ts`.
- Prefer importing from barrels:
  ```tsx
  // ✅ Good
  import { IUser, IAuthResponse } from "@/interfaces";

  // ❌ Bad
  import { IUser } from "@/interfaces/auth.interface";
  ```

---

## 17. Animation Guidelines (Framer Motion)

- Use `motion` components for entrance/exit animations.
- Keep animations subtle — 200–400ms duration, ease curves.
- Common patterns:
  - `fadeIn`: `initial={{ opacity: 0 }} animate={{ opacity: 1 }}`
  - `slideUp`: `initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}`
  - `stagger`: use `variants` with `staggerChildren`.
- **Respect `prefers-reduced-motion`** — disable animations when user prefers reduced motion.
- Don't animate layout-affecting properties (width, height) unless using `layout` prop.

---

## 18. Git & Deployment

- Never commit `.env`, `node_modules/`, `.next/`, or build artifacts.
- Use `pnpm dev` for local development.
- Use `pnpm build` to validate before deploy.
- Ensure `pnpm lint` passes with zero errors.

---

## 19. Do's & Don'ts Summary

### ✅ Do

- Use Server Components by default — opt-in to client.
- Use `@/` path alias for all imports.
- Use `cn()` for conditional Tailwind classes.
- Provide skeleton fallbacks for every async boundary.
- Use Shadcn/ui primitives — don't reinvent buttons, dialogs, etc.
- Follow the established premium design language.
- Support dark mode for every component.
- Use `next/image` for all images.
- Use `next/link` for all internal navigation.
- Validate forms with Zod + React Hook Form.
- Type everything — interfaces for props, API responses, contexts.
- Use barrel exports.
- Use `pnpm` exclusively.

### ❌ Don't

- Don't use `"use client"` unless required.
- Don't use raw `fetch()` — use the `api.ts` wrapper.
- Don't use raw `<img>` or `<a>` tags.
- Don't use inline styles — use Tailwind utilities.
- Don't introduce new colors outside the design system.
- Don't skip loading/skeleton states.
- Don't use `any` type.
- Don't import entire libraries — import individual exports.
- Don't modify Shadcn/ui primitives without extending properly.
- Don't use `npm` or `yarn`.
- Don't commit `.env` or `node_modules/`.
- Don't create simple/basic designs — every UI must feel premium.
