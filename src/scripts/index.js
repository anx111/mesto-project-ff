import '../pages/index.css'; 

import {
  createCard,
  deleteCard,
  likeCardListener,

} from '../components/card.js';

import {
  closeModalWindow,
  openModalWindow,
} from '../components/modal.js';

import {
  enableValidation,
  clearValidation, 
} from '../components/validation.js';

import {
  editProfile,
  addCard,
  editAvatar,
  getUserMe,
  getCards,
} from '../components/api.js'


// @todo: DOM узлы

const editModalOpen = document.querySelector('.profile__edit-button');
const editModalWindow = document.querySelector('.popup_type_edit');
const editModalInputName = document.querySelector('.popup__input_type_name');
const editModalInputDescrition = document.querySelector('.popup__input_type_description');
const editModalInputCardName = document.querySelector('.popup__input_type_card-name');
const editModalInputTypeUrl = document.querySelector('.popup__input_type_url');
const editModalInputAvatarUrl = document.querySelector('.popup__input_type_url_avatar')
const editModalAvatarButton = document.querySelector('.profile__image-avtar-edit');


const newCardModalOpen = document.querySelector('.profile__add-button');
const newCardModalWindow = document.querySelector('.popup_type_new-card');
const newAvatarModal = document.querySelector('.popup_type_edit_avatar');

const closeEditModal = document.querySelector('.popup_type_edit .popup__close');
const closeNewCardModal = document.querySelector('.popup_type_new-card .popup__close');
const closeImgModal = document.querySelector('.popup_type_image .popup__close');
const closeAvatarModal = document.querySelector('.popup_type_edit_avatar .popup__close');

const openWindowImgModal = document.querySelector('.popup_type_image');

const formNewPlaceElement = document.querySelector('[name="new-place"]');
const formEditProfileElement = document.querySelector('[name="edit-profile"]');
const formModalEditAvatar = document.querySelector('[name="edit-avatar"]');

const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const profileAvatar = document.querySelector('.profile__image');

const placesList = document.querySelector('.places__list');

const renderCard = (cardData, meId) => {
  return createCard(cardData, meId, deleteCard, likeCardListener, openImageModalWindow)
}

let _meId = null;

const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_inactive',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'form__input-error_active'
}; 

enableValidation(validationConfig);

function openImageModalWindow(event){
  openWindowImgModal.querySelector('.popup__image').removeAttribute('src');

  openWindowImgModal.querySelector('.popup__caption').textContent =
    event.target.parentElement.querySelector('.card__title').textContent;

  openWindowImgModal.querySelector('.popup__image').setAttribute('src', event.target.src);
  openWindowImgModal.querySelector('.popup__image').setAttribute('alt', event.target.alt);
  openModalWindow(openWindowImgModal)
}

function handleFormEditProfileSubmit(evt) {
  evt.preventDefault(); 

  const nameInputValue = editModalInputName.value;
  const jobInputValue  = editModalInputDescrition.value;
  const submitButton = evt.currentTarget.querySelector('.popup__button')
  submitButton.textContent = 'Сохранение...'
  editProfile(nameInputValue, jobInputValue).then((result) => {
    profileTitle.textContent = result.name;
    profileDescription.textContent = result.about; 
    closeModalWindow(editModalWindow)
  })
  .catch((err) => {
    console.log(err); 
  })
  .finally(() => {
    submitButton.textContent = 'Сохранить'
  });
}

function handleFormNewPlaceSubmit(evt) {
  evt.preventDefault();

  const cardNameInputValue = editModalInputCardName.value;
  const typeUrlInputValue  = editModalInputTypeUrl.value;
  const submitButton = evt.currentTarget.querySelector('.popup__button')
  submitButton.textContent = 'Сохранение...'
  addCard(cardNameInputValue, typeUrlInputValue)
    .then(res => {
      placesList.prepend(renderCard(res, _meId));
      formNewPlaceElement.reset()
      closeModalWindow(newCardModalWindow)
      clearValidation(formNewPlaceElement, validationConfig);
    })
    .catch((err) => {
      console.log(err); 
    })
    .finally(() => {
      submitButton.textContent = 'Сохранить'
    });
}


function editAvatarSubmit(evt){
  evt.preventDefault();

  const urlAvatar = editModalInputAvatarUrl.value;
  const submitButton = evt.currentTarget.querySelector('.popup__button')
  submitButton.textContent = 'Сохранение...'
  editAvatar(urlAvatar)
    .then(res => {
      profileAvatar.style.backgroundImage = `url(${res.avatar})`
      formModalEditAvatar.reset()
      closeModalWindow(newAvatarModal);
      clearValidation(formModalEditAvatar, validationConfig);
    })
    .catch((err) => {
      console.log(err); 
    })
    .finally(() => {
      submitButton.textContent = 'Сохранить'
    })
}

editModalAvatarButton.addEventListener('click', function(){
  openModalWindow(newAvatarModal);
})

editModalOpen.addEventListener('click', function(){
  editModalInputName.value = profileTitle.textContent;
  editModalInputDescrition.value = profileDescription.textContent;
  clearValidation(formEditProfileElement, validationConfig);
  openModalWindow(editModalWindow);
})

newCardModalOpen.addEventListener('click', function(){
  openModalWindow(newCardModalWindow);
});

formModalEditAvatar.addEventListener('submit', editAvatarSubmit);

formEditProfileElement.addEventListener('submit', handleFormEditProfileSubmit);

formNewPlaceElement.addEventListener('submit', handleFormNewPlaceSubmit);


closeAvatarModal.addEventListener('click', function(){
  closeModalWindow(newAvatarModal);
});

closeEditModal.addEventListener('click', function(){
  closeModalWindow(editModalWindow);
})

closeNewCardModal.addEventListener('click', function(){
  closeModalWindow(newCardModalWindow);
});

closeImgModal.addEventListener('click', function(){
  closeModalWindow(openWindowImgModal);
})


Promise.all([getCards(), getUserMe()])
.then((results) => {

  profileTitle.textContent = results[1]['name'];
  profileDescription.textContent = results[1]['about'];
  profileAvatar.style.backgroundImage = `url('${results[1]['avatar']}')`;
  _meId = results[1]._id;

  results[0].forEach((card) => {
    placesList.append(renderCard(card, _meId))
  })

})
.catch((err) => {
  console.log(err); 
})
