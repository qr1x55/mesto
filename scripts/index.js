import Card from './Card.js';
import {initialElements, validationObj} from './loadup.js';
import FormValidator from './FormValidator.js';

const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__job');

const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');

const inputName = document.querySelector('.popup__input_type_name');
const inputJob = document.querySelector('.popup__input_type_job');

const inputPlace = document.querySelector('.popup__input_type_place');
const inputPicture = document.querySelector('.popup__input_type_picture');

const popup = document.querySelector('.popup');
const popups = document.querySelectorAll('.popup');

const popupEdit = document.querySelector('.popup_type_edit');
const popupAdd = document.querySelector('.popup_type_add');
const popupPicture = document.querySelector('.popup_type_picture');

const popupPic = document.querySelector('.popup__picture');
const popupCap = document.querySelector('.popup__caption');

const popupEditForm = document.querySelector('.popup__form_type_edit');
const popupAddForm = document.querySelector('.popup__form_type_add');

const elementsGrid = document.querySelector('.elements');

const cardTemplate = document.querySelector('#elements__element').content;

function addCard (element) {
  elementsGrid.prepend(element);
}

initialElements.reverse().forEach(element => {
  addCard(new Card(element, cardTemplate, openPopupPicture).createCard());
});

function handleEditFormSubmit (event) {
  event.preventDefault();

  profileName.textContent = inputName.value;
  profileJob.textContent = inputJob.value;

  closePopup(popupEdit);
}


function handleAddFormSubmit (event) {
  event.preventDefault();
  const tempItem = {
    name: inputPlace.value,
    link: inputPicture.value
  };
  
  addCard(new Card(tempItem, cardTemplate, openPopupPicture).createCard());
  closePopup(popupAdd);
}

function openPopup(form) {
  form.classList.add('popup_opened');
  document.addEventListener('keydown', closeByEscape); 
}

function openPopupEdit() {
  inputName.value = profileName.textContent;
  inputJob.value = profileJob.textContent;
  new FormValidator(validationObj, popupEditForm).resetValidation();
  openPopup(popupEdit);
}

function openPopupAdd() {
  inputPlace.value = '';
  inputPicture.value = '';
  new FormValidator(validationObj, popupAddForm).resetValidation();
  submitButtonDisabled(popupAdd);
  openPopup(popupAdd); 
}

function openPopupPicture(item) {
  popupPic.src = item.link;
  popupPic.alt = item.name;
  popupCap.textContent = item.name;
  openPopup(popupPicture);
}

function closePopup(form) {
  form.classList.remove('popup_opened');
  document.removeEventListener('keydown', closeByEscape);
}

function closeByEscape(evt) {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_opened');
    closePopup(openedPopup);
  }
}

function submitButtonDisabled(form) {
  const button = form.querySelector('.popup__submit-button');
  button.classList.add(validationObj.inactiveButtonClass);
  button.setAttribute("disabled", true);
}

popups.forEach((popup) => {
  popup.addEventListener('mousedown', (evt) => {
    if (evt.target.classList.contains('popup_opened')){
      closePopup(popup);
    }
    if (evt.target.classList.contains('popup__exit-button')) {
      closePopup(popup)
    }
  })
});

editButton.addEventListener('click', openPopupEdit);
addButton.addEventListener('click', openPopupAdd);

popupEditForm.addEventListener('submit', handleEditFormSubmit); 
popupAddForm.addEventListener('submit', handleAddFormSubmit); 

new FormValidator(validationObj, popupEditForm).enableValidation();
new FormValidator(validationObj, popupAddForm).enableValidation();