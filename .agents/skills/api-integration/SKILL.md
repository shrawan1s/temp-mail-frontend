---
name: api-integration
description: Wires frontend to a backend endpoint with TypeScript interfaces, API call, and optional hook. Use when connecting UI to new or existing backend APIs.
---

# API Integration

Creates the full frontend-to-backend wiring: TypeScript interfaces, API call using the `api.ts` client, and optional custom hook.

## When to use this skill

- Connecting a UI component to a new backend endpoint
- Adding a new API call to an existing page
- Creating a custom hook for data fetching or mutations

## How to use it

### Step 1: Define TypeScript interfaces

Add to the appropriate file in `src/interfaces/`:

```typescript
// src/interfaces/<domain>.interface.ts

/** API response wrapper */
export interface I<Domain>Response {
  success: boolean;
  message: string;
  data: I<Domain>Data;
}

/** The actual data shape */
export interface I<Domain>Data {
  id: string;
  name: string;
  status: string;
  createdAt: string;
}

/** List response with pagination (if applicable) */
export interface I<Domain>ListResponse {
  success: boolean;
  message: string;
  data: {
    items: I<Domain>Data[];
    total: number;
    page: number;
    limit: number;
  };
}
```

Then export from the barrel `src/interfaces/index.ts`:

```typescript
export * from "./<domain>.interface";
```

### Step 2: Create API call functions

Use the existing `api` client from `src/lib/api.ts`:

```typescript
import { api } from "@/lib";
import { I<Domain>Response, I<Domain>ListResponse } from "@/interfaces";

// GET request
const data = await api.get<I<Domain>Response>('/domain');

// GET with parameters
const list = await api.get<I<Domain>ListResponse>(`/domain?page=${page}&limit=${limit}`);

// POST request
const result = await api.post<I<Domain>Response>('/domain', {
  name: 'New Item',
  description: 'Description',
});

// PUT request
const updated = await api.put<I<Domain>Response>(`/domain/${id}`, {
  name: 'Updated Name',
});

// DELETE request
const deleted = await api.delete<I<Domain>Response>(`/domain/${id}`);
```

### Step 3: Create a custom hook (optional, for reusable data fetching)

Create `src/hooks/use<Domain>.ts`:

```typescript
"use client";

import { useState, useEffect, useCallback } from "react";
import { api } from "@/lib";
import { I<Domain>Data, I<Domain>Response } from "@/interfaces";

/**
 * Hook for fetching and managing <domain> data.
 */
export function use<Domain>() {
  const [data, setData] = useState<I<Domain>Data | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await api.get<I<Domain>Response>('/domain');
      if (response.success) {
        setData(response.data);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return {
    data,
    loading,
    error,
    refetch: fetchData,
  };
}
```

### Step 4: Use in a component

#### Direct API call (simple, one-off use)

```tsx
"use client";

import { useState, useEffect } from "react";
import { api } from "@/lib";
import { I<Domain>Response } from "@/interfaces";
import { toast } from "sonner";

export default function <Component>() {
  const [data, setData] = useState<I<Domain>Data | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get<I<Domain>Response>('/domain')
      .then(res => setData(res.data))
      .catch(err => toast.error(err.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <Skeleton />;
  if (!data) return <EmptyState />;

  return ( /* render data */ );
}
```

#### With custom hook (reusable)

```tsx
"use client";

import { use<Domain> } from "@/hooks/use<Domain>";
import { toast } from "sonner";

export default function <Component>() {
  const { data, loading, error, refetch } = use<Domain>();

  if (loading) return <Skeleton />;
  if (error) {
    toast.error(error);
    return <ErrorState onRetry={refetch} />;
  }

  return ( /* render data */ );
}
```

#### Mutation (create/update/delete)

```tsx
const handleCreate = async (formData: CreateFormData) => {
  try {
    const result =
      (await api.post) < I < Domain > Response > ("/domain", formData);
    toast.success(result.message);
    refetch(); // Refresh the list
  } catch (error) {
    toast.error(error instanceof Error ? error.message : "Failed to create");
  }
};
```

## API client reference

The `api` client at `src/lib/api.ts` provides:

| Method   | Signature                      | Usage            |
| -------- | ------------------------------ | ---------------- |
| `get`    | `api.get<T>(endpoint)`         | Read data        |
| `post`   | `api.post<T>(endpoint, body?)` | Create / Actions |
| `put`    | `api.put<T>(endpoint, body?)`  | Update           |
| `delete` | `api.delete<T>(endpoint)`      | Delete           |

**Features:**

- Automatic JWT `Authorization` header from `localStorage`
- Automatic token refresh on 401 responses
- Typed generics for response shape

## Checklist

- [ ] Response interfaces defined in `src/interfaces/<domain>.interface.ts`
- [ ] Interfaces exported from `src/interfaces/index.ts` barrel
- [ ] API calls use the `api` client (never raw `fetch`)
- [ ] Response typed with generics: `api.get<IMyResponse>(...)`
- [ ] Loading state handled (skeleton or spinner)
- [ ] Error state handled (toast notification or error UI)
- [ ] Empty state handled when data is null/empty
- [ ] Custom hook created (if fetching is reused across components)
- [ ] Mutations show success/error toasts via Sonner

## Important conventions

- **Never** use raw `fetch()` — always use the `api` client from `@/lib`
- **Always** type API responses with interfaces from `@/interfaces`
- **Always** handle all three states: loading, error, and success
- **Use `toast`** from Sonner for user-facing error/success messages
- **Import from barrels**: `import { IUser } from "@/interfaces"` not from individual files
