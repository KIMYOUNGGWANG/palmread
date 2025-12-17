"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Share2, ThumbsUp, ThumbsDown, Meh, Lock, Sparkles, Download, ArrowRight, Eye, Heart, Briefcase, Coins, Activity, Compass, TrendingUp } from "lucide-react"
import { cn } from "@/lib/utils"
import type { PalmReadingResult } from "@/app/page"
import PalmVisualizer from "@/components/ui/PalmVisualizer"

interface ResultViewProps {
    imageData: string
    result: PalmReadingResult
}

const LINE_KOREAN_NAMES: Record<string, string> = {
    lifeLine: "생명선",
    headLine: "지능선",
    heartLine: "감정선",
    fateLine: "재물선"
}

export default function ResultView({ imageData, result }: ResultViewProps) {
    const [showViralCard, setShowViralCard] = useState(false)
    const [viralImage, setViralImage] = useState<string | null>(null)
    const [feedback, setFeedback] = useState<"up" | "down" | "meh" | null>(null)
    const [showVisualization, setShowVisualization] = useState(true)

    const { userProfile, summary, lines, fortune, timeline, lucky, yearInfo } = result

    // Convert lines object to array for PalmVisualizer
    const linesArray = Object.entries(lines)
        .filter(([_, data]) => data.exists)
        .map(([name, data]) => ({
            name,
            koreanName: LINE_KOREAN_NAMES[name] || name,
            score: data.score,
            color: data.color,
            coordinates: data.coordinates,
            meaning: data.meaning
        }))

    const generateViralCard = async () => {
        const canvas = document.createElement("canvas")
        canvas.width = 1080
        canvas.height = 1920
        const ctx = canvas.getContext("2d")
        if (!ctx) return

        // Background gradient
        const grad = ctx.createLinearGradient(0, 0, 0, 1920)
        grad.addColorStop(0, "#E6E7E3")
        grad.addColorStop(1, "#D4D5D1")
        ctx.fillStyle = grad
        ctx.fillRect(0, 0, 1080, 1920)

        // Card
        ctx.fillStyle = "#FFFFFF"
        ctx.shadowColor = "rgba(0,0,0,0.12)"
        ctx.shadowBlur = 50
        ctx.shadowOffsetY = 25
        ctx.beginPath()
        ctx.roundRect(80, 180, 920, 1500, 60)
        ctx.fill()
        ctx.shadowColor = "transparent"

        // Year badge
        ctx.fillStyle = "#B6E63A"
        ctx.beginPath()
        ctx.roundRect(390, 230, 300, 50, 25)
        ctx.fill()
        ctx.fillStyle = "#1A1A1A"
        ctx.font = "bold 24px sans-serif"
        ctx.textAlign = "center"
        ctx.fillText(`${yearInfo?.zodiac || "2025년"} 운세`, 540, 265)

        // Emoji
        ctx.font = "180px sans-serif"
        ctx.textBaseline = "middle"
        ctx.fillText(userProfile.emoji, 540, 480)

        // Character name
        ctx.fillStyle = "#1A1A1A"
        ctx.font = "bold 65px sans-serif"
        ctx.fillText(userProfile.koreanTitle, 540, 680)

        // Description
        ctx.font = "40px sans-serif"
        ctx.fillStyle = "#666666"
        ctx.fillText(userProfile.desc.slice(0, 20), 540, 760)

        // Keywords
        ctx.font = "bold 35px sans-serif"
        ctx.fillStyle = "#B6E63A"
        ctx.fillText(userProfile.keywords.join("  "), 540, 880)

        // Timeline mini-graph
        const graphStartY = 1000
        const graphHeight = 200
        const graphWidth = 700
        const graphStartX = (1080 - graphWidth) / 2

        ctx.strokeStyle = "#E0E0E0"
        ctx.lineWidth = 2
        ctx.beginPath()
        ctx.moveTo(graphStartX, graphStartY + graphHeight)
        ctx.lineTo(graphStartX + graphWidth, graphStartY + graphHeight)
        ctx.stroke()

        // Draw timeline bars
        if (timeline && timeline.length > 0) {
            const barWidth = graphWidth / timeline.length - 20
            timeline.forEach((item, i) => {
                const barHeight = (item.score / 100) * graphHeight
                const x = graphStartX + i * (barWidth + 20) + 10
                const y = graphStartY + graphHeight - barHeight

                ctx.fillStyle = item.score >= 80 ? "#B6E63A" : item.score >= 60 ? "#FFD93D" : "#FF6B6B"
                ctx.beginPath()
                ctx.roundRect(x, y, barWidth, barHeight, 8)
                ctx.fill()

                ctx.fillStyle = "#888888"
                ctx.font = "22px sans-serif"
                ctx.fillText(`${item.year}`, x + barWidth / 2, graphStartY + graphHeight + 30)
            })
        }

        // Lucky items
        ctx.fillStyle = "#888888"
        ctx.font = "28px sans-serif"
        ctx.fillText(`🎨 ${lucky?.color || "녹색"}  🔢 ${lucky?.number || 7}  🧭 ${lucky?.direction || "동쪽"}`, 540, 1400)

        // Watermark
        ctx.font = "26px sans-serif"
        ctx.fillStyle = "#BBBBBB"
        ctx.fillText("PalmRead AI · " + (yearInfo?.year || 2025), 540, 1620)

        setViralImage(canvas.toDataURL("image/png"))
        setShowViralCard(true)
    }

    return (
        <div className="relative min-h-full pb-32 bg-background text-foreground overflow-y-auto h-full scrollbar-hide">

            {/* Header Image Area */}
            <div className="relative w-full h-[45vh] bg-white rounded-b-[40px] shadow-sm overflow-hidden">
                {showVisualization ? (
                    <PalmVisualizer imageData={imageData} lines={linesArray} />
                ) : (
                    <img src={imageData} className="w-full h-full object-cover opacity-80" alt="Hand" />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-white/80 to-transparent pointer-events-none" />

                {/* Toggle Button */}
                <button
                    onClick={() => setShowVisualization(!showVisualization)}
                    className="absolute top-4 right-4 z-20 px-3 py-1.5 bg-white/90 backdrop-blur rounded-full text-xs font-medium flex items-center gap-1.5 shadow-md border border-surface-border"
                >
                    <Eye className="w-3 h-3" />
                    {showVisualization ? "원본" : "분석"}
                </button>

                {/* Year Badge */}
                {yearInfo && (
                    <div className="absolute top-4 left-4 z-20 px-3 py-1.5 bg-primary/90 backdrop-blur rounded-full text-xs font-bold text-primary-foreground shadow-md">
                        🐍 {yearInfo.zodiac}
                    </div>
                )}

                {/* Character Badge */}
                <motion.div
                    initial={{ y: 40, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 2, duration: 0.8 }}
                    className="absolute bottom-8 left-1/2 -translate-x-1/2 bg-white px-8 py-6 rounded-[32px] shadow-xl flex flex-col items-center gap-2 w-[85%] border border-surface-border z-10"
                >
                    <span className="text-6xl mb-2">{userProfile.emoji}</span>
                    <div className="text-xs font-bold uppercase tracking-widest text-primary">{userProfile.characterType}</div>
                    <h2 className="text-2xl font-bold text-foreground">{userProfile.koreanTitle}</h2>
                    <p className="text-sm text-muted text-center">{userProfile.desc}</p>
                    <div className="flex flex-wrap gap-2 mt-2 justify-center">
                        {userProfile.keywords.map((k) => (
                            <span key={k} className="px-2 py-0.5 bg-primary/10 rounded-full text-xs font-medium text-primary-foreground">{k}</span>
                        ))}
                    </div>
                </motion.div>
            </div>

            {/* Content Area */}
            <div className="px-6 mt-8 space-y-6">

                {/* Summary */}
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
                        <h3 className="font-bold text-lg">{yearInfo?.year || 2025}년 총운</h3>
                    </div>
                    <p className="text-muted leading-relaxed text-base">{summary}</p>
                </motion.div>

                {/* 5-Year Timeline */}
                {timeline && timeline.length > 0 && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 2.3 }}
                        className="bg-white p-5 rounded-[24px] shadow-sm border border-surface-border"
                    >
                        <div className="flex items-center gap-2 mb-5">
                            <TrendingUp className="w-5 h-5 text-primary-foreground" />
                            <h3 className="font-bold text-lg">5년 운세 그래프</h3>
                        </div>
                        <div className="flex items-end justify-between gap-3 px-2">
                            {timeline.map((item, i) => {
                                const barHeight = Math.round((item.score / 100) * 100); // max 100px
                                return (
                                    <div key={item.year} className="flex-1 flex flex-col items-center">
                                        {/* Score */}
                                        <motion.span
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            transition={{ delay: 2.8 + i * 0.1 }}
                                            className="text-xs font-bold text-muted mb-1"
                                        >
                                            {item.score}
                                        </motion.span>

                                        {/* Bar */}
                                        <motion.div
                                            className="w-8 rounded-t-md"
                                            style={{
                                                backgroundColor: item.score >= 80 ? "#B6E63A" : item.score >= 60 ? "#FFD93D" : "#FF6B6B",
                                            }}
                                            initial={{ height: 0 }}
                                            animate={{ height: barHeight }}
                                            transition={{ duration: 0.8, delay: 2.5 + i * 0.1 }}
                                        />

                                        {/* Year & Event */}
                                        <div className="text-center mt-2">
                                            <p className="text-xs font-bold">{item.year}</p>
                                            {item.trend && (
                                                <span className={`text-xs ${item.trend === "up" ? "text-green-500" : "text-red-400"}`}>
                                                    {item.trend === "up" ? "▲" : "▼"}
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </motion.div>
                )}

                {/* Fortune Cards */}
                {fortune && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 2.4 }}
                        className="space-y-4"
                    >
                        <h3 className="font-bold text-lg px-1">🔮 {yearInfo?.year || 2025}년 운세</h3>

                        <div className="grid grid-cols-2 gap-3">
                            <div className="bg-pink-50 p-4 rounded-[20px] border border-pink-100">
                                <div className="flex items-center gap-2 mb-2">
                                    <Heart className="w-4 h-4 text-pink-500" />
                                    <span className="font-bold text-sm text-pink-700">연애운</span>
                                </div>
                                <p className="text-xs text-pink-900/70 leading-relaxed">{fortune.love}</p>
                            </div>

                            <div className="bg-yellow-50 p-4 rounded-[20px] border border-yellow-100">
                                <div className="flex items-center gap-2 mb-2">
                                    <Coins className="w-4 h-4 text-yellow-600" />
                                    <span className="font-bold text-sm text-yellow-700">재물운</span>
                                </div>
                                <p className="text-xs text-yellow-900/70 leading-relaxed">{fortune.money}</p>
                            </div>

                            <div className="bg-blue-50 p-4 rounded-[20px] border border-blue-100">
                                <div className="flex items-center gap-2 mb-2">
                                    <Briefcase className="w-4 h-4 text-blue-500" />
                                    <span className="font-bold text-sm text-blue-700">직업운</span>
                                </div>
                                <p className="text-xs text-blue-900/70 leading-relaxed">{fortune.job}</p>
                            </div>

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
                {lucky && (
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
                                <div className="font-bold text-sm">{lucky.color}</div>
                            </div>
                            <div>
                                <div className="text-2xl mb-1">🔢</div>
                                <div className="text-xs text-muted">숫자</div>
                                <div className="font-bold text-sm">{lucky.number}</div>
                            </div>
                            <div>
                                <div className="text-2xl mb-1">🎁</div>
                                <div className="text-xs text-muted">아이템</div>
                                <div className="font-bold text-sm">{lucky.item}</div>
                            </div>
                            <div>
                                <div className="text-2xl mb-1">🧭</div>
                                <div className="text-xs text-muted">방향</div>
                                <div className="font-bold text-sm">{lucky.direction}</div>
                            </div>
                        </div>
                    </motion.div>
                )}

                {/* Line Analysis */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 2.6 }}
                    className="bg-white p-6 rounded-[24px] shadow-sm border border-surface-border space-y-5"
                >
                    <h3 className="font-bold text-lg">손금 라인 분석</h3>
                    {linesArray.map((line) => (
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

                {/* Paid Teaser */}
                <div className="relative overflow-hidden rounded-[24px] bg-white border border-surface-border shadow-sm">
                    <div className="p-6 filter blur-[4px] opacity-40 select-none">
                        <h3 className="font-bold text-lg mb-2">상세 월별 운세</h3>
                        <p className="text-sm text-muted">매달 맞춤 조언...</p>
                        <div className="mt-4 h-20 bg-gray-100 rounded-xl"></div>
                    </div>
                    <div className="absolute inset-0 flex flex-col items-center justify-center bg-white/60 backdrop-blur-[2px]">
                        <Lock className="w-6 h-6 text-foreground mb-3" />
                        <p className="font-bold mb-4 text-sm text-center px-4 text-foreground">프리미엄 분석 잠금해제</p>
                        <button className="px-6 py-3 bg-foreground text-white font-bold rounded-full shadow-lg active:scale-95 transition-transform flex items-center gap-2 text-sm">
                            상세 리포트 보기 <ArrowRight className="w-4 h-4" />
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

            {/* Floating Share Button */}
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
                            <button onClick={() => setShowViralCard(false)} className="p-2 hover:bg-gray-100 rounded-full">✕</button>
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
