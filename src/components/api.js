const config = {
  baseUrl: 'https://nomoreparties.co/v1/wff-cohort-41',
  headers: {
    authorization: '74889b78-5348-4387-ae0d-ea742b692c1a',
    'Content-Type': 'application/json'
  }
};

export function getUserInfo() {
  return fetch(`${config.baseUrl}/users/me`, {
    headers: config.headers
  }).then(res => res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`));
}

export function getInitialCards() {
  return fetch(`${config.baseUrl}/cards`, {
    headers: config.headers
  }).then(res => res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`));
}

export function updateUserInfo({ name, about }) {
  return fetch(`${config.baseUrl}/users/me`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({ name, about })
  }).then(res => res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`));
}

export function addCard({ name, link }) {
  return fetch(`${config.baseUrl}/cards`, {
    method: 'POST',
    headers: config.headers,
    body: JSON.stringify({ name, link })
  }).then(res => res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`));
}

export function deleteCard(cardId) {
  return fetch(`${config.baseUrl}/cards/${cardId}`, {
    method: 'DELETE',
    headers: config.headers
  }).then(res => res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`));
}

export function toggleLike(cardId, isLiked) {
  const method = isLiked ? 'DELETE' : 'PUT';
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method,
    headers: config.headers
  }).then((res) =>
    res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`)
  );
}

export function updateAvatar(avatarUrl) {
  return fetch(`${config.baseUrl}/users/me/avatar`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({ avatar: avatarUrl })
  }).then(res => res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`));
}






