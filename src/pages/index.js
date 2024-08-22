import "./index.css";
import Api from "../components/Api.js";
import { validationSettings } from "../utils/constants.js";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import PopupWithFormDelete from "../components/PopupWithFormDelete.js";

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

const avatarEditButton = document.querySelector("#avatar-edit-icon");
const avatarEditForm = document.forms["avatar-form"];
const avatarEditSubmitButton = avatarEditForm.querySelector(".form__button");

//const deleteCardIcon = document.querySelector(".card__delete-button");

//const deleteCardForm = document.forms["delete-form"];
//const deleteCardSubmitButton = deleteCardForm.querySelector("#delete-card-button");

/* ----------------------------- Instantiate api ---------------------------- */

const api = new Api ({
  baseUrl: "https://around-api.en.tripleten-services.com/v1",
  headers: {
    authorization: "5816dbaf-7235-416a-9b11-65ef8063db0b",
    "Content-Type": "application/json"
  },
});

/* ---------------------------- Profile edit form --------------------------- */

const profileUserInfo = new UserInfo({
  nameEl: ".profile__title",
  jobEl: ".profile__description",
  avatarEl: ".profile__image",
});

const profileEditFormPopup = new PopupWithForm({
  popupSelector: "#profile-edit-modal",
  handleFormSubmit: handleProfileEditSubmit,
});

profileEditFormPopup.setEventListeners();

api
  .getUserInfo()
  .then((userData) => {
    profileUserInfo.setUserInfo({
      name: userData.name,
      description: userData.about,
    })
    profileUserInfo.setAvatarInfo({
      link: userData.avatar,
    })
  })

profileEditButton.addEventListener("click", function () {
  const { name, description } = profileUserInfo.getUserInfo();
  profileTitleInput.value = name;
  profileDescriptionInput.value = description;
  profileEditFormPopup.open();
});


/*api
  .getInitialCards()
  .then((cards) => {
    cardSection.renderItems(cards);
  })*/


function handleProfileEditSubmit(userData) {
  const name = userData.title;
  const description = userData.description;
  profileSubmitButton.textContent = "Saving...";
  api.updateUserInfo(name, description)
    .then((newUserData) => {
      //newUserData includes user's id
      profileUserInfo.setUserInfo({
        name: newUserData.name,
        description: newUserData.about,
        id: newUserData._id, //capture user id
      });
      profileEditFormPopup.close();
      console.log(newUserData._id);
    })
    .catch((err) => {
      console.error(err);
    })
    .finally(() => {
      profileSubmitButton.textContent = "Save"
    })

}

/* ---------------------------- Avatar edit form ---------------------------- */

//new instantiation of UserInfo class for avatar pic
const avatarUserInfo = new UserInfo({
  avatarEl: ".profile__image",
});

const avatarEditFormPopup = new PopupWithForm({
  popupSelector: "#avatar-edit-modal",
  handleFormSubmit: handleAvatarEditSubmit,
});
avatarEditFormPopup.setEventListeners();

avatarEditButton.addEventListener("click", () => {
  avatarEditFormPopup.open();
})

function handleAvatarEditSubmit(inputValue) {
  const link = inputValue.link;
  avatarEditSubmitButton.textContent = "Saving...";
  api
    .updateProfileAvatar(link)
    .then((newUserData) => {
      avatarUserInfo.setAvatarInfo({ link: newUserData.avatar}); //created new function in UserInfo
      avatarEditFormPopup.close();
    })
    .catch((err) => {
      console.error(err);
    })
    .finally(() => {
      avatarEditSubmitButton.textContent = "Save";
    })
}

/* ------------------------------ Adding cards ------------------------------ */


function createCard(cardData) {
  const cardElement = new Card(
    cardData,
    "#card-template",
    handleImageClick,
    handleDeleteModal,
    handleLikeCard, //handle for like button
    handleUnlikeCard, //handle for button unliked
  );
  return cardElement.getCardElement();
}

function renderCard(cardData) {
  const cardElement = createCard(cardData);
  cardSection.addItem(cardElement);
}

const cardSection = new Section(
    {renderer: renderCard}, //removed initial cards
    ".cards__list"
);


api
  .getInitialCards()
  .then((cards) => {
    cardSection.renderItems(cards);
  })


const newItemPopup = new PopupWithForm({
  popupSelector: "#new-item-modal",
  handleFormSubmit: handleNewItemSubmit,
});
newItemPopup.setEventListeners();

newItemButton.addEventListener("click", () => {
  newItemPopup.open();
});

function handleNewItemSubmit(inputValues) {
  newItemSubmitButton.textContent = "Saving...";
  api.addNewCard(inputValues.title, inputValues.link)
    .then((newCardData) => {
      renderCard(newCardData);
      newItemPopup.close();
    })
    .catch((err) => {
      console.error(err);
    })
    .finally(() => {
      newItemSubmitButton.textContent = "Save";
    })

}

/* ------------------------------- like card ------------------------------ */

function handleLikeCard(cardData) {
  api
    .likeCard(cardData._id)
    .then(() => {
      cardData.setCardLike(true);
    })
    .catch((err) => {
      console.error(err);
    })
}

/* ------------------------------- unLike card ------------------------------ */

function handleUnlikeCard(cardData) {
  api
    .unlikeCard(cardData._id)
    .then(() => {
      cardData.setCardLike(false);
    })
    .catch((err) => {
      console.error(err);
    })
}

/* ------------------------------ Delete card ----------------------------- */

const deleteCardPopup = new PopupWithFormDelete({
  popupSelector: "#delete-card-modal",
});
deleteCardPopup.setEventListeners();

function handleDeleteModal(cardData) {
  //removed const
  deleteCardPopup.open();
  console.log(cardData._id);
  deleteCardPopup.setFormSubmitHandler(() => {
    api
      .deleteCard(cardData._id) //replaced cardId with cardData._id
      .then(() => {
        cardData.deleteCard(); //removed arguments
        deleteCardPopup.close();
      })
      .catch(console.error);
  });

}


/* ------------------------------ Preview image ----------------------------- */

const previewImagePopup = new PopupWithImage("#preview-image-modal");
previewImagePopup.setEventListeners();

function handleImageClick(cardData) {
  previewImagePopup.open(cardData);
}

/* ----------------------------- Form validation ---------------------------- */

const editFormValidator = new FormValidator(validationSettings, profileEditForm
);
const addFormValidator = new FormValidator(validationSettings, newItemForm);
const avatarFormValidator = new FormValidator(validationSettings, avatarEditForm);

editFormValidator.enableValidation();
addFormValidator.enableValidation();
avatarFormValidator.enableValidation();






