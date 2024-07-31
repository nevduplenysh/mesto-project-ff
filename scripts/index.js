// @todo: Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;

// @todo: DOM узлы
const container = document.querySelector('.places');
const cardList = container.querySelector('.places__list');

// @todo: Функция создания карточки
function createCard(dataCard, deletingCard) {
    const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true);

    cardElement.querySelector('.card__image').src = dataCard.link;
    cardElement.querySelector('.card__image').atl = dataCard.name;
    cardElement.querySelector('.card__title').textContent = dataCard.name;

    const deletingButton = cardElement.querySelector('.card__delete-button');

    deletingButton.addEventListener('click', function() {
        deletingCard(cardElement);
    })

    return cardElement;
}

// @todo: Функция удаления карточки
const removal = function deletingCard(element) {
    element.remove();
}

// @todo: Вывести карточки на страницу
for (let i = 0; i < initialCards.length; i++) {
    cardList.append(createCard(initialCards[i], removal));
}
