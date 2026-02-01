const herName = "JANELLE"; 

document.getElementById("herName").textContent = herName;
document.getElementById("herName2").textContent = herName;

const music = document.getElementById("bgMusic");

window.onload = () => {
    setInterval(() => createHeart(false), 500);
};

function goToPage(pageNumber) {
    document.querySelectorAll(".page").forEach(p => p.classList.remove("active"));
    const nextPage = document.getElementById(`page${pageNumber}`);
    if (nextPage) nextPage.classList.add("active");

    if (music && music.paused) {
        music.volume = 0.4;
        music.play().catch(() => {});
    }

    if (pageNumber === 7) {
        for (let i = 0; i < 50; i++) {
            setTimeout(() => createHeart(true), i * 50);
        }
    }
}

// NO BUTTON ESCAPE LOGIC
const noBtn = document.getElementById("noBtn");

const moveButton = () => {
    const padding = 50;
    const maxX = window.innerWidth - noBtn.offsetWidth - padding;
    const maxY = window.innerHeight - noBtn.offsetHeight - padding;

    const randomX = Math.max(padding, Math.floor(Math.random() * maxX));
    const randomY = Math.max(padding, Math.floor(Math.random() * maxY));

    noBtn.style.position = "fixed";
    noBtn.style.left = `${randomX}px`;
    noBtn.style.top = `${randomY}px`;
};

if (noBtn) {
    noBtn.addEventListener("mouseenter", moveButton);
    noBtn.addEventListener("touchstart", (e) => {
        e.preventDefault();
        moveButton();
    });
}

function createHeart(isExplosion) {
    const confetti = document.getElementById("confetti");
    const piece = document.createElement("span");
    const emojis = ["💖", "💕", "🌸", "❤️", "✨"];

    piece.textContent = emojis[Math.floor(Math.random() * emojis.length)];
    piece.style.left = Math.random() * 100 + "vw";
    piece.style.top = "-5vh";

    const duration = isExplosion ? (Math.random() * 2 + 1) : (Math.random() * 3 + 4);
    piece.style.animationDuration = duration + "s";
    piece.style.fontSize = isExplosion ? "40px" : "20px";

    confetti.appendChild(piece);
    setTimeout(() => piece.remove(), duration * 1000);
}
