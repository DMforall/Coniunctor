// global variables

var decOrder = 1; //nom,gen,dat,acc,abl,voc: Standard American case order
//var decOrder = 2; //nom,acc,gen,dat,abl,voc: European order 
//var decOrder = 3; //nom,voc,acc,gen,dat,abl: Danish order

const fem = 1;
const masc = 2;
const comm = 3; //m./f.
const neut = 4;

//all declension endings
var dec = [
	["a", "ae", "ae", "am", "ā", "a", "ae", "ārum", "īs", "ās", "īs", "ae"], //0
	["ius", "ī", "ō", "um", "ō", "ī", "ī", "ōrum", "īs", "ōs", "īs", "ī"],
	["us", "ī", "ō", "um", "ō", "e",	 "ī", "ōrum", "īs", "ōs", "īs", "ī"],
	["r", "ī", "ō", "um", "ō", "r", "ī", "ōrum", "īs", "ōs", "īs", "ī"],
	["um", "ī", "ō", "um", "ō", "um", "a", "ōrum", "īs", "a", "īs", "a"],
	["*", "is", "ī", "em", "e", "*",	 "ēs", "um", "ibus", "ēs", "ibus", "ēs"], //5
	["*", "is", "ī", "*", "e", "*", "a", "um", "ibus", "a", "ibus", "a"],
	["*", "is", "ī", "em", "e", "*",	 "ēs", "ium", "ibus", "ēs", "ibus", "ēs"],
	["*", "is", "ī", "*", "ī", "*", "ia", "ium", "ibus", "ia", "ibus", "ia"],
	["us", "ūs", "uī", "um", "ū", "us", "ūs", "uum", "ibus", "ūs", "ibus", "ūs"],
	["ū", "ūs", "ū", "ū", "ū", "ū", "ua", "uum", "ibus", "ua", "ibus", "ua"], //10
	["ēs", "ēī", "ēī", "em", "ē", "ēs", "ēs", "ērum", "ēbus", "ēs", "ēbus", "ēs"],
	["ēs", "eī", "eī", "em", "ē", "ēs", "ēs", "ērum", "ēbus", "ēs", "ēbus", "ēs"],
	["*", "is", "ī", "em", "ī", "*",	 "ēs", "ium", "ibus", "īs", "ibus", "ēs"],
	["*", "is", "ī", "im", "ī", "*",	 "ēs", "ium", "ibus", "īs", "ibus", "ēs"],
	["*", "is", "ī", "im", "ī", "*",	 "īs", "ium", "ibus", "īs", "ibus", "ēs"], //15
	//["vīs", "", "", "vim", "vī", "vīs", "vīrēs", "vīrium", "vīribus", "vīrēs", "vīribus", "vīrēs"],
	//["ās", "ae", "ae", "am", "ā", "ā", "ae", "ārum", "īs", "ās", "īs", "ae"],
	//["ās", "ae", "ae", "an", "ā", "ā", "ae", "ārum", "īs", "ās", "īs", "ae"],
	//["ē", "ēs", "ae", "ēn", "ē", "ē", "ae", "ārum", "īs", "ās", "īs", "ae"],
	//["ēs", "ēs", "ae", "ēn", "ē", "ē", "ae", "ārum", "īs", "ās", "īs", "ae"],
];

var decNames = [
	["1st m./f.", 0],
	["2nd -ius m./f.", 1],
	["2nd -us m./f.", 2],
	["2nd -r m./f.", 3],
	["2nd n.", 4],
	["3rd m./f.", 5],
	["3rd n.", 6],
	["3rd m./f. i-stem", 7],
	["3rd n. i-stem", 8],
	["4th m./f.", 9],
	["4th n.", 10],
	["5th -iēs m./f.", 11],
	["5th -ēs m./f. (consonant stem)", 12]//,
	//["3rd m./f. i-stem except nom. pl.", 13],
	//["3rd m./f. full i-stem", 14],
	//["vīs defective 3rd dec.", 15],
	//,
];


function loadSel() {
  	var x = document.getElementById("mySelect");
	alert(1);
	for (var i = 0; i < decNames.length; i++) {
  		var option = document.createElement("option");
  		option.text = decNames[i][0];
		option.value = decNames[i][1];
  		x.add(option);
	}
}

