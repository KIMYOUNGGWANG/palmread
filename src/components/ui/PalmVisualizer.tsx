"use client"

import { useEffect, useRef, useState } from "react"
import { motion } from "framer-motion"

interface PalmLine {
    name: string
    koreanName: string
    color: string
    coordinates: [number, number][]
    meaning: string
}

interface PalmVisualizerProps {
    imageData: string
    lines: PalmLine[]
}

export default function PalmVisualizer({ imageData, lines }: PalmVisualizerProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const containerRef = useRef<HTMLDivElement>(null)
    const [isAnimating, setIsAnimating] = useState(true)
    const [activeLine, setActiveLine] = useState<string | null>(null)

    useEffect(() => {
        const canvas = canvasRef.current
        const container = containerRef.current
        if (!canvas || !container) return

        const ctx = canvas.getContext("2d")
        if (!ctx) return

        const img = new Image()
        img.src = imageData

        img.onload = () => {
            // Set canvas size to match container
            const containerWidth = container.offsetWidth
            const containerHeight = container.offsetHeight
            canvas.width = containerWidth
            canvas.height = containerHeight

            // Draw image
            ctx.drawImage(img, 0, 0, containerWidth, containerHeight)

            // Semi-transparent overlay for better line visibility
            ctx.fillStyle = "rgba(0, 0, 0, 0.2)"
            ctx.fillRect(0, 0, containerWidth, containerHeight)

            // Animate lines drawing
            let lineIndex = 0
            let pointIndex = 0

            const drawNextSegment = () => {
                if (lineIndex >= lines.length) {
                    setIsAnimating(false)
                    return
                }

                const line = lines[lineIndex]
                const coords = line.coordinates

                if (pointIndex === 0) {
                    setActiveLine(line.koreanName)
                }

                if (pointIndex < coords.length - 1) {
                    const [x1, y1] = coords[pointIndex]
                    const [x2, y2] = coords[pointIndex + 1]

                    // Convert normalized coords to canvas coords
                    const canvasX1 = x1 * containerWidth
                    const canvasY1 = y1 * containerHeight
                    const canvasX2 = x2 * containerWidth
                    const canvasY2 = y2 * containerHeight

                    // Draw line segment with glow
                    ctx.save()
                    ctx.strokeStyle = line.color
                    ctx.lineWidth = 4
                    ctx.lineCap = "round"
                    ctx.lineJoin = "round"
                    ctx.shadowColor = line.color
                    ctx.shadowBlur = 15

                    ctx.beginPath()
                    ctx.moveTo(canvasX1, canvasY1)
                    ctx.lineTo(canvasX2, canvasY2)
                    ctx.stroke()
                    ctx.restore()

                    pointIndex++
                    setTimeout(drawNextSegment, 80)
                } else {
                    // Draw label at first point
                    const [x, y] = coords[0]
                    const labelX = x * containerWidth
                    const labelY = y * containerHeight

                    ctx.save()
                    ctx.fillStyle = line.color
                    ctx.font = "bold 12px Pretendard, sans-serif"
                    ctx.textAlign = "left"
                    ctx.shadowColor = "rgba(0,0,0,0.5)"
                    ctx.shadowBlur = 4
                    ctx.fillText(line.koreanName, labelX + 8, labelY - 8)
                    ctx.restore()

                    lineIndex++
                    pointIndex = 0
                    setTimeout(drawNextSegment, 300)
                }
            }

            // Start animation after a short delay
            setTimeout(drawNextSegment, 500)
        }
    }, [imageData, lines])

    return (
        <div ref={containerRef} className="relative w-full h-full">
            <canvas
                ref={canvasRef}
                className="absolute inset-0 w-full h-full object-cover rounded-b-[40px]"
            />

            {/* Active Line Indicator */}
            {isAnimating && activeLine && (
                <motion.div
                    key={activeLine}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="absolute bottom-4 left-1/2 -translate-x-1/2 px-4 py-2 bg-black/70 backdrop-blur-md rounded-full text-white text-sm font-medium"
                >
                    {activeLine} 분석 중...
                </motion.div>
            )}
        </div>
    )
}
