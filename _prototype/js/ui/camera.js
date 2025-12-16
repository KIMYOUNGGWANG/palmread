export default class Camera {
    constructor(app) {
        this.app = app;
        this.video = document.getElementById('camera-feed');
        this.canvas = document.getElementById('camera-overlay');
        this.ctx = this.canvas.getContext('2d');
        this.btnCapture = document.getElementById('btn-capture');
        this.feedback = document.getElementById('camera-feedback');

        this.stream = null;
        this.isStreaming = false;

        this.bindEvents();
    }

    bindEvents() {
        this.btnCapture.addEventListener('click', () => this.capture());

        // Handle view switching to start/stop camera
        // We can hook into the app's switchView or just check visibility
        // For now, let's expose start/stop methods
    }

    async start() {
        if (this.isStreaming) return;

        try {
            const constraints = {
                video: {
                    facingMode: 'environment', // Rear camera
                    width: { ideal: 1920 },
                    height: { ideal: 1080 }
                }
            };

            this.stream = await navigator.mediaDevices.getUserMedia(constraints);
            this.video.srcObject = this.stream;
            this.video.onloadedmetadata = () => {
                this.video.play();
                this.isStreaming = true;
                this.resizeCanvas();
                this.drawOverlay();
            };
        } catch (err) {
            console.error('Camera Error:', err);
            alert('카메라 접근 권한이 필요합니다.');
        }
    }

    stop() {
        if (this.stream) {
            this.stream.getTracks().forEach(track => track.stop());
            this.stream = null;
            this.isStreaming = false;
        }
    }

    resizeCanvas() {
        this.canvas.width = this.video.videoWidth;
        this.canvas.height = this.video.videoHeight;
    }

    drawOverlay() {
        if (!this.isStreaming) return;

        const w = this.canvas.width;
        const h = this.canvas.height;

        this.ctx.clearRect(0, 0, w, h);

        // Draw Ghost Hand Guide
        this.ctx.save();
        this.ctx.strokeStyle = 'rgba(255, 255, 255, 0.5)';
        this.ctx.lineWidth = 5;
        this.ctx.setLineDash([10, 10]);

        // Simple Hand Shape Path (Approximate)
        // This is a placeholder. A real SVG path would be better.
        // Drawing a rounded rect for palm and lines for fingers
        const palmW = w * 0.5;
        const palmH = h * 0.4;
        const palmX = (w - palmW) / 2;
        const palmY = (h - palmH) / 2 + h * 0.1;

        this.ctx.beginPath();
        this.ctx.roundRect(palmX, palmY, palmW, palmH, 40);
        this.ctx.stroke();

        // Fingers (Simple lines for guide)
        const fingers = [
            { x: palmX - 20, y: palmY + 50, h: 100, angle: -30 }, // Thumb
            { x: palmX + palmW * 0.2, y: palmY, h: 120, angle: -5 }, // Index
            { x: palmX + palmW * 0.5, y: palmY - 10, h: 130, angle: 0 }, // Middle
            { x: palmX + palmW * 0.8, y: palmY, h: 110, angle: 5 }, // Ring
            { x: palmX + palmW + 10, y: palmY + 40, h: 90, angle: 20 }, // Pinky
        ];

        // Just a visual guide, doesn't need to be perfect
        this.ctx.fillStyle = 'rgba(255, 255, 255, 0.1)';
        this.ctx.fill();

        this.ctx.restore();

        requestAnimationFrame(() => this.drawOverlay());
    }

    capture() {
        if (!this.isStreaming) return;

        // Flash Effect
        const flash = document.createElement('div');
        flash.className = 'absolute inset-0 bg-white z-50 animate-pulse';
        document.body.appendChild(flash);
        setTimeout(() => flash.remove(), 200);

        // Capture Logic
        const canvas = document.createElement('canvas');
        canvas.width = this.video.videoWidth;
        canvas.height = this.video.videoHeight;
        canvas.getContext('2d').drawImage(this.video, 0, 0);

        const imageData = canvas.toDataURL('image/jpeg', 0.9);

        // Stop Camera
        this.stop();

        // Proceed to Analysis
        this.app.startAnalysis(imageData);
    }
}
