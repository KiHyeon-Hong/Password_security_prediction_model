const fs = require('fs');

class koreanZxcvbnString {
    koreanZxcvbnString(data) {
        var female = fs.readFileSync(__dirname + '/../files/femaleListToEng.txt', 'utf8');
        var male = fs.readFileSync(__dirname + '/../files/maleListToEng.txt', 'utf8');
        var word = fs.readFileSync(__dirname + '/../files/wordDataToEng.txt', 'utf8');
        
        female = female.split(',');
        male = male.split(',');
        word = word.split(',');

        data = data.replace(/[0-9]/g, "").replace(/[\∼\‘\!\@\#\$\%\^\&\*\(\)\-\_\=\+\[\{\]\}\\\|\;\:\”\’\,\<\.\>\/\?\~\'\"]/g, "");

        if(data.length == 0) {
            return "noWord";
        }

        for(let i = 0; i < female.length; i++) {
            if(data == female[i]) {
                return "koreanFemaleWord";
            }
        }
        for(let i = 0; i < male.length; i++) {
            if(data == male[i]) {
                return "koreanMaleWord";
            }
        }
        for(let i = 0; i < word.length; i++) {
            if(data == word[i]) {
                return "koreanWord";
            }
        }

        return "goodWord";
    }

    // 만약 일치하는 단어가 있다면, 0점, 그렇지 않으면 1점 반환
    frequencyComparePoint(text) {
        // 쉼표로 구분되어 있음
        var female = fs.readFileSync(__dirname + '/../files/femaleListToEng.txt', 'utf8');
        var male = fs.readFileSync(__dirname + '/../files/maleListToEng.txt', 'utf8');
        var word = fs.readFileSync(__dirname + '/../files/wordDataToEng.txt', 'utf8');
        
        female = female.split(',');
        male = male.split(',');
        word = word.split(',');
        
        var data = [];
        data = data.concat(female, male, word);

        text = text.replace(/[0-9]/g, "").replace(/[\∼\‘\!\@\#\$\%\^\&\*\(\)\-\_\=\+\[\{\]\}\\\|\;\:\”\’\,\<\.\>\/\?\~\'\"]/g, "");

        if(text.length == 0) {
            return 0;
        }

        for(let i = 0; i < data.length; i++) {
            if(text == data[i]) {
                return 0;
            }
        }
        
        return 1;
    }
}

module.exports.koreanZxcvbnString = koreanZxcvbnString;