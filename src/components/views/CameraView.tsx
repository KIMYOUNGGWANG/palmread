"use client"

import { useEffect, useRef, useState, useCallback } from "react"
import { Camera as CameraIcon, Info, Loader2, Sun, AlertCircle } from "lucide-react"
import { cn } from "@/lib/utils"
import { motion, AnimatePresence } from "framer-motion"

interface CameraViewProps {
    onCapture: (imageData: string) => void
}

type QualityStatus = "checking" | "good" | "low_brightness" | "blur"

export default function CameraView({ onCapture }: CameraViewProps) {
    const videoRef = useRef<HTMLVideoElement>(null)
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const qualityCanvasRef = useRef<HTMLCanvasElement>(null)
    const [isStreaming, setIsStreaming] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [statusMessage, setStatusMessage] = useState("카메라 연결 중...")
    const [qualityStatus, setQualityStatus] = useState<QualityStatus>("checking")
    const [brightness, setBrightness] = useState(0)

    useEffect(() => {
        let stream: MediaStream | null = null

        const startCamera = async (mode: "environment" | "user" | "any") => {
            try {
                setStatusMessage(mode === "environment" ? "후면 카메라 연결 시도..." : "전면 카메라 연결 시도...")

                const constraints: MediaStreamConstraints = {
                    video: mode === "any"
                        ? true
                        : { facingMode: mode, width: { ideal: 1920 }, height: { ideal: 1080 } }
                }

                stream = await navigator.mediaDevices.getUserMedia(constraints)

                if (videoRef.current) {
                    videoRef.current.srcObject = stream
                    videoRef.current.onloadedmetadata = () => {
                        videoRef.current?.play()
                        setIsStreaming(true)
                        setError(null)
                        setStatusMessage("")
                    }
                }
            } catch (err: any) {
                console.warn(`Camera attempt (${mode}) failed:`, err.name)

                if (mode === "environment") startCamera("user")
                else if (mode === "user") startCamera("any")
                else setError("카메라를 실행할 수 없습니다. 권한을 확인해주세요.")
            }
        }

        startCamera("environment")

        return () => {
            if (stream) {
                stream.getTracks().forEach((track) => track.stop())
            }
        }
    }, [])

    // Quality Check Loop
    useEffect(() => {
        if (!isStreaming || !videoRef.current) return

        const qualityCanvas = qualityCanvasRef.current
        if (!qualityCanvas) return
        const ctx = qualityCanvas.getContext("2d", { willReadFrequently: true })
        if (!ctx) return

        let animationId: number

        const checkQuality = () => {
            const video = videoRef.current
            if (!video || video.paused || video.ended) {
                animationId = requestAnimationFrame(checkQuality)
                return
            }

            // Sample a smaller area for performance (center 200x200)
            const sampleSize = 200
            qualityCanvas.width = sampleSize
            qualityCanvas.height = sampleSize

            const sx = (video.videoWidth - sampleSize) / 2
            const sy = (video.videoHeight - sampleSize) / 2

            ctx.drawImage(video, sx, sy, sampleSize, sampleSize, 0, 0, sampleSize, sampleSize)
            const imageData = ctx.getImageData(0, 0, sampleSize, sampleSize)
            const data = imageData.data

            // Calculate average brightness
            let totalBrightness = 0
            for (let i = 0; i < data.length; i += 4) {
                totalBrightness += (data[i] + data[i + 1] + data[i + 2]) / 3
            }
            const avgBrightness = totalBrightness / (data.length / 4)
            setBrightness(Math.round(avgBrightness))

            // Determine quality status
            if (avgBrightness < 50) {
                setQualityStatus("low_brightness")
            } else {
                setQualityStatus("good")
            }

            animationId = requestAnimationFrame(checkQuality)
        }

        checkQuality()

        return () => cancelAnimationFrame(animationId)
    }, [isStreaming])

    // Guide Overlay
    useEffect(() => {
        if (!isStreaming || !canvasRef.current || !videoRef.current) return

        const canvas = canvasRef.current
        const video = videoRef.current
        const ctx = canvas.getContext("2d")
        if (!ctx) return

        let animationFrameId: number

        const drawOverlay = () => {
            if (!video || video.paused || video.ended) return

            canvas.width = video.videoWidth
            canvas.height = video.videoHeight
            const w = canvas.width
            const h = canvas.height

            ctx.clearRect(0, 0, w, h)

            const palmW = w * 0.65
            const palmH = h * 0.55
            const palmX = (w - palmW) / 2
            const palmY = (h - palmH) / 2

            ctx.beginPath()
            ctx.roundRect(palmX, palmY, palmW, palmH, 40)

            ctx.save()
            ctx.globalCompositeOperation = "destination-out"
            ctx.fillStyle = "black"
            ctx.fill()
            ctx.restore()

            // Guide border color based on quality
            ctx.strokeStyle = qualityStatus === "good"
                ? "rgba(182, 230, 58, 0.9)" // Lime green when good
                : "rgba(255, 255, 255, 0.8)"
            ctx.lineWidth = qualityStatus === "good" ? 3 : 2
            ctx.setLineDash([20, 20])
            ctx.stroke()

            animationFrameId = requestAnimationFrame(drawOverlay)
        }

        drawOverlay()

        return () => cancelAnimationFrame(animationFrameId)
    }, [isStreaming, qualityStatus])

    const handleCapture = useCallback(() => {
        if (!videoRef.current) return

        if (qualityStatus !== "good") {
            // Shake animation could be added here
            return
        }

        const canvas = document.createElement("canvas")
        canvas.width = videoRef.current.videoWidth
        canvas.height = videoRef.current.videoHeight
        const ctx = canvas.getContext("2d")
        if (ctx) {
            ctx.drawImage(videoRef.current, 0, 0)
            // High quality JPEG
            onCapture(canvas.toDataURL("image/jpeg", 0.95))
        }
    }, [qualityStatus, onCapture])

    if (error) {
        return (
            <div className="flex flex-col items-center justify-center h-full bg-background p-6 text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center text-red-500">
                    <CameraIcon className="w-8 h-8" />
                </div>
                <p className="text-muted">{error}</p>
                <button onClick={() => window.location.reload()} className="px-6 py-2 bg-primary text-primary-foreground rounded-full font-bold">
                    다시 시도
                </button>
            </div>
        )
    }

    return (
        <div className="relative w-full h-full bg-black overflow-hidden">
            <video ref={videoRef} className="absolute inset-0 w-full h-full object-cover" autoPlay playsInline muted />

            {/* Hidden canvas for quality checking */}
            <canvas ref={qualityCanvasRef} className="hidden" />

            {/* Loading State */}
            {!isStreaming && !error && (
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-background z-20">
                    <Loader2 className="w-10 h-10 text-primary animate-spin mb-4" />
                    <p className="text-muted text-sm">{statusMessage}</p>
                </div>
            )}

            {/* Dark Overlay */}
            <div className="absolute inset-0 bg-black/40 pointer-events-none" />
            <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" />

            {/* Top Guide */}
            <div className="absolute top-0 w-full p-8 pt-12 text-center pointer-events-none">
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="inline-block bg-black/60 backdrop-blur-md px-5 py-2 rounded-full text-white text-sm font-medium"
                >
                    손바닥을 가이드 안에 맞춰주세요
                </motion.div>
            </div>

            {/* Quality Feedback */}
            <AnimatePresence>
                {isStreaming && qualityStatus === "low_brightness" && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 20 }}
                        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 px-6 py-4 bg-yellow-500/90 backdrop-blur-md rounded-2xl text-white flex items-center gap-3 shadow-xl z-30"
                    >
                        <Sun className="w-6 h-6" />
                        <div>
                            <p className="font-bold">조명이 부족해요 💡</p>
                            <p className="text-sm opacity-90">더 밝은 곳으로 이동해주세요</p>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Quality Indicator */}
            {isStreaming && (
                <div className="absolute top-24 right-4 z-20">
                    <div className={cn(
                        "px-3 py-1.5 rounded-full text-xs font-medium flex items-center gap-1.5",
                        qualityStatus === "good"
                            ? "bg-green-500/80 text-white"
                            : "bg-yellow-500/80 text-white"
                    )}>
                        {qualityStatus === "good" ? "✓ 촬영 가능" : `밝기: ${brightness}`}
                    </div>
                </div>
            )}

            {/* Bottom Controls */}
            <div className="absolute bottom-0 w-full p-10 pb-16 flex flex-col items-center justify-end bg-gradient-to-t from-black/80 to-transparent">
                <div className="flex items-center gap-2 text-white/80 text-xs mb-8 bg-black/30 px-4 py-2 rounded-full backdrop-blur-sm">
                    <Info className="w-3 h-3" />
                    <span>밝은 곳에서 촬영하면 더 정확해요</span>
                </div>

                <button
                    onClick={handleCapture}
                    disabled={qualityStatus !== "good"}
                    className={cn(
                        "w-20 h-20 rounded-full border-4 flex items-center justify-center shadow-lg transition-all",
                        qualityStatus === "good"
                            ? "bg-white border-primary/50 active:scale-95"
                            : "bg-gray-400 border-gray-500 opacity-50 cursor-not-allowed"
                    )}
                >
                    <div className={cn(
                        "w-16 h-16 rounded-full border-2",
                        qualityStatus === "good" ? "bg-white border-gray-200" : "bg-gray-300 border-gray-400"
                    )} />
                </button>

                {qualityStatus !== "good" && isStreaming && (
                    <p className="mt-4 text-yellow-400 text-xs font-medium">조명을 확인해주세요</p>
                )}
            </div>
        </div>
    )
}
