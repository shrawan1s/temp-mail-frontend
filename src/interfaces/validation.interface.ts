/**
 * Profile update form values
 */
export interface IProfileFormValues {
    name: string;
    avatarUrl?: string;
}

/**
 * Password change form values
 */
export interface IPasswordChangeFormValues {
    currentPassword: string;
    newPassword: string;
    confirmPassword: string;
}

/**
 * Blocked sender form values
 */
export interface IBlockedSenderFormValues {
    email: string;
}
