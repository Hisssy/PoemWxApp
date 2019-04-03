var timer;

Page({
  data:{
    questionType:1,
    th:1,
    questShow:true,
    questTypeArr:[1,2,3],
    counter:10
  },
  onLoad:function(){
    this.setCounter();
  },
  setCounter:function(){
    this.setData({
      counter:10
    })
    var counter = 10;
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