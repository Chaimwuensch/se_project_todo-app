export default class Todo {
  constructor(data, selector) {
    this._data = data;
    this._selector = selector;
  }

  _setEventListeners() {
    this._element
      .querySelector(".todo__delete-button")
      .addEventListener("click", () => this._element.remove());

    this._element
      .querySelector(".todo__checkbox")
      .addEventListener("change", (e) => {
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

    const id = this._data.id;
    checkbox.id = id;
    label.setAttribute("for", id);

    label.textContent = this._data.name;
    this._setEventListeners();
    return this._element;
  }
}
