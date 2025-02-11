const heartsContainer = document.getElementById("hearts-container");

document.addEventListener("click", (event) => {
    const x = event.clientX;
    const y = event.clientY;

    const heart = document.createElement("div");
    heart.classList.add("heart");
    heart.style.left = `${x - 10}px`;
    heart.style.top = `${y - 10}px`;

    heartsContainer.appendChild(heart);

    const size = Math.floor(Math.random() * 30) + 10; // От 10px до 40px
    heart.style.width = `${size}px`;
    heart.style.height = `${size}px`;

    const colors = ["red", "pink", "orange", "purple"];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    heart.style.backgroundColor = randomColor;

    setTimeout(() => {
        heart.remove();
    }, 5000);
});


