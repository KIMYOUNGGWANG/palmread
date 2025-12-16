# AI 손금 분석 서비스 최종 개발 기획서
**Project Name:** PalmRead (가칭)  
**개발 환경:** Antigravity IDE  
**AI Engine:** OpenAI GPT-4o Vision API  
**목표 시장:** 한국 + 글로벌  
**개발 기간:** 8-12주  
**Version:** 2.0 (CPO 피드백 통합)

---

## 📋 Executive Summary

### 서비스 컨셉
> "미신의 디지털 트랜스포메이션: 점집 경험을 3초 만에, 1/10 가격으로"

스마트폰으로 손바닥을 스캔하면 GPT-4o Vision AI가 손금을 분석하여 성격, 운세 등을 제공하는 **프라이버시 우선 엔터테인먼트 서비스**

### 핵심 차별화 전략 (CPO 피드백 반영)
1. **Privacy-First**: 손바닥 사진은 분석 후 즉시 삭제, JSON만 저장
2. **고해상도**: Full HD (1920×1080) 스캔으로 미세 손금까지 인식
3. **신뢰 시각화**: AI가 분석한 손금 선을 이미지 위에 오버레이
4. **바이럴 DNA**: MBTI 스타일 "16가지 손금 캐릭터" 분류
5. **비용 효율**: GPT-4o 사용으로 25% 비용 절감

### 목표 지표 (3개월)
- DAU: 1,000명
- 유료 전환율: 5%
- **바이럴 계수**: 1.3 이상
- **스캔 완료율**: 75%
- **프라이버시 신뢰도**: 90%+

---

## 🎯 타겟 사용자 & Pain Points

### Primary Persona
**민지 (27세, 여, 직장인)**
- 관심사: 타로, MBTI, 성격 테스트
- Pain Points:
  - 오프라인 점집은 비싸고 시간 소모
  - 손바닥 사진 서버 저장 거부감 (생체정보)
  - AI 결과를 신뢰하기 어려움
- 니즈: 친구들과 공유할 재미있는 콘텐츠

### Secondary Persona  
**Alex (32세, 남, 재외동포)**
- 관심사: Astrology, 한국 문화
- Pain Points: 영문 손금 서비스 부족
- 니즈: 글로벌 표준 분석

---

## 🏗️ 기능 명세 (개선판)

### Phase 1: MVP (Week 1-4)

#### 1. 고해상도 스캔 시스템
**변경사항**
- ❌ 기존: 640×480 → ✅ 개선: 1920×1080 Full HD
- ✅ 자동 초점 + 후면 카메라 우선
- ✅ **품질 검증 시스템**
  - 밝기: 평균 픽셀 50 이상
  - 흔들림 감지
  - 실패 시: "조명이 부족합니다 💡"

#### 2. GPT-4o Vision 분석 엔진
**변경사항**
- ❌ 기존: 텍스트만 → ✅ 개선: **좌표값 포함 JSON**

**프롬프트 구조**
```
{
  "lines": {
    "lifeLine": {
      "coordinates": [[x,y], ...], // 시각화용
      "quality": "clear",
      "meaning": "강한 생명력"
    }
  },
  "personality": ["창의적", "분석적"],
  "characterType": "Wise Owl", // 16가지 중 하나
  "summary": "..."
}
```

#### 3. 신뢰 시각화 시스템 ⭐ 신규
- 원본 이미지 위에 AI가 분석한 손금 선을 컬러 오버레이
- 각 선마다 라벨 표시 (생명선, 지능선 등)
- 색상 코드: 생명선(빨강), 지능선(청록), 감정선(노랑), 재물선(초록)

#### 4. 프라이버시 우선 저장소 ⭐ 핵심
**변경사항**
- ❌ 기존: 이미지 서버 저장 → ✅ 개선: **즉시 삭제**

```javascript
// 저장 데이터
{
  scanId: "scan_123",
  scanDate: "2025-12-14T10:30:00Z",
  // imageData: ❌ 저장 안 함!
  analysisResult: {...}, // JSON만
  privacyNote: "Image deleted after analysis"
}
```

