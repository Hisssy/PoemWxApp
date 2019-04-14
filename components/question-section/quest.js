const app = getApp();
Component({
  data: {
    poemTitle: "",
    poemContent: "",
    optionA: "",
    optionB: "",
    optionC: "",
    optionD: "",
    words: [
      {word: '以'}, {word: '衣'}, {word: '花'}, {word: '云'}, {word: '裳'}, {word: '像'}, {word: '容'}, {word: '想'}, {word: '想'}],
    userAnswer: [{}, {}, {}, {}, {}, {}, {}],
    option: [
      {option: 'A', value: '一枝红艳露凝香，云雨巫山枉断肠。借问汉宫,谁得似，可怜飞燕倚新妆。'},
      {option: 'B', value: '一枝红艳露凝香，云雨巫山枉断肠。借问汉宫,谁得似，可怜飞燕倚新妆。'},
      {option: 'C', value: '一枝红艳露凝香，云雨巫山枉断肠。借问汉宫,谁得似，可怜飞燕倚新妆。'},
      {option: 'D', value: '一枝红艳露凝香，云雨巫山枉断肠。借问汉宫,谁得似，可怜飞燕倚新妆。'}
    ],
    optionPD: [
      {className: 'icon-cha'},
      {className: 'icon-gou'}
    ],
    aaa: ['清平调', '云想衣裳花想容，春风拂槛露华浓。', '若非群玉山头见，会向瑶台月下逢。']
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
      var type = event.currentTarget.dataset.type;
      if (type == 1) {
        let option = this.data.questData.questionOption;
        for (let i = 0; i < option.length; i++) {
          option[i].isSelect = 0;
        }
        option[optionIndex].isSelect = 1;
        this.setData({
          'questData.questionOption': option
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
    checkAnswer(){
      wx.request({
        url:app.globalData.apiURL+'/globalData',
        method:'GET',
        data:{
          questionSessId:'',
          answer:''
        },
        success:function(data){
          if(data.msg){
            return 1;
          }else{
            return 0;
          }
        }
      })
    }
  }
})