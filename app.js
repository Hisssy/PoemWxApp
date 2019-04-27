//app.js
// TO(WON'T) DO :
// 判断LocalStorage中的userName和avatar与微信API提供的是否一致，若不一致重新提交
// 初次登录时保存name和avatar
let Fly = require("flyio")
const promisify = require('/utils/promisify')
const fT = require('/utils/util')
const formatTime = fT.formatTime;
const wxlogin = promisify(wx.login)
App({
  fly: new Fly,
  nFly: new Fly,
  doLogin: function () {
    return wxlogin()
      .then(ret => {
        if (ret.code) {
          return this.nFly.request(this.globalData.apiURL + 'wxLogin', Object.assign(ret, this.globalData.userInfo));
        } else {
          Promise.reject("微信接口错误");
        }
      })
      .then(resp => {
        this.globalData.userStatus = resp.data.statusCode;
        wx.setStorageSync('skey', resp.data.skey);
        this.globalData.header.cookie = 'skey=' + resp.data.skey;
        Promise.resolve(this.globalData.userStatus);
      })
      .catch(err => {
        console.log(err)
      });
  },
  clearAnswerData: function () {
    console.log(wx.getStorageSync("answerDate"));
    let time = wx.getStorageSync("answerDate");
    if (time !== undefined && formatTime(new Date()) !== time) {
      wx.setStorage({
        key: "useTime",
        data: 0
      });
      wx.setStorage({
        key: "score",
        data: 0
      });
    }
  },
  onLaunch: function () {
    this.clearAnswerData();
    this.fly.config.baseURL = "https://www.danthology.cn/"
    // 拦截请求， 添加 Cookie
    this.fly.interceptors.request.use((config, promise) => {
      config.headers = this.globalData.header;
      return config;
    });

    const newFly = new Fly;
    let _this = this;
    // 拦截响应，处理响应码
    this.fly.interceptors.response.use(
      function (response) {
        // skey 过期处理
        if (response.data.statusCode === _this.globalData.resp.skeyExpire) {
          this.lock();
          return _this.doLogin()
            .then(() => {
              this.unlock();
              return newFly.request(response.request);
            })
          // 后端错误处理
        } else if (response.data.statusCode === _this.globalData.resp.serverError) {
          return newFly.request(response.request);
        } else {
          // 正常响应
          return response;
        }
      },
      function (err) {
        console.log(err);
        wx.showToast({
          icon: "none",
          title: "网络错误"
        })
      }
    )

    // 调试用
    // wx.removeStorageSync("skey");
    console.log("skey:", wx.getStorageSync("skey"))
  },

  globalData: {
    header: {
      'content-type': 'application/x-www-form-urlencoded',
      'cookie': 'skey=' + wx.getStorageSync("skey") //读取cookie
    },
    resp: {
      ok: 200,
      skeyExpire: 201,
      firstLogin: 202,
      serverError: 302,
    },
    userStatus: 200,
    userInfo: null,
    apiURL: 'https://www.danthology.cn/ezhan/api/'
  }
})