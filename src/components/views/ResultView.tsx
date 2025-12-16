"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Share2, ThumbsUp, ThumbsDown, Meh, Lock, Sparkles, Download, ArrowRight, Eye, Heart, Briefcase, Coins, Activity, Compass } from "lucide-react"
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

    const { character, keywords, summary, lines, advice, elements, fortune, luckyItems } = result

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
        ctx.fillText(character.emoji, 540, 450)

        ctx.fillStyle = "#1A1A1A"
        ctx.font = "bold 70px sans-serif"
        ctx.fillText(character.title, 540, 680)

        ctx.font = "45px sans-serif"
        ctx.fillStyle = "#5F5F5F"
        ctx.fillText(character.desc, 540, 760)

        // Elements badge
        ctx.font = "bold 35px sans-serif"
        ctx.fillStyle = "#B6E63A"
        ctx.fillText(`${elements?.yinYang || "양"} · ${elements?.fiveElements || "水"}`, 540, 850)

        ctx.font = "bold 40px sans-serif"
        ctx.fillStyle = "#B6E63A"
        ctx.fillText(keywords.join("  "), 540, 950)

        // Summary
        ctx.font = "35px sans-serif"
        ctx.fillStyle = "#1A1A1A"
        const words = summary.split(" ")
        let line = ""
        let y = 1100
        for (let n = 0; n < words.length; n++) {
            const testLine = line + words[n] + " "
            const metrics = ctx.measureText(testLine)
            if (metrics.width > 680 && n > 0) {
                ctx.fillText(line, 540, y)
                line = words[n] + " "
                y += 55
            } else {
                line = testLine
            }
        }
        ctx.fillText(line, 540, y)

        // Lucky Items
        ctx.font = "30px sans-serif"
        ctx.fillStyle = "#888888"
        ctx.fillText(`🎨 ${luckyItems?.color || "녹색"}  🔢 ${luckyItems?.number || 7}  🧭 ${luckyItems?.direction || "동쪽"}`, 540, 1450)

        ctx.font = "28px sans-serif"
        ctx.fillStyle = "#AAAAAA"
        ctx.fillText("PalmRead AI · 2025", 540, 1550)

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
                    {/* Elements Badge */}
                    {elements && (
                        <div className="flex gap-2 mt-2">
                            <span className="px-3 py-1 bg-gray-100 rounded-full text-xs font-medium">{elements.yinYang}</span>
                            <span className="px-3 py-1 bg-primary/20 rounded-full text-xs font-bold text-primary-foreground">{elements.fiveElements}</span>
                            {elements.zodiac && <span className="px-3 py-1 bg-gray-100 rounded-full text-xs font-medium">{elements.zodiac}</span>}
                        </div>
                    )}
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
                        <h3 className="font-bold text-lg">AI 종합 분석</h3>
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

                {/* 2025 Fortune Cards */}
                {fortune && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 2.4 }}
                        className="space-y-4"
                    >
                        <h3 className="font-bold text-lg px-1">🐍 2025년 을사년 운세</h3>

                        <div className="grid grid-cols-2 gap-3">
                            {/* Love */}
                            <div className="bg-pink-50 p-4 rounded-[20px] border border-pink-100">
                                <div className="flex items-center gap-2 mb-2">
                                    <Heart className="w-4 h-4 text-pink-500" />
                                    <span className="font-bold text-sm text-pink-700">연애운</span>
                                </div>
                                <p className="text-xs text-pink-900/70 leading-relaxed">{fortune.love}</p>
                            </div>

                            {/* Career */}
                            <div className="bg-blue-50 p-4 rounded-[20px] border border-blue-100">
                                <div className="flex items-center gap-2 mb-2">
                                    <Briefcase className="w-4 h-4 text-blue-500" />
                                    <span className="font-bold text-sm text-blue-700">직업운</span>
                                </div>
                                <p className="text-xs text-blue-900/70 leading-relaxed">{fortune.career}</p>
                            </div>

                            {/* Wealth */}
                            <div className="bg-yellow-50 p-4 rounded-[20px] border border-yellow-100">
                                <div className="flex items-center gap-2 mb-2">
                                    <Coins className="w-4 h-4 text-yellow-600" />
                                    <span className="font-bold text-sm text-yellow-700">재물운</span>
                                </div>
                                <p className="text-xs text-yellow-900/70 leading-relaxed">{fortune.wealth}</p>
                            </div>

                            {/* Health */}
                            <div className="bg-green-50 p-4 rounded-[20px] border border-green-100">
                                <div className="flex items-center gap-2 mb-2">
                                    <Activity className="w-4 h-4 text-green-500" />
                                    <span className="font-bold text-sm text-green-700">건강운</span>
                                </div>
                                <p className="text-xs text-green-900/70 leading-relaxed">{fortune.health}</p>
                            </div>
                        </div>
                    </motion.div>
                )}

                {/* Lucky Items */}
                {luckyItems && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 2.5 }}
                        className="bg-gradient-to-r from-primary/10 to-primary/5 p-5 rounded-[24px] border border-primary/20"
                    >
                        <div className="flex items-center gap-2 mb-3">
                            <Compass className="w-5 h-5 text-primary-foreground" />
                            <h4 className="font-bold text-sm">행운의 아이템</h4>
                        </div>
                        <div className="flex justify-around text-center">
                            <div>
                                <div className="text-2xl mb-1">🎨</div>
                                <div className="text-xs text-muted">색상</div>
                                <div className="font-bold text-sm">{luckyItems.color}</div>
                            </div>
                            <div>
                                <div className="text-2xl mb-1">🔢</div>
                                <div className="text-xs text-muted">숫자</div>
                                <div className="font-bold text-sm">{luckyItems.number}</div>
                            </div>
                            <div>
                                <div className="text-2xl mb-1">🧭</div>
                                <div className="text-xs text-muted">방향</div>
                                <div className="font-bold text-sm">{luckyItems.direction}</div>
                            </div>
                        </div>
                    </motion.div>
                )}

                {/* Line Analysis Card */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 2.6 }}
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
                                    transition={{ duration: 1, delay: 2.8 }}
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
                        transition={{ delay: 2.8 }}
                        className="bg-primary/10 p-5 rounded-[24px] border border-primary/20"
                    >
                        <p className="text-foreground text-sm font-medium text-center">💡 {advice}</p>
                    </motion.div>
                )}

                {/* Paid Teaser */}
                <div className="relative overflow-hidden rounded-[24px] bg-white border border-surface-border shadow-sm">
                    <div className="p-6 filter blur-[4px] opacity-40 select-none">
                        <h3 className="font-bold text-lg mb-2">상세 월별 운세 가이드</h3>
                        <p className="text-sm text-muted">매달 당신만을 위한 맞춤 조언을...</p>
                        <div className="mt-4 h-20 bg-gray-100 rounded-xl"></div>
                    </div>

                    <div className="absolute inset-0 flex flex-col items-center justify-center bg-white/60 backdrop-blur-[2px]">
                        <Lock className="w-6 h-6 text-foreground mb-3" />
                        <p className="font-bold mb-4 text-sm text-center px-4 text-foreground">
                            더 깊은 분석이 필요하신가요?
                        </p>
                        <button className="px-6 py-3 bg-foreground text-white font-bold rounded-full shadow-lg active:scale-95 transition-transform flex items-center gap-2 text-sm">
                            전체 리포트 잠금해제 <ArrowRight className="w-4 h-4" />
                        </button>
                    </div>
                </div>

                {/* Feedback */}
                <div className="text-center py-4">
                    <p className="text-xs text-muted mb-3">분석 결과가 공감되셨나요?</p>
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
