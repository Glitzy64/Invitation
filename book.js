const book = document.getElementById("book");
const yesButton = document.getElementById("yesButton");
const noButton = document.getElementById("noButton");
const hint = document.getElementById("hint");
const music = document.getElementById("backgroundMusic");

let noClicks = 0;
let opened = false;

const EMAILJS_PUBLIC_KEY = "BFjMowDGsf1l_Eb";
const EMAILJS_SERVICE_ID = "service_h7frpgp";
const EMAILJS_TEMPLATE_ID = "template_x8ibc85";

if (window.emailjs) {
emailjs.init({ publicKey: EMAILJS_PUBLIC_KEY });
}

const messages = [
"Are you sure, Babu? 🥺",
"Think about it one more time, Liyag 🎀",
"The YES button is getting bigger! 💗",
"Come on, Sofiaaa! 🥹💕",
"I think YES is your answer now! 💌"
];

// Start at the original button size.
yesButton.style.width = "auto";
yesButton.style.minWidth = "100px";
yesButton.style.padding = "12px 20px";
yesButton.style.fontSize = "1rem";
yesButton.style.transform = "none";
yesButton.style.transition =
"width 0.25s ease, padding 0.25s ease, font-size 0.25s ease";

noButton.style.transform = "none";

noButton.addEventListener("click", function () {
if (opened) return;

noClicks++;

// Increase the actual button dimensions on every click.
const size = Math.min(1 + noClicks * 0.3, 3);
yesButton.style.width = "${100 * size}px";
yesButton.style.padding = "${12 * size}px ${20 * size}px";
yesButton.style.fontSize = "${size}rem";

// Shrink the NO button.
const noSize = Math.max(1 - noClicks * 0.08, 0.4);
noButton.style.transform = "scale(${noSize})";

// Loop through all five messages forever.
hint.textContent = messages[(noClicks - 1) % messages.length];
});

yesButton.addEventListener("click", async function () {
if (opened) return;

opened = true;
yesButton.disabled = true;
noButton.disabled = true;

hint.textContent = "Yay! Open your invitation, Babu! 💗";
book.classList.add("open");

if (music) {
try {
music.volume = 0.55;
await music.play();
} catch (error) {
console.warn("Music could not play:", error);
}
}

if (!window.emailjs) {
console.error("EmailJS did not load.");
hint.textContent = "Your invitation is open! 💗";
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

hint.textContent = "Yay! Carlo has been notified! 💗";

} catch (error) {
console.error("Email notification failed:", error);
hint.textContent = "Invitation opened! Email notification failed. 💌";
}
});
