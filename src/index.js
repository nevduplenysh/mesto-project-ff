import './pages/index.css';

import { initialCards } from './components/cards';

import { openModal } from './components/modal';
import { closeModal } from './components/modal';
import { closeByOverlay } from './components/modal';

import { createCard } from './components/card';
import { deletingCard } from './components/card';
import { likeCard } from './components/card';

import { enableValidation } from './components/validation';
import { clearValidation } from './components/validation';

import { getDataCard } from './components/api';
import { getDataUser } from './components/api';
import { editDataProfile } from './components/api';
import { getDataNewCard } from './components/api';
import { editDataAvatar } from './components/api';



// ИНИЦИАЛИЗАЦИЯ ПЕРЕМЕННЫХ 
const container = document.querySelector('.places');
const cardList = container.querySelector('.places__list');

const editPopup = document.querySelector('.popup_type_edit');
const addCardPopup = document.querySelector('.popup_type_new-card');
const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');
const closeButtons = document.querySelectorAll('.popup__close');

const popupImg = document.querySelector('.popup_type_image');

const formEdit = document.querySelector('.popup_type_edit .popup__form'); 
const nameInput = document.querySelector('.popup__input_type_name'); 
const jobInput = document.querySelector('.popup__input_type_description'); 
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');

const formCard = document.querySelector('.popup_type_new-card .popup__form');
const cardNameInput = document.querySelector('.popup__input_type_card-name');
const cardUrlInput = document.querySelector('.popup__input_type_url');

const avatarImage = document.querySelector('.profile__image')
const avatarPopup = document.querySelector('.popup_type_edit-avatar');
const formAvatar = document.querySelector('.popup_type_edit-avatar .popup__form');
const avatarUrlInput = document.querySelector('.popup__input__avatar_url')

const submitButtonEdit = formEdit.querySelector('.popup__button')
const submitButtonCard = formCard.querySelector('.popup__button');

const submitButtonAvatar = formAvatar.querySelector('.popup__button');

const validationConfig = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
  }

avatarImage.addEventListener('click', () => {
    formAvatar.reset();
    openModal(avatarPopup);
    clearValidation(formAvatar, validationConfig);
});

Promise.all([getDataUser(), getDataCard()])
    .then(([resultDataUser, resultDataCard]) => {
        console.log(resultDataUser);
        profileTitle.textContent = resultDataUser.name;
        profileDescription.textContent = resultDataUser.about;
        avatarImage.style.backgroundImage = `url(${resultDataUser.avatar})`;
        const userId = resultDataUser._id;
        resultDataCard.forEach((dataCard) => {
            cardList.append(createCard(dataCard, deletingCard, likeCard, gettingDataImg, userId));
        })
    })
    .catch((err) => {
        console.log(err);
    });


// ПЛАВНОЕ ОТКРЫТИЕ И ЗАКРЫТИЕ 
editPopup.classList.add('popup_is-animated');
addCardPopup.classList.add('popup_is-animated');
popupImg.classList.add('popup_is-animated');
avatarPopup.classList.add('popup_is-animated')

// Функция открытия popup для редактирования профиля
editButton.addEventListener('click', () => {
    openModal(editPopup);
    clearValidation(formEdit, validationConfig);
});

// Функция открытия popup для добавления новой карточки
addButton.addEventListener('click', () => {
    formCard.reset();
    openModal(addCardPopup);
    clearValidation(formCard, validationConfig);
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

function openEditPopup() {
    nameInput.value = profileTitle.textContent; 
    jobInput.value = profileDescription.textContent; 
}

function editProfile(evt) {
    evt.preventDefault();

    const newNameInput = nameInput.value;
    const newJobInput = jobInput.value;

    renderLoading(true, submitButtonEdit);

    editDataProfile({
        name: newNameInput,
        about: newJobInput
    })
    .then((res) => {
        profileTitle.textContent = res.name; 
        profileDescription.textContent = res.about;
    })
    .catch((err) => {
        console.log(err); 
    })
    .finally(() => {
        renderLoading(false, submitButtonEdit);
    });

    closeModal(editPopup);
}

function addingNewCard(evt) {
    evt.preventDefault();

    const newCardNameInput = cardNameInput.value;
    const newCardUrlInput = cardUrlInput.value;
    renderLoading(true, submitButtonCard)
 
    getDataNewCard({
        name: newCardNameInput,
        link: newCardUrlInput
    })

    .then((res) => {
        const newDataCard = res;
        const userId = newDataCard.owner._id;
        cardList.prepend(createCard(newDataCard, deletingCard, likeCard, gettingDataImg, userId));
        closeModal(addCardPopup);
        formCard.reset();
    })

    .catch((err) => {
        console.log(err);
    })
    .finally(() => {
        renderLoading(false, submitButtonCard);
    });
}

function editAvatar (evt) {
    evt.preventDefault();
    const newAvatarUrlInput = avatarUrlInput.value;
    renderLoading(true, submitButtonAvatar)
    editDataAvatar({
        avatar: newAvatarUrlInput
    })
    .then((res) => {
        avatarImage.style.backgroundImage = `url(${res.avatar})`; 
        closeModal(avatarPopup);
        formAvatar.reset(); 
    })
    .catch((err) => {
        console.log(err);
    })
    .finally(() => {
        renderLoading(false, submitButtonAvatar);
    });
}

function renderLoading(isLoading, button) {
    button.textContent = isLoading ? 'Сохранение...' : 'Сохранить';
}

editPopup.addEventListener('click', closeByOverlay);
addCardPopup.addEventListener('click', closeByOverlay);
popupImg.addEventListener('click', closeByOverlay);
avatarPopup.addEventListener('click', closeByOverlay)

formEdit.addEventListener('submit', editProfile);
editButton.addEventListener('click', openEditPopup);

formCard.addEventListener('submit', addingNewCard);

formAvatar.addEventListener('submit', editAvatar);



enableValidation(validationConfig); 




