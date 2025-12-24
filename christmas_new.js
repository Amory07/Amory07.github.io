// 页面加载完成后执行
window.onload = function() {
    const entryPage = document.getElementById('entryPage');
    const mainPage = document.getElementById('mainPage');
    const entryButton = document.getElementById('entry-button');
    const treeCanvas = document.getElementById('treeCanvas');
    const ctx = treeCanvas.getContext('2d');
    const finalTree = document.getElementById('final-tree');
    const blessings = document.getElementById('blessings');
    const merryText = document.getElementById('merry-text');
    
    // 背景音乐控制
    const bgMusic = document.getElementById('bgMusic');
    const musicBtn = document.getElementById('musicBtn');
    let isMusicPlaying = false;
    
    // 雪花效果
    let snowflakes = [];
    const maxSnowflakes = 100;
    
    // 烟花效果
    let fireworks = [];
    
    // 设置Canvas尺寸函数
    function setCanvasSize() {
        const container = document.querySelector('.tree-container');
        const containerRect = container.getBoundingClientRect();
        treeCanvas.width = containerRect.width;
        treeCanvas.height = containerRect.height;
    }
    
    // 初始设置Canvas尺寸
    setCanvasSize();
    
    // 窗口大小变化时重新设置Canvas尺寸
    window.addEventListener('resize', setCanvasSize);
    
    // 点击进入按钮事件
    entryButton.addEventListener('click', function() {
        entryPage.style.opacity = '0';
        setTimeout(function() {
            entryPage.style.display = 'none';
            mainPage.style.display = 'block';
            drawChristmasTree();
        }, 500);
    });
    
    // Canvas绘制圣诞树
    function drawChristmasTree() {
        // 初始化参数
        let step = 0;
        const totalSteps = 100;
        const centerX = treeCanvas.width / 2;
        const centerY = treeCanvas.height * 0.8;
        
        // 绘制函数
        function draw() {
            // 清除画布
            ctx.clearRect(0, 0, treeCanvas.width, treeCanvas.height);
            
            // 计算当前进度
            const progress = step / totalSteps;
            
            // 绘制背景
            ctx.fillStyle = 'rgba(26, 35, 126, 0.1)';
            ctx.fillRect(0, 0, treeCanvas.width, treeCanvas.height);
            
            // 绘制星星（部分1-10步）
            if (progress <= 0.1) {
                drawStar(centerX, centerY - 400, 30, 5, '#ffeb3b', progress * 10);
            } else {
                drawStar(centerX, centerY - 400, 30, 5, '#ffeb3b', 1);
            }
            
            // 绘制树顶（部分11-30步）
            if (progress > 0.1 && progress <= 0.3) {
                const topProgress = (progress - 0.1) / 0.2;
                drawTreeLayer(centerX, centerY - 250, 100, 150, topProgress);
            } else if (progress > 0.3) {
                drawTreeLayer(centerX, centerY - 250, 100, 150, 1);
            }
            
            // 绘制树中（部分31-60步）
            if (progress > 0.3 && progress <= 0.6) {
                const middleProgress = (progress - 0.3) / 0.3;
                drawTreeLayer(centerX, centerY - 150, 150, 225, middleProgress);
            } else if (progress > 0.6) {
                drawTreeLayer(centerX, centerY - 150, 150, 225, 1);
            }
            
            // 绘制树底（部分61-90步）
            if (progress > 0.6 && progress <= 0.9) {
                const bottomProgress = (progress - 0.6) / 0.3;
                drawTreeLayer(centerX, centerY, 200, 300, bottomProgress);
            } else if (progress > 0.9) {
                drawTreeLayer(centerX, centerY, 200, 300, 1);
            }
            
            // 绘制树干（部分91-100步）
            if (progress > 0.9) {
                const trunkProgress = (progress - 0.9) / 0.1;
                drawTrunk(centerX, centerY + 150, 40, 80, trunkProgress);
            }
            
            // 更新步骤
            step++;
            
            // 继续绘制或显示最终树
            if (step <= totalSteps) {
                requestAnimationFrame(draw);
            } else {
                // 显示最终圣诞树
                finalTree.style.animation = 'fade-in 1s forwards';
                
                // 显示Merry Christmas文字
                merryText.style.animation = 'fade-in 1s 0.5s forwards';
                
                // 开始生成祝福文字
                startBlessings();
            }
        }
        
        // 开始绘制
        draw();
    }
    
    // 绘制星星
    function drawStar(cx, cy, outerRadius, points, color, progress) {
        ctx.save();
        ctx.beginPath();
        ctx.translate(cx, cy);
        ctx.rotate((Math.PI * 2) / (points * 2) * -1);
        
        for (let i = 0; i < points * 2; i++) {
            const radius = i % 2 === 0 ? outerRadius : outerRadius * 0.5;
            const x = Math.cos((Math.PI * 2 * i) / (points * 2)) * radius * progress;
            const y = Math.sin((Math.PI * 2 * i) / (points * 2)) * radius * progress;
            
            if (i === 0) {
                ctx.moveTo(x, y);
            } else {
                ctx.lineTo(x, y);
            }
        }
        
        ctx.closePath();
        ctx.fillStyle = color;
        ctx.fill();
        ctx.restore();
    }
    
    // 绘制树层
    function drawTreeLayer(cx, cy, width, height, progress) {
        ctx.save();
        ctx.beginPath();
        ctx.moveTo(cx, cy - height * progress);
        ctx.lineTo(cx - width * progress, cy);
        ctx.lineTo(cx + width * progress, cy);
        ctx.closePath();
        
        // 设置渐变
        const gradient = ctx.createLinearGradient(cx - width * progress, cy, cx + width * progress, cy - height * progress);
        gradient.addColorStop(0, '#1565c0');
        gradient.addColorStop(1, '#1e88e5');
        ctx.fillStyle = gradient;
        ctx.fill();
        ctx.restore();
    }
    
    // 绘制树干
    function drawTrunk(cx, cy, width, height, progress) {
        ctx.save();
        ctx.fillStyle = '#5d4037';
        ctx.fillRect(cx - (width * progress) / 2, cy - height * progress, width * progress, height * progress);
        ctx.restore();
    }
    
    // 开始生成祝福文字
    function startBlessings() {
        const blessingTexts = [
            '圣诞快乐！',
            'Merry Christmas!',
            '节日快乐！',
            'Happy Holidays!',
            '万事如意！',
            '心想事成！',
            '平安夜快乐！',
            'Happy New Year!',
            '身体健康！',
            '家庭幸福！',
            '事业有成！',
            '友谊长存！',
            '梦想成真！',
            '永远开心！',
            '爱与和平！',
            'Joy to the World!',
            '圣诞吉祥！',
            '新年快乐！',
            'Peace & Love!',
            '愿你快乐！'
        ];
        
        // 初始生成一些祝福文字（分布更均匀）
        for (let i = 0; i < 8; i++) {
            setTimeout(function() {
                createBlessing(blessingTexts);
            }, i * 500);
        }
        
        // 定期生成祝福文字（更长间隔，更慢节奏）
        setInterval(function() {
            createBlessing(blessingTexts);
        }, 1500);
    }
    
    // 创建祝福文字
function createBlessing(texts) {
    // 创建祝福元素
    const blessing = document.createElement('div');
    blessing.className = 'blessing';
    
    // 随机选择祝福文字
    const randomText = texts[Math.floor(Math.random() * texts.length)];
    blessing.textContent = randomText;
    
    // 获取树容器的位置和尺寸
    const container = document.querySelector('.tree-container');
    const containerRect = container.getBoundingClientRect();
    
    // 计算圣诞树中心位置（相对于容器）
    const treeCenterX = containerRect.width / 2;
    const treeCenterY = containerRect.height * 0.6;
    
    // 计算文字大小，用于调整位置边界
    const randomSize = Math.random() * 15 + 16;
    blessing.style.fontSize = randomSize + 'px';
    
    // 在圣诞树周围区域内随机位置 - 确保在可视范围内
    const angle = Math.random() * Math.PI * 2; // 随机角度
    const distance = Math.random() * 150 + 100; // 距离圣诞树中心的随机距离
    
    // 计算最终位置
    const randomX = treeCenterX + Math.cos(angle) * distance - randomSize;
    const randomY = treeCenterY + Math.sin(angle) * distance - randomSize / 2;
    
    // 确保文字在容器可视范围内
    const minX = 50;
    const maxX = containerRect.width - 150;
    const minY = 50;
    const maxY = containerRect.height - 50;
    
    const finalX = Math.max(minX, Math.min(maxX, randomX));
    const finalY = Math.max(minY, Math.min(maxY, randomY));
    
    blessing.style.left = finalX + 'px';
    blessing.style.top = finalY + 'px';
    
    // 随机延迟和持续时间（更长的持续时间，更慢的动画）
    const randomDelay = Math.random() * 2;
    const randomDuration = Math.random() * 3 + 7; // 7-10秒
    blessing.style.animationDelay = randomDelay + 's';
    blessing.style.animationDuration = randomDuration + 's';
    
    // 添加随机旋转效果
    const randomRotation = Math.random() * 20 - 10;
    blessing.style.transform = `rotate(${randomRotation}deg)`;
    
    // 动画结束后移除
    setTimeout(function() {
        if (blessing.parentNode) {
            blessing.parentNode.removeChild(blessing);
        }
    }, (randomDelay + randomDuration) * 1000);
    
    // 确保祝福容器存在
    const blessingsContainer = document.getElementById('blessings');
    if (blessingsContainer) {
        blessingsContainer.appendChild(blessing);
    } else {
        console.error('Blessings container not found!');
    }
}
    
    // 音乐控制功能
    function toggleMusic() {
        if (isMusicPlaying) {
            bgMusic.pause();
            musicBtn.classList.add('paused');
        } else {
            bgMusic.play().catch(error => {
                console.log('音乐播放失败:', error);
            });
            musicBtn.classList.remove('paused');
        }
        isMusicPlaying = !isMusicPlaying;
    }
    
    // 音乐按钮点击事件
    musicBtn.addEventListener('click', toggleMusic);
    
    // 尝试自动播放音乐（需要用户交互后才能正常播放）
    document.addEventListener('click', function autoPlayMusic() {
        bgMusic.play().catch(error => {
            console.log('自动播放失败，需要用户交互:', error);
        });
        // 移除事件监听，只尝试一次
        document.removeEventListener('click', autoPlayMusic);
    }, { once: true });
    
    // 雪花效果函数
    function createSnowflake() {
        const snowflake = document.createElement('div');
        snowflake.className = 'snowflake';
        
        // 随机大小（2-6px）
        const size = Math.random() * 4 + 2;
        snowflake.style.width = size + 'px';
        snowflake.style.height = size + 'px';
        
        // 随机初始位置
        snowflake.style.left = Math.random() * window.innerWidth + 'px';
        snowflake.style.top = '-10px';
        
        // 随机动画时长（5-15秒）
        const duration = Math.random() * 10 + 5;
        snowflake.style.animation = `fall ${duration}s linear infinite`;
        
        // 随机不透明度
        snowflake.style.opacity = Math.random() * 0.8 + 0.2;
        
        document.body.appendChild(snowflake);
        
        // 动画结束后移除
        snowflake.addEventListener('animationend', () => {
            snowflake.remove();
        });
    }
    
    // 开始雪花效果
    function startSnowfall() {
        // 初始创建一批雪花
        for (let i = 0; i < maxSnowflakes; i++) {
            setTimeout(createSnowflake, i * 100);
        }
        
        // 定期创建新雪花
        setInterval(() => {
            if (document.querySelectorAll('.snowflake').length < maxSnowflakes) {
                createSnowflake();
            }
        }, 500);
    }
    
    // 点击进入后开始雪花效果
    entryButton.addEventListener('click', function() {
        setTimeout(startSnowfall, 1000);
        // 同时开始烟花效果
        setTimeout(startFireworks, 2000);
    }, { once: true });
    
    // 烟花效果函数
    function createFirework() {
        // 创建烟花容器
        const container = document.createElement('div');
        container.className = 'firework-container';
        document.body.appendChild(container);
        
        // 随机颜色
        const colors = ['#ff0000', '#ff7f00', '#ffff00', '#00ff00', '#00ffff', '#0000ff', '#8b00ff'];
        const randomColor = colors[Math.floor(Math.random() * colors.length)];
        
        // 随机位置（屏幕两侧）
        const x = Math.random() < 0.5 ? Math.random() * window.innerWidth * 0.3 : window.innerWidth * 0.7 + Math.random() * window.innerWidth * 0.3;
        const y = Math.random() * window.innerHeight * 0.5 + window.innerHeight * 0.2;
        
        // 创建烟花上升阶段
        const firework = document.createElement('div');
        firework.className = 'firework';
        firework.style.left = x + 'px';
        firework.style.top = window.innerHeight + 'px';
        firework.style.background = randomColor;
        firework.style.animation = 'firework-ascend 1s linear forwards';
        container.appendChild(firework);
        
        // 上升动画结束后爆炸
        setTimeout(() => {
            // 移除上升的烟花
            firework.remove();
            
            // 创建爆炸粒子
            const particleCount = 50;
            for (let i = 0; i < particleCount; i++) {
                const particle = document.createElement('div');
                particle.className = 'firework-particle';
                particle.style.left = x + 'px';
                particle.style.top = y + 'px';
                particle.style.background = randomColor;
                
                // 随机角度和距离
                const angle = (i / particleCount) * Math.PI * 2;
                const distance = Math.random() * 150 + 80;
                const targetX = Math.cos(angle) * distance;
                const targetY = Math.sin(angle) * distance;
                
                // 设置CSS变量和动画
                particle.style.setProperty('--target-x', targetX + 'px');
                particle.style.setProperty('--target-y', targetY + 'px');
                particle.style.animation = 'firework-particle-burst 1.5s ease-out forwards';
                
                container.appendChild(particle);
            }
            
            // 移除容器
            setTimeout(() => {
                container.remove();
            }, 2000);
        }, 1000);
    }
    
    // 开始烟花效果
    function startFireworks() {
        // 初始创建一批烟花
        for (let i = 0; i < 5; i++) {
            setTimeout(createFirework, i * 1000);
        }
        
        // 定期创建新烟花
        setInterval(() => {
            createFirework();
        }, 2000);
    }
}