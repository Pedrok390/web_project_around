let editProfile = document.querySelector(".profile__edit-button");
let addElement = document.querySelector(".profile__add-button");
let closeElementButton = document.querySelector(".add-container__close");
let closeProfileButton = document.querySelector(".edit-container__close");
let formElement = document.querySelector(".add-container__form");
let formProfile = document.querySelector(".edit-container__form");
let cardContainer = document.querySelector(".elements");
const cardTemplate = document.querySelector("#card-template").content;

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
function createCard(name, link) {
  const cardElement = cardTemplate.querySelector(".element").cloneNode(true);
  cardElement.querySelector(".element__image").src = link;
  cardElement.querySelector(".element__image").alt = name;
  cardElement.querySelector(".element__name").textContent = name;
  cardElement
    .querySelector(".element__image")
    .addEventListener("click", function () {
      modalElements(name, link);
      checkModal("elements__modal");
    });
  cardElement
    .querySelector(".element__delete")
    .addEventListener("click", function () {
      cardElement.remove();
    });
  cardElement
    .querySelector(".element__like")
    .addEventListener("click", function () {
      this.classList.toggle("element__like_type_liked");
    });
  cardContainer.append(cardElement);
}
//Inicialização dos Cards iniciais do projeto
function initializeCards() {
  initialCards.forEach((item) => {
    createCard(item.name, item.link);
  });
}
initializeCards();

//Submit Edição do Perfil
function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  let nameInput = document.querySelector("#name");
  let jobInput = document.querySelector("#job");
  let nameContainer = document.querySelector(".profile__name");
  let jobContainer = document.querySelector(".profile__job");

  nameContainer.textContent = nameInput.value;
  jobContainer.textContent = jobInput.value;

  checkModal("profile__modal");
}

formProfile.addEventListener("submit", handleProfileFormSubmit);

//Checar Modais do projeto para caso estejam visiveis ou não
function checkModal(type) {
  const modal = document.querySelector(`.${type}`);
  const typeClass = `${type}_visibility_visible`;
  modal.classList.toggle(typeClass);
}
editProfile.addEventListener("click", function () {
  checkModal("profile__modal");
});
closeProfileButton.addEventListener("click", function () {
  checkModal("profile__modal");
});

addElement.addEventListener("click", function () {
  checkModal("card__modal");
});
closeElementButton.addEventListener("click", function () {
  checkModal("card__modal");
});

//Adição de Elementos
function handleElementFormSubmit(evt) {
  evt.preventDefault();
  let title = document.querySelector("#title");
  let link = document.querySelector("#link");

  createCard(title.value, link.value);

  checkModal("card__modal");
}
formElement.addEventListener("submit", handleElementFormSubmit);

function modalElements(name, link) {
  document.querySelector(".elements__modal-image").src = link;
  document.querySelector(".elements__modal-image").alt = name;
  document.querySelector(".elements__modal-name").textContent = name;
}
document
  .querySelector(".elements__modal-close")
  .addEventListener("click", function () {
    checkModal("elements__modal");
  });
