//Функция создания карточки
import { cardTemplate } from "..";
import { deleteCard, updateCardLikeStatus } from "./api";
import { openModal, closeModal } from "./modal";

let idCard;
let removeCard
let currentCard

function handleDeleteCard(idCard, popup) {
  removeCard.remove();
  deleteCard('/cards/',`${idCard}`)
  closeModal(popup);
};

function onDelete(popup, data, cardElement){
  openModal(popup);
  idCard = data;
  removeCard = cardElement;
};

function checkID(idUser, idOwner, element) {
  if (idUser === idOwner) {
    element.style.display = '';
  } else {
    element.style.display = 'none';
  }
};

function onLike(data, idUser, cardElement) {
    currentCard = cardElement;
    idCard = data
    likeCard(idUser);
};

function likeCard(idUser) {
  const likeButton = currentCard.querySelector('.card__like-button');
  const likeCountElement = currentCard.querySelector('.card__like-counter');
  const isLiked = likeButton.classList.contains("card__like-button_is-active");
  const uri = `/cards/likes/`;
  const method = isLiked ? 'DELETE' : 'PUT';
  updateCardLikeStatus(uri, idCard, method)
      .then(updatedCard => {
          const likedUsersIds = updatedCard.likes.map(like => like._id);
          if (likedUsersIds.includes(idUser)) {
              likeButton.classList.add("card__like-button_is-active");
          } else {
              likeButton.classList.remove("card__like-button_is-active");
          }
          likeCountElement.textContent = updatedCard.likes.length;
      })
      .catch(error => console.error('Ошибка при обновлении лайка:', error));
}

const cardPlaces = document.querySelector(".places__list");

function createCard(cardData, showImg, idUser, popupTypeDelete) {
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  const cardDeleteButton = cardElement.querySelector(".card__delete-button");
  const cardPicture = cardElement.querySelector(".card__image");
  const cardTitle = cardElement.querySelector(".card__title");
  const cardLikeButton = cardElement.querySelector(".card__like-button")

  cardPicture.src = cardData.link;
  cardTitle.textContent = cardData.name;
  cardPicture.alt = "На этой картинке " + cardData.name;

  checkID(idUser, cardData.owner._id, cardDeleteButton)

  cardDeleteButton.addEventListener("click",() => {
    onDelete(popupTypeDelete, cardData._id, cardElement)
  });
  cardLikeButton.addEventListener("click", () => {
    onLike(cardData._id, idUser, cardElement)
  });
  cardPicture.addEventListener("click", () => {
    showImg(cardData.link, cardData.name);
  });
  const likedUsersIds = cardData.likes.map(like => like._id);
  if (likedUsersIds.includes(idUser)) {
    cardLikeButton.classList.add("card__like-button_is-active");
  } else {
    cardLikeButton.classList.remove("card__like-button_is-active");
  }
  return cardElement;
}
//функция отображения карточки
function displayCard(data, idUser, popupTypeDelete) {
  const likesCountMap = new Map();
  // Создаем карточки и добавляем их на страницу
  data.forEach(function (card) {
    const cardData = createCard(card, showImg, idUser, popupTypeDelete);
    addCard(cardData);
    likesCountMap.set(card._id, card.likes.length); // Сохраняем количество лайков для каждой карточки
  });
  // Обновляем информацию о количестве лайков для карточек
  const likeCountElements = document.querySelectorAll('.card__like-counter');
  likeCountElements.forEach((element, index) => {
    const cardId = data[index]._id;
    const likesCount = likesCountMap.get(cardId);
    element.textContent = likesCount;
  });
}

function addCard(card) {
  cardPlaces.append(card);
}
// функция открытия модального окна с изображением карточки
const popTypeImage = document.querySelector(".popup_type_image");
const popImage = document.querySelector(".popup__image");
const popCaption = document.querySelector(".popup__caption");
function showImg(cardImg, cardTitle) {
  popImage.src = cardImg;
  popCaption.textContent = cardTitle;
  popImage.alt = cardTitle;
  openModal(popTypeImage);
}

export { createCard, cardPlaces, displayCard, idCard, handleDeleteCard };


