let editProfile = document.querySelector(".profile__edit-button");
let addElement = document.querySelector(".profile__add-button");
let profile = document.querySelector("#profile");
let card = document.querySelector("#card");
let closeElementButton = card.querySelector(".popup__close");
let closeProfileButton = profile.querySelector(".popup__close");
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
      const modal = document.querySelector(".elements__modal");
      checkPopup(modal);
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
  cardContainer.prepend(cardElement);
}
//Inicialização dos Cards iniciais do projeto
function initializeCards() {
  initialCards.forEach((item) => {
    createCard(item.name, item.link);
  });
}
initializeCards();

//Submit Edição do Perfil
function handleProfileFormSubmit() {
  const nameInput = document.querySelector("#name");
  const jobInput = document.querySelector("#job");
  const nameContainer = document.querySelector(".profile__name");
  const jobContainer = document.querySelector(".profile__job");

  nameContainer.textContent = nameInput.value;
  jobContainer.textContent = jobInput.value;

  checkPopup("profile__modal");
}

profile.addEventListener("submit", handleProfileFormSubmit);

//Checar Modais do projeto para caso estejam visiveis ou não
function checkPopup(type) {
  const modal = type;
  modal.classList.toggle("popup_visibility_visible");
}

function popupHandler() {
  const popupList = document.querySelectorAll(".popup");
  popupList.forEach((item) => {
    item.addEventListener("click", (evt) => {
      if (evt.target.classList.contains("popup")) {
        checkPopup(item);
      }
    });
    item.addEventListener("keydown", (evt) => {
      if (evt.key === "Escape") {
        checkPopup(item);
      }
    });
    const buttonOpen = document.querySelector(`#${item.id}__button`);
    buttonOpen.addEventListener("click", () => {
      checkPopup(item);
    });
    const buttonClose = item.querySelector(".popup__close");
    buttonClose.addEventListener("click", () => {
      checkPopup(item);
    });
  });
}
popupHandler();

//Adição de Elementos
function handleElementFormSubmit() {
  let title = document.querySelector("#title");
  let link = document.querySelector("#link");

  createCard(title.value, link.value);

  checkPopup("card");
}
card.addEventListener("submit", handleElementFormSubmit);

function modalElements(name, link) {
  document.querySelector(".elements__modal-image").src = link;
  document.querySelector(".elements__modal-image").alt = name;
  document.querySelector(".elements__modal-name").textContent = name;
}
document
  .querySelector(".elements__modal-close")
  .addEventListener("click", function () {
    checkPopup(document.querySelector(".elements__modal"));
  });
