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

const popupEditForm = document.forms['editForm'];
const popupAddForm = document.forms['addForm'];

const formValidators = {
}


const elementsGrid = document.querySelector('.elements');

const cardTemplate = document.querySelector('#elements__element').content;

function addCard (element) {
  elementsGrid.prepend(element);
}

function renderCard (item) {
  const cardElement = new Card(item, cardTemplate, openPopupPicture).createCard();
  return cardElement
};

initialElements.reverse().forEach(element => {
  addCard(renderCard(element));
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
  
  addCard(renderCard(tempItem));
  closePopup(popupAdd);
}

function openPopup(form) {
  form.classList.add('popup_opened');
  document.addEventListener('keydown', closeByEscape); 
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

const enableValidation = (config) => {
  const formList = Array.from(document.querySelectorAll(config.formSelector))
  formList.forEach((formElement) => {
    const validator = new FormValidator(config, formElement);
    const formName = formElement.getAttribute('name');

    formValidators[formName] = validator;
    validator.enableValidation();
  });
};

enableValidation(validationObj);

editButton.addEventListener('click', () => {
  inputName.value = profileName.textContent;
  inputJob.value = profileJob.textContent;
  formValidators['editForm'].resetValidation()
  openPopup(popupEdit);
});

addButton.addEventListener('click', () => {
  inputPlace.value = '';
  inputPicture.value = '';
  formValidators['addForm'].resetValidation()
  openPopup(popupAdd); 
});

popupEditForm.addEventListener('submit', handleEditFormSubmit); 
popupAddForm.addEventListener('submit', handleAddFormSubmit); 