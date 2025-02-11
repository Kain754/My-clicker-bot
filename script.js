const heartsContainer = document.getElementById("hearts-container");

document.addEventListener("click", (event) => {
    const x = event.clientX;
    const y = event.clientY;

    const heart = document.createElement("div");
    heart.classList.add("heart");
    heart.style.left = `${x - 10}px`;
    heart.style.top = `${y - 10}px`;

    heartsContainer.appendChild(heart);

    setTimeout(() => {
        heart.remove();
    }, 5000);
});
