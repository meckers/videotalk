VideoPlayer = Class.extend({
    init: function() {

    },
    start: function() {
        console.log("starting...");
        this.pollTimeout = window.setInterval(this.pollStarted, 500);
    },
    pollStarted: function() {
        console.log("polling...");
        var me = this;
        videojs("vid1").play();
        if (videojs("vid1").currentTime() != 0) {
            window.clearInterval(me.pollTimeout);
        }
    }
});

