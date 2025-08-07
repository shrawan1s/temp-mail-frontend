'use client';

import React from 'react';
import { cubicBezier, motion } from 'framer-motion';
import { Separator } from '@/components/ui/separator';
import { Card, CardContent } from '@/components/ui/card';
import { Shield, Globe, Zap, Heart } from 'lucide-react';

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
};

const staggerContainer = {
    animate: { transition: { staggerChildren: 0.1 } }
};

const values = [
    {
        icon: Shield,
        title: 'Privacy First',
        description: 'Your privacy is our top priority. We never track, store, or analyze your personal data.',
        color: 'from-green-500 to-emerald-500'
    },
    {
        icon: Globe,
        title: 'Accessible to All',
        description: 'Our service should be available to everyone, regardless of technical expertise.',
        color: 'from-blue-500 to-cyan-500'
    },
    {
        icon: Zap,
        title: 'Performance Driven',
        description: 'Fast, reliable service with 99.9% uptime and global edge locations.',
        color: 'from-purple-500 to-violet-500'
    },
    {
        icon: Heart,
        title: 'Community Focused',
        description: 'Built by developers, for developers. We listen to our community feedback.',
        color: 'from-red-500 to-pink-500'
    }
];

export const ValuesGrid = () => (
    <section className="py-16 lg:py-24 bg-white dark:bg-slate-900">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white">Our Values</h2>
            <Separator className="mx-auto my-4 w-24" />
            <p className="text-slate-600 dark:text-slate-300">
                The guiding principles that shape everything we do at TempMail Pro.
            </p>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
                className="grid md:grid-cols-2 gap-8"
                initial="initial"
                whileInView="animate"
                viewport={{ once: true }}
                variants={staggerContainer}
            >
                {values.map((value, index) => (
                    <motion.div key={index} variants={fadeInUp}>
                        <Card className="h-full border-0 bg-gradient-to-br from-slate-50 to-white dark:from-slate-800 dark:to-slate-850 shadow-lg hover:shadow-xl transition-all duration-300">
                            <CardContent className="p-8">
                                <div className={`w-14 h-14 bg-gradient-to-r ${value.color} rounded-2xl flex items-center justify-center mb-6`}>
                                    <value.icon className="w-7 h-7 text-white" />
                                </div>
                                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4">
                                    {value.title}
                                </h3>
                                <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                                    {value.description}
                                </p>
                            </CardContent>
                        </Card>
                    </motion.div>
                ))}
            </motion.div>
        </div>
    </section>
);
