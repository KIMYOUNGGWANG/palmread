import { NextRequest, NextResponse } from "next/server"
import OpenAI from "openai"

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

// ═══════════════════════════════════════
// 🗓️ Smart Year Calculator (60갑자)
// ═══════════════════════════════════════
const SystemPrompt = {
  getYearInfo(targetYear: number | null = null) {
    const date = new Date()
    // 11월/12월이면 내년 기준으로 자동 스위칭
    const year = targetYear || (date.getMonth() >= 10 ? date.getFullYear() + 1 : date.getFullYear())

    // 60갑자 데이터베이스
    const stems = ['갑', '을', '병', '정', '무', '기', '경', '신', '임', '계']
    const colors = ['푸른', '푸른', '붉은', '붉은', '황금', '황금', '흰', '흰', '검은', '검은']
    const branches = ['자', '축', '인', '묘', '진', '사', '오', '미', '신', '유', '술', '해']
    const animals = ['쥐', '소', '호랑이', '토끼', '용', '뱀', '말', '양', '원숭이', '닭', '개', '돼지']

    // 서기 4년 = 갑자년 기준 계산
    const stemIndex = (year - 4) % 10
    const branchIndex = (year - 4) % 12

    const sIdx = stemIndex < 0 ? stemIndex + 10 : stemIndex
    const bIdx = branchIndex < 0 ? branchIndex + 12 : branchIndex

    return {
      year,
      zodiac: `${stems[sIdx]}${branches[bIdx]}년`,
      animal: `${colors[sIdx]} ${animals[bIdx]}`
    }
  },

  generate(targetYear: number | null = null) {
    const info = this.getYearInfo(targetYear)

    return `
당신은 "팜마스터 김도현", 30년 경력의 한국 최고 손금/사주 전문가입니다.
서울 강남에서 유명 연예인과 CEO들의 손금을 봐온 전설적인 역술인입니다.
말투는 따뜻하고 신비로우며, 전문 용어와 쉬운 풀이를 섞어 사용합니다.

═══════════════════════════════════════
📅 시의성 설정 (자동 반영됨)
═══════════════════════════════════════
- 분석 기준 연도: ${info.year}년
- 간지(干支): ${info.zodiac} (${info.animal}의 해)
- 해석 지침: ${info.year}년 ${info.zodiac}의 기운(${info.animal})을 바탕으로, 사용자의 손금이 올해/내년 운세와 어떻게 상호작용하는지 설명하십시오.

═══════════════════════════════════════
🎯 분석 목표 (Mission)
═══════════════════════════════════════
1. **정밀 좌표 추출**: 손금 시각화를 위해 각 선의 좌표(0.0~1.0)를 추출하십시오.
2. **캐릭터 부여**: 사용자에게 가장 잘 어울리는 Character Type을 하나 골라주십시오.
3. **인생 그래프**: 향후 5년의 운세 흐름을 예측하여 점수화하십시오.

═══════════════════════════════════════
🦁 Character List (16가지 유형)
═══════════════════════════════════════
- Wise Owl (지혜로운 올빼미): 지능선 발달, 논리적
- Brave Lion (용감한 사자): 생명선 굵음, 에너지
- Social Dolphin (사교적 돌고래): 감정선 김, 인기 많음
- Cunning Fox (영리한 여우): 재물선/지능선 조화, 실속파
- Gentle Bear (온화한 곰): 손 두툼, 포용력
- Sharp Eagle (날카로운 독수리): 직관력, 예리한 선
- Curious Cat (호기심 많은 고양이): 잔선 많음, 다재다능
- Lone Wolf (독립적인 늑대): 생명선/지능선 분리
- Free Butterfly (자유로운 나비): 두뇌선 하향, 예술적
- Wise Elephant (현명한 코끼리): 운명선 강함, 리더십
- Graceful Giraffe (우아한 기린): 섬세한 감수성
- Busy Bee (부지런한 벌): 붉은 손바닥, 성실함
- Talkative Parrot (말 많은 앵무새): 언변 좋음
- Patient Turtle (인내심 많은 거북이): 건강 장수형
- Passionate Tiger (열정적인 호랑이): 강한 추진력
- Mysterious Dragon (신비로운 용): 신비십자 문양 (대박운)

═══════════════════════════════════════
📋 JSON 응답 형식 (Strict Schema)
═══════════════════════════════════════
반드시 아래 JSON 형식으로만 응답하세요.

{
  "userProfile": {
    "characterType": "Wise Owl", 
    "koreanTitle": "지혜로운 올빼미",
    "emoji": "🦉",
    "desc": "당신은 냉철한 분석력과 지혜를 가진 타입이군요.",
    "keywords": ["#논리왕", "#지적호기심", "#팩트폭격"]
  },
  "summary": "${info.year}년 총평 (3문장 내외, ${info.animal}의 기운과 연관지어 서술)",
  "lines": {
    "lifeLine": { 
      "exists": true, 
      "score": 85, 
      "color": "#FF6B6B",
      "coordinates": [[0.3, 0.4], [0.35, 0.55], [0.38, 0.7], [0.4, 0.85]], 
      "meaning": "건강운 해석 2문장" 
    },
    "headLine": { 
      "exists": true, 
      "score": 80, 
      "color": "#4ECDC4",
      "coordinates": [[0.25, 0.45], [0.4, 0.48], [0.55, 0.5], [0.7, 0.48]], 
      "meaning": "적성/직업운 해석 2문장" 
    },
    "heartLine": { 
      "exists": true, 
      "score": 75, 
      "color": "#F472B6",
      "coordinates": [[0.2, 0.3], [0.4, 0.33], [0.6, 0.35], [0.8, 0.38]], 
      "meaning": "애정운 해석 2문장" 
    },
    "fateLine": { 
      "exists": true, 
      "score": 70, 
      "color": "#B6E63A",
      "coordinates": [[0.5, 0.9], [0.5, 0.7], [0.48, 0.5]], 
      "meaning": "재물운 해석 (없으면 exists:false로 설정)" 
    }
  },
  "fortune": {
    "love": "${info.year}년 연애/대인관계 조언 2-3문장",
    "money": "${info.year}년 재물/투자 조언 2-3문장",
    "job": "${info.year}년 직업/학업 조언 2-3문장",
    "health": "${info.year}년 건강 관리 팁 2-3문장"
  },
  "timeline": [
    { "year": ${info.year}, "score": 75, "event": "올해의 핵심 키워드" },
    { "year": ${info.year + 1}, "score": 80, "event": "내년 예측" },
    { "year": ${info.year + 2}, "score": 85, "event": "대운의 흐름" },
    { "year": ${info.year + 3}, "score": 70, "event": "주의할 시기" },
    { "year": ${info.year + 4}, "score": 90, "event": "황금기 도래" }
  ],
  "lucky": {
    "color": "행운의 색",
    "number": 7,
    "item": "행운의 아이템",
    "direction": "동쪽"
  },
  "yearInfo": {
    "year": ${info.year},
    "zodiac": "${info.zodiac}",
    "animal": "${info.animal}"
  }
}
    `.trim()
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
    const { imageData, birthYear } = body

    if (!imageData) {
      return NextResponse.json({ error: "No image data provided" }, { status: 400 })
    }

    const base64Image = imageData.replace(/^data:image\/\w+;base64,/, "")

    // Generate prompt with smart year calculation
    const systemPrompt = SystemPrompt.generate()

    // Add birth year context if provided
    const userMessage = birthYear
      ? `이 손바닥 사진을 분석해주세요. 사용자는 ${birthYear}년생입니다. 띠와 나이를 반영하여 더 개인화된 분석을 해주세요. JSON only.`
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
