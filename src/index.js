import './pages/index.css';

import logo from './images/logo.svg';
document.querySelector('.logo').src = logo;
import avatar from './images/avatar.jpg';
document.querySelector('.profile__image').style.backgroundImage = `url(${avatar})`;

import { initialCards } from './scripts/cards.js';
import { createCard, handleDelete } from './components/card.js';
import { openModal, closeModal } from './components/modal.js';

const placesList = document.querySelector('.places__list');
initialCards.forEach(function (item) {
  const card = createCard(item, handleDelete, handleLike, handleCardClick);
  placesList.append(card);
});

const popupEdit = document.querySelector('.popup_type_edit');
const popupAdd = document.querySelector('.popup_type_new-card');
const popupImage = document.querySelector('.popup_type_image');
const popupImageElement = popupImage.querySelector('.popup__image');
const popupCaption = popupImage.querySelector('.popup__caption');

const buttonEdit = document.querySelector('.profile__edit-button');
const buttonAdd = document.querySelector('.profile__add-button');
const closeButtons = document.querySelectorAll('.popup__close');
const popups = document.querySelectorAll('.popup');

const formEditProfile = popupEdit.querySelector('.popup__form');
const nameInput = formEditProfile.querySelector('.popup__input_type_name');
const jobInput = formEditProfile.querySelector('.popup__input_type_description');
const profileName = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');

const formAddCard = popupAdd.querySelector('.popup__form');
const placeNameInput = formAddCard.querySelector('.popup__input_type_card-name');
const placeLinkInput = formAddCard.querySelector('.popup__input_type_url');

buttonEdit.addEventListener('click', () => {
  nameInput.value = profileName.textContent;
  jobInput.value = profileDescription.textContent;
  openModal(popupEdit);
});

buttonAdd.addEventListener('click', () => openModal(popupAdd));

popups.forEach(popup => {
  const closeButton = popup.querySelector('.popup__close');

  // Закрытие по крестику
  if (closeButton) {
    closeButton.addEventListener('click', () => closeModal(popup));
  }

  // Закрытие по оверлею
  popup.addEventListener('mousedown', (evt) => {
    if (evt.target === popup) {
      closeModal(popup);
    }
  });
});

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value;
  closeModal(popupEdit);
}

formEditProfile.addEventListener('submit', handleProfileFormSubmit);

function handleAddCardSubmit(evt) {
  evt.preventDefault();
  const newCard = {
    name: placeNameInput.value,
    link: placeLinkInput.value
  };
  const card = createCard(newCard, handleDelete, handleLike, handleCardClick);
  placesList.prepend(card);
  formAddCard.reset();
  closeModal(popupAdd);
}

formAddCard.addEventListener('submit', handleAddCardSubmit);

function handleCardClick(name, link) {
  popupImageElement.src = link;
  popupImageElement.alt = name;
  popupCaption.textContent = name;
  openModal(popupImage);
}

function handleLike(likeButton) {
  likeButton.classList.toggle('card__like-button_is-active');
}


