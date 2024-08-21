export default class UserInfo {
  constructor({ nameEl, jobEl, avatarEl }) {
    this._name = document.querySelector(nameEl);
    this._job = document.querySelector(jobEl);
    this._avatar = document.querySelector(avatarEl); //avatar el added for img src
  }

  getUserInfo() {
    return {
      name: this._name.textContent,
      description: this._job.textContent,
    };
  }

  setUserInfo(userData) {
    this._name.textContent = userData.name;
    this._job.textContent = userData.description;
  }

  setAvatarInfo(userData) {
    this._avatar.src = userData.link;
  }
}
