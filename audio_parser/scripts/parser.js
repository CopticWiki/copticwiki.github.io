import morphemeList from "./silvanus.js";
//console.log(morphemeList);
let myAudio = document.querySelector("audio");
let i = 0;
let ij = 0;
let ijk = 0;
let ijkl = 0;
let xyz = 0;
for (i = 0; i < morphemeList.length; i++) {
	
	//console.log("<li> " + i);
	
	// #interlinear li
	let newLine = document.createElement("li");
	newLine.classList.add("line");
	document.querySelector("#interlinear").appendChild(newLine);
	
	//console.log("\t<ul>");
	
	// #interlinear li.line ul.sub-line
	let newSubLine = document.createElement("ul");
	newSubLine.classList.add("sub-line");
	document.getElementsByClassName("line")[i].appendChild(newSubLine);
	
	//console.log("\t\t<li class=\"whole-morpheme\">");
	
	// #interlinear li.line ul.sub-line li[0]
	let newWholeMorpheme = document.createElement("li");
	newWholeMorpheme.classList.add("whole-morpheme");
	document.getElementsByClassName("line")[i].getElementsByClassName("sub-line")[0].appendChild(newWholeMorpheme);
	
	for (ij = 0; ij < morphemeList[i][0].length; ij++) {
		
		//console.log("\t\t\t<div class=\"group\">" + ij);
		let newGroup = document.createElement("div");
		newGroup.classList.add("group");
		document.getElementsByClassName("line")[i].getElementsByClassName("sub-line")[0].getElementsByClassName("whole-morpheme")[0].appendChild(newGroup);
		
		for (ijk = 0; ijk < morphemeList[i][0][ij].length; ijk++) {
			
			//console.log("\t\t\t\t<div class=\"morpheme\">" + ijk);
			let newMorpheme = document.createElement("a");
			newMorpheme.classList.add("morpheme");
			document.getElementsByClassName("line")[i].getElementsByClassName("sub-line")[0].getElementsByClassName("whole-morpheme")[0].getElementsByClassName("group")[ij].appendChild(newMorpheme);
			
			
			document.getElementsByClassName("line")[i].getElementsByClassName("sub-line")[0].getElementsByClassName("whole-morpheme")[0].getElementsByClassName("group")[ij].getElementsByClassName("morpheme")[ijk].setAttribute("data-timestamp", morphemeList[i][0][ij][ijk][0]);
			
			if (morphemeList[i][0][ij][ijk][3] != "punc") {
				
				document.getElementsByClassName("line")[i].getElementsByClassName("sub-line")[0].getElementsByClassName("whole-morpheme")[0].getElementsByClassName("group")[ij].getElementsByClassName("morpheme")[ijk].setAttribute("href", "#");
				
			}
			
			if (morphemeList[i][0][ij][ijk][3] == "punc") {
				
				document.getElementsByClassName("line")[i].getElementsByClassName("sub-line")[0].getElementsByClassName("whole-morpheme")[0].getElementsByClassName("group")[ij].getElementsByClassName("morpheme")[ijk].classList.add("punc");
				
			}
			
			/*
			let newTime = document.createElement("span");
			newTime.classList.add("time");
			newTime.textContent = morphemeList[i][0][ij][ijk][0];
			document.getElementsByClassName("line")[i].getElementsByClassName("sub-line")[0].getElementsByClassName("whole-morpheme")[0].getElementsByClassName("group")[ij].getElementsByClassName("morpheme")[ijk].appendChild(newTime);
			*/
			
			let newPos = document.createElement("span");
			newPos.classList.add("pos");
			newPos.textContent = morphemeList[i][0][ij][ijk][3];
			document.getElementsByClassName("line")[i].getElementsByClassName("sub-line")[0].getElementsByClassName("whole-morpheme")[0].getElementsByClassName("group")[ij].getElementsByClassName("morpheme")[ijk].appendChild(newPos);

			let newNorm = document.createElement("span");
			newNorm.classList.add("norm");
			newNorm.textContent = morphemeList[i][0][ij][ijk][1];
			document.getElementsByClassName("line")[i].getElementsByClassName("sub-line")[0].getElementsByClassName("whole-morpheme")[0].getElementsByClassName("group")[ij].getElementsByClassName("morpheme")[ijk].appendChild(newNorm);
			
			let newGloss = document.createElement("span");
			newGloss.classList.add("gloss");
			newGloss.textContent = morphemeList[i][0][ij][ijk][2];
			document.getElementsByClassName("line")[i].getElementsByClassName("sub-line")[0].getElementsByClassName("whole-morpheme")[0].getElementsByClassName("group")[ij].getElementsByClassName("morpheme")[ijk].appendChild(newGloss);
		}
	}
	
	//console.log("\t\t<li class=\"whole-gloss\">");
	// #interlinear li.line ul.sub-line li[1]
	let newWholeGloss = document.createElement("li");
	newWholeGloss.classList.add("whole-gloss");
	newWholeGloss.textContent = morphemeList[i][1];
	document.getElementsByClassName("line")[i].getElementsByClassName("sub-line")[0].appendChild(newWholeGloss);
	
}
const line = document.getElementsByClassName("line");
line[0].classList.add("current");
const timestamps = document.getElementsByClassName("morpheme");
myAudio.addEventListener("timeupdate", () => {
	for (i = 0; i < timestamps.length; i++) {
		timestamps[i].getElementsByClassName("norm")[0].style.color = "#40576a";
	}
	for (i = 0; i < timestamps.length; i++) {
		if (timestamps[i].getAttribute("data-timestamp") < myAudio.currentTime) {
			for (xyz = 0; xyz < line.length; xyz++) {
				line[xyz].classList.remove("current");
			}
			//console.log(timestamps[i].parentElement.parentElement.parentElement.parentElement);
			timestamps[i].parentElement.parentElement.parentElement.parentElement.classList.add("current");
			timestamps[i].getElementsByClassName("norm")[0].style.color = "#5781af";
		}
	}
});