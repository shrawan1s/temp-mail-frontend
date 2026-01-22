'use client';

import { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';
import { motion } from 'framer-motion';
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
  const [newBlockedSender, setNewBlockedSender] = useState('');

  // Ensure mounted before accessing theme to avoid hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  // Load settings on mount
  useEffect(() => {
    const loadSettings = async () => {
      try {
        const response = await authApi.getSettings();
        if (response.success && response.settings) {
          setAutoRefresh(response.settings.auto_refresh);
          setNotifications(response.settings.notifications);
          setEmailExpiry(response.settings.email_expiry);
          setBlockedSenders(response.settings.blocked_senders || []);
          // Sync theme from settings if saved
          if (response.settings.dark_mode !== undefined && mounted) {
            setTheme(response.settings.dark_mode ? 'dark' : 'light');
          }
        }
      } catch (error) {
        console.error('Failed to load settings:', error);
        // Use defaults if loading fails
      } finally {
        setIsLoading(false);
      }
    };

    if (!isAuthLoading && user) {
      loadSettings();
    } else if (!isAuthLoading) {
      setIsLoading(false);
    }
  }, [isAuthLoading, user]);

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

  const addBlockedSender = () => {
    if (newBlockedSender && !blockedSenders.includes(newBlockedSender)) {
      setBlockedSenders([...blockedSenders, newBlockedSender]);
      setNewBlockedSender('');
      toast({
        title: 'Sender blocked',
        description: `${newBlockedSender} has been added to your blocked list`,
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
            <Settings className="w-8 h-8 mr-3" />
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
                <CardTitle className="flex items-center">
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
                <CardTitle className="flex items-center">
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
                    <Label htmlFor="dark-mode">Dark mode</Label>
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
                <CardTitle className="flex items-center">
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
                    <Label htmlFor="auto-refresh">Auto-refresh inbox</Label>
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
                  <Label htmlFor="email-expiry">Default email expiry</Label>
                  <Select value={emailExpiry} onValueChange={setEmailExpiry}>
                    <SelectTrigger className="w-full">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1h">1 hour</SelectItem>
                      <SelectItem value="6h">6 hours</SelectItem>
                      <SelectItem value="24h">24 hours</SelectItem>
                      <SelectItem value="7d">
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
                <CardTitle className="flex items-center">
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
                    <Label htmlFor="notifications">Email notifications</Label>
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
                <CardTitle className="flex items-center">
                  <Shield className="w-5 h-5 mr-2" />
                  Privacy & Security
                </CardTitle>
                <CardDescription>
                  Manage your privacy settings and blocked senders
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <Label htmlFor="blocked-senders">Blocked senders</Label>
                  <p className="text-sm text-slate-600 dark:text-slate-400 mb-3">
                    Emails from these addresses will be automatically deleted
                  </p>

                  <div className="flex space-x-2 mb-4">
                    <Input
                      placeholder="Enter email address to block"
                      value={newBlockedSender}
                      onChange={(e) => setNewBlockedSender(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && addBlockedSender()}
                    />
                    <Button onClick={addBlockedSender}>Block</Button>
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
                <CardTitle className="flex items-center">
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
                    <h4 className="font-semibold mb-2">Custom Domains</h4>
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                      Use your own domain for temporary emails
                    </p>
                  </div>
                  <div className="p-4 bg-white dark:bg-slate-900 rounded-lg">
                    <h4 className="font-semibold mb-2">Extended Retention</h4>
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                      Keep emails for up to 30 days
                    </p>
                  </div>
                  <div className="p-4 bg-white dark:bg-slate-900 rounded-lg">
                    <h4 className="font-semibold mb-2">Priority Support</h4>
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                      Get help when you need it most
                    </p>
                  </div>
                  <div className="p-4 bg-white dark:bg-slate-900 rounded-lg">
                    <h4 className="font-semibold mb-2">Ad-free Experience</h4>
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                      Enjoy the app without any distractions
                    </p>
                  </div>
                </div>
                <Link href="/pricing">
                  <Button className="w-full bg-gradient-to-r from-yellow-600 to-orange-600 hover:from-yellow-700 hover:to-orange-700">
                    Upgrade to Premium
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <div className="flex justify-end">
              <Button onClick={handleSave} size="lg" disabled={isSaving}>
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
