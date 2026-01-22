'use client';

import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { cubicBezier, motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Send } from 'lucide-react';
import { toast } from 'sonner';

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

const formSchema = z.object({
    name: z.string().min(2, 'Name must be at least 2 characters'),
    email: z.string().email('Please enter a valid email address'),
    subject: z.string().min(3, 'Subject is required'),
    message: z.string().min(10, 'Message must be at least 10 characters'),
})

type FormData = z.infer<typeof formSchema>

const ContactForm = () => {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        reset,
    } = useForm<FormData>({
        resolver: zodResolver(formSchema),
        mode: 'onBlur',
    })

    const onSubmit = async (data: FormData) => {
        await new Promise((resolve) => setTimeout(() => {
            console.log("Form Data: ", data);
            resolve(data);
        }, 1500));

        toast.success('Message sent successfully!', {
            description: "We'll get back to you within 24 hours.",
        })

        reset()
    }

    return (
        <section id="contact-form" className="py-16 lg:py-24 bg-white dark:bg-slate-900">
            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Section Header */}
                <div className="text-center mb-12">
                    <motion.h2
                        className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white"
                        initial={{ opacity: 0, y: 12 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                    >
                        Send Us a Message
                    </motion.h2>
                    <motion.p
                        className="mt-4 text-slate-600 dark:text-slate-400 max-w-xl mx-auto"
                        initial={{ opacity: 0, y: 8 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        viewport={{ once: true }}
                    >
                        Have questions or need support? Fill out the form below and our team will get back to you shortly.
                    </motion.p>
                </div>

                {/* Form Card */}
                <motion.div
                    initial="initial"
                    whileInView="animate"
                    viewport={{ once: true }}
                    variants={fadeInUp}
                >
                    <Card className="border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 shadow-xl">
                        <CardHeader>
                            <CardTitle className="text-xl font-semibold text-slate-900 dark:text-white">
                                Contact Form
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="px-8">
                            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                                <div className="grid md:grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="name" className="text-slate-900 dark:text-white">Name <span className='text-red-500'>*</span></Label>
                                        <Input
                                            id="name"
                                            {...register('name')}
                                            placeholder="Your full name"
                                            className="bg-white dark:bg-slate-700 border-slate-200 dark:border-slate-600 text-slate-900 dark:text-white placeholder:text-slate-400"
                                        />
                                        {errors.name && (
                                            <p className="text-sm text-red-500">{errors.name.message}</p>
                                        )}
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="email" className="text-slate-900 dark:text-white">Email <span className='text-red-500'>*</span></Label>
                                        <Input
                                            id="email"
                                            type="email"
                                            {...register('email')}
                                            placeholder="your@email.com"
                                            className="bg-white dark:bg-slate-700 border-slate-200 dark:border-slate-600 text-slate-900 dark:text-white placeholder:text-slate-400"
                                        />
                                        {errors.email && (
                                            <p className="text-sm text-red-500">{errors.email.message}</p>
                                        )}
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="subject" className="text-slate-900 dark:text-white">Subject <span className='text-red-500'>*</span></Label>
                                    <Input
                                        id="subject"
                                        {...register('subject')}
                                        placeholder="What's this about?"
                                        className="bg-white dark:bg-slate-700 border-slate-200 dark:border-slate-600 text-slate-900 dark:text-white placeholder:text-slate-400"
                                    />
                                    {errors.subject && (
                                        <p className="text-sm text-red-500">{errors.subject.message}</p>
                                    )}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="message" className="text-slate-900 dark:text-white">Message <span className='text-red-500'>*</span></Label>
                                    <Textarea
                                        id="message"
                                        rows={6}
                                        {...register('message')}
                                        placeholder="Tell us more about your inquiry..."
                                        className="resize-none bg-white dark:bg-slate-700 border-slate-200 dark:border-slate-600 text-slate-900 dark:text-white placeholder:text-slate-400"
                                    />
                                    {errors.message && (
                                        <p className="text-sm text-red-500">{errors.message.message}</p>
                                    )}
                                </div>

                                <Button
                                    type="submit"
                                    className="w-full bg-gradient-to-r from-blue-600 to-violet-600 hover:from-blue-700 hover:to-violet-700"
                                    disabled={isSubmitting}
                                >
                                    {isSubmitting ? (
                                        <div className="flex items-center">
                                            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                                            Sending...
                                        </div>
                                    ) : (
                                        <>
                                            <Send className="w-4 h-4 mr-2" />
                                            Send Message
                                        </>
                                    )}
                                </Button>
                            </form>
                        </CardContent>
                    </Card>
                </motion.div>
            </div>
        </section>
    )
}

export default ContactForm;
