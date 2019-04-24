Page({
  data: {
    hasUserInfo: 
    false,
    canIUse:
    wx.canIUse('button.open-type.getUserInfo'),
    userInfo: {},
    addShow: false,
    addText: '',
    todos: []
  },
  addInput: function(e) {
    this.setData({
      addText: e.detail.value
    })
  },
  getUserInfo: function(e) {
    // console.log(e);
    // 设置数据项，界面更新。 
    this.setData({
      userInfo: e.detail.userInfo,
      // MVVM编程  响应式  状态(维护状态的正确)
      hasUserInfo: true

    })
  },
  addTodoShow: function(e) {
    this.setData({
      addShow: true
    })
  },
  addTodoHide: function(e) {
    this.setData({
      addShow: false
      
    })
  },
  addTodo: function() {
    // - 输入框有内容
    if(!this.data.addText.trim()) {
      return;
    }
    let todos = this.data.todos;
    todos.push({
      id: new Date().getTime(),
      title: this.data.addText,
      status: '0'
    })
    // setData页面刷新
    this.setData({
      todos
    });
    this.addTodoHide();
    // - todos 界面上 wx:for setData() 重新绘制页面
    // - 退出输入状态

  }
})
