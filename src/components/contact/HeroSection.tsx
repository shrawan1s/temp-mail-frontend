'use client';

import { cubicBezier, motion } from 'framer-motion';
import { MessageSquare } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

const fadeInUp = {
    initial: { opacity: 0, y: 24 },
    animate: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.6,
            ease: cubicBezier(0.21, 0.47, 0.32, 0.98),
        },
    },
}

const staggerContainer = {
    animate: {
        transition: { staggerChildren: 0.1 },
    },
};

const HeroSection = () => {
    return (
        <section className="relative overflow-hidden pt-32 pb-20 lg:pt-40 lg:pb-32">
            {/* Floating icons for atmosphere */}
            {[...Array(4)].map((_, i) => (
                <motion.div
                    key={i}
                    initial="initial"
                    animate="animate"
                    className="absolute text-blue-100 dark:text-blue-800"
                    style={{
                        top: `${20 + i * 15}%`,
                        left: `${15 + (i * 20) % 70}%`,
                    }}
                >
                    <MessageSquare className="w-5 h-5" />
                </motion.div>
            ))}

            {/* Radial gradient blobs */}
            <div className="absolute inset-0">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 via-violet-600/5 to-cyan-600/5" />
                <div className="absolute top-1/3 left-1/4 w-72 h-72 bg-blue-400/10 rounded-full blur-3xl animate-pulse" />
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-violet-400/10 rounded-full blur-3xl animate-pulse delay-1000" />
            </div>

            {/* Main content */}
            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    className="text-center max-w-4xl mx-auto"
                    initial="initial"
                    animate="animate"
                    variants={staggerContainer}
                >
                    <motion.div variants={fadeInUp} className="mb-6">
                        <Badge className="px-4 py-2 text-sm font-medium bg-blue-50 dark:bg-slate-800 text-blue-700 dark:text-blue-300 border border-blue-100 dark:border-slate-700">
                            We&apos;re here to help — always
                        </Badge>
                    </motion.div>

                    <motion.h1
                        variants={fadeInUp}
                        className="text-4xl sm:text-6xl font-bold tracking-tight mb-6"
                    >
                        <span className="bg-gradient-to-r from-slate-900 via-blue-800 to-slate-900 dark:from-white dark:via-blue-300 dark:to-white bg-clip-text text-transparent">
                            Contact Our Team
                        </span>
                    </motion.h1>

                    <motion.p
                        variants={fadeInUp}
                        className="text-xl lg:text-2xl text-slate-600 dark:text-slate-300 mb-10 max-w-3xl mx-auto leading-relaxed"
                    >
                        Whether you have questions, feedback, or need support — we&apos;re just a message away. Reach out anytime, and we&apos;ll get back to you quickly.
                    </motion.p>

                    <motion.div
                        variants={fadeInUp}
                        className="flex flex-col sm:flex-row gap-4 justify-center items-center"
                    >
                        <Link href="#contact-form">
                            <Button
                                size="lg"
                                className="px-8 py-4 text-lg font-semibold bg-gradient-to-r from-blue-600 to-violet-600 hover:from-blue-700 hover:to-violet-700 shadow-lg transition-all duration-300 group"
                            >
                                Send a Message
                            </Button>
                        </Link>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
};

export default HeroSection;