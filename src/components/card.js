import { addLike, removeLike, deleteDataCard } from './api';

// @todo: Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;

// @todo: Функция создания карточки
export function createCard(dataCard, deletingCard, likeCard, gettingDataImg, userId) {
    const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true);

    cardElement.querySelector('.card__image').src = dataCard.link;
    cardElement.querySelector('.card__image').alt = dataCard.name;
    cardElement.querySelector('.card__title').textContent = dataCard.name;

    const deletingButton = cardElement.querySelector('.card__delete-button');
    const likeButton = cardElement.querySelector('.card__like-button');
    const counterLike =cardElement.querySelector('.card__like-counter');
    const cardOpen = cardElement.querySelector('.card__image');
    
    if (dataCard.owner && dataCard.owner._id === userId || !dataCard.owner) {
        deletingButton.addEventListener('click', () => {
            deletingCard(cardElement, dataCard._id);
            deletingButton.style.display = 'none';
        })
    } else {
        deletingButton.classList.remove('card__delete-button');
    }

    counterLike.textContent = Array.isArray(dataCard.likes) ? dataCard.likes.length : 0;

    if (dataCard.likes.some(like => like._id ===userId)) {
        likeButton.classList.add('card__like-button_is-active')
    }

    console.log(dataCard._id)

    likeButton.addEventListener('click', (evt) => {
        likeCard(evt, dataCard._id, counterLike, likeButton);
    });

    cardOpen.addEventListener('click', () => {
        gettingDataImg(dataCard);
    })

    return cardElement;
}

// @todo: Функция удаления карточки
export function deletingCard(element, cardId) {
    deleteDataCard(cardId)
    .then(() => {
       element.remove(); 
    })
    .catch((err) => {
        console.log(err);
    })

}

export function likeCard(evt, cardId, counterLike, likeButton) {
    console.log("Card ID:", cardId);
    const isLiked = likeButton.classList.contains('card__like-button_is-active');

    const likeMethod = isLiked ? removeLike : addLike;
    likeMethod(cardId) 
    .then((updatedCard) => {
        likeButton.classList.toggle('card__like-button_is-active'); 
        counterLike.textContent = updatedCard.likes.length;
    })
    .catch((err) => {
        console.log(err)
    });
}