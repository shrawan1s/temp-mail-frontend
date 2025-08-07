'use client'

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Settings, Sun, Shield, Bell, Trash2, Crown, Mail } from 'lucide-react';
import { Header } from '@/components/layout/Header';
import { useToast } from '@/hooks/use-toast';

export default function SettingsPage() {
  const [darkMode, setDarkMode] = useState(false)
  const [autoRefresh, setAutoRefresh] = useState(true)
  const [notifications, setNotifications] = useState(true)
  const [emailExpiry, setEmailExpiry] = useState('24h')
  const [blockedSenders, setBlockedSenders] = useState(['spam@example.com', 'ads@marketing.com'])
  const [newBlockedSender, setNewBlockedSender] = useState('')
  const { toast } = useToast()

  const handleSave = () => {
    toast({
      title: "Settings saved",
      description: "Your preferences have been updated successfully",
    })
  }

  const addBlockedSender = () => {
    if (newBlockedSender && !blockedSenders.includes(newBlockedSender)) {
      setBlockedSenders([...blockedSenders, newBlockedSender])
      setNewBlockedSender('')
      toast({
        title: "Sender blocked",
        description: `${newBlockedSender} has been added to your blocked list`,
      })
    }
  }

  const removeBlockedSender = (sender: string) => {
    setBlockedSenders(blockedSenders.filter(s => s !== sender))
    toast({
      title: "Sender unblocked",
      description: `${sender} has been removed from your blocked list`,
    })
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
              <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Settings</h1>
              <p className="text-slate-600 dark:text-slate-400">Manage your account and preferences</p>
            </div>
          </div>

          <div className="grid gap-6">
            {/* Appearance */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Sun className="w-5 h-5 mr-2" />
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
                    checked={darkMode}
                    onCheckedChange={setDarkMode}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Email Settings */}
            <Card>
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
                        7 days <Badge className="ml-2">Premium</Badge>
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
            <Card>
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
            <Card>
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
                      <div key={sender} className="flex items-center justify-between p-3 bg-slate-100 dark:bg-slate-800 rounded-lg">
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
                <Button className="w-full bg-gradient-to-r from-yellow-600 to-orange-600 hover:from-yellow-700 hover:to-orange-700">
                  Upgrade to Premium
                </Button>
              </CardContent>
            </Card>

            <div className="flex justify-end">
              <Button onClick={handleSave} size="lg">
                Save Changes
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