**UI 명시**
- 분석 완료 시: "✅ 사진은 저장되지 않았습니다"
- 프라이버시 배지 상시 표시

#### 5. 무료 기본 리포트
- 3대 주요선 분석 + 시각화
- 손금 캐릭터: "당신은 [Wise Owl] 타입!"
- 성격 키워드 3개
- 요약 (200자)

#### 6. 유료 상세 리포트 (Decoy Pricing)

| 옵션 | 가격 | 포함 | 전략 |
|------|------|------|------|
| 단건 | ₩3,900 | 상세 리포트 | Decoy |
| 커플 🔥 | ~~₩7,900~~ ₩6,900 | 2인+궁합+1년 재스캔 | Target |
| 구독 | ₩9,900/월 | 무제한+챗봇 | Anchor |

**내용**
- 10가지 분석: 성격, 재물, 건강, 연애, 직업, 대인관계, 가족, 행운 시기, 주의 시기, 종합
- 시각화 포함 PDF

---

### Phase 2: 바이럴 & 성장 (Week 5-8)

#### 7. MBTI 스타일 바이럴 카드 ⭐ 핵심 성장

**16가지 손금 캐릭터**
- 🦉 Wise Owl: 지혜로운 올빼미 (지능선 발달)
- 🦁 Brave Lion: 용감한 사자 (생명선 강함)
- 🐬 Social Dolphin: 사교적 돌고래 (감정선 풍부)
- 🦊 Cunning Fox: 영리한 여우 (재물선 뚜렷)
- 🐻 Gentle Bear: 온화한 곰
- 🦅 Sharp Eagle: 날카로운 독수리
- 🐱 Curious Cat: 호기심 많은 고양이
- 🐺 Lone Wolf: 독립적인 늑대
- 🦋 Free Butterfly: 자유로운 나비
- 🐘 Wise Elephant: 현명한 코끼리
- 🦒 Graceful Giraffe: 우아한 기린
- 🐝 Busy Bee: 부지런한 벌
- 🦜 Talkative Parrot: 말 많은 앵무새
- 🐢 Patient Turtle: 인내심 많은 거북이
- 🦁 Passionate Tiger: 열정적인 호랑이
- 🐉 Mysterious Dragon: 신비로운 용

**공유 카드 디자인**
- 1080×1920 (Instagram Story)
- 그라디언트 배경 + 큰 이모지
- 캐릭터 이름 + 설명 + 키워드 3개
- 워터마크: "PalmRead.com"

**공유 채널**
- 카카오톡, Instagram, Twitter
- Web Share API
- UTM 추적

#### 8. 커플 궁합 분석
- 두 손금 비교
- 궁합 점수 (0-100)
- 조화/충돌 영역 시각화

#### 9. 구독 모델
- 월 1회 재스캔 알림
- 월별 변화 리포트
- 무제한 재분석
- AI 챗봇

---

### Phase 3: 프리미엄 (Week 9-12)

#### 10. AI 챗봇 상담
- 손금 기반 Q&A
- GPT-4o 대화형

#### 11. 다국어
- 한국어, 영어, 일본어, 중국어

#### 12. 커뮤니티
- 익명 손금 게시판

---

## 🎨 UI/UX 설계

### 화면 구조
```
온보딩 → 메인 → 스캔 → 분석 중 → 무료 리포트 → 시각화 → 업그레이드
```

### 주요 화면

**1. 온보딩 (3장)**
- 슬라이드 1: "AI가 손금을 읽습니다"
- 슬라이드 2: **"사진은 저장되지 않습니다 🔒"**
- 슬라이드 3: "3초 결과 확인"

**2. 메인 홈**
- Hero: "내 손금 캐릭터는?"
- 신뢰 배지: "99% 개인정보 보호"
- CTA: "무료로 시작"
- 16가지 캐릭터 갤러리

**3. 스캔**
- 실시간 카메라 + 가이드라인
- 품질 피드백: "조명 부족", "초점 중"

