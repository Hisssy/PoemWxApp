//index.js
//获取应用实例
const app = getApp()
Page({
  data: {
    userInfo: {},
    hasUserInfo: false,
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
  showInfoModal: function () {
    if (this.data.hasUserInfo && app.globalData.userStatus === 200) {
      this.setData({
        isInfoOpen: true
      })
    } else {
      this.showLoginModal();
    }
  },
  submitUserInfo: function (e) {
    app.fly.request(app.globalData.apiURL + "wxSubmitUserInfo", e.detail.value)
      .then(ret => {
        console.log(ret.data);
        if (ret.data.statusCode === 200) {
          wx.showToast({
            title: "成功！"
          });
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
  startGame: function () {
    console.log("用户状态：" + app.globalData.userStatus);
    if (this.data.hasUserInfo && app.globalData.userStatus === 200) {
      //start game here
      wx.navigateTo({
        url: "../question/question"
      })
    } else {
      this.showLoginModal();
    }
  },
  showRank: function () {
    if (this.data.hasUserInfo && app.globalData.userStatus === 200) {
      wx.navigateTo({
        url: "../rank/rank"
      })
    } else {
      this.showLoginModal();
    }
  },
  showReview: function () {
    if (this.data.hasUserInfo && app.globalData.userStatus === 200) {
      wx.navigateTo({
        url: "../review/review"
      })
    } else {
      this.showLoginModal();
    }
  },
  getUserDetailInfo: function () {
    app.fly.get(app.globalData.apiURL + "wxGetUserInfo")
      .then(ret => {
        let resp = ret.data;
        if (resp.statusCode === 200) {
          delete resp.statusCode;
          this.setData(resp);
        } else {
          wx.showToast({
            icon: "none",
            title: "请求失败"
          })
        }
      })
      .catch(err => {})
  },
  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }

    //页面数据加载
    if (!this.data.hasUserInfo) {
      this.getUserDetailInfo();
    }
  },
  getUserInfo: function (e) {
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})