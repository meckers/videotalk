var G = {
    pollInterval : null
}

VideoPlayer = Class.extend({

    clips: [
        {
            start: 10,
            end: 15,
            texts: [
                {
                    start: 12,
                    duration: 2,
                    text: 'Här pratar han om slagsmål...'
                }
            ]
        },
        {
            start: 210,
            end: 215
        }
    ],

    clipIndex: -1,

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
        this.playNext();
    },
    playNext: function() {
        if (this.clipIndex < this.clips.length-1) {
            this.clipIndex++;
            this.player.currentTime(this.clips[this.clipIndex].start);
            console.log("resuming play at", this.player.currentTime());
            this.player.play();
        }
        else {
            this.player.pause();
        }
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
            console.log("clip finished, playing next...")
            this.playNext();
        }
    },

    getClip: function(index) {
        index = index || this.clipIndex;
        return this.clips[index];
    }


});

