export function createCard(cardData, onDelete, onLike, onClick, currentUserId) {
  const template = document.querySelector('#card-template').content;
  const cardElement = template.querySelector('.places__item').cloneNode(true);

  const cardTitle = cardElement.querySelector('.card__title');
  const cardImage = cardElement.querySelector('.card__image');
  const deleteButton = cardElement.querySelector('.card__delete-button');
  const likeButton = cardElement.querySelector('.card__like-button');
  const likeCount = cardElement.querySelector('.card__like-count');


  cardTitle.textContent = cardData.name;
  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;
  likeCount.textContent = cardData.likes.length;

// Устанавливаем лайк, если текущий пользователь уже лайкнул
if (cardData.likes.some((user) => user._id === currentUserId)) {
  likeButton.classList.add('card__like-button_liked');
}
  // Скрываем кнопку удаления, если карточка чужая
  if (cardData.owner._id !== currentUserId) {
    deleteButton.style.display = 'none';
  } else {
    deleteButton.addEventListener('click', () => onDelete(cardElement, cardData._id));
  }

  likeButton.addEventListener('click', () => onLike(likeButton, cardData, likeCount));
  cardImage.addEventListener('click', () => onClick(cardData.name, cardData.link));

  return cardElement;
}

function handleLikeClick(likeButton, cardData, likeCount) {
  const isLiked = likeButton.classList.contains('card__like-button_liked');

  toggleLike(cardData._id, isLiked)
    .then((updatedCard) => {
      likeCount.textContent = updatedCard.likes.length;
      likeButton.classList.toggle('card__like-button_liked');
    })
    .catch((err) => console.error(err));
}
