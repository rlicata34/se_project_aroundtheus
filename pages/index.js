import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";

const initialCards = [
  {
    name: "Vanoise National Park",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/vanoise.jpg",
  },

  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lago.jpg",
  },

  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/latemar.jpg",
  },

  {
    name: "Bald Mountains",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/bald-mountains.jpg",
  },
  {
    name: "Lake Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lake-louise.jpg",
  },
  {
    name: "Yosemite Valley",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg",
  },
];

const cardData = {
  name: "Vanoise National Park",
  link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/vanoise.jpg",
};

/* --------------------------- All modals element --------------------------- */

const allModals = document.querySelectorAll(".modal");

/* --------------------------------- Profile elements-------------------------------- */

const profileEditButton = document.querySelector("#profile-edit-button");
const profileEditModal = document.querySelector("#profile-edit-modal");
const profileCloseButton = profileEditModal.querySelector(".modal__close");
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const profileEditForm = document.forms["profile-form"];
const profileTitleInput = profileEditForm.querySelector(
  ".form__input_type_title"
);
const profileDescriptionInput = profileEditForm.querySelector(
  ".form__input_type_description"
);

/* ---------------------------------- Card elements ---------------------------------- */

const cardListEl = document.querySelector(".cards__list");
const cardTemplate =
  document.querySelector("#card-template").content.firstElementChild;

/* --------------------------------- newCard elements-------------------------------- */

const newItemButton = document.querySelector("#new-item-button");
const newItemModal = document.querySelector("#new-item-modal");
const newItemCloseButton = newItemModal.querySelector(".modal__close");
const newItemForm = document.forms["card-form"];
const newItemTitleInput = newItemForm.querySelector(".form__input_type_title");
const newItemLinkInput = newItemForm.querySelector(".form__input_type_link");

/* ------------------------------ Preview image elements ----------------------------- */

const previewImageModal = document.querySelector("#preview-image-modal");
const previewImageClose = previewImageModal.querySelector(".modal__close");
const previewImage = previewImageModal.querySelector(".modal__image");
const previewImageTitle = previewImageModal.querySelector(
  ".modal__image-title"
);

/* -------------------------------------------------------------------------- */
/*                                  Open/close modal                          */
/* -------------------------------------------------------------------------- */

function closeModal(modal) {
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
  modal.addEventListener("click", clickCloseOverlay);
});

/* -------------------------------------------------------------------------- */
/*                               Profile edit button                          */
/* -------------------------------------------------------------------------- */

profileEditButton.addEventListener("click", function () {
  profileTitleInput.value = profileTitle.textContent;
  profileDescriptionInput.value = profileDescription.textContent;
  openModal(profileEditModal);
});
profileCloseButton.addEventListener("click", () => {
  closeModal(profileEditModal);
});
profileEditForm.addEventListener("submit", handleProfileEditSubmit);

function handleProfileEditSubmit(evt) {
  evt.preventDefault();
  profileTitle.textContent = profileTitleInput.value;
  profileDescription.textContent = profileDescriptionInput.value;
  closeModal(profileEditModal);
}

/* -------------------------------------------------------------------------- */
/*                                Adding cards                                */
/* -------------------------------------------------------------------------- */

function renderCard(cardData, cardListEl) {
  const card = new Card(cardData, "#card-template", handleImageClick);
  const cardElement = card.getCardElement();
  cardListEl.prepend(cardElement);
}

initialCards.forEach((cardData) => renderCard(cardData, cardListEl));

newItemButton.addEventListener("click", () => {
  openModal(newItemModal);
});

newItemCloseButton.addEventListener("click", () => closeModal(newItemModal));

function handleNewItemSubmit(evt) {
  evt.preventDefault();
  const name = newItemTitleInput.value;
  const link = newItemLinkInput.value;
  renderCard({ name, link }, cardListEl);
  evt.target.reset();
  closeModal(newItemModal);
}
newItemForm.addEventListener("submit", handleNewItemSubmit);

/* -------------------------------------------------------------------------- */
/*                                Preview image                               */
/* -------------------------------------------------------------------------- */

function handleImageClick(cardData) {
  previewImage.src = cardData.link;
  previewImage.alt = cardData.name;
  previewImageTitle.textContent = cardData.name;
  openModal(previewImageModal);
}

previewImageClose.addEventListener("click", () =>
  closeModal(previewImageModal)
);

/* -------------------------------------------------------------------------- */
/*                               Form validation                              */
/* -------------------------------------------------------------------------- */

const validationSettings = {
  formSelector: ".modal__form",
  inputSelector: ".form__input",
  submitButtonSelector: ".form__button",
  inactiveButtonClass: "form__button_disabled",
  inputErrorClass: "form__input_type_error",
  errorClass: "form__error_visible",
};

const editFormEl = profileEditModal.querySelector(".modal__form");
const addFormEl = newItemModal.querySelector(".modal__form");

const editFormValidator = new FormValidator(validationSettings, editFormEl);
const addFormValidator = new FormValidator(validationSettings, addFormEl);
editFormValidator.enableValidation();
addFormValidator.enableValidation();
