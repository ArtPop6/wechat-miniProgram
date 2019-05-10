开发流程和工艺

1. 细化模块, api模块
  request封装好
   module.exports = {
       api列表....
   }
   如果代码在重复， 请封装
2. 前后端分离 
    后端API 看文档
    url method data
    问: 前后端怎么配合? 

3. UI 选框架(weui,vant)


1. 没有后台api怎么办
   easy-mock  推荐
   request 方法改写 database
2. 选择weui(推荐)或者vant
   界面， 小程序就是切页面
3. 将每个页面，每个功能封一个函数  unit

两到三周 上线小程序