export default class Onboarding {
    constructor(app) {
        this.app = app;
        this.container = document.getElementById('view-onboarding');
        this.render();
    }

    render() {
        this.container.innerHTML = `
            <div class="w-full max-w-xs mx-auto flex flex-col items-center justify-between h-[80vh]">
                
                <!-- Header -->
                <div class="text-center space-y-2 mt-8">
                    <h1 class="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400 tracking-tight">
                        PalmRead
                    </h1>
                    <p class="text-gray-400 text-sm font-medium">AI가 읽어주는 나의 운명</p>
                </div>
                
                <!-- Shredder Container -->
                <div class="relative w-full flex-1 flex flex-col items-center justify-center my-8">
                    
                    <!-- Paper to be shredded -->
                    <div id="privacy-paper" class="relative w-64 h-80 bg-white text-gray-900 p-6 rounded-sm shadow-2xl transform transition-transform duration-500 z-10 flex flex-col items-center text-center">
                        <div class="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mb-4 text-2xl">
                            ✋
                        </div>
                        <h3 class="font-bold text-lg mb-2">프라이버시 서약</h3>
                        <p class="text-xs text-gray-500 leading-relaxed mb-4">
                            귀하의 손금 이미지는<br>
                            AI 분석 직후 <strong>즉시 삭제</strong>됩니다.<br>
                            서버에 절대 저장되지 않습니다.
                        </p>
                        <div class="w-full border-t border-dashed border-gray-300 my-2"></div>
                        <div class="text-[10px] text-gray-400 font-mono self-start mt-auto">
                            ID: USER_${Math.floor(Math.random() * 10000)}<br>
                            DATE: ${new Date().toLocaleDateString()}
                        </div>
                    </div>

                    <!-- Shredder Machine Visual (Bottom) -->
                    <div class="absolute bottom-10 w-72 h-12 bg-gray-800 rounded-t-lg border-t-4 border-gray-700 z-20 flex items-center justify-center shadow-lg">
                        <div class="text-xs text-gray-500 font-mono tracking-widest">SECURE SHREDDER</div>
                    </div>
                    
                    <!-- Shredded Pieces (Hidden initially) -->
                    <div id="shredded-pieces" class="absolute bottom-0 w-64 h-20 overflow-hidden z-0 opacity-0">
                        <!-- JS will generate strips here -->
                    </div>

                </div>

                <!-- Footer Actions -->
                <div class="w-full space-y-4 mb-8 z-30">
                    <button id="btn-agree" class="w-full py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold rounded-xl shadow-lg shadow-purple-500/30 active:scale-95 transition-all hover:shadow-purple-500/50">
                        동의하고 시작하기
                    </button>
                    <p class="text-xs text-center text-gray-500">
                        서비스 이용 시 <a href="#" class="underline">이용약관</a>에 동의하게 됩니다.
                    </p>
                </div>
            </div>
        `;

        this.bindEvents();
    }

    bindEvents() {
        const btn = document.getElementById('btn-agree');
        btn.addEventListener('click', () => this.startShredding());
    }

    startShredding() {
        const paper = document.getElementById('privacy-paper');
        const btn = document.getElementById('btn-agree');

        // Disable button
        btn.disabled = true;
        btn.classList.add('opacity-50', 'cursor-not-allowed');
        btn.textContent = '파쇄 중...';

        // 1. Animate Paper Down
        paper.style.transition = 'transform 1.5s cubic-bezier(0.45, 0, 0.55, 1), opacity 1s ease-in 0.5s';
        paper.style.transform = 'translateY(200px)'; // Move down into shredder
        // paper.style.opacity = '0'; // Fade out eventually

        // 2. Generate Shredded Strips Effect (Visual trick)
        // In a real implementation, we might use canvas or complex DOM, 
        // but for MVP, we just slide the paper down behind the "Shredder Machine" div.
        // And maybe spawn some particles below.

        // 3. Wait and Switch
        setTimeout(() => {
            // Show Privacy Badge in Header (Global)
            const badge = document.getElementById('privacy-badge');
            if (badge) {
                badge.classList.remove('hidden');
                badge.classList.add('animate-pulse-slow');
            }

            // Switch to Camera
            this.app.switchView('camera');
        }, 1600);
    }
}
