const app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    reviewPoem: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    app.fly.request(app.globalData.apiURL + "wxGetDailyReview")
      .then(ret => {
        let resp = ret.data;
        if (resp.statusCode === 200) {
          this.setData({
            reviewPoem: resp.content || [{
              poemTitle: "今天还没有答题"}]
          });
        } else {
          wx.showToast({
            title: "失败"
          })
        }
      })
      .catch(err => {})
  },
  backToIndex() {
    wx.redirectTo({url:"../index/index"});
  }
})