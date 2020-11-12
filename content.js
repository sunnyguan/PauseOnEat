console.log('started listening');

var video = document.querySelector("#movie_player > div.html5-video-container > video");
console.log('loaded!')
chrome.runtime.onMessage.addListener(
	function(request, sender, sendResponse) {
		var score = request.text;
		console.log(score);
		var playing = !!(video.currentTime > 0 && !video.paused && !video.ended && video.readyState > 2);
		if(score[0] < 0.5 && playing) {
			video.pause();
		} else if( score[0] > 0.5 && !playing) {
			video.play();
		}
		console.log(score);
	}
);
