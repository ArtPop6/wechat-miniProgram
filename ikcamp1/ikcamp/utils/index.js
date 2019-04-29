import config from './config'
import * as Mock from './mock'

const DEFAULT_REQUEST_OPTIONS = {
  url: '',
  data: {},
  header: {
    "Content-Type": "application/json"
  },
  method: "GET",
  dataType: "json"
}
// 封装方法
let util = {
  isDev: config.isDev,
  log() {
    this.isDev && console.log(...arguments)
  },
  // 每个页面的提醒
  alert(title = "提示", content = config.defaultAlertMessage) {
    if ('object' === typeof content) {
      // this.isDev就是core.isDev ==> env === 'dev' 返回 true false
      content = this.isDev && JSON.stringify(content) || config.defaultAlertMessage
    }
    wx.showModal({
      title: title,
      content: content
    })
  },
  getStorageData(key, cb) {
    let self = this
    wx.getStorage({
      key: key,
      success(res) {
        cb && cb(res.data)
      },
      fail(err) {
        let msg = err.errMsg || '';
        if (/getStorage:fail/.test(msg)) {
          self.getStorageData(key)
        }
      }
    })
  },
  // 设置本地存储，是否保存账号密码大概5M
  setStorageData(key, value = '', cb) {
    wx.setStorage({
      key: key,
      data: value,
      success() {
        cb && cb();
      }
    })
  },
  // 封装request,直接写request方法，不用每个页面都写 最有意义，封装了Promise，解决异步问题
  request(opt) {
    // mock本地数据
    let { url, data, header, method, dataType, mock = false} = opt
    // let url = opt.url
    let self = this
    // 解决异步
    return new Promise((resolve, reject) => {
      if(mock) {
        // 处于开发环境
        let res = {
          // 200 成功
          statusCode: 200,
          // Mock.url
          data: Mock[url]
        }
        if(res && res.statusCode == 200 && res.data) {
          // 抛出数据
          resolve(res.data)
        } else {
          self.alert('提示', res)
          // 失败
          reject(res)
        }
      } else {
        // 请求接口方法
        wx.request({
          // opt下的
          url: url,
          data: data,
          header: header,
          method: method,
          dataType: dataType,
          // success回调方法
          success: function(res) {
            if(res && res.statusCode == 200 && res.data) {
              // 抛出数据
              resolve(res.data)
            } else {
              self.alert('提示', res)
              // 失败
              reject(res)
            }
          },
          fail: function(err) {
            self.log(err)
            self.alert('提示', err)
            reject(err)
          }
        })
      }
    })

  }

}
export default util