// TODO CONTROLLER
const TODOController = (function () {
  // TODO Constructor function
  const Todo = function (todo, status, id) {
    this.id = id;
    this.todo = todo;
    this.status = status;
  };

  Todo.prototype.getTodos = function () {
    return this.todo;
  };

  Todo.prototype.updateStatus = function (newStatus) {
    if (newStatus) {
      this.status = newStatus;
    } else {
      this.status = false;
    }
  };

  const data = {
    allItems: {
      todos: [
        new Todo("Completed online JavaScript Course", true, 0),
        new Todo("Jog around park 3x", false, 1),
        new Todo("10 minutes meditation", false, 2),
        new Todo("Read for 1 hours", true, 3),
        new Todo("Pick up groceries", false, 4),
        new Todo("Completed Todo app on Frontend Mentor", false, 5),
      ],
    },
  };

  return {
    addItem: function (todo, status) {
      let newItem, ID;

      // 1) Create id
      if (data.allItems.todos.length > 0) {
        ID = data.allItems.todos.length - 1 + 1;
      } else {
        ID = 0;
      }

      // 2) Create new todo
      newItem = new Todo(todo, status, ID);
      console.log(newItem);

      // 3) add new todo to data structure
      data.allItems.todos.push(newItem);
    },
    getTodo: function () {
      return {
        todos: data.allItems.todos,
      };
    },
  };
})();

// UI CONTROLLER
const UIcontroller = (function () {
  const domElem = {
    form: "#form",
    input: "#todo",
    list: ".todo-list",
    todo: ".todo",
    checkboxes: '[type="checkbox"]',
    todoText: ".todo-text",
    clearCompletedBtn: ".clear-completed",
    active: "#active",
    active2: "#active-2",
    count: ".count",
  };

  // Adds draggable  functionality with animated swapping
  new Sortable(document.querySelector(domElem.list), {
    animation: 350,
    chosenClass: "sortable-chosen",
    dragClass: "sortable-drag",
  });

  return {
    getInput: function () {
      return {
        userInput: document.querySelector(domElem.input).value,
      };
    },

    addItemToList: function (obj) {
      console.log(obj);
      let markUp, element;

      // Create html using Template strings
      if (!obj.status) {
        markUp = `
        <li class="todo" draggable="true" id="${obj.id}">
          <label>
            <input type="checkbox" name="light"/>
            <span class="custom-checkbox">
              <img src="images/icon-check.svg" alt="" />
            </span>
          </label>
        
          <span class="todo-text">${obj.todo}</span>
        </li>
        `;
      } else {
        markUp = `
        <li class="todo" draggable="true" id="${obj.id}">
          <label>
            <input type="checkbox" name="light" checked/>
            <span class="custom-checkbox">
              <img src="images/icon-check.svg" alt="" />
            </span>
          </label>
        
          <span class="todo-text completed">${obj.todo}</span>
        </li>
        `;
      }

      element = domElem.list;

      // Insert html to Dom
      document.querySelector(element).insertAdjacentHTML("beforeend", markUp);
    },

    clearFields: function () {
      document.querySelector(domElem.input).value = "";
    },

    itemsLeft: function (todos) {
      let numOfItems, items;
      items = todos.filter((todo) => {
        if (!todo.status) {
          return todo;
        }
      });

      numOfItems = items.length;

      if (numOfItems < 0) numOfItems = 0;

      document.querySelector(domElem.count).textContent =
        numOfItems <= 1
          ? `${numOfItems} item left`
          : `${numOfItems} items left`;
    },

    getDomString: function () {
      return domElem;
    },
  };
})();

//GLOBAL APP CONTROLLER
const controller = (function (TodoCtrl, UICtrl) {
  const setEventListeners = function () {
    const dom = UICtrl.getDomString();

    document.querySelector(dom.form).addEventListener("submit", (e) => {
      e.preventDefault();
    });

    document.querySelector(dom.form).addEventListener("keypress", (e) => {
      if (e.keyCode === 13 || e.which === 13) {
        ctrlAddItem();
        addCompletedClass();
        updateStatus();
      }
    });
  };

  const displayTodos = function () {
    // 1) Get todos
    const todos = TodoCtrl.getTodo().todos;
    // 2) Check if todos is empty
    if (todos.length < 0) return;

    todos.forEach((todo) => {
      // 3) Render UI
      UICtrl.addItemToList(todo);
    });

    // 4) Update count
    UICtrl.itemsLeft(TodoCtrl.getTodo().todos);
  };

  const ctrlAddItem = function () {
    // 1) Get user input
    const todo = UICtrl.getInput();
    // 2) Add item to Todo controller
    TodoCtrl.addItem(todo.userInput, false);
    // 3) Add item to UI
    UICtrl.addItemToList(
      TodoCtrl.getTodo().todos[TodoCtrl.getTodo().todos.length - 1]
    );

    // 4) Clear fields
    UICtrl.clearFields();

    UICtrl.itemsLeft(TodoCtrl.getTodo().todos);
  };

  const updateStatus = function () {
    document
      .querySelectorAll(UICtrl.getDomString().checkboxes)
      .forEach((checkbox) => {
        checkbox.addEventListener("click", () => {
          const id = Number(
            checkbox.parentElement.parentElement.getAttribute("id")
          );

          if (checkbox.checked) {
            console.log(id);
            // 1) Get Todo
            const todo = TodoCtrl.getTodo();
            // 2) Update status
            todo.todos[id].updateStatus(true);
            console.log(todo.todos[id]);

            // 3) Update Count
            UICtrl.itemsLeft(TodoCtrl.getTodo().todos);
          } else {
            // 1) Update status
            TodoCtrl.getTodo().todos[id].updateStatus(false);
            console.log(TodoCtrl.getTodo().todos[id]);

            // 2) Update count
            UICtrl.itemsLeft(TodoCtrl.getTodo().todos);
          }
        });
      });
  };

  const addCompletedClass = function () {
    Array.from(
      document.querySelectorAll(UICtrl.getDomString().checkboxes)
    ).forEach((input) => {
      input.addEventListener("click", () => {
        if (input.checked) {
          input.parentElement.nextElementSibling.classList.add("completed");
        } else {
          input.parentElement.nextElementSibling.classList.remove("completed");
        }
      });
    });
  };

  return {
    init: function () {
      setEventListeners();
      displayTodos();
      addCompletedClass();
      updateStatus();
    },
  };
})(TODOController, UIcontroller);

controller.init();
