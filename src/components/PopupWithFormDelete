import Popup from "./Popup";

export default class PopupWithFormDelete extends Popup {
  constructor({ popupSelector }) {
    super({ popupSelector });
    this._popupForm = this._popupEl.querySelector(".modal__form");
    this._submitButton = this._popupEl.querySelector(".form__button");
    this._handleFormSubmit = null;
  }

  setFormSubmitHandler(handleFormSubmit) {
    this._handleFormSubmit = handleFormSubmit;
  }


  setEventListeners() {
    super.setEventListeners();
    this._popupForm.addEventListener("submit", (evt) => {
      evt.preventDefault();
      if (this._handleFormSubmit) {
        this._handleFormSubmit();
      }
    });
  }
}