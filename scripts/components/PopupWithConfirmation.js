import { card } from "../constants/constants.js";
import Popup from "./Popup.js";

export default class PopupWithConfirmation extends Popup {
  constructor(selector, deleteCard) {
    super(selector);
    this.deleteCard = deleteCard;
  }
  setEventListeners() {
    super.setEventListeners();
  }
  open(id, cardElement) {
    super.open();
    this._selector
      .querySelector(".popup__delete")
      .addEventListener("click", () => {
        this.deleteCard(id, cardElement);
      });
  }
}

export { PopupWithConfirmation };
