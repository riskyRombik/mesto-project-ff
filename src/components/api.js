
const headers =
  {
    authorization: '5535a833-4ea2-4146-a052-14fe6658fadc',
    'Content-Type': 'application/json'
  }
const baseUrl = 'https://nomoreparties.co/v1/wff-cohort-6';

const response =
(res) => {
  if (res.ok) {
      return res.json();
  } else {
      throw new Error(`Ошибка: ${res.status}`);
  }
}

function getData (uri) {
  return fetch(baseUrl + uri, {
    headers: headers
  })
    .then(response)
}

function updateUser (uri, newName, newAbout) {
  return fetch(baseUrl + uri, {
      method: 'PATCH',
      headers: headers,
      body: JSON.stringify({ 
          name: newName, 
          about: newAbout 
      }) 
  })
  .then(response)
  .catch(err => console.log(err));
}

function postNewCard (uri, name, link) {
  return fetch(baseUrl + uri, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify({ 
          name: name, 
          link: link 
      }) 
  })
  .then(response)
  .catch(err => console.log(err));
}

function deleteCard (uri, cardId) {
  return fetch(baseUrl + uri + cardId, {
    method: 'DELETE',
    headers: headers,
  }) 
  .then(response)
  .catch(err => console.log(err));
}

function requestAvatar (uri, link) {
  return fetch(baseUrl + uri, {
    method: 'PATCH',
    headers: headers,
    body: JSON.stringify({ 
      avatar: link 
    }) 
  }) 
  .then(response)
  .catch(err => console.log(err));
}

function updateCardLikeStatus(uri, cardId, method) {
  return fetch(baseUrl + uri + cardId, {
      method: method,
      headers: headers,
  })
  .then(response => {
      if (response.ok) {
          return response.json();
      } else {
          throw new Error(`Ошибка: ${response.status}`);
      }
  });
}

export {getData, updateUser, postNewCard, deleteCard, requestAvatar, updateCardLikeStatus};
