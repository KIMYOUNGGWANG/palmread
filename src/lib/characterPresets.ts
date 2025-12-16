// ═══════════════════════════════════════
// 🦁 Character Presets Database
// ═══════════════════════════════════════

export interface CharacterPreset {
    type: string
    emoji: string
    korean: string
    english: string
    traits: {
        ko: string[]
        en: string[]
    }
    luckyColor: string
    luckyColorEn: string
    palmFeature: string
    palmFeatureEn: string
    compatibility: string[]
}

export const CHARACTER_PRESETS: Record<string, CharacterPreset> = {
    "Wise Owl": {
        type: "Wise Owl",
        emoji: "🦉",
        korean: "지혜로운 올빼미",
        english: "Wise Owl",
        traits: {
            ko: ["논리적", "분석적", "지적호기심"],
            en: ["Logical", "Analytical", "Curious"]
        },
        luckyColor: "남색",
        luckyColorEn: "Navy Blue",
        palmFeature: "지능선 발달, 두뇌선 깊음",
        palmFeatureEn: "Strong Head Line, Deep Mind Line",
        compatibility: ["Sharp Eagle", "Wise Elephant"]
    },
    "Brave Lion": {
        type: "Brave Lion",
        emoji: "🦁",
        korean: "용감한 사자",
        english: "Brave Lion",
        traits: {
            ko: ["리더십", "자신감", "추진력"],
            en: ["Leadership", "Confidence", "Drive"]
        },
        luckyColor: "금색",
        luckyColorEn: "Gold",
        palmFeature: "생명선 굵고 진함",
        palmFeatureEn: "Thick and Deep Life Line",
        compatibility: ["Passionate Tiger", "Wise Elephant"]
    },
    "Social Dolphin": {
        type: "Social Dolphin",
        emoji: "🐬",
        korean: "사교적인 돌고래",
        english: "Social Dolphin",
        traits: {
            ko: ["친화력", "유쾌함", "소통능력"],
            en: ["Charismatic", "Cheerful", "Communicative"]
        },
        luckyColor: "하늘색",
        luckyColorEn: "Sky Blue",
        palmFeature: "감정선 길고 곡선",
        palmFeatureEn: "Long Curved Heart Line",
        compatibility: ["Talkative Parrot", "Free Butterfly"]
    },
    "Cunning Fox": {
        type: "Cunning Fox",
        emoji: "🦊",
        korean: "영리한 여우",
        english: "Cunning Fox",
        traits: {
            ko: ["영리함", "실속파", "전략적"],
            en: ["Clever", "Practical", "Strategic"]
        },
        luckyColor: "주황색",
        luckyColorEn: "Orange",
        palmFeature: "재물선/지능선 조화",
        palmFeatureEn: "Balanced Fate and Head Lines",
        compatibility: ["Wise Owl", "Busy Bee"]
    },
    "Gentle Bear": {
        type: "Gentle Bear",
        emoji: "🐻",
        korean: "온화한 곰",
        english: "Gentle Bear",
        traits: {
            ko: ["포용력", "인내심", "믿음직함"],
            en: ["Caring", "Patient", "Reliable"]
        },
        luckyColor: "갈색",
        luckyColorEn: "Brown",
        palmFeature: "손 두툼, 전체적으로 부드러운 선",
        palmFeatureEn: "Soft Palm, Gentle Lines",
        compatibility: ["Patient Turtle", "Gentle Bear"]
    },
    "Sharp Eagle": {
        type: "Sharp Eagle",
        emoji: "🦅",
        korean: "날카로운 독수리",
        english: "Sharp Eagle",
        traits: {
            ko: ["직관력", "예리함", "통찰력"],
            en: ["Intuitive", "Sharp", "Insightful"]
        },
        luckyColor: "검정",
        luckyColorEn: "Black",
        palmFeature: "선이 예리하고 깔끔",
        palmFeatureEn: "Sharp and Clean Lines",
        compatibility: ["Wise Owl", "Lone Wolf"]
    },
    "Curious Cat": {
        type: "Curious Cat",
        emoji: "🐱",
        korean: "호기심 많은 고양이",
        english: "Curious Cat",
        traits: {
            ko: ["호기심", "다재다능", "독립적"],
            en: ["Curious", "Versatile", "Independent"]
        },
        luckyColor: "보라색",
        luckyColorEn: "Purple",
        palmFeature: "잔선 많음, 다양한 패턴",
        palmFeatureEn: "Many Fine Lines, Varied Patterns",
        compatibility: ["Free Butterfly", "Cunning Fox"]
    },
    "Lone Wolf": {
        type: "Lone Wolf",
        emoji: "🐺",
        korean: "독립적인 늑대",
        english: "Lone Wolf",
        traits: {
            ko: ["독립심", "자유로움", "신비로움"],
            en: ["Independent", "Free-spirited", "Mysterious"]
        },
        luckyColor: "회색",
        luckyColorEn: "Gray",
        palmFeature: "생명선/지능선 분리",
        palmFeatureEn: "Separated Life and Head Lines",
        compatibility: ["Sharp Eagle", "Mysterious Dragon"]
    },
    "Free Butterfly": {
        type: "Free Butterfly",
        emoji: "🦋",
        korean: "자유로운 나비",
        english: "Free Butterfly",
        traits: {
            ko: ["예술적", "자유로움", "감수성"],
            en: ["Artistic", "Free", "Sensitive"]
        },
        luckyColor: "핑크",
        luckyColorEn: "Pink",
        palmFeature: "두뇌선 하향, 부드러운 곡선",
        palmFeatureEn: "Downward Head Line, Soft Curves",
        compatibility: ["Curious Cat", "Social Dolphin"]
    },
    "Wise Elephant": {
        type: "Wise Elephant",
        emoji: "🐘",
        korean: "현명한 코끼리",
        english: "Wise Elephant",
        traits: {
            ko: ["리더십", "기억력", "충성심"],
            en: ["Leadership", "Memory", "Loyalty"]
        },
        luckyColor: "청록색",
        luckyColorEn: "Teal",
        palmFeature: "운명선 강함, 안정적",
        palmFeatureEn: "Strong Fate Line, Stable",
        compatibility: ["Brave Lion", "Patient Turtle"]
    },
    "Graceful Giraffe": {
        type: "Graceful Giraffe",
        emoji: "🦒",
        korean: "우아한 기린",
        english: "Graceful Giraffe",
        traits: {
            ko: ["우아함", "섬세함", "고상함"],
            en: ["Graceful", "Delicate", "Elegant"]
        },
        luckyColor: "베이지",
        luckyColorEn: "Beige",
        palmFeature: "섬세한 감수성, 부드러운 선",
        palmFeatureEn: "Delicate Sensitivity, Soft Lines",
        compatibility: ["Free Butterfly", "Gentle Bear"]
    },
    "Busy Bee": {
        type: "Busy Bee",
        emoji: "🐝",
        korean: "부지런한 벌",
        english: "Busy Bee",
        traits: {
            ko: ["성실함", "근면", "협동심"],
            en: ["Diligent", "Hardworking", "Cooperative"]
        },
        luckyColor: "노랑",
        luckyColorEn: "Yellow",
        palmFeature: "붉은 손바닥, 활력 넘침",
        palmFeatureEn: "Reddish Palm, Full of Energy",
        compatibility: ["Cunning Fox", "Patient Turtle"]
    },
    "Talkative Parrot": {
        type: "Talkative Parrot",
        emoji: "🦜",
        korean: "말 많은 앵무새",
        english: "Talkative Parrot",
        traits: {
            ko: ["언변", "사교성", "표현력"],
            en: ["Eloquent", "Social", "Expressive"]
        },
        luckyColor: "빨강",
        luckyColorEn: "Red",
        palmFeature: "수성구 발달, 언변 좋음",
        palmFeatureEn: "Developed Mercury Mount, Good Speech",
        compatibility: ["Social Dolphin", "Curious Cat"]
    },
    "Patient Turtle": {
        type: "Patient Turtle",
        emoji: "🐢",
        korean: "인내심 많은 거북이",
        english: "Patient Turtle",
        traits: {
            ko: ["인내심", "지혜", "장수"],
            en: ["Patient", "Wise", "Longevity"]
        },
        luckyColor: "초록",
        luckyColorEn: "Green",
        palmFeature: "건강 장수형, 생명선 안정",
        palmFeatureEn: "Long-lived Type, Stable Life Line",
        compatibility: ["Gentle Bear", "Wise Elephant"]
    },
    "Passionate Tiger": {
        type: "Passionate Tiger",
        emoji: "🐯",
        korean: "열정적인 호랑이",
        english: "Passionate Tiger",
        traits: {
            ko: ["열정", "추진력", "카리스마"],
            en: ["Passionate", "Driven", "Charismatic"]
        },
        luckyColor: "오렌지",
        luckyColorEn: "Orange",
        palmFeature: "강한 추진력, 화성구 발달",
        palmFeatureEn: "Strong Drive, Developed Mars Mount",
        compatibility: ["Brave Lion", "Sharp Eagle"]
    },
    "Mysterious Dragon": {
        type: "Mysterious Dragon",
        emoji: "🐲",
        korean: "신비로운 용",
        english: "Mysterious Dragon",
        traits: {
            ko: ["신비로움", "대박운", "특별함"],
            en: ["Mysterious", "Lucky", "Special"]
        },
        luckyColor: "보라",
        luckyColorEn: "Purple",
        palmFeature: "신비십자 문양, 특수 표식",
        palmFeatureEn: "Mystic Cross, Special Markings",
        compatibility: ["Lone Wolf", "Wise Owl"]
    }
}

export function getCharacterPreset(type: string): CharacterPreset | null {
    return CHARACTER_PRESETS[type] || null
}

export function getAllCharacterTypes(): string[] {
    return Object.keys(CHARACTER_PRESETS)
}
