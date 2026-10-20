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

// Initialize EmailJS
if (window.emailjs) {
emailjs.init({ publicKey: EMAILJS_PUBLIC_KEY });
}

// Messages repeat in a loop
const messages = [
"Are you sure, Babu? 🥺",
"Think about it one more time, Liyag 🎀",
"The YES button is getting bigger! 💗",
"Come on, Sofiaaa! 🥹💕",
"I think YES is your answer now! 💌"
];

// NO button: grow YES, shrink NO, loop messages
noButton.addEventListener("click", function () {
if (opened) return;

noClicks++;

const yesScale = Math.min(1 + noClicks * 0.35, 3.5);
const noScale = Math.max(1 - noClicks * 0.08, 0.4);

yesButton.style.setProperty("transform", "scale(${yesScale})", "important");
yesButton.style.setProperty("transform-origin", "center", "important");
yesButton.style.setProperty("position", "relative", "important");
yesButton.style.setProperty("z-index", "20", "important");

noButton.style.setProperty("transform", "scale(${noScale})", "important");
noButton.style.setProperty("transform-origin", "center", "important");

// Loop through all messages forever
hint.textContent = messages[(noClicks - 1) % messages.length];
});

// YES button: open the book, play music, send email
yesButton.addEventListener("click", async function () {
if (opened) return;

opened = true;
yesButton.disabled = true;
noButton.disabled = true;

hint.textContent = "Yay! Open your invitation, Babu! 💗";

// Open the book
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

// Send email notification
if (!window.emailjs) {
hint.textContent = "The invitation opened, but EmailJS didn't load. 💌";
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

hint.textContent = "Invitation opened! Carlo has been notified! 💗";

} catch (error) {
console.error("Email notification failed:", error);
hint.textContent = "Invitation opened! Email notification failed. 💌";
}
});
