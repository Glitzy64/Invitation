
const secretPassword = "lox";

const passwordForm = document.getElementById("passwordForm");
const passwordInput = document.getElementById("password");
const errorMessage = document.getElementById("errorMessage");

passwordForm.addEventListener("submit", function(event) {
  event.preventDefault();

  if (
    passwordInput.value.trim().toLowerCase() === secretPassword
  ) {
    window.location.href = "book.html";
  } else {
    errorMessage.textContent =
      "Not quite, Babu 💗 Try again!";

    passwordInput.value = "";
    passwordInput.focus();
  }
});
