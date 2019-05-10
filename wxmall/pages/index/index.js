const WXAPI = require('../../wxapi/main');
Page({
  data: {
    goods: [],
    categories: [],
    activeCategoryId: 0,
    banners: [],
    autoplay: true,
    interval: 3000,
    duration: 1000,
    swiperCurrent: 0,
    goodsRecommend: []
  },
  swiperchange(e) {
    console.log(e.detail.current,'-----');
    this.setData({
      swiperCurrent: e.detail.current
    })
  },
  onLoad() {
    // 界面没有难度
    // 要有一套开发的流程和标准做一个新项目，大项目需要的
    this.getCategory(); // 类别
    this.getBanners();  // banner
    this.loadGoods();   // 商品列表
    this.getRecommend(); // 爆款
  },
  // 生命周期加载商品
  getRecommend() {
    WXAPI.loadGoods({
      recommendStatus: 1
    })
    .then(res => {
      if(res.code === 0){
        this.setData({
          goodsRecommend: 
          res.data
        });
      }
    })
  },
  getCategory() {

  },
  getBanners() {
    WXAPI
      .getBanners({
        type: 'new'
      })
      .then(res => {
        console.log(res);
        // 大厂API接口的约定  code 0 返回数据状态码里没有一个错误的时候
        if(res.code === 0) {  // 严谨
          this.setData({
            banners: res.data
          })
        }
      })
  },
  loadGoods() {
    // wx.request代码重复没必要


  },
  
})