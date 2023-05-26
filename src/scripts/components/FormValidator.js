export default class FormValidator {
  constructor(formData, formElement) {
    this._formSelector = formData.formSelector;
    this._inputSelector = formData.inputSelector;
    this._submitButtonSelector = formData.submitButtonSelector;
    this._inactiveButtonClass = formData.inactiveButtonClass;
    this._inputErrorClass = formData.inputErrorClass;
    this._errorClass = formData.errorClass;
    this._formElement = formElement;
    this._button = formElement.querySelector(this._submitButtonSelector);
    this._inputList = formElement.querySelectorAll(this._inputSelector);
  }
  
  _showInputError = () => {
    this._errorElement = this._formElement.querySelector(`#${this._inputElement.id}-error`);
    this._inputElement.classList.add(this._inputErrorClass);
    this._errorElement.textContent = this._inputElement.validationMessage;
    this._errorElement.classList.add(this._errorClass);
  }
  
  _hideInputError = () => {
    this._errorElement = this._formElement.querySelector(`#${this._inputElement.id}-error`);
    this._inputElement.classList.remove(this._inputErrorClass);
    this._errorElement.classList.remove(this._errorClass);
    this._errorElement.textContent = '';
  }

  _checkInputValidity = () => {
    !this._inputElement.validity.valid ? this._showInputError() : this._hideInputError();
  }  

  _hasInvalidInput = () => {
    return Array.from(this._inputList).some((inputElement) => !inputElement.validity.valid); 
  }

  _toggleButtonState = () => {
    if (this._hasInvalidInput()) {
      this._button.classList.add(this._inactiveButtonClass);
      this._button.setAttribute("disabled", true);
    } else {
      this._button.classList.remove(this._inactiveButtonClass);
      this._button.removeAttribute("disabled", false);
    }
  }

  _setEventListener = () => {
    this._inputList.forEach(inputElement => {
      inputElement.addEventListener('input', () => {
        this._inputElement = inputElement;
        this._checkInputValidity();
        this._toggleButtonState();
      });
    });
  }

  enableValidation = () => {
    this._setEventListener();
  }

  resetValidation = () => {
    this._toggleButtonState();
    this._inputList.forEach((inputElement) => {
      this._inputElement = inputElement;
      this._hideInputError();
    });
  }
}

