function openModal(popup) {
  // объявляем функцию открытия модального окна, которая принимает в качестве параметров селекторы кнопки и соответствующего модального окна
  popup.classList.add("popup_is-opened");
  document.addEventListener("keydown", closeByEsc);
  popup.addEventListener("click", clickModalClose);
}

function closeModal(popup) {
  popup.classList.remove("popup_is-opened");
  document.removeEventListener("keydown", closeByEsc);
  popup.removeEventListener("click", clickModalClose);
}

function closeByEsc(evt) {
  if (evt.key === "Escape") {
    const openPopup = document.querySelector(".popup_is-opened");
    closeModal(openPopup)
  }
}

function clickModalClose(evt) {
  if (
    evt.target.closest(".popup__close") ||
    !evt.target.closest(".popup__content")
  ) {
    const openPopup = document.querySelector(".popup_is-opened");
    closeModal(openPopup);
  }
}

function renderLoading (isLoading) {
const content = document.querySelector('.button__text');
if (isLoading) {
  content.textContent = 'Сохранение...'
}else{
  content.textContent='Сохранение'
}
}

export { openModal, closeModal, clickModalClose, renderLoading};
