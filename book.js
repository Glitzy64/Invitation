```javascript
(() => {
  const book = document.getElementById("book");
  const yesButton = document.getElementById("yesButton");
  const noButton = document.getElementById("noButton");
  const hint = document.getElementById("hint");
  const music = document.getElementById("backgroundMusic");

  // Stop safely if the required page elements are missing.
  if (!book || !yesButton || !noButton || !hint) {
    console.error("A required invitation element is missing.");
    return;
  }

  // EmailJS configuration.
  const EMAILJS_PUBLIC_KEY = "BFjMowDGsf1l_Eb";
  const EMAILJS_SERVICE_ID = "service_h7frpgp";
  const EMAILJS_TEMPLATE_ID = "template_x8ibc85";

  let noClicks = 0;
  let opened = false;
  let emailJSReady = false;

  const messages = [
    "Are you sure, Babu? 🥺",
    "Think about it one more time, Liyag 🎀",
    "The YES button is getting bigger! 💗",
    "Come on, Sofiaaa! 🥹💕",
    "I think YES is your answer now! 💌",
    "Babu naman ohhh 😭💗",
    "That NO button is looking suspicious... 👀",
    "I'll keep asking nicely, Liyag. 🎀",
    "Panget mo ka-bonding! Charot. 🥹",
    "One little YES would make me smile. 💕"
  ];

  // Initialize EmailJS if its library loaded.
  if (window.emailjs) {
    try {
      window.emailjs.init({
        publicKey: EMAILJS_PUBLIC_KEY
      });
      emailJSReady = true;
    } catch (error) {
      console.error("EmailJS initialization failed:", error);
    }
  }

  // Start with the intended button sizes.
  yesButton.style.width = "112px";
  yesButton.style.minWidth = "112px";
  yesButton.style.padding = "12px 20px";
  yesButton.style.fontSize = "16px";

  noButton.addEventListener("click", () => {
    if (opened) return;

    noClicks++;

    // Grow YES with each NO click, up to a reasonable maximum.
    const scale = Math.min(1 + noClicks * 0.22, 2.8);
    yesButton.style.width = `${112 * scale}px`;
    yesButton.style.minWidth = `${112 * scale}px`;
    yesButton.style.padding =
      `${12 * scale}px ${20 * scale}px`;
    yesButton.style.fontSize = `${16 * scale}px`;

    // Gradually shrink NO without making it impossible to click.
    const noScale = Math.max(1 - noClicks * 0.06, 0.55);
    noButton.style.transform = `scale(${noScale})`;

    // Cycle through all messages repeatedly.
    hint.textContent = messages[(noClicks - 1) % messages.length];
  });

  yesButton.addEventListener("click", async () => {
    if (opened) return;

    opened = true;
    yesButton.disabled = true;
    noButton.disabled = true;

    hint.textContent = "Yay! Opening your invitation, Babu! 💗";
    book.classList.add("open");

    // Browsers generally allow audio after a user taps YES.
    if (music) {
      try {
        music.volume = 0.55;
        await music.play();
      } catch (error) {
        console.warn("Music playback failed:", error);
      }
    }

    // Send the notification if EmailJS is available.
    if (!emailJSReady || !window.emailjs) {
      hint.textContent =
        "Your invitation is open! Email notification isn't available right now. 💌";
      return;
    }

    try {
      await window.emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          subject: "Sofia pressed YES! 💗",
          message:
            "Sofia pressed YES on Carlo's Alviso Family Reunion invitation!",
          name: "Sofia",
          time: new Date().toLocaleString()
        }
      );

      hint.textContent =
        "Yay! Your invitation is open, and Carlo has been notified! 💗";
    } catch (error) {
      console.error("Email notification failed:", error);

      hint.textContent =
        "The book is open! But the email notification couldn't be sent. 💌";
    }
  });

  // Falling hearts on the invitation page.
  const heartContainer = document.querySelector(".floating-hearts");
  const heartEmojis = ["💗", "💕", "💖", "🎀", "🌸"];

  if (heartContainer) {
    function createHeart() {
      const heart = document.createElement("span");

      heart.textContent =
        heartEmojis[Math.floor(Math.random() * heartEmojis.length)];

      heart.style.left = `${Math.random() * 100}vw`;
      heart.style.fontSize = `${14 + Math.random() * 16}px`;
      heart.style.animationDuration = `${5 + Math.random() * 5}s`;

      heartContainer.appendChild(heart);

      window.setTimeout(() => heart.remove(), 10000);
    }

    createHeart();
    window.setInterval(createHeart, 600);
  }
})();
```
