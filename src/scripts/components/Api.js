export default class Api {
  constructor(data){
    this._baseUrl = data.baseUrl;
    this._headers = data.headers;
    this._token = this._headers.authorization;
  }

  _responseHandler(res) {return res.ok ? res.json() : Promise.reject()}

  getInfo() {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: {
        authorization: this._token
      }
    })
    .then(this._responseHandler)
  }

  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {
      headers: {
        authorization: this._token
      }
    })
    .then(this._responseHandler)
  }

  setUserData(data) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: data.editName,
        about: data.editJob
      })
    })
      .then(this._responseHandler)
  }

  setAvatar(data) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar: data.avatar,
      })
    })
      .then(this._responseHandler)
  }

  postCard(data) {
    return fetch(`${this._baseUrl}/cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        link: data.link
      })
    })
      .then(this._responseHandler)
  }

  setLike(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: 'PUT',
      headers: {
        authorization: this._token
      }
    })
      .then(this._responseHandler)
  }

  removeLike(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: 'DELETE',
      headers: {
        authorization: this._token
      }
    })
      .then(this._responseHandler)
  }

  removeCard(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}`, {
      method: 'DELETE',
      headers: {
        authorization: this._token
      }
    })
      .then(this._responseHandler)
  }
}