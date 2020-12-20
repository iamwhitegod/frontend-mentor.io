const draggables = document.querySelectorAll(".todo");
const form = document.querySelector("#form");
const input = document.querySelector("#todo");
const list = document.querySelector(".todo-list");
const checkboxes = Array.from(document.querySelectorAll("input"));
const todoText = Array.from(document.querySelectorAll(".todo-text"));
const clearCompletedBtn = document.querySelector(".clear-completed");

// Create a new todo
form.addEventListener("submit", (e) => {
  e.preventDefault();

  let newTodo = document.querySelector("#todo").value;

  if (!newTodo) return;

  newTodo = htmlTemp(newTodo);
  list.insertAdjacentHTML("beforeend", newTodo);
  document.querySelector("#todo").value = "";
});

// Clear completed todos
clearCompletedBtn.addEventListener("click", clearCompleted);

// Generates html template for each todo created.
function htmlTemp(text) {
  let markUp = "";
  return (markUp = `
            <li class="todo" draggable="true">
              <label>
                <input type="checkbox" name="light"/>
                <span class="custom-checkbox">
                  <img src="images/icon-check.svg" alt="" />
                </span>
              </label>

              <span class="todo-text">${text}</span>
            </li>
  `);
}

// Adds or remove completed class to completed todo
checkboxes.forEach((input) => {
  input.addEventListener("click", () => {
    if (input.checked) {
      input.parentElement.nextElementSibling.classList.add("completed");
    } else {
      input.parentElement.nextElementSibling.classList.remove("completed");
    }
  });
});

// Clear completed todos
function clearCompleted() {
  checkboxes.forEach((checked) => {
    if (
      checked.parentElement.nextElementSibling.classList.contains("completed")
    ) {
      checked.parentElement.parentElement.remove();
    }
  });
}

console.log(todoText);
