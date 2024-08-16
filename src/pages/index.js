import "./index.css";
import Api from "../components/Api.js";
import { initialCards, validationSettings } from "../utils/constants.js";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import PopupWithFormDelete from "../components/PopupWithFormDelete";

/* -------------------------------- Elements -------------------------------- */

const profileEditButton = document.querySelector("#profile-edit-button");
const profileEditForm = document.forms["profile-form"];
const profileTitleInput = profileEditForm.querySelector(
  ".form__input_type_title"
);
const profileDescriptionInput = profileEditForm.querySelector(
  ".form__input_type_description"
);
const profileSubmitButton = profileEditForm.querySelector(".form__button");

const newItemButton = document.querySelector("#new-item-button");
const newItemForm = document.forms["card-form"];
const newItemSubmitButton = newItemForm.querySelector(".form__button");

//const deleteCardIcon = document.querySelector(".card__delete-button");

//const deleteCardForm = document.forms["delete-form"];
//const deleteCardSubmitButton = deleteCardForm.querySelector("#delete-card-button");

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
  profileSubmitButton.textContent = "Saving...";
  api.updateUserInfo(name, description)
    .then(() => {
      profileUserInfo.setUserInfo({ name, description });
      profileEditFormPopup.close();
    })
    .catch((err) => {
      console.error(err);
    })
    .finally(() => {
      profileSubmitButton.textContent = "Save"
    })

}

/* ------------------------------ Adding cards ------------------------------ */

function createCard(cardData) {
  const cardElement = new Card(
    cardData,
    "#card-template",
    handleImageClick,
    handleDeleteModal,
  );
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
  const cardData = {
    name: inputValues.title,
    link: inputValues.link,
  };
  newItemSubmitButton.textContent = "Saving...";
  api.addNewCard(inputValues.title, inputValues.link)
    .then(() => {
      renderCard(cardData);
      newItemPopup.close();
    })
    .catch((err) => {
      console.error(err);
    })
    .finally(() => {
      newItemButton.textContent = "Save";
    })

}

/* ------------------------------ Deleting card ----------------------------- */

const deleteCardPopup = new PopupWithFormDelete({
  popupSelector: "#delete-card-modal",
});
deleteCardPopup.setEventListeners();

function handleDeleteModal(cardData, cardElement) {
  const cardId = cardData._id;
  deleteCardPopup.open();
  deleteCardPopup.setFormSubmitHandler(() => {
    api
      .deleteCard(cardId)
      .then(() => {
        cardElement.deleteCard();
        deleteCardPopup.close();
      })
      .catch(console.error);
  });

  deleteCardPopup.open();
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

/* ----------------------------------- Api ---------------------------------- */

const api = new Api ({
  baseUrl: "https://around-api.en.tripleten-services.com/v1",
  headers: {
    authorization: "5816dbaf-7235-416a-9b11-65ef8063db0b",
    "Content-Type": "application/json"
  },
});



