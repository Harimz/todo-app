const form = document.querySelector("form");
const input = document.querySelector("input");
const list = document.querySelector(".list");

class Todo {
  id = (Date.now() + "").slice(-10);
  isFinished = false;

  constructor(todo) {
    this.todo = todo;
  }

  _markAsFinished() {}
}

class App {
  #todos = [];

  constructor() {
    form.addEventListener("submit", this._createTodo.bind(this));
  }

  _createTodo(e) {
    e.preventDefault();

    const userInput = input.value;

    const newTodo = new Todo(userInput);

    this.#todos.push(newTodo);

    this._clearInput();

    this._renderTodo(newTodo);
  }

  _renderTodo(newTodo) {
    const html = `
      <li class="todo" data-id="${newTodo.id}">
        <p>${newTodo.todo}</p>

        <button>Check</button>
      </li>
    `;

    form.insertAdjacentHTML("afterend", html);
  }

  _clearInput() {
    input.value = "";
  }
}

const app = new App();
