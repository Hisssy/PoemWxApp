var timer;
const counterTime = 120;
const app = getApp();

Page({
  data:{
    questionType:1,
    th:1,
    questContent:{},
    counter:counterTime,
    score:0,
    isEnd:false,
    isLoad:false
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
        clearInterval(timer);
        this.questShift();
      }
    }.bind(this),1000)
  },
  questShift:function(){
    var answer = this.selectComponent("#questSec").checkAnswer();
    var _this = this;
    answer.then((res)=>{
      _this.addScore(res);
      _this.getQuestion();
      _this.setData({
        questionType:this.data.questContent.questionType,
        th:this.data.th+1,
        isLoad:false
      })
    })
  },
  getQuestion(){
    var _this = this;
    app.fly.request(app.globalData.apiURL + 'wxGetQuestions')
        .then(data => {
          if(data.data.statusCode==301){
            _this.setData({
              isEnd:true
            })
          }else if(data.data.statusCode==302) {
            _this.getQuestion();
          }else{
            var content = data.data.content;
            _this.setData({
              questContent:content,
              isLoad:true
            })
            clearInterval(timer);
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
    console.log("score:"+this.data.score)
  }
})