const fs = require('fs');

const levenshteinDistance = (orig, comp) => {
   if(orig.length == 0) return comp.length; 
   if(comp.length == 0) return orig.length; 
 
   var matrix = [];
 
   var i;
   for(i = 0; i <= comp.length; i++){
       matrix[i] = [i];
   }
 
   var j;
   for(j = 0; j <= orig.length; j++){
       matrix[0][j] = j;
   }
 
   // Fill in the rest of the matrix
   for(i = 1; i <= comp.length; i++){
       for(j = 1; j <= orig.length; j++){
           if(comp.charAt(i-1) == orig.charAt(j-1)){
               matrix[i][j] = matrix[i-1][j-1];
           } else {
               matrix[i][j] = Math.min(matrix[i-1][j-1] + 1, // substitution
               Math.min(matrix[i][j-1] + 1, // insertion
               matrix[i-1][j] + 1)); // deletion
           }
       }
   }

   return matrix[comp.length][orig.length];
}

const totalLVD = (text) => {
    var female = fs.readFileSync(__dirname + '/koreanZxcvbnString/files/femaleListToEng.txt', 'utf8');
    var male = fs.readFileSync(__dirname + '/koreanZxcvbnString/files/maleListToEng.txt', 'utf8');
    var word = fs.readFileSync(__dirname + '/koreanZxcvbnString/files/wordDataToEng.txt', 'utf8');
    
    female = female.split(',');
    male = male.split(',');
    word = word.split(',');
    
    var data = [];
    data = data.concat(female, male, word);

    var min = text.length;
    var temp = 0;

    for(let i = 0; i < data.length; i++) {
       temp = levenshteinDistance(text, data[i]);
       if(min > temp) {
           min = temp;
       }
    }

    return min;
}

exports.levenshteinDistance = levenshteinDistance;
exports.totalLVD = totalLVD;