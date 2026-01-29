import { z } from 'zod';

/**
 * Profile update validation schema
 */
export const profileSchema = z.object({
    name: z.string()
        .min(2, 'Name must be at least 2 characters')
        .max(50, 'Name must be less than 50 characters'),
    avatarUrl: z.string()
        .url('Please enter a valid URL')
        .optional()
        .or(z.literal('')),
});

/**
 * Password change validation schema
 */
export const passwordChangeSchema = z.object({
    currentPassword: z.string()
        .min(1, 'Current password is required'),
    newPassword: z.string()
        .min(8, 'Password must be at least 8 characters')
        .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
        .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
        .regex(/\d/, 'Password must contain at least one number'),
    confirmPassword: z.string()
        .min(1, 'Please confirm your password'),
}).refine((data) => data.newPassword === data.confirmPassword, {
    path: ['confirmPassword'],
    message: 'Passwords do not match',
});

/**
 * Blocked sender validation schema
 */
export const blockedSenderSchema = z.object({
    email: z.string()
        .email('Please enter a valid email address'),
});

// Export inferred types for use with react-hook-form
export type ProfileFormData = z.infer<typeof profileSchema>;
export type PasswordChangeFormData = z.infer<typeof passwordChangeSchema>;
export type BlockedSenderFormData = z.infer<typeof blockedSenderSchema>;
