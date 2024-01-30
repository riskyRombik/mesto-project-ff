//Функция создания карточки
import { cardTemplate} from "..";
const cardPlaces = document.querySelector(".places__list");
function createCard(card,showImg){
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  const cardDeleteButton = cardElement.querySelector(".card__delete-button");
  const cardPicture = cardElement.querySelector('.card__image');
  const cardTitle = cardElement.querySelector(".card__title")
  cardPicture.src = card.link;
  cardTitle.textContent = card.name;
  cardPicture.alt = 'На этой картинке ' + card.name;
  cardDeleteButton.addEventListener("click", deleteCard);
  cardElement.addEventListener('click', likeCard);
  cardPicture.addEventListener("click", () => {
    showImg(card.link, card.name);
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