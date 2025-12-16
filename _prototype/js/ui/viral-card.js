export default class ViralCard {
    constructor() {
        this.canvas = document.createElement('canvas');
        this.canvas.width = 1080;
        this.canvas.height = 1920;
        this.ctx = this.canvas.getContext('2d');
    }

    async generate(data) {
        const ctx = this.ctx;

        // Background Gradient
        const grad = ctx.createLinearGradient(0, 0, 0, 1920);
        grad.addColorStop(0, '#6B46C1'); // Purple
        grad.addColorStop(1, '#1A202C'); // Dark
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, 1080, 1920);

        // Emoji
        ctx.font = '200px sans-serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(data.character.emoji, 540, 400);

        // Title
        ctx.fillStyle = 'white';
        ctx.font = 'bold 80px sans-serif';
        ctx.fillText(data.character.title, 540, 600);

        // Desc
        ctx.font = '50px sans-serif';
        ctx.fillStyle = '#E9D8FD';
        ctx.fillText(data.character.desc, 540, 700);

        // Keywords
        ctx.font = 'bold 45px sans-serif';
        ctx.fillStyle = 'white';
        data.keywords.forEach((kw, i) => {
            ctx.fillText(kw, 540, 900 + (i * 80));
        });

        // Watermark
        ctx.font = '35px sans-serif';
        ctx.fillStyle = 'rgba(255,255,255,0.5)';
        ctx.fillText('PalmRead.com', 540, 1800);

        return this.canvas.toDataURL('image/png');
    }

    showModal(imageUrl) {
        const modal = document.createElement('div');
        modal.className = 'fixed inset-0 z-[100] bg-black/90 flex flex-col items-center justify-center p-6 animate-[fadeIn_0.2s_ease-out]';
        modal.innerHTML = `
            <div class="relative w-full max-w-sm bg-gray-900 rounded-2xl overflow-hidden shadow-2xl">
                <div class="p-4 flex justify-between items-center border-b border-gray-800">
                    <h3 class="text-white font-bold">공유 카드 미리보기</h3>
                    <button id="btn-close-modal" class="text-gray-400 hover:text-white">✕</button>
                </div>
                <div class="p-4 bg-gray-800 flex justify-center">
                    <img src="${imageUrl}" class="h-[50vh] rounded-lg shadow-lg">
                </div>
                <div class="p-4 grid grid-cols-2 gap-3">
                    <button class="py-3 bg-gray-700 text-white rounded-xl font-bold">저장하기</button>
                    <button class="py-3 bg-purple-600 text-white rounded-xl font-bold">공유하기</button>
                </div>
            </div>
        `;

        document.body.appendChild(modal);

        document.getElementById('btn-close-modal').addEventListener('click', () => {
            modal.remove();
        });
    }
}
