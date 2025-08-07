import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { HeroSection } from '@/components/contact/HeroSection';
import { ContactMethods } from '@/components/contact/ContactMethods';
import { ContactForm } from '@/components/contact/ContactForm';

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50/30 dark:from-slate-950 dark:via-slate-900 dark:to-blue-950/30">
      {/* Header */}
      <Header />

      {/* Hero Section */}
      <HeroSection />

      {/* Contact Methods */}
      <ContactMethods />

      {/* Contact Form */}
      <ContactForm />

      {/* Footer */}
      <Footer />
    </div>
  )
}