function showSel() {
	var sel = document.getElementById("mySelect");
	//var val = sel.options[sel.selectedIndex].value; //longer way
	//var val = sel.value; //shorter way
	var val = sel.options[sel.selectedIndex].text; //longer way required for text
	document.getElementById("t13").innerHTML = val + " selected!";
}

HTMLTextAreaElement.prototype.insertAtCaret = function (text) {
  	text = text || '';
  	if (document.selection) {
    	// IE
    	this.focus();
    	var sel = document.selection.createRange();
    	sel.text = text;
  	} 
	else if (this.selectionStart || this.selectionStart === 0) {
  		// Others
    	var startPos = this.selectionStart;
    	var endPos = this.selectionEnd;
    	this.value = this.value.substring(0, startPos) + text + 
			this.value.substring(endPos, this.value.length);
    	this.selectionStart = startPos + text.length;
    	this.selectionEnd = startPos + text.length;
  	} 
	else {
    	this.value += text;
  	}
}

function pressMe(myVow){
	document.getElementById("lemma").insertAtCaret(myVow);
}

//Link to full discussion of i-stem variations
var iStemSummary = "http://dcc.dickinson.edu/grammar/latin/3rd-declension-summary-i-stem-forms";

function isIstem(nomin, genit, gend) {	//make code to replace ash, v/u, j/i temporarily to check spellings 
	var notIstems = [ ["canis", "canis", 3], ["iuuenis", "iuuenis", 2], 
		["uolucris", "uolucris", 1], ["sēdēs", "sēdis", 1] ];

	var strongIstems = [ ["turris", "turris", 1], ];

	if (gend == 4 ) { //check for possible neuter cases
		if ( (nomin.endsWith("al") && genit.endsWith("lis")) ||
			(nomin.endsWith("ar") && genit.endsWith("ris")) ||
			(nomin.endsWith("re") && genit.endsWith("ris")) ) {
			return 1;
		}
		else {
			return 0;
		}
	}
	return 0;
}

function selDec(copyType) {
	var copyText, temp;
	if (copyType == 1) {
		copyText = document.getElementById("decTab").innerText;  
	}
	else if (copyType == 2 ) {
		copyText = document.getElementById("myTab").innerHTML;
	}
	else { //format for monospace text display since otherwise the table won't line up elsewhere
		temp = document.getElementById("th1").innerText;
		copyText = " ".repeat(21 - temp.length) + temp;
		temp = document.getElementById("th2").innerText;
		copyText += " ".repeat(23 - temp.length) + temp + "\n\r";
		for (var i = 0;i < 6;i++) {
			temp = document.getElementById("tr"+(i+1)).innerText;
			copyText += temp + " ".repeat(13 - temp.length);
			temp = document.getElementById("t"+(i+1)).innerText;
			copyText += temp + " ".repeat(25 - temp.length);
			temp = document.getElementById("t"+(i+7)).innerText;
			copyText += temp + " ".repeat(25 - temp.length);
			copyText += "\n\r";
		}
	}
	var invis = document.getElementById("invis");
	alert(copyText);
	invis.style.display = ""; //make it visible
   invis.value = copyText;
	invis.focus;
   invis.setSelectionRange(0, copyText.length);
   document.execCommand("copy");
	invis.style.display = "none"; //make it invisible
}

