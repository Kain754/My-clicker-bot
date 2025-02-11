const heartsContainer = document.getElementById("hearts-container");

document.addEventListener("click", (event) => {
    const x = event.clientX;
    const y = event.clientY;

    // Создаем сердечко
    const heart = document.createElement("div");
    heart.classList.add("heart");

    // Случайный размер (от 10px до 40px)
    const size = Math.floor(Math.random() * 30) + 10; // От 10 до 40
    heart.style.width = `${size}px`;
    heart.style.height = `${size}px`;

    // Случайный цвет
    const colors = ["#FF6B6B", "#FF9F68", "#FFD166", "#A8E6CF", "#84DCC6", "#6B5B95", "#FF6F61"];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    heart.style.backgroundColor = randomColor;

    // Позиционируем сердечко
    heart.style.left = `${x - size / 2}px`; // Центрируем по X
    heart.style.top = `${y - size / 2}px`; // Центрируем по Y

    // Добавляем сердечко в контейнер
    heartsContainer.appendChild(heart);

    // Удаляем сердечко через 5 секунд
    setTimeout(() => {
        heart.remove();
    }, 5000); // 5000 мс = 5 секунд
});
