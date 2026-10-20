const book = document.getElementById("book");
const yesButton = document.getElementById("yesButton");
const noButton = document.getElementById("noButton");
const hint = document.getElementById("hint");
const music = document.getElementById("backgroundMusic");

let noClicks = 0;
let opened = false;

// EmailJS configuration
const EMAILJS_PUBLIC_KEY = "BFjMowDGsf1l_Eb";
const EMAILJS_SERVICE_ID = "service_h7frpgp";
const EMAILJS_TEMPLATE_ID = "template_x8ibc85";

// Initialize EmailJS safely
if (window.emailjs) {
emailjs.init({
publicKey: EMAILJS_PUBLIC_KEY
});
}

// NO button: YES grows and NO shrinks
noButton.addEventListener("click", function () {
if (opened) return;

noClicks++;

const yesScale = Math.min(1 + noClicks * 0.45, 4.6);
const noScale = Math.max(1 - noClicks * 0.09, 0.35);

yesButton.style.transform = "scale(${yesScale})";
noButton.style.transform = "scale(${noScale})";

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

// YES button: open the book and play music
yesButton.addEventListener("click", async function () {
if (opened) return;

opened = true;

yesButton.disabled = true;
noButton.disabled = true;

hint.textContent = "Yay! Open your invitation, Babu! 💗";

// Open the book immediately
book.classList.add("open");

// Play music
if (music) {
try {
music.volume = 0.55;
await music.play();
} catch (error) {
console.warn("Music could not play:", error);
}
}

// Send the email separately so it cannot prevent the book from opening
if (!window.emailjs) {
hint.textContent = "The invitation opened! EmailJS did not load. 💌";
return;
}

try {
await emailjs.send(
EMAILJS_SERVICE_ID,
EMAILJS_TEMPLATE_ID,
{
subject: "Sofia pressed YES! 💗",
message: "Sofia pressed YES on the Alviso Family Reunion invitation!",
name: "Sofia",
time: new Date().toLocaleString()
}
);

hint.textContent = "Yay! Invitation opened, and Carlo has been notified! 💗";
console.info("Email notification sent successfully!");

} catch (error) {
console.error("Email notification failed:", error);

hint.textContent =
  "Invitation opened! Email failed: " +
  (error.text || error.message || "Unknown error");

}
});
