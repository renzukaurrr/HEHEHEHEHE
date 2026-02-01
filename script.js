const herName = "JANELLE"; 

// Set the name across all pages
document.getElementById("herName").textContent = herName;
document.getElementById("herName2").textContent = herName;
if (document.getElementById("herName3")) {
    document.getElementById("herName3").textContent = herName;
}

const music = document.getElementById("bgMusic");
let heartInterval; // Variable to keep track of the background hearts

/**
 * Handles navigation between "pages"
 * Also unlocks audio and starts animations on the first click
 */
function goToPage(pageNumber) {
    // 1. Hide all pages and show the target page
    document.querySelectorAll(".page").forEach(p => p.classList.remove("active"));
    const nextPage = document.getElementById(`page${pageNumber}`);
    if (nextPage) {
        nextPage.classList.add("active");
    }

    // 2. Start Music (Starts on the very first button click)
    if (music) {
        music.volume = 0.5;
        // Browsers require a user click to play audio
        music.play().catch(error => {
            console.log("Autoplay prevented. Waiting for next interaction.");
        });
    }

    // 3. Start Background Hearts (Starts once the "Disguise" is revealed)
    if (pageNumber >= 2 && !heartInterval) {
        heartInterval = setInterval(() => createHeart(false), 500);
    }

    // 4. Final Celebration Explosion
    if (pageNumber === 7) {
        for (let i = 0; i < 60; i++) {
            setTimeout(() => createHeart(true), i * 60);
        }
    }
}

/**
 * "No" Button Escape Logic
 * Moves the button to a random spot on the screen so it can't be clicked
 */
const noBtn = document.getElementById("noBtn");

const moveButton = () => {
    const padding = 50; // Keep button away from screen edges
    const maxX = window.innerWidth - noBtn.offsetWidth - padding;
    const maxY = window.innerHeight - noBtn.offsetHeight - padding;

    const randomX = Math.max(padding, Math.floor(Math.random() * maxX));
    const randomY = Math.max(padding, Math.floor(Math.random() * maxY));

    noBtn.style.position = "fixed";
    noBtn.style.left = `${randomX}px`;
    noBtn.style.top = `${randomY}px`;
};

if (noBtn) {
    // Desktop: Fly away when hovered
    noBtn.addEventListener("mouseenter", moveButton);
    
    // Mobile: Fly away when tapped
    noBtn.addEventListener("touchstart", (e) => {
        e.preventDefault(); // Prevents the actual "click"
        moveButton();
    });
}

/**
 * Creates floating hearts/emojis
 * @param {boolean} isExplosion - If true, hearts are bigger and fall faster
 */
function createHeart(isExplosion) {
    const container = document.getElementById("confetti");
    if (!container) return;

    const piece = document.createElement("span");
    const emojis = ["💖", "💕", "🌸", "❤️", "✨"];

    piece.textContent = emojis[Math.floor(Math.random() * emojis.length)];
    piece.style.left = Math.random() * 100 + "vw";
    piece.style.top = "-5vh"; // Start just off-screen
    piece.style.position = "fixed";
    piece.style.zIndex = "50";
    piece.style.pointerEvents = "none";

    const duration = isExplosion ? (Math.random() * 1.5 + 1) : (Math.random() * 3 + 4);
    piece.style.animation = `fall ${duration}s linear forwards`;
    piece.style.fontSize = isExplosion ? "45px" : "22px";

    container.appendChild(piece);

    // Remove the heart from the DOM once the animation finishes
    setTimeout(() => {
        piece.remove();
    }, duration * 1000);
}
