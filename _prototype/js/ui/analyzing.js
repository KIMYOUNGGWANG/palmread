export default class Analyzing {
    constructor(app) {
        this.app = app;
        this.container = document.getElementById('view-analyzing');
    }

    start(imageData) {
        this.render(imageData);
        this.runSequence();
    }

    render(imageData) {
        this.container.innerHTML = `
            <div class="relative w-full h-full flex flex-col items-center justify-center">
                
                <!-- Background Image (Blurred) -->
                <div class="absolute inset-0 z-0 opacity-20">
                    <img src="${imageData}" class="w-full h-full object-cover blur-md">
                </div>

                <!-- Central Visual -->
                <div class="relative z-10 w-64 h-64 mb-8">
                    <!-- Scan Line Effect -->
                    <div class="absolute inset-0 border-2 border-purple-500/30 rounded-lg overflow-hidden bg-black/50 backdrop-blur-sm">
                        <img src="${imageData}" class="w-full h-full object-cover opacity-60">
                        <div class="scan-line"></div>
                        
                        <!-- Grid Overlay -->
                        <div class="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTEgMGgwdjFIMHoiIGZpbGw9InJnYmEoNzgs 2MDUs 1OTcs 0LjIpIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiLz48L3N2Zz4=')] opacity-30"></div>
                    </div>
                    
                    <!-- Nodes (Animated) -->
                    <div id="analysis-nodes" class="absolute inset-0">
                        <!-- JS will add nodes here -->
                    </div>
                </div>

                <!-- Status Text -->
                <div class="z-10 text-center space-y-4 w-full max-w-xs px-4">
                    <h2 id="loading-title" class="text-2xl font-bold text-white animate-pulse">
                        손금 스캔 중...
                    </h2>
                    
                    <!-- Terminal Log -->
                    <div class="w-full h-24 bg-black/80 rounded-lg p-3 font-mono text-xs text-green-400 text-left overflow-hidden border border-gray-700 shadow-lg">
                        <div id="terminal-log" class="space-y-1">
                            <span class="cursor-blink">> Initializing...</span>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    runSequence() {
        const title = document.getElementById('loading-title');
        const log = document.getElementById('terminal-log');

        const addLog = (text) => {
            const p = document.createElement('div');
            p.textContent = `> ${text}`;
            log.appendChild(p);
            log.scrollTop = log.scrollHeight;
        };

        // Sequence Timeline
        // 0s: Scanning
        setTimeout(() => {
            title.textContent = "주요 선 추출 중...";
            addLog("Image pre-processing complete");
            addLog("Detecting edges (Canny)...");
        }, 2000);

        setTimeout(() => {
            addLog("LifeLine coordinates found: [124, 450]");
            this.showNode(124, 150); // Fake visual node
        }, 3000);

        setTimeout(() => {
            addLog("HeadLine coordinates found: [140, 320]");
            this.showNode(140, 120);
        }, 4000);

        setTimeout(() => {
            title.textContent = "데이터베이스 대조 중...";
            addLog("Connecting to Knowledge Base...");
            addLog("Matching patterns (14,023 records)...");
        }, 6000);

        setTimeout(() => {
            title.textContent = "성향 분석 중...";
            addLog("Analyzing personality traits...");
            addLog("Calculating compatibility scores...");
        }, 9000);

        setTimeout(() => {
            title.textContent = "분석 완료!";
            title.classList.remove('animate-pulse');
            title.classList.add('text-green-400');
            addLog("Report generated successfully.");
            addLog("Finalizing output...");
        }, 12000);

        // Finish
        setTimeout(() => {
            this.app.showResult(); // Trigger Result View
        }, 13000);
    }

    showNode(x, y) {
        const nodes = document.getElementById('analysis-nodes');
        if (!nodes) return;

        const node = document.createElement('div');
        node.className = 'absolute w-3 h-3 bg-cyan-400 rounded-full shadow-[0_0_10px_#4ECDC4] transform scale-0 transition-transform duration-300';
        // Randomize position slightly for effect (relative to container 256x256)
        // Just mapping x,y roughly to % for demo
        node.style.left = `${(x / 300) * 100}%`;
        node.style.top = `${(y / 500) * 100}%`;

        nodes.appendChild(node);

        // Animate in
        requestAnimationFrame(() => {
            node.classList.remove('scale-0');
        });
    }
}
