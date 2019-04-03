var timer;
const counterTime = 120;
Page({
  data:{
    questionType:1,
    th:1,
    questShow:true,
    questTypeArr:[1,2,3],
    counter:counterTime
  },
  onLoad:function(){
    this.setCounter();
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
    clearInterval(timer);
    this.setData({
      questShow:false,
      questionType:this.data.questTypeArr[this.data.th],
      th:this.data.th+1
    })
    this.setData({
      questShow:true
    })
    this.setCounter();
  }
})