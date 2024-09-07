const PATH = 'https://nomoreparties.co/v1/wff-cohort-21';
const token = '58424349-ffcc-497d-977f-b1a09bbde998';
const handleResult = (result) => {
    if (result.ok) {
        return result.json();
    } else {
        return Promise.reject(`Ошибка: ${result.status}`);
    }
}

export const getDataUser = () => {
    return fetch(`${PATH}/users/me`, {
        headers: {
            authorization: token
        }
    }) 
    .then(handleResult);
}

export const getDataCard = () => {
    return fetch(`${PATH}/cards`, {
        headers: {
          authorization: token
        }
    })
    .then(handleResult);
}

export const editDataProfile = (data) => {
    return fetch(`${PATH}/users/me`, {
        method: 'PATCH',
        headers: {
          authorization: token,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(handleResult);
}

export const getDataNewCard = (data) => {
    return fetch(`${PATH}/cards`, {
        method: 'POST',
        headers: {
          authorization: token,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(handleResult);
}

export const deleteDataCard = (data) => {
    return fetch(`${PATH}/cards/${data}`, {
        method: 'DELETE',
        headers: {
          authorization: token,
          'Content-Type': 'application/json'
        }
        
    })
    .then(handleResult);
}

export const addLike = (cardId) => {
    return fetch(`${PATH}/cards/likes/${cardId}`, {
        method: 'PUT',
        headers: {
            authorization: token,
            'Content-Type': 'application/json'
        }
    })
    .then(handleResult);
}

export const removeLike = (cardId) => {
    return fetch(`${PATH}/cards/likes/${cardId}`, {
        method: 'DELETE',
        headers: {
            authorization: token,
            'Content-Type': 'application/json'
        }
    })
    .then(handleResult);
}

export const editDataAvatar = (data) => {
    return fetch(`${PATH}/users/me/avatar`, {
        method: 'PATCH',
        headers: {
            authorization: token,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            avatar: data.avatar
        })
    })
    .then(handleResult);
}