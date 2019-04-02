var timer;

Page({
  data:{
    questionType:1,
    th:1,
    questShow:true,
    questTypeArr:[1,2,3],
    counter:120
  },
  onLoad:function(){
    this.setCounter();
  },
  setCounter:function(){
    this.setData({
      counter:120
    })
    var counter = 120;
    timer = setInterval(function(){
      if(counter<=0){
        this.questShift();
        clearTimeout(timer)
      }
      counter--;
      this.setData({
        counter:counter
      })
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