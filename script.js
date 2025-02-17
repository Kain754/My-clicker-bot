// Элементы игры
const smileysContainer = document.getElementById("smileys-container");
const heartsContainer = document.getElementById("hearts-container");
const gameOverDiv = document.getElementById("game-over");
const restartButton = document.getElementById("restart-button");
const scoreElement = document.getElementById("score");
const player = document.getElementById("player");
const joystick = document.getElementById("joystick");
const joystickContainer = document.getElementById("joystick-container");

// Переменные игры
let gameActive = true;
let smileyInterval;
let heartInterval;
let score = 0;

// Массив с разными смайликами
const happySmileys = ["😊", "😍", "😎", "🥰", "🤗", "😇", "😳"];

// Позиция игрока
let playerX = window.innerWidth / 2 - 20; // Начальная позиция по центру
player.style.left = `${playerX}px`;

// Управление джойстиком
let isDragging = false;
let joystickStartX = 0;
let joystickOffsetX = 0;

// Функция для получения координат касания (поддержка мыши и тач)
function getClientX(event) {
    return event.clientX || (event.touches && event.touches[0].clientX) || 0;
}

function startDrag(event) {
    isDragging = true;
    joystickStartX = getClientX(event);
}

function drag(event) {
    if (isDragging) {
        const moveX = getClientX(event) - joystickStartX;
        joystickOffsetX = moveX;

        // Ограничение перемещения джойстика в пределах контейнера
        const maxOffset = joystickContainer.offsetWidth / 2 - joystick.offsetWidth / 2;
        if (joystickOffsetX < -maxOffset) joystickOffsetX = -maxOffset;
        if (joystickOffsetX > maxOffset) joystickOffsetX = maxOffset;

        joystick.style.transform = `translateX(${joystickOffsetX}px)`;

        // Перемещение игрока
        playerX += moveX * 0.2; // Увеличиваем скорость перемещения
        if (playerX < 0) playerX = 0;
        if (playerX > window.innerWidth - 40) playerX = window.innerWidth - 40;
        player.style.left = `${playerX}px`;

        joystickStartX = getClientX(event);
    }
}

function endDrag() {
    isDragging = false;
    joystickOffsetX = 0;
    joystick.style.transform = `translateX(0)`;
}

// Mouse events
joystick.addEventListener("mousedown", startDrag);
joystick.addEventListener("mousemove", drag);
joystick.addEventListener("mouseup", endDrag);
joystick.addEventListener("mouseleave", endDrag); // optional: release on mouse leave

// Touch events
joystick.addEventListener("touchstart", (event) => {
    event.preventDefault(); // Предотвращаем скролл
    startDrag(event);
});
joystick.addEventListener("touchmove", (event) => {
    event.preventDefault(); // Предотвращаем скролл
    drag(event);
});
joystick.addEventListener("touchend", endDrag);
joystick.addEventListener("touchcancel", endDrag);

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

// Остальной код (createHeart, checkCollision, endGame, restartButton) остается без изменений
