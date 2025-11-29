//Checar Modais do projeto para caso estejam visiveis ou não
let popupTemplate;
function popupClose(evt) {
  if (evt.target.classList.contains("popup")) {
    console.log(evt.target);
    handleCloseForm(popupTemplate);
  }
  if (evt.key === "Escape") {
    handleCloseForm(popupTemplate);
  }
  if (evt.target.classList.contains("popup__close-image")) {
    console.log(evt.target);
    handleCloseForm(popupTemplate);
  }
}

function handleOpenForm(type) {
  popupTemplate = type;
  const buttonClose = popupTemplate.querySelector(".popup__close");
  buttonClose.addEventListener("click", popupClose);
  popupTemplate.addEventListener("click", popupClose);
  window.addEventListener("keydown", popupClose);
  popupTemplate.classList.add("popup_visibility_visible");
}
function handleCloseForm(type) {
  const buttonClose = type.querySelector(".popup__close");
  buttonClose.removeEventListener("click", popupClose);
  popupTemplate.removeEventListener("click", popupClose);
  window.removeEventListener("keydown", popupClose);
  popupTemplate.classList.remove("popup_visibility_visible");
}
function popupHandler() {
  const popupList = document.querySelectorAll(".popup");
  popupList.forEach((item) => {
    if (item.id !== "") {
      const buttonOpen = document.querySelector(`#${item.id}__button`);
      console.log(item);
      console.log(item.id);
      buttonOpen.addEventListener("click", () => {
        handleOpenForm(item);
      });
    }
  });
}

export { popupClose, handleOpenForm, handleCloseForm, popupHandler };
