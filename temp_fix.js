// 切换游戏模式
function switchMode(mode) {
    gameState.mode = mode;
    
    // 更新按钮状态
    document.querySelectorAll('.mode-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    document.querySelector(`[data-mode="${mode}"]`).classList.add('active');
    
    // 显示/隐藏相关元素
    const gameElements = ['targetSection', 'shanghanSection', 'handSection', 'deckSection', 'discardPile'];
    const searchBox = document.getElementById('searchBox');
    const learnContent = document.getElementById('learnContent');
    const vsModeContainer = document.getElementById('vs-mode-container');
    
    if (mode === 'game' || mode === 'challenge') {
        gameElements.forEach(id => document.getElementById(id).style.display = 'block');
        searchBox.style.display = 'none';
        learnContent.style.display = 'none';
        if (vsModeContainer) {
            vsModeContainer.style.display = 'none';
        }
        
        // 初始化中药待选池
        initializeHerbPool();
        
        startNewGame();
    } else if (mode === 'learn') {
        gameElements.forEach(id => document.getElementById(id).style.display = 'none');
        searchBox.style.display = 'block';
        learnContent.style.display = 'block';
        if (vsModeContainer) {
            vsModeContainer.style.display = 'none';
        }
        enterLearnMode();
    } else if (mode === 'vs') {
        gameElements.forEach(id => document.getElementById(id).style.display = 'none');
        searchBox.style.display = 'none';
        learnContent.style.display = 'none';
        if (vsModeContainer) {
            vsModeContainer.style.display = 'block';
        }
        startNewGame();
    }
    
    showMessage(`切换到${mode === 'game' ? '游戏' : mode === 'learn' ? '学习' : mode === 'challenge' ? '挑战' : '对战'}模式`, 'info');
}

// ============== 核心游戏逻辑 ==============

// 调试功能：测试对战模式
function testVsMode() {
    console.log('进入对战模式测试...');
    switchMode('vs');
    
    // 添加一些调试日志
    setTimeout(() => {
        console.log('游戏状态:', gameState.vs);
    }, 1000);
}

// 开始新游戏
function startNewGame() {
    gameState.stats.totalGames++;
    gameState.stats.startTime = Date.now();
    
    // 根据模式设置初始状态
    if (gameState.mode === 'challenge') {
        gameState.lives = 5;
        gameState.challenge.timeLimit = 300; // 5分钟
        gameState.challenge.moveLimit = 50; // 最多50步
    } else if (gameState.mode === 'vs') {
        // 初始化对战模式
        initVsMode();
        return; // 对战模式有自己的初始化流程
    } else {
        gameState.lives = 5;
    }