//Функция создания карточки
import { cardTemplate, showImg } from "..";
const cardPlaces = document.querySelector(".places__list");
function createCard(card){
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  const cardDeleteButton = cardElement.querySelector(".card__delete-button");
  const cardPicture = cardElement.querySelector('.card__image');

  cardElement.querySelector(".card__image").src = card.link;
  cardElement.querySelector(".card__title").textContent = card.name;
  cardElement.querySelector(".card__image").alt = card.name;

  cardDeleteButton.addEventListener("click", deleteCard);
  cardElement.addEventListener('click', likeCard);
  cardPicture.addEventListener("click", () => {
    return showImg(card.link, card.name);
  });
  return cardElement;
};

// Функция удаления карточки
function deleteCard(evt){
  const removeCard = evt.target.closest('.card');
  removeCard.remove();
};

// Лайк карточки по кнопке
function likeCard (evt){
  if (evt.target.classList.contains('card__like-button')) {
  evt.target.classList.toggle('card__like-button_is-active');
  };  
};

export {createCard, cardPlaces};