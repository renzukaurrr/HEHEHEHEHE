const herName = "JANELLE"; // <<< CHANGE THIS

document.getElementById("herName").textContent = herName;
document.getElementById("herName2").textContent = herName;
document.getElementById("herName3").textContent = herName;

const music = document.getElementById("bgMusic");

function goToPage(pageNumber) {
  document.querySelectorAll(".page").forEach(p => p.classList.remove("active"));
  document.getElementById(`page${pageNumber}`).classList.add("active");

  // Start music on first interaction
  if (music.paused) {
    music.volume = 0.5;
    music.play().catch(() => {});
  }

  // Heart confetti on YEHEYYYY
  if (pageNumber === 7) {
    startHearts();
  }
}

// No button escape 😈
const noBtn = document.getElementById("noBtn");
if (noBtn) {
  noBtn.addEventListener("mouseover", () => {
    noBtn.style.position = "absolute";
    noBtn.style.left = Math.random() * (window.innerWidth - 120) + "px";
    noBtn.style.top = Math.random() * (window.innerHeight - 60) + "px";
  });
}

// Heart confetti 💕
function startHearts() {
  const confetti = document.getElementById("confetti");
  confetti.innerHTML = "";

  setInterval(() => {
    const piece = document.createElement("span");

    // Mix of hearts + confetti vibes
    const emojis = ["💖", "💕", "💘", "❤️", "😘"];
    piece.textContent = emojis[Math.floor(Math.random() * emojis.length)];

    piece.style.left = Math.random() * 100 + "vw";
    piece.style.animationDuration = (Math.random() * 2 + 3) + "s";

    confetti.appendChild(piece);

    setTimeout(() => piece.remove(), 5000);
  }, 150);
}

