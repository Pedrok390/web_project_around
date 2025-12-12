import { Card } from "../components/Card.js";
import {
  popupClose,
  handleOpenForm,
  handleCloseForm,
  popupHandler,
} from "../constants.js/utils.js";

import { FormValidator, config } from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import {
  profile,
  card,
  cardContainer,
  initialCards,
} from "../constants.js/constants.js";

//Criação de Cards
const imagePopup = new PopupWithImage(".popup_type_image");
imagePopup.setEventListeners();

const handleCardClick = (name, link) => {
  imagePopup.open(name, link);
};

const createCard = (data) => {
  const card = new Card(data, "#card-template", handleCardClick);
  const cardElement = card.generateCard();
  cardSection.addItem(cardElement);
};

const cardSection = new Section(
  { items: initialCards, renderer: createCard },
  ".elements"
);

cardSection.renderItems();

const formList = document.querySelectorAll(config.formSelector);
formList.forEach((item) => {
  const form = new FormValidator(config, item);
  form.enableValidation();
});
//Submit Edição do Perfil
function handleProfileFormSubmit() {
  const nameInput = document.querySelector("#name");
  const jobInput = document.querySelector("#job");
  const nameContainer = document.querySelector(".profile__name");
  const jobContainer = document.querySelector(".profile__job");

  nameContainer.textContent = nameInput.value;
  jobContainer.textContent = jobInput.value;

  handleCloseForm(profile);
}

popupHandler();

//Adição de Elementos
function handleElementFormSubmit() {
  let title = document.querySelector("#title");
  let link = document.querySelector("#link");

  const card = new Card([title.value, link.value], "#card-template");
  const cardElement = card.generateCard();

  cardContainer.prepend(cardElement);
}

const editProfilePopup = new PopupWithForm(handleProfileFormSubmit, "#profile");
editProfilePopup.setEventListeners();
const addCardPopup = new PopupWithForm(handleElementFormSubmit, "#card");
addCardPopup.setEventListeners();
