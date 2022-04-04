const form = document.querySelector("form");
const input = document.querySelector("input");
const list = document.querySelector(".list");
const button = document.querySelector(".btn");

class Todo {
  id = (Date.now() + "").slice(-10);
  isChecked = false;

  constructor(todo) {
    this.todo = todo;
  }
}

class App {
  #todos = [];

  constructor() {
    form.addEventListener("submit", this._createTodo.bind(this));

    this._loadTodos();

    list.addEventListener("click", this._markAsChecked.bind(this));
  }

  _createTodo(e) {
    e.preventDefault();

    const userInput = input.value;

    const newTodo = new Todo(userInput);

    this.#todos.push(newTodo);

    this._clearInput();

    this._renderTodo(newTodo);

    this._storeTodos();
  }

  _renderTodo(newTodo) {
    const html = `
      <li class="todo ${newTodo.isChecked && "checked"}" data-id="${
      newTodo.id
    }">
        <p>${newTodo.todo}</p>

        <button class="btn">Check</button>
      </li>
    `;

    list.innerHTML += html;
  }

  _clearInput() {
    input.value = "";
  }

  _markAsChecked(e) {
    const todoEl = e.target;

    if (todoEl.tagName === "BUTTON") {
      const parentEl = todoEl.closest("li");
      parentEl.classList.toggle("checked");

      const todoIndex = this.#todos.findIndex(
        (todo) => todo.id === parentEl.dataset.id
      );

      this.#todos[todoIndex].isChecked = !this.#todos[todoIndex].isChecked;

      this._storeTodos();
    }
  }

  _storeTodos() {
    localStorage.setItem("todos", JSON.stringify(this.#todos));
  }

  _loadTodos() {
    const data = JSON.parse(localStorage.getItem("todos"));

    if (!data) return;

    this.#todos = data;

    this.#todos.forEach((todo) => {
      this._renderTodo(todo);
    });
  }
}

const app = new App();
