Component({
  data: {
    showModal: true,
    type: 'getUserInfo',
    showCancel: false,
  },
  methods:{
    onTouch: function () {

    },
  },

  // 完成操作的回调
  onComplete: function (e) {
    //  关闭模态框  这里其实不写也行，组件里已经包含了关闭modal的代码，
    //  但是不写这个的话，该页面的data里的showModal值是不会变仍是true，
    //  如果确定不会造成其他影响，写不写看个人
    this.setData({
      showModal: false,
    })

    if (e.detail.confirm) {
      // 用户点击确定
      // 各个type携带的数据 这里为了方便写到一起了

      // 用户授权
      if (this.data.type === 'getUserInfo') {
        if (e.detail.hasUserInfo) {
          // 已经授权
          this.setData({
            hasUserInfo: true,
            userInfo: e.detail.userInfo
          })
          app.globalData.userInfo = e.detail.userInfo
        } else {
          wx.showToast({
            title: '您拒绝了授权',
            icon: 'none'
          })
        }
      }

      // 提交表单
      if (this.data.type === 'prompt') {
        var formData = e.detail.formData
        // eg. { name: 'Jaime'}
      }

      // 打开设置页
      if (this.data.type === 'openSetting') {
        var authSetting = e.detail.authSetting
        // eg. { "scope.userInfo": true}
      }
    } else {
      // 用户点击取消
    }
  }
})