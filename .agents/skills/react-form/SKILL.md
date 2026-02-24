---
name: react-form
description: Builds a form with React Hook Form, Zod validation, Shadcn/ui elements, and Sonner toasts. Use when creating any form (settings, contact, profile, etc.).
---

# React Form

Creates a validated form using React Hook Form + Zod with Shadcn/ui form elements and Sonner toast notifications.

## When to use this skill

- Building any user input form (login, register, settings, contact, etc.)
- Adding a form to an existing page
- Creating a modal form (dialog + form)

## How to use it

### Step 1: Define the Zod schema

Add to `src/lib/validation.ts`:

```typescript
import { z } from 'zod';

/**
 * <Form name> validation schema
 */
export const <formName>Schema = z.object({
  name: z.string()
    .min(2, 'Name must be at least 2 characters')
    .max(50, 'Name must be less than 50 characters'),
  email: z.string()
    .email('Please enter a valid email address'),
  message: z.string()
    .min(10, 'Message must be at least 10 characters')
    .max(500, 'Message must be less than 500 characters'),
  agreeToTerms: z.boolean()
    .refine(val => val === true, 'You must agree to the terms'),
});

// Export inferred type
export type <FormName>FormData = z.infer<typeof <formName>Schema>;
```

### Common Zod patterns

```typescript
// Required string
z.string().min(1, "Field is required");

// Email
z.string().email("Invalid email address");

// Password with rules
z.string()
  .min(8, "Min 8 characters")
  .regex(/[A-Z]/, "Must contain uppercase")
  .regex(/[a-z]/, "Must contain lowercase")
  .regex(/\d/, "Must contain a number");

// Optional string
z.string().optional().or(z.literal(""));

// Optional URL
z.string().url("Invalid URL").optional().or(z.literal(""));

// Number with range
z.number().min(1).max(100);

// Enum
z.enum(["option1", "option2", "option3"]);

// Password confirmation
z.object({
  password: z.string().min(8),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  path: ["confirmPassword"],
  message: "Passwords do not match",
});
```

### Step 2: Create the form component

```tsx
"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { api } from "@/lib";
import { <formName>Schema, type <FormName>FormData } from "@/lib/validation";

// Shadcn/ui imports
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export default function <FormName>Form() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormName>FormData>({
    resolver: zodResolver(<formName>Schema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });

  const onSubmit = async (data: <FormName>FormData) => {
    try {
      await api.post("/endpoint", data);
      toast.success("Success!", {
        description: "Your form has been submitted.",
      });
      reset();
    } catch (error) {
      toast.error("Something went wrong", {
        description: error instanceof Error ? error.message : "Please try again.",
      });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {/* Text Input */}
      <div className="space-y-2">
        <Label htmlFor="name">Name</Label>
        <Input
          id="name"
          placeholder="Enter your name"
          {...register("name")}
          className={errors.name ? "border-destructive" : ""}
        />
        {errors.name && (
          <p className="text-sm text-destructive">{errors.name.message}</p>
        )}
      </div>

      {/* Email Input */}
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          placeholder="you@example.com"
          {...register("email")}
          className={errors.email ? "border-destructive" : ""}
        />
        {errors.email && (
          <p className="text-sm text-destructive">{errors.email.message}</p>
        )}
      </div>

      {/* Textarea */}
      <div className="space-y-2">
        <Label htmlFor="message">Message</Label>
        <Textarea
          id="message"
          placeholder="Your message..."
          rows={4}
          {...register("message")}
          className={errors.message ? "border-destructive" : ""}
        />
        {errors.message && (
          <p className="text-sm text-destructive">{errors.message.message}</p>
        )}
      </div>

      {/* Submit Button */}
      <Button type="submit" disabled={isSubmitting} className="w-full">
        {isSubmitting ? "Submitting..." : "Submit"}
      </Button>
    </form>
  );
}
```

### Step 3: Handle different input types

#### Select dropdown

```tsx
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

<Select
  onValueChange={(value) => setValue("plan", value)}
  defaultValue={getValues("plan")}
>
  <SelectTrigger>
    <SelectValue placeholder="Select a plan" />
  </SelectTrigger>
  <SelectContent>
    <SelectItem value="free">Free</SelectItem>
    <SelectItem value="pro">Pro</SelectItem>
  </SelectContent>
</Select>;
```

#### Checkbox

```tsx
import { Checkbox } from "@/components/ui/checkbox";

<div className="flex items-center space-x-2">
  <Checkbox
    id="terms"
    checked={watch("agreeToTerms")}
    onCheckedChange={(checked) => setValue("agreeToTerms", !!checked)}
  />
  <Label htmlFor="terms">I agree to the terms</Label>
</div>;
```

#### Switch toggle

```tsx
import { Switch } from "@/components/ui/switch";

<div className="flex items-center justify-between">
  <Label htmlFor="notifications">Enable notifications</Label>
  <Switch
    id="notifications"
    checked={watch("notifications")}
    onCheckedChange={(checked) => setValue("notifications", checked)}
  />
</div>;
```

## Toast notification patterns

```tsx
// Success
toast.success("Saved!", { description: "Your changes have been saved." });

// Error
toast.error("Failed", { description: "Something went wrong." });

// Loading
const toastId = toast.loading("Saving...");
// ... async operation
toast.success("Saved!", { id: toastId });
```

## Checklist

- [ ] Zod schema defined in `src/lib/validation.ts`
- [ ] Form type exported: `type <Name>FormData = z.infer<typeof schema>`
- [ ] Component uses `"use client"` directive
- [ ] `useForm` configured with `zodResolver`
- [ ] `defaultValues` set for all fields
- [ ] Error messages displayed below each field
- [ ] Submit button shows loading state (`isSubmitting`)
- [ ] Success toast via Sonner on successful submission
- [ ] Error toast on failure with descriptive message
- [ ] Form uses Shadcn/ui components (`Input`, `Button`, `Label`, etc.)
- [ ] All form fields have unique `id` attributes
- [ ] Works in both dark and light mode
