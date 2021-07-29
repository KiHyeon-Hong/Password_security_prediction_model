String.prototype.strReverse = function() {
	var newstring = "";
	for (var s=0; s < this.length; s++) {
		newstring = this.charAt(s) + newstring;
	}
	return newstring;
};

function initPwdChk(restart) {
	/* Reset all form values to their default */
	var arrZeros = ["nLength","nAlphaUC","nAlphaLC","nNumber","nSymbol","nMidChar","nRequirements","nAlphasOnly","nNumbersOnly","nRepChar","nConsecAlphaUC","nConsecAlphaLC","nConsecNumber","nSeqAlpha","nSeqNumber","nSeqSymbol","nLengthBonus","nAlphaUCBonus","nAlphaLCBonus","nNumberBonus","nSymbolBonus","nMidCharBonus","nRequirementsBonus","nAlphasOnlyBonus","nNumbersOnlyBonus","nRepCharBonus","nConsecAlphaUCBonus","nConsecAlphaLCBonus","nConsecNumberBonus","nSeqAlphaBonus","nSeqNumberBonus","nSeqSymbolBonus"];
	var arrPassPars = ["nAlphasOnlyBonus","nNumbersOnlyBonus","nRepCharBonus","nConsecAlphaUCBonus","nConsecAlphaLCBonus","nConsecNumberBonus","nSeqAlphaBonus","nSeqNumberBonus","nSeqSymbolBonus"];
	var arrPassDivs = ["div_nAlphasOnly","div_nNumbersOnly","div_nRepChar","div_nConsecAlphaUC","div_nConsecAlphaLC","div_nConsecNumber","div_nSeqAlpha","div_nSeqNumber","div_nSeqSymbol"];
	var arrFailPars = ["nLengthBonus","nAlphaUCBonus","nAlphaLCBonus","nNumberBonus","nSymbolBonus","nMidCharBonus","nRequirementsBonus"];
	var arrFailDivs = ["div_nLength","div_nAlphaUC","div_nAlphaLC","div_nNumber","div_nSymbol","div_nMidChar","div_nRequirements"];
	for (var i in arrZeros) { $(arrZeros[i]).innerHTML = "0"; }
	for (var i in arrPassPars) { $(arrPassPars[i]).parentNode.className = "pass"; }
	for (var i in arrPassDivs) { $(arrPassDivs[i]).className = "pass"; }
	for (var i in arrFailPars) { $(arrFailPars[i]).parentNode.className = "fail"; }
	for (var i in arrFailDivs) { $(arrFailDivs[i]).className = "fail"; }
	$("passwordPwd").value = "";
	$("passwordTxt").value = "";
	$("scorebar").style.backgroundPosition = "0";
	if (restart) {
		$("passwordPwd").className = "";
		$("passwordTxt").className = "hide";
		$("mask").checked = true;
	}
}

function addLoadEvent(func) {
	var oldonload = window.onload;
	if (typeof window.onload != "function") {
		window.onload = func;
	}
	else {
		window.onload = function() {
			if (oldonload) {
				oldonload();
			}
			func();
		};
	}
}

// addLoadEvent(function() { initPwdChk(1); });


