"use client"

import { useState, useCallback, useRef } from "react"
import OnboardingView from "@/components/views/OnboardingView"
import BirthInputView from "@/components/views/BirthInputView"
import CameraView from "@/components/views/CameraView"
import AnalyzingView from "@/components/views/AnalyzingView"
import ResultView from "@/components/views/ResultView"
import { optimizeImage } from "@/lib/imageUtils"

type ViewState = "onboarding" | "birth" | "camera" | "analyzing" | "result"

// New Result type from API
export interface PalmReadingResult {
  userProfile: {
    characterType: string
    koreanTitle: string
    emoji: string
    desc: string
    keywords: string[]
  }
  summary: string
  lines: {
    [key: string]: {
      exists: boolean
      score: number
      color: string
      coordinates: [number, number][]
      meaning: string
    }
  }
  fortune: {
    love: string
    money: string
    job: string
    health: string
  }
  timeline: {
    year: number
    score: number
    event: string
    trend?: "up" | "down"
  }[]
  lucky: {
    color: string
    number: number
    item: string
    direction: string
  }
  yearInfo: {
    year: number
    zodiac: string
    animal: string
  }
}

export default function Home() {
  const [view, setView] = useState<ViewState>("onboarding")
  const [imageData, setImageData] = useState<string | null>(null)
  const [birthYear, setBirthYear] = useState<number | null>(null)
  const [lang, setLang] = useState<"ko" | "en">("ko")
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
      const optimizedImage = await optimizeImage(data)

      const response = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          imageData: optimizedImage,
          birthYear: birthYear,
          lang: lang
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
      // Fallback mock data with new schema
      const currentYear = new Date().getFullYear()
      setAnalysisResult({
        userProfile: {
          characterType: "Mystic Dreamer",
          koreanTitle: "신비로운 몽상가",
          emoji: "🌙",
          desc: "창의적이고 직관적인 영혼의 소유자입니다.",
          keywords: ["#직감력", "#예술적감각", "#깊은생각"]
        },
        summary: "API 연결 중 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.",
        lines: {
          lifeLine: { exists: true, score: 80, color: "#FF6B6B", coordinates: [[0.3, 0.4], [0.35, 0.55], [0.38, 0.7], [0.4, 0.85]], meaning: "생명력이 강합니다" },
          headLine: { exists: true, score: 85, color: "#4ECDC4", coordinates: [[0.25, 0.45], [0.4, 0.48], [0.55, 0.5], [0.7, 0.48]], meaning: "분석적 사고력" },
          heartLine: { exists: true, score: 78, color: "#F472B6", coordinates: [[0.2, 0.3], [0.4, 0.33], [0.6, 0.35], [0.8, 0.38]], meaning: "풍부한 감수성" },
          fateLine: { exists: true, score: 75, color: "#B6E63A", coordinates: [[0.5, 0.9], [0.5, 0.7], [0.48, 0.5]], meaning: "재물운 양호" }
        },
        fortune: { love: "좋은 인연을 기대하세요.", money: "안정적입니다.", job: "기회가 열립니다.", health: "꾸준한 관리 필요." },
        timeline: [
          { year: currentYear, score: 75, event: "준비의 해" },
          { year: currentYear + 1, score: 80, event: "도약의 시작" },
          { year: currentYear + 2, score: 85, event: "성장 가속" },
          { year: currentYear + 3, score: 70, event: "잠시 휴식" },
          { year: currentYear + 4, score: 90, event: "황금기" }
        ],
        lucky: { color: "녹색", number: 7, item: "식물", direction: "동쪽" },
        yearInfo: { year: currentYear, zodiac: "갑진년", animal: "푸른 용" }
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
      <header className="absolute top-0 left-0 w-full z-50 p-3 flex justify-between items-center">
        {/* Language Toggle - hide on result view */}
        {view !== "result" ? (
          <button
            onClick={() => setLang(lang === "ko" ? "en" : "ko")}
            className="text-xs bg-white/90 backdrop-blur px-2.5 py-1 rounded-full border border-surface-border flex items-center gap-1 shadow-sm hover:bg-white transition-colors"
          >
            {lang === "ko" ? "🇰🇷" : "🇺🇸"}
          </button>
        ) : (
          <div /> /* Placeholder for flex spacing */
        )}

        {view !== "onboarding" && view !== "birth" && (
          <div className="text-[10px] bg-white/80 backdrop-blur px-2 py-1 rounded-full border border-surface-border flex items-center gap-1 text-muted shadow-sm">
            <span>🔒</span> Privacy
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
