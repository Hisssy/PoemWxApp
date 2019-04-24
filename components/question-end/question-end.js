// components/question-end.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    score: {
      type: Number,
      default: 0
    },
    useTime: {
      type: Number
    },
    avatarUrl: {
      type: String
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  methods: {
    backToIndex: () => {
      wx.navigateBack();
    },
    naviToReview: () => {
      wx.navigateTo({url:"../review/review"});
    }
  }
})