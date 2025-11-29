const popupImage = document.querySelector(".popup__image");
const popupName = document.querySelector(".popup__name");
const popupCloseButton = document
  .querySelector(".elements")
  .querySelector(".popup__close");
const popupElement = document
  .querySelector(".elements")
  .querySelector(".popup");

class Card {
  constructor(data, selector) {
    this._name = data.name;
    this._link = data.link;
    this._selector = selector;
  }
  _getTemplate() {
    const cardElement = document
      .querySelector(this._selector)
      .content.querySelector(".element")
      .cloneNode(true);

    return cardElement;
  }
  generateCard() {
    this._element = this._getTemplate();
    this._setEventListeners();

    this._element.querySelector(".element__image").src = this._link;
    this._element.querySelector(".element__image").alt = this._name;
    this._element.querySelector(".element__name").textContent = this._name;

    return this._element;
  }
  _handleOpenPopup() {
    popupImage.src = this._link;
    popupImage.alt = this._name;
    popupName.textContent = this._name;

    popupElement.classList.add("popup_visibility_visible");
    popupElement.addEventListener("click", (evt) => {
      if (evt.target.classList.contains("popup")) {
        this._handleClosePopup();
      }
    });
    document.addEventListener("keydown", (evt) => {
      console.log(evt.key);
      if (evt.key === "Escape") {
        evt.preventDefault();
        this._handleClosePopup();
      }
    });
  }
  _handleClosePopup() {
    popupImage.src = "";
    popupImage.alt = "";
    popupName.textContent = "";
    popupElement.classList.remove("popup_visibility_visible");
  }
  _setEventListeners() {
    this._element
      .querySelector(".element__image")
      .addEventListener("click", () => {
        this._handleOpenPopup();
      });
    this._element
      .querySelector(".element__delete")
      .addEventListener("click", () => {
        this._element.remove();
      });
    this._element
      .querySelector(".element__like")
      .addEventListener("click", () => {
        this.classList.toggle("element__like_type_liked");
      });
    popupCloseButton.addEventListener("click", () => {
      this._handleClosePopup();
    });
  }
}

export { Card, popupImage, popupName };
