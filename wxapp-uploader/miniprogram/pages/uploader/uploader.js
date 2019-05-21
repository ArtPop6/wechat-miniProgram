const app = getApp()

Page({
  data: {
    files: []
  },
  chooseImage() {
    let that = this
    wx.chooseImage({
      // 原图压缩都可以
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success(res) {
        console.log(res)
        that.setData({
          // 因为要求放string类型
          files: that.data.files.concat(res.tempFilePaths)
        })
        // lastIndexOf
        for (let i = 0; i < res.tempFilePaths.length; i ++) {
          const filePath = res.tempFilePaths[i]
          let a = filePath.lastIndexOf('.')
          let b = filePath.lastIndexOf('.', a-1)
          let c = filePath.substring(b+1, a)
          const cloudPath = c + filePath.match(/\.[^.]+?$/)
          wx.cloud.uploadFile({
            filePath,
            cloudPath,
            success(res) {
              console.log('上传成功', res)
            },
            fail(err) {
              console.log('上传失败', err)
            }
          })
        }
        // 保存到服务器 fileID: "cloud://yue-yva9q.7975-yue-yva9q-1259171070/my-image.jpg"
        
        // 匹配所有特殊字符
        
        
      }
    })
  },
  previewImage(e) {
    console.log(e)
    wx.previewImage({
      // 图片链接
      current: e.currentTarget.id,
      urls: this.data.files
    })
  }
})