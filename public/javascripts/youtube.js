YouTube = Class.extend({
    init: function(options) {
        $.extend(this, options);
        this.listen();
        this.embed();
    },
    listen: function() {
        Events.register("YOUTUBE_PLAYER_READY", this, this.onPlayerReady);
    },
    embed: function() {
        var params = { allowScriptAccess: "always" };
        var atts = { id: "myytplayer" };
        swfobject.embedSWF(this.src + "?enablejsapi=1&playerapiid=ytplayer&version=3",
            $(this.container).attr('id'), "650", "360", "8", null, null, params, atts);
    },
    onPlayerReady: function(e) {
        console.log("youtube player ready", e);
        console.log("status", e.getPlayerState());
    }
});

function onYouTubePlayerReady(playerId) {
    Events.trigger("YOUTUBE_PLAYER_READY", document.getElementById('myytplayer'));
}