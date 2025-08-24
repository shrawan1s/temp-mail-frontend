import { HeroSkeleton, ContactMethodsSkeleton, ContactFormSkeleton } from "@/components/skeleton/contact";

export default function Loading() {
    return (
        <>
            {/* Hero Section */}
            <HeroSkeleton />

            {/* Contact Methods */}
            <ContactMethodsSkeleton />

            {/* Contact Form */}
            <ContactFormSkeleton />
        </>
    );
}
