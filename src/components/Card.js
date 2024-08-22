export default class Card {
  constructor(
    { name, link,  _id, isLiked }, //recieve isLiked and _id from api card
    cardSelector,
    handleImageClick,
    handleDeleteCard,
    handleLikeIcon,
    handleUnlikeIcon,
  ) {
    this._isLiked = isLiked;
    this._name = name;
    this._link = link;
    this._id = _id; // added id for deleting card
    this._cardSelector = cardSelector;
    this._handleImageClick = handleImageClick;
    this._handleDeleteCard = handleDeleteCard; // added handle to delete card
    this._handleLikeIcon = handleLikeIcon; // handle placement for handle f() in index.js
    this._handleUnlikeIcon = handleUnlikeIcon; // handle for unlike function
  }

  _setEventListeners() {
    this._likeButton = this._cardElement.querySelector(".card__like-button");
    this._likeButton.addEventListener("click", () => {
      //check if like button inactive upon click
      if(this._isLiked === true) {
        return this._handleLikeIcon(this); //called from index.js
      }
      //if like button active when clicked
      return this._handleUnlikeIcon(this);
    });


    this._deleteButton = this._cardElement.querySelector(
      ".card__delete-button"
    );
    this._deleteButton.addEventListener("click", () => {
      //removed id and added "this" to argument
      this._handleDeleteCard(this);

    });

    this._cardImageEl.addEventListener("click", () => {
      this._handleImageClick({ name: this._name, link: this._link });
    });
  }

  //made public to call in index.js
  setCardLike(isLiked){
    this._isLiked = isLiked;
    this.renderCardLike();
  }
  renderCardLike(){
    if(this._isLiked){
      this._likeButton.classList.remove("card__like-button_active");
    } else {
      this._likeButton.classList.add("card__like-button_active");
    }
  }

  //changed from _handleDeleteCard
  deleteCard() {
    this._cardElement.remove();
    this._cardElement = null;
  }

  getCardElement() {
    this._cardElement = document
      .querySelector(this._cardSelector)
      .content.querySelector(".card")
      .cloneNode(true);
    this._cardImageEl = this._cardElement.querySelector(".card__image");
    this._cardTitleEl = this._cardElement.querySelector(".card__title");
    this._cardImageEl.src = this._link;
    this._cardImageEl.alt = this._name;
    this._cardTitleEl.textContent = this._name;
    this._setEventListeners();
    return this._cardElement;
  }
}
