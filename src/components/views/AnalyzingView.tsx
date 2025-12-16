"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Sparkles } from "lucide-react"
import { cn } from "@/lib/utils"

interface AnalyzingViewProps {
    imageData: string
    onComplete: () => void
}

const MESSAGES = [
    "손금 이미지를 분석하고 있습니다...",
    "당신의 성향을 파악하는 중입니다...",
    "숨겨진 잠재력을 찾고 있습니다...",
    "거의 다 되었습니다...",
    "당신만을 위한 조언을 준비했습니다."
]

export default function AnalyzingView({ imageData, onComplete }: AnalyzingViewProps) {
    const [messageIndex, setMessageIndex] = useState(0)

    useEffect(() => {
        const interval = setInterval(() => {
            setMessageIndex((prev) => {
                if (prev < MESSAGES.length - 1) return prev + 1
                return prev
            })
        }, 2500)

        const timer = setTimeout(() => {
            onComplete()
        }, 11000) // Total duration

        return () => {
            clearInterval(interval)
            clearTimeout(timer)
        }
    }, [onComplete])

    return (
        <div className="relative w-full h-full flex flex-col items-center justify-center bg-background p-6 overflow-hidden">

            {/* Background Ripples */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                {[1, 2, 3].map((i) => (
                    <motion.div
                        key={i}
                        className="absolute rounded-full border border-primary/20 bg-primary/5"
                        initial={{ width: 200, height: 200, opacity: 0.8 }}
                        animate={{
                            width: [200, 600],
                            height: [200, 600],
                            opacity: [0.5, 0]
                        }}
                        transition={{
                            duration: 4,
                            repeat: Infinity,
                            delay: i * 1.2,
                            ease: "easeOut"
                        }}
                    />
                ))}
            </div>

            {/* Central Image with Soft Glow */}
            <div className="relative z-10 mb-12">
                <motion.div
                    animate={{ scale: [1, 1.05, 1] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                    className="relative w-48 h-48 rounded-full overflow-hidden border-4 border-white shadow-[0_20px_40px_rgba(0,0,0,0.1)]"
                >
                    <img src={imageData} alt="Scan" className="w-full h-full object-cover opacity-90" />

                    {/* Soft White Overlay */}
                    <div className="absolute inset-0 bg-white/10 backdrop-blur-[1px]" />
                </motion.div>

                {/* Floating Icon */}
                <motion.div
                    className="absolute -bottom-4 -right-2 bg-primary text-primary-foreground p-3 rounded-full shadow-lg"
                    animate={{ y: [0, -10, 0] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                >
                    <Sparkles className="w-6 h-6" fill="currentColor" />
                </motion.div>
            </div>

            {/* Text Messages */}
            <div className="z-10 text-center h-20">
                <motion.p
                    key={messageIndex}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="text-xl font-bold text-foreground"
                >
                    {MESSAGES[messageIndex]}
                </motion.p>
                <motion.div
                    className="mt-4 flex justify-center gap-1"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                >
                    <span className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: "0s" }} />
                    <span className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: "0.2s" }} />
                    <span className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: "0.4s" }} />
                </motion.div>
            </div>

        </div>
    )
}
