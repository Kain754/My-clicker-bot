let score = 0;

// Обработчик клика
document.getElementById("clickButton").addEventListener("click", () => {
    score++;
    document.getElementById("score").innerText = `Счет: ${score}`;
});

// Интеграция с Telegram Web App API
Telegram.WebApp.ready();

// Получение данных о пользователе
const user = Telegram.WebApp.initDataUnsafe.user;
console.log(user); // Информация о пользователе

// Отправка данных в Telegram
function sendData() {
    Telegram.WebApp.sendData(JSON.stringify({ score: score }));
}
