export default class Popup {
  constructor(selector) {
    this._selector = document.querySelector(selector);
    this._closeButton = this._selector.querySelector(".popup__close");
  }
  open() {
    this._selector.classList.add("popup_visibility_visible");
    document.addEventListener("keydown", this._handleEscClose);
  }
  close() {
    this._selector.classList.remove("popup_visibility_visible");
    document.removeEventListener("keydown", this._handleEscClose);
  }
  _handleEscClose = (evt) => {
    if (evt.key === "Escape") {
      evt.preventDefault();
      this.close();
    }
  };
  setEventListeners() {
    this._closeButton.addEventListener("click", () => {
      this.close();
    });
    this._selector.addEventListener("click", (evt) => {
      if (evt.target === this._popup) {
        this.close();
      }
    });
  }
}

export { Popup };
