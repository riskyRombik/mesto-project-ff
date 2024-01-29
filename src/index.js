import './pages/index.css';
import { initialCards } from './components/cards';
import { createCard, cardPlaces} from './components/card';
import { openModal, closeModal} from './components/modal';
// Темплейт карточки
const cardTemplate = document.querySelector("#card-template").content;
//попап изменения данных профиля
const popupEdit = document.querySelector('.popup_type_edit');
const popupEditButton = document.querySelector('.profile__edit-button');
//попап создания новой карточки
const popupNewCard = document.querySelector('.popup_type_new-card');
const popupNewCardButton = document.querySelector('.profile__add-button');
//Функция добавления карточки
function addCard(card){
  cardPlaces.append(card);
};
//Вывести карточки на страницу
initialCards.forEach(function(card) {
  const cardData = createCard(card);
  addCard(cardData);
});
// Слушатели на кнопки попапов
popupEditButton.addEventListener('click', () => {openModal(popupEdit);});
popupNewCardButton.addEventListener('click', () => {openModal(popupNewCard);});

// функция открытия модального окна с изображением карточки
function showImg(cardImg, cardTitle) {
  const popImg = document.querySelector('.popup_type_image');
  document.querySelector('.popup__image').src = cardImg;
  document.querySelector('.popup__caption').textContent = cardTitle;
  openModal(popImg);
}

const formProfile = document.querySelector('[name="edit_profile"]');
const nameInput = formProfile.querySelector('.popup__input_type_name');
const jobInput = formProfile.querySelector('.popup__input_type_description');
// функция заполнения полей формы 
function saveFormFields () {
  const profileTitle = document.querySelector('.profile__title').textContent;
  const profileDescription = document.querySelector('.profile__description').textContent;
  nameInput.value = profileTitle;
  jobInput.value = profileDescription;
}
// функция изменения данных профиля
function handleFormProfileSubmit(evt) {
    evt.preventDefault(); 
    const name = nameInput.value
    const job = jobInput.value;
    document.querySelector('.profile__title').textContent = name;
    document.querySelector('.profile__description').textContent = job;
    closeModal(popupEdit)
}
// Колбэк для изменения данных профиля
formProfile.addEventListener('submit', handleFormProfileSubmit);
// Колбэк для заполнения полей формы данных о пользователе
popupEditButton.addEventListener('click', saveFormFields);
// Функция 
const formNewCard = document.querySelector('[name="new-place"]');
function handleFormNewPlaceSubmit(evt) {
  evt.preventDefault(); 
  const cardName = formNewCard.querySelector('.popup__input_type_card-name');
  const cardLink = formNewCard.querySelector('.popup__input_type_url');
  const cardData = [];
  cardData.name = cardName.value;
  cardData.link = cardLink.value;
  const card = createCard(cardData);
  cardPlaces.prepend(card);
  cardName.value = '';
  cardLink.value = '';
  closeModal(popupNewCard)
}
formNewCard.addEventListener('submit', handleFormNewPlaceSubmit);

export{cardTemplate, showImg};



