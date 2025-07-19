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

    const getPatternStyle = () => {
        switch (bgPattern) {
            case "flowers":
                return "radial-gradient(circle, transparent 20%, #fff 20%, #fff 80%, transparent 80%, transparent), radial-gradient(circle, transparent 20%, #fff 20%, #fff 80%, transparent 80%, transparent) 25px 25px, linear-gradient(#fce7f3 2px, transparent 2px) 0 -1px, linear-gradient(90deg, #fce7f3 2px, #fff 2px) -1px 0"
            case "stars":
                return "radial-gradient(#fbcfe8 1px, transparent 1px), radial-gradient(#fbcfe8 1px, #ffffff 1px)"
            case "diamonds":
                return "linear-gradient(45deg, #fce7f3 25%, transparent 25%), linear-gradient(-45deg, #fce7f3 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #fce7f3 75%), linear-gradient(-45deg, transparent 75%, #fce7f3 75%)"
            case "circles":
                return "radial-gradient(#fbcfe8 8px, transparent 8px)"
            default:
                return ""
        }
    }

    const getPatternSize = () => {
        switch (bgPattern) {
            case "flowers":
                return "50px 50px"
            case "stars":
                return "30px 30px"
            case "diamonds":
                return "60px 60px"
            case "circles":
                return "40px 40px"
            default:
                return ""
        }
    }

    const getPatternPosition = () => {
        switch (bgPattern) {
            case "diamonds":
                return "0 0, 30px 0, 30px -30px, 0 30px"
            default:
                return ""
        }
    }

    return (
        <section
            id={id}
            ref={ref}
            className={`min-h-screen w-full flex flex-col items-center justify-center py-20 px-4 sm:px-6 relative scroll-mt-16 ${className}`}
            style={{
                backgroundImage: getPatternStyle(),
                backgroundSize: getPatternSize(),
                backgroundPosition: getPatternPosition(),
            }}
        >
            <div className="absolute inset-0 bg-white/80 backdrop-blur-sm" />

            <motion.div
                className="relative z-10 max-w-3xl mx-auto text-center"
                initial={{ opacity: 0, y: 50 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                transition={{ duration: 0.8 }}
            >
                <h2 className="font-serif text-4xl sm:text-5xl text-pink-500 italic mb-8">{title}</h2>
                <div className="bg-white/70 backdrop-blur-sm p-6 sm:p-8 rounded-lg shadow-lg border border-pink-100">
                    {typeof content === "string" ? <p className="text-lg sm:text-xl text-gray-800">{content}</p> : content}
                </div>
            </motion.div>
        </section>
    )
}