import FormValidator from "../components/FormValidator.js";
import Todo from "../components/Todo.js";
import { v4 as uuidv4 } from "https://jspm.dev/uuid";
import { initialTodos, validationConfig } from "../utils/constants.js";

const formEl = document.querySelector(".modal__form");
const validator = new FormValidator(validationConfig, formEl);
validator.enableValidation();

const addTodoButton = document.querySelector(".button_action_add");
const addTodoPopup = document.querySelector("#add-todo-popup");
const addTodoForm = addTodoPopup.querySelector(".popup__form");
const addTodoCloseBtn = addTodoPopup.querySelector(".popup__close");
const todosList = document.querySelector(".todos__list");
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

initialTodos.forEach((item) => {
  const todo = generateTodo(item);
  todosList.append(todo);
});

addTodoButton.addEventListener("click", () => {
  openModal(addTodoPopup);
  validator.resetValidation();
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

  const todoElement = generateTodo(newTodo);
  todosList.append(todoElement);
  addTodoForm.reset();
  closeModal(addTodoPopup);
});
