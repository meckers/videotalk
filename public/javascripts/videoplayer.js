$(function() {
    videojs.options.flash.swf = "/public/swf/video-js.swf";


    videojs("vid1").ready(function() {
        console.log("ready");
    });







    //console.log(videojs("example_video_1"));

    /*var myPlayer = videojs("example_video_1");*/

     /*
    myPlayer.on("play", function() {
        console.log("play");
    });

    myPlayer.on("timeupdate", function(e) {
        console.log("time updated", myPlayer.currentTime());
    });*/

    /*console.log(myPlayer);*/
})

