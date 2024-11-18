// Obtendo o contexto do canvas
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Tamanho do canvas
const scale = 20;
canvas.width = 400;
canvas.height = 400;

// Variáveis do jogo
let snake = [{ x: 200, y: 200 }];
let direction = 'right';
let food = generateFood();
let score = 0;

// Função para desenhar a cobrinha e o alimento
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Desenhando a cobrinha
    snake.forEach(segment => {
        ctx.fillStyle = 'green';
        ctx.fillRect(segment.x, segment.y, scale, scale);
    });
    
    // Desenhando o alimento
    ctx.fillStyle = 'red';
    ctx.fillRect(food.x, food.y, scale, scale);
    
    // Mostrando a pontuação
    ctx.fillStyle = 'black';
    ctx.font = '20px Arial';
    ctx.fillText(`Pontuação: ${score}`, 10, 20);
}

// Função para mover a cobrinha
function moveSnake() {
    const head = { ...snake[0] };

    switch (direction) {
        case 'up': head.y -= scale; break;
        case 'down': head.y += scale; break;
        case 'left': head.x -= scale; break;
        case 'right': head.x += scale; break;
    }

    snake.unshift(head);

    // Verificar colisão com o alimento
    if (head.x === food.x && head.y === food.y) {
        score += 10;
        food = generateFood(); // Novo alimento
    } else {
        snake.pop(); // Remover a cauda da cobrinha
    }
}

// Função para gerar o alimento em uma posição aleatória
function generateFood() {
    const x = Math.floor(Math.random() * (canvas.width / scale)) * scale;
    const y = Math.floor(Math.random() * (canvas.height / scale)) * scale;
    return { x, y };
}

// Função para verificar colisões
function checkCollisions() {
    const head = snake[0];
    
    // Colisão com as bordas
    if (head.x < 0 || head.x >= canvas.width || head.y < 0 || head.y >= canvas.height) {
        return true;
    }

    // Colisão com o próprio corpo
    for (let i = 1; i < snake.length; i++) {
        if (head.x === snake[i].x && head.y === snake[i].y) {
            return true;
        }
    }

    return false;
}

// Função para atualizar o jogo
function update() {
    moveSnake();
    if (checkCollisions()) {
        clearInterval(gameInterval); // Parar o jogo
        alert('Game Over! Sua pontuação foi ' + score);
    } else {
        draw();
    }
}

// Capturando as teclas para mudar a direção
document.addEventListener('keydown', event => {
    switch (event.key) {
        case 'ArrowUp': if (direction !== 'down') direction = 'up'; break;
        case 'ArrowDown': if (direction !== 'up') direction = 'down'; break;
        case 'ArrowLeft': if (direction !== 'right') direction = 'left'; break;
        case 'ArrowRight': if (direction !== 'left') direction = 'right'; break;
    }
});

// Intervalo de atualização do jogo
const gameInterval = setInterval(update, 100); // Atualiza a cada 100ms

