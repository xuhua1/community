const GlobalVar = {
  userId: '',
  userName: '',
  avatar: '',
  setUser (id, userName, avatar) {
    if (!this.userId || !this.getUserId.userName || !this.avatar) {
      this.userId = id;
      this.userName = userName;
      this.avatar = avatar;
    }
  },
  getAvatar () {
    return this.avatar;
  },
  getUserId () {
    return this.userId;
  },
  getUserName () {
    return this.userId;
  }
}
GlobalVar.setUser("1", 'zhangsan', 'http://upload.jianshu.io/users/upload_avatars/5321383/8fbdf22e-8c08-4213-830f-de4aee61e7f6.png?imageMogr2/auto-orient/strip|imageView2/1/w/240/h/240');
export default GlobalVar;