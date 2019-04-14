//app.js
// TO DO :
// 判断LocalStorage中的userName和avatar与微信API提供的是否一致，若不一致重新提交
// 初次登录时保存name和avatar
// Update UserInfo 方法

App({
  onLaunch: function () {
    //处理登录态信息
    function login() {
      if (wx.getStorageSync('skey')) {
        // 检查 session_key
        wx.checkSession({
          // session_key 未过期
          success: function () {
            console.log("Session 未过期");
            // 业务逻辑处理
          },
          // session_key 过期，重新登录
          fail: function () {
            console.log("Session 已过期");
            doLogin();
          }
        });
      } else {
        // 初次登录
        console.log("初次登录");
        doLogin()
      }
    }

    // 登录
    var that = this;
    function doLogin() {
      wx.login({
        success: res => {
          if (res.code) {
            wx.request({
              url: that.globalData.apiURL + '?a=login',
              data: Object.assign(res, that.globalData.userInfo),
              method: "get",
              // 储存 skey 到 localStorage
              success(resp) {
                wx.setStorageSync('skey', resp.data.skey);
              }
            })
          } else {
            console.log(res)
          }
        }
      })
    }

    console.log("skey:",wx.getStorageSync("skey"))
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              //console.log(res);
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo;
              login();
              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  globalData: {
    userInfo: null,
    apiURL: ''
  }
})