var G = {
    pollInterval : null
}

VideoPlayer = Class.extend({

    clips: [
        {
            start: 10,
            end: 20
        }
    ],

    clipIndex: 0,

    init: function() {
    },
    start: function() {
        console.log("starting...");
        var me = this;
        G.pollInterval = window.setInterval(function() {
            me.pollStarted();
        }, 500);
    },
    pollStarted: function() {
        videojs("vid1").play();
        if (videojs("vid1").currentTime() != 0) {
            window.clearInterval(G.pollInterval);
            this.continue();
        }
    },
    continue: function() {
        this.player = videojs("vid1");
        this.listen();
        this.player.currentTime(this.clips[this.clipIndex].start);
    },
    listen: function() {
        var me = this;
        this.player.on('timeupdate', function() {
            me.onTimeUpdate();
        })
    },
    onTimeUpdate: function() {
        var now = this.player.currentTime();
        var thisClip = this.getClip();
        console.log("We are at", now);
        if (now >= thisClip.end-1) {
            this.player.pause();
        }
    },

    getClip: function(index) {
        index = index || this.clipIndex;
        return this.clips[index];
    }


});

