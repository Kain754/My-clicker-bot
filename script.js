const smileysContainer = document.getElementById("smileys-container");
const heartsContainer = document.getElementById("hearts-container");
const gameOverDiv = document.getElementById("game-over");
const restartButton = document.getElementById("restart-button");
const scoreElement = document.getElementById("score");
const player = document.getElementById("player");

let gameActive = true;
let smileyInterval;
let heartInterval;
let score = 0;

// Массив с разными смайликами
const happySmileys = ["😊", "😍", "😎", "🥰", "🤗", "😇", "😳"];

// Позиция игрока
let playerX = window.innerWidth / 2 - 20; // Начальная позиция по центру
player.style.left = `${playerX}px`;

// Управление перемещением игрока
let isDragging = false;
let startX = 0;

document.addEventListener("mousedown", (event) => {
    isDragging = true;
    startX = event.clientX;
});

document.addEventListener("mousemove", (event) => {
    if (isDragging) {
        const moveX = event.clientX - startX;
        playerX += moveX;

        // Ограничение перемещения в пределах экрана
        if (playerX < 0) playerX = 0;
        if (playerX > window.innerWidth - 40) playerX = window.innerWidth - 40;

        player.style.left = `${playerX}px`;
        startX = event.clientX;
    }
});

document.addEventListener("mouseup", () => {
    isDragging = false;
});

// Автоматическая стрельба сердечками
heartInterval = setInterval(() => {
    if (gameActive) {
        createHeart(playerX + 20, window.innerHeight - 60);
    }
}, 1000);

// Функция для создания недовольного смайлика
function createSmiley() {
    if (!gameActive) return;

    const smiley = document.createElement("div");
    smiley.classList.add("smiley");
    smiley.textContent = "😠";
    smiley.style.left = `${Math.random() * (window.innerWidth - 30)}px`;
    smiley.style.top = "-30px";

    smileysContainer.appendChild(smiley);

    // Анимация падения смайлика
    const fallInterval = setInterval(() => {
        if (!gameActive) {
            clearInterval(fallInterval);
            return;
        }

        const top = parseFloat(smiley.style.top);
        smiley.style.top = `${top + 2}px`;

        // Проверка на достижение низа экрана
        if (top > window.innerHeight) {
            clearInterval(fallInterval);
            endGame();
        }

        // Проверка на столкновение с сердечками
        const hearts = document.querySelectorAll(".heart");
        hearts.forEach(heart => {
            if (checkCollision(smiley, heart)) {
                // Случайный выбор смайлика
                const randomSmiley = happySmileys[Math.floor(Math.random() * happySmileys.length)];
                smiley.textContent = randomSmiley;
                smiley.style.color = "green";
                clearInterval(fallInterval);
                setTimeout(() => smiley.remove(), 3000);

                // Удаление сердечка
                heart.remove();

                // Увеличение счетчика очков
                score++;
                scoreElement.textContent = `Очки: ${score}`;
            }
        });
    }, 20);
}

// Функция для создания сердечка
function createHeart(x, y) {
    if (!gameActive) return;

    const heart = document.createElement("div");
    heart.classList.add("heart");
    heart.textContent = "❤️";
    heart.style.left = `${x - 10}px`;
    heart.style.top = `${y - 10}px`;

    heartsContainer.appendChild(heart);

    // Анимация подъема сердечка
    const riseInterval = setInterval(() => {
        if (!gameActive) {
            clearInterval(riseInterval);
            return;
        }

        const top = parseFloat(heart.style.top);
        heart.style.top = `${top - 2}px`;

        // Удаление сердечка при достижении верха экрана
        if (top < -20) {
            clearInterval(riseInterval);
            heart.remove();
        }
    }, 20);
}

// Функция для проверки столкновений
function checkCollision(element1, element2) {
    const rect1 = element1.getBoundingClientRect();
    const rect2 = element2.getBoundingClientRect();

    return (
        rect1.left < rect2.right &&
        rect1.right > rect2.left &&
        rect1.top < rect2.bottom &&
        rect1.bottom > rect2.top
    );
}

// Функция для завершения игры
function endGame() {
    gameActive = false;
    clearInterval(smileyInterval);
    clearInterval(heartInterval);
    gameOverDiv.classList.remove("hidden");
}

// Обработчик кнопки "Заново"
restartButton.addEventListener("click", () => {
    gameActive = true;
    smileysContainer.innerHTML = "";
    heartsContainer.innerHTML = "";
    gameOverDiv.classList.add("hidden");
    score = 0;
    scoreElement.textContent = `Очки: ${score}`;
    smileyInterval = setInterval(createSmiley, 1000);
    heartInterval = setInterval(() => {
        if (gameActive) {
            createHeart(playerX + 20, window.innerHeight - 60);
        }
    }, 1000);
});

// Запуск игры
smileyInterval = setInterval(createSmiley, 1000);
