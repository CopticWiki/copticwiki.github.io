import morphemeList from "./silvanus.js";
console.log(morphemeList);
let myAudio = document.querySelector("audio");
let i = 0;
let j = 0;
let k = 0;
for (i = 0; i < morphemeList.length; i++) {
	let newLine = document.createElement("div");
	newLine.classList.add("line");
	document.querySelector("#interlinear").appendChild(newLine);
	
	for (j = 0; j < morphemeList[i].length; j++) {
		let newGroup = document.createElement("div");
		newGroup.classList.add("group");
		document.getElementsByClassName("line")[i].appendChild(newGroup);
		
		for (k = 0; k < morphemeList[i][j].length; k++) {
			let newMorpheme = document.createElement("div");
			let newNorm = document.createElement("span");
			let newGloss = document.createElement("span");
			let newPos = document.createElement("span");
			newMorpheme.classList.add("morpheme");
			newNorm.classList.add("norm");
			newGloss.classList.add("gloss");
			newPos.classList.add("pos");
			newMorpheme.setAttribute("data-timestamp", morphemeList[i][j][k][0]);
			newNorm.textContent = morphemeList[i][j][k][1];
			newGloss.textContent = morphemeList[i][j][k][2];
			newPos.textContent = morphemeList[i][j][k][3];
			document.getElementsByClassName("line")[i].getElementsByClassName("group")[j].appendChild(newMorpheme);
			document.getElementsByClassName("line")[i].getElementsByClassName("group")[j].getElementsByClassName("morpheme")[k].appendChild(newPos);
			document.getElementsByClassName("line")[i].getElementsByClassName("group")[j].getElementsByClassName("morpheme")[k].appendChild(newNorm);
			document.getElementsByClassName("line")[i].getElementsByClassName("group")[j].getElementsByClassName("morpheme")[k].appendChild(newGloss);
		}
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