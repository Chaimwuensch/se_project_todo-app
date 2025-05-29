import FormValidator from "../components/FormValidator.js";
import Todo from "../components/Todo.js";
import PopupWithForm from "../components/PopupWithForm.js";
import TodoCounter from "../components/TodoCounter.js";
import { v4 as uuidv4 } from "https://jspm.dev/uuid";
import { initialTodos, validationConfig } from "../utils/constants.js";

const addTodoButton = document.querySelector(".button_action_add");
const todosList = document.querySelector(".todos__list");
const addTodoForm = document.forms["add-todo-form"];
const validator = new FormValidator(validationConfig, addTodoForm);
const todoCounter = new TodoCounter(initialTodos, ".counter__text");

function generateTodo(data) {
  const todoInstance = new Todo(data, "#todo-template", {
    handleCheckboxChange: (isChecked) => {
      todoCounter.updateCompleted(isChecked);
    },
    handleDelete: (wasCompleted) => {
      todoCounter.updateTotal(false);
      if (wasCompleted) {
        todoCounter.updateCompleted(false);
      }
    }
  });
  return todoInstance.getView();
}

const renderTodo = (item) => {
  const todo = generateTodo(item);
  todosList.append(todo);
};

function handleAddTodoSubmit(formData) {
  const name = formData.name.trim();
  const dateInput = formData.date;

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
  todoCounter.updateTotal(true);
  validator.resetValidation();
  addTodoPopup.close();
}

validator.enableValidation();

initialTodos.forEach(renderTodo);

const addTodoPopup = new PopupWithForm("#add-todo-popup", handleAddTodoSubmit);
addTodoPopup.setEventListeners();

addTodoButton.addEventListener("click", () => {
  addTodoPopup.open();
});
