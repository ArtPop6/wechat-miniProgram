import mock from "./utils/mock";

//app.js
App({
  onLaunch: function () {
    // 展示本地存储能力
    Object.assign(this.globalData,mock)
    
  },
  globalData: {
    userInfo: null
  }
})