import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, submitHandler){
    super(popupSelector);
    this._submitHandler = submitHandler;
    this._inputList = this._form.querySelectorAll('.popup__input');
    this._submitButton  = this._form.querySelector('.popup__submit-button');
    this._submitButtonText = this._submitButton.textContent;
  }

  _getInputValues() {
    const data = Object.fromEntries(new FormData(this._form));
    return data;
  }

  setInputValues(data) {
    this._inputList.forEach(input => {
      input.value = data[input.name]
    })
  }

  close() {
    super.close();
    this._form.reset();
  }
  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._submitButton.textContent = "Сохранение...";
      this._submitHandler(this._getInputValues())
    });
  }

  resetButtonText() {
    this._submitButton.textContent = this._submitButtonText;
  }
}