"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { ArrowRight, Calendar, Sparkles } from "lucide-react"
import { cn } from "@/lib/utils"

interface BirthInputViewProps {
    onComplete: (birthYear: number | null) => void
}

const ZODIAC_ANIMALS = [
    { year: 0, name: "원숭이", emoji: "🐵" },
    { year: 1, name: "닭", emoji: "🐔" },
    { year: 2, name: "개", emoji: "🐕" },
    { year: 3, name: "돼지", emoji: "🐷" },
    { year: 4, name: "쥐", emoji: "🐭" },
    { year: 5, name: "소", emoji: "🐮" },
    { year: 6, name: "호랑이", emoji: "🐯" },
    { year: 7, name: "토끼", emoji: "🐰" },
    { year: 8, name: "용", emoji: "🐲" },
    { year: 9, name: "뱀", emoji: "🐍" },
    { year: 10, name: "말", emoji: "🐴" },
    { year: 11, name: "양", emoji: "🐑" },
]

function getZodiac(year: number) {
    const index = year % 12
    return ZODIAC_ANIMALS[index]
}

export default function BirthInputView({ onComplete }: BirthInputViewProps) {
    const [birthYear, setBirthYear] = useState<string>("")
    const [showZodiac, setShowZodiac] = useState(false)

    const currentYear = new Date().getFullYear()
    const yearNum = parseInt(birthYear)
    const isValidYear = yearNum >= 1920 && yearNum <= currentYear
    const zodiac = isValidYear ? getZodiac(yearNum) : null

    const handleYearChange = (value: string) => {
        // Only allow numbers
        const numOnly = value.replace(/\D/g, "").slice(0, 4)
        setBirthYear(numOnly)

        if (numOnly.length === 4) {
            const year = parseInt(numOnly)
            if (year >= 1920 && year <= currentYear) {
                setShowZodiac(true)
            }
        } else {
            setShowZodiac(false)
        }
    }

    const handleSubmit = () => {
        if (isValidYear) {
            onComplete(yearNum)
        }
    }

    const handleSkip = () => {
        onComplete(null)
    }

    return (
        <div className="relative w-full h-full flex flex-col items-center justify-between py-12 px-8 overflow-hidden bg-background text-foreground">

            {/* Background */}
            <div className="absolute top-[-10%] right-[-10%] w-[400px] h-[400px] bg-white rounded-full blur-[80px] opacity-60 pointer-events-none" />
            <div className="absolute bottom-[-10%] left-[-10%] w-[300px] h-[300px] bg-primary/20 rounded-full blur-[60px] pointer-events-none" />

            {/* Header */}
            <div className="w-full pt-8 z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="space-y-4"
                >
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white shadow-sm border border-surface-border text-xs font-semibold tracking-wide text-muted">
                        <Calendar className="w-3 h-3 text-primary" />
                        <span>더 정확한 분석을 위해</span>
                    </div>

                    <h1 className="text-4xl font-bold leading-[1.1] tracking-tight text-foreground">
                        태어난 해를<br />
                        <span className="text-muted">알려주세요</span>
                    </h1>

                    <p className="text-muted text-base leading-relaxed max-w-xs">
                        띠와 사주를 반영하여 더 개인화된<br />
                        손금 분석을 제공해 드립니다.
                    </p>
                </motion.div>
            </div>

            {/* Input Area */}
            <div className="relative w-full flex-1 flex flex-col items-center justify-center z-10 space-y-6">

                {/* Year Input */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className="w-full max-w-xs"
                >
                    <input
                        type="tel"
                        inputMode="numeric"
                        placeholder="예: 1995"
                        value={birthYear}
                        onChange={(e) => handleYearChange(e.target.value)}
                        className="w-full text-center text-4xl font-bold py-6 px-8 rounded-[24px] bg-white border-2 border-surface-border focus:border-primary focus:outline-none transition-colors shadow-sm"
                        maxLength={4}
                    />
                </motion.div>

                {/* Zodiac Display */}
                {showZodiac && zodiac && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex flex-col items-center gap-3 bg-white px-8 py-6 rounded-[24px] shadow-sm border border-surface-border"
                    >
                        <span className="text-5xl">{zodiac.emoji}</span>
                        <div className="text-center">
                            <p className="font-bold text-lg text-foreground">{zodiac.name}띠</p>
                            <p className="text-sm text-muted">{currentYear - yearNum}세</p>
                        </div>
                        <div className="flex items-center gap-1 text-xs text-primary font-medium bg-primary/10 px-3 py-1 rounded-full">
                            <Sparkles className="w-3 h-3" />
                            <span>띠 운세가 반영됩니다</span>
                        </div>
                    </motion.div>
                )}
            </div>

            {/* Footer */}
            <div className="w-full space-y-4 mb-4 z-10">
                <motion.button
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    onClick={handleSubmit}
                    disabled={!isValidYear}
                    className={cn(
                        "w-full py-5 rounded-[24px] font-bold text-lg transition-all flex items-center justify-center gap-3 shadow-lg",
                        isValidYear
                            ? "bg-primary text-primary-foreground hover:brightness-105 active:scale-[0.98]"
                            : "bg-gray-200 text-gray-400 cursor-not-allowed shadow-none"
                    )}
                >
                    <span>다음</span>
                    <ArrowRight className="w-5 h-5" />
                </motion.button>

                <motion.button
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                    onClick={handleSkip}
                    className="w-full py-3 text-muted text-sm font-medium hover:text-foreground transition-colors"
                >
                    건너뛰기
                </motion.button>
            </div>
        </div>
    )
}
