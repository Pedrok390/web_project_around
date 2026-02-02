import { Api } from "../scripts/components/Api.js";
import { Card } from "../scripts/components/Card.js";
import {
  popupClose,
  handleOpenForm,
  handleCloseForm,
  popupHandler,
} from "../scripts/constants/utils.js";
import { PopupWithConfirmation } from "../scripts/components/PopupWithConfirmation.js";
import { UserInfo } from "../scripts/components/UserInfo.js";
import { FormValidator, config } from "../scripts/components/FormValidator.js";
import Section from "../scripts/components/Section.js";
import PopupWithForm from "../scripts/components/PopupWithForm.js";
import PopupWithImage from "../scripts/components/PopupWithImage.js";
import {
  profile,
  card,
  cardContainer,
  nameContainer,
  jobContainer,
} from "../scripts/constants/constants.js";
//Dados do Usuario
let currentUser;
//Lista dos Cards
let cardsList = [];

const user = new UserInfo({ name: ".profile__name", job: ".profile__job" });
const api = new Api({
  baseUrl: "https://around-api.pt-br.tripleten-services.com/v1",
  headers: {
    authorization: "65ec7126-1fd1-462f-9008-47f2c2d6133b",
    "Content-Type": "application/json",
  },
});
//Pega os dados do Usuario do Servidor
const getUserInfo = () => {
  api.getUserInfo().then((result) => {
    user.setUserInfo({ name: result.name, job: result.about });
    currentUser = result;
    console.log(currentUser);
  });
};

getUserInfo();
//Criação de Cards
const imagePopup = new PopupWithImage(".popup_type_image");
imagePopup.setEventListeners();

const deleteCard = (id, cardElement) => {
  console.log(cardElement);
  api.deleteCard({ id: id }).then(() => {
    console.log(cardElement);
    cardElement.remove();
    deletePopup.close();
  });
};

const deletePopup = new PopupWithConfirmation(".popup_type_delete", deleteCard);
deletePopup.setEventListeners();

const handleCardClick = (name, link) => {
  imagePopup.open(name, link);
};
let cardSection;

api.getInitialCards().then((result) => {
  cardSection = new Section(
    { items: result, renderer: createCard },
    ".elements",
  );

  cardSection.renderItems();
});

const createCard = (data) => {
  const card = new Card(data, "#card-template", handleCardClick);
  const isOwner = data.owner === currentUser._id;
  const cardElement = card.generateCard();
  const deleteButton = cardElement.querySelector(".element__delete");
  const likeIcon = cardElement.querySelector(".element__like_icon");


  cardsList.push(cardElement);
  deleteButton.addEventListener("click", () => {
    console.log(data._id);
    deletePopup.open(data._id, cardElement);
  });
  if (isOwner) {
    deleteButton.style.display = "block";
  } else {
    deleteButton.style.display = "none";
  }

  if(data.isLiked){
    likeIcon.classList.add("element__like_type_liked");
  }
  likeIcon.addEventListener("click", ()=> {
    if(data.isLiked){
      api.unlikeCard({id: data._id})
        .then((updateLike) => {
          data.isLiked = updateLike.isLiked;
          likeIcon.classList.remove("element__like_type_liked");
        })
    }
    else{
      api.likeCard({id: data._id})
        .then((updateLike) => {
          data.isLiked = updateLike.isLiked;
          likeIcon.classList.add("element__like_type_liked");
        })
    }
  })
  cardSection.addItem(cardElement);
};

const formList = document.querySelectorAll(config.formSelector);
formList.forEach((item) => {
  const form = new FormValidator(config, item);
  form.enableValidation();
});
//Submit Edição do Perfil
function handleProfileFormSubmit(data) {
  api.setUserInfo({ name: data.name, job: data.job }).then(() => {
    getUserInfo();
  });
  handleCloseForm(profile);
}

popupHandler();

//Adição de Elementos
function handleElementFormSubmit(data) {
  api
    .addCard({ name: data.title, link: data.link })
    .then(() => {
      addCardPopup.close();
      cardsList.forEach((cardElement) => {
        cardElement.remove();
      });
    })
    .then(() => {
      api.getInitialCards().then((result) => {
        cardSection = new Section(
          { items: result, renderer: createCard },
          ".elements",
        );

        cardSection.renderItems();
      });
    });
}

const editProfilePopup = new PopupWithForm(handleProfileFormSubmit, "#profile");
editProfilePopup.setEventListeners();
const addCardPopup = new PopupWithForm(handleElementFormSubmit, "#card");
addCardPopup.setEventListeners();
