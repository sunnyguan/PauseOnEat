window.addEventListener("DOMContentLoaded", function () {
	// Grab elements, create settings, etc.
	var canvas = document.getElementById('canvas');
	var context = canvas.getContext('2d');
	var video = document.getElementById('video');
	var mediaConfig = { video: true };
	var errBack = function (e) {
		console.log('An error has occurred!', e)
	};

	// Put video listeners into place
	if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
		navigator.mediaDevices.getUserMedia(mediaConfig).then(function (stream) {
			//video.src = window.URL.createObjectURL(stream);
			video.srcObject = stream;
			video.play();
		});
	}

	/* Legacy code below! */
	else if (navigator.getUserMedia) { // Standard
		navigator.getUserMedia(mediaConfig, function (stream) {
			video.src = stream;
			video.play();
		}, errBack);
	} else if (navigator.webkitGetUserMedia) { // WebKit-prefixed
		navigator.webkitGetUserMedia(mediaConfig, function (stream) {
			video.src = window.webkitURL.createObjectURL(stream);
			video.play();
		}, errBack);
	} else if (navigator.mozGetUserMedia) { // Mozilla-prefixed
		navigator.mozGetUserMedia(mediaConfig, function (stream) {
			video.src = window.URL.createObjectURL(stream);
			video.play();
		}, errBack);
	}

	tf.loadLayersModel('model/model.json').then(function (model) {
		window.model = model;
	});

	var predict = function (input) {
		if (window.model) {
			window.model.predict([tf.tensor(input).reshape([1, 150, 150, 3])]).array().then(function (scores) {
				scores = scores[0];
				$('#number').html(scores);
				if(scores > 0.5) {
					$('body').css('background-color', 'green')
				} else {
					$('body').css('background-color', 'red')
				}
				chrome.tabs.query({pinned: true}, function(tabs) {
					chrome.tabs.sendMessage(tabs[0].id, {text:scores}, function(response) {
					  console.log('test received');
					});
				});
			});
		} else {
			// The model takes a bit to load, if we are too fast, wait
			setTimeout(function () { predict(input) }, 1000);
		}
	}
	// Trigger photo take
	setInterval(function () {
		context.drawImage(video, 0, 0, 150, 150);
		data = context.getImageData(0, 0, 150, 150).data;
		var input = [];
		for (var i = 0; i < data.length; i += 4) {
			input.push([data[i], data[i+1], data[i+2]]);
		}
		predict(input);
	}, 1000);
}, false);