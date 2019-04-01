// components/review-poem/poem.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    poemAuthor: {
      type: String,
      value: "字串",
      observer() {},
    },
    poemTitle: String,
    poemBody: String,
    poemIndex: Number
  },

  /**
   * 组件的初始数据
   */
  data: {
    // poemAuthor: "元稹",
    // poemTitle: "离思五首",
    // poemBody: "曾经沧海难为水，除却巫山不是云。取次花丛懒回顾，半缘修道半缘君。",
    // poemIndex: 1
  },

  /**
   * 组件的方法列表
   */
  methods: {

  }
})