const ludsPoint = (pwd) => {
    var results = [];
    var json = {}; 

	var nScore=0, nLength=0, nAlphaUC=0, nAlphaLC=0, nNumber=0, nSymbol=0, nMidChar=0, nRequirements=0, nAlphasOnly=0, nNumbersOnly=0, nUnqChar=0, nRepChar=0, nRepInc=0, nConsecAlphaUC=0, nConsecAlphaLC=0, nConsecNumber=0, nConsecSymbol=0, nConsecCharType=0, nSeqAlpha=0, nSeqNumber=0, nSeqSymbol=0, nSeqChar=0, nReqChar=0, nMultConsecCharType=0;
	var nMultRepChar=1, nMultConsecSymbol=1;
	var nMultMidChar=2, nMultRequirements=2, nMultConsecAlphaUC=2, nMultConsecAlphaLC=2, nMultConsecNumber=2;
	var nReqCharType=3, nMultAlphaUC=3, nMultAlphaLC=3, nMultSeqAlpha=3, nMultSeqNumber=3, nMultSeqSymbol=3;
	var nMultLength=4, nMultNumber=4;
	var nMultSymbol=6;
	var nTmpAlphaUC="", nTmpAlphaLC="", nTmpNumber="", nTmpSymbol="";
	var sAlphaUC="0", sAlphaLC="0", sNumber="0", sSymbol="0", sMidChar="0", sRequirements="0", sAlphasOnly="0", sNumbersOnly="0", sRepChar="0", sConsecAlphaUC="0", sConsecAlphaLC="0", sConsecNumber="0", sSeqAlpha="0", sSeqNumber="0", sSeqSymbol="0";
	var sAlphas = "abcdefghijklmnopqrstuvwxyz";
	var sNumerics = "01234567890";
	var sSymbols = ")!@#$%^&*()";
	var sComplexity = "Too Short";
	var sStandards = "Below";
	var nMinPwdLen = 8;

	if (pwd) {
		nScore = parseInt(pwd.length * nMultLength);
		nLength = pwd.length;
		var arrPwd = pwd.replace(/\s+/g,"").split(/\s*/);
		var arrPwdLen = arrPwd.length;

		for (var a=0; a < arrPwdLen; a++) {
			if (arrPwd[a].match(/[A-Z]/g)) {
				if (nTmpAlphaUC !== "") { if ((nTmpAlphaUC + 1) == a) { nConsecAlphaUC++; nConsecCharType++; } }
				nTmpAlphaUC = a;
				nAlphaUC++;
			}
			else if (arrPwd[a].match(/[a-z]/g)) { 
				if (nTmpAlphaLC !== "") { if ((nTmpAlphaLC + 1) == a) { nConsecAlphaLC++; nConsecCharType++; } }
				nTmpAlphaLC = a;
				nAlphaLC++;
			}
			else if (arrPwd[a].match(/[0-9]/g)) { 
				if (a > 0 && a < (arrPwdLen - 1)) { nMidChar++; }
				if (nTmpNumber !== "") { if ((nTmpNumber + 1) == a) { nConsecNumber++; nConsecCharType++; } }
				nTmpNumber = a;
				nNumber++;
			}
			else if (arrPwd[a].match(/[^a-zA-Z0-9_]/g)) { 
				if (a > 0 && a < (arrPwdLen - 1)) { nMidChar++; }
				if (nTmpSymbol !== "") { if ((nTmpSymbol + 1) == a) { nConsecSymbol++; nConsecCharType++; } }
				nTmpSymbol = a;
				nSymbol++;
			}
			var bCharExists = false;
			for (var b=0; b < arrPwdLen; b++) {
				if (arrPwd[a] == arrPwd[b] && a != b) { /* repeat character exists */
					bCharExists = true;

					nRepInc += Math.abs(arrPwdLen/(b-a));
				}
			}
			if (bCharExists) { 
				nRepChar++; 
				nUnqChar = arrPwdLen-nRepChar;
				nRepInc = (nUnqChar) ? Math.ceil(nRepInc/nUnqChar) : Math.ceil(nRepInc); 
			}
		}
		
		for (var s=0; s < 23; s++) {
            var sFwd = sAlphas.substring(s,parseInt(s+3));
            var sRev = sFwd.strReverse();
            // var sRev = sFwd.splite(',').reverse().join(',');
			if (pwd.toLowerCase().indexOf(sFwd) != -1 || pwd.toLowerCase().indexOf(sRev) != -1) { nSeqAlpha++; nSeqChar++;}
		}
		
		for (var s=0; s < 8; s++) {
			var sFwd = sNumerics.substring(s,parseInt(s+3));
			var sRev = sFwd.strReverse();
			if (pwd.toLowerCase().indexOf(sFwd) != -1 || pwd.toLowerCase().indexOf(sRev) != -1) { nSeqNumber++; nSeqChar++;}
		}

		for (var s=0; s < 8; s++) {
			var sFwd = sSymbols.substring(s,parseInt(s+3));
			var sRev = sFwd.strReverse();
			if (pwd.toLowerCase().indexOf(sFwd) != -1 || pwd.toLowerCase().indexOf(sRev) != -1) { nSeqSymbol++; nSeqChar++;}
		}

        results[0] = nScore;
        // console.log('0 : ' + nScore);
        json.nLength = nScore;


		if (nAlphaUC > 0 && nAlphaUC < nLength) {	
			nScore = parseInt(nScore + ((nLength - nAlphaUC) * 2));
            sAlphaUC = "+ " + parseInt((nLength - nAlphaUC) * 2);

            results[1] = parseInt((nLength - nAlphaUC) * 2);
            // console.log('1 : ' + parseInt((nLength - nAlphaUC) * 2));
            json.nAlphaUC = parseInt((nLength - nAlphaUC) * 2);
		}
		if (nAlphaLC > 0 && nAlphaLC < nLength) {	
			nScore = parseInt(nScore + ((nLength - nAlphaLC) * 2)); 
            sAlphaLC = "+ " + parseInt((nLength - nAlphaLC) * 2);

            results[2] = parseInt((nLength - nAlphaLC) * 2);
            // console.log('2 : ' + parseInt((nLength - nAlphaLC) * 2));
            json.nAlphaLC = parseInt((nLength - nAlphaLC) * 2);
		}
		if (nNumber > 0 && nNumber < nLength) {	
			nScore = parseInt(nScore + (nNumber * nMultNumber));
            sNumber = "+ " + parseInt(nNumber * nMultNumber);
            
            results[3] = parseInt(nNumber * nMultNumber);
            // console.log('3 : ' + parseInt(nNumber * nMultNumber));
            json.nNumber = parseInt(nNumber * nMultNumber);
		}
		if (nSymbol > 0) {	
			nScore = parseInt(nScore + (nSymbol * nMultSymbol));
            sSymbol = "+ " + parseInt(nSymbol * nMultSymbol);
            
            results[4] = parseInt(nSymbol * nMultSymbol);
            // console.log('4 : ' + parseInt(nSymbol * nMultSymbol));
            json.nSymbol = parseInt(nSymbol * nMultSymbol);

		}
		if (nMidChar > 0) {	
			nScore = parseInt(nScore + (nMidChar * nMultMidChar));
            sMidChar = "+ " + parseInt(nMidChar * nMultMidChar);
            
            // console.log('5 : ' + parseInt(nMidChar * nMultMidChar));
            json.nMidChar = parseInt(nMidChar * nMultMidChar);
		}

		if ((nAlphaLC > 0 || nAlphaUC > 0) && nSymbol === 0 && nNumber === 0) {  // Only Letters
			nScore = parseInt(nScore - nLength);
			nAlphasOnly = nLength;
            sAlphasOnly = "- " + nLength;
            
            // console.log('6 : ' + nLength);
            json.nAlphasOnly = nLength;
		}
		if (nAlphaLC === 0 && nAlphaUC === 0 && nSymbol === 0 && nNumber > 0) {  // Only Numbers
			nScore = parseInt(nScore - nLength); 
			nNumbersOnly = nLength;
            sNumbersOnly = "- " + nLength;
            
            // console.log('7 : ' + nLength);
            json.nNumbersOnly = nLength;
		}
		if (nRepChar > 0) {
			nScore = parseInt(nScore - nRepInc);
            sRepChar = "- " + nRepInc;
            
            // console.log('8 : ' + nRepInc);
            json.nRepChar = nRepInc;
		}
		if (nConsecAlphaUC > 0) {  // Consecutive Uppercase Letters exist
			nScore = parseInt(nScore - (nConsecAlphaUC * nMultConsecAlphaUC)); 
            sConsecAlphaUC = "- " + parseInt(nConsecAlphaUC * nMultConsecAlphaUC);
            
            // console.log('8 : ' + parseInt(nConsecAlphaUC * nMultConsecAlphaUC));
            json.nConsecAlphaUC = parseInt(nConsecAlphaUC * nMultConsecAlphaUC);
		}
		if (nConsecAlphaLC > 0) {  // Consecutive Lowercase Letters exist
			nScore = parseInt(nScore - (nConsecAlphaLC * nMultConsecAlphaLC)); 
            sConsecAlphaLC = "- " + parseInt(nConsecAlphaLC * nMultConsecAlphaLC);
            
            // console.log('9 : ' + parseInt(nConsecAlphaLC * nMultConsecAlphaLC));
            json.nConsecAlphaLC = parseInt(nConsecAlphaLC * nMultConsecAlphaLC);
		}
		if (nConsecNumber > 0) {  // Consecutive Numbers exist
			nScore = parseInt(nScore - (nConsecNumber * nMultConsecNumber));  
            sConsecNumber = "- " + parseInt(nConsecNumber * nMultConsecNumber);
            
            // console.log('10 : ' + parseInt(nConsecNumber * nMultConsecNumber));
            json.nConsecNumber = parseInt(nConsecNumber * nMultConsecNumber);
		}
		if (nSeqAlpha > 0) {  // Sequential alpha strings exist (3 characters or more)
			nScore = parseInt(nScore - (nSeqAlpha * nMultSeqAlpha)); 
            sSeqAlpha = "- " + parseInt(nSeqAlpha * nMultSeqAlpha);
            
            // console.log('11 : ' + parseInt(nSeqAlpha * nMultSeqAlpha));
            json.nSeqAlpha = parseInt(nSeqAlpha * nMultSeqAlpha);
		}
		if (nSeqNumber > 0) {  // Sequential numeric strings exist (3 characters or more)
			nScore = parseInt(nScore - (nSeqNumber * nMultSeqNumber)); 
            sSeqNumber = "- " + parseInt(nSeqNumber * nMultSeqNumber);
            
            // console.log('11 : ' + parseInt(nSeqNumber * nMultSeqNumber));
            json.nSeqNumber = parseInt(nSeqNumber * nMultSeqNumber);
		}
		if (nSeqSymbol > 0) {  // Sequential symbol strings exist (3 characters or more)
			nScore = parseInt(nScore - (nSeqSymbol * nMultSeqSymbol)); 
            sSeqSymbol = "- " + parseInt(nSeqSymbol * nMultSeqSymbol);
            
            // console.log('11 : ' + parseInt(nSeqSymbol * nMultSeqSymbol));
            json.nSeqSymbol = parseInt(nSeqSymbol * nMultSeqSymbol);
		}

		var arrChars = [nLength,nAlphaUC,nAlphaLC,nNumber,nSymbol];
		var arrCharsIds = ["nLength","nAlphaUC","nAlphaLC","nNumber","nSymbol"];
		var arrCharsLen = arrChars.length;

        for (var c=0; c < arrCharsLen; c++) {
            if (arrCharsIds[c] == "nLength") {
                var minVal = parseInt(nMinPwdLen - 1);
            }
            else {
                var minVal = 0;
            }
    
            if (arrChars[c] == parseInt(minVal + 1)) {
                nReqChar++;

            }
            else if (arrChars[c] > parseInt(minVal + 1)) {
                nReqChar++;

            }
            else {

            }    
        }
    
        
        nRequirements = nReqChar;
        
		if (pwd.length >= nMinPwdLen) { var nMinReqChars = 3; } else { var nMinReqChars = 4; }
		if (nRequirements > nMinReqChars) {  // One or more required characters exist
			nScore = parseInt(nScore + (nRequirements * 2)); 
			sRequirements = "+ " + parseInt(nRequirements * 2);
		};

        // console.log('??? : ' + sRequirements.replace('+', '').replace(' ', ''));
        json.nRequirements = parseInt(sRequirements.replace('+', '').replace(' ', ''));

		/* Determine if additional bonuses need to be applied and set image indicators accordingly */
		var arrChars = [nMidChar,nRequirements];
		var arrCharsIds = ["nMidChar","nRequirements"];
		var arrCharsLen = arrChars.length;

		var arrChars = [nAlphasOnly,nNumbersOnly,nRepChar,nConsecAlphaUC,nConsecAlphaLC,nConsecNumber,nSeqAlpha,nSeqNumber,nSeqSymbol];
		var arrCharsIds = ["nAlphasOnly","nNumbersOnly","nRepChar","nConsecAlphaUC","nConsecAlphaLC","nConsecNumber","nSeqAlpha","nSeqNumber","nSeqSymbol"];
		var arrCharsLen = arrChars.length;
        
        // 판단 기준
		if (nScore > 100) { nScore = 100; } else if (nScore < 0) { nScore = 0; }
		if (nScore >= 0 && nScore < 20) { sComplexity = "Very Weak"; }
		else if (nScore >= 20 && nScore < 40) { sComplexity = "Weak"; }
		else if (nScore >= 40 && nScore < 60) { sComplexity = "Good"; }
		else if (nScore >= 60 && nScore < 80) { sComplexity = "Strong"; }
		else if (nScore >= 80 && nScore <= 100) { sComplexity = "Very Strong"; }
	}
	else {
		initPwdChk();
		oScore.innerHTML = nScore + "%";
		oComplexity.innerHTML = sComplexity;
    }
    // console.log('nScore : ' + nScore);
    json.nScore = nScore;

    // console.log('sComplexity : ' + sComplexity);
    json.sComplexity = sComplexity;

    return json;
}

