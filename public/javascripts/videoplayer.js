VideoPlayer = Class.extend({
    init: function(options) {
        $.extend(this, options);
    },
    /*
    domElement: function() {
        // We are assuming we only need one player element on the page for all videos in the action list.
        if ($("#video").length == 0) {
            this.element = this.createElement();
        }
        return $(this.element)[0];
    },*/
    domElement: function() {
        return $("#vid1")[0];
    },
    playerElement: function() {
        return this.domElement().find('#video_html5_api');
    },
    createElement: function() {
        var element = $("<video></video>");
        element.attr({
            'id': 'video',
            'preload': 'auto',
            'data-setup': '{ "techOrder": ["youtube"] }'
        });
        element.addClass('video-js vjs-default-skin');
        return element;
    },
    start: function() {
        /*this.videojs = videojs("vid1");
        this.videojs.src(this.src);
        this.videojs.play();*/
    }
});