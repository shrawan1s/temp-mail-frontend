import { ContactHeroSkeleton, ContactMethodsSkeleton, ContactFormSkeleton } from "@/components/skeleton";

export default function Loading() {
    return (
        <>
            {/* Hero Section */}
            <ContactHeroSkeleton />

            {/* Contact Methods */}
            <ContactMethodsSkeleton />

            {/* Contact Form */}
            <ContactFormSkeleton />
        </>
    );
}
