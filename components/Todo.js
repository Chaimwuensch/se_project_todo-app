export default class Todo {
  constructor(data, selector) {
    this._data = data;
    this._selector = selector;
  }

  _setEventListeners() {
    const deleteBtn = this._element.querySelector(".todo__delete-btn");
    deleteBtn.addEventListener("click", () => {
      this._element.remove();
      this._element = null;
    });

    this._checkbox = this._element.querySelector(".todo__completed");
    this._checkbox.addEventListener("change", (e) => {
      if (!this._element) return;
      this._element.classList.toggle("todo_completed", e.target.checked);
    });
  }

  getView() {
    this._element = document
      .querySelector(this._selector)
      .content.firstElementChild.cloneNode(true);

    this._checkbox = this._element.querySelector(".todo__completed");
    const label = this._element.querySelector(".todo__label");
    const name = this._element.querySelector(".todo__name");
    const dateDisplay = this._element.querySelector(".todo__date");

    const id = `todo-${this._data.id}`;
    this._checkbox.id = id;
    label.setAttribute("for", id);
    name.textContent = this._data.name;

    if (this._data.completed) {
      this._checkbox.checked = true;
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
