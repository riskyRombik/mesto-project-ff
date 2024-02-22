import { deleteCard, updateCardLikeStatus } from "./api";
import { openModal, closeModal } from "./modal";
const cardTemplate = document.querySelector("#card-template").content;
let idCard;
let removeCard
let currentCard

function handleDeleteCard(idCard, popup) {
  deleteCard('/cards/', idCard)
  .then((response) => {
      removeCard.remove();
      closeModal(popup);
  })
  .catch((error) => console.error('Произошла ошибка при удалении карточки:', error))
}

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

function showLikesNumber(data, element) {
  element.textContent = data.likes.length;
}

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

function createCard(cardData, showImg, idUser, popupTypeDelete, like, removeCard) {
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  const cardDeleteButton = cardElement.querySelector(".card__delete-button");
  const cardPicture = cardElement.querySelector(".card__image");
  const cardTitle = cardElement.querySelector(".card__title");
  const cardLikeButton = cardElement.querySelector(".card__like-button")
  const likeCountElement = cardElement.querySelector('.card__like-counter');

  cardPicture.src = cardData.link;
  cardTitle.textContent = cardData.name;
  cardPicture.alt = "На этой картинке " + cardData.name;

  checkID(idUser, cardData.owner._id, cardDeleteButton)

  cardDeleteButton.addEventListener("click",() => {
    removeCard(popupTypeDelete, cardData._id, cardElement)
  });
  cardLikeButton.addEventListener("click", () => {
    like(cardData._id, idUser, cardElement)
  });
  cardPicture.addEventListener("click", () => {
    showImg(cardData.link, cardData.name);
  });

  showLikesNumber(cardData, likeCountElement)
  const likedUsersIds = cardData.likes.map(like => like._id);
  if (likedUsersIds.includes(idUser)) {
    cardLikeButton.classList.add("card__like-button_is-active");
  } else {
    cardLikeButton.classList.remove("card__like-button_is-active");
  }
  return cardElement;
}

function addCard(card) {
  cardPlaces.append(card);
}


export { createCard, cardPlaces, addCard, idCard, handleDeleteCard, onLike, onDelete};


