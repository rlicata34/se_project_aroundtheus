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

/* -------------------------------------------------------------------------- */
/*                                  Elements                                  */
/* -------------------------------------------------------------------------- */

/* --------------------------------- Profile -------------------------------- */

const profileEditButton = document.querySelector("#profile-edit-button");
const profileEditModal = document.querySelector("#profile-edit-modal");
const profileCloseButton = profileEditModal.querySelector(".modal__close");
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const profileEditForm = profileEditModal.querySelector(".modal__form");
const profileTitleInput = profileEditForm.querySelector(
  ".form__input_type_title"
);
const profileDescriptionInput = profileEditForm.querySelector(
  ".form__input_type_description"
);
const modal = document.querySelectorAll(".modal");

/* ---------------------------------- Card ---------------------------------- */

const cardListEl = document.querySelector(".cards__list");
const cardTemplate =
  document.querySelector("#card-template").content.firstElementChild;

/* --------------------------------- newCard -------------------------------- */

const newItemButton = document.querySelector("#new-item-button");
const newItemModal = document.querySelector("#new-item-modal");
const newItemCloseButton = newItemModal.querySelector(".modal__close");
const newItemTitle = document.querySelector("#card-title");
const newItemImage = document.querySelector("#card-image");
const newItemForm = newItemModal.querySelector(".modal__form");
const newItemTitleInput = newItemForm.querySelector(".form__input_type_title");
const newItemLinkInput = newItemForm.querySelector(".form__input_type_link");

/* ------------------------------ Preview image ----------------------------- */

const previewImageModal = document.querySelector("#preview-image-modal");
const previewImageClose = previewImageModal.querySelector(
  ".modal__close-image"
);
const previewImage = previewImageModal.querySelector(".modal__image");
const previewImageTitle = previewImageModal.querySelector(
  ".modal__image-title"
);

/* -------------------------------------------------------------------------- */
/*                                  funtions                                  */
/* -------------------------------------------------------------------------- */

function closeModal(modal) {
  modal.classList.remove("modal_opened");
}

function openModal(modal) {
  modal.classList.add("modal_opened");
}

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

function getCardElement(cardData) {
  const cardElement = cardTemplate.cloneNode(true);
  const cardImageEl = cardElement.querySelector(".card__image");
  const cardTitleEl = cardElement.querySelector(".card__title");
  const likeButton = cardElement.querySelector(".card__like-button");
  const deleteButton = cardElement.querySelector(".card__delete-button");

  deleteButton.addEventListener("click", () => {
    cardElement.remove();
  });
  likeButton.addEventListener("click", () => {
    likeButton.classList.toggle("card__like-button_active");
  });
  cardImageEl.addEventListener("click", () => {
    previewImage.src = cardImageEl.src;
    previewImage.alt = cardTitleEl.textContent;
    previewImageTitle.textContent = cardTitleEl.textContent;
    openModal(previewImageModal);
  });

  cardImageEl.src = cardData.link;
  cardImageEl.alt = cardData.name;
  cardTitleEl.textContent = cardData.name;
  return cardElement;
}

function renderCard(cardData, cardListEl) {
  const cardElement = getCardElement(cardData);
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
  closeModal(newItemModal);
}
newItemForm.addEventListener("submit", handleNewItemSubmit);

/* -------------------------------------------------------------------------- */
/*                                Preview image                               */
/* -------------------------------------------------------------------------- */

previewImageClose.addEventListener("click", () =>
  closeModal(previewImageModal)
);