function decline(nomin, genit, gend) {
	var chart = [nomin, "", "", "", "", "", "", "", "", "", "", ""];
	var stem = "";
	var i;
	var decType;
	var decMessage = document.getElementById("t13");

	var sel = document.getElementById("mySelect");
	//var val = sel.options[sel.selectedIndex].value; //longer way
	var val = sel.value; //shorter way, grabs user selected declension
	
	
	if ( (val > -1) && (val < decNames.length) ) {
	 	decMessage.innerHTML = "Declined as selected, " +decNames[val][0] + "!";
	}
	//all good above

	if (val == -1) { //let's autodetect the declension type!
		if (genit.endsWith("ae")) {   //1st m./f.
			val = 0;
		}
		else if ( genit.endsWith("ī") && !(nomin.endsWith("ēs")) ) {  //2nd, not 5th
			if ( (gend < neut) ){ //m./f. cases
				if	(nomin.endsWith("ius") && genit.endsWith("iī") ) {
					val = 1;
				}
				else if (nomin.endsWith("us")) {
					val = 2;
				}
				else if (nomin.endsWith("r")) {
					val = 3;
				}
			}
			else if ( nomin.endsWith("us") || nomin.endsWith("r") || nomin.endsWith("um") ){ //neuter
				val = 4;
			}			
		}
		else if ( genit.endsWith("is") ) {  //3rd 
			if (gend < neut) {   //m./f.
				val = 5;
			}
			else {    //neuter 
				val = 6;
			}
		}
		else if ( genit.endsWith("ūs") ) {  //4th
			if (nomin.endsWith("us") && gend < neut) {   //m./f.
				val = 9;
			}
			else if (nomin.endsWith("ū") && gend == neut) {    //neuter 
				val = 10;
			}
		}
		else if ( nomin.endsWith("ēs") ) {  //5th
			if (nomin.endsWith("iēs")) {
				val = 11; // i before stem
			}
			else {
				val = 12; //consonant before stem
			}
		}
		
		if ( (val > -1) && (val < decNames.length) ) {
			decMessage.innerHTML = "Declined as detected, "+decNames[val][0]+"!";
		}
		else {
			decMessage.innerHTML = "Autodetect failed to recognize the declension!"+
			" Check your spelling, long marks, and gender abbreviation!"+
			" Enter a lemma like 'manus, manūs f.' i.e. nominative, genitive gender";
			chart= ["na", "na", "na", "na", "na", "na", "na", "na", "na", "na", "na", "na"];
		}
	}
	
	
	//alert(val); 
	
	if (val == 0) {   //1st m./f.
		stem = genit.slice(0, -dec[val][1].length);
		for (i = 1; i < 12; i++) {
			chart[i] = stem + dec[val][i];
		}
		//decType = decNames[val][0];
	}
	else if (val == 1) {  //2nd m./f. -ius
		stem = genit.slice(0, -dec[val][1].length);
		for (i = 1; i < 12; i++) {
			if (i == 5) {
				chart[i] = stem.slice(0,stem.length-1) + dec[val][i]; //special case for -ius to -ī
			}
			else {
				chart[i] = stem + dec[val][i];
			}
		}
		//decType = decNames[val][0];
	}
	else if (val == 2) {  //2nd m./f. -us
		stem = genit.slice(0, -dec[val][1].length );
		for (i = 1; i < 12; i++) {
			chart[i] = stem + dec[val][i];
		}
		//decType = decNames[val][0];
	}
	else if (val == 3) {  //2nd -r
		stem = genit.slice(0, -dec[val][1].length );
		for (i = 1; i < 12; i++) {
			if (i == 5) {
				chart[i] = nomin;
			}
			else {
				chart[i] = stem + dec[val][i];
			}
		}
		//decType = decNames[val][1];
	}
	else if (val == 4) { // 2nd neuter 
		stem = genit.slice(0, -dec[val][1].length);
		for (i = 1; i < 12; i++) {					if (i == 5 || i == 3) {
				chart[i] = nomin;
			}		
			else {
				chart[i] = stem + dec[val][i];
			}
		}
		//decType = decNames[val][0];
	}
	else if (val == 5) {  //3rd common
		stem = genit.slice(0, -dec[val][1].length);
		for (i = 1; i < 12; i++) {
			if (i == 5) {
				chart[i] = nomin;
			}
			else {
				chart[i] = stem + dec[val][i];
			}
		}
		//decType = decNames[val][0];
	}	
	else if (val == 6) {    //3rd neuter 
		stem = genit.slice(0, -dec[val][1].length);
		for (i = 1; i < 12; i++) {					if (i == 5 || i == 3) {
				chart[i] = nomin;
			}		
			else {
				chart[i] = stem + dec[val][i];			}
		}
		//decType = decNames[val][0];
	}
	else if (val == 9) {  //4th common
		stem = genit.slice(0, -dec[val][1].length);
		for (i = 1; i < 12; i++) {
			if (i == 5) {
				chart[i] = nomin;
			}
			else {
				chart[i] = stem + dec[val][i];
			}
		}
		//decType = decNames[val][0];
	}
	else if (val == 10) {    //4th neuter 
		stem = genit.slice(0, -dec[val][1].length);
		for (i = 1; i < 12; i++) {	
			chart[i] = stem + dec[10][i];
		}
		//decType = decNames[val][0];
	}
	else if (val == 11) {    //5th -i- type
		stem = genit.slice(0, -dec[val][1].length);
		for (i = 1; i < 12; i++) {	
			chart[i] = stem + dec[val][i];
		}
		//decType = decNames[val][0];
	}	
	else if (val == 12) {    //5th consonant type
		stem = genit.slice(0, -dec[val][1].length);
		for (i = 1; i < 12; i++) {	
			chart[i] = stem + dec[val][i];
		}
		//decType = decNames[val][0];
	}	
	return chart;
}

