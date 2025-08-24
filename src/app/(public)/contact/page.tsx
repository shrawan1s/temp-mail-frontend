import { Suspense } from 'react';
import dynamic from 'next/dynamic';

import {
  HeroSkeleton,
  ContactMethodsSkeleton,
  ContactFormSkeleton
} from '@/components/skeleton/contact';

const {
  ContactMethods,
  ContactForm
} = {
  ContactMethods: dynamic(() => import('@/components/contact/ContactMethods')),
  ContactForm: dynamic(() => import('@/components/contact/ContactForm')),
}

import HeroSection from '@/components/contact/HeroSection';

export default function ContactPage() {
  return (
    <>
      {/* Hero Section */}
      <Suspense fallback={<HeroSkeleton />}>
        <HeroSection />
      </Suspense>

      {/* Contact Methods */}
      <Suspense fallback={<ContactMethodsSkeleton />}>
        <ContactMethods />
      </Suspense>

      {/* Contact Form */}
      <Suspense fallback={<ContactFormSkeleton />}>
        <ContactForm />
      </Suspense>
    </>
  )
}
