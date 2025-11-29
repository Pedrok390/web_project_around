import { Card } from "./Card.js";
import {
  popupClose,
  handleOpenForm,
  handleCloseForm,
  popupHandler,
} from "./utils.js";

import { FormValidator, config } from "./FormValidator.js";

const profile = document.querySelector("#profile");
const card = document.querySelector("#card");
const cardContainer = document.querySelector(".elements");
const initialCards = [
  {
    name: "Vale de Yosemite",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_yosemite.jpg",
  },
  {
    name: "Lago Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_lake-louise.jpg",
  },
  {
    name: "Montanhas Carecas",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_latemar.jpg",
  },
  {
    name: "Parque Nacional da Vanoise ",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_lago.jpg",
  },
];
//Criação de Cards

initialCards.forEach((item) => {
  const card = new Card(item, "#card-template");
  const cardElement = card.generateCard();

  cardContainer.prepend(cardElement);
});
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

profile.addEventListener("submit", handleProfileFormSubmit);

popupHandler();

//Adição de Elementos
function handleElementFormSubmit() {
  let title = document.querySelector("#title");
  let link = document.querySelector("#link");

  const card = new Card([title.value, link.value], "#card-template");
  const cardElement = card.generateCard();

  cardContainer.prepend(cardElement);

  checkPopup(card);
}
card.addEventListener("submit", handleElementFormSubmit);
