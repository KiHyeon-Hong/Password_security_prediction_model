const fs = require('fs');

const koreanZxcvbn = require(__dirname + '/../lib/koreanZxcvbn');
const levenshteinDistance = require(__dirname + '/../lib/levenshteinDistance.js');
const ludsPoint = require(__dirname + '/../lib/ludsPoint.js');

const koreanZxcvbnString = require(__dirname + '/../lib/koreanZxcvbnString');
const comparePoint = new koreanZxcvbnString.koreanZxcvbnString.koreanZxcvbnString();

var datas = fs.readFileSync(__dirname + '/../files/LeakData.txt', 'utf8');
datas = datas.split('\n');

var data = [];
var value = [];

for(let i = 0; i < datas.length; i++) {
    data[i] = datas[i].split(':')[0];
    value[i] = datas[i].split(':')[1];
}

var leakDatas = [];
var leakValues = [];
var notLeakDatas = [];
var notLeakValues = [];

var leakCount = 0;
var notLeakCount = 0;

for(let i = 0; i < datas.length; i++) {
    if(value[i] == 0) {
        notLeakDatas[notLeakCount] = data[i];
        notLeakValues[notLeakCount] = value[i];
        notLeakCount += 1;

    }
    else {
        leakDatas[leakCount] = data[i];
        leakValues[leakCount] = value[i];
        leakCount += 1;  

    }
}

fs.writeFileSync(__dirname + '/../files/LeakPasswordFeatures.txt', '', 'utf8');

for(let i = 0; i < leakDatas.length; i++) {
    var zxcvbnPoint = parseInt(parseInt(((koreanZxcvbn(leakDatas[i]).score * 2) + comparePoint.frequencyComparePoint(leakDatas[i]))) / 2) < 5? parseInt(parseInt(((koreanZxcvbn(leakDatas[i]).score * 2) + comparePoint.frequencyComparePoint(leakDatas[i]))) / 2): 4;
    var luds = parseInt(parseInt(ludsPoint.ludsPoint(leakDatas[i]).nScore) / 20) < 5? parseInt(parseInt(ludsPoint.ludsPoint(leakDatas[i]).nScore) / 20): 4;
    var levenshteinPoint = parseInt(levenshteinDistance.totalLVD(leakDatas[i])) < 3? 0: 1;


    fs.appendFileSync(__dirname + '/../files/LeakPasswordFeatures.txt', leakDatas[i] + ',' + zxcvbnPoint + ',' + luds + ',' + levenshteinPoint + ',' + leakValues[i] + '\n', 'utf8');
}

fs.writeFileSync(__dirname + '/../files/notLeakPasswordFeatures.txt', '', 'utf8');

for(let i = 0; i < notLeakDatas.length; i++) {
    var zxcvbnPoint = parseInt(parseInt(((koreanZxcvbn(notLeakDatas[i]).score * 2) + comparePoint.frequencyComparePoint(notLeakDatas[i]))) / 2) < 5? parseInt(parseInt(((koreanZxcvbn(notLeakDatas[i]).score * 2) + comparePoint.frequencyComparePoint(notLeakDatas[i]))) / 2): 4;
    var luds = parseInt(parseInt(ludsPoint.ludsPoint(notLeakDatas[i]).nScore) / 20) < 5? parseInt(parseInt(ludsPoint.ludsPoint(notLeakDatas[i]).nScore) / 20): 4;
    var levenshteinPoint = parseInt(levenshteinDistance.totalLVD(notLeakDatas[i])) < 3? 0: 1;


    fs.appendFileSync(__dirname + '/../files/notLeakPasswordFeatures.txt', notLeakDatas[i] + ',' + zxcvbnPoint + ',' + luds + ',' + levenshteinPoint + ',' + notLeakValues[i] + '\n', 'utf8');
}