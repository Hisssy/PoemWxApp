// pages/rank/rank.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    dateTime: '',
    rankData: [{
      wxUserName: 'xxx',
      wxAvatar: '',
      userCollege: 'xxx',
      userScore: 114
    }, {
      wxUserName: 'xxx',
      wxAvatar: '',
      userCollege: 'xxx',
      userScore: 114
    }],
    selfData: {
      wxUserName: 'xxx',
      userCollege: 'xxx',
      userScore: 115,
      rank: 1
    },
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var date = new Date();
    var dateStr = date.getMonth() + 1 + '月' + date.getDate() + '日';
    this.setData({
      dateTime: dateStr
    })
    app.fly.request(app.globalData.apiURL + 'wxGetRankList')
      .then(ret => {
        let rankData = ret.data.rankData;
        let selfData = ret.data.selfData;
        this.setData({
          rankData: rankData,
          selfData: selfData
        })
      })
      .catch(err => {});
  },
  backToIndex() {
    wx.navigateBack();
  }
})