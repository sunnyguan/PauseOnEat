document.addEventListener('DOMContentLoaded', function (g) {
	document.getElementById("changeColor").addEventListener('click', function(e) {
		var popupWindow = window.open(
			chrome.extension.getURL("opencv.html"),
			"ff",
			"width=1280,height=720"
		);
	});
}, false);