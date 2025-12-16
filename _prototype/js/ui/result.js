import ViralCard from './viral-card.js';

export default class Result {
    constructor(app) {
        this.app = app;
        this.container = document.getElementById('view-result');
        this.viralCard = new ViralCard();

        // Mock Data for UI Dev
        this.mockData = {
            character: {
                name: "Wise Owl",
                title: "지혜로운 올빼미",
                emoji: "🦉",
                color: "text-purple-400",
                desc: "치밀한 분석가"
            },
            keywords: ["#논리왕", "#새벽형", "#팩트폭격"],
            summary: "당신은 감정보다 이성을 중시하며, 남들이 보지 못하는 디테일을 캐치하는 능력이 탁월합니다. 생명선이 깊고 진해 체력도 받쳐주는 스타일이네요."
        };
    }

    render(data = this.mockData) {
        // In real app, use actual image from camera
        // For now, placeholder or the one from analyzing
        const imageData = this.app.analyzing?.lastImage || 'https://placehold.co/400x600/1a202c/FFF?text=Hand+Image';

        this.container.innerHTML = `
            <div class="relative min-h-full pb-20">
                
                <!-- Layer 1: Visual Overlay (The Wow Moment) -->
                <div class="relative w-full h-[50vh] bg-gray-800 overflow-hidden">
                    <img src="${imageData}" class="w-full h-full object-cover opacity-80">
                    
                    <!-- SVG Overlay for Lines (Mock) -->
                    <svg class="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 100 100" preserveAspectRatio="none">
                        <!-- Life Line (Red) -->
                        <path d="M30,40 Q45,60 40,90" fill="none" stroke="#FF6B6B" stroke-width="1" class="drop-shadow-[0_0_5px_rgba(255,107,107,0.8)]" stroke-linecap="round">
                            <animate attributeName="stroke-dasharray" from="0,100" to="100,0" dur="1.5s" fill="freeze" />
                        </path>
                        <!-- Head Line (Cyan) -->
                        <path d="M30,45 Q60,55 80,50" fill="none" stroke="#4ECDC4" stroke-width="1" class="drop-shadow-[0_0_5px_rgba(78,205,196,0.8)]" stroke-linecap="round">
                            <animate attributeName="stroke-dasharray" from="0,100" to="100,0" dur="1.5s" begin="0.5s" fill="freeze" />
                        </path>
                    </svg>

                    <!-- Character Badge (Animated Entry) -->
                    <div class="absolute bottom-[-20px] right-6 bg-white text-gray-900 px-4 py-3 rounded-2xl shadow-xl transform translate-y-10 opacity-0 animate-[slideUp_0.8s_ease-out_1.5s_forwards] flex items-center gap-3 z-10">
                        <span class="text-4xl">${data.character.emoji}</span>
                        <div>
                            <div class="text-xs text-gray-500 font-bold uppercase tracking-wider">Type</div>
                            <div class="text-lg font-bold leading-none">${data.character.name}</div>
                        </div>
                    </div>
                </div>

                <!-- Layer 2: Key Insights -->
                <div class="px-6 pt-10 pb-6 space-y-6">
                    
                    <!-- Title & Keywords -->
                    <div class="space-y-3">
                        <h2 class="text-2xl font-bold leading-tight">
                            당신은 <span class="${data.character.color}">${data.character.desc}</span><br>타입이군요.
                        </h2>
                        <div class="flex flex-wrap gap-2">
                            ${data.keywords.map(k => `
                                <span class="px-3 py-1 bg-gray-800 rounded-full text-sm text-gray-300 border border-gray-700">
                                    ${k}
                                </span>
                            `).join('')}
                        </div>
                    </div>

                    <!-- Summary Card -->
                    <div class="bg-gray-800/50 p-5 rounded-xl border border-gray-700">
                        <p class="text-gray-300 leading-relaxed text-sm">
                            ${data.summary}
                        </p>
                    </div>

                    <!-- Feedback Loop -->
                    <div class="text-center py-4 border-t border-gray-800">
                        <p class="text-xs text-gray-500 mb-2">이 분석이 얼마나 정확한가요?</p>
                        <div class="flex justify-center gap-2 text-2xl grayscale hover:grayscale-0 transition-all">
                            <button class="hover:scale-110 transition-transform">👎</button>
                            <button class="hover:scale-110 transition-transform">😐</button>
                            <button class="hover:scale-110 transition-transform">👍</button>
                        </div>
                    </div>

                </div>

                <!-- Layer 3: Paid Teaser (Blur Effect) -->
                <div class="mx-4 mb-8 relative overflow-hidden rounded-2xl border border-purple-500/30 bg-gradient-to-br from-gray-800 to-gray-900">
                    <div class="p-6 filter blur-[2px] opacity-50 select-none">
                        <h3 class="font-bold text-lg mb-2">💰 2025년 재물운 상세 분석</h3>
                        <p class="text-sm text-gray-400">올빼미 타입이 돈을 모으는 가장 좋은 시기는 3월과 9월입니다. 특히 주의해야 할...</p>
                        <div class="mt-4 h-20 bg-gray-700/50 rounded-lg"></div>
                    </div>
                    
                    <!-- CTA Overlay -->
                    <div class="absolute inset-0 flex flex-col items-center justify-center bg-black/20 backdrop-blur-[1px]">
                        <p class="text-purple-300 font-bold mb-3 text-sm text-center">
                            🦉 올빼미 타입만의<br>특별한 재물운이 궁금하다면?
                        </p>
                        <button class="px-6 py-3 bg-white text-purple-900 font-bold rounded-full shadow-lg active:scale-95 transition-transform flex items-center gap-2">
                            <span>상세 리포트 보기</span>
                            <span class="text-xs bg-purple-100 text-purple-800 px-1.5 py-0.5 rounded">₩3,900</span>
                        </button>
                    </div>
                </div>

                <!-- Share Button (Floating) -->
                <div class="fixed bottom-6 left-0 w-full px-6 flex justify-center z-50">
                    <button id="btn-share" class="w-full max-w-sm py-4 bg-gray-900/90 backdrop-blur text-white border border-gray-700 rounded-xl shadow-2xl flex items-center justify-center gap-2 font-bold active:scale-95 transition-all">
                        <span>📤 친구에게 공유하기</span>
                    </button>
                </div>

            </div>
            
            <style>
                @keyframes slideUp {
                    from { transform: translateY(40px); opacity: 0; }
                    to { transform: translateY(0); opacity: 1; }
                }
            </style>
        `;

        // Bind Events
        document.getElementById('btn-share').addEventListener('click', async () => {
            const url = await this.viralCard.generate(data);
            this.viralCard.showModal(url);
        });
    }
}
