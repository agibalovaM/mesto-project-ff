import 'core-js';
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
  const card = createCard(item, handleDelete, handleCardClick);
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

const formElement = popupEdit.querySelector('.popup__form');
const nameInput = formElement.querySelector('.popup__input_type_name');
const jobInput = formElement.querySelector('.popup__input_type_description');
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

closeButtons.forEach(button => {
  const popup = button.closest('.popup');
  button.addEventListener('click', () => closeModal(popup));
});

popups.forEach(popup => {
  popup.addEventListener('mousedown', (evt) => {
    if (evt.target === popup) {
      closeModal(popup);
    }
  });
});

function handleFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value;
  closeModal(popupEdit);
}

formElement.addEventListener('submit', handleFormSubmit);

function handleAddCardSubmit(evt) {
  evt.preventDefault();
  const newCard = {
    name: placeNameInput.value,
    link: placeLinkInput.value
  };
  const card = createCard(newCard, handleDelete, handleCardClick);
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

