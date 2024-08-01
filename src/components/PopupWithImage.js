import Popup from "./Popup";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super({ popupSelector });
    this._cardImageEl = this._popupEl.querySelector(".modal__image");
    this._cardTitleEL = this._popupEl.querySelector(".modal__image-title");
  }

  open(data) {
    this._cardImageEl.src = data.link;
    this._cardImageEL.alt = data.name;
    this._cardTitleEL.textContent = data.name;
    super.open();
  }
}
