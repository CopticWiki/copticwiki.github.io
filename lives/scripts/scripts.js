let copticText = document.querySelector("#coptic").innerHTML;
let regexParsing = new RegExp(/\[(.+?)\]/, "msg");
copticText = copticText.replace(regexParsing, "<span class=\"sentence\">$1<\/span>");
regexParsing = new RegExp(/_(.+?)_/, "msg");
copticText = copticText.replace(regexParsing, "<span class=\"group\">$1<\/span>");
document.querySelector("#coptic").innerHTML = copticText;