//api.js
const config = {
  baseUrl: 'https://nomoreparties.co/v1/wff-cohort-27',
  headers: {
    authorization: '78d647ac-c117-4622-a9f8-fa9f9240e132',
    'Content-Type': 'application/json'
  }
}

function getResponseData(res) {
  if (!res.ok) {
      return Promise.reject(`Ошибка: ${res.status}`); 
  }
  return res.json();
} 

export const getCards = () => {
  return fetch(`${config.baseUrl}/cards`, {
    method: 'GET',
    headers: config.headers
  })
  .then(getResponseData);
}

export const getUserMe =() => {
  return fetch(`${config.baseUrl}/users/me`, {
    method: 'GET',
    headers: config.headers
  })
  .then(getResponseData);
}

export function editProfile(name, about){
  return fetch(`${config.baseUrl}/users/me`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      name,
      about,
    })
  })
  .then(getResponseData);
}

export function addCard(name, link){
  return fetch(`${config.baseUrl}/cards`, {
    method: 'POST',
    headers: config.headers,
    body: JSON.stringify({
      name,
      link,
    })
  })
  .then(getResponseData);
}

export function removeCard(idCard){
  return fetch(`${config.baseUrl}/cards/${idCard}`, {
    method: 'DELETE',
    headers: config.headers
  })
  .then(getResponseData);
}

export function addLikeCard(idCard){
  return fetch(`${config.baseUrl}/cards/likes/${idCard}`, {
    method: 'PUT',
    headers: config.headers
    
  })
  .then(getResponseData);
}

export function deleteLikeCard(idCard){
  return fetch(`${config.baseUrl}/cards/likes/${idCard}`, {
    method: 'DELETE',
    headers: config.headers
  })
  .then(getResponseData);
}

export function editAvatar(avatar){
  return fetch(`${config.baseUrl}/users/me/avatar`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      avatar,
    })
    
  })
  .then(getResponseData)
}
