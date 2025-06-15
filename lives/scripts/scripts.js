let copticText = document.querySelector("#coptic").innerHTML;
let englishText = document.querySelector("#translation").innerHTML;
let regexParsing = new RegExp(/\[(.+?)\]/, "msg");
copticText = copticText.replace(regexParsing, "<span class=\"sentence\">$1<\/span>");
englishText = englishText.replace(regexParsing, "<span class=\"sentence\">$1<\/span>");
regexParsing = new RegExp(/_(.+?)_/, "msg");
copticText = copticText.replace(regexParsing, "<span class=\"group\">$1<\/span>");
document.querySelector("#coptic").innerHTML = copticText;
document.querySelector("#translation").innerHTML = englishText;
let sentencesCoptic = document.querySelectorAll("#coptic .sentence");
let sentencesEnglish = document.querySelectorAll("#translation .sentence");
sentencesCoptic.forEach((x, i) => {
	let zero = "0";
	let num = i + 1;
	newNum = "0" + num;
	if (i < 9) {
		newNum = "00" + num;
	}
	x.setAttribute("data-number", newNum);
});
sentencesEnglish.forEach((x, i) => {
	let zero = "0";
	let num = i + 1;
	newNum = "0" + num;
	if (i < 9) {
		newNum = "00" + num;
	}
	x.setAttribute("data-number", newNum);
});