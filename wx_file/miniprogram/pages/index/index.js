const db = wx.cloud.database();
// 用户信息表
const userInfo = db.collection('userInfo');
Page({
  data: {
    userList: []
  },
  getUserInfo: function(e) {
    console.log(e);
    // 云函数在云里运行  openid 是有安全问题的， 这是前端， 到云端去， 安全   openid 是专有业务
    wx.cloud.callFunction({
      name: 'getOpenId',
      complete: res => {
        // console.log(res);
        userInfo
          .where({
            _openid: res.result.openId
          }).count()
          .then(res => {
            if (res.total == 0) {
              // 新用户
              userInfo.add({
                data: e.detail.userInfo
              })
              .then(res => {
                wx.navigateTo({
                  url: '../add/add'
                })
              })
            } else {
              console.log('已经存在了');
              wx.navigateTo({
                url: '../add/add'
              })
            }
          })
      }
    })
    // userInfo
    //   .where({
    //     _openid: 
    //   })

    // table === collection;
    // userInfo.add({
    //   data: e.detail.userInfo
    // })
    // 把用户存到数据库中去, 解决database
    // 用户表， 核心表
  },
  onLoad: function() {
    userInfo
      .get()
      .then(res => {
        console.log(res);
        this.setData({
          userList: res.data
        })
      })
  }
})