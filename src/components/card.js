export function createCard(cardData, deleteCardCallback, clickCardCallback) {
  const template = document.querySelector('#card-template').content;
  const cardElement = template.querySelector('.places__item').cloneNode(true);

  const cardTitle = cardElement.querySelector('.card__title');
  const cardImage = cardElement.querySelector('.card__image');
  const deleteButton = cardElement.querySelector('.card__delete-button');
  const likeButton = cardElement.querySelector('.card__like-button');

  cardTitle.textContent = cardData.name;
  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;

  deleteButton.addEventListener('click', () => deleteCardCallback(cardElement));
  likeButton.addEventListener('click', () => likeButton.classList.toggle('card__like-button_is-active'));
  cardImage.addEventListener('click', () => clickCardCallback(cardData.name, cardData.link));

  return cardElement;
}

export function handleDelete(cardElement) {
  cardElement.remove();
}