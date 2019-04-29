- 组件思维
  弹窗组合了一些标签， 组合在一起形成了独立的弹窗功能，
  在其他页面里也要用到， 组合成一个独立的组件， 组件名叫做 <dialog />
  页面是由组件拼装而成。

- 组件语法
  同于Page 又有异
  Component({
      // 自己的
      data: {},
      //  
      properties: {
          <!-- 属性类型定义，不传这些属性就会报错 -->
          title: {
              type: String,
              value: '标题'
          }
      },
      method: {

      }
  }) 

- bind tap 区别
  bindtap 向外冒泡 由内到外都触发
  catch:tap 不会向外冒泡