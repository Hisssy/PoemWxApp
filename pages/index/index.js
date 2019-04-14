//index.js
//获取应用实例
const app = getApp()
Page({
  data: {
    userInfo: {},
    hasUserInfo: false,
    userCode: "70122222222",
    userEmail: "foo@bar.foo",
    userName: "Xxx",
    userScore: 514,
    userQuesCnt: 114,
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
    this.setData({
      isInfoOpen: true
    })
  },
  submitUserInfo: function (e) {
    console.log("FORM:", e.detail.value)
    wx.request({
      url: app.globalData.apiURL + "?a=wxSubmitUserInfo",
      data: e.detail.value,
      method: "get",
      success: ret => {
        console.log(ret.data);
        if (ret.data.statusCode === 200) {
          wx.showToast({
            title: "成功！"
          })
        } else {
          wx.showToast({
            title: "失败"
          })
        }
      },
      fail: ret=>{
        wx.showToast({
          title: "服务器错误"
        })
      }
    })
  },
  startGame: function () {
    if (this.data.hasUserInfo) {
      //start game here
      wx.navigateTo({
        url: "../question/question"
      })
    } else {
      this.showLoginModal();
    }
  },
  showRank: function () {
    // if(this.data.hasUserInfo){
    wx.navigateTo({
      url: "../rank/rank"
    })
    // } else {
    // this.showLoginModal();
    // }
  },
  showReview: function () {
    wx.navigateTo({
      url: "../review/review"
    })
  },
  getUserDetailInfo: function () {
    wx.request({
      url: app.globalData.apiURL + "?a=wxGetUserInfo",
      method: "get",
      success: ret => {
        let resp = ret.data;
        console.log(resp);
        if (resp.statusCode === 200) {
          delete resp.statusCode;
          this.setData(resp);
        } else {
          wx.showToast({
            title: "网络错误"
          })
        }
      }
    })
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
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})