"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Share2, ThumbsUp, ThumbsDown, Meh, Lock, Sparkles, Download, ArrowRight, Eye } from "lucide-react"
import { cn } from "@/lib/utils"
import type { PalmReadingResult } from "@/app/page"
import PalmVisualizer from "@/components/ui/PalmVisualizer"

interface ResultViewProps {
    imageData: string
    result: PalmReadingResult
}

export default function ResultView({ imageData, result }: ResultViewProps) {
    const [showViralCard, setShowViralCard] = useState(false)
    const [viralImage, setViralImage] = useState<string | null>(null)
    const [feedback, setFeedback] = useState<"up" | "down" | "meh" | null>(null)
    const [showVisualization, setShowVisualization] = useState(true)

    const { character, keywords, summary, lines, advice } = result

    const generateViralCard = async () => {
        const canvas = document.createElement("canvas")
        canvas.width = 1080
        canvas.height = 1920
        const ctx = canvas.getContext("2d")
        if (!ctx) return

        ctx.fillStyle = "#E6E7E3"
        ctx.fillRect(0, 0, 1080, 1920)

        ctx.fillStyle = "#FFFFFF"
        ctx.shadowColor = "rgba(0,0,0,0.1)"
        ctx.shadowBlur = 40
        ctx.shadowOffsetY = 20
        ctx.beginPath()
        ctx.roundRect(100, 200, 880, 1400, 60)
        ctx.fill()
        ctx.shadowColor = "transparent"

        ctx.font = "200px sans-serif"
        ctx.textAlign = "center"
        ctx.textBaseline = "middle"
        ctx.fillText(character.emoji, 540, 500)

        ctx.fillStyle = "#1A1A1A"
        ctx.font = "bold 80px sans-serif"
        ctx.fillText(character.title, 540, 750)

        ctx.font = "50px sans-serif"
        ctx.fillStyle = "#5F5F5F"
        ctx.fillText(character.desc, 540, 850)

        ctx.font = "bold 45px sans-serif"
        ctx.fillStyle = "#B6E63A"
        ctx.fillText(keywords.join("   "), 540, 1000)

        ctx.font = "40px sans-serif"
        ctx.fillStyle = "#1A1A1A"
        const words = summary.split(" ")
        let line = ""
        let y = 1200
        for (let n = 0; n < words.length; n++) {
            const testLine = line + words[n] + " "
            const metrics = ctx.measureText(testLine)
            if (metrics.width > 700 && n > 0) {
                ctx.fillText(line, 540, y)
                line = words[n] + " "
                y += 60
            } else {
                line = testLine
            }
        }
        ctx.fillText(line, 540, y)

        ctx.font = "30px sans-serif"
        ctx.fillStyle = "#999999"
        ctx.fillText("PalmRead AI Wellness", 540, 1500)

        setViralImage(canvas.toDataURL("image/png"))
        setShowViralCard(true)
    }

    return (
        <div className="relative min-h-full pb-32 bg-background text-foreground overflow-y-auto h-full scrollbar-hide">

            {/* Header Image Area with Visualization */}
            <div className="relative w-full h-[45vh] bg-white rounded-b-[40px] shadow-sm overflow-hidden">
                {showVisualization ? (
                    <PalmVisualizer imageData={imageData} lines={lines} />
                ) : (
                    <img src={imageData} className="w-full h-full object-cover opacity-80" alt="Hand" />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-white/80 to-transparent pointer-events-none" />

                {/* Toggle Visualization Button */}
                <button
                    onClick={() => setShowVisualization(!showVisualization)}
                    className="absolute top-4 right-4 z-20 px-3 py-1.5 bg-white/90 backdrop-blur rounded-full text-xs font-medium flex items-center gap-1.5 shadow-md border border-surface-border"
                >
                    <Eye className="w-3 h-3" />
                    {showVisualization ? "원본 보기" : "분석 보기"}
                </button>

                {/* Character Badge */}
                <motion.div
                    initial={{ y: 40, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 2, duration: 0.8 }}
                    className="absolute bottom-8 left-1/2 -translate-x-1/2 bg-white px-8 py-6 rounded-[32px] shadow-xl flex flex-col items-center gap-2 w-[85%] border border-surface-border z-10"
                >
                    <span className="text-6xl mb-2">{character.emoji}</span>
                    <div className="text-xs font-bold uppercase tracking-widest text-primary">Your Archetype</div>
                    <h2 className="text-2xl font-bold text-foreground">{character.name}</h2>
                    <p className="text-sm text-muted">{character.desc}</p>
                </motion.div>
            </div>

            {/* Content Area */}
            <div className="px-6 mt-8 space-y-6">

                {/* Summary Card */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 2.2 }}
                    className="bg-white p-6 rounded-[24px] shadow-sm border border-surface-border"
                >
                    <div className="flex items-center gap-2 mb-4">
                        <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                            <Sparkles className="w-4 h-4 text-primary-foreground" />
                        </div>
                        <h3 className="font-bold text-lg">AI Insight</h3>
                    </div>
                    <p className="text-muted leading-relaxed text-base">{summary}</p>

                    <div className="flex flex-wrap gap-2 mt-4">
                        {keywords.map((k) => (
                            <span key={k} className="px-3 py-1 bg-background rounded-full text-sm text-foreground font-medium">
                                {k}
                            </span>
                        ))}
                    </div>
                </motion.div>

                {/* Line Analysis Card */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 2.4 }}
                    className="bg-white p-6 rounded-[24px] shadow-sm border border-surface-border space-y-5"
                >
                    <h3 className="font-bold text-lg">손금 라인 분석</h3>
                    {lines.map((line) => (
                        <div key={line.name} className="space-y-2">
                            <div className="flex justify-between items-center">
                                <div className="flex items-center gap-2">
                                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: line.color }} />
                                    <span className="font-medium text-foreground">{line.koreanName}</span>
                                </div>
                                <span className="font-bold text-sm">{line.score}점</span>
                            </div>
                            <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                                <motion.div
                                    className="h-full rounded-full"
                                    style={{ backgroundColor: line.color }}
                                    initial={{ width: 0 }}
                                    animate={{ width: `${line.score}%` }}
                                    transition={{ duration: 1, delay: 2.6 }}
                                />
                            </div>
                            <p className="text-xs text-muted">{line.meaning}</p>
                        </div>
                    ))}
                </motion.div>

                {/* Advice Card */}
                {advice && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 2.6 }}
                        className="bg-primary/10 p-5 rounded-[24px] border border-primary/20"
                    >
                        <p className="text-foreground text-sm font-medium text-center">💡 {advice}</p>
                    </motion.div>
                )}

                {/* Paid Teaser */}
                <div className="relative overflow-hidden rounded-[24px] bg-white border border-surface-border shadow-sm">
                    <div className="p-6 filter blur-[4px] opacity-40 select-none">
                        <h3 className="font-bold text-lg mb-2">2025년 월별 운세 가이드</h3>
                        <p className="text-sm text-muted">1월에는 새로운 시작을 위한 에너지가...</p>
                        <div className="mt-4 h-20 bg-gray-100 rounded-xl"></div>
                    </div>

                    <div className="absolute inset-0 flex flex-col items-center justify-center bg-white/60 backdrop-blur-[2px]">
                        <Lock className="w-6 h-6 text-foreground mb-3" />
                        <p className="font-bold mb-4 text-sm text-center px-4 text-foreground">
                            더 깊은 조언이 필요하신가요?
                        </p>
                        <button className="px-6 py-3 bg-foreground text-white font-bold rounded-full shadow-lg active:scale-95 transition-transform flex items-center gap-2 text-sm">
                            전체 리포트 잠금해제 <ArrowRight className="w-4 h-4" />
                        </button>
                    </div>
                </div>

                {/* Feedback */}
                <div className="text-center py-4">
                    <p className="text-xs text-muted mb-3">분석 결과가 도움이 되었나요?</p>
                    <div className="flex justify-center gap-6">
                        <button onClick={() => setFeedback("up")} className={cn("p-3 rounded-full bg-white shadow-sm border border-surface-border transition-all hover:scale-110", feedback === "up" && "bg-primary border-primary")}><ThumbsUp className="w-5 h-5" /></button>
                        <button onClick={() => setFeedback("meh")} className={cn("p-3 rounded-full bg-white shadow-sm border border-surface-border transition-all hover:scale-110", feedback === "meh" && "bg-gray-200")}><Meh className="w-5 h-5" /></button>
                        <button onClick={() => setFeedback("down")} className={cn("p-3 rounded-full bg-white shadow-sm border border-surface-border transition-all hover:scale-110", feedback === "down" && "bg-gray-200")}><ThumbsDown className="w-5 h-5" /></button>
                    </div>
                </div>
            </div>

            {/* Floating Action Button */}
            <div className="fixed bottom-8 left-0 w-full px-6 flex justify-center z-50">
                <button
                    onClick={generateViralCard}
                    className="w-full max-w-sm py-4 bg-primary text-primary-foreground rounded-[24px] shadow-xl flex items-center justify-center gap-2 font-bold text-lg active:scale-[0.98] transition-all hover:brightness-105"
                >
                    <Share2 className="w-5 h-5" />
                    <span>친구에게 공유하기</span>
                </button>
            </div>

            {/* Viral Card Modal */}
            {showViralCard && viralImage && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm flex flex-col items-center justify-center p-6"
                >
                    <div className="relative w-full max-w-sm bg-white rounded-[32px] overflow-hidden shadow-2xl">
                        <div className="p-4 flex justify-between items-center border-b border-gray-100">
                            <h3 className="font-bold text-foreground">공유하기</h3>
                            <button onClick={() => setShowViralCard(false)} className="p-2 hover:bg-gray-100 rounded-full transition-colors">✕</button>
                        </div>
                        <div className="p-6 bg-background flex justify-center">
                            <img src={viralImage} className="h-[50vh] rounded-2xl shadow-lg border border-white" alt="Viral Card" />
                        </div>
                        <div className="p-4 grid grid-cols-2 gap-3">
                            <button className="py-3 bg-white border border-surface-border text-foreground rounded-xl font-bold text-sm flex items-center justify-center gap-2 hover:bg-gray-50">
                                <Download className="w-4 h-4" /> 저장
                            </button>
                            <button className="py-3 bg-primary text-primary-foreground rounded-xl font-bold text-sm flex items-center justify-center gap-2 hover:brightness-105">
                                <Share2 className="w-4 h-4" /> 공유
                            </button>
                        </div>
                    </div>
                </motion.div>
            )}
        </div>
    )
}
