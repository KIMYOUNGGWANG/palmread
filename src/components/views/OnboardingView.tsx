"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { ArrowRight, ShieldCheck, Sparkles } from "lucide-react"
import { cn } from "@/lib/utils"

interface OnboardingViewProps {
    onComplete: () => void
}

export default function OnboardingView({ onComplete }: OnboardingViewProps) {
    const [isProcessing, setIsProcessing] = useState(false)
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
    }, [])

    const handleStart = () => {
        setIsProcessing(true)
        setTimeout(() => {
            onComplete()
        }, 1500)
    }

    return (
        <div className="relative w-full h-full flex flex-col items-center justify-between py-12 px-8 overflow-hidden bg-background text-foreground">

            {/* Background Elements - Soft & Organic */}
            <div className="absolute top-[-10%] right-[-10%] w-[400px] h-[400px] bg-white rounded-full blur-[80px] opacity-60 pointer-events-none" />
            <div className="absolute bottom-[-10%] left-[-10%] w-[300px] h-[300px] bg-primary/20 rounded-full blur-[60px] pointer-events-none" />

            {/* Header Area */}
            <div className="w-full pt-8 z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="space-y-6"
                >
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white shadow-sm border border-surface-border text-xs font-semibold tracking-wide text-muted">
                        <Sparkles className="w-3 h-3 text-primary" fill="currentColor" />
                        <span>AI Wellness & Life Coaching</span>
                    </div>

                    <h1 className="text-5xl font-bold leading-[1.1] tracking-tight text-foreground">
                        Find Your<br />
                        <span className="text-muted">Inner Balance.</span>
                    </h1>

                    <p className="text-muted text-lg leading-relaxed max-w-xs">
                        손금에 담긴 당신만의 이야기를 통해<br />
                        더 나은 내일을 위한 조언을 드립니다.
                    </p>
                </motion.div>
            </div>

            {/* Central Visual - Abstract Hand/Line Art */}
            <div className="relative w-full flex-1 flex items-center justify-center z-10">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1, delay: 0.2 }}
                    className="relative w-64 h-80 bg-white rounded-[32px] shadow-[0_20px_40px_rgba(0,0,0,0.06)] flex flex-col items-center justify-center p-8 border border-surface-border"
                >
                    {/* Animated Lines */}
                    <div className="absolute inset-0 overflow-hidden rounded-[32px]">
                        <motion.div
                            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 bg-primary/10 rounded-full blur-2xl"
                            animate={{ scale: [1, 1.2, 1] }}
                            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                        />
                    </div>

                    <div className="relative z-10 text-center space-y-4">
                        <div className="w-16 h-16 bg-primary/20 rounded-2xl flex items-center justify-center mx-auto mb-2 text-2xl">
                            ✋
                        </div>
                        <h3 className="text-xl font-bold text-foreground">Privacy Promise</h3>
                        <p className="text-sm text-muted leading-relaxed">
                            업로드된 이미지는<br />
                            분석 후 <strong>즉시 삭제</strong>됩니다.
                        </p>
                        <div className="flex items-center justify-center gap-2 text-xs text-green-600 font-medium bg-green-50 px-3 py-1 rounded-full mt-2">
                            <ShieldCheck className="w-3 h-3" />
                            <span>End-to-End Encrypted</span>
                        </div>
                    </div>
                </motion.div>
            </div>

            {/* Footer Actions */}
            <div className="w-full space-y-6 mb-4 z-10">
                <motion.button
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    onClick={handleStart}
                    disabled={isProcessing}
                    className={cn(
                        "w-full py-5 rounded-[24px] font-bold text-lg transition-all flex items-center justify-center gap-3 shadow-lg hover:shadow-xl active:scale-[0.98]",
                        isProcessing
                            ? "bg-gray-200 text-gray-400 cursor-not-allowed shadow-none"
                            : "bg-primary text-primary-foreground hover:brightness-105"
                    )}
                >
                    {isProcessing ? (
                        <span>시작하는 중...</span>
                    ) : (
                        <>
                            <span>무료로 분석 시작하기</span>
                            <ArrowRight className="w-5 h-5" />
                        </>
                    )}
                </motion.button>

                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                    className="text-xs text-center text-gray-400"
                >
                    서비스 이용 시 <a href="#" className="underline hover:text-foreground transition-colors">이용약관</a>에 동의하게 됩니다.
                </motion.p>
            </div>
        </div>
    )
}
