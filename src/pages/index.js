import "./index.css";

import { initialCards, validationSettings } from "../utils/constants.js";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";

/* -------------------------------- Elements -------------------------------- */

const profileEditButton = document.querySelector("#profile-edit-button");
const profileEditForm = document.forms["profile-form"];
const profileTitleInput = profileEditForm.querySelector(
  ".form__input_type_title"
);
const profileDescriptionInput = profileEditForm.querySelector(
  ".form__input_type_description"
);

const newItemButton = document.querySelector("#new-item-button");
const newItemForm = document.forms["card-form"];

/* ---------------------------- Profile edit form --------------------------- */

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

function handleProfileEditSubmit(userData) {
  const name = userData.title;
  const description = userData.description;
  profileUserInfo.setUserInfo({ name, description });
  profileEditFormPopup.close();
}

/* ------------------------------ Adding cards ------------------------------ */

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

function handleNewItemSubmit(inputValues) {
  const cardData = { name: inputValues.title, link: inputValues.link };
  renderCard(cardData);
  newItemPopup.close();
}

/* ------------------------------ Preview image ----------------------------- */

const previewImagePopup = new PopupWithImage("#preview-image-modal");
previewImagePopup.setEventListeners();

function handleImageClick(cardData) {
  previewImagePopup.open(cardData);
}

/* ----------------------------- Form validation ---------------------------- */

const editFormValidator = new FormValidator(
  validationSettings,
  profileEditForm
);
const addFormValidator = new FormValidator(validationSettings, newItemForm);
editFormValidator.enableValidation();
addFormValidator.enableValidation();
