class UserInfo {
  constructor({ name, job }) {
    this._nameContainer = document.querySelector(name);
    this._jobContainer = document.querySelector(job);
  }
  getUserInfo() {
    return {
      name: this._nameContainer.textContent,
      job: this._jobContainer.textContent,
    };
  }
  setUserInfo({ name, job }) {
    this._nameContainer.textContent = name;
    this._nameContainer.textContent = job;
  }
}
