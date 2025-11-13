const editProfile = document.querySelector(".profile__edit-button");
const addElement = document.querySelector(".profile__add-button");
const profile = document.querySelector("#profile");
const card = document.querySelector("#card");
const closeElementButton = card.querySelector(".popup__close");
const closeProfileButton = profile.querySelector(".popup__close");
const cardContainer = document.querySelector(".elements");
const cardTemplate = document.querySelector("#card-template").content;
let popupTemplate;
const elementsModal = document
  .querySelector(".elements")
  .querySelector(".popup");

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
      checkPopup(elementsModal);
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

  checkPopup(profile);
}

profile.addEventListener("submit", handleProfileFormSubmit);

//Checar Modais do projeto para caso estejam visiveis ou não
function checkPopup(type) {
  const modal = type;
  modal.classList.toggle("popup_visibility_visible");
  const buttonClose = modal.querySelector(".popup__close");
  if (modal.classList.contains("popup_visibility_visible")) {
    popupTemplate = modal;
    buttonClose.addEventListener("click", popupClose);
    modal.addEventListener("click", popupClose);
    window.addEventListener("keydown", popupClose);
  } else {
    buttonClose.removeEventListener("click", popupClose);
    modal.removeEventListener("click", popupClose);
    window.removeEventListener("keydown", popupClose);
  }
}

function popupClose(evt) {
  if (!evt.target.classList.contains("popup")) {
    checkPopup(popupTemplate);
  }
  if (evt.key === "Escape") {
    checkPopup(popupTemplate);
  }
  checkPopup(popupTemplate);
}
function popupHandler() {
  const popupList = document.querySelectorAll(".popup");
  popupList.forEach((item) => {
    if (item.id !== "") {
      const buttonOpen = document.querySelector(`#${item.id}__button`);
      console.log(item);
      console.log(item.id);
      buttonOpen.addEventListener("click", () => {
        checkPopup(item);
      });
    }
  });
}
popupHandler();

//Adição de Elementos
function handleElementFormSubmit() {
  let title = document.querySelector("#title");
  let link = document.querySelector("#link");

  createCard(title.value, link.value);

  checkPopup(card);
}
card.addEventListener("submit", handleElementFormSubmit);

function modalElements(name, link) {
  document.querySelector(".popup__image").src = link;
  document.querySelector(".popup__image").alt = name;
  document.querySelector(".popup__name").textContent = name;
}
