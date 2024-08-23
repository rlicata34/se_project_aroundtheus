

export const validationSettings = {
  formSelector: ".modal__form",
  inputSelector: ".form__input",
  submitButtonSelector: ".form__button",
  inactiveButtonClass: "form__button_disabled",
  inputErrorClass: "form__input_type_error",
  errorClass: "form__error_visible",
};

export const profileEditButton = document.querySelector("#profile-edit-button");
export const profileEditForm = document.forms["profile-form"];
export const profileTitleInput = profileEditForm.querySelector(
  ".form__input_type_title"
);
export const profileDescriptionInput = profileEditForm.querySelector(
  ".form__input_type_description"
);

export const newItemButton = document.querySelector("#new-item-button");
export const newItemForm = document.forms["card-form"];

export const avatarEditButton = document.querySelector("#avatar-edit-icon");
export const avatarEditForm = document.forms["avatar-form"];
export const avatarEditSubmitButton = avatarEditForm.querySelector(".form__button");
