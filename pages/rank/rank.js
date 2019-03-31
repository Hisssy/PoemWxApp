// pages/rank/rank.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    dateTime:'',
    rankData:[
      {
        name:'xxx',
        xy:'xxx',
        jf:'xxx'
      }
    ],
    selfData:{
      name:'xxx',
      xy:'xxx',
      jf:'xxx'
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var date = new Date();
    var dateStr = date.getMonth()+1 + '月' +date.getDate() + '日';
    this.setData({dateTime:dateStr})
  },
  backToIndex(){
    wx.navigateTo({url:"../index/index"})
  }
})