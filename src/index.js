import './pages/index.css';

import { initialCards } from './scripts/cards';

import { openModal } from './components/modal';
import { closeModal } from './components/modal';

import { createCard } from './components/card';
import { deletingCard } from './components/card';
import { likeCard } from './components/card';


// ИНИЦИАЛИЗАЦИЯ ПЕРЕМЕННЫХ 
const container = document.querySelector('.places');
const cardList = container.querySelector('.places__list');

const editPopup = document.querySelector('.popup_type_edit');
const addCardPopup = document.querySelector('.popup_type_new-card');
const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');
const closeButtons = document.querySelectorAll('.popup__close');

const popupImg = document.querySelector('.popup_type_image');

const formElement = document.querySelector('.popup_type_edit .popup__form'); 
const nameInput = document.querySelector('.popup__input_type_name'); 
const jobInput = document.querySelector('.popup__input_type_description'); 
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');

const formCard = document.querySelector('.popup_type_new-card .popup__form');
const cardNameInput = document.querySelector('.popup__input_type_card-name');
const cardUrlInput = document.querySelector('.popup__input_type_url');

// ПЛАВНОЕ ОТКРЫТИЕ И ЗАКРЫТИЕ 
editPopup.classList.add('popup_is-animated');
addCardPopup.classList.add('popup_is-animated');
popupImg.classList.add('popup_is-animated');

// Функция открытия popup для редактирования профиля
editButton.addEventListener('click', () => {
    openModal(editPopup);
});

// Функция открытия popup для добавления новой карточки
addButton.addEventListener('click', () => {
    openModal(addCardPopup);
});

// Закрытие popup при нажатии на кнопку закрытия
closeButtons.forEach((button) => {
    button.addEventListener('click', () => {
        const popup = button.closest('.popup');
        closeModal(popup);
    });
});

// получение данных карточки для открытия модального окна
function gettingDataImg (dataCard) {
    popupImg.querySelector('.popup__image').src = dataCard.link;
    popupImg.querySelector('.popup__image').alt = dataCard.name;
    popupImg.querySelector('.popup__caption').textContent = dataCard.name;
    openModal(popupImg);
}


initialCards.forEach((dataCard) => {
    cardList.append(createCard(dataCard, deletingCard, likeCard, gettingDataImg));
})

function openEditPopup() {
    nameInput.value = profileTitle.textContent; 
    jobInput.value = profileDescription.textContent; 
}

function handleFormSubmit(evt) {
    evt.preventDefault();

    const newNameInput = nameInput.value;
    const newJobInput = jobInput.value;

    profileTitle.textContent = newNameInput;
    profileDescription.textContent = newJobInput;

    closeModal(editPopup);
}

formElement.addEventListener('submit', handleFormSubmit);
editButton.addEventListener('click', openEditPopup);

function addingNewCard(evt) {
    evt.preventDefault();

    const newCardNameInput = cardNameInput.value;
    const newCardUrlInput = cardUrlInput.value;
    
    const newDataCard = {name: newCardNameInput, link: newCardUrlInput};
    cardList.prepend(createCard(newDataCard, deletingCard, likeCard, gettingDataImg));

    closeModal(addCardPopup);
}

formCard.addEventListener('submit', addingNewCard);
