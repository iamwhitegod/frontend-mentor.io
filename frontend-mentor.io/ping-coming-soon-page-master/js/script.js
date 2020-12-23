const form = document.getElementById("form");
const formCtrl = document.querySelector(".form-ctrl");
const email = document.querySelector(".input-field");
const btn = document.querySelector(".btn");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  validateUserInput();
});

function validateUserInput() {
  if (email.value === "") {
    formCtrl.classList.add("error");
    formCtrl.querySelector("span").textContent =
      "Please provide a valid email address";
  } else {
    formCtrl.classList.remove("error");
  }
}
