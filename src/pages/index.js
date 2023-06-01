import './index.css';
import { validationObj, editButton, addButton, avatarButton, formValidators, userSelector, pictureSelector, addSelector, avatarSelector, deleteSelector, elementsGrid, cardTemplate, userData } from '../scripts/utils/constants.js';
import Api from '../scripts/components/Api';
import Card from '../scripts/components/Card.js';
import FormValidator from '../scripts/components/FormValidator.js';
import PopupWithImage from '../scripts/components/PopupWithImage.js';
import Section from '../scripts/components/Section.js';
import UserInfo from '../scripts/components/UserInfo.js';
import PopupWithForm from '../scripts/components/PopupWithForm.js';
import PopupCardDelete from '../scripts/components/PopupCardDelete.js';


const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-66',
  headers: {
    authorization: '708b7ef6-8216-41c4-8e3e-5a22a25b5a61',
    'Content-Type': 'application/json'
  }
});

const picturePopup = new PopupWithImage(pictureSelector);
picturePopup.setEventListeners();

const deleteCard = new PopupCardDelete(deleteSelector, (item) => {
  api.removeCard(item._cardId)
    .then(() => {
      item.deleteCard();
      deleteCard.close();
    })
    .catch((error => console.error(`Ошибка при удалении лайка ${error}`)))
    .finally(() => deleteCard.resetButtonText())
});
deleteCard.setEventListeners();

function cardLikeHandler (likeItem, cardId) {
  if(likeItem.classList.contains('elements__like-button_active')) {
    api.removeLike(cardId)
      .then(res => {
        this.likeToggler(res.likes);
      })
      .catch((error => console.error(`Ошибка при удалении лайка ${error}`)))
  } else {
    api.setLike(cardId)
      .then(res => {
        this.likeToggler(res.likes);
      })
      .catch((error => console.error(`Ошибка при добавлении лайка ${error}`)))
  }
}

function createCard(item) {
  const cardElement = new Card(item, cardTemplate, picturePopup.open, deleteCard.open, cardLikeHandler);
  return cardElement.addCard();
}

const section = new Section(createCard, elementsGrid);

const userInfo = new UserInfo(userData);

const avatarPopup = new PopupWithForm(avatarSelector, (info) => {
  api.setAvatar(info)
    .then(res => {
      userInfo.setUserInfo(res);
      avatarPopup.close();
    })
    .catch((error => console.error(`Ошибка при редактировании ${error}`)))
    .finally(() => avatarPopup.resetButtonText());
});
avatarPopup.setEventListeners();

const userPopup = new PopupWithForm(userSelector, (info) => {
  api.setUserData(info)
    .then(res => {
      userInfo.setUserInfo(res);
      userPopup.close();
    })
    .catch((error => console.error(`Ошибка при редактировании ${error}`)))
    .finally(() => userPopup.resetButtonText());
})
userPopup.setEventListeners();

const addPopup = new PopupWithForm(addSelector, (info) => {
  api.postCard(info)
    .then((cardData) => {
      cardData.userId = userInfo.userId();
      section.addItem(createCard(cardData));
      addPopup.close();
    })
    .catch((error => console.error(`Ошибка при добавлении ${error}`)))
    .finally(() => addPopup.resetButtonText());
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

avatarButton.addEventListener('click', () => {
  formValidators['avatarForm'].resetValidation();
  avatarPopup.open();
})

Promise.all([api.getInfo(), api.getInitialCards()])
  .then(([userData, cardData]) => {
    userInfo.setUserInfo(userData);
    userInfo.getUserId(userData._id);
    cardData.forEach(item => item.userId = userInfo.userId());
    section.cardRenderer(cardData);
  })
  .catch((error => console.error(`Ошибка при загрузке ${error}`)))