function parseAdjLemma(){
	var mNmn, stm, type;
	var lemma = document.getElementById("lemma2").value + "  ";
	mNmn = stm = "";
	type = 0; //set to invalid, to return error if valid gender isn't found
	//parse out nominative from lemma
	if ( lemma.indexOf(",") > 1 ) {
		mNmn = lemma.slice(0, lemma.indexOf(","));
//		alert(mNmn);
		lemma = lemma.slice(lemma.indexOf(",")+1, lemma.length) //remove nominative and comma
		lemma = lemma.trim();
	}
	else {
		mNmn = "na";
	}
	//parse out next form from remainder
	if ( lemma.indexOf(",") > 1 ) {
		stm = lemma.slice(0, lemma.indexOf(","));
//		alert(stm);
		lemma = lemma.slice(lemma.indexOf(" ")+1, lemma.length); //remove feminine/genitive for stem
		lemma = lemma.trim();
	}
	else if ( lemma.indexOf(" ") > 1 ) {
		stm = lemma.slice(0, lemma.indexOf(" "));
//		alert(stm);
	}
	else {
		stm = lemma.trim();
	}
	//figure out type of adjective

	if ( mNmn.endsWith("us") && stm.endsWith("a") ) {
		stm = stm.slice(0, stm.length-1);
		type = 1;
	}
	else if ( mNmn.endsWith("r") && stm.endsWith("a") ) {
		stm = stm.slice(0, stm.length-1);
		type = 2;
	}
	else if ( mNmn.endsWith("is") && stm.endsWith("e") ) { //probably 2 termination
		stm = stm.slice(0, stm.length-1);
		type = 3;
	}
	else if ( stm.endsWith("is") && lemma.endsWith("e") ) { //probably 3 termination
		stm = stm.slice(0, stm.length-2);
		type = 3.1;
	}
	else if ( stm.endsWith("is") ) { //probably 1 termination
		stm = stm.slice(0, stm.length-2);
		type = 3.2;
	}
	else {
		mNmn = stm = "na";
		type = 0; //error
	}	
//	alert("parse: " + mNmn + " " + stm + " " + type); 
	return [mNmn, stm, type];	 //return parsed parts of lemma 
	
}

function retSpc(num) {
	return "&nbps;".repeat(num);
}

function decAdjAndAdd(chart, nounGnd) {
	var mNmn, stm, type, parsed;
	parsed =	parseAdjLemma();
	mNmn = parsed[0];
	stm = parsed[1];
	type = parsed[2];
	alert(parsed);
	if (chart.length < 12 || type == 0) {
		alert(1);
		return chart;
	}
	if ( (nounGnd == 2 || nounGnd == 3) && type == 1) {
		for (var i = 0; i < 12; i++) {
			chart[i] = chart[i] + " " + stm + dec[2][i]; //masculine
		}
	}
	else if ( (nounGnd == 2 || nounGnd == 3) && type == 2) {
		for (var i = 0; i < 12; i++) {
			if (i == 0 || i == 5) {
				chart[i] = chart[i] + " " + mNmn; //-r nom. & voc. sing.
			}
			else {	
				chart[i] = chart[i] + " " + stm + dec[2][i]; //masculine
			}
		}
	}
	else if ( nounGnd == 1 && type <= 2) {
		for (var i = 0; i < 12; i++) {
			chart[i] = chart[i] + " " + stm + dec[0][i]; //feminine
		}
	}
	else if ( ( nounGnd == 1 || nounGnd == 2 ) && type == 3) {
		for (var i = 0; i < 12; i++) {
			if ( (i == 0 || i == 5) || (nounGnd == 4 && i == 3) )  {
				chart[i] = chart[i] + " " + mNmn;
			}
			else {
				chart[i] = chart[i] + " " + stm + dec[13][i]; 
			}
		}
	}
	else if (nounGnd == 4 && (type == 3 || type == 3.1) ) {
		for (var i = 0; i < 12; i++) {
			if ( (i == 0 || i == 3 || i == 5) )  {
				chart[i] = chart[i] + " " + stm + "e";
			}
			else {
				chart[i] = chart[i] + " " + stm + dec[8][i]; 
			}
		}
	}

	return chart;
}


