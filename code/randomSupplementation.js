const fs = require('fs');

const koreanZxcvbn = require(__dirname + '/../lib/koreanZxcvbn');
const levenshteinDistance = require(__dirname + '/../lib/levenshteinDistance.js');
const ludsPoint = require(__dirname + '/../lib/ludsPoint.js');

const koreanZxcvbnString = require(__dirname + '/../lib/koreanZxcvbnString');
const comparePoint = new koreanZxcvbnString.koreanZxcvbnString.koreanZxcvbnString();

var datas = fs.readFileSync(__dirname + '/../files/updateLeakPredictPassword.txt', 'utf8');
datas = datas.split('\n');

fs.writeFileSync(__dirname + '/../files/randomUpdatePassword.txt', '', 'utf8');

var data = [];

for(let i = 0; i < datas.length - 1; i++) {
    data[i] = datas[i].split('\r')[0];
}

var chars = ["abcdefghijklmnopqrstuvwxyz", "ABCDEFGHIJKLMNOPQRSTUVWXYZ", "0123456789", "!@#$%^&*()"];


for(let i = 0; i < data.length; i++) {
    for(let j = 0; j < 10; j++) {
        var length = data[i].length;
        var random = Math.floor(Math.random() * (data[i].length + 1));
    
        if(random == length) {
            var ran = Math.floor(Math.random() * 4);
    
            var rnum = Math.floor(Math.random() * chars[ran].length);
            rnum = chars[ran].substring(rnum, rnum + 1);
    
            // console.log(data[i] + rnum);
            fs.appendFileSync(__dirname + '/../files/randomUpdatePassword.txt', data[i] + rnum + '\n', 'utf8');
        }
        else {
            var ran = Math.floor(Math.random() * 4);
    
            var rnum = Math.floor(Math.random() * chars[ran].length);
            rnum = chars[ran].substring(rnum, rnum + 1);
    
            // console.log(data[i].substring(0, random) + rnum + data[i].substring(random, data[i].length));
            fs.appendFileSync(__dirname + '/../files/randomUpdatePassword.txt', data[i].substring(0, random) + rnum + data[i].substring(random, data[i].length) + '\n', 'utf8');
        }
    }
}