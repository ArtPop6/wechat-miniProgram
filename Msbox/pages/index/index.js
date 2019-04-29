Page({
  onLoad: function() {
    // 不能用dom操作元素但可以操作组件
    this.popup = this.selectComponent('#popup');
  },
  showPopup: function() {
    // 出弹窗
    this.popup.showPopup();
  },
  _error() {
    this.popup.hidePopup();

  },
  _success() {
    this.popup.hidePopup();
  },
  change: function(e) {
    // console.log('catch')
    var mComponents = this.selectComponent('#myComponents');
    mComponents.setText('外部调用了');
  },
  // 外部收到了提醒trigger
  onTextChange: function() {
    wx.showToast({
      title: '捕获事件'
    })
  }
})