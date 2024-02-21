import "./pages/index.css";
// import { initialCards } from "./components/cards";
import { createCard, cardPlaces, displayCard, idCard, handleDeleteCard } from "./components/card";
import { openModal, closeModal, renderLoading } from "./components/modal";
import { enableValidation,  validationConfig, clearValidation } from "./components/validation";
import { getData, updateUser, postNewCard, requestAvatar} from "./components/api";

// Темплейт карточки
const cardTemplate = document.querySelector("#card-template").content;
//попап изменения данных профиля
const popupEdit = document.querySelector(".popup_type_edit");
const popupEditButton = document.querySelector(".profile__edit-button");
//попап создания новой карточки
const popupNewCard = document.querySelector(".popup_type_new-card");
const popupNewCardButton = document.querySelector(".profile__add-button");
let idUser;




// Слушатели на кнопки попапов
popupEditButton.addEventListener("click", () => {
  openModal(popupEdit);
  clearValidation(popupEdit, validationConfig);
});
popupNewCardButton.addEventListener("click", () => {
  openModal(popupNewCard);
  clearValidation(popupNewCard, validationConfig);
});



const formProfile = document.querySelector('[name="edit_profile"]');
const nameInput = formProfile.querySelector(".popup__input_type_name");
const jobInput = formProfile.querySelector(".popup__input_type_description");
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const popupTypeDelete = document.querySelector(".popup_type_delete")
const formDelete= document.querySelector('[name="delete-card"]');
const popupTypeAvatar = document.querySelector(".popup_type_avatar")
const formAvatar = document.querySelector('[name="new-avatar"]');

// функция заполнения полей формы
function saveFormFields() {
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDescription.textContent;
}

function recordingProfileData (data) {
  profileTitle.textContent = data.name;
  profileDescription.textContent = data.about;
}

// функция изменения данных профиля
function handleFormProfileSubmit(evt) {
  evt.preventDefault();
  renderLoading(true);
  const name = profileTitle.textContent = nameInput.value;
  const about = profileDescription.textContent = jobInput.value;
  updateUser('/users/me', name, about)
  .finally(() => {
    renderLoading(false);
  }); 
  closeModal(popupEdit);
}
// Колбэк для изменения данных профиля
formProfile.addEventListener("submit", handleFormProfileSubmit);
// Колбэк для заполнения полей формы данных о пользователе
popupEditButton.addEventListener("click", saveFormFields);

formDelete.addEventListener("click", () => {
  handleDeleteCard(idCard, popupTypeDelete);
});

const formNewCard = document.querySelector('[name="new-place"]');
const cardName = formNewCard.querySelector(".popup__input_type_card-name");
const cardLink = formNewCard.querySelector(".popup__input_type_url");

function handleFormNewPlaceSubmit(evt) {
  evt.preventDefault();
  renderLoading(true);
  const cardItem = cardName.value;
  const cardSrc = cardLink.value;
  
  postNewCard('/cards', cardItem, cardSrc)
  .then(data => {
    const card = createCard(data); // Функция createCard создает DOM-элемент карточки на основе полученных данных
    cardPlaces.prepend(card); // Вставляем созданный элемент в начало контейнера
    cardName.value = "";
    cardLink.value = "";
    closeModal(popupNewCard);
  })
  .catch(err => console.log(err))
  .finally(() => {
    renderLoading(false);
  }); 
}
formNewCard.addEventListener("submit", handleFormNewPlaceSubmit);

enableValidation(validationConfig);

const profileImage = document.querySelector(".profile__image");
const cardLinkAvatar = formAvatar.querySelector(".popup__input_type_url");
profileImage.addEventListener("click", (event) => {
  if (event.target !== profileImage) {
    return;
  } 
  openModal(popupTypeAvatar);
}); 

function updateAvatar() {
  const cardSrc = cardLinkAvatar.value;
  requestAvatar('/users/me/avatar', cardSrc)
  .then(data => {
    console.log(data);
    profileImage.style.backgroundImage = `url(${data.avatar})`;
    closeModal(popupTypeAvatar);
  })
  .catch(err => console.error(err))
  .finally(() => {
    renderLoading(false);
  }); 
}
formAvatar.addEventListener('submit', (event) => {
  event.preventDefault();
  updateAvatar()
})

  Promise.all([getData('/users/me'), getData('/cards')])
  .then(([userData, cardData]) => {
    console.log(cardData)
    idUser = userData._id;
    profileImage.style.backgroundImage = `url(${userData.avatar})`;
    recordingProfileData(userData);
    displayCard(cardData, idUser, popupTypeDelete);
  })
  .catch(error => console.error('Произошла ошибка:', error));


export { cardTemplate};


