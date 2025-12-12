import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(selector) {
    super(selector);
  }
  open(name, link) {
    this._selector.querySelector(".popup__image").src = link;
    this._selector.querySelector(".popup__image").alt = name;
    this._selector.querySelector(".popup__name").textContent = name;

    super.open();
  }
}
