export default class FormValidator {
  constructor(config, formEl) {
    this._config = config;
    this._formEl = formEl;
    this._submitButton = this._formEl.querySelector(
      this._config.submitButtonSelector
    );
    this._inputEls = [
      ...this._formEl.querySelectorAll(this._config.inputSelector),
    ];
  }

  _showInputError(inputEl) {
    const errorEl = this._formEl.querySelector(`#${inputEl.id}-error`);
    inputEl.classList.add(this._config.inputErrorClass);
    errorEl.textContent = inputEl.validationMessage;
    errorEl.classList.add(this._config.errorClass);
  }

  _hideInputError(inputEl) {
    const errorEl = this._formEl.querySelector(`#${inputEl.id}-error`);
    inputEl.classList.remove(this._config.inputErrorClass);
    errorEl.classList.remove(this._config.errorClass);
    errorEl.textContent = "";
  }

  _checkInputValidity(inputEl) {
    if (!inputEl.validity.valid) {
      this._showInputError(inputEl);
    } else {
      this._hideInputError(inputEl);
    }
  }

  _toggleButtonState() {
    const hasInvalidInput = this._inputEls.some(
      (inputEl) => !inputEl.validity.valid
    );

    this._submitButton.disabled = hasInvalidInput;

    if (hasInvalidInput) {
      this._submitButton.classList.add(this._config.inactiveButtonClass);
    } else {
      this._submitButton.classList.remove(this._config.inactiveButtonClass);
    }
  }

  _setEventListeners() {
    this._inputEls.forEach((inputEl) => {
      inputEl.addEventListener("input", () => {
        this._checkInputValidity(inputEl);
        this._toggleButtonState();
      });
    });
  }

  enableValidation() {
    this._formEl.addEventListener("submit", (e) => e.preventDefault());
    this._setEventListeners();
    this._toggleButtonState();
  }

  resetValidation() {
    this._inputEls.forEach((inputEl) => {
      this._hideInputError(inputEl);
    });
    this._formEl.reset();
    this._toggleButtonState();
  }
}
