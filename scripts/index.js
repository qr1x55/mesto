const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__job');

const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');
const pictureButton = document.querySelector('.elements__picture-button');

const exitPopup = document.querySelectorAll('.popup__exit-button');

const saveButton = document.querySelector('.popup__save-button');

const inputName = document.querySelector('.popup__input_type_name');
const inputJob = document.querySelector('.popup__input_type_job');

const inputPlace = document.querySelector('.popup__input_type_place');
const inputPicture = document.querySelector('.popup__input_type_picture');

const popup = document.querySelector('.popup');

const popupEdit = document.querySelector('.popup_type_edit');
const popupAdd = document.querySelector('.popup_type_add');
const popupPicture = document.querySelector('.popup_type_picture');

const popupEditForm = document.querySelector('.popup__form_type_edit');
const popupAddForm = document.querySelector('.popup__form_type_add');

const elementsGrid = document.querySelector('.elements');
const elementTemplate = document.querySelector('#elements__element').content;

let initialElements = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
]; 

function renderPlace (card) {
  const placeElement = elementTemplate.cloneNode(true);

  placeElement.querySelector('.elements__caption').textContent = card.name;
  placeElement.querySelector('.elements__picture').src = card.link;

  placeElement.querySelector('.elements__like-button').addEventListener('click', function(evt){
    evt.target.classList.toggle('elements__like-button_active');
  });

  const deleteButton = placeElement.querySelector('.elements__remove-button');

  deleteButton.addEventListener('click', function() {
    const closeElement = deleteButton.closest('.elements__element');
    closeElement.remove();
  })

  console.log();

  placeElement.querySelector('.elements__picture').addEventListener('click', () => openPopupPicture(card));

  elementsGrid.prepend(placeElement);
}

for (let i = initialElements.length - 1; i >= 0; i = i - 1) {
  renderPlace(initialElements[i]);
}
  
function handleEditFormSubmit (event) {
  event.preventDefault();

  profileName.textContent = inputName.value;
  profileJob.textContent = inputJob.value;

  closePopup(popupEdit);
}

function handleAddFormSubmit (event) {
  event.preventDefault();
  let tempItem = {
    name: inputPlace.value,
    link: inputPicture.value
  };

  initialElements.unshift(tempItem);
  
  renderPlace(tempItem);

  closePopup(popupAdd);
}

function openPopup(form) {
  form.classList.toggle('popup_opened');
}

function openPopupEdit() {
  inputName.value = profileName.textContent;
  inputJob.value = profileJob.textContent;
  openPopup(popupEdit);
}

function openPopupAdd() {
  inputPlace.value = '';
  inputPicture.value = '';
  openPopup(popupAdd);
}

function openPopupPicture(item) {
  document.querySelector('.popup__picture').src = item.link;
  document.querySelector('.popup__caption').textContent = item.name;
  openPopup(popupPicture);
}

function closePopup(form) {
  form.classList.toggle('popup_opened');
}

exitPopup.forEach(button => {
  const parent = button.closest('.popup')
  button.addEventListener('click', () => closePopup(parent));
});

editButton.addEventListener('click', openPopupEdit);
addButton.addEventListener('click', openPopupAdd);

popupEditForm.addEventListener('submit', handleEditFormSubmit); 
popupAddForm.addEventListener('submit', handleAddFormSubmit); 