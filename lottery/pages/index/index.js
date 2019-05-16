// pages/index/index.js
// 在page外面定义的变量就是全局变量
// 计数器 间隔
let interval = null;
// 旋转速度
let inTime = 50
Page({

  /**
   * 页面的初始数据
   */
  data: {
    color: [0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5],
    //9张奖品图片
    images: ['/images/item.png', '/images/item1.png', '/images/item.png', '/images/item1.png', '/images/item.png', '/images/item1.png', '/images/item.png', '/images/item1.png', '/images/item.png'],
    btnconfirm: '/images/dianjichoujiang.png',
    clickLuck: 'clickLuck', //方便之后设置抽奖按钮不可点击 clickLuck:''
    luckPosition: 0
  },
  // 定义了一个方法 让页面自己动起来
  loadAnimation() {
    let self = this
    let index = 0
    // 清除叫interval的定时器
    interval = setInterval(() => {
      if (index > 7) {
        index = 0
        self.data.color[7] = 0.5
      } else if (index != 0) {
        self.data.color[index - 1] = 0.5
      }
      self.data.color[index] = 1
      //self.data.color进行了一顿操作之后赋值回数据源，让页面得到变化
      self.setData({
        color: self.data.color
      })
      index++
    }, 800)
  },
  // 点击抽奖
  clickLuck() {
    let self = this
    // 判断中奖的位置
    if (self.data.luckPosition == null || isNaN(self.data.luckPosition) || this.data.luckPosition > 7) {
      wx.showModal({
        title: '提示',
        content: '请填写正确的位置',
        showCancel: false
      })
      return
    }
    //设置按钮不可点击
    self.setData({
      btnconfirm: '/images/dianjichoujiangd.png',
      clickLuck: ''
    })
    //清空定时器
    clearInterval(interval)
    let index = 0
    // 清除叫interval的定时器
    interval = setInterval(() => {
      if (index > 7) {
        index = 0
        self.data.color[7] = 0.5
      } else if (index != 0) {
        self.data.color[index - 1] = 0.5
      }
      self.data.color[index] = 1
      //self.data.color进行了一顿操作之后赋值回数据源，让页面得到变化
      self.setData({
        color: self.data.color
      })
      index++
    }, inTime)
    let stopTime = 2000
    setTimeout(() => {
      self.stop(self.data.luckPosition)
    }, stopTime)
  },
  stop(which) {
    let self = this
    clearInterval(interval)
    // 初始化当前位置
    let current = -1
    let color = self.data.color
    //获取到当前亮起板块的下标
    for (let i = 0; i < color.length; i++) {
      if (color[i] = 1) {
        current = i
      }
    }
    let index = current + 1
    self.stopLuck(which, index, inTime, 10)

  },
  stopLuck(which, index, time, splitTime) {
    let self = this
    let color = self.data.color
    setTimeout(() => {
      if (index > 7) {
        index = 0
        color[7] = 0.5
      } else if (index != 0) {
        color[index - 1] = 0.5
      }
      color[index] = 1
      self.setData({
        color// = color: color
      })
      // 如果旋转时间过短 不足一周 或者当前位置不等于中奖位置
      if (time < 400 || index != which) {
        splitTime++
        time += splitTime //time = splitTime+time
        index++
        //不满足条件无效调用自己本身
        self.stopLuck(which, index, time, splitTime)
      } else {
        setTimeout(() => {
          if (which == 1 || which == 3 || which == 5 || which == 7) {
            wx.showModal({
              title: '提示',
              content: '恭喜中奖！',
              showCancel: false,
              success(res) {
                self.setData({
                  btnconfirm: '/images/dianjichoujiang.png',
                  clickLuck: 'clickLuck'
                })
                self.loadAnimation()
              }
            })
          } else {
            wx.showModal({
              title: '提示',
              content: '很遗憾，没中奖！',
              showCancel: false,
              success(res) {
                self.setData({
                  btnconfirm: '/images/dianjichoujiang.png',
                  clickLuck: 'clickLuck'
                })
                self.loadAnimation()
              }
            })

          }
        }, 1000)
      }
    }, time)
  },
  input(e) {
    // console.log(e) //detail.value
    this.setData({
      luckPosition: e.detail.value
    })

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.loadAnimation()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})