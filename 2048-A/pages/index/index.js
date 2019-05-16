//index.js
//获取应用实例
const app = getApp()
const GameManager = require('./game_manager.js')


Page({
  data: {
    score: 0,
    highscore: 0,
    grids:  [
      // [{value: 2}, null, null, null],
      // [null, null, null, null],
      // [null, null, null, null],
      // [null, null, null, null]
    ]
  },
  //事件处理函数
  gameManager: null,
  
  onLoad: function () {
    // var a = [];
    this.gameManager = new GameManager(4);
    
    this.setData({
      grids: this.gameManager.setup()
    })
    
  }
})
