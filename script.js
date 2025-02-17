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

    return event.clientX || (event.touches && event.touches[0].clientX);

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

        playerX += moveX * 0.05; // Масштабируем скорость перемещения

        if (playerX < 0) playerX = 0;

        if (playerX > window.innerWidth - 40) playerX = window.innerWidth - 40;

        player.style.left = `${playerX}px`;



        joystickStartX = getClientX(event);

    }

}



function endDrag(event) {

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

joystick.addEventListener("touchstart", startDrag);

joystick.addEventListener("touchmove", drag);

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

    smiley.style.left = ${Math.random() * (window.innerWidth - 30)}px;

    smiley.style.top = "-30px";



    smileysContainer.appendChild(smiley);



    // Анимация падения смайлика

    const fallInterval = setInterval(() => {

        if (!gameActive) {

            clearInterval(fallInterval);

            return;

        }



        const top = parseFloat(smiley.style.top);

        smiley.style.top = ${top + 2}px;



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

                scoreElement.textContent = Очки: ${score};

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

    heart.style.left = ${x - 10}px;

    heart.style.top = ${y - 10}px;



    heartsContainer.appendChild(heart);



    // Анимация подъема сердечка

    const riseInterval = setInterval(() => {

        if (!gameActive) {

            clearInterval(riseInterval);

            return;

        }



        const top = parseFloat(heart.style.top);

        heart.style.top = ${top - 2}px;



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

    scoreElement.textContent = Очки: ${score};

    smileyInterval = setInterval(createSmiley, 1000);

    heartInterval = setInterval(() => {

        if (gameActive) {

            createHeart(playerX + 20, window.innerHeight - 60);

        }

    }, 1000);

});



// Запуск игры

smileyInterval = setInterval(createSmiley, 1000);

