const app = getApp();
Component({
  data: {
    words: [],
    userAnswer: [],
    option: [
      {option: 'A', value: ''},
      {option: 'B', value: ''},
      {option: 'C', value: ''},
      {option: 'D', value: ''}
    ],
    optionPD: [
      {className: 'icon-cha'},
      {className: 'icon-gou'}
    ],
    description: '',
    optionIndex:-1
  },
  properties: {
    questType: {
      type: Number,
      value: 1
    },
    th: {
      type: Number,
      value: 1
    },
    questData:{
      type:Object
    }
  },
  methods: {
    selectWord: function (event) {
      var wordIndex = event.currentTarget.dataset.index;
      var words = this.data.words;
      var userAnswerX = this.data.userAnswer;
      var answerIndex = -1;
      for (let i in userAnswerX) {
        if (userAnswerX[i].word == undefined || userAnswerX[i].word == '') {
          answerIndex = i;
          break;
        }
      }
      if (answerIndex == -1) {
        return;
      }

      if (words[wordIndex].isSelect == 1) {
        return;
      }
      words[wordIndex].isSelect = 1;

      userAnswerX[answerIndex].word = this.data.words[wordIndex].word;
      userAnswerX[answerIndex].wordIndex = wordIndex;
      this.setData({
        userAnswer: userAnswerX,
        words: words
      });
    },
    wordBack: function (event) {
      var wordData = event.currentTarget.dataset.data;
      if (!wordData.word) {
        return;
      }
      var index = event.currentTarget.dataset.index;
      var userAnswerX = this.data.userAnswer;
      userAnswerX[index].word = '';
      this.setData({
        userAnswer: userAnswerX
      })
      this.backShow(wordData.wordIndex);
    },
    backShow: function (wordIndex) {
      var words = this.data.words;
      words[wordIndex].isSelect = 0
      this.setData({
        words: words
      })
    },
    selectClick: function (event) {
      var optionIndex = event.currentTarget.dataset.index;
      this.data.optionIndex = optionIndex;
      var type = event.currentTarget.dataset.type;
      if (type == 1) {
        let option = this.data.option;
        for (let i = 0; i < option.length; i++) {
          option[i].isSelect = 0;
        }
        option[optionIndex].isSelect = 1;
        this.setData({
          option:option
        })
      } else if (type == 2) {
        let option = this.data.optionPD;
        for (let i = 0; i < option.length; i++) {
          option[i].isSelect = 0;
        }
        option[optionIndex].isSelect = 1;
        this.setData({
          optionPD: option
        })
        console.log(option)
      }
    },
    checkAnswer() {
      var questionType = this.data.questData.questionType;
      var answer='';
      switch (questionType){
        case 0:
          var optionIndex = this.data.optionIndex;
          if(optionIndex==-1){
            return 0;
          }else{
            answer = this.data.option[optionIndex].value;
          }
          break;
        case 1:
          for(let i=0;i<this.data.userAnswer.length;i++){
            if(this.data.userAnswer[i].word==undefined || this.data.userAnswer[i].word==''){
              return 0;
            }
            answer+=this.data.userAnswer[i].word;
          }
          break;
      }
      console.log(answer)
      this.request(that.globalData.apiURL + 'wxSubmitAnswer', {
        questionSessId:this.data.questData.questionSessId,
        answer:answer
      }).then((res)=>{
        if(res.statusCode==200){
          wx.showToast({
            icon: "none",
            title: res.msg
          })
          return res.answerCode
        }
      }).catch(()=>{})
    }
  },
  lifetimes:{
    ready(){
      var Data = this.data.questData;
      var questType = Data.questionType;
      switch(questType){
        case 0:
          let option = this.data.option;
          for(let i in Data.questionOption){
            option[i].value = Data.questionOption[i];
          }
          this.setData({
            option:option,
            description:Data.questionDescription
          })
          break;
        case 1:
          let words = this.data.words;
          let userAnswer = this.data.userAnswer;
          for(let i in Data.questionContent){
            words.push({'word':Data.questionContent[i]})
            if(i<Data.questionsize){
              userAnswer.push({})
            }
          }
          this.setData({
            words:words,
            userAnswer:userAnswer
          })
          break;
      }
    }
  }
})