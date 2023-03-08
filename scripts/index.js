let profileName = document.querySelector('.profile__name');
let profileJob = document.querySelector('.profile__job');

let editButton = document.querySelector('.profile__edit-button');
let exitButton = document.querySelector('.popup__exit-button');
let saveButton = document.querySelector('.popup__save-button');

let inputName = document.querySelector('.popup__input_type_name');
let inputJob = document.querySelector('.popup__input_type_job');


let popup = document.querySelector('.popup')
let popupForm = document.querySelector('.popup__form')


function handleFormSubmit (event) {
  event.preventDefault();

  profileName.textContent = inputName.value;
  profileJob.textContent = inputJob.value;

  closePopup();
}

function openPopup() {
  popup.classList.add('popup_opened');
  inputName.value = profileName.textContent;
  inputJob.value = profileJob.textContent;
}

function closePopup() {
  popup.classList.remove('popup_opened');
}

editButton.addEventListener('click', openPopup)
exitButton.addEventListener('click', closePopup)

popupForm.addEventListener('submit', handleFormSubmit); 