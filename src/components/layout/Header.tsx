'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Mail, Menu, X, Crown, User, LogOut, Settings } from 'lucide-react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { useAuth } from '@/context/AuthContext'
import { PlanKey } from '@/enums'
import { toast } from 'sonner'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [showLogoutDialog, setShowLogoutDialog] = useState(false)
  const { user, isAuthenticated, isLoading, logout } = useAuth()
  const pathname = usePathname()
  const router = useRouter()

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleLogout = async () => {
    setShowLogoutDialog(false)
    await logout()
    toast.success('Signed out successfully')
    router.push('/')
  }

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2)
  }

  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' },
    { name: 'Pricing', href: '/pricing' },
  ]

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled
          ? 'bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-slate-200/20 dark:border-slate-700/20 shadow-sm'
          : 'bg-transparent'
          }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-3 group">
              <div className="relative">
                <div className="w-9 h-9 bg-gradient-to-br from-blue-600 to-violet-600 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow duration-300">
                  <Mail className="w-5 h-5 text-white" />
                </div>
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 dark:from-white dark:to-slate-300 bg-clip-text text-transparent">
                TempMail Pro
              </span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-1">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`relative px-4 py-2 text-sm font-medium rounded-xl transition-all duration-200 ${pathname === item.href
                    ? 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/50'
                    : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-800/50'
                    }`}
                >
                  {item.name}
                </Link>
              ))}
            </nav>

            {/* Desktop Actions */}
            <div className="hidden lg:flex items-center space-x-3">
              {isLoading ? (
                <div className="w-8 h-8 rounded-full bg-slate-200 dark:bg-slate-700 animate-pulse" />
              ) : !isAuthenticated ? (
                <Link href="/login">
                  <Button className="bg-gradient-to-r from-blue-600 to-violet-600 hover:from-blue-700 hover:to-violet-700 text-white shadow-lg hover:shadow-xl transition-all duration-300">
                    Get Started Free
                  </Button>
                </Link>
              ) : (
                <>
                  <Link href="/dashboard">
                    <Button variant="ghost" className="text-slate-600 dark:text-slate-300">
                      Dashboard
                    </Button>
                  </Link>
                  {(!user?.plan || user.plan === PlanKey.FREE) && (
                    <Link href="/pricing">
                      <Button className="flex items-center gap-1 bg-amber-500 hover:bg-amber-600 text-white shadow-lg hover:shadow-xl transition-all duration-300">
                        <Crown className="w-4 h-4" />
                        Premium
                      </Button>
                    </Link>
                  )}
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="p-1 rounded-full">
                        <Avatar className="w-8 h-8">
                          <AvatarImage src={user?.avatar_url} alt={user?.name} />
                          <AvatarFallback className="bg-gradient-to-br from-blue-500 to-violet-500 text-white text-xs">
                            {user?.name ? getInitials(user.name) : <User className="w-4 h-4" />}
                          </AvatarFallback>
                        </Avatar>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-56">
                      <div className="px-3 py-2">
                        <p className="text-sm font-medium">{user?.name}</p>
                        <p className="text-xs text-slate-500">{user?.email}</p>
                      </div>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem asChild>
                        <Link href="/dashboard" className="cursor-pointer">
                          <Mail className="w-4 h-4 mr-2" />
                          Dashboard
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link href="/settings" className="cursor-pointer">
                          <Settings className="w-4 h-4 mr-2" />
                          Settings
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem
                        onClick={() => setShowLogoutDialog(true)}
                        className="text-red-600 cursor-pointer"
                      >
                        <LogOut className="w-4 h-4 mr-2" />
                        Sign Out
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </>
              )}
            </div>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="sm"
              className="lg:hidden p-2"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
            >
              {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>

          {/* Mobile Navigation */}
          <AnimatePresence>
            {isMenuOpen && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="lg:hidden py-4 space-y-2 rounded-lg border-t border-slate-200/20 dark:border-slate-700/20
                           bg-white/95 dark:bg-slate-900/95 backdrop-blur-md"
              >
                <nav className="space-y-1 px-4">
                  {navigation.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className={`block px-4 py-2 text-sm font-medium rounded-xl transition-colors ${pathname === item.href
                        ? 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/50'
                        : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-800/50'
                        }`}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {item.name}
                    </Link>
                  ))}

                  {!isAuthenticated ? (
                    <Link href="/login" onClick={() => setIsMenuOpen(false)}>
                      <Button className="w-full bg-gradient-to-r from-blue-600 to-violet-600 text-white">
                        Get Started Free
                      </Button>
                    </Link>
                  ) : (
                    <>
                      <Link href="/dashboard" onClick={() => setIsMenuOpen(false)}>
                        <Button variant="ghost" className="w-full justify-start">
                          <Mail className="w-4 h-4 mr-2" />
                          Dashboard
                        </Button>
                      </Link>
                      <Link href="/settings" onClick={() => setIsMenuOpen(false)}>
                        <Button variant="ghost" className="w-full justify-start">
                          <Settings className="w-4 h-4 mr-2" />
                          Settings
                        </Button>
                      </Link>
                      <Button
                        variant="ghost"
                        className="w-full justify-start text-red-600"
                        onClick={() => {
                          setIsMenuOpen(false)
                          setShowLogoutDialog(true)
                        }}
                      >
                        <LogOut className="w-4 h-4 mr-2" />
                        Sign Out
                      </Button>
                    </>
                  )}
                </nav>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </header>

      {/* Logout Confirmation Dialog */}
      <AlertDialog open={showLogoutDialog} onOpenChange={setShowLogoutDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Sign out of your account?</AlertDialogTitle>
            <AlertDialogDescription>
              You will need to sign in again to access your dashboard and emails.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleLogout}
              className="bg-red-600 hover:bg-red-700 text-white"
            >
              Sign Out
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}
