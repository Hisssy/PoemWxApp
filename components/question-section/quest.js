Component({
    data: {
        // questionType: 1,
        poemTitle: "",
        poemContent: "",
        optionA:"",
        optionB:"",
        optionC:"",
        optionD:"",
        words:[
            {word:'以'},{word:'衣'},{word:'花'},{word:'云'},{word:'裳'},{word:'像'},{word:'容'},{word:'想'},{word:'想'}],
        userAnswer:[{},{},{},{},{},{},{}],
        option:[
            {option:'A',value:'一枝红艳露凝香，云雨巫山枉断肠。借问汉宫,谁得似，可怜飞燕倚新妆。'},
            {option:'B',value:'一枝红艳露凝香，云雨巫山枉断肠。借问汉宫,谁得似，可怜飞燕倚新妆。'},
            {option:'C',value:'一枝红艳露凝香，云雨巫山枉断肠。借问汉宫,谁得似，可怜飞燕倚新妆。'},
            {option:'D',value:'一枝红艳露凝香，云雨巫山枉断肠。借问汉宫,谁得似，可怜飞燕倚新妆。'}
        ],
        aaa:['清平调','云想衣裳花想容，春风拂槛露华浓。','若非群玉山头见，会向瑶台月下逢。']
    },
    methods: {
        selectWord:function(event){
            var wordIndex = event.currentTarget.dataset.index;
            var words = this.data.words;
            if(words[wordIndex].isSelect==1){
                return;
            }
            words[wordIndex].isSelect = 1;
            var userAnswerX = this.data.userAnswer;
            var answerIndex = -1;
            for(let i in userAnswerX){
                if(userAnswerX[i].word==undefined){
                    answerIndex = i;
                    break;
                }
            }
            if(answerIndex==-1){
                return;
            }
            userAnswerX[answerIndex].word = this.data.words[wordIndex].word;
            this.setData({
                userAnswer:userAnswerX,
                words:words
            });
        }
    }
})