const fs = require('fs');

var tf = require('@tensorflow/tfjs');
require('tfjs-node-save');

var json = fs.readFileSync(__dirname + '/../files/passwordModelTrainPara.json', 'utf8');
json = JSON.parse(json);

var oriDatas = fs.readFileSync(__dirname + '/../files/updateLeakPasswordFeatures.txt', 'utf8');
oriDatas = oriDatas.split('\n');

var datas = [];
for (let i = 0; i < oriDatas.length; i++) {
    datas[i] = oriDatas[i].split('\r')[0];
}

var leakString = [];
var leakDataFeature1 = [];
var leakDataFeature2 = [];
var leakDataFeature3 = [];
var leakDataValue = [];

for (let i = 0; i < datas.length - 1; i++) {
    leakString[i] = datas[i].split(',')[0];
    leakDataFeature1[i] = datas[i].split(',')[1];
    leakDataFeature2[i] = datas[i].split(',')[2];
    leakDataFeature3[i] = datas[i].split(',')[3];
    leakDataValue[i] = 0;
}

oriDatas = fs.readFileSync(__dirname + '/../files/updateNotLeakPasswordFeatures.txt', 'utf8');
oriDatas = oriDatas.split('\n');

datas = [];
for (let i = 0; i < oriDatas.length; i++) {
    datas[i] = oriDatas[i].split('\r')[0];
}

var notLeakString = [];
var notLeakDataFeature1 = [];
var notLeakDataFeature2 = [];
var notLeakDataFeature3 = [];
var notLeakDataValue = [];

for (let i = 0; i < datas.length - 1; i++) {
    notLeakString[i] = datas[i].split(',')[0];
    notLeakDataFeature1[i] = datas[i].split(',')[1];
    notLeakDataFeature2[i] = datas[i].split(',')[2];
    notLeakDataFeature3[i] = datas[i].split(',')[3];
    notLeakDataValue[i] = 1;
}

var string = [];
var feature1 = [];
var feature2 = [];
var feature3 = [];
var value = [];

for (let i = 0; i < 70000; i++) {
    string[2 * i] = leakString[i];
    feature1[2 * i] = leakDataFeature1[i];
    feature2[2 * i] = leakDataFeature2[i];
    feature3[2 * i] = leakDataFeature3[i];
    value[2 * i] = leakDataValue[i];

    string[2 * i + 1] = notLeakString[i];
    feature1[2 * i + 1] = notLeakDataFeature1[i];
    feature2[2 * i + 1] = notLeakDataFeature2[i];
    feature3[2 * i + 1] = notLeakDataFeature3[i];
    value[2 * i + 1] = notLeakDataValue[i];
}

var trainData = [];
var trainLabel = [];

var validationData = [];
var validationLabel = [];

var validationString = [];

for (let i = 0; i < 50000; i++) {
    trainData[i] = [parseInt(feature1[i]), parseInt(feature2[i]), parseInt(feature3[i])];
    trainLabel[i] = parseInt(value[i]);
}

for (let i = 50000; i < 70000; i++) {
    validationString[i - 50000] = string[i];
    validationData[i - 50000] = [parseInt(feature1[i]), parseInt(feature2[i]), parseInt(feature3[i])];
    validationLabel[i - 50000] = parseInt(value[i]);
}

var trainDataTensor = tf.tensor(trainData);
var trainLabelTensor = tf.tensor(trainLabel);
var validationDataTensor = tf.tensor(validationData);
var validationLabelTensor = tf.tensor(validationLabel);

var X = tf.input({ shape: [json.unit[0]] });
var h1 = tf.layers.dense({ units: json.unit[1], activation: json.activation }).apply(X);
var h2 = tf.layers.dense({ units: json.unit[2], activation: json.activation }).apply(h1);
var Y = tf.layers.dense({ units: json.unit[3], activation: 'sigmoid' }).apply(h2);

var model = tf.model({ inputs: X, outputs: Y });

var compileParam = { optimizer: tf.train.adam(), loss: tf.losses.meanSquaredError };
model.compile(compileParam);

var history = [];

var fitParam = {
    epochs: json.epoch,
    callbacks: {
        onEpochEnd: function (epoch, logs) {
            console.log('epoch', epoch, logs, 'RMSE -> ', Math.sqrt(logs.loss));
            history.push(logs);
        },
    },
};

var goodNoLeakPwd = [];
var goodLeakPwd = [];

model.fit(trainDataTensor, trainLabelTensor, fitParam).then(async function (result) {
    var validationResult = model.predict(validationDataTensor);
    validationResult = Array.from(validationResult.dataSync());

    var validationAnswer = Array.from(validationLabelTensor.dataSync());

    var good = 0;
    var noGood = 0;

    var checkPoint = 0.5;

    for (let i = 0; i < validationResult.length; i++) {
        if ((validationResult[i] > checkPoint && validationAnswer[i] > checkPoint) || (validationResult[i] <= checkPoint && validationAnswer[i] <= checkPoint)) {
            good++;
        } else {
            noGood++;
        }
    }

    var accuracy = good / (good + noGood);
    console.log(`good: ${good}, noGood: ${noGood}`);
    console.log(`accuracy: ${accuracy}`);

    model.save('file://' + __dirname + '/../model/').then(async function () {
        console.log('Successfully saved the artifacts.');
    });
});
