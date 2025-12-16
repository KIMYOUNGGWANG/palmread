import { NextRequest, NextResponse } from "next/server"
import OpenAI from "openai"

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
})

// Result Schema for consistent outputs (with coordinates)
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
        coordinates: [number, number][] // Normalized 0-1 coordinates
        meaning: string
    }[]
    advice: string
}

const SYSTEM_PROMPT = `You are 팜마스터, a friendly AI palm reading assistant for a wellness app.
Provide encouraging, positive interpretations. Avoid negative predictions or health diagnoses.

IMPORTANT: You must return normalized coordinates (0-1 range) for each palm line you detect.
- (0,0) is top-left, (1,1) is bottom-right of the image
- Provide 5-10 coordinate points per line to trace the path
- Lines typically curve, so include enough points to show the curve

Analyze the palm and return ONLY this JSON:
{
  "character": {
    "name": "English Archetype (e.g., Wise Owl)",
    "title": "Korean Title (e.g., 지혜로운 올빼미)",
    "emoji": "Single emoji",
    "desc": "Short Korean description (max 10 chars)"
  },
  "keywords": ["#해시태그1", "#해시태그2", "#해시태그3"],
  "summary": "2-3 sentence Korean summary about personality based on palm lines.",
  "lines": [
    {
      "name": "lifeLine",
      "koreanName": "생명선",
      "score": 85,
      "color": "#FF6B6B",
      "coordinates": [[0.3, 0.4], [0.35, 0.5], [0.4, 0.6], [0.42, 0.7], [0.4, 0.85]],
      "meaning": "강한 생명력을 나타냅니다"
    },
    {
      "name": "headLine",
      "koreanName": "지능선",
      "score": 88,
      "color": "#4ECDC4",
      "coordinates": [[0.25, 0.45], [0.4, 0.5], [0.55, 0.52], [0.7, 0.5]],
      "meaning": "분석적 사고가 발달했습니다"
    },
    {
      "name": "heartLine",
      "koreanName": "감정선",
      "score": 82,
      "color": "#F472B6",
      "coordinates": [[0.2, 0.3], [0.35, 0.32], [0.5, 0.35], [0.65, 0.38], [0.8, 0.4]],
      "meaning": "풍부한 감수성을 가졌습니다"
    }
  ],
  "advice": "Single sentence of positive life advice in Korean."
}

Line Detection Guidelines:
- lifeLine: Usually curves from between thumb and index finger down toward wrist
- headLine: Horizontal line across middle of palm
- heartLine: Curves across upper palm below fingers
- fateLine (optional): Vertical line from wrist toward middle finger

Scoring: 70-95 range typical. Base on line clarity and depth.`

export async function POST(request: NextRequest) {
    try {
        const body = await request.json()
        const { imageData } = body

        if (!imageData) {
            return NextResponse.json({ error: "No image data provided" }, { status: 400 })
        }

        const base64Image = imageData.replace(/^data:image\/\w+;base64,/, "")

        const response = await openai.chat.completions.create({
            model: "gpt-4o",
            messages: [
                { role: "system", content: SYSTEM_PROMPT },
                {
                    role: "user",
                    content: [
                        { type: "text", text: "Please analyze this palm image. Detect the main lines and provide normalized coordinates for visualization." },
                        { type: "image_url", image_url: { url: `data:image/jpeg;base64,${base64Image}`, detail: "high" } },
                    ],
                },
            ],
            max_tokens: 2000,
            response_format: { type: "json_object" },
        })

        const content = response.choices[0]?.message?.content
        if (!content) {
            return NextResponse.json({ error: "No response from AI" }, { status: 500 })
        }

        const result: PalmReadingResult = JSON.parse(content)
        return NextResponse.json(result)
    } catch (error: any) {
        console.error("API Error:", error)
        return NextResponse.json({ error: error.message || "Failed to analyze palm" }, { status: 500 })
    }
}