**4. 분석 중 (15-20초)**
- 애니메이션 + 단계별 메시지
  - "손금 스캔 중 🔍"
  - "생명선 분석 중 💓"
  - "캐릭터 찾는 중 🎯"

**5. 무료 리포트**
- 시각화: 손바닥 + 컬러 오버레이
- 캐릭터 카드: "🦉 Wise Owl!"
- 키워드 3개 + 요약
- 공유 버튼
- 업그레이드 CTA

**6. 유료 리포트**
- 탭: 성격|재물|건강|연애|직업
- 시각화 + 상세 텍스트
- PDF 다운로드

---

## 🛠️ 기술 스택

### 프로젝트 구조
```
palmread/
├── index.html
├── onboarding.html
├── scan.html
├── analyzing.html
├── report.html
├── css/
│   ├── styles.css
│   └── animations.css
├── js/
│   ├── camera.js          # 고화질 카메라
│   ├── quality-check.js   # 품질 검증
│   ├── gpt-analyzer.js    # GPT-4o
│   ├── visualizer.js      # 오버레이
│   ├── viral-card.js      # 공유 카드
│   ├── storage.js         # 프라이버시 저장
│   └── payment.js
└── assets/
    ├── images/
    └── characters/
```

### 기술
- Frontend: HTML5 + Tailwind CSS + Vanilla JS
- AI: OpenAI GPT-4o Vision
- Storage: window.storage
- Payment: 토스페이먼츠, Stripe

---

## 💾 데이터 모델

### 개인 스캔
```javascript
// scans:USER_ID:SCAN_ID
{
  scanId: "scan_123",
  scanDate: "2025-12-14T10:30:00Z",
  // imageData: ❌ 저장 안 함
  analysisResult: {
    lines: {
      lifeLine: {
        coordinates: [[100,200], [150,300]],
        quality: "clear",
        meaning: "강한 생명력"
      }
    },
    personality: ["창의적", "분석적"],
    characterType: "Wise Owl",
    summary: "..."
  },
  isPaid: false
}
```

### 유료 리포트
```javascript
// reports:USER_ID:REPORT_ID
{
  scanId: "scan_123",
  reportType: "detailed",
  purchaseDate: "2025-12-14T11:00:00Z",
  price: 3900,
  content: {...}
}
```

---

## 🎬 개발 가이드

### Week 1-2: 고화질 스캔 + AI

#### camera.js
```javascript
class PalmScanner {
  async initCamera() {
    const constraints = {
      video: {
        width: { ideal: 1920 },
        height: { ideal: 1080 },
        facingMode: 'environment',
        focusMode: 'continuous'
      }
    };
    
    this.stream = await navigator.mediaDevices.getUserMedia(constraints);
    document.getElementById('video').srcObject = this.stream;
  }
  
  captureHighQuality() {
    const video = document.getElementById('video');
    const canvas = document.createElement('canvas');
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    
    const ctx = canvas.getContext('2d');
    ctx.drawImage(video, 0, 0);
    
    if (this.validateQuality(canvas)) {
      return canvas.toDataURL('image/jpeg', 0.95);
    }
    throw new Error('품질 부족');
  }
  
  validateQuality(canvas) {
    const ctx = canvas.getContext('2d');
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageData.data;
    
    let brightness = 0;
    for (let i = 0; i < data.length; i += 4) {
      brightness += (data[i] + data[i+1] + data[i+2]) / 3;
    }
    brightness /= (data.length / 4);
    
    if (brightness < 50) {
      this.showFeedback('조명 부족 💡');
      return false;
    }
    return true;
  }
}
```

#### gpt-analyzer.js
```javascript
async function analyzePalm(imageBase64) {
  const systemPrompt = `Expert palmist. Return JSON with coordinates.