exports.ludsPoint = ludsPoint;

//http://www.passwordmeter.com/

/*
    Number of Characters : 문자 수, +(n*4)
    Uppercase Letters : 대문자 수, +((len-n)*2)
    Lowercase Letters : 소문자 수, +((len-n)*2)	
    Numbers : 숫자 수(숫자만 있을 때는 0점 뭔가 들어가면 제대로 올라감), +(n*4)
    Symbols : 문자 수(문자만 있어도 올라감), +(n*6)
    Middle Numbers or Symbols : 가운데에 숫자나 문자 들어감(앞뒤 제외), +(n*2)
    Requirements : ???
    
    Letters Only : 대소문자만 있음(숫자, 문자 들어가면 0), -n
    Numbers Only : 숫자만 있음(대소문자, 문자 들어가면 0), -n
    Repeat Characters (Case Insensitive) : 같은 대소문자나 숫자나 문자가 포함(2개 이상, 대소문자 구분안함), 식 매우 어렵
    Consecutive Uppercase Letters : 대문자가 연속해서 이어짐, -(n*2)
    Consecutive Lowercase Letters : 소문자가 연속해서 이어짐, -(n*2)
    Consecutive Numbers : 숫자가 연속해서 이어짐, -(n*2)
    Sequential Letters (3+) : 연속된 패턴이 3개이상 지속됨(3개부터 1개 늘어날 때마다 -3씩 추가됨), -(n*3)
    Sequential Numbers (3+) : 연속된 패턴이 3개이상 지속됨, -(n*3)
    Sequential Symbols (3+) : 연속된 패턴이 3개이상 지속됨(키보드상에서 연속), -(n*3)
*/

