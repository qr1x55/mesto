export default class Card {
  _card;
  
  constructor(data, templateSelector, openPopup) {
    this._data = data;
    this._template = templateSelector;
    this._openPopup = openPopup;
    this._card = templateSelector.querySelector('.elements__element').cloneNode(true);
    this._likeButton = this._card.querySelector('.elements__like-button');
    this._deleteButton = this._card.querySelector('.elements__remove-button');
    this._cardPicture = this._card.querySelector('.elements__picture');
  }

  _likeHandler = () => {
    this._likeButton.classList.toggle('elements__like-button_active');
  }

  _deleteHandler = () => {
    this._card.remove();
  }

  _setListeners() {
    this._likeButton.addEventListener('click', this._likeHandler);

    this._deleteButton.addEventListener('click', this._deleteHandler);

    this._cardPicture.addEventListener('click', () => this._openPopup(this._data));
  }

  createCard() {
    this._card.querySelector('.elements__caption').textContent = this._data.name;
    this._cardPicture.src = this._data.link;
    this._cardPicture.alt = this._data.name;

    this._setListeners();
    
    return this._card;
  }
}