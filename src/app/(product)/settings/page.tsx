'use client';

import { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';
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
import { Switch } from '@/components/ui/switch';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import {
  Settings,
  Sun,
  Moon,
  Shield,
  Bell,
  Trash2,
  Crown,
  Mail,
  Loader2,
  User,
} from 'lucide-react';
import { Header } from '@/components/layout';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/context/AuthContext';
import { authApi } from '@/lib/auth';
import { blockedSenderSchema, BlockedSenderFormData } from '@/lib/validation';
import Link from 'next/link';

export default function SettingsPage() {
  const { user, isLoading: isAuthLoading } = useAuth();
  const { toast } = useToast();
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Settings state
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [autoRefresh, setAutoRefresh] = useState(true);
  const [notifications, setNotifications] = useState(true);
  const [emailExpiry, setEmailExpiry] = useState('24h');
  const [blockedSenders, setBlockedSenders] = useState<string[]>([]);

  // Blocked sender form with validation
  const blockedSenderForm = useForm<BlockedSenderFormData>({
    resolver: zodResolver(blockedSenderSchema),
    defaultValues: {
      email: '',
    },
  });

  // Ensure mounted before accessing theme to avoid hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  // Load settings on mount
  useEffect(() => {
    const loadSettings = async () => {
      try {
        const response = await authApi.getSettings();
        if (response.success && response.data?.settings) {
          setAutoRefresh(response.data.settings.auto_refresh);
          setNotifications(response.data.settings.notifications);
          setEmailExpiry(response.data.settings.email_expiry);
          setBlockedSenders(response.data.settings.blocked_senders || []);
          // Sync theme from settings if saved
          if (response.data.settings.dark_mode !== undefined && mounted) {
            setTheme(response.data.settings.dark_mode ? 'dark' : 'light');
          }
        }
      } catch (error) {
        console.error('Failed to load settings:', error);
        toast({
          title: 'Error',
          description: 'Failed to load settings. Using defaults.',
          variant: 'destructive',
        });
      } finally {
        setIsLoading(false);
      }
    };

    if (!isAuthLoading && user) {
      loadSettings();
    } else if (!isAuthLoading) {
      setIsLoading(false);
    }
  }, [isAuthLoading, user, mounted, setTheme, toast]);

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const response = await authApi.updateSettings({
        darkMode: resolvedTheme === 'dark',
        autoRefresh,
        notifications,
        emailExpiry,
        blockedSenders,
      });

      if (response.success) {
        toast({
          title: 'Settings saved',
          description: 'Your preferences have been updated successfully',
        });
      } else {
        toast({
          title: 'Error',
          description: response.message || 'Failed to save settings',
          variant: 'destructive',
        });
      }
    } catch {
      toast({
        title: 'Error',
        description: 'Failed to save settings',
        variant: 'destructive',
      });
    } finally {
      setIsSaving(false);
    }
  };

  const addBlockedSender = (data: BlockedSenderFormData) => {
    if (!blockedSenders.includes(data.email)) {
      setBlockedSenders([...blockedSenders, data.email]);
      blockedSenderForm.reset();
      toast({
        title: 'Sender blocked',
        description: `${data.email} has been added to your blocked list`,
      });
    } else {
      blockedSenderForm.setError('email', {
        message: 'This email is already blocked',
      });
    }
  };

  const removeBlockedSender = (sender: string) => {
    setBlockedSenders(blockedSenders.filter((s) => s !== sender));
    toast({
      title: 'Sender unblocked',
      description: `${sender} has been removed from your blocked list`,
    });
  };

  if (isLoading || isAuthLoading) {
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
            <Settings className="w-8 h-8 mr-3 dark:text-white" />
            <div>
              <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
                Settings
              </h1>
              <p className="text-slate-600 dark:text-slate-400">
                Manage your preferences
              </p>
            </div>
          </div>

          <div className="grid gap-6">
            {/* Account Link */}
            <Card className="dark:bg-slate-800 dark:border-slate-700">
              <CardHeader>
                <CardTitle className="flex items-center dark:text-white">
                  <User className="w-5 h-5 mr-2" />
                  Account
                </CardTitle>
                <CardDescription>
                  Manage your profile, password, and account
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Link href="/account">
                  <Button variant="outline" className="dark:bg-slate-700 dark:border-slate-600 dark:text-white dark:hover:bg-slate-600">
                    <User className="w-4 h-4 mr-2" />
                    Go to Account Settings
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Appearance */}
            <Card className="dark:bg-slate-800 dark:border-slate-700">
              <CardHeader>
                <CardTitle className="flex items-center dark:text-white">
                  {mounted && resolvedTheme === 'dark' ? (
                    <Moon className="w-5 h-5 mr-2" />
                  ) : (
                    <Sun className="w-5 h-5 mr-2" />
                  )}
                  Appearance
                </CardTitle>
                <CardDescription>
                  Customize how the interface looks and feels
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="dark-mode" className="dark:text-slate-200">Dark mode</Label>
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                      Switch between light and dark themes
                    </p>
                  </div>
                  <Switch
                    id="dark-mode"
                    checked={mounted && resolvedTheme === 'dark'}
                    onCheckedChange={(checked) => setTheme(checked ? 'dark' : 'light')}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Email Settings */}
            <Card className="dark:bg-slate-800 dark:border-slate-700">
              <CardHeader>
                <CardTitle className="flex items-center dark:text-white">
                  <Mail className="w-5 h-5 mr-2" />
                  Email Settings
                </CardTitle>
                <CardDescription>
                  Configure your temporary email preferences
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="auto-refresh" className="dark:text-slate-200">Auto-refresh inbox</Label>
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                      Automatically check for new emails every 30 seconds
                    </p>
                  </div>
                  <Switch
                    id="auto-refresh"
                    checked={autoRefresh}
                    onCheckedChange={setAutoRefresh}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email-expiry" className="dark:text-slate-200">Default email expiry</Label>
                  <Select value={emailExpiry} onValueChange={setEmailExpiry}>
                    <SelectTrigger className="w-full bg-white dark:bg-slate-950 dark:border-slate-700 dark:text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-white dark:bg-slate-950 dark:border-slate-700 dark:text-slate-200">
                      <SelectItem value="1h" className="dark:focus:bg-slate-800 dark:focus:text-slate-200">1 hour</SelectItem>
                      <SelectItem value="6h" className="dark:focus:bg-slate-800 dark:focus:text-slate-200">6 hours</SelectItem>
                      <SelectItem value="24h" className="dark:focus:bg-slate-800 dark:focus:text-slate-200">24 hours</SelectItem>
                      <SelectItem value="7d" className="dark:focus:bg-slate-800 dark:focus:text-slate-200">
                        7 days{' '}
                        <Badge className="ml-2" variant="secondary">
                          Premium
                        </Badge>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    How long emails are kept before automatic deletion
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Notifications */}
            <Card className="dark:bg-slate-800 dark:border-slate-700">
              <CardHeader>
                <CardTitle className="flex items-center dark:text-white">
                  <Bell className="w-5 h-5 mr-2" />
                  Notifications
                </CardTitle>
                <CardDescription>
                  Control when and how you receive notifications
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="notifications" className="dark:text-slate-200">Email notifications</Label>
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                      Get notified when new emails arrive
                    </p>
                  </div>
                  <Switch
                    id="notifications"
                    checked={notifications}
                    onCheckedChange={setNotifications}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Privacy & Security */}
            <Card className="dark:bg-slate-800 dark:border-slate-700">
              <CardHeader>
                <CardTitle className="flex items-center dark:text-white">
                  <Shield className="w-5 h-5 mr-2" />
                  Privacy & Security
                </CardTitle>
                <CardDescription>
                  Manage your privacy settings and blocked senders
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <Label htmlFor="blocked-senders" className="dark:text-slate-200">Blocked senders</Label>
                  <p className="text-sm text-slate-600 dark:text-slate-400 mb-3">
                    Emails from these addresses will be automatically deleted
                  </p>

                  <div className="space-y-2 mb-4">
                    <div className="flex space-x-2">
                      <Input
                        placeholder="Enter email address to block"
                        {...blockedSenderForm.register('email')}
                        onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), blockedSenderForm.handleSubmit(addBlockedSender)())}
                        className={`bg-white dark:bg-slate-950 dark:border-slate-700 dark:text-white ${blockedSenderForm.formState.errors.email ? 'border-red-500' : ''
                          }`}
                      />
                      <Button onClick={() => blockedSenderForm.handleSubmit(addBlockedSender)()}>Block</Button>
                    </div>
                    {blockedSenderForm.formState.errors.email && (
                      <p className="text-sm text-red-500">{blockedSenderForm.formState.errors.email.message}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    {blockedSenders.map((sender) => (
                      <div
                        key={sender}
                        className="flex items-center justify-between p-3 bg-slate-100 dark:bg-slate-800 rounded-lg"
                      >
                        <span className="font-mono text-sm">{sender}</span>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => removeBlockedSender(sender)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    ))}
                    {blockedSenders.length === 0 && (
                      <p className="text-sm text-slate-500 dark:text-slate-400 italic">
                        No blocked senders
                      </p>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Premium Features */}
            <Card className="border-yellow-200 dark:border-yellow-800 bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-950 dark:to-orange-950">
              <CardHeader>
                <CardTitle className="flex items-center dark:text-white">
                  <Crown className="w-5 h-5 mr-2 text-yellow-600" />
                  Premium Features
                </CardTitle>
                <CardDescription>
                  Unlock advanced features with Premium
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="p-4 bg-white dark:bg-slate-900 rounded-lg">
                    <h4 className="font-semibold mb-2 dark:text-white">Custom Domains</h4>
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                      Use your own domain for temporary emails
                    </p>
                  </div>
                  <div className="p-4 bg-white dark:bg-slate-900 rounded-lg">
                    <h4 className="font-semibold mb-2 dark:text-white">Extended Retention</h4>
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                      Keep emails for up to 30 days
                    </p>
                  </div>
                  <div className="p-4 bg-white dark:bg-slate-900 rounded-lg">
                    <h4 className="font-semibold mb-2 dark:text-white">Priority Support</h4>
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                      Get help when you need it most
                    </p>
                  </div>
                  <div className="p-4 bg-white dark:bg-slate-900 rounded-lg">
                    <h4 className="font-semibold mb-2 dark:text-white">Ad-free Experience</h4>
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                      Enjoy the app without any distractions
                    </p>
                  </div>
                </div>
                <Link href="/pricing" className="block mt-6">
                  <Button className="w-full bg-gradient-to-r from-yellow-600 to-orange-600 hover:from-yellow-700 hover:to-orange-700">
                    Upgrade to Premium
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <div className="flex justify-end">
              <Button onClick={handleSave} size="lg" disabled={isSaving} className="w-full sm:w-auto bg-gradient-to-r from-blue-600 to-violet-600 hover:from-blue-700 hover:to-violet-700 text-white shadow-lg hover:shadow-xl transition-all duration-300">
                {isSaving ? (
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                ) : null}
                Save Changes
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
