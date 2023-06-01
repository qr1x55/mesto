const validationObj = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit-button',
  inactiveButtonClass: 'popup__submit-button_inactive',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_active'
};

const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');
const avatarButton = document.querySelector('.profile__avatar-button');

const formValidators = {};

const userSelector = '.popup_type_edit';
const pictureSelector = '.popup_type_picture'; 
const addSelector = '.popup_type_add';
const avatarSelector = '.popup_type_avatar';
const deleteSelector = '.popup_type_delete';

const elementsGrid = document.querySelector('.elements');
const cardTemplate = document.querySelector('#elements__element').content;

const userData = {
  userNameSelector: '.profile__name',
  userJobSelector: '.profile__job',
  userAvatarSelector: '.profile__avatar'
}

export {validationObj, editButton, addButton, avatarButton, formValidators, userSelector, pictureSelector, addSelector, avatarSelector, deleteSelector, elementsGrid, cardTemplate, userData};