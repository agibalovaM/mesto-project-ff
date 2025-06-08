import 'core-js';
import './pages/index.css';

import logo from './images/logo.svg';
document.querySelector('.logo').src = logo;
import avatar from './images/avatar.jpg';
document.querySelector('.profile__image').style.backgroundImage = `url(${avatar})`;
import { initialCards } from './scripts/cards.js';


// @todo: Темплейт карточки

// @todo: DOM узлы

function createCard(cardData, deleteCardCallback) {
  const template = document.querySelector('#card-template').content;
  const cardElement = template.querySelector('.places__item').cloneNode(true);

  const cardTitle = cardElement.querySelector('.card__title');
  const cardImage = cardElement.querySelector('.card__image');
  const deleteButton = cardElement.querySelector('.card__delete-button');

  // Устанавливаем данные
  cardTitle.textContent = cardData.name;
  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;

  // Вешаем обработчик удаления
  deleteButton.addEventListener('click', () => {
    deleteCardCallback(cardElement);
  });

  return cardElement;
}

function handleDelete(cardElement) {
  cardElement.remove();
}

const placesList = document.querySelector('.places__list');
initialCards.forEach(function (item) {
  const card = createCard(item, handleDelete);
  placesList.append(card);
});




// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу