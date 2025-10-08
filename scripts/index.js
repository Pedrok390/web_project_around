let edit_profile = document.querySelector(".profile__edit-button");
let close_button = document.querySelector(".edit-container__close");
let formElement = document.querySelector(".edit-container__form");

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  let nameInput = document.querySelector("#name");
  let jobInput = document.querySelector("#job");
  let nameContainer = document.querySelector(".profile__name");
  let jobContainer = document.querySelector(".profile__job");

  nameContainer.textContent = nameInput.value;
  jobContainer.textContent = jobInput.value;

  checkModal();
}

formElement.addEventListener("submit", handleProfileFormSubmit);
function checkModal() {
  let modal = document.querySelector(".profile__modal");

  if (modal.classList.contains("profile__modal_visibility_visible")) {
    modal.classList.remove("profile__modal_visibility_visible");
  } else {
    modal.classList.add("profile__modal_visibility_visible");
  }
}

edit_profile.addEventListener("click", checkModal);
close_button.addEventListener("click", checkModal);
