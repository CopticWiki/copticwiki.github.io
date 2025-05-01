const morphemes = document.getElementsByClassName("c");
	let myAudio = document.querySelector("audio");
	//let myTimestamp = myAudio.currentTime;
	let morphemeList = [
		0.2,
		0.5,
		0.8
	];
	let jumpToLine = [
		[0, 0],
		[9.511111, 500],
		[20.0, 1000],
		[29.0, 1500],
		[39.0, 2000]
	];
	//let myCountPrev = morphemeList[0];
	//let myCountNext = morphemeList[1];
	//let totalTime = morphemeList[0];
	myAudio.addEventListener("timeupdate", () => {
		for (i = 0; i < morphemes.length; i++) {
			morphemes[i].style.color = "gray";
		}
		for (i = 0; i < morphemes.length; i++) {
			if (morphemeList[i] < myAudio.currentTime) {
				morphemes[i].style.color = "gold";
			}
		}
		/*
		for (j = 0; j < jumpToLine.length; j++) {
			if (jumpToLine[j][0] <= myAudio.currentTime) {
				console.log ("test");
				window.scrollTo({
					top: jumpToLine[j][1],
					behavior: "smooth"
				});
			}
		}
		*/
	});