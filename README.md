# PauseOnEat
Pause YouTube video when you're taking a bite

Download Chrome Extension zip: https://github.com/sunnyguan/PauseOnEat/raw/main/pauseoneat.zip

Currently using face detection with OpenCV for detection play/pause. Previously used a model trained on my own video to predict eat/watch.

## How to Use

1. Click zip link above, unzip to some directory
2. Load unpacked in Chrome/Edge (not tested in Firefox)
3. Click on extension icon, click on the empty button
4. Navigate to a YouTube page **and pin it**
5. If there is a red box around your face on the extension popup, then the video should be playing; otherwise the video will be paused.

## Known Bugs

1. Might not work with YouTube Nonstop or HTML5 video speed changers (not fully tested)