Format:
{
  "lines": {
    "lifeLine": {
      "coordinates": [[x,y], ...],
      "quality": "clear",
      "meaning": "Strong vitality"
    }
  },
  "personality": ["Creative", "Analytical"],
  "characterType": "Wise Owl",
  "summary": "..."
}`;

  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${OPENAI_API_KEY}`
    },
    body: JSON.stringify({
      model: 'gpt-4o',
      messages: [
        { role: 'system', content: systemPrompt },
        {
          role: 'user',
          content: [
            {
              type: 'image_url',
              image_url: { url: imageBase64, detail: 'high' }
            },
            { type: 'text', text: 'Analyze in Korean' }
          ]
        }
      ],
      response_format: { type: 'json_object' },
      max_tokens: 2000
    })
  });

  const data = await response.json();
  return JSON.parse(data.choices[0].message.content);
}
```

---

### Week 3-4: 시각화 + 저장

#### visualizer.js
```javascript
class PalmVisualizer {
  constructor(canvasId, imageData, analysis) {
    this.canvas = document.getElementById(canvasId);
    this.ctx = this.canvas.getContext('2d');
    this.image = new Image();
    this.image.src = imageData;
    this.analysis = analysis;
    this.image.onload = () => this.draw();
  }
  
  draw() {
    this.ctx.drawImage(this.image, 0, 0, this.canvas.width, this.canvas.height);
    
    // 반투명 오버레이
    this.ctx.fillStyle = 'rgba(0,0,0,0.3)';
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    
    const colors = {
      lifeLine: '#FF6B6B',
      headLine: '#4ECDC4',
      heartLine: '#FFE66D',
      fateLine: '#A8E6CF'
    };
    
    Object.entries(this.analysis.lines).forEach(([name, data]) => {
      if (data.coordinates) {
        this.drawLine(data.coordinates, colors[name], name);
      }
    });
  }
  
  drawLine(coords, color, label) {
    this.ctx.strokeStyle = color;
    this.ctx.lineWidth = 4;
    this.ctx.shadowBlur = 10;
    this.ctx.shadowColor = color;
    
    this.ctx.beginPath();
    coords.forEach((point, i) => {
      const [x, y] = point;
      if (i === 0) this.ctx.moveTo(x, y);
      else this.ctx.lineTo(x, y);
    });
    this.ctx.stroke();
    
    // 라벨
    const [x, y] = coords[0];
    this.ctx.fillStyle = color;
    this.ctx.font = 'bold 16px sans-serif';
    this.ctx.fillText(this.getLabel(label), x + 10, y - 10);
  }
  
  getLabel(name) {
    return {
      lifeLine: '생명선',
      headLine: '지능선',
      heartLine: '감정선',
      fateLine: '재물선'
    }[name];
  }
}
```

#### storage.js (프라이버시)
```javascript
class PrivacyStorage {
  async saveScan(imageBase64, analysis) {
    const userId = this.getUserId();
    const scanId = 'scan_' + Date.now();
    
    // 이미지 저장 안 함!
    const data = {
      scanId,
      scanDate: new Date().toISOString(),
      analysisResult: analysis,
      isPaid: false,
      privacyNote: 'Image deleted immediately'
    };
    
    await window.storage.set(
      `scans:${userId}:${scanId}`,
      JSON.stringify(data)
    );
    
    this.showBadge('✅ 사진은 저장되지 않았습니다');
    return scanId;
  }
  
  showBadge(msg) {
    const badge = document.createElement('div');
    badge.className = 'privacy-badge';
    badge.textContent = msg;
    document.body.appendChild(badge);
    setTimeout(() => badge.remove(), 5000);
  }
  
  getUserId() {
    let id = localStorage.getItem('palmread_user');
    if (!id) {
      id = 'user_' + Date.now();
      localStorage.setItem('palmread_user', id);
    }
    return id;
  }
}
```

---

### Week 5-6: 바이럴

#### viral-card.js
```javascript
class ViralCard {
  constructor() {
    this.characters = {
      'Wise Owl': { emoji: '🦉', title: '지혜로운 올빼미', color: '#6B46C1' },
      'Brave Lion': { emoji: '🦁', title: '용감한 사자', color: '#DD6B20' },
      // ... 14개 더
    };
  }
  
