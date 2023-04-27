export default class Card {
  _card;
  
  constructor(data, templateSelector, openPopup) {
    this._data = data;
    this._template = templateSelector;
    this._openPopup = openPopup;
  }

  _setListeners = () => {
    this._card.querySelector('.elements__like-button').addEventListener('click', function(evt){
      evt.target.classList.toggle('elements__like-button_active');
    });

    const deleteButton = this._card.querySelector('.elements__remove-button');
    deleteButton.addEventListener('click', function() {
      const closeElement = deleteButton.closest('.elements__element');
      closeElement.remove();
    })

    this._card.querySelector('.elements__picture').addEventListener('click', () => this._openPopup(this._data));
  }

  createCard = () => {
    this._card = this._template.querySelector('.elements__element').cloneNode(true);
    this._card.querySelector('.elements__caption').textContent = this._data.name;
    this._card.querySelector('.elements__picture').src = this._data.link;
    this._card.querySelector('.elements__picture').alt = this._data.name;

    this._setListeners();
    
    return this._card;
  }
}