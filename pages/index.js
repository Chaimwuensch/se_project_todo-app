import FormValidator from "../components/FormValidator.js";
import Todo from "../components/Todo.js";
import { v4 as uuidv4 } from "https://jspm.dev/uuid";
import { initialTodos, validationConfig } from "../utils/constants.js";

const addTodoButton = document.querySelector(".button_action_add");
const addTodoPopup = document.querySelector("#add-todo-popup");
const addTodoForm = document.forms["add-todo-form"];
const addTodoCloseBtn = addTodoPopup.querySelector(".popup__close");
const todosList = document.querySelector(".todos__list");
const validator = new FormValidator(validationConfig, addTodoForm);

const openModal = (modal) => {
  modal.classList.add("popup_visible");
};

const closeModal = (modal) => {
  modal.classList.remove("popup_visible");
};

function generateTodo(data) {
  const todoInstance = new Todo(data, "#todo-template");
  return todoInstance.getView();
}

const renderTodo = (item) => {
  const todo = generateTodo(item);
  todosList.append(todo);
};

validator.enableValidation();

initialTodos.forEach(renderTodo);

addTodoButton.addEventListener("click", () => {
  openModal(addTodoPopup);
});

addTodoCloseBtn.addEventListener("click", () => {
  closeModal(addTodoPopup);
});

addTodoForm.addEventListener("submit", (evt) => {
  evt.preventDefault();
  const name = evt.target.name.value.trim();
  const dateInput = evt.target.date.value;

  if (!name) return;

  const date = new Date(dateInput);
  date.setMinutes(date.getMinutes() + date.getTimezoneOffset());

  const newTodo = {
    id: uuidv4(),
    name,
    date,
    completed: false,
  };

  renderTodo(newTodo);

  validator.resetValidation();
  closeModal(addTodoPopup);
});
