import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { Toaster } from 'sonner';
import { AuthProvider } from '@/context';

const geist = Geist({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-geist-sans',
});

const geistMono = Geist_Mono({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-geist-mono',
});

export const metadata: Metadata = {
  title: 'TempMail Pro - Secure Temporary Email Service',
  description:
    'Generate secure, private temporary email addresses instantly. Perfect for developers, testing, and protecting your privacy online.',
  keywords:
    'temporary email, disposable email, privacy, secure email, developers, temp mail, tempmail-pro',
  authors: [{ name: 'SV Infocraft', url: 'https://svinfocraft.com' }],
  generator: 'Shrawan Thakur',
  applicationName: 'TempMail Pro',
  openGraph: {
    title: 'TempMail Pro - Secure Temporary Email Service',
    description:
      'Generate secure, private temporary email addresses instantly. Perfect for developers, testing, and protecting your privacy online.',
    url: 'https://tempmail-pro.svinfocraft.com/',
    siteName: 'TempMail Pro',
    images: [
      {
        url: 'https://tempmail-pro.svinfocraft.com/og-image.png',
        width: 1908,
        height: 765,
        alt: 'TempMail Pro',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'TempMail Pro - Secure Temporary Email Service',
    description:
      'Generate secure, private temporary email addresses instantly. Perfect for developers, testing, and protecting your privacy online.',
    images: ['https://tempmail-pro.svinfocraft.com/og-image.png'],
    site: '@svinfocraft',
    creator: '@svinfocraft',
  },
  icons: {
    icon: '/favicon.png',
    shortcut: '/favicon.png',
    apple: '/favicon.png',
  },
  metadataBase: new URL('https://tempmail-pro.svinfocraft.com'),
  alternates: {
    canonical: 'https://tempmail-pro.svinfocraft.com/',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geist.variable} ${geistMono.variable}`}
    >
      <body className="font-sans antialiased">
        <AuthProvider>
          {children}
        </AuthProvider>
        <Toaster richColors position="top-center" />
      </body>
    </html>
  );
}
