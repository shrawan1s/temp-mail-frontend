'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import {
  User,
  Mail,
  Calendar,
  Crown,
  Edit2,
  Save,
  X,
  Lock,
  Trash2,
  Loader2,
} from 'lucide-react';
import { Header } from '@/components/layout';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/context/AuthContext';
import { authApi } from '@/lib/auth';
import { profileSchema, passwordChangeSchema, ProfileFormData, PasswordChangeFormData } from '@/lib/validation';
import { useRouter } from 'next/navigation';

export default function AccountPage() {
  const { user, refreshUser, logout } = useAuth();
  const { toast } = useToast();
  const router = useRouter();

  // Profile editing state
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  // Profile form with validation
  const profileForm = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: user?.name || '',
      avatarUrl: user?.avatar_url || '',
    },
  });

  // Password change form with validation
  const passwordForm = useForm<PasswordChangeFormData>({
    resolver: zodResolver(passwordChangeSchema),
    defaultValues: {
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    },
  });

  const [isChangingPassword, setIsChangingPassword] = useState(false);

  // Delete account state
  const [deletePassword, setDeletePassword] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  // Update form values when user changes
  useEffect(() => {
    if (user) {
      profileForm.reset({
        name: user.name,
        avatarUrl: user.avatar_url || '',
      });
    }
  }, [user, profileForm]);

  const handleSaveProfile = async (data: ProfileFormData) => {
    setIsSaving(true);
    try {
      const response = await authApi.updateMe({
        name: data.name,
        avatarUrl: data.avatarUrl,
      });

      if (response.success) {
        await refreshUser();
        setIsEditing(false);
        toast({
          title: 'Profile updated',
          description: 'Your profile has been updated successfully.',
        });
      } else {
        toast({
          title: 'Error',
          description: response.message || 'Failed to update profile',
          variant: 'destructive',
        });
      }
    } catch {
      toast({
        title: 'Error',
        description: 'Failed to update profile',
        variant: 'destructive',
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handleChangePassword = async (data: PasswordChangeFormData) => {
    setIsChangingPassword(true);
    try {
      const response = await authApi.changePassword({
        currentPassword: data.currentPassword,
        newPassword: data.newPassword,
      });

      if (response.success) {
        passwordForm.reset();
        toast({
          title: 'Password changed',
          description: 'Your password has been changed. Please log in again.',
        });
        // Log out after password change
        await logout();
        router.push('/login');
      } else {
        toast({
          title: 'Error',
          description: response.message || 'Failed to change password',
          variant: 'destructive',
        });
      }
    } catch {
      toast({
        title: 'Error',
        description: 'Failed to change password',
        variant: 'destructive',
      });
    } finally {
      setIsChangingPassword(false);
    }
  };

  const handleDeleteAccount = async () => {
    setIsDeleting(true);
    try {
      const response = await authApi.deleteAccount({
        password: deletePassword || undefined,
      });

      if (response.success) {
        toast({
          title: 'Account deleted',
          description: 'Your account has been permanently deleted.',
        });
        await logout();
        router.push('/');
      } else {
        toast({
          title: 'Error',
          description: response.message || 'Failed to delete account',
          variant: 'destructive',
        });
      }
    } catch {
      toast({
        title: 'Error',
        description: 'Failed to delete account',
        variant: 'destructive',
      });
    } finally {
      setIsDeleting(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const getPlanBadge = (plan: string) => {
    switch (plan.toLowerCase()) {
      case 'pro':
        return (
          <Badge className="bg-gradient-to-r from-purple-600 to-indigo-600">
            <Crown className="w-3 h-3 mr-1" />
            Pro
          </Badge>
        );
      case 'business':
        return (
          <Badge className="bg-gradient-to-r from-yellow-600 to-orange-600">
            <Crown className="w-3 h-3 mr-1" />
            Business
          </Badge>
        );
      default:
        return <Badge variant="secondary">Free</Badge>;
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-900 flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      <Header />

      <div className="container mx-auto px-4 pt-20 pb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto"
        >
          <div className="flex items-center mb-8">
            <User className="w-8 h-8 mr-3 dark:text-white" />
            <div>
              <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
                Account
              </h1>
              <p className="text-slate-600 dark:text-slate-400">
                Manage your profile and account settings
              </p>
            </div>
          </div>

          <div className="grid gap-6">
            {/* Profile Card */}
            <Card className="dark:bg-slate-800 dark:border-slate-700">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center dark:text-white">
                      <User className="w-5 h-5 mr-2" />
                      Profile
                    </CardTitle>
                    <CardDescription>
                      Your personal information
                    </CardDescription>
                  </div>
                  {!isEditing ? (
                    <Button
                      variant="outline"
                      size="sm"
                      className="dark:bg-slate-700 dark:border-slate-600 dark:text-white dark:hover:bg-slate-600"
                      onClick={() => {
                        profileForm.reset({
                          name: user.name,
                          avatarUrl: user.avatar_url || '',
                        });
                        setIsEditing(true);
                      }}
                    >
                      <Edit2 className="w-4 h-4 mr-2" />
                      Edit
                    </Button>
                  ) : (
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className="dark:bg-transparent dark:border-slate-600 dark:text-slate-200 dark:hover:bg-slate-800"
                        onClick={() => {
                          setIsEditing(false);
                          profileForm.clearErrors();
                        }}
                      >
                        <X className="w-4 h-4 mr-2" />
                        Cancel
                      </Button>
                      <Button
                        size="sm"
                        onClick={profileForm.handleSubmit(handleSaveProfile)}
                        disabled={isSaving}
                        className="bg-gradient-to-r from-blue-600 to-violet-600 hover:from-blue-700 hover:to-violet-700 text-white shadow-sm"
                      >
                        {isSaving ? (
                          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        ) : (
                          <Save className="w-4 h-4 mr-2" />
                        )}
                        Save
                      </Button>
                    </div>
                  )}
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-start gap-6">
                  {/* Avatar */}
                  <div className="flex-shrink-0">
                    <div className="w-24 h-24 rounded-full bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center text-white text-3xl font-bold overflow-hidden">
                      {user.avatar_url ? (
                        <img
                          src={user.avatar_url}
                          alt={user.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        user.name.charAt(0).toUpperCase()
                      )}
                    </div>
                  </div>

                  {/* Profile Info */}
                  <div className="flex-1 space-y-4">
                    {isEditing ? (
                      <>
                        <div className="space-y-2">
                          <Label htmlFor="name" className="dark:text-slate-200">Name</Label>
                          <Input
                            id="name"
                            {...profileForm.register('name')}
                            placeholder="Your name"
                            className={`bg-white dark:bg-slate-950 dark:border-slate-700 dark:text-white dark:placeholder:text-slate-400 ${
                              profileForm.formState.errors.name ? 'border-red-500' : ''
                            }`}
                          />
                          {profileForm.formState.errors.name && (
                            <p className="text-sm text-red-500">{profileForm.formState.errors.name.message}</p>
                          )}
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="avatar" className="dark:text-slate-200">Avatar URL</Label>
                          <Input
                            id="avatar"
                            {...profileForm.register('avatarUrl')}
                            placeholder="https://example.com/avatar.jpg"
                            className={`bg-white dark:bg-slate-950 dark:border-slate-700 dark:text-white ${
                              profileForm.formState.errors.avatarUrl ? 'border-red-500' : ''
                            }`}
                          />
                          {profileForm.formState.errors.avatarUrl && (
                            <p className="text-sm text-red-500">{profileForm.formState.errors.avatarUrl.message}</p>
                          )}
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="flex items-center gap-3">
                          <h3 className="text-2xl font-semibold dark:text-white">{user.name}</h3>
                          {getPlanBadge(user.plan)}
                        </div>
                        <div className="flex items-center text-slate-600 dark:text-slate-300">
                          <Mail className="w-4 h-4 mr-2" />
                          {user.email}
                        </div>
                        <div className="flex items-center text-slate-600 dark:text-slate-300">
                          <Calendar className="w-4 h-4 mr-2" />
                          Member since {formatDate(user.created_at)}
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Change Password Card */}
            <Card className="dark:bg-slate-800 dark:border-slate-700">
              <CardHeader>
                <CardTitle className="flex items-center dark:text-white">
                  <Lock className="w-5 h-5 mr-2" />
                  Change Password
                </CardTitle>
                <CardDescription>
                  Update your password to keep your account secure
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="current-password" className="dark:text-slate-200">Current Password</Label>
                  <Input
                    id="current-password"
                    type="password"
                    {...passwordForm.register('currentPassword')}
                    placeholder="Enter current password"
                    className={`bg-white dark:bg-slate-950 dark:border-slate-700 dark:text-white ${
                      passwordForm.formState.errors.currentPassword ? 'border-red-500' : ''
                    }`}
                  />
                  {passwordForm.formState.errors.currentPassword && (
                    <p className="text-sm text-red-500">{passwordForm.formState.errors.currentPassword.message}</p>
                  )}
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="new-password" className="dark:text-slate-200">New Password</Label>
                    <Input
                      id="new-password"
                      type="password"
                      {...passwordForm.register('newPassword')}
                      placeholder="Enter new password"
                      className={`bg-white dark:bg-slate-950 dark:border-slate-700 dark:text-white ${
                        passwordForm.formState.errors.newPassword ? 'border-red-500' : ''
                      }`}
                    />
                    {passwordForm.formState.errors.newPassword && (
                      <p className="text-sm text-red-500">{passwordForm.formState.errors.newPassword.message}</p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="confirm-password" className="dark:text-slate-200">Confirm New Password</Label>
                    <Input
                      id="confirm-password"
                      type="password"
                      {...passwordForm.register('confirmPassword')}
                      placeholder="Confirm new password"
                      className={`bg-white dark:bg-slate-950 dark:border-slate-700 dark:text-white dark:placeholder:text-slate-400 ${
                        passwordForm.formState.errors.confirmPassword ? 'border-red-500' : ''
                      }`}
                    />
                    {passwordForm.formState.errors.confirmPassword && (
                      <p className="text-sm text-red-500">{passwordForm.formState.errors.confirmPassword.message}</p>
                    )}
                  </div>
                </div>
                <Button
                  onClick={passwordForm.handleSubmit(handleChangePassword)}
                  className="bg-gradient-to-r from-blue-600 to-violet-600 hover:from-blue-700 hover:to-violet-700 text-white shadow-md w-full sm:w-auto"
                  disabled={isChangingPassword}
                >
                  {isChangingPassword ? (
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  ) : (
                    <Lock className="w-4 h-4 mr-2" />
                  )}
                  Change Password
                </Button>
              </CardContent>
            </Card>

            {/* Danger Zone */}
            <Card className="border-red-200 dark:border-red-900 dark:bg-slate-800">
              <CardHeader>
                <CardTitle className="flex items-center text-red-600 dark:text-red-400">
                  <Trash2 className="w-5 h-5 mr-2" />
                  Danger Zone
                </CardTitle>
                <CardDescription>
                  Irreversible actions for your account
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="p-4 bg-red-50 dark:bg-red-950/30 rounded-lg">
                  <h4 className="font-semibold text-red-600 dark:text-red-400 mb-2">
                    Delete Account
                  </h4>
                  <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
                    Once you delete your account, there is no going back. All your
                    data will be permanently removed.
                  </p>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button variant="destructive">
                        <Trash2 className="w-4 h-4 mr-2" />
                        Delete Account
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent className="dark:bg-slate-900 dark:border-slate-800">
                      <AlertDialogHeader>
                        <AlertDialogTitle className="dark:text-white">Are you absolutely sure?</AlertDialogTitle>
                        <AlertDialogDescription className="dark:text-slate-400">
                          This action cannot be undone. This will permanently delete
                          your account and remove all your data from our servers.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <div className="py-4">
                        <Label htmlFor="delete-password" className="dark:text-slate-200">
                          Enter your password to confirm
                        </Label>
                        <Input
                          id="delete-password"
                          type="password"
                          value={deletePassword}
                          onChange={(e) => setDeletePassword(e.target.value)}
                          placeholder="Your password"
                          className="mt-2 bg-white dark:bg-slate-950 dark:border-slate-700 dark:text-white dark:placeholder:text-slate-400"
                        />
                      </div>
                      <AlertDialogFooter>
                        <AlertDialogCancel className="dark:bg-transparent dark:text-slate-200 dark:hover:bg-slate-800 dark:border-slate-700">Cancel</AlertDialogCancel>
                        <AlertDialogAction
                          onClick={handleDeleteAccount}
                          disabled={isDeleting}
                          className="bg-red-600 hover:bg-red-700"
                        >
                          {isDeleting ? (
                            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                          ) : (
                            <Trash2 className="w-4 h-4 mr-2" />
                          )}
                          Delete Account
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </CardContent>
            </Card>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
