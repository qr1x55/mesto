import './index.css';
import {initialElements, validationObj, editButton, addButton, formValidators, userSelector, pictureSelector, addSelector, elementsGrid, cardTemplate, userData} from '../scripts/utils/constants.js';
import Card from '../scripts/components/Card.js';
import FormValidator from '../scripts/components/FormValidator.js';
import PopupWithImage from '../scripts/components/PopupWithImage.js';
import Section from '../scripts/components/Section.js';
import UserInfo from '../scripts/components/UserInfo.js';
import PopupWithForm from '../scripts/components/PopupWithForm.js';


const picturePopup = new PopupWithImage(pictureSelector);
picturePopup.setEventListeners();

function createCard(item) {
  const cardElement = new Card(item, cardTemplate, picturePopup.open);
  return cardElement.createCard();
}

const section = new Section(createCard, elementsGrid);

section.renderCards(initialElements);

const userInfo = new UserInfo(userData);

const userPopup = new PopupWithForm(userSelector, (info) => {
  userInfo.setUserInfo(info);
})
userPopup.setEventListeners();

const addPopup = new PopupWithForm(addSelector, (info) => {
  section.addItem(info);
})
addPopup.setEventListeners();

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
  formValidators['editForm'].resetValidation();
  userPopup.setInputValues(userInfo.getUserInfo());
  userPopup.open();
});

addButton.addEventListener('click', () => {
  formValidators['addForm'].resetValidation()
  addPopup.open();
});