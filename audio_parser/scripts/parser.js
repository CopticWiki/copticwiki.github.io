import morphemeList from "./silvanus.js";
console.log(morphemeList);
let myAudio = document.querySelector("audio");
let i = 0;
let j = 0;
let k = 0;
for (i = 0; i < morphemeList.length; i++) {
	
	// li for each line
	let newLine = document.createElement("li");
	newLine.classList.add("line");
	document.querySelector("#interlinear").appendChild(newLine);
	
	// ul for each sub-line
	let newSubLine = document.createElement("ul");
	newSubLine.classList.add("sub-line");
	document.getElementsByClassName("line")[i].appendChild(newSubLine);
	
	// li for each whole-morpheme
	let newWholeMorpheme = document.createElement("li");
	newWholeMorpheme.classList.add("whole-morpheme");
	document.getElementsByClassName("line")[i].getElementsByClassName("sub-line")[0].appendChild(newWholeMorpheme);
	
	// li for each whole-gloss
	let newWholeGloss = document.createElement("li");
	newWholeGloss.classList.add("whole-gloss");
	document.getElementsByClassName("line")[i].getElementsByClassName("sub-line")[0].appendChild(newWholeGloss);
	
	for (j = 0; j < morphemeList[i][0].length; j++) {
		console.log(morphemeList[i][0].length);
		let newGroup = document.createElement("div");
		newGroup.classList.add("group");
		document.getElementsByClassName("line")[i].getElementsByClassName("sub-line")[0].getElementsByClassName("whole-morpheme")[0].appendChild(newGroup);
	}
}
const timestamps = document.getElementsByClassName("morpheme");
myAudio.addEventListener("timeupdate", () => {
	for (i = 0; i < timestamps.length; i++) {
		timestamps[i].getElementsByClassName("norm")[0].style.color = "gray";
	}
	for (i = 0; i < timestamps.length; i++) {
		if (timestamps[i].getAttribute("data-timestamp") < myAudio.currentTime) {
			timestamps[i].getElementsByClassName("norm")[0].style.color = "gold";
		}
	}
});