  generate(analysis) {
    const char = this.characters[analysis.characterType];
    const canvas = document.createElement('canvas');
    canvas.width = 1080;
    canvas.height = 1920;
    const ctx = canvas.getContext('2d');
    
    // 그라디언트
    const grad = ctx.createLinearGradient(0, 0, 0, 1920);
    grad.addColorStop(0, char.color);
    grad.addColorStop(1, '#1A202C');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 1080, 1920);
    
    // 이모지
    ctx.font = '200px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(char.emoji, 540, 400);
    
    // 제목
    ctx.fillStyle = 'white';
    ctx.font = 'bold 80px sans-serif';
    ctx.fillText(char.title, 540, 600);
    
    // 키워드
    ctx.font = 'bold 45px sans-serif';
    analysis.personality.forEach((kw, i) => {
      ctx.fillText(`✨ ${kw}`, 540, 900 + i * 80);
    });
    
    // 워터마크
    ctx.font = '35px sans-serif';
    ctx.fillStyle = 'rgba(255,255,255,0.7)';
    ctx.fillText('PalmRead.com', 540, 1800);
    
    return canvas.toDataURL('image/png');
  }
}

async function shareCard(imageUrl) {
  if (navigator.share) {
    await navigator.share({
      title: '내 손금 유형',
      url: 'https://palmread.com'
    });
  }
}
```

---

## 💰 수익 모델

### 가격표 (Decoy Pricing)
- 무료: 기본 분석
- ₩3,900: 상세 리포트
- ₩6,900: 커플 패키지 🔥
- ₩9,900/월: 구독

### 예상 매출 (3개월)
- DAU 1,000명
- 유료 전환 200명 (20%)
  - 상세: 150 × ₩3,900 = ₩585,000
  - 궁합: 30 × ₩6,900 = ₩207,000
  - 구독: 20 × ₩9,900 = ₩198,000
- **월 매출**: ₩990,000
- **월 비용**: ₩270,000
- **순이익**: ₩720,000

---

## 📱 마케팅

### 런칭 전
- 랜딩 페이지 + 사전등록
- 베타 50명

### 런칭일
- Product Hunt
- #내손금챌린지 (TikTok)
- Reddit 포스팅

### 런칭 후
- 친구 초대 이벤트
- 인플루언서 협업
- SEO

---

## 🚀 배포 체크리스트

**배포 전**
- [ ] 전체 기능 테스트
- [ ] 모바일 테스트
- [ ] 결제 테스트
- [ ] 개인정보처리방침
- [ ] 면책 조항: "엔터테인먼트 목적"

**배포 후**
- [ ] 에러 모니터링
- [ ] Google Analytics
- [ ] 백업 시스템

---

## 📊 KPI

### 주간
- DAU/MAU
- 스캔 완료율
- 유료 전환율
- 바이럴 계수

### 월간
- MRR
- Churn Rate
- LTV
- CAC

---

## ⚠️ 리스크 관리

### 기술
- AI 정확도 낮음 → 프롬프트 개선
- API 비용 과다 → 캐싱

### 법률
- 개인정보 → 최소 수집, 즉시 삭제
- 의료법 → "참고용" 명시
- 소비자보호 → 환불 정책

### 시장
- 경쟁 출현 → 차별화
- 유행 종료 → 다른 점술 확장

---

## 🎯 다음 단계

### 1주차
- Antigravity 프로젝트 생성
- 카메라 기능
- GPT API 테스트

### 2주차
- 결제 연동
- Storage 구현

### 3주차
- 시각화 완성
- 바이럴 카드

---

## 📚 최종 요약

### 핵심 개선사항 (CPO 피드백)
1. **1920×1080 고화질** → 미세 손금 인식
2. **이미지 즉시 삭제** → 프라이버시 마케팅
3. **좌표 기반 시각화** → AI 신뢰도 향상
4. **16가지 캐릭터** → 바이럴 확산
5. **Decoy Pricing** → 전환율 최적화

### 성공 지표
- 3개월: ₩720,000/월 순이익
- 1년: ₩7,200,000/월
- DAU 10,000명

**프로토타입 코드 제작을 시작할까요?** 🚀