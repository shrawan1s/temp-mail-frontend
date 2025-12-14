# TempMail Pro - Frontend

A modern, responsive Next.js frontend for the TempMail Pro temporary email service. Built with TypeScript, Tailwind CSS, and shadcn/ui components.

## Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                      FRONTEND (Next.js)                     │
│                                                             │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐       │
│  │  Auth Pages  │  │   Product    │  │   Public     │       │
│  │  /login      │  │  /dashboard  │  │   /home      │       │
│  │  /signup     │  │  /settings   │  │   /pricing   │       │
│  │  /verify     │  │              │  │   /about     │       │
│  └──────┬───────┘  └──────┬───────┘  └──────────────┘       │
│         │                 │                                 │
│         └────────┬────────┘                                 │
│                  ▼                                          │
│         ┌──────────────────┐                                │
│         │   AuthContext    │  (Global auth state)           │
│         └────────┬─────────┘                                │
│                  ▼                                          │
│         ┌──────────────────┐                                │
│         │    API Client    │  (lib/api.ts)                  │
│         └────────┬─────────┘                                │
└──────────────────┼──────────────────────────────────────────┘
                   │ HTTPS
                   ▼
          ┌──────────────────┐
          │     Gateway      │
          │  /api/v1/auth/*  │
          └──────────────────┘
```

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **Forms**: React Hook Form + Zod validation
- **Notifications**: Sonner (toast)
- **Animations**: Framer Motion
- **Icons**: Lucide React, React Icons

## Project Structure

```
src/
├── app/                      # Next.js App Router
│   ├── (auth)/               # Auth pages (GuestGuard protected)
│   │   ├── login/
│   │   ├── signup/
│   │   ├── verify/
│   │   ├── reset-password/
│   │   └── layout.tsx        # GuestGuard wrapper
│   ├── (product)/            # Protected pages (AuthGuard)
│   │   ├── dashboard/
│   │   ├── settings/
│   │   └── layout.tsx        # AuthGuard wrapper
│   ├── (public)/             # Public pages
│   │   ├── pricing/
│   │   ├── about/
│   │   └── contact/
│   ├── auth/
│   │   └── callback/         # OAuth callback handler
│   ├── layout.tsx            # Root layout (AuthProvider)
│   └── page.tsx              # Home page
├── components/
│   ├── auth/                 # Auth form components
│   │   ├── LoginForm.tsx
│   │   ├── SignupForm.tsx
│   │   ├── VerifyForm.tsx
│   │   ├── ResetPasswordForm.tsx
│   │   └── NewPasswordForm.tsx
│   ├── guards/               # Route protection
│   │   ├── AuthGuard.tsx     # Protects authenticated routes
│   │   └── GuestGuard.tsx    # Redirects logged-in users
│   ├── layout/
│   │   └── Header.tsx        # Navigation with user menu
│   ├── shared/
│   │   └── SSOButtons.tsx    # OAuth login buttons
│   └── ui/                   # shadcn/ui components
├── context/
│   └── AuthContext.tsx       # Global auth state management
├── lib/
│   ├── api.ts                # API client with auth headers
│   └── auth.ts               # Auth API functions + token storage
├── hooks/
│   └── use-toast.ts
└── interfaces/
```

## Authentication Flow

### 1. Email/Password Registration

```
User fills signup form
        ↓
SignupForm.tsx → authApi.register()
        ↓
API: POST /api/v1/auth/register
        ↓
Success: Redirect to /verify?userId=xxx&email=xxx
        ↓
User enters 6-digit code from email
        ↓
VerifyForm.tsx → authApi.verifyEmail()
        ↓
API: POST /api/v1/auth/verify-email
        ↓
Success: Store tokens → AuthContext.login() → Redirect to /dashboard
```

### 2. Email/Password Login

```
User fills login form
        ↓
LoginForm.tsx → authApi.login()
        ↓
API: POST /api/v1/auth/login
        ↓
Success: Store tokens → AuthContext.login() → Redirect to /dashboard
        ↓
If "Email not verified": Redirect to /verify
```

### 3. OAuth Login (Google/GitHub)

```
User clicks "Continue with Google/GitHub"
        ↓
SSOButtons.tsx → Redirect to OAuth provider
        ↓
User authorizes → Provider redirects to /auth/callback?code=xxx&state=google
        ↓
callback/page.tsx → authApi.oauthLogin()
        ↓
API: POST /api/v1/auth/oauth/google
        ↓
Success: Store tokens → AuthContext.login() → Redirect to /dashboard
```

### 4. Password Reset

```
User clicks "Forgot password" → /reset-password
        ↓
ResetPasswordForm.tsx → authApi.requestPasswordReset()
        ↓
API: POST /api/v1/auth/password-reset/request
        ↓
User receives email with reset link
        ↓
User clicks link → /reset-password?token=xxx
        ↓
NewPasswordForm.tsx → authApi.resetPassword()
        ↓
API: POST /api/v1/auth/password-reset/confirm
        ↓
Success: Redirect to /login
```

### 5. Token Refresh (Automatic)

```
AuthContext initializes
        ↓
Check localStorage for tokens
        ↓
If access token exists: authApi.getMe()
        ↓
If 401: authApi.refresh() with refresh token
        ↓
Update stored tokens → Set user state
```

## Route Protection

### AuthGuard (Protected Routes)

Used for routes that require authentication:

- `/dashboard`
- `/settings`

```tsx
// app/(product)/layout.tsx
<AuthGuard>{children}</AuthGuard>
```

Behavior:

- Shows loading spinner while checking auth
- Redirects to `/login` if not authenticated
- Renders children if authenticated

### GuestGuard (Auth Pages)

Used for routes that should only be accessible to guests:

- `/login`
- `/signup`
- `/verify`
- `/reset-password`

```tsx
// app/(auth)/layout.tsx
<GuestGuard>{children}</GuestGuard>
```

Behavior:

- Shows loading spinner while checking auth
- Redirects to `/dashboard` if already authenticated
- Renders children if not authenticated

## State Management

### AuthContext

Provides global authentication state:

```tsx
const { user, isAuthenticated, isLoading, login, logout, refreshUser } =
  useAuth();
```

| Property          | Type           | Description                    |
| ----------------- | -------------- | ------------------------------ |
| `user`            | `User \| null` | Current user data              |
| `isAuthenticated` | `boolean`      | Whether user is logged in      |
| `isLoading`       | `boolean`      | Initial auth check in progress |
| `login`           | `function`     | Store tokens and set user      |
| `logout`          | `function`     | Clear tokens and redirect      |
| `refreshUser`     | `function`     | Re-fetch user data             |

### Token Storage

Tokens are stored in `localStorage`:

```typescript
// lib/auth.ts
tokenStorage.setTokens(accessToken, refreshToken);
tokenStorage.getAccessToken(); // For API requests
tokenStorage.getRefreshToken(); // For refresh requests
tokenStorage.clearTokens(); // On logout
```

## API Client

### Base Configuration

```typescript
// lib/api.ts
const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api/v1";
```

### Making Requests

```typescript
// Automatically adds Authorization header if token exists
const response = await api.get("/auth/me");
const response = await api.post("/auth/login", { email, password });
```

## Components

### Header

Shows different UI based on auth state:

- **Not logged in**: "Get Started Free" button
- **Logged in**: User avatar dropdown with Dashboard, Settings, Sign Out
- **Logout**: Shows confirmation modal before signing out

### Auth Forms

All forms use:

- `react-hook-form` for form state
- `zod` for validation
- `sonner` for toast notifications
- Loading states during API calls

## Setup

### Prerequisites

- Node.js 18+
- pnpm
- Backend Gateway running

### Installation

```bash
# Install dependencies
pnpm install

# Start development server
pnpm dev
```

### Environment Variables

Create `.env.local`:

```env
# API Gateway URL
NEXT_PUBLIC_API_URL=http://localhost:5000/api/v1

# OAuth Client IDs (for SSO buttons)
NEXT_PUBLIC_GOOGLE_CLIENT_ID=your-google-client-id
NEXT_PUBLIC_GITHUB_CLIENT_ID=your-github-client-id
```

## Scripts

```bash
pnpm dev          # Start development server
pnpm build        # Build for production
pnpm start        # Start production server
pnpm lint         # Run ESLint
```

## Deployment

### Build

```bash
pnpm build
```

### Environment Variables for Production

```env
NEXT_PUBLIC_API_URL=https://api.yourdomain.com/api/v1
NEXT_PUBLIC_GOOGLE_CLIENT_ID=your-prod-google-client-id
NEXT_PUBLIC_GITHUB_CLIENT_ID=your-prod-github-client-id
```

### OAuth Callback URLs

Update in provider consoles:

- Google: `https://yourdomain.com/auth/callback`
- GitHub: `https://yourdomain.com/auth/callback`

## Key Files

| File                              | Purpose                           |
| --------------------------------- | --------------------------------- |
| `lib/api.ts`                      | API client with auth headers      |
| `lib/auth.ts`                     | Auth API functions, token storage |
| `context/AuthContext.tsx`         | Global auth state                 |
| `components/guards/AuthGuard.tsx` | Route protection                  |
| `app/auth/callback/page.tsx`      | OAuth callback handler            |
| `components/layout/Header.tsx`    | Navigation with user menu         |
