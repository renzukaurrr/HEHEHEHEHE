const herName = "JANELLE"; 

// Fill all name placeholders
document.getElementById("herName").textContent = herName;
document.getElementById("herName2").textContent = herName;
document.getElementById("herName3")?.textContent = herName; // optional in case herName3 exists

const music = document.getElementById("bgMusic");

// Start small hearts immediately for "vibes"
window.onload = () => {
    setInterval(() => createHeart(false), 500);

    // Initialize the No button escape AFTER page loads
    const noBtn = document.getElementById("noBtn");

    if (noBtn) {
        // Function to move button within screen bounds
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
        noBtn.addEventListener("mouseover", moveButton);

        // Mobile tap
        noBtn.addEventListener("touchstart", (e) => {
            e.preventDefault(); // Prevent the click from actually happening
            moveButton();
        });
    }
};

// Navigate between pages
function goToPage(pageNumber) {
    document.querySelectorAll(".page").forEach(p => p.classList.remove("active"));
    const nextPage = document.getElementById(`page${pageNumber}`);
    if (nextPage) nextPage.classList.add("active");

    // Play background music if paused
    if (music && music.paused) {
        music.volume = 0.4;
        music.play().catch(() => {});
    }

    // Final explosion of hearts on last page
    if (pageNumber === 7) {
        for(let i=0; i<50; i++) {
            setTimeout(() => createHeart(true), i * 50);
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
    
    // Animation duration
    const duration = isExplosion ? (Math.random() * 2 + 1) : (Math.random() * 3 + 4);
    piece.style.animationDuration = duration + "s";
    piece.style.fontSize = isExplosion ? "40px" : "20px";
    
    confetti.appendChild(piece);
    setTimeout(() => piece.remove(), duration * 1000);
}
