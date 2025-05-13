export default class Todo {
  constructor(data, selector) {
    this._data = data;
    this._selector = selector;
  }

  _setEventListeners() {
    this._element
      .querySelector(".todo__delete-button")
      .addEventListener("click", () => this._element.remove());

    const checkbox = this._element.querySelector(".todo__checkbox");
    checkbox.addEventListener("change", (e) => {
      this._element.classList.toggle("todo_completed", e.target.checked);
    });
  }

  getView() {
    const template = document
      .querySelector(this._selector)
      .content.cloneNode(true);

    this._element = template.querySelector(".todo");

    const checkbox = this._element.querySelector(".todo__checkbox");
    const label = this._element.querySelector(".todo__label");
    const dateDisplay = this._element.querySelector(".todo__date");

    const id = `todo-${this._data.id}`;
    checkbox.id = id;
    label.setAttribute("for", id);
    label.textContent = this._data.name;

    if (this._data.completed) {
      checkbox.checked = true;
      this._element.classList.add("todo_completed");
    }

    const dueDate = new Date(this._data.date);
    if (!isNaN(dueDate) && dateDisplay) {
      dateDisplay.textContent = `Due: ${dueDate.toLocaleString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      })}`;
    }

    this._setEventListeners();
    return this._element;
  }
}
