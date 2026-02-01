const herName = "JANELLE"; 

document.getElementById("herName").textContent = herName;
document.getElementById("herName2").textContent = herName;
document.getElementById("herName3").textContent = herName;

const music = document.getElementById("bgMusic");

// Start small hearts immediately for "vibes"
window.onload = () => {
    setInterval(() => createHeart(false), 500);
};

function goToPage(pageNumber) {
    document.querySelectorAll(".page").forEach(p => p.classList.remove("active"));
    document.getElementById(`page${pageNumber}`).classList.add("active");

    if (music && music.paused) {
        music.volume = 0.4;
        music.play().catch(() => {});
    }

    if (pageNumber === 7) {
        // Explode with tons of hearts!
        for(let i=0; i<50; i++) {
            setTimeout(() => createHeart(true), i * 50);
        }
    }
}

function createHeart(isExplosion) {
    const confetti = document.getElementById("confetti");
    const piece = document.createElement("span");
    const emojis = ["💖", "💕", "🌸", "❤️", "✨"];
    
    piece.textContent = emojis[Math.floor(Math.random() * emojis.length)];
    piece.style.left = Math.random() * 100 + "vw";
    
    // If it's the final explosion, make them fall faster and more varied
    const duration = isExplosion ? (Math.random() * 2 + 1) : (Math.random() * 3 + 4);
    piece.style.animationDuration = duration + "s";
    piece.style.fontSize = isExplosion ? "40px" : "20px";
    
    confetti.appendChild(piece);
    setTimeout(() => piece.remove(), duration * 1000);
}

// No button escape 😈
const noBtn = document.getElementById("noBtn");
if (noBtn) {
    noBtn.addEventListener("mouseover", () => {
        const x = Math.random() * (window.innerWidth - 150);
        const y = Math.random() * (window.innerHeight - 50);
        noBtn.style.position = "fixed";
        noBtn.style.left = x + "px";
        noBtn.style.top = y + "px";
    });
}
