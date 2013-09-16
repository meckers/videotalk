var Globals = {
    videoPlayer: null
}

$(function() {
    console.log("document ready");
    Globals.videoPlayer = new VideoPlayer();
    Globals.videoPlayer.start();
})