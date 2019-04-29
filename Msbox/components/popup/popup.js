Component({
    // page传来的参数
    properties: {
        // 向page要什么,类型
        title: {
            type: String,
            value: '标题'
        },
        content: {
            type: String,
            value: '内容'
        },
        btn_no: {
            type: String,
            value: '取消'
        },
        btn_ok: {
            type: String,
            value: '确定'
        }
    },
    data: {
        flag : true  /* 弹窗显示还是隐藏 */
    },
    // 页面中被调用
    // 组件内部方法method声明
    methods: {
        hidePopup: function() {
            this.setData({
                flag: !this.data.flag
            })
        },
        showPopup () {
            this.setData({
                flag: !this.data.flag
            })
        },
        // 由内向外，通过triggerEvent达到目的
        // bind:指定trigger发生的
        _error () {
            console.log('ddd')
            this.triggerEvent("error");
        },
        _success () {
            this.triggerEvent("success");
        }

    }
})