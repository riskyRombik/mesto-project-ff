// @todo: Темплейт карточки
const cardPlaces = document.querySelector(".places__list");
const cardTemplate = document.querySelector("#card-template").content;
// @todo: Функция создания карточки
function createCard(cardTitle, cardImage){

  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  const cardDeleteButton = cardElement.querySelector(".card__delete-button");

  cardElement.querySelector(".card__image").src = cardImage;
  cardElement.querySelector(".card__title").textContent = cardTitle;
  cardElement.querySelector(".card__image").alt = cardTitle;

  cardDeleteButton.addEventListener("click", deleteCard);
  
  return cardElement;
};

// @todo: Функция добавления карточки
function addCard(card){
  cardPlaces.append(card);
};

// @todo: Функция удаления карточки
function deleteCard(evt){
  evt.target.parentElement.remove();
};

// @todo: Вывести карточки на страницу
initialCards.forEach(function(card) {
  const cardData = createCard(card.name, card.link);
  addCard(cardData);
});
