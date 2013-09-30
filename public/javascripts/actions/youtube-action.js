/* YouTube Action ---------------------------------------------------------------------------------------------------*/

YouTubeAction = Action.extend({
    run: function() {
        this.listen();
        this.render();
    },
    listen: function() {
        Events.register("YOUTUBE_PLAYER_PLAYING", this, this.onPlay);
        Events.register("YOUTUBE_PLAYER_STOPPED", this, this.onStop);
    },
    render: function() {
        var me = this;
        this.player = new YouTube.Player({
            'container': this.container,
            'src' : this.data.url,
            'ranges' : [{
                'start': me.data.start,
                'end': me.data.start + me.data.duration
            }],
            'autoplay': true
        });
    },
    onPlay: function() {
        var me = this;
        console.log("video now playing");
        this.pollInterval = window.setInterval(function() {
            me.onPoll();
        }, 250);
    },
    onStop: function() {
        window.clearInterval(this.pollInterval);
        console.log("video stopped/paused");
    },
    onPoll: function() {
        var time = this.player.getCurrentTime();
        this.currentAnnotation = this.getAnnotation(time);

        if (this.currentAnnotation) {
            if ($("#youtube-annotation:visible").length === 0) {
                this.showAnnotation(this.currentAnnotation.text);
            }
        }
        else {
            if ($("#youtube-annotation:visible").length > 0) {
                this.hideAnnotation();
            }
        }
    },
    getAnnotation: function(time) {
        var validAnnotations = $.grep(this.data.annotations, function(n) {
            return (n.start < time && (n.start + n.duration) > time);
        })
        if (validAnnotations.length > 0) {
            return validAnnotations[0];
        }
        return null;
    },
    showAnnotation: function(text) {
        console.log("showing annotation", text);
        this.textElement = $("<div></div>");
        this.textElement.attr('id', 'youtube-annotation');
        this.textElement.html(text);
        $("#lab1-stage").append(this.textElement);
    },
    hideAnnotation: function() {
        this.textElement.remove();
    }
});