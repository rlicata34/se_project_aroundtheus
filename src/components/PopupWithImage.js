import Popup from "./Popup";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super({ popupSelector });
    this._cardImageEl = this._popupEl.querySelector(".modal__image");
    this._cardTitleEl = this._popupEl.querySelector(".modal__image-title");
  }

  open(data) {
    this._cardImageEl.src = data.link;
    this._cardImageEl.alt = data.name;
    this._cardTitleEl.textContent = data.name;
    super.open();
  }
}
