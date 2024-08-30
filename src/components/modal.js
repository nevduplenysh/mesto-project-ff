export function openModal(popup) {
    popup.classList.add('popup_is-opened');
    popup.addEventListener('click', closeByOverlay);
    document.addEventListener('keydown', closeByEsc);
}

export function closeModal(popup) {
    popup.classList.remove('popup_is-opened');
}

function closeByEsc(evt) {
    if (evt.key === 'Escape') {
        const popupOpen = document.querySelector('.popup_is-opened');
        closeModal(popupOpen);
    }
}

function closeByOverlay(evt) {
    if (evt.target === evt.currentTarget) {
        const popupOpen = document.querySelector('.popup_is-opened');
        closeModal(popupOpen);
    }
}