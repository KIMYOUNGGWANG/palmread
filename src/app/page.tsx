"use client"

import { useState, useCallback, useRef } from "react"
import OnboardingView from "@/components/views/OnboardingView"
import BirthInputView from "@/components/views/BirthInputView"
import CameraView from "@/components/views/CameraView"
import AnalyzingView from "@/components/views/AnalyzingView"
import ResultView from "@/components/views/ResultView"
import { optimizeImage } from "@/lib/imageUtils"

type ViewState = "onboarding" | "birth" | "camera" | "analyzing" | "result"

// Result type from API (with coordinates and fortune)
export interface PalmReadingResult {
  character: {
    name: string
    title: string
    emoji: string
    desc: string
  }
  keywords: string[]
  summary: string
  lines: {
    name: string
    koreanName: string
    score: number
    color: string
    coordinates: [number, number][]
    meaning: string
  }[]
  elements: {
    yinYang: string
    fiveElements: string
    zodiac?: string
  }
  fortune: {
    love: string
    career: string
    wealth: string
    health: string
  }
  advice: string
  luckyItems: {
    color: string
    number: number
    direction: string
  }
}

export default function Home() {
  const [view, setView] = useState<ViewState>("onboarding")
  const [imageData, setImageData] = useState<string | null>(null)
  const [birthYear, setBirthYear] = useState<number | null>(null)
  const [analysisResult, setAnalysisResult] = useState<PalmReadingResult | null>(null)
  const apiCompleteRef = useRef(false)
  const animationCompleteRef = useRef(false)

  const checkAndProceed = useCallback(() => {
    if (apiCompleteRef.current && animationCompleteRef.current) {
      setView("result")
    }
  }, [])

  const handleBirthInput = (year: number | null) => {
    setBirthYear(year)
    setView("camera")
  }

  const handleCapture = async (data: string) => {
    setImageData(data)
    setView("analyzing")
    apiCompleteRef.current = false
    animationCompleteRef.current = false

    try {
      // Optimize image before API call
      const optimizedImage = await optimizeImage(data)

      const response = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          imageData: optimizedImage,
          birthYear: birthYear // Pass birth year to API
        }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || "Analysis failed")
      }

      const result: PalmReadingResult = await response.json()
      setAnalysisResult(result)
    } catch (err: any) {
      console.error("Analysis Error:", err)
      // Fallback mock data
      setAnalysisResult({
        character: {
          name: "Mystic Dreamer",
          title: "신비로운 몽상가",
          emoji: "🌙",
          desc: "창의적 영혼",
        },
        keywords: ["#직감력", "#예술적감각", "#깊은생각"],
        summary: "API 연결 중 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.",
        lines: [
          { name: "lifeLine", koreanName: "생명선", score: 80, color: "#FF6B6B", coordinates: [[0.3, 0.4], [0.35, 0.55], [0.38, 0.7], [0.4, 0.85]], meaning: "생명력이 강합니다" },
          { name: "headLine", koreanName: "지능선", score: 85, color: "#4ECDC4", coordinates: [[0.25, 0.45], [0.4, 0.48], [0.55, 0.5], [0.7, 0.48]], meaning: "분석적 사고력" },
          { name: "heartLine", koreanName: "감정선", score: 78, color: "#F472B6", coordinates: [[0.2, 0.3], [0.4, 0.33], [0.6, 0.35], [0.8, 0.38]], meaning: "풍부한 감수성" },
        ],
        elements: { yinYang: "양", fiveElements: "水" },
        fortune: { love: "곧 좋은 인연이 찾아올 것입니다.", career: "새로운 기회가 열릴 수 있습니다.", wealth: "안정적인 재정을 유지할 수 있습니다.", health: "꾸준한 관리가 필요합니다." },
        advice: "잠시 후 다시 시도해 주세요.",
        luckyItems: { color: "녹색", number: 7, direction: "동쪽" },
      })
    } finally {
      apiCompleteRef.current = true
      checkAndProceed()
    }
  }

  const handleAnimationComplete = () => {
    animationCompleteRef.current = true
    checkAndProceed()
  }

  return (
    <main className="relative w-full h-screen bg-background text-foreground overflow-hidden max-w-md mx-auto shadow-2xl">
      <header className="absolute top-0 left-0 w-full z-50 p-4 flex justify-between items-center pointer-events-none">
        <div className="text-xl font-bold tracking-tighter text-foreground opacity-0">PalmRead</div>
        {view !== "onboarding" && view !== "birth" && (
          <div className="text-xs bg-white/80 backdrop-blur px-3 py-1 rounded-full border border-surface-border flex items-center gap-1 animate-in fade-in text-muted shadow-sm">
            <span>🔒</span> Privacy First
          </div>
        )}
      </header>

      {view === "onboarding" && <OnboardingView onComplete={() => setView("birth")} />}
      {view === "birth" && <BirthInputView onComplete={handleBirthInput} />}
      {view === "camera" && <CameraView onCapture={handleCapture} />}
      {view === "analyzing" && imageData && <AnalyzingView imageData={imageData} onComplete={handleAnimationComplete} />}
      {view === "result" && imageData && analysisResult && <ResultView imageData={imageData} result={analysisResult} />}
    </main>
  )
}
