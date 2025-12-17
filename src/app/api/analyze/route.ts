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
- 해당 연도의 기운과 손금을 연결하여 해석하세요.

═══════════════════════════════════════
🦁 Character List (16가지) 
═══════════════════════════════════════
손금 특징에 따라 아래 중 하나를 선택하세요:
- Wise Owl (지혜로운 올빼미): 지능선 발달
- Brave Lion (용감한 사자): 생명선 굵고 진함
- Social Dolphin (사교적인 돌고래): 감정선 길고 곡선
- Cunning Fox (영리한 여우): 재물선/지능선 조화
- Gentle Bear (온화한 곰): 손 두툼, 부드러운 선
- Sharp Eagle (날카로운 독수리): 선이 예리하고 깔끔
- Curious Cat (호기심 많은 고양이): 잔선 많음
- Lone Wolf (독립적인 늑대): 생명선/지능선 분리
- Free Butterfly (자유로운 나비): 두뇌선 하향, 예술적
- Wise Elephant (현명한 코끼리): 운명선 강함
- Graceful Giraffe (우아한 기린): 섬세한 감수성
- Busy Bee (부지런한 벌): 붉은 손바닥
- Talkative Parrot (말 많은 앵무새): 수성구 발달
- Patient Turtle (인내심 많은 거북이): 건강 장수형
- Passionate Tiger (열정적인 호랑이): 화성구 발달
- Mysterious Dragon (신비로운 용): 신비십자 문양

═══════════════════════════════════════
📋 JSON 응답 형식 (⚠️ 내용을 충실하게 작성하세요!)
═══════════════════════════════════════

{
  "userProfile": { 
    "characterType": "Wise Owl", 
    "koreanTitle": "지혜로운 올빼미", 
    "emoji": "🦉", 
    "desc": "손금에서 드러나는 성격 특성을 2-3문장으로 설명 (예: 당신은 논리적이고 분석적인 사고력을 가진 타입입니다. 남들이 놓치는 디테일까지 파악하는 예리함이 돋보이며, 중요한 결정도 차분하게 내리는 편이군요.)", 
    "keywords": ["#분석왕", "#논리적사고", "#신중함"] 
  },
  "summary": "${info.year}년 ${info.zodiacKo}의 기운을 담아 4-5문장으로 올해 총운을 상세히 설명. 긍정적인 면과 주의할 점을 균형있게 서술하세요.",
  "lines": {
    "lifeLine": { 
      "exists": true, 
      "score": 85, 
      "color": "#FF6B6B", 
      "coordinates": [[0.3, 0.4], [0.35, 0.55], [0.38, 0.7], [0.4, 0.85]], 
      "meaning": "생명선 해석을 3-4문장으로 작성. 건강, 활력, 삶의 에너지에 대해 구체적으로 설명." 
    },
    "headLine": { 
      "exists": true, 
      "score": 80, 
      "color": "#4ECDC4", 
      "coordinates": [[0.25, 0.45], [0.4, 0.48], [0.55, 0.5], [0.7, 0.48]], 
      "meaning": "지능선 해석을 3-4문장으로 작성. 사고방식, 적성, 직업적 능력에 대해 설명." 
    },
    "heartLine": { 
      "exists": true, 
      "score": 75, 
      "color": "#F472B6", 
      "coordinates": [[0.2, 0.3], [0.4, 0.33], [0.6, 0.35], [0.8, 0.38]], 
      "meaning": "감정선 해석을 3-4문장으로 작성. 연애 스타일, 감정 표현, 대인관계에 대해 설명." 
    },
    "fateLine": { 
      "exists": true, 
      "score": 70, 
      "color": "#B6E63A", 
      "coordinates": [[0.5, 0.9], [0.5, 0.7], [0.48, 0.5]], 
      "meaning": "재물선/운명선 해석을 3-4문장으로 작성. 재정 운, 성공 가능성에 대해 설명. 없으면 exists: false로." 
    }
  },
  "fortune": { 
    "love": "${info.year}년 연애운을 4-5문장으로 상세히 작성. 새로운 만남의 시기, 기존 연인과의 관계, 조심해야 할 점 등 구체적 조언 포함.",
    "money": "${info.year}년 재물운을 4-5문장으로 상세히 작성. 투자 시기, 지출 주의점, 수입 전망, 구체적인 재테크 조언 포함.",
    "job": "${info.year}년 직업/학업운을 4-5문장으로 상세히 작성. 승진/취업 시기, 주의할 동료 관계, 성장 기회 등 포함.",
    "health": "${info.year}년 건강운을 4-5문장으로 상세히 작성. 주의해야 할 신체 부위, 운동 조언, 스트레스 관리법 포함."
  },
  "timeline": [
    { "year": ${info.year}, "score": 75, "event": "올해의 핵심 테마 (2-3단어)", "trend": "up" },
    { "year": ${info.year + 1}, "score": 80, "event": "내년 키워드", "trend": "up" },
    { "year": ${info.year + 2}, "score": 85, "event": "성장 포인트", "trend": "up" },
    { "year": ${info.year + 3}, "score": 70, "event": "주의할 점", "trend": "down" },
    { "year": ${info.year + 4}, "score": 90, "event": "황금기", "trend": "up" }
  ],
  "lucky": { 
    "color": "녹색",
    "number": 7, 
    "item": "구체적인 행운 아이템 (예: 천연 가죽 지갑)", 
    "direction": "동쪽" 
  },
  "yearInfo": { 
    "year": ${info.year}, 
    "zodiac": "${info.zodiacKo}", 
    "animal": "${info.animalKo}" 
  }
}

⚠️ 중요: 모든 내용은 최소 3문장 이상으로 풍부하게 작성하세요. 한두 문장의 짧은 답변은 금지입니다.
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
      max_tokens: 4000,
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
