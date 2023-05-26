import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector){
    super(popupSelector);
    this._popupPic = this._popup.querySelector('.popup__picture');
    this._popupCap = this._popup.querySelector('.popup__caption');
  }

  open = (cardInfo) => {
    this._popupPic.src = cardInfo.link;
    this._popupPic.alt = cardInfo.name;
    this._popupCap.textContent = cardInfo.name;
    super.open();
  }
}