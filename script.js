const herName = "JANELLE"; 

document.getElementById("herName").textContent = herName;
document.getElementById("herName2").textContent = herName;
document.getElementById("herName3")?.textContent = herName;

const music = document.getElementById("bgMusic");

// Start small hearts
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

    // Final explosion of hearts
    if (pageNumber === 7) {
        for (let i = 0; i < 50; i++) {
            setTimeout(() => createHeart(true), i * 50);
        }
    }

    // Initialize No button escape **only on page6**
    if (pageNumber === 6) {
        const noBtn = document.getElementById("noBtn");

        if (noBtn) {
            noBtn.style.zIndex = 1001; // on top

            const moveButton = () => {
                const padding = 20;
                const maxX = window.innerWidth - noBtn.offsetWidth - padding;
                const maxY = window.innerHeight - noBtn.offsetHeight - padding;

                const randomX = Math.floor(Math.random() * maxX);
                const randomY = Math.floor(Math.random() * maxY);

                noBtn.style.position = "fixed";
                noBtn.style.left = `${randomX}px`;
                noBtn.style.top = `${randomY}px`;
            };

            // Desktop hover
            noBtn.addEventListener("mouseenter", moveButton);
            // Mobile tap
            noBtn.addEventListener("touchstart", (e) => {
                e.preventDefault();
                moveButton();
            });
        }
    }
}

// Confetti / hearts
function createHeart(isExplosion) {
    const confetti = document.getElementById("confetti");
    const piece = document.createElement("span");
    const emojis = ["💖", "💕", "🌸", "❤️", "✨"];

    piece.textContent = emojis[Math.floor(Math.random() * emojis.length)];
    piece.style.left = Math.random() * 100 + "vw";

    const duration = isExplosion ? (Math.random() * 2 + 1) : (Math.random() * 3 + 4);
    piece.style.animationDuration = duration + "s";
    piece.style.fontSize = isExplosion ? "40px" : "20px";

    confetti.appendChild(piece);
    setTimeout(() => piece.remove(), duration * 1000);
}
