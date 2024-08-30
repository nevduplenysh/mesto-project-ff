// @todo: Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;

// @todo: Функция создания карточки
export function createCard(dataCard, deletingCard, likeCard, gettingDataImg) {
    const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true);

    cardElement.querySelector('.card__image').src = dataCard.link;
    cardElement.querySelector('.card__image').alt = dataCard.name;
    cardElement.querySelector('.card__title').textContent = dataCard.name;

    const deletingButton = cardElement.querySelector('.card__delete-button');
    const likeButton = cardElement.querySelector('.card__like-button');
    const cardOpen = cardElement.querySelector('.card__image');

    deletingButton.addEventListener('click', () => {
        deletingCard(cardElement);
    })

    likeButton.addEventListener('click', (evt) => {
        likeCard(evt);
    })

    cardOpen.addEventListener('click', () => {
        gettingDataImg(dataCard);
    })

    return cardElement;
}

// @todo: Функция удаления карточки
export function deletingCard(element) {
    element.remove();
}
// функция лайка 
export function likeCard (evt) {
    if (evt.target.classList.contains('card__like-button')) {
        evt.target.classList.toggle('card__like-button_is-active');
    }
}
