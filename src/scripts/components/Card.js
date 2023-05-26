export default class Card {
  _card;
  
  constructor(data, templateSelector, openPopup) {
    this._data = data;
    this._template = templateSelector;
    this._openPopup = openPopup;
    this._card = templateSelector.querySelector('.elements__element').cloneNode(true);
    
  }

  _setListeners = () => {
    this._likeButton.addEventListener('click', function(evt){
      evt.target.classList.toggle('elements__like-button_active');
    });

    const deleteButton = this._card.querySelector('.elements__remove-button');
    deleteButton.addEventListener('click', function() {
      const closeElement = deleteButton.closest('.elements__element');
      closeElement.remove();
    })

    this._cardPicture.addEventListener('click', () => this._openPopup(this._data));
  }

  createCard = () => {
    this._cardPicture = this._card.querySelector('.elements__picture');
    this._likeButton = this._card.querySelector('.elements__like-button')
    this._card.querySelector('.elements__caption').textContent = this._data.place;
    this._cardPicture.src = this._data.link;
    this._cardPicture.alt = this._data.place;

    this._setListeners();
    
    return this._card;
  }
}