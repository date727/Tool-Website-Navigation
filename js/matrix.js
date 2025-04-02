class MatrixRain {
    constructor() {
        this.canvas = document.createElement('canvas');
        this.ctx = this.canvas.getContext('2d');
        this.characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*';
        this.fontSize = 14;
        this.columns = 0;
        this.drops = [];
        this.fontFamily = "'Press Start 2P', monospace";
        
        // 设置canvas样式
        this.canvas.style.position = 'fixed';
        this.canvas.style.top = '0';
        this.canvas.style.left = '0';
        this.canvas.style.width = '100%';
        this.canvas.style.height = '100%';
        this.canvas.style.zIndex = '-1';
        this.canvas.style.background = '#000';
        
        document.body.appendChild(this.canvas);
        
        window.addEventListener('resize', () => this.resize());
        this.resize();
        this.animate();
    }
    
    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        // 调整列数计算，减小字符间距系数使字符更密集
        this.columns = Math.floor(this.canvas.width / (this.fontSize * 0.6));
        
        // 重置雨滴
        this.drops = [];
        for (let i = 0; i < this.columns; i++) {
            this.drops[i] = Math.random() * -100;
        }
    }
    
    getRandomChar() {
        return this.characters[Math.floor(Math.random() * this.characters.length)];
    }
    
    animate() {
        // 创建半透明黑色层，形成拖尾效果
        this.ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        
        this.ctx.fillStyle = '#0F0';
        this.ctx.font = `${this.fontSize}px ${this.fontFamily}`;
        
        for (let i = 0; i < this.drops.length; i++) {
            const text = this.getRandomChar();
            const x = i * this.fontSize;
            const y = this.drops[i] * this.fontSize;
            
            // 随机改变一些字符的颜色，增加视觉效果
            if (Math.random() > 0.98) {
                this.ctx.fillStyle = '#FFF';
            } else {
                this.ctx.fillStyle = '#0F0';
            }
            
            this.ctx.fillText(text, x, y);
            
            if (y > this.canvas.height && Math.random() > 0.98) {
                this.drops[i] = 0;
            }
            this.drops[i]++;
        }
        
        requestAnimationFrame(() => this.animate());
    }
}

// 页面加载完成后初始化代码雨
document.addEventListener('DOMContentLoaded', () => {
    new MatrixRain();
});