/*
    LUDS : 대문자, 소문자, 숫자, 특수 기호를 다양하게 구성
    zxcvbn : 사전의 없는 단어가 되도록 변경
    Levenshtein : 기존의 단어들과 가장 멀리 떨어지는 단어로 변경
*/

const fs = require('fs');

const koreanZxcvbn = require(__dirname + '/../lib/koreanZxcvbn');
const levenshteinDistance = require(__dirname + '/../lib/levenshteinDistance.js');
const ludsPoint = require(__dirname + '/../lib/ludsPoint.js');

const koreanZxcvbnString = require(__dirname + '/../lib/koreanZxcvbnString');
const comparePoint = new koreanZxcvbnString.koreanZxcvbnString.koreanZxcvbnString();

var datas = fs.readFileSync(__dirname + '/../files/updateLeakPredictPassword.txt', 'utf8');
datas = datas.split('\n');

fs.writeFileSync(__dirname + '/../files/feedbackUpdatePassword.txt', '', 'utf8');

var data = [];

for(let i = 0; i < datas.length - 1; i++) {
    data[i] = datas[i].split('\r')[0];
}

var chars = ["abcdefghijklmnopqrstuvwxyz", "ABCDEFGHIJKLMNOPQRSTUVWXYZ", "0123456789", "!@#$%^&*()"];

for(let i = 0; i < data.length; i++) {
    for(let j = 0; j < 10; j++) {
        // 취약한 부분 찾기
        var zxcvbnPoint = parseInt(parseInt(((koreanZxcvbn(data[0]).score * 2) + comparePoint.frequencyComparePoint(data[0]))) / 2) < 5? parseInt(parseInt(((koreanZxcvbn(data[0]).score * 2) + comparePoint.frequencyComparePoint(data[0]))) / 2): 4;
        var luds = parseInt(parseInt(ludsPoint.ludsPoint(data[0]).nScore) / 20) < 5? parseInt(parseInt(ludsPoint.ludsPoint(data[0]).nScore) / 20): 4;
        var levenshteinPoint = parseInt(levenshteinDistance.totalLVD(data[0])) < 3? 0: 1;

        var feedbackPwd = data[i];

        if(feedbackPwd.length <= 5) {
            // console.log('비밀번호의 길이가 너무 짧음');

            while(feedbackPwd.length < 5) {
                var length = feedbackPwd.length;
                var random = Math.floor(Math.random() * (feedbackPwd.length + 1));
            
                if(random == length) {
                    var ran = Math.floor(Math.random() * 4);
            
                    var rnum = Math.floor(Math.random() * chars[ran].length);
                    rnum = chars[ran].substring(rnum, rnum + 1);
            
                    feedbackPwd = feedbackPwd + rnum;
                }
                else {
                    var ran = Math.floor(Math.random() * 4);
            
                    var rnum = Math.floor(Math.random() * chars[ran].length);
                    rnum = chars[ran].substring(rnum, rnum + 1);
            
                    feedbackPwd = feedbackPwd.substring(0, random) + rnum + feedbackPwd.substring(random, feedbackPwd.length);
                }
            }
        }

        if(luds < 3) {

            let tempPwd = feedbackPwd;
            let check = 0;

            if(data[i].replace(/[A-Z]/g, "") == '') {
                // console.log('비밀번호가 대문자만으로 구성됨');

                var length = feedbackPwd.length;
                var random = Math.floor(Math.random() * (feedbackPwd.length + 1));
                
                if(random == length) {
                    var ran = 0;

                    while(true) {
                        ran = Math.floor(Math.random() * 4)
                        if(ran != 1) {
                            break;
                        }
                    }
                
                    var rnum = Math.floor(Math.random() * chars[ran].length);
                    rnum = chars[ran].substring(rnum, rnum + 1);
                
                    tempPwd = feedbackPwd + rnum;
                }
                else {
                    var ran = 0;

                    while(true) {
                        ran = Math.floor(Math.random() * 4)
                        if(ran != 1) {
                            break;
                        }
                    }
                
                    var rnum = Math.floor(Math.random() * chars[ran].length);
                    rnum = chars[ran].substring(rnum, rnum + 1);
                
                    tempPwd = feedbackPwd.substring(0, random) + rnum + feedbackPwd.substring(random, feedbackPwd.length);
                }
            }
            else if(data[i].replace(/[a-z]/g, "") == '') {
                // console.log('비밀번호가 소문자만으로 구성됨');

                var length = feedbackPwd.length;
                var random = Math.floor(Math.random() * (feedbackPwd.length + 1));
                
                if(random == length) {
                    var ran = 0;

                    while(true) {
                        ran = Math.floor(Math.random() * 4)
                        if(ran != 0) {
                            break;
                        }
                    }
                
                    var rnum = Math.floor(Math.random() * chars[ran].length);
                    rnum = chars[ran].substring(rnum, rnum + 1);
                
                    tempPwd = feedbackPwd + rnum;
                }
                else {
                    var ran = 0;

                    while(true) {
                        ran = Math.floor(Math.random() * 4)
                        if(ran != 0) {
                            break;
                        }
                    }
                
                    var rnum = Math.floor(Math.random() * chars[ran].length);
                    rnum = chars[ran].substring(rnum, rnum + 1);
                
                    tempPwd = feedbackPwd.substring(0, random) + rnum + feedbackPwd.substring(random, feedbackPwd.length);
                }
            }
            else if(data[i].replace(/[0-9]/g, "") == '') {
                // console.log('비밀번호가 숫자만으로 구성됨');

                var length = feedbackPwd.length;
                var random = Math.floor(Math.random() * (feedbackPwd.length + 1));
                
                if(random == length) {
                    var ran = 0;

                    while(true) {
                        ran = Math.floor(Math.random() * 4)
                        if(ran != 2) {
                            break;
                        }
                    }
                
                    var rnum = Math.floor(Math.random() * chars[ran].length);
                    rnum = chars[ran].substring(rnum, rnum + 1);
                
                    tempPwd = feedbackPwd + rnum;
                }
                else {
                    var ran = 0;

                    while(true) {
                        ran = Math.floor(Math.random() * 4)
                        if(ran != 2) {
                            break;
                        }
                    }
                
                    var rnum = Math.floor(Math.random() * chars[ran].length);
                    rnum = chars[ran].substring(rnum, rnum + 1);
                
                    tempPwd = feedbackPwd.substring(0, random) + rnum + feedbackPwd.substring(random, feedbackPwd.length);
                }
            }
            else if(data[i].replace(/[\∼\‘\!\@\#\$\%\^\&\*\(\)\-\_\=\+\[\{\]\}\\\|\;\:\”\’\,\<\.\>\/\?\~\'\"]/g, "") == '') {
                // console.log('비밀번호가 특수 기호만으로 구성됨');

                var length = feedbackPwd.length;
                var random = Math.floor(Math.random() * (feedbackPwd.length + 1));
                
                if(random == length) {
                    var ran = 0;

                    while(true) {
                        ran = Math.floor(Math.random() * 4)
                        if(ran != 3) {
                            break;
                        }
                    }
                
                    var rnum = Math.floor(Math.random() * chars[ran].length);
                    rnum = chars[ran].substring(rnum, rnum + 1);
                
                    tempPwd = feedbackPwd + rnum;
                }
                else {
                    var ran = 0;

                    while(true) {
                        ran = Math.floor(Math.random() * 4)
                        if(ran != 3) {
                            break;
                        }
                    }
                
                    var rnum = Math.floor(Math.random() * chars[ran].length);
                    rnum = chars[ran].substring(rnum, rnum + 1);
                
                    tempPwd = feedbackPwd.substring(0, random) + rnum + feedbackPwd.substring(random, feedbackPwd.length);
                }
            }
            if(data[i].replace(/[A-Z]/g, "").replace(/[a-z]/g, "") == '') {
                // console.log('비밀번호가 문자만으로 구성됨');

                var length = feedbackPwd.length;
                var random = Math.floor(Math.random() * (feedbackPwd.length + 1));
                
                if(random == length) {
                    var ran = 0;

                    while(true) {
                        ran = Math.floor(Math.random() * 4)
                        if(ran != 0 && ran != 1) {
                            break;
                        }
                    }
                
                    var rnum = Math.floor(Math.random() * chars[ran].length);
                    rnum = chars[ran].substring(rnum, rnum + 1);
                
                    tempPwd = feedbackPwd + rnum;
                }
                else {
                    var ran = 0;

                    while(true) {
                        ran = Math.floor(Math.random() * 4)
                        if(ran != 0 && ran != 1) {
                            break;
                        }
                    }
                
                    var rnum = Math.floor(Math.random() * chars[ran].length);
                    rnum = chars[ran].substring(rnum, rnum + 1);
                
                    tempPwd = feedbackPwd.substring(0, random) + rnum + feedbackPwd.substring(random, feedbackPwd.length);
                }
            }

            feedbackPwd = tempPwd;
        }


        if(zxcvbnPoint < 3) {
            // console.log('사전에 포함된 단어를 사용하거나 유추하기 쉬움');

            let tempPwd = feedbackPwd;

            while(true) {
                if(parseInt(parseInt(((koreanZxcvbn(tempPwd).score * 2) + comparePoint.frequencyComparePoint(tempPwd))) / 2) >= 1) {
                    if(feedbackPwd == data[i]) {
                        feedbackPwd = tempPwd;
                    }
                    break;
                }

                var length = feedbackPwd.length;
                var random = Math.floor(Math.random() * (feedbackPwd.length + 1));
            
                if(random == length) {
                    var ran = Math.floor(Math.random() * 4);
            
                    var rnum = Math.floor(Math.random() * chars[ran].length);
                    rnum = chars[ran].substring(rnum, rnum + 1);
            
                    tempPwd = feedbackPwd + rnum;
                }
                else {
                    var ran = Math.floor(Math.random() * 4);
            
                    var rnum = Math.floor(Math.random() * chars[ran].length);
                    rnum = chars[ran].substring(rnum, rnum + 1);
            
                    tempPwd = feedbackPwd.substring(0, random) + rnum + feedbackPwd.substring(random, feedbackPwd.length);
                }
            }
        }

        if(levenshteinPoint < 1) {
            // console.log('사전에 포함된 단어와 비슷한 단어를 사용함');

            let tempPwd = feedbackPwd;

            while(true) {
                if(parseInt(levenshteinDistance.totalLVD(tempPwd)) >= 1) {
                    if(feedbackPwd == data[i]) {
                        feedbackPwd = tempPwd;
                    }
                    break;
                }

                var length = feedbackPwd.length;
                var random = Math.floor(Math.random() * (feedbackPwd.length + 1));
            
                if(random == length) {
                    var ran = Math.floor(Math.random() * 4);
            
                    var rnum = Math.floor(Math.random() * chars[ran].length);
                    rnum = chars[ran].substring(rnum, rnum + 1);
            
                    tempPwd = feedbackPwd + rnum;
                }
                else {
                    var ran = Math.floor(Math.random() * 4);
            
                    var rnum = Math.floor(Math.random() * chars[ran].length);
                    rnum = chars[ran].substring(rnum, rnum + 1);
            
                    tempPwd = feedbackPwd.substring(0, random) + rnum + feedbackPwd.substring(random, feedbackPwd.length);
                }
            }
        }

        if(data[i] == feedbackPwd) {
            // console.log('아 몰랑 보안성 낮음');
            feedbackPwd = feedbackPwd + '!';
        }

        // console.log(feedbackPwd);
        fs.appendFileSync(__dirname + '/../files/feedbackUpdatePassword.txt', feedbackPwd + '\n', 'utf8');
    }
}