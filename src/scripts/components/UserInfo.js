export default class UserInfo {
  constructor(userData){
    this._userName = document.querySelector(userData.userNameSelector);
    this._userJob = document.querySelector(userData.userJobSelector);
  }

  getUserInfo() {
    return {
      editName: this._userName.textContent, 
      editJob: this._userJob.textContent
    }
  }

  setUserInfo(data) {
    this._userName.textContent = data.editName;
    this._userJob.textContent = data.editJob;
  }
}