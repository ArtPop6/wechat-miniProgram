import util from '../../utils/index'
// 需要应用config里的
import config from '../../utils/config'
// 把page拿回来
let app = getApp()
// 判断开发环境
let isDEV = config.isDev

let handler = {
  data: {
    page: 1,
    days: 3,
    pageSize: 4,
    totalSize: 0,
    hasMore: true,
    articleList: [],
    defaultImg: config.defaultImg,
    hiddenLoading: false
  },
  onLoad() {
    this.requestArticle()
  },
  requestArticle() {
    util.request({
      url: 'list',
      mock: true,
      data: {
        tag: '微信热门',
        start: this.data.page || 1,
        days: this.data.days || 3,
        pageSize: this.data.pageSize || 4,
        langs: config.appLang || 'en'
      }
    })
    .then(res => {
      console.log(res)
    })
  }
}
Page(handler)