function parseLemma(){
	var nmn, gnv, gnd;
	var lemma = document.getElementById("lemma").value + "  ";
	nmn = gnv = "";
	gnd = 0; //set to invalid, to return error if valid gender isn't found
	//parse out nominative from lemma
	if ( lemma.indexOf(",") > 1 ) {
		nmn = lemma.slice(0, lemma.indexOf(","));
		lemma = lemma.slice(lemma.indexOf(",")+1, lemma.length) //remove nominative and comma
		lemma = lemma.trim();
	}
	else {
		nmn = "na";
	}
	//parse out genitive from remainder
	if ( lemma.indexOf(" ") > 1 ) {
		gnv = lemma.slice(0, lemma.indexOf(" "));
		lemma = lemma.slice(lemma.indexOf(" ")+1, lemma.length) //remove genitive
		lemma = lemma.trim();
	}
	else {
		gnv = "na";
	}
	//parse out gender from remainder
	if ( lemma.includes("fem") || lemma.includes("f") ) {
		gnd = 1;
	}
	else if ( lemma.includes("masc") || lemma.includes("m") ) {
		gnd = 2;
	}
	else if ( lemma.includes("comm") || lemma.includes("c") ) {
		gnd = 3;
	}
	else if ( lemma.includes("neut") || lemma.includes("n") ) {
		gnd = 4;
	}
	return [nmn, gnv, gnd];	 //return parsed parts of lemma 
}

function retSpc(num) {
	return "&nbps;".repeat(num);
}

function displayChart( chart ) {
	var order = [0, 1, 2, 3, 4, 5]; //regular American case order
	if (decOrder == 2) order = [0, 3, 1, 2, 4, 5] //nom,acc,gen,dat,abl,voc European order 
	if (decOrder == 3) order = [0, 5, 3, 1, 2, 4] //nom,voc,acc,gen,dat,abl Danish order

	var cases = ["Nominative", "Genitive", "Dative", "Accusative", "Ablative", "Vocative"];
	//var cases = ["N", "G", "D", "Ac", "Ab", "V"]; //abbreviated case names

	var dT = document.getElementById("decTab");
	for (var i = 0; i < 6; i++) {
		dT.rows[i+1].cells[0].innerHTML = cases[order[i]];
  		dT.rows[i+1].cells[1].innerHTML = chart[order[i]];
		dT.rows[i+1].cells[2].innerHTML = chart[order[i]+6];
	}

}

function decIt() {
	var aLemma = ["na", "na", 0]; //initialize aLemma as invalid type
	var chart = "";
	aLemma = parseLemma();
	chart = decline(aLemma[0], aLemma[1], aLemma[2]); //nominative, genitive, gender
	chart = decAdjAndAdd(chart, aLemma[2]); //noun chart and gender
	displayChart(chart);
	//alert("I-stem test: " + isIstem(aLemma[0], aLemma[1], aLemma[2]));
}


