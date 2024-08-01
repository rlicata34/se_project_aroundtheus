export default class UserInfo {
  constructor({ nameEl, jobEl }) {
    this._name = document.querySelector(nameEl);
    this._job = document.querySelector(jobEl);
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
}
