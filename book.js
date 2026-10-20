
const book = document.getElementById("book");
const yesButton = document.getElementById("yesButton");
const noButton = document.getElementById("noButton");
const hint = document.getElementById("hint");
const music = document.getElementById("backgroundMusic");

let noClicks = 0;
let opened = false;

noButton.addEventListener("click", function() {
  if (opened) return;

  noClicks++;

  // YES grows with every NO click.
  const yesScale = Math.min(1 + noClicks * 0.45, 4.6);

  // NO becomes smaller with every click.
  const noScale = Math.max(1 - noClicks * 0.09, 0.35);

  yesButton.style.transform = `scale(${yesScale})`;
  noButton.style.transform = `scale(${noScale})`;

  const messages = [
    "Are you sure, Babu? 🥺",
    "Think about it one more time, Liyag 🎀",
    "The YES button is getting bigger! 💗",
    "Come on, Sofiaaa! 🥹💕",
    "I think YES is your answer now! 💌"
  ];

  hint.textContent =
    messages[Math.min(noClicks - 1, messages.length - 1)];
});

yesButton.addEventListener("click", async function() {
  if (opened) return;

  opened = true;

  yesButton.disabled = true;
  noButton.disabled = true;

  hint.textContent = "Yay! Open your invitation, Babu! 💗";

  // Browsers may require a user click before music can play.
  if (music) {
    try {
      music.volume = 0.55;
      await music.play();
    } catch (error) {
      // The book still opens if music is missing or blocked.
    }
  }

  book.classList.add("open");
});
