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
  const hearts = document.getElementById("hearts");

  setInterval(() => {
    const heart = document.createElement("span");
    heart.textContent = "💖";
    heart.style.left = Math.random() * 100 + "vw";
    heart.style.bottom = "0";
    hearts.appendChild(heart);

    setTimeout(() => heart.remove(), 3000);
  }, 200);
}
