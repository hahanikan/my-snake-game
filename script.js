const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const gridSize = 20;
const tileCount = canvas.width / gridSize;

let snake = [{x: 10, y: 10}];
let direction = {x: 0, y: 0};
let food = {x: Math.floor(Math.random() * tileCount), y: Math.floor(Math.random() * tileCount)};
let score = 0;

function gameLoop() {
    update();
    draw();
    setTimeout(gameLoop, 100);
}

function update() {
    const head = {x: snake[0].x + direction.x, y: snake[0].y + direction.y};

    // 检查碰撞
    if (head.x < 0 || head.x >= tileCount || head.y < 0 || head.y >= tileCount || 
        snake.some(segment => segment.x === head.x && segment.y === head.y)) {
        resetGame();
        return;
    }

    snake.unshift(head);

    // 检查是否吃到食物
    if (head.x === food.x && head.y === food.y) {
        score++;
        placeFood();
    } else {
        snake.pop();
    }
}

function draw() {
    // 清空画布
    ctx.fillStyle = '#fff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // 绘制蛇
    ctx.fillStyle = 'green';
    snake.forEach(segment => {
        ctx.fillRect(segment.x * gridSize, segment.y * gridSize, gridSize, gridSize);
    });

    // 绘制食物
    ctx.fillStyle = 'red';
    ctx.fillRect(food.x * gridSize, food.y * gridSize, gridSize, gridSize);

    // 绘制分数
    ctx.fillStyle = '#333';
    ctx.font = '20px Arial';
    ctx.fillText(`分数: ${score}`, 10, 30);
}

function placeFood() {
    food = {
        x: Math.floor(Math.random() * tileCount),
        y: Math.floor(Math.random() * tileCount)
    };
    // 确保食物不会生成在蛇身上
    while (snake.some(segment => segment.x === food.x && segment.y === food.y)) {
        placeFood();
    }
}

function resetGame() {
    snake = [{x: 10, y: 10}];
    direction = {x: 0, y: 0};
    score = 0;
    placeFood();
}

window.addEventListener('keydown', e => {
    switch (e.key) {
        case 'ArrowUp':
            if (direction.y === 0) direction = {x: 0, y: -1};
            break;
        case 'ArrowDown':
            if (direction.y === 0) direction = {x: 0, y: 1};
            break;
        case 'ArrowLeft':
            if (direction.x === 0) direction = {x: -1, y: 0};
            break;
        case 'ArrowRight':
            if (direction.x === 0) direction = {x: 1, y: 0};
            break;
    }
});

placeFood();
gameLoop();