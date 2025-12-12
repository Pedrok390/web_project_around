import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(handleFormSubmit, selector) {
    super(selector);
    this._handleFormSubmit = handleFormSubmit;
    this._form = this._selector.querySelector(".popup__form");
    this._inputList = this._form.querySelectorAll(".popup__input");
  }

  _getInputValues() {
    const inputValues = {};
    this._inputList.forEach((input) => {
      inputValues[input.name] = input.value;
    });

    return inputValues;
  }

  setEventListeners() {
    super.setEventListeners;
    this._form.addEventListener("submit", () => {
      this._handleFormSubmit(this._getInputValues);
    });
  }
  close() {
    super.close();
    this._form.reset();
  }
}
