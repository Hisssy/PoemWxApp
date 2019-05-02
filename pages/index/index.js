//index.js
//获取应用实例
const app = getApp()
const promisify = require('../../utils/promisify')
const wxGetSetting = promisify(wx.getSetting)
const wxGetUserInfo = promisify(wx.getUserInfo)
const wxCheckSession = promisify(wx.checkSession)
Page({
  data: {
    userInfo: {},
    hasWxUserInfo: false,
    userCode: "",
    userEmail: "",
    userName: "",
    userScore: 0,
    userQuesCnt: 0,
    isLoginOpen: false,
    isInfoOpen: false,
  },
  //事件处理函数
  closeLoginModal: function () {
    this.setData({
      isLoginOpen: false
    })
  },
  showLoginModal: function () {
    this.setData({
      isLoginOpen: true
    })
  },
  closeInfoModal: function () {
    this.setData({
      isInfoOpen: false
    })
  },
  submitUserInfo: function (e) {
    // 提交用户详细信息到服务器
    app.fly.request(app.globalData.apiURL + "wxSubmitUserInfo", e.detail.value)
      .then(ret => {
        console.log(ret.data);
        if (ret.data.statusCode === 200) {
          wx.showToast({
            title: "成功！"
          });
          app.globalData.userStatus = 200;
          this.getUserDetailInfo();
          this.closeLoginModal();
        } else {
          wx.showToast({
            title: "失败"
          })
        }
      })
      .catch(error => {})
  },
  setWxUserInfo: function () {
    if (!this.data.hasWxUserInfo) {
      return this.getUserInfoMagical()
        .then(() => {
          this.setData({
            hasWxUserInfo: true
          });
        })
    } else {
      return new Promise((resolve, reject) => {
        resolve()
      });
    }
  },
  startGame: function (e) {
    // 开始游戏
    if (e.detail.userInfo) {
      this.setWxUserInfo()
        .then(() => {
          ret = app.globalData.userStatus;
          console.log(ret);
          if (ret === 200) {
            // Start game here!
            wx.navigateTo({
              url: "../question/question"
            })
          } else {
            this.showLoginModal();
          }
        })
        .catch(err => {
          console.log(err)
        })
    }
  },
  startPractice: function (e) {
    // 开始游戏
    if (e.detail.userInfo) {
      this.setWxUserInfo()
        .then(() => {
          ret = app.globalData.userStatus;
          console.log(ret);
          if (ret === 200) {
            // Start game here!
            wx.navigateTo({
              url: "../practice/practice"
            })
          } else {
            this.showLoginModal();
          }
        })
        .catch(err => {
          console.log(err)
        })
    }
  },
  showInfoModal: function (e) {
    if (this.data.hasWxUserInfo && app.globalData.userStatus === 200) {
      this.setData({
        isInfoOpen: true
      })
    }
  },
  showRank: function (e) {
    // 打开排行榜
    if (this.data.hasWxUserInfo && app.globalData.userStatus === 200) {
      wx.navigateTo({
        url: "../rank/rank"
      })
    }
  },
  showReview: function (e) {
    // 打开每日回顾页
    if (this.data.hasWxUserInfo && app.globalData.userStatus === 200) {
      wx.navigateTo({
        url: "../review/review"
      })
    }
  },
  checkSession: function () {
    // 处理登录态信息（启动时）
    if (wx.getStorageSync('skey')) {
      // 检查 skey 存在
      wxCheckSession()
        .then(
          () => {
            console.log("Wechat Session Key ok");
          }
        )
        .catch(
          () => {
            console.log("Wechat Session Key expired");
            app.doLogin();
          }
        )
    } else {
      // 初次登录
      console.log("skey 不存在");
    }
  },
  getUserDetailInfo: function () {
    // 从服务器拉取用户详细信息
    return app.fly.get(app.globalData.apiURL + "wxGetUserInfo")
      .then(ret => {
        console.log(ret);
        let resp = ret.data;
        if (resp.statusCode === 200) {
          this.setData(resp);
        }
      })
      .catch(err => {
        console.log(err)
      })
  },
  getUserInfoMagical: function () {
    // 获取用户微信信息
    return wxGetSetting()
      .then(
        res => {
          if (res.authSetting['scope.userInfo']) {
            // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
            console.log("Bravo! You are authorized!");
            this.setData({
              hasWxUserInfo: true
            });
            return wxGetUserInfo();
          } else
            return Promise.reject("Not authorized!");
        }
      )
      .then(
        res => {
          // 获取用户微信信息成功
          // 可以将 res 发送给后台解码出 unionId
          app.globalData.userInfo = res.userInfo;
          console.log("Got your information from Wechat!");
          this.setData({
            userInfo: res.userInfo
          });
          this.checkSession();
          return this.getUserDetailInfo();
        }
      )
      .catch(
        err => {
          console.log(err);
        }
      )
  },
  onLoad: function () {
    wx.showLoading({
      title: "正在加载中",
      mask: true
    })
    this.getUserInfoMagical().then(() => {
      wx.hideLoading();
    })
  }
})