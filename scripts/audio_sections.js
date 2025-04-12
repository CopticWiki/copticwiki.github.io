


const myAudio = document.querySelector("audio");
let myTimestamp = myAudio.currentTime;

let morphemes = document.querySelector("#interlinear span");

if (myTimestamp > 3) {
	document.querySelector("#interlinear span").style.color = "violet";
}