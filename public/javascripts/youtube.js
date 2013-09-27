var YouTube = YouTube || {};

YouTube.Listeners = {
    onStateChange: function(state) {
        console.log("state", state);
        if (state == 1) {
            Events.trigger('YOUTUBE_PLAYER_PLAYING');
        }
        else if (state == 2) {
            Events.trigger('YOUTUBE_PLAYER_STOPPED');
        }
    }
};

YouTube.Player = Class.extend({
    init: function(options) {
        $.extend(this, options);
        this.listen();
        this.embed();
    },
    listen: function() {
        Events.register("YOUTUBE_PLAYER_READY", this, this.onPlayerReady);
    },
    listenOnPlayer: function() {
        console.log("listenOnPlayer", this.player);
        this.player.addEventListener('onStateChange', 'YouTube.Listeners.onStateChange');
    },
    embed: function() {
        var params = { allowScriptAccess: "always" };
        var atts = { id: "myytplayer" };
        swfobject.embedSWF(this.src + "?enablejsapi=1&playerapiid=ytplayer&version=3",
            $(this.container).attr('id'), "650", "360", "8", null, null, params, atts);
    },
    unembed: function() {
        $('myytplayer').remove();
    },
    onPlayerReady: function(player) {
        console.log("youtube player ready", player);
        this.player = player;
        this.listenOnPlayer();
        if (this.autoplay) {
            player.playVideo();
        }
    },
    getCurrentTime: function() {
        return this.player.getCurrentTime();
    }
});

function onYouTubePlayerReady(playerId) {
    Events.trigger("YOUTUBE_PLAYER_READY", document.getElementById('myytplayer'));
}