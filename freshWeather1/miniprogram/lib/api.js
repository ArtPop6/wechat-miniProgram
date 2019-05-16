const QQ_MAP_KEY = 'FB3BZ-BBYW4-GAAUH-XO2NK-67LFZ-SEBE5'
// 初始化云函数
wx.cloud.init({
    env: 'yue-yva9q'
})
// 获取句柄
const db = wx.cloud.database()

// 封装添加数据方法: 先export 添加心情
export const addEmotion = (openid, emotion) => {
    // 建diary集合
    return db.collection('diary').add({
        data: {
            openid, 
            emotion,
            // 从1970到现在距离多少毫秒
            tsModified: Date.now()
        }
    })
}

// 封装获取位置方法,success回调函数
export const geocoder = (lat, lon, success = () => {}, fail = () => {}) => {
    return wx.request({
        url: 'https://apis.map.qq.com/ws/geocoder/v1/',
        data: {
            // 规定的
            location: `${lat},${lon}`,
            key: QQ_MAP_KEY,
            get_pio: 0
        },
        success,
        fail
    })
}

// 封装获取天气方法 
export const getWeather = (lat, lon) => {
    return wx.cloud.callFunction({
        name: 'he-weather',
        data: {
            lat,
            lon
        }
    })
}