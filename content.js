Object.defineProperty(HTMLMediaElement.prototype, 'playing', {
    get: function(){
        return !!(this.currentTime > 0 && !this.paused && !this.ended && this.readyState > 2);
    }
})

console.log('started listening');

var video = document.querySelector("#movie_player > div.html5-video-container > video");
console.log('loaded!')
chrome.runtime.onMessage.addListener(
	function(request, sender, sendResponse) {
		var score = request.text;
		console.log(score);
		if(score[0] < 0.5 && video.playing) {
			video.pause();
		} else if( score[0] > 0.5 && !video.playing) {
			video.play();
		}
		console.log(score);
	}
);
