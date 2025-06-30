import './pages/index.css';

import logo from './images/logo.svg';
document.querySelector('.logo').src = logo;

import { openModal, closeModal } from './components/modal.js';
import { createCard } from './components/card.js';
import { getUserInfo, getInitialCards, updateUserInfo, addCard, toggleLike, updateAvatar, deleteCard } from './components/api.js';
import { enableValidation, clearValidation} from './components/validation.js';

function renderLoading(buttonElement, isLoading, defaultText = 'Сохранить') {
  buttonElement.textContent = isLoading ? 'Сохранение...' : defaultText;
}

const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_active'
};
enableValidation(validationConfig);

let currentUserId;


const placesList = document.querySelector('.places__list');

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

const popupAvatar = document.querySelector('.popup_type_avatar');
const formAvatar = popupAvatar.querySelector('.popup__form');
const avatarInput = popupAvatar.querySelector('.popup__input_type_url');
const avatarPreview = document.querySelector('.profile__image');

Promise.all([getUserInfo(), getInitialCards()])
  .then(([userData, cards]) => {
    profileName.textContent = userData.name;
    profileDescription.textContent = userData.about;
    document.querySelector('.profile__image').style.backgroundImage = `url(${userData.avatar})`;
    currentUserId = userData._id;

    cards.reverse().forEach((cardData) => {
      const card = createCard(cardData, openConfirmPopup, handleLike, handleCardClick, currentUserId);
      placesList.append(card);
    });
  })
  .catch((err) => {
    console.error('Ошибка при загрузке данных:', err);
  });

// Открытие попапа по клику на аватар
avatarPreview.addEventListener('click', () => {
  formAvatar.reset();
  clearValidation(formAvatar, validationConfig);
  openModal(popupAvatar);
});

// Отправка формы смены аватара
formAvatar.addEventListener('submit', (evt) => {
  evt.preventDefault();
  const avatarUrl = avatarInput.value;
  const submitButton = formAvatar.querySelector('.popup__button');

  renderLoading(submitButton, true);

  updateAvatar(avatarUrl)
    .then((userData) => {
      avatarPreview.style.backgroundImage = `url(${userData.avatar})`;
      closeModal(popupAvatar);
    })
    .catch((err) => console.error('Ошибка при обновлении аватара:', err))
    .finally(() => {
      renderLoading(submitButton, false);
    });
});



buttonEdit.addEventListener('click', () => {
  nameInput.value = profileName.textContent;
  jobInput.value = profileDescription.textContent;
  clearValidation(formEditProfile, validationConfig);
  openModal(popupEdit);
});

buttonAdd.addEventListener('click', () => {
  formAddCard.reset(); //очищаем поля
  clearValidation(formAddCard, validationConfig); //очищаем ошибки и блокируем кнопку
  openModal(popupAdd);
});

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
  const newName = nameInput.value;
  const newAbout = jobInput.value;

  updateUserInfo({ name: newName, about: newAbout })
    .then((userData) => {
      profileName.textContent = userData.name;
      profileDescription.textContent = userData.about;
      closeModal(popupEdit);
    })
    .catch((err) => {
      console.error('Ошибка при обновлении профиля:', err);
    });
}

formEditProfile.addEventListener('submit', function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  const newName = nameInput.value;
  const newAbout = jobInput.value;
  const submitButton = formEditProfile.querySelector('.popup__button');

  renderLoading(submitButton, true);

  updateUserInfo({ name: newName, about: newAbout })
    .then((userData) => {
      profileName.textContent = userData.name;
      profileDescription.textContent = userData.about;
      closeModal(popupEdit);
    })
    .catch((err) => {
      console.error('Ошибка при обновлении профиля:', err);
    })
    .finally(() => {
      renderLoading(submitButton, false);
    });
})

const popupConfirmDelete = document.querySelector('.popup_type_confirm-delete');
const confirmForm = popupConfirmDelete.querySelector('.popup__form');

let cardToDelete = null;
let cardIdToDelete = null;

function openConfirmPopup(cardElement, cardId) {
  cardToDelete = cardElement;
  cardIdToDelete = cardId;
  openModal(popupConfirmDelete);
}

confirmForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  deleteCard(cardIdToDelete)
    .then(() => {
      cardToDelete.remove();
      closeModal(popupConfirmDelete);
    })
    .catch(err => console.error(err));
});

function handleAddCardSubmit(evt) {
  evt.preventDefault();
  const newCardData = {
    name: placeNameInput.value,
    link: placeLinkInput.value
  };
  const submitButton = formAddCard.querySelector('.popup__button');
  renderLoading(submitButton, true);

  addCard(newCardData)
    .then((cardData) => {
      const card = createCard(
        cardData,
        openConfirmPopup,
        handleLike,
        handleCardClick,
        currentUserId 
      );      
      placesList.prepend(card);
      formAddCard.reset();
      closeModal(popupAdd);
    })
    .catch((err) => {
      console.error('Ошибка при добавлении карточки:', err);
    })
    .finally(() => {
      renderLoading(submitButton, false);
    });
}

formAddCard.addEventListener('submit', handleAddCardSubmit);

function handleCardClick(name, link) {
  popupImageElement.src = link;
  popupImageElement.alt = name;
  popupCaption.textContent = name;
  openModal(popupImage);
}

function handleLike(likeButton, cardData, likeCount) {
  const isLiked = likeButton.classList.contains('card__like-button_liked');

  toggleLike(cardData._id, isLiked)
    .then((updatedCard) => {
      likeCount.textContent = updatedCard.likes.length;
      likeButton.classList.toggle('card__like-button_liked');
    })
    .catch((err) => console.error('Ошибка при постановке лайка:', err));
}



