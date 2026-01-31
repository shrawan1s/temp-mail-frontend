# TempMail Pro - Frontend

A modern, responsive Next.js frontend for the TempMail Pro temporary email service. Built with TypeScript, Tailwind CSS, and shadcn/ui components, featuring Razorpay payment integration and comprehensive authentication flows.

## Table of Contents

- [Architecture](#architecture)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Features](#features)
- [Authentication Flow](#authentication-flow)
- [Payment Integration](#payment-integration)
- [Route Protection](#route-protection)
- [State Management](#state-management)
- [API Client](#api-client)
- [Components](#components)
- [Setup](#setup)
- [Scripts](#scripts)
- [Deployment](#deployment)
- [Key Files Reference](#key-files-reference)

---

## Architecture

```
┌──────────────────────────────────────────────────────────────────────────────┐
│                           FRONTEND (Next.js 15)                              │
│                                                                              │
│  ┌─────────────────────────────────────────────────────────────────────────┐ │
│  │                            App Router                                   │ │
│  │  ┌──────────────┐ ┌───────────────┐ ┌──────────────┐ ┌──────────────┐   │ │
│  │  │  (auth)/     │ │  (product)/   │ │  (public)/   │ │   (info)/    │   │ │
│  │  │  /login      │ │  /dashboard   │ │  /pricing    │ │ /coming-soon │   │ │
│  │  │  /signup     │ │  /settings    │ │  /about      │ │ /maintenance │   │ │
│  │  │  /verify     │ │  /account     │ │  /contact    │ └──────────────┘   │ │
│  │  │  /reset-pwd  │ └───────────────┘ │  /policies   │                    │ │
│  │  └──────────────┘                   └──────────────┘                    │ │
│  └─────────────────────────────────────────────────────────────────────────┘ │
│                                      │                                       │
│  ┌───────────────────────────────────┼─────────────────────────────────────┐ │
│  │                           Core Providers                                │ │
│  │  ┌─────────────────┐  ┌──────────────────┐  ┌────────────────────┐      │ │
│  │  │  ThemeProvider  │  │   AuthProvider   │  │   Toaster (Sonner) │      │ │
│  │  │  (next-themes)  │  │   (AuthContext)  │  │   (Notifications)  │      │ │
│  │  └─────────────────┘  └────────┬─────────┘  └────────────────────┘      │ │
│  └────────────────────────────────┼────────────────────────────────────────┘ │
│                                   │                                          │
│  ┌────────────────────────────────┼────────────────────────────────────────┐ │
│  │                          API Layer (lib/)                               │ │
│  │  ┌────────────┐  ┌────────────┐  ┌──────────────┐  ┌──────────────────┐ │ │
│  │  │  api.ts    │  │  auth.ts   │  │  payment.ts  │  │  validation.ts   │ │ │
│  │  │ (ApiClient)│  │ (authApi)  │  │ (paymentApi) │  │  (Zod schemas)   │ │ │
│  │  └──────┬─────┘  └──────┬─────┘  └──────┬───────┘  └──────────────────┘ │ │
│  └─────────┼───────────────┼───────────────┼───────────────────────────────┘ │
│            │               │               │                                 │
│            └───────────────┼───────────────┘                                 │
│                            │ HTTPS (JSON)                                    │
└────────────────────────────┼─────────────────────────────────────────────────┘
                             ▼
                ┌────────────────────────┐
                │    Backend             │
                │   /api/v1/auth/*       │
                │   /api/v1/payment/*    │
                └────────────────────────┘
```

---

## Tech Stack

| Category           | Technology                                  |
| ------------------ | ------------------------------------------- |
| **Framework**      | Next.js 15 (App Router)                     |
| **Language**       | TypeScript                                  |
| **Styling**        | Tailwind CSS                                |
| **UI Components**  | shadcn/ui (Radix UI primitives)             |
| **Forms**          | React Hook Form + Zod validation            |
| **Notifications**  | Sonner (toast)                              |
| **Animations**     | Framer Motion                               |
| **Icons**          | Lucide React, React Icons                   |
| **Theming**        | next-themes (dark/light mode)               |
| **Payment**        | Razorpay                                    |
| **Fonts**          | Geist Sans, Geist Mono                      |

---

## Project Structure

```
src/
├── app/                              # Next.js App Router
│   ├── (auth)/                       # Auth pages (GuestGuard protected)
│   │   ├── login/                    # Login page
│   │   ├── signup/                   # Registration page
│   │   ├── verify/                   # Email verification
│   │   ├── reset-password/           # Password reset flow
│   │   └── layout.tsx                # GuestGuard wrapper
│   │
│   ├── (product)/                    # Protected pages (AuthGuard)
│   │   ├── dashboard/                # User dashboard
│   │   ├── settings/                 # User settings
│   │   ├── account/                  # Account management
│   │   └── layout.tsx                # AuthGuard wrapper
│   │
│   ├── (public)/                     # Public pages
│   │   ├── pricing/                  # Pricing with Razorpay checkout
│   │   ├── about/                    # About page
│   │   ├── contact/                  # Contact form
│   │   ├── privacy-policy/           # Privacy policy
│   │   ├── terms-of-service/         # Terms of service
│   │   ├── cookie-policy/            # Cookie policy
│   │   ├── cancellation-refund/      # Cancellation & refund policy
│   │   ├── shipping-policy/          # Shipping policy
│   │   └── layout.tsx                # Public layout wrapper
│   │
│   ├── (info)/                       # Informational pages
│   │   ├── coming-soon/              # Coming soon page
│   │   └── maintenance/              # Maintenance page
│   │
│   ├── auth/
│   │   └── callback/                 # OAuth callback handler
│   │
│   ├── layout.tsx                    # Root layout (providers)
│   ├── page.tsx                      # Home page
│   ├── globals.css                   # Global styles
│   ├── error.tsx                     # Error boundary
│   ├── loading.tsx                   # Loading state
│   └── not-found.tsx                 # 404 page
│
├── components/
│   ├── auth/                         # Authentication forms
│   │   ├── LoginForm.tsx
│   │   ├── SignupForm.tsx
│   │   ├── VerifyForm.tsx
│   │   ├── ResetPasswordForm.tsx
│   │   └── NewPasswordForm.tsx
│   │
│   ├── guards/                       # Route protection
│   │   ├── AuthGuard.tsx             # Protects authenticated routes
│   │   └── GuestGuard.tsx            # Redirects logged-in users
│   │
│   ├── layout/                       # Layout components
│   │   ├── Header.tsx                # Navigation with user menu
│   │   └── Footer.tsx                # Site footer
│   │
│   ├── home/                         # Home page sections
│   │   ├── HeroSection.tsx
│   │   ├── FeaturesGrid.tsx
│   │   ├── HowItWorks.tsx
│   │   ├── PremiumPlans.tsx
│   │   ├── UseCases.tsx
│   │   ├── FAQ.tsx
│   │   ├── AboutPreview.tsx
│   │   └── ContactPreview.tsx
│   │
│   ├── pricing/                      # Pricing page components
│   │   ├── PricingCards.tsx          # Plan cards with Razorpay
│   │   ├── FeatureComparison.tsx     # Plan comparison table
│   │   ├── HeroSection.tsx
│   │   └── FAQ.tsx
│   │
│   ├── about/                        # About page components
│   │   ├── HeroSection.tsx
│   │   ├── MissionSection.tsx
│   │   ├── ValuesGrid.tsx
│   │   ├── Statistics.tsx
│   │   ├── TechStack.tsx
│   │   └── SecurityAndPrivacy.tsx
│   │
│   ├── contact/                      # Contact page components
│   │   ├── HeroSection.tsx
│   │   ├── ContactForm.tsx
│   │   └── ContactMethods.tsx
│   │
│   ├── shared/                       # Shared components
│   │   ├── SSOButtons.tsx            # OAuth login buttons
│   │   ├── AuthCard.tsx              # Auth form wrapper
│   │   └── Shimmer.tsx               # Loading shimmer effect
│   │
│   ├── skeleton/                     # Loading skeleton components
│   │   └── ...                       # Various skeleton components
│   │
│   ├── ui/                           # shadcn/ui components
│   │   └── ...                       # Button, Card, Input, etc.
│   │
│   └── utils/
│       └── theme-provider.tsx        # Theme context wrapper
│
├── context/
│   └── AuthContext.tsx               # Global auth state management
│
├── enums/
│   └── payment.enum.ts               # Payment-related enums
│
├── hooks/
│   ├── use-toast.ts                  # Toast notifications hook
│   ├── use-mobile.tsx                # Mobile detection hook
│   └── useRazorpay.ts                # Razorpay payment hook
│
├── interfaces/
│   ├── api.interface.ts              # API response types
│   ├── auth.interface.ts             # Auth-related types
│   ├── auth-context.interface.ts     # AuthContext types
│   ├── component.interface.ts        # Component prop types
│   ├── hook.interface.ts             # Hook types
│   ├── payment.interface.ts          # Payment types
│   ├── razorpay.interface.ts         # Razorpay SDK types
│   ├── validation.interface.ts       # Validation types
│   └── index.ts                      # Barrel export
│
└── lib/
    ├── api.ts                        # API client with auto token refresh
    ├── auth.ts                       # Auth API + token storage
    ├── payment.ts                    # Payment API functions
    ├── validation.ts                 # Zod validation schemas
    ├── utils.ts                      # Utility functions
    └── index.ts                      # Barrel export
```

---

## Features

### Core Features

- 🔐 **Complete Authentication** - Email/password, OAuth (Google, GitHub)
- 📧 **Email Verification** - 6-digit code verification flow
- 🔑 **Password Reset** - Token-based password recovery
- 🌓 **Dark/Light Theme** - System preference + manual toggle
- 📱 **Responsive Design** - Mobile-first approach
- ⚡ **Optimized Loading** - Skeleton loaders, dynamic imports

### Payment Features

- 💳 **Razorpay Integration** - Seamless payment checkout
- 📊 **Multiple Plans** - Free, Pro, Business tiers
- 🔄 **Billing Cycles** - Monthly and annual options
- ✅ **Payment Verification** - Secure server-side verification
- 📋 **Subscription Management** - View current plan status

### Page Features

| Page                 | Features                                        |
| -------------------- | ----------------------------------------------- |
| **Home**             | Hero, Features, How it Works, Plans, FAQ        |
| **Pricing**          | Plan cards, Feature comparison, Razorpay        |
| **About**            | Mission, Values, Statistics, Tech Stack         |
| **Contact**          | Contact form, Contact methods                   |
| **Dashboard**        | User dashboard (protected)                      |
| **Settings**         | User preferences (protected)                    |
| **Account**          | Account management (protected)                  |
| **Legal Pages**      | Privacy, Terms, Cookies, Refund, Shipping       |

---

## Authentication Flow

### Email/Password Registration

```
User fills signup form
        ↓
SignupForm.tsx → authApi.register()
        ↓
POST /api/v1/auth/register
        ↓
Redirect to /verify?userId=xxx&email=xxx
        ↓
User enters 6-digit code
        ↓
VerifyForm.tsx → authApi.verifyEmail()
        ↓
POST /api/v1/auth/verify-email
        ↓
Store tokens → AuthContext.login() → /dashboard
```

### Email/Password Login

```
User fills login form
        ↓
LoginForm.tsx → authApi.login()
        ↓
POST /api/v1/auth/login
        ↓
Success: Store tokens → /dashboard
        ↓
If not verified: Redirect to /verify
```

### OAuth Login (Google/GitHub)

```
User clicks "Continue with Google/GitHub"
        ↓
SSOButtons.tsx → Redirect to OAuth provider
        ↓
User authorizes → Provider redirects to /auth/callback
        ↓
callback/page.tsx → authApi.oauthLogin()
        ↓
POST /api/v1/auth/oauth
        ↓
Store tokens → /dashboard
```

### Password Reset

```
User clicks "Forgot password"
        ↓
ResetPasswordForm.tsx → authApi.requestPasswordReset()
        ↓
POST /api/v1/auth/password-reset/request
        ↓
User receives email with reset link
        ↓
Click link → /reset-password?token=xxx
        ↓
NewPasswordForm.tsx → authApi.resetPassword()
        ↓
POST /api/v1/auth/password-reset/confirm
        ↓
Redirect to /login
```

### Automatic Token Refresh

```
AuthContext initializes
        ↓
Check localStorage for tokens
        ↓
If access token exists: authApi.getMe()
        ↓
If 401: ApiClient handles refresh automatically
        ↓
Update stored tokens → Set user state
```

---

## Payment Integration

### Overview

The frontend integrates with Razorpay for secure payment processing. All payment requests are authenticated via JWT tokens, and payment verification happens server-side.

### Payment Flow

```
User selects plan on /pricing
        ↓
PricingCards.tsx → useRazorpay hook
        ↓
Check authentication (redirect to /login if needed)
        ↓
paymentApi.createOrder(planId, billingCycle)
        ↓
POST /api/v1/payment/create-order
        ↓
Receive: orderId, amount, currency, razorpayKeyId
        ↓
Load Razorpay SDK → Open checkout modal
        ↓
User completes payment
        ↓
paymentApi.verifyPayment(orderId, paymentId, signature)
        ↓
POST /api/v1/payment/verify
        ↓
Success: Subscription activated → Refresh state
```

### Payment API

```typescript
import { paymentApi } from '@/lib';

// Get all available plans (public)
const plans = await paymentApi.getPlans();

// Create order (authenticated)
const order = await paymentApi.createOrder('pro', 'monthly');

// Verify payment (authenticated)
const result = await paymentApi.verifyPayment(orderId, paymentId, signature);

// Get current subscription (authenticated)
const subscription = await paymentApi.getSubscription();
```

### useRazorpay Hook

```typescript
import { useRazorpay } from '@/hooks/useRazorpay';
import { BillingCycle } from '@/enums';

const { initiatePayment, isLoading, error } = useRazorpay({
  onSuccess: (result) => {
    console.log('Plan:', result.planKey, 'Expires:', result.expiresAt);
  },
  onError: (error) => {
    console.error('Payment failed:', error.message);
  },
  onCancel: () => {
    console.log('Payment cancelled');
  },
});

// Initiate payment
await initiatePayment('plan-id', BillingCycle.MONTHLY, 'Pro');
```

### Payment Enums

```typescript
// enums/payment.enum.ts
enum PlanTier { FREE = 0, PRO = 1, BUSINESS = 2 }
enum PlanKey { FREE = 'free', PRO = 'pro', BUSINESS = 'business' }
enum BillingCycle { MONTHLY = 'monthly', ANNUAL = 'annual' }
enum SubscriptionStatus { ACTIVE, CANCELLED, EXPIRED, PENDING }
enum PaymentStatus { PENDING, SUCCESS, FAILED }
enum PlanStatus { CURRENT, UPGRADE, DOWNGRADE, SWITCH }
```

---

## Route Protection

### AuthGuard (Protected Routes)

Wraps routes that require authentication:

```tsx
// app/(product)/layout.tsx
export default function ProductLayout({ children }) {
  return <AuthGuard>{children}</AuthGuard>;
}
```

**Protected routes**: `/dashboard`, `/settings`, `/account`

**Behavior**:
- Shows loading spinner while checking auth
- Redirects to `/login` if not authenticated
- Renders children if authenticated

### GuestGuard (Auth Pages)

Wraps routes that should only be accessible to guests:

```tsx
// app/(auth)/layout.tsx
export default function AuthLayout({ children }) {
  return <GuestGuard>{children}</GuestGuard>;
}
```

**Guest routes**: `/login`, `/signup`, `/verify`, `/reset-password`

**Behavior**:
- Shows loading spinner while checking auth
- Redirects to `/dashboard` if already authenticated
- Renders children if not authenticated

---

## State Management

### AuthContext

Provides global authentication state:

```tsx
import { useAuth } from '@/context';

const { user, isAuthenticated, isLoading, login, logout, refreshUser } = useAuth();
```

| Property          | Type           | Description                     |
| ----------------- | -------------- | ------------------------------- |
| `user`            | `User \| null` | Current user data               |
| `isAuthenticated` | `boolean`      | Whether user is logged in       |
| `isLoading`       | `boolean`      | Initial auth check in progress  |
| `login`           | `function`     | Store tokens and set user       |
| `logout`          | `function`     | Clear tokens and redirect       |
| `refreshUser`     | `function`     | Re-fetch user data              |

### Token Storage

Tokens are stored in `localStorage`:

```typescript
import { tokenStorage } from '@/lib';

tokenStorage.setTokens(accessToken, refreshToken);
tokenStorage.getAccessToken();
tokenStorage.getRefreshToken();
tokenStorage.clearTokens();
tokenStorage.hasTokens();
```

---

## API Client

### Overview

The `ApiClient` class provides a robust HTTP client with:

- Automatic Bearer token injection
- 401 handling with automatic token refresh
- Request queuing during refresh
- Typed responses

### Usage

```typescript
import { api } from '@/lib';

// GET request
const response = await api.get<UserResponse>('/auth/me');

// POST request
const response = await api.post<AuthResponse>('/auth/login', { email, password });

// PUT request
const response = await api.put<SettingsResponse>('/auth/settings', { darkMode: true });

// DELETE request
const response = await api.delete<SimpleResponse>('/auth/delete-account');
```

### Auth API Functions

```typescript
import { authApi } from '@/lib';

// Authentication
await authApi.register({ email, password, name });
await authApi.login({ email, password });
await authApi.logout();
await authApi.oauthLogin({ provider, code, redirectUri });

// Email verification
await authApi.verifyEmail({ userId, code });
await authApi.resendVerification({ email });

// Password reset
await authApi.requestPasswordReset({ email });
await authApi.resetPassword({ token, newPassword });

// User management
await authApi.getMe();
await authApi.updateMe({ name, avatarUrl });
await authApi.changePassword({ currentPassword, newPassword });
await authApi.deleteAccount({ password });

// Settings
await authApi.getSettings();
await authApi.updateSettings({ darkMode, notifications, ... });
```

---

## Components

### Layout Components

| Component   | Purpose                                   |
| ----------- | ----------------------------------------- |
| `Header`    | Navigation bar with user menu & theme     |
| `Footer`    | Site footer with links                    |

### Auth Components

| Component             | Purpose                         |
| --------------------- | ------------------------------- |
| `LoginForm`           | Email/password login            |
| `SignupForm`          | User registration               |
| `VerifyForm`          | Email verification (OTP)        |
| `ResetPasswordForm`   | Request password reset          |
| `NewPasswordForm`     | Set new password                |
| `SSOButtons`          | OAuth login buttons             |
| `AuthCard`            | Styled wrapper for auth forms   |

### Pricing Components

| Component           | Purpose                                |
| ------------------- | -------------------------------------- |
| `PricingCards`      | Plan cards with Razorpay checkout      |
| `FeatureComparison` | Feature comparison table               |
| `HeroSection`       | Pricing page header                    |
| `FAQ`               | Frequently asked questions             |

### Guard Components

| Component    | Purpose                              |
| ------------ | ------------------------------------ |
| `AuthGuard`  | Protects authenticated routes        |
| `GuestGuard` | Redirects authenticated users        |

---

## Setup

### Prerequisites

- Node.js 18+
- pnpm (recommended) or npm
- Backend Gateway running

### Installation

```bash
# Clone repository
git clone <repository-url>
cd frontend

# Install dependencies
pnpm install

# Copy environment file
cp .env.example .env.local

# Start development server
pnpm dev
```

### Environment Variables

Create `.env.local` with:

```env
# API Gateway URL (required)
NEXT_PUBLIC_API_URL=http://localhost:5000/api/v1

# OAuth Client IDs (for SSO buttons)
NEXT_PUBLIC_GOOGLE_CLIENT_ID=your-google-client-id
NEXT_PUBLIC_GITHUB_CLIENT_ID=your-github-client-id

# OAuth Redirect URI
NEXT_PUBLIC_OAUTH_REDIRECT_URI=http://localhost:3000/auth/callback
```

---

## Scripts

| Command       | Description                    |
| ------------- | ------------------------------ |
| `pnpm dev`    | Start development server       |
| `pnpm build`  | Build for production           |
| `pnpm start`  | Start production server        |
| `pnpm lint`   | Run ESLint                     |

---

## Deployment

### Production Build

```bash
pnpm build
pnpm start
```

### Environment Variables for Production

```env
NEXT_PUBLIC_API_URL=https://api.yourdomain.com/api/v1
NEXT_PUBLIC_GOOGLE_CLIENT_ID=your-prod-google-client-id
NEXT_PUBLIC_GITHUB_CLIENT_ID=your-prod-github-client-id
NEXT_PUBLIC_OAUTH_REDIRECT_URI=https://yourdomain.com/auth/callback
```

### OAuth Callback URLs

Update in provider consoles:

- **Google**: `https://yourdomain.com/auth/callback`
- **GitHub**: `https://yourdomain.com/auth/callback`

---

## Key Files Reference

| File                                    | Purpose                                  |
| --------------------------------------- | ---------------------------------------- |
| `lib/api.ts`                            | API client with auto token refresh       |
| `lib/auth.ts`                           | Auth API functions + token storage       |
| `lib/payment.ts`                        | Payment API functions                    |
| `lib/validation.ts`                     | Zod validation schemas                   |
| `context/AuthContext.tsx`               | Global auth state provider               |
| `hooks/useRazorpay.ts`                  | Razorpay payment hook                    |
| `components/guards/AuthGuard.tsx`       | Protected route wrapper                  |
| `components/guards/GuestGuard.tsx`      | Guest route wrapper                      |
| `components/layout/Header.tsx`          | Navigation with user menu                |
| `components/pricing/PricingCards.tsx`   | Plan cards with payment                  |
| `app/auth/callback/page.tsx`            | OAuth callback handler                   |
| `app/layout.tsx`                        | Root layout with providers               |
| `enums/payment.enum.ts`                 | Payment-related enums                    |
| `interfaces/payment.interface.ts`       | Payment type definitions                 |
| `interfaces/razorpay.interface.ts`      | Razorpay SDK types                       |

---

## SEO & Metadata

The app includes comprehensive SEO configuration:

- **Open Graph** tags for social sharing
- **Twitter Card** metadata
- **Robots** configuration for search engines
- **Sitemap** and canonical URLs
- **Favicon** and app icons

```typescript
// app/layout.tsx
export const metadata: Metadata = {
  title: 'TempMail Pro - Secure Temporary Email Service',
  description: 'Generate secure, private temporary email addresses instantly...',
  openGraph: { ... },
  twitter: { ... },
  robots: { ... },
};
```

---

## License

This project is proprietary software. All rights reserved.
