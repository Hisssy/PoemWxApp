var timer;
const counterTime = 120;
const app = getApp();
var TS;

Page({
  data:{
    questionType:1,
    th:1,
    questShow:true,
    questArr:[],
    counter:counterTime,
    scole:0
  },
  onLoad:function(){
    this.getQuestion();
  },
  setCounter:function(){
    this.setData({
      counter:counterTime
    })
    var counter = counterTime;
    timer = setInterval(function(){
      if(counter>0){
        counter--;
        this.setData({
          counter:counter
        })
      }else{
        this.questShift();
      }
    }.bind(this),1000)
  },
  questShift:function(){
    var answer = this.selectComponent("#questSec").checkAnswer();
    this.addScole(answer);

    clearInterval(timer);

    if(this.data.th==TS){
      wx.navigateTo();
      return;
    }

    this.setData({
      questShow:false,
      questionType:this.data.questArr[this.data.th],
      th:this.data.th+1
    })
    this.setData({
      questShow:true
    })
    this.setCounter();
  },
  getQuestion(){
    wx.request({
      url:app.globalData.apiURL+'/wxGetQuestions',
      method:'GET',
      header:{},
      dataType:'json',
      success:function(data){
        TS = data.length;
        this.setData({
          questArr:data
        })
        this.setCounter();
      }.bind(this)
    })
  },
  addScole(answer){
    if(answer==1){
      this.data.scole++;
    }
  }
})