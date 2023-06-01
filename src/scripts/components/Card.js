export default class Card {
  _card;
  
  constructor(data, templateSelector, openPopup, openDeletePopup, userLikeHandler) {
    this._data = data;
    this._userId = data.userId;
    this._ownerId = data.owner._id;
    this._cardId = data._id;
    this._likes = data.likes;
    this._userLikeHandler = userLikeHandler;
    this._template = templateSelector;
    this._openPopup = openPopup;
    this._card = templateSelector.querySelector('.elements__element').cloneNode(true);
    this._likeButton = this._card.querySelector('.elements__like-button');
    this._deleteButton = this._card.querySelector('.elements__remove-button');
    this._cardPicture = this._card.querySelector('.elements__picture');
    this._cardCaption = this._card.querySelector('.elements__caption');
    this._openDeletePopup = openDeletePopup;
    this._likeCounter = this._card.querySelector('.elements__like-counter')
  }

  _likeHandler = () => {
    this._userLikeHandler(this._likeButton, this._cardId);
    
  }

  _likeCheck() {
    this._likes.forEach(item => {
      if (item._id === this._userId) {
        this._likeButton.classList.add('elements__like-button_active');
        return
      }
    })
    this._likeCounter.textContent = this._likes.length;
  }

  _deletePopupHandler = () => {
    this._openDeletePopup(this);
  }

  _checkId() {
    this._userId === this._ownerId ? this._deleteButton.style.display = 'block' : this._deleteButton.style.display = 'none';
  }

  _setListeners() {
    this._likeButton.addEventListener('click', this._likeHandler);

    this._deleteButton.addEventListener('click', this._deletePopupHandler);

    this._cardPicture.addEventListener('click', () => this._openPopup(this._data));
  }
  
  likeToggler(likes) {
    this._likeButton.classList.toggle('elements__like-button_active');
    this._likeCounter.textContent = likes.length;
  }

  deleteCard() {
    this._card.remove();
  }

  addCard() {
    this._cardCaption.textContent = this._data.name;
    this._cardPicture.src = this._data.link;
    this._cardPicture.alt = this._data.name;
    this._likeCheck();
    this._checkId();
    this._setListeners();
    
    return this._card;
  }

}