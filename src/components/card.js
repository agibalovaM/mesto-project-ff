export function createCard(cardData, onDelete, onLike, onClick) {
  const template = document.querySelector('#card-template').content;
  const cardElement = template.querySelector('.places__item').cloneNode(true);

  const cardTitle = cardElement.querySelector('.card__title');
  const cardImage = cardElement.querySelector('.card__image');
  const deleteButton = cardElement.querySelector('.card__delete-button');
  const likeButton = cardElement.querySelector('.card__like-button');

  cardTitle.textContent = cardData.name;
  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;

  deleteButton.addEventListener('click', () => onDelete(cardElement));
  likeButton.addEventListener('click', () => onLike(likeButton));
  cardImage.addEventListener('click', () => onClick(cardData.name, cardData.link));

  return cardElement;
}

export function handleDelete(cardElement) {
  cardElement.remove();
}