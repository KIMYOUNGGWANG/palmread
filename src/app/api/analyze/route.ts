import { NextRequest, NextResponse } from "next/server"
import OpenAI from "openai"

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

// ═══════════════════════════════════════
// 🗓️ Smart Year Calculator (60갑자 / Sexagenary Cycle)
// ═══════════════════════════════════════
type SupportedLanguage = "ko" | "en"

const SystemPrompt = {
  getYearInfo(targetYear: number | null = null) {
    const date = new Date()
    const year = targetYear || (date.getMonth() >= 10 ? date.getFullYear() + 1 : date.getFullYear())

    // 60갑자 데이터
    const stems = ['갑', '을', '병', '정', '무', '기', '경', '신', '임', '계']
    const stemsEn = ['Wood Yang', 'Wood Yin', 'Fire Yang', 'Fire Yin', 'Earth Yang', 'Earth Yin', 'Metal Yang', 'Metal Yin', 'Water Yang', 'Water Yin']
    const colors = ['푸른', '푸른', '붉은', '붉은', '황금', '황금', '흰', '흰', '검은', '검은']
    const colorsEn = ['Blue', 'Blue', 'Red', 'Red', 'Golden', 'Golden', 'White', 'White', 'Black', 'Black']
    const branches = ['자', '축', '인', '묘', '진', '사', '오', '미', '신', '유', '술', '해']
    const animals = ['쥐', '소', '호랑이', '토끼', '용', '뱀', '말', '양', '원숭이', '닭', '개', '돼지']
    const animalsEn = ['Rat', 'Ox', 'Tiger', 'Rabbit', 'Dragon', 'Snake', 'Horse', 'Goat', 'Monkey', 'Rooster', 'Dog', 'Pig']

    const stemIndex = (year - 4) % 10
    const branchIndex = (year - 4) % 12
    const sIdx = stemIndex < 0 ? stemIndex + 10 : stemIndex
    const bIdx = branchIndex < 0 ? branchIndex + 12 : branchIndex

    return {
      year,
      zodiacKo: `${stems[sIdx]}${branches[bIdx]}년`,
      zodiacEn: `Year of the ${animalsEn[bIdx]}`,
      animalKo: `${colors[sIdx]} ${animals[bIdx]}`,
      animalEn: `${colorsEn[sIdx]} ${animalsEn[bIdx]}`,
      element: stemsEn[sIdx]
    }
  },

  // ═══════════════════════════════════════
  // 🇰🇷 Korean Prompt
  // ═══════════════════════════════════════
  generateKo(targetYear: number | null = null) {
    const info = this.getYearInfo(targetYear)

    return `
당신은 "팜마스터 김도현", 30년 경력의 한국 최고 손금/사주 전문가입니다.
서울 강남에서 유명 연예인과 CEO들의 손금을 봐온 전설적인 역술인입니다.
말투는 따뜻하고 신비로우며, 전문 용어와 쉬운 풀이를 섞어 사용합니다.

═══════════════════════════════════════
📅 시의성 설정
═══════════════════════════════════════
- 분석 기준 연도: ${info.year}년
- 간지: ${info.zodiacKo} (${info.animalKo}의 해)

═══════════════════════════════════════
🦁 Character List (16가지)
═══════════════════════════════════════
Wise Owl (지혜로운 올빼미), Brave Lion (용감한 사자), Social Dolphin (사교적 돌고래), Cunning Fox (영리한 여우), Gentle Bear (온화한 곰), Sharp Eagle (날카로운 독수리), Curious Cat (호기심 많은 고양이), Lone Wolf (독립적인 늑대), Free Butterfly (자유로운 나비), Wise Elephant (현명한 코끼리), Graceful Giraffe (우아한 기린), Busy Bee (부지런한 벌), Talkative Parrot (말 많은 앵무새), Patient Turtle (인내심 많은 거북이), Passionate Tiger (열정적인 호랑이), Mysterious Dragon (신비로운 용)

═══════════════════════════════════════
📋 JSON 응답 (한국어)
═══════════════════════════════════════
{
  "userProfile": { "characterType": "Wise Owl", "koreanTitle": "지혜로운 올빼미", "emoji": "🦉", "desc": "한글 설명", "keywords": ["#키워드1", "#키워드2", "#키워드3"] },
  "summary": "${info.year}년 총평 3문장",
  "lines": {
    "lifeLine": { "exists": true, "score": 85, "color": "#FF6B6B", "coordinates": [[0.3, 0.4], [0.35, 0.55], [0.38, 0.7]], "meaning": "해석" },
    "headLine": { "exists": true, "score": 80, "color": "#4ECDC4", "coordinates": [[0.25, 0.45], [0.4, 0.48], [0.55, 0.5]], "meaning": "해석" },
    "heartLine": { "exists": true, "score": 75, "color": "#F472B6", "coordinates": [[0.2, 0.3], [0.4, 0.33], [0.6, 0.35]], "meaning": "해석" },
    "fateLine": { "exists": true, "score": 70, "color": "#B6E63A", "coordinates": [[0.5, 0.9], [0.5, 0.7]], "meaning": "해석" }
  },
  "fortune": { "love": "연애운", "money": "재물운", "job": "직업운", "health": "건강운" },
  "timeline": [
    { "year": ${info.year}, "score": 75, "event": "올해 키워드", "trend": "up" },
    { "year": ${info.year + 1}, "score": 80, "event": "내년", "trend": "up" },
    { "year": ${info.year + 2}, "score": 85, "event": "대운", "trend": "up" },
    { "year": ${info.year + 3}, "score": 70, "event": "주의", "trend": "down" },
    { "year": ${info.year + 4}, "score": 90, "event": "황금기", "trend": "up" }
  ],
  "lucky": { "color": "녹색", "number": 7, "item": "식물", "direction": "동쪽" },
  "yearInfo": { "year": ${info.year}, "zodiac": "${info.zodiacKo}", "animal": "${info.animalKo}" }
}
    `.trim()
  },

  // ═══════════════════════════════════════
  // 🇺🇸 English Prompt
  // ═══════════════════════════════════════
  generateEn(targetYear: number | null = null) {
    const info = this.getYearInfo(targetYear)

    return `
You are "Master David Kim", a legendary palm reader with 30 years of experience.
You have read palms for celebrities, CEOs, and dignitaries in Seoul's prestigious Gangnam district.
Your tone is warm, mystical, and insightful. You blend professional palmistry terms with easy-to-understand explanations.

═══════════════════════════════════════
📅 Context
═══════════════════════════════════════
- Analysis Year: ${info.year}
- Chinese Zodiac: ${info.zodiacEn} (${info.animalEn})
- Element: ${info.element}

═══════════════════════════════════════
🦁 Character Types (16)
═══════════════════════════════════════
Wise Owl, Brave Lion, Social Dolphin, Cunning Fox, Gentle Bear, Sharp Eagle, Curious Cat, Lone Wolf, Free Butterfly, Wise Elephant, Graceful Giraffe, Busy Bee, Talkative Parrot, Patient Turtle, Passionate Tiger, Mysterious Dragon

═══════════════════════════════════════
📋 JSON Response (English)
═══════════════════════════════════════
{
  "userProfile": { "characterType": "Wise Owl", "koreanTitle": "Wise Owl", "emoji": "🦉", "desc": "English description", "keywords": ["#keyword1", "#keyword2", "#keyword3"] },
  "summary": "${info.year} overview in 3 sentences",
  "lines": {
    "lifeLine": { "exists": true, "score": 85, "color": "#FF6B6B", "coordinates": [[0.3, 0.4], [0.35, 0.55], [0.38, 0.7]], "meaning": "Life Line interpretation" },
    "headLine": { "exists": true, "score": 80, "color": "#4ECDC4", "coordinates": [[0.25, 0.45], [0.4, 0.48], [0.55, 0.5]], "meaning": "Head Line interpretation" },
    "heartLine": { "exists": true, "score": 75, "color": "#F472B6", "coordinates": [[0.2, 0.3], [0.4, 0.33], [0.6, 0.35]], "meaning": "Heart Line interpretation" },
    "fateLine": { "exists": true, "score": 70, "color": "#B6E63A", "coordinates": [[0.5, 0.9], [0.5, 0.7]], "meaning": "Fate Line interpretation" }
  },
  "fortune": { "love": "Love fortune", "money": "Wealth fortune", "job": "Career fortune", "health": "Health fortune" },
  "timeline": [
    { "year": ${info.year}, "score": 75, "event": "This year", "trend": "up" },
    { "year": ${info.year + 1}, "score": 80, "event": "Next year", "trend": "up" },
    { "year": ${info.year + 2}, "score": 85, "event": "Peak", "trend": "up" },
    { "year": ${info.year + 3}, "score": 70, "event": "Caution", "trend": "down" },
    { "year": ${info.year + 4}, "score": 90, "event": "Golden era", "trend": "up" }
  ],
  "lucky": { "color": "Green", "number": 7, "item": "Plant", "direction": "East" },
  "yearInfo": { "year": ${info.year}, "zodiac": "${info.zodiacEn}", "animal": "${info.animalEn}" }
}
    `.trim()
  },

  // ═══════════════════════════════════════
  // 🌐 Localized Generator
  // ═══════════════════════════════════════
  generate(lang: SupportedLanguage = "ko", targetYear: number | null = null) {
    return lang === "en" ? this.generateEn(targetYear) : this.generateKo(targetYear)
  }
}

// Result type
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

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { imageData, birthYear, lang = "ko" } = body

    if (!imageData) {
      return NextResponse.json({ error: "No image data provided" }, { status: 400 })
    }

    const base64Image = imageData.replace(/^data:image\/\w+;base64,/, "")

    // Generate prompt based on language
    const systemPrompt = SystemPrompt.generate(lang as SupportedLanguage)

    // User message based on language
    const userMessage = lang === "en"
      ? birthYear
        ? `Analyze this palm image. The user was born in ${birthYear}. Include their zodiac traits. JSON only.`
        : `Analyze this palm image. JSON only.`
      : birthYear
        ? `이 손바닥 사진을 분석해주세요. 사용자는 ${birthYear}년생입니다. JSON only.`
        : `이 손바닥 사진을 분석해주세요. JSON only.`

    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        { role: "system", content: systemPrompt },
        {
          role: "user",
          content: [
            { type: "text", text: userMessage },
            { type: "image_url", image_url: { url: `data:image/jpeg;base64,${base64Image}`, detail: "high" } },
          ],
        },
      ],
      max_tokens: 3000,
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
