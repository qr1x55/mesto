export default class UserInfo {
  constructor(userData){
    this._userName = document.querySelector(userData.userNameSelector);
    this._userJob = document.querySelector(userData.userJobSelector);
    this._userAvatar = document.querySelector(userData.userAvatarSelector);
  }

  getUserInfo() {
    return {
      editName: this._userName.textContent, 
      editJob: this._userJob.textContent
    }
  }

  setUserInfo(data) {
    this._userName.textContent = data.name;
    this._userJob.textContent = data.about;
    this._userAvatar.src = data.avatar;
  }

  getUserId(id) {
    this._id = id;
  }

  userId() {
    return this._id;
  }
}