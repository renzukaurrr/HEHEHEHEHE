const herName = "JANELLE"; 

document.getElementById("herName").textContent = herName;
document.getElementById("herName2").textContent = herName;
document.getElementById("herName3")?.textContent = herName;

const music = document.getElementById("bgMusic");

// Small hearts continuously
window.onload = () => {
    setInterval(() => createHeart(false), 500);
};

// Navigate pages
function goToPage(pageNumber) {
    document.querySelectorAll(".page").forEach(p => p.classList.remove("active"));
    const nextPage = document.getElementById(`page${pageNumber}`);
    if (nextPage) nextPage.classList.add("active");

    if (music && music.paused) {
        music.volume = 0.4;
        music.play().catch(() => {});
    }

    // Final explosion on page 7
    if (pageNumber === 7) {
        for (let i = 0; i < 50; i++) {
            setTimeout(() => createHeart(true), i * 50);
        }
    }

    // Activate moving "No" button on page 6
    if (pageNumber === 6) {
        const noBtn = document.getElementById("noBtn");
        if (noBtn) {
            const moveButton = () => {
                const padding = 20;
                const maxX = window.innerWidth - noBtn.offsetWidth - padding;
                const maxY = window.innerHeight - noBtn.offsetHeight - padding;
                const randomX = Math.floor(Math.random() * maxX);
                const randomY = Math.floor(Math.random() * maxY);
                noBtn.style.left = `${randomX}px`;
                noBtn.style.top = `${randomY}px`;
            };

            // Remove old listeners
            const newBtn = noBtn.cloneNode(true);
            noBtn.parentNode.replaceChild(newBtn, noBtn);

            // Add listeners
            newBtn.addEventListener("mouseenter", moveButton);
            newBtn.addEventListener("touchstart", (e) => {
                e.preventDefault();
                moveButton();
            });
        }
    }
}

// Hearts / confetti
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
