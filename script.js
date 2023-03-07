let profileName = document.querySelector('.profile__name');
let profileJob = document.querySelector('.profile__job');

let formOpen = document.querySelector('.form-fade');

let editButton = document.querySelector('.profile__edit-button');
let exitButton = document.querySelector('.popup__exit-button');
let saveButton = document.querySelector('.popup__save-button');

let inputName = document.querySelector('.popup__input-name');
let inputJob = document.querySelector('.popup__input-job');

let popup = document.querySelector('.popup__container')

function handleFormSubmit (event) {
  event.preventDefault();

  profileName.textContent = inputName.value;
  profileJob.textContent = inputJob.value;

  formOpen.classList.add('hidden');
}

popup.addEventListener('submit',handleFormSubmit); 

editButton.addEventListener('click', function() {
  formOpen.classList.remove('hidden');
  inputName.value = profileName.textContent;
  inputJob.value = profileJob.textContent;
});

exitButton.addEventListener('click', function() {
  formOpen.classList.add('hidden');
});