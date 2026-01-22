'use client';

import React from 'react';
import { cubicBezier, motion } from 'framer-motion';
import { Separator } from '@/components/ui/separator';
import { Card, CardContent } from '@/components/ui/card';
import { Code, Database, Cloud, Layout } from 'lucide-react';

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

const techStack = [
    {
        name: 'Next.js',
        description: 'Fullstack React framework for fast, scalable interfaces',
        icon: Layout,
        color: '#000000'
    },
    {
        name: 'TypeScript',
        description: 'Type-safe JavaScript for more robust development',
        icon: Code,
        color: '#3178C6'
    },
    {
        name: 'Tailwind CSS',
        description: 'Utility-first CSS framework for modern UI design',
        icon: Layout,
        color: '#38BDF8'
    },
    {
        name: 'ShadCN UI',
        description: 'Accessible and customizable component system',
        icon: Layout,
        color: '#000000'
    },
    {
        name: 'PostgreSQL',
        description: 'Reliable, scalable SQL database',
        icon: Database,
        color: '#316192'
    },
    {
        name: 'Docker',
        description: 'Lightweight containerized environments for consistency',
        icon: Cloud,
        color: '#2496ED'
    }
];

const TechStack = () => (
    <section className="py-16 lg:py-24 bg-white dark:bg-slate-900">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-12">
            <motion.h2
                className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white"
                initial="initial"
                whileInView="animate"
                viewport={{ once: true }}
                variants={fadeInUp}
            >
                Our Technology Stack
            </motion.h2>
            <motion.div
                className="mx-auto my-4 w-24"
                initial="initial"
                whileInView="animate"
                viewport={{ once: true }}
                variants={fadeInUp}
            >
                <Separator />
            </motion.div>
            <motion.p
                className="text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto"
                initial="initial"
                whileInView="animate"
                viewport={{ once: true }}
                variants={fadeInUp}
            >
                We build on proven, battle-tested tools to deliver a fast, secure, and scalable service.
            </motion.p>
        </div>

        {/* Cards Grid */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
                initial="initial"
                whileInView="animate"
                viewport={{ once: true }}
                variants={staggerContainer}
            >
                {techStack.map((tech, idx) => {
                    const Icon = tech.icon;
                    return (
                        <motion.div key={idx} variants={fadeInUp}>
                            <Card className="h-full flex flex-col border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800
                               hover:shadow-xl hover:scale-[1.02] transition-all duration-300">
                                <CardContent className="flex-1 flex items-start space-x-4 p-6">
                                    {/* Neutral circle with colored icon */}
                                    <div className="w-12 h-12 bg-slate-100 dark:bg-slate-800 rounded-lg flex items-center justify-center">
                                        <Icon className="w-6 h-6" style={{ color: tech.color }} />
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
                                            {tech.name}
                                        </h3>
                                        <p className="text-slate-600 dark:text-slate-300 text-sm">
                                            {tech.description}
                                        </p>
                                    </div>
                                </CardContent>
                            </Card>
                        </motion.div>
                    );
                })}
            </motion.div>
        </div>
    </section>
);

export default TechStack;
