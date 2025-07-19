"use client"

import type React from "react"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"

type SectionProps = {
    id: string
    title: string
    content: React.ReactNode
    bgPattern: "flowers" | "stars" | "diamonds" | "circles"
    className?: string
}

export default function Section({ id, title, content, bgPattern, className = "" }: SectionProps) {
    const ref = useRef<HTMLDivElement>(null)
    const isInView = useInView(ref, { once: false, amount: 0.3 })

    const getPatternClass = () => {
        return `pattern-${bgPattern}`
    }

    return (
        <section
            id={id}
            ref={ref}
            className={`min-h-screen w-full flex flex-col items-center justify-center py-12 sm:py-16 md:py-20 px-3 sm:px-4 md:px-6 relative scroll-mt-12 sm:scroll-mt-16 ${getPatternClass()} ${className}`}
        >
            <div className="absolute inset-0 bg-gradient-to-br from-white/60 via-rose-50/40 to-pink-50/20 backdrop-blur-sm" />

            <motion.div
                className="relative z-10 max-w-sm sm:max-w-2xl md:max-w-3xl lg:max-w-4xl mx-auto text-center w-full"
                initial={{ opacity: 0, y: 50 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                transition={{ duration: 0.8 }}
            >
                <motion.h2 
                    className="font-fleur text-5xl sm:text-4xl md:text-5xl lg:text-6xl gradient-text-rose mb-8 sm:mb-10 md:mb-12 animate-glow leading-tight"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                    transition={{ duration: 1, delay: 0.2 }}
                >
                    {title}
                </motion.h2>
                <motion.div 
                    className="card-luxurious p-4 sm:p-6 md:p-8 lg:p-12 rounded-2xl sm:rounded-3xl shadow-rose border border-rose-200 sm:border-2"
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                >
                    {typeof content === "string" ? 
                        <p className="text-xl sm:text-lg md:text-xl text-rose-600 font-niconne leading-relaxed">{content}</p> : 
                        content
                    }
                </motion.div>
            </motion.div>
        </section>
    )
}