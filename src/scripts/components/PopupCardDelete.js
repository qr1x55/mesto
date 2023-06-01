import Popup from "./Popup.js";

export default class PopupCardDelete extends Popup {
  constructor(popupSelector, submitHandler) {
    super(popupSelector);
    this._submitHandler = submitHandler;
    this._submitButton  = this._form.querySelector('.popup__submit-button');
    this._submitButtonText = this._submitButton.textContent;
  }
  
  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._submitButton.textContent = "Удаление...";
      this._submitHandler(this._item);
    })
  }

  open = (item) => {
    super.open();
    this._item = item;
  }

  resetButtonText() {
    this._submitButton.textContent = this._submitButtonText;
  }
}