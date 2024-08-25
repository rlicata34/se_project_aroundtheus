/* -------------------------------------------------------------------------- */
/*                                   Imports                                  */
/* -------------------------------------------------------------------------- */

import "./index.css";
import Api from "../components/Api.js";
import {
  validationSettings,
  profileEditButton,
  profileEditForm,
  profileTitleInput,
  profileDescriptionInput,
  newItemButton,
  newItemForm,
  avatarEditButton,
  avatarEditForm,
}
from "../utils/constants.js";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import PopupWithFormDelete from "../components/PopupWithFormDelete.js";

/* -------------------------------------------------------------------------- */
/*                               Class Intances                               */
/* -------------------------------------------------------------------------- */

const api = new Api ({
  baseUrl: "https://around-api.en.tripleten-services.com/v1",
  headers: {
    authorization: "5816dbaf-7235-416a-9b11-65ef8063db0b",
    "Content-Type": "application/json"
  },
});

const profileUserInfo = new UserInfo({
  nameEl: ".profile__title",
  jobEl: ".profile__description",
  avatarEl: ".profile__image",
});

const profileEditFormPopup = new PopupWithForm({
  popupSelector: "#profile-edit-modal",
  handleFormSubmit: handleProfileEditSubmit,
});

const avatarEditFormPopup = new PopupWithForm({
  popupSelector: "#avatar-edit-modal",
  handleFormSubmit: handleAvatarEditSubmit,
});

const avatarUserInfo = new UserInfo({
  avatarEl: ".profile__image",
});

const cardSection = new Section(
  {renderer: renderCard},
  ".cards__list"
);

const newItemPopup = new PopupWithForm({
  popupSelector: "#new-item-modal",
  handleFormSubmit: handleNewItemSubmit,
});

const deleteCardPopup = new PopupWithFormDelete({
  popupSelector: "#delete-card-modal",
});

const previewImagePopup = new PopupWithImage("#preview-image-modal");

/* -------------------------------------------------------------------------- */
/*                                  API Calls                                 */
/* -------------------------------------------------------------------------- */

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
  .catch((err) => {
    console.error(err);
  });

api
  .getInitialCards()
  .then((cards) => {
    cardSection.renderItems(cards);
  })
  .catch((err) => {
    console.error(err);
  });

/* -------------------------------------------------------------------------- */
/*                               Event Handlers                               */
/* -------------------------------------------------------------------------- */

function handleSubmit(request, popupInstance, loadingText = "Saving...") {

  popupInstance.renderLoading(true, loadingText);
  request()
    .then(() => {
      popupInstance.close()
    })
    .catch(console.error)
    .finally(() => {
      popupInstance.renderLoading(false);
    });
}

function handleProfileEditSubmit(userData) {
  const name = userData.title;
  const description = userData.description;

  function makeRequest() {
    return api.updateUserInfo(name, description)
    .then((newUserData) => {
      profileUserInfo.setUserInfo({
        name: newUserData.name,
        description: newUserData.about,
        id: newUserData._id, //capture user id
      });
      profileEditForm.reset();
    })
  }
  handleSubmit(makeRequest, profileEditFormPopup);
}

function handleAvatarEditSubmit(inputValue) {
  const link = inputValue.link;
  function makeRequest() {
    return api.updateProfileAvatar(link)
    .then((newUserData) => {
      formValidators["avatar-edit-form"].disableButton();
      avatarUserInfo.setAvatarInfo({ link: newUserData.avatar});
      avatarEditForm.reset();
    });
  }
  handleSubmit(makeRequest, avatarEditFormPopup);

}

function handleNewItemSubmit(inputValues) {

  function makeRequest() {
    return api.addNewCard(inputValues.title, inputValues.link)
    .then((newCardData) => {
      formValidators["new-item-form"].disableButton();
      renderCard(newCardData);
      newItemForm.reset();
    });
  }
  handleSubmit(makeRequest, newItemPopup);

}

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

function handleDeleteModal(cardData) {
  formValidators["delete-form"].resetValidation();
  deleteCardPopup.open();
  deleteCardPopup.setFormSubmitHandler(() => {
    api
      .deleteCard(cardData._id) //replaced cardId with cardData._id
      .then(() => {
        cardData.deleteCard();
        deleteCardPopup.close();
      })
      .catch(console.error);
  });

}

function handleImageClick(cardData) {
  previewImagePopup.open(cardData);
}

/* -------------------------------------------------------------------------- */
/*                               Event Listeners                              */
/* -------------------------------------------------------------------------- */

profileEditFormPopup.setEventListeners();

profileEditButton.addEventListener("click", function () {
  formValidators["profile-edit-form"].resetValidation();
  const { name, description } = profileUserInfo.getUserInfo();
  profileTitleInput.value = name;
  profileDescriptionInput.value = description;
  profileEditFormPopup.open();
});

avatarEditFormPopup.setEventListeners();

avatarEditButton.addEventListener("click", () => {
  avatarEditFormPopup.open();
})

newItemPopup.setEventListeners();

newItemButton.addEventListener("click", () => {
  newItemPopup.open();
});

deleteCardPopup.setEventListeners();

previewImagePopup.setEventListeners();

/* -------------------------------------------------------------------------- */
/*                                  Functions                                 */
/* -------------------------------------------------------------------------- */

function createCard(cardData) {
  const cardElement = new Card(
    cardData,
    "#card-template",
    handleImageClick,
    handleDeleteModal,
    handleLikeCard,
    handleUnlikeCard,
  );
  return cardElement.getCardElement();
}

function renderCard(cardData) {
  const cardElement = createCard(cardData);
  cardSection.addItem(cardElement);
}

/* -------------------------------------------------------------------------- */
/*                               Form Validation                              */
/* -------------------------------------------------------------------------- */

const formValidators = {}

const enableValidation = (config) => {
  const formList = Array.from(document.querySelectorAll(config.formSelector))
  formList.forEach((formElement) => {
    const validator = new FormValidator(config, formElement)
    const formName = formElement.getAttribute('name')

    formValidators[formName] = validator;
    validator.enableValidation();
  });
};

enableValidation(validationSettings);
