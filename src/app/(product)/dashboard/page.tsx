'use client'

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { RefreshCw, Copy, Trash2, Clock, Mail, Shield, AlertTriangle, Tag, Settings } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Header } from '@/components/layout';
import AdSidebar from '@/components/ads/AdSidebar';

interface Email {
  id: string
  from: string
  subject: string
  preview: string
  content: string
  timestamp: Date
  isSpam: boolean
  intent: 'verification' | 'promo' | 'alert' | 'other'
  expiresAt: Date
}

export default function InboxPage() {
  const [currentEmail, setCurrentEmail] = useState('temp.user.12345@tempmail.pro')
  const [emails, setEmails] = useState<Email[]>([
    {
      id: '1',
      from: 'noreply@github.com',
      subject: 'Verify your GitHub account',
      preview: 'Please click the link below to verify your account...',
      content: 'Welcome to GitHub! Please verify your account by clicking the link below...',
      timestamp: new Date(Date.now() - 5 * 60 * 1000),
      isSpam: false,
      intent: 'verification',
      expiresAt: new Date(Date.now() + 19 * 60 * 60 * 1000)
    },
    {
      id: '2',
      from: 'deals@amazon.com',
      subject: 'Limited Time Offer - 50% Off',
      preview: 'Don\'t miss out on this amazing deal...',
      content: 'Special offer just for you! Get 50% off on selected items...',
      timestamp: new Date(Date.now() - 15 * 60 * 1000),
      isSpam: false,
      intent: 'promo',
      expiresAt: new Date(Date.now() + 18.75 * 60 * 60 * 1000)
    }
  ])
  const [selectedEmail, setSelectedEmail] = useState<Email | null>(emails[0])
  const [isRefreshing, setIsRefreshing] = useState(false)
  const { toast } = useToast()

  const refreshInbox = async () => {
    setIsRefreshing(true)
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    setIsRefreshing(false)
    toast({
      title: "Inbox refreshed",
      description: "No new emails received",
    })
  }

  const copyEmail = () => {
    navigator.clipboard.writeText(currentEmail)
    toast({
      title: "Email copied",
      description: "Email address copied to clipboard",
    })
  }

  const deleteEmail = (emailId: string) => {
    setEmails(emails.filter(email => email.id !== emailId))
    if (selectedEmail?.id === emailId) {
      setSelectedEmail(emails.find(email => email.id !== emailId) || null)
    }
    toast({
      title: "Email deleted",
      description: "Email has been permanently deleted",
    })
  }

  const getIntentColor = (intent: string) => {
    switch (intent) {
      case 'verification': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
      case 'promo': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
      case 'alert': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200'
    }
  }

  const formatTimeAgo = (date: Date) => {
    const now = new Date()
    const diff = now.getTime() - date.getTime()
    const minutes = Math.floor(diff / 60000)
    const hours = Math.floor(minutes / 60)

    if (hours > 0) return `${hours}h ago`
    return `${minutes}m ago`
  }

  const formatTimeLeft = (date: Date) => {
    const now = new Date()
    const diff = date.getTime() - now.getTime()
    const hours = Math.floor(diff / (1000 * 60 * 60))
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))

    return `${hours}h ${minutes}m`
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      <Header />

      <div className="container mx-auto px-4 pt-20 pb-6">
        <div className="grid lg:grid-cols-3 gap-6 min-h-[calc(100vh-6rem)]">
          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6 overflow-y-auto max-h-[calc(100vh-6rem)]">
            {/* Current Email */}
            <Card className="dark:bg-slate-800 dark:border-slate-700">
              <CardHeader>
                <CardTitle className="flex items-center justify-between text-slate-900 dark:text-white">
                  <span className="flex items-center">
                    <Mail className="w-5 h-5 mr-2" />
                    Your Email
                  </span>
                  <Button variant="ghost" size="sm" onClick={() => { }} className="dark:hover:bg-slate-700">
                    <Settings className="w-4 h-4 text-slate-500 dark:text-slate-400" />
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Input
                    value={currentEmail}
                    readOnly
                    className="font-mono text-sm bg-white dark:bg-slate-950 dark:text-white dark:border-slate-700"
                  />
                  <Button size="sm" onClick={copyEmail}>
                    <Copy className="w-4 h-4" />
                  </Button>
                </div>
                <div className="flex items-center justify-between text-sm text-slate-600 dark:text-slate-400">
                  <span className="flex items-center">
                    <Clock className="w-4 h-4 mr-1" />
                    Expires in 23h 45m
                  </span>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={refreshInbox}
                    disabled={isRefreshing}
                    className="dark:bg-slate-800 dark:text-slate-300 dark:border-slate-600 dark:hover:bg-slate-700"
                  >
                    <RefreshCw className={`w-4 h-4 mr-2 ${isRefreshing ? 'animate-spin' : ''}`} />
                    Refresh
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Email List */}
            <Card className="flex-1 dark:bg-slate-800 dark:border-slate-700">
              <CardHeader>
                <CardTitle className="flex items-center justify-between text-slate-900 dark:text-white">
                  <span>Inbox ({emails.length})</span>
                  <Badge variant="secondary">{emails.filter(e => !e.isSpam).length} new</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <div className="space-y-1 max-h-96 overflow-y-auto">
                  <AnimatePresence>
                    {emails.map((email) => (
                      <motion.div
                        key={email.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        className={`p-4 cursor-pointer border-l-4 transition-all hover:bg-slate-50 dark:hover:bg-slate-800 ${selectedEmail?.id === email.id
                          ? 'bg-blue-50 dark:bg-blue-950 border-l-blue-500'
                          : 'border-l-transparent'
                          }`}
                        onClick={() => setSelectedEmail(email)}
                      >
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center space-x-2 mb-1">
                              <p className="text-sm font-medium dark:text-white truncate">{email.from}</p>
                              {email.isSpam && (
                                <Badge variant="destructive" className="text-xs">
                                  <AlertTriangle className="w-3 h-3 mr-1" />
                                  Spam
                                </Badge>
                              )}
                            </div>
                            <p className="text-sm font-semibold text-slate-900 dark:text-white truncate">
                              {email.subject}
                            </p>
                            <p className="text-xs text-slate-600 dark:text-slate-400 truncate">
                              {email.preview}
                            </p>
                          </div>
                          <Button
                            size="sm"
                            variant="ghost"
                            className='dark:hover:bg-slate-700'
                            onClick={(e) => {
                              e.stopPropagation()
                              deleteEmail(email.id)
                            }}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <Badge className={`text-xs ${getIntentColor(email.intent)}`}>
                              <Tag className="w-3 h-3 mr-1" />
                              {email.intent}
                            </Badge>
                            <span className="text-xs text-slate-500">
                              {formatTimeAgo(email.timestamp)}
                            </span>
                          </div>
                          <span className="text-xs text-slate-500 flex items-center">
                            <Clock className="w-3 h-3 mr-1" />
                            {formatTimeLeft(email.expiresAt)}
                          </span>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              </CardContent>
            </Card>

            {/* Ad Component for Free Users */}
            <AdSidebar />
          </div>

          {/* Email Preview */}
          <div className="lg:col-span-2">
            <Card className="h-full dark:bg-slate-800 dark:border-slate-700">
              {selectedEmail ? (
                <>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <CardTitle className="text-xl mb-2 dark:text-white">{selectedEmail.subject}</CardTitle>
                        <div className="flex items-center space-x-4 text-sm text-slate-600 dark:text-slate-400">
                          <span>From: {selectedEmail.from}</span>
                          <span>{formatTimeAgo(selectedEmail.timestamp)}</span>
                          <Badge className={getIntentColor(selectedEmail.intent)}>
                            {selectedEmail.intent}
                          </Badge>
                          {selectedEmail.isSpam && (
                            <Badge variant="destructive">
                              <Shield className="w-3 h-3 mr-1" />
                              Spam Detected
                            </Badge>
                          )}
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <Button size="sm" variant="outline" className="dark:bg-slate-800 dark:text-slate-300 dark:border-slate-600 dark:hover:bg-slate-700">
                          <Copy className="w-4 h-4 mr-2" />
                          Copy
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => deleteEmail(selectedEmail.id)}
                          className="dark:bg-slate-800 dark:text-slate-300 dark:border-slate-600 dark:hover:bg-slate-700"
                        >
                          <Trash2 className="w-4 h-4 mr-2" />
                          Delete
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <Separator />
                  <CardContent className="p-6">
                    <div className="max-w-none text-slate-800 dark:text-slate-200">
                      <p className="whitespace-pre-wrap">{selectedEmail.content}</p>
                    </div>
                  </CardContent>
                </>
              ) : (
                <CardContent className="flex items-center justify-center h-full">
                  <div className="text-center">
                    <Mail className="w-16 h-16 text-slate-400 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">
                      No email selected
                    </h3>
                    <p className="text-slate-600 dark:text-slate-400">
                      Select an email from the inbox to view its contents
                    </p>
                  </div>
                </CardContent>
              )}
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