var iStemDesc = 
"73. The i-declension was confused even to the Romans themselves, nor was it\
 stable at all periods of the language, early Latin having i-forms which afterwards disappeared.\
 There was a tendency in nouns to lose the i-forms, in adjectives to gain them. The nominative\
 plural (-īs)1 was most thoroughly lost, next the accusative singular (-im), next the ablative\
 (-ī); while the genitive and accusative plural (-ium, -īs) were retained in almost all.\
<br><br>74. I-stems show the i of the stem in the following forms:<br><br>\
&nbsp;a. They have the genitive plural in -ium (but some monosyllables lack it entirely). For a few\
 exceptions, see § 78 below.<br>\
&nbsp;b. All neuters have the nominative and accusative plural in -ia.<br>\
&nbsp;c. The accusative plural (m. or f.) is regularly -īs.<br>\
&nbsp;d. The accusative singular (m. or f.) of a few ends in -im (§ 75 below).<br>\
&nbsp;e. The ablative singular of all neuters, and of many masculines and feminines, ends in -\
ī.<br><br>\
75. The regular case-ending of the accusative singular of i-stems (m. or f.) would be -im.<br>\
&nbsp;&nbsp;sitis, sitim (cf. stella, -am; servus, -um)<br>\
But, in most nouns this is changed to -em (following the consonant declension).<br><br>\
&nbsp;a. The accusative in -im is found exclusively—<br>\
&nbsp;&nbsp;1. In Greek nouns and in names of rivers.<br>\
&nbsp;&nbsp;2. In būris, cucumis, rāvis, sitis, tussis, vīs.<br>\
&nbsp;&nbsp;3. In adverbs in -tim (being accusative of nouns in -tis), as, partim; and in amussim.\
<br>&nbsp;b. The accusative in -im is found sometimes in febris, puppis, restis, turris, secūris,\
 sēmentis, and rarely in many other words.<br><br>\
76. The regular form of the ablative singular of i-stems would be -ī.<br>\
&nbsp;&nbsp;sitis, sitī<br>\
But, in most nouns this is changed to -e.<br><br>\
&nbsp;a. The Ablative in -ī is found exclusively—<br>\
&nbsp;&nbsp;1. In nouns having the Accusative in -im (§ 75 above); also secūris.<br>\
&nbsp;&nbsp;2. In the following adjectives used as nouns.<br>\
&nbsp;&nbsp;aequālis, annālis, aquālis, cōnsulāris, gentīlis, molāris, prīmipīlāris, tribūlis<br>\
&nbsp;&nbsp;3. In neuters in -e, -al, -ar except: baccar, iubar, rēte, and sometimes mare.<br>\
&nbsp;b. The Ablative in -ī is found sometimes—<br>\
&nbsp;&nbsp;1. In avis, clāvis, febris, fīnis, īgnis,(1.) imber, lūx, nāvis, ovis, pelvis, puppis,\
 sēmentis, strigilis, turris, and occasionally in other words.<br>\
&nbsp;&nbsp;2. In the following adjectives used as nouns.<br>\
&nbsp;&nbsp;affīnis, bipennis, canālis, familiāris, nātālis, rīvālis, sapiēns, tridēns, trirēmis,\
 vōcālis<br><br>\
Note 1— The ablative of famēs is always famē （§ 105.e). The defective māne has sometimes mānī\
 (§ 103.b Note) as ablative.<br><br>\
Note 2— Most names of towns in -e (as, Praeneste, Tergeste） and Sōracte, a mountain, have the\
 ablative in -e. Caere has Caerēte.<br><br>\
Note 3— Canis and iuvenis have cane, iuvene.<br><br>\
77. The regular nominative plural of i-stems is -ēs,1 but -īs is occasionally found. The regular\
 accusative plural -īs is common, but not exclusively used in any word. An old form for both cases\
 is -eis (diphthong).<br><br>\
78. The following have -um (not -ium) in the genitive plural.<br><br>\
Always— canis, iuvenis,(2.) ambāgēs, mare (once only, otherwise wanting), volucris<br>\
Regularly— sēdēs, vātēs<br>\
Sometimes— apis, caedēs, clādēs, mēnsis, struēs, subolēs<br>\
Very rarely— patrials in -ās, -ātis; -īs, -ītis<br>\
Arpīnās, Arpīnātum, Samnīs, Samnītum<br><br><br>\
FOOTNOTES<br><br>\
(1.) The Indo-European ending of the Nominative plural, -ĕs (preserved in Greek in consonant stems,\
 as ὄρτυξ, ὄρτυγ-ες), contracts with a stem-vowel and gives -ēs in the Latin i-declension (cf, the\
 Greek plural ὄεις ). This -ēs was extended to consonant stems in Latin.<br>\
(2.) Canis and iuvenis are really n-stems.";

function showDeclensionInfo(type){
	if (type == 1) {
		document.getElementById("info").innerHTML = iStemDesc;
	}
}
showDeclensionInfo(1);




