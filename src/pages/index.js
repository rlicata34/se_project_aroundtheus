import "./index.css";

import { initialCards, validationSettings } from "../utils/constants.js";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";

/* --------------------------- All modals element --------------------------- */

//const allModals = document.querySelectorAll(".modal");

/* --------------------------------- Profile elements-------------------------------- */

const profileEditButton = document.querySelector("#profile-edit-button");
//const profileEditModal = document.querySelector("#profile-edit-modal");
//const profileCloseButton = profileEditModal.querySelector(".modal__close");
//const profileTitle = document.querySelector(".profile__title");
//const profileDescription = document.querySelector(".profile__description");
const profileEditForm = document.forms["profile-form"];
const profileTitleInput = profileEditForm.querySelector(
  ".form__input_type_title"
);
const profileDescriptionInput = profileEditForm.querySelector(
  ".form__input_type_description"
);

/* ---------------------------------- Card elements ---------------------------------- */

//const cardListEl = document.querySelector(".cards__list");

/* --------------------------------- newCard elements-------------------------------- */

const newItemButton = document.querySelector("#new-item-button");
//const newItemModal = document.querySelector("#new-item-modal");
//const newItemCloseButton = newItemModal.querySelector(".modal__close");
const newItemForm = document.forms["card-form"];
//const newItemTitleInput = newItemForm.querySelector(".form__input_type_title");
//const newItemLinkInput = newItemForm.querySelector(".form__input_type_link");

/* ------------------------------ Preview image elements ----------------------------- */

//const previewImageModal = document.querySelector("#preview-image-modal");
//const previewImageClose = previewImageModal.querySelector(".modal__close");
//const previewImage = previewImageModal.querySelector(".modal__image");
//const previewImageTitle = previewImageModal.querySelector(
(".modal__image-title");
//);

/* -------------------------------------------------------------------------- */
/*                                  Open/close modal                          */
/* -------------------------------------------------------------------------- */

/*function closeModal(modal) {
  modal.classList.remove("modal_opened");
  document.removeEventListener("keydown", clickCloseESC);
}

function openModal(modal) {
  modal.classList.add("modal_opened");
  document.addEventListener("keydown", clickCloseESC);
}

function clickCloseESC(evt) {
  if (evt.key === "Escape") {
    const modal = document.querySelector(".modal_opened");
    return closeModal(modal);
  }
}

function clickCloseOverlay(evt) {
  if (evt.target.classList.contains("modal")) {
    closeModal(evt.target);
  }
}

allModals.forEach((modal) => {
  modal.addEventListener("mousedown", clickCloseOverlay);
}); */

/* -------------------------------------------------------------------------- */
/*                               Profile edit form                          */
/* -------------------------------------------------------------------------- */

const profileUserInfo = new UserInfo({
  nameEl: ".profile__title",
  jobEl: ".profile__description",
});

const profileEditFormPopup = new PopupWithForm({
  popupSelector: "#profile-edit-modal",
  handleFormSubmit: handleProfileEditSubmit,
});

profileEditFormPopup.setEventListeners();

profileEditButton.addEventListener("click", function () {
  const { name, description } = profileUserInfo.getUserInfo();
  profileTitleInput.value = name;
  profileDescriptionInput.value = description;
  profileEditFormPopup.open();
});

/*profileCloseButton.addEventListener("click", () => {
  profileEditModal.close();
});*/

function handleProfileEditSubmit(userData) {
  const name = userData.title;
  const description = userData.description;
  profileUserInfo.setUserInfo({ name, description });
  profileEditFormPopup.close();
  profileEditForm.reset();
}

/* -------------------------------------------------------------------------- */
/*                                Adding cards                                */
/* -------------------------------------------------------------------------- */

function createCard(cardData) {
  const cardElement = new Card(cardData, "#card-template", handleImageClick);
  return cardElement.getCardElement();
}

function renderCard(cardData) {
  const cardElement = createCard(cardData);
  cardSection.addItem(cardElement);
}

const cardSection = new Section(
  { items: initialCards, renderer: renderCard },
  ".cards__list"
);

cardSection.renderItems();

const newItemPopup = new PopupWithForm({
  popupSelector: "#new-item-modal",
  handleFormSubmit: handleNewItemSubmit,
});
newItemPopup.setEventListeners();

newItemButton.addEventListener("click", () => {
  newItemPopup.open();
});

//newItemCloseButton.addEventListener("click", () => closeModal(newItemModal));

function handleNewItemSubmit(inputValues) {
  const cardData = { name: inputValues.title, link: inputValues.link };
  console.log(cardData);
  renderCard(cardData);
  newItemPopup.close();
  addFormValidator._disableButton();
}

/* -------------------------------------------------------------------------- */
/*                                Preview image                               */
/* -------------------------------------------------------------------------- */

const previewImagePopup = new PopupWithImage("#preview-image-modal");
previewImagePopup.setEventListeners();

function handleImageClick(cardData) {
  previewImagePopup.open(cardData);
}

/*previewImageClose.addEventListener("click", () =>
  closeModal(previewImageModal)
);*/

/* -------------------------------------------------------------------------- */
/*                               Form validation                              */
/* -------------------------------------------------------------------------- */

const editFormValidator = new FormValidator(
  validationSettings,
  profileEditForm
);
const addFormValidator = new FormValidator(validationSettings, newItemForm);
editFormValidator.enableValidation();
addFormValidator.enableValidation();
