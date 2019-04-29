import util from '../../utils/index'
// 需要应用config里的
import config from '../../utils/config'
// 把page拿回来
// 获取小程序外部方法
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
  // 调用request方法， data就是参数解构写法，opt就是对象
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
      // console.log(res)
      // 数据接口正常返回的话
      if(res && res.status === 0 && res.data && res.data.length) {
        let articleData = res.data
        this.setData({
          hasMore: res.data.hasmore
        })
        // 格式化我们的原数据
        let formateData = this.formateArticleDate(articleData)
        console.log(formateData)
        this.renderArticle(formateData)
      }
    })
  },
  // 日期不可能在服务器上改，因为要随时改 date
  dateConvert(dateStr) {
    if (!dateStr) {
      return ''
    }
    let today = new Date(),
    // date自带方法获取年
    todayYear = today.getFullYear(),
    todayMonth = ('0' + (today.getMonth() + 1)).slice(-2),
    todayDay = ('0' + today.getDate()).slice(-2);
    let convertStr = '';
    let originYear = +dateStr.slice(0, 4)
    let todayFormate = `${todayYear}-${todayMonth}-${todayDay}`
    if(dateStr === todayFormate) {
      convertStr = '今日'
    } else if (originYear < todayYear) {
      let splitStr = dateStr.split('-')
      convertStr = `${splitStr[0]}年${splitStr[1]}月${splitStr[2]}日`
    } else {
      convertStr = dateStr.splice(5).replace('-','月') + '日'
    }
    return convertStr
  },
  formateArticleDate(data) {
    let formateData = undefined
    // 参数有值就遍历数组
    if(data && data.length) {
      formateData = data.map((group) => {
        group.formateDate = this.dateConvert(group.date)
        if(group && group.articles) {
          let formateArticleItems = group.articles.map((item) => {
            item.hasVisited = this.isVisited(item.contentId)
            return item
          }) || []
          group.articles = formateArticleItems
        }
        return group
      })
    }
    return formateData
  },
  isVisited(contentId) {
    // 看成三元
    let visitedArticles = app.globalData && app.globalData.visitedArticles || ''
    // 即存在
    return visitedArticles.indexOf(`${contentId}`) > -1
  },
  // 渲染数据
  renderArticle(data) {
    if(data && data.length) {
      let newList = this.data.articleList.concat(data)
      this.setData({
        articleList: newList,
        hiddenLoading: true
      })
    }
  },
  onReachBottom() {
    if(this.data.hasMore) {
      let nextPage = this.data.page + 1
      // 改原数据一定要setdata
      this.setData({
        page: nextPage
      })
      this.requestArticle()
    }
  }
}
Page(handler)