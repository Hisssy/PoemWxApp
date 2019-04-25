//app.js
// TO(WON'T) DO :
// 判断LocalStorage中的userName和avatar与微信API提供的是否一致，若不一致重新提交
// 初次登录时保存name和avatar
let Fly = require("flyio")
const promisify = require('/utils/promisify')
const wxlogin = promisify(wx.login)
App({
  fly: new Fly,
  onLaunch: function () {
    this.fly.config.baseURL = "https://www.danthology.cn/"
    // 拦截请求， 添加 Cookie
    this.fly.interceptors.request.use((config, promise) => {
      config.headers = this.globalData.header;
      return config;
    });

    // 拦截响应，处理响应码
    this.fly.interceptors.response.use(
      response => {
        newFly = new Fly;
        // skey 过期处理
        if (response.data.statusCode === this.globalData.resp.skeyExpire) {
          return doLogin()
            .then((p) => {
              return newFly.request(response.request)
            });
            // 后端错误处理
        } else if (response.data.statusCode === this.globalData.resp.serverError) {
          return newFly.request(response.request);
        } else {
          // 正常响应
          return response.data.data;
        }
      },
      err => {
        console.log(err);
        wx.showToast({
          icon: "none",
          title: "网络错误"
        })
      }
    )

    // 登录
    let that = this;
    // skey续期，重新登录
    function doLogin() {
      return wxlogin()
        .then(ret => {
          if (ret.code) {
            return that.fly.request(that.globalData.apiURL + 'wxLogin', Object.assign(ret, that.globalData.userInfo))
          } else {
            reject("微信接口错误");
          }
        })
        .then(resp => {
          that.globalData.userStatus = resp.data.statusCode;
          wx.setStorageSync('skey', resp.data.skey);
          that.globalData.header.cookie = 'skey=' + resp.data.skey;
        })
        .catch(err => {});
    };

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