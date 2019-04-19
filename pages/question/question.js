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
    score:0,
    isEnd:false
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
    this.addScore(answer);

    clearInterval(timer);

    if(this.data.th==TS){
      this.setData({
        isEnd:true
      })
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
    var _this = this;
    app.fly.request(that.globalData.apiURL + 'wxGetQuestions')
        .then(data => {
          if(data.statusCode == 301){
            var content = data.content;
            TS = content.length;
            _this.setData({
              questArr:content
            })
            this.setCounter();
          }
        }).catch(err => {})
  },
  addScore(answer){
    if(answer==1){
      let score = this.data.score+1;
      this.setData({
        score:score
      })
    }
  }
})