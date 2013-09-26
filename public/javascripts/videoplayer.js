VideoPlayer = Class.extend({
    init: function(options) {
        $.extend(this, options);
    },
    listen: function() {
        console.log("listen", this.videojs);
        this.videojs.on('timeUpdate', function(e) {
            console.log("internal timeupdate");
            Events.trigger('VIDEO_TIME_UPDATE', e);
        })
    },
    currentTime: function() {
        return this.videojs.currentTime();
    },
    /*domElement: function() {
        // We are assuming we only need one player element on the page for all videos in the action list.
        if ($("#video").length == 0) {
            this.element = this.createElement();
        }
        return $(this.element)[0];
    },*/
    domElement: function() {
        return $("#video")[0];
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
        console.log("start");

        var me = this;

        videojs("video").ready(function() {
            console.log("ready", this);
            me.videojs = this;
            console.log("src", me.src);
            this.src = me.src;
            me.listen();
            var that = this;
            /*
            window.setTimeout(function() {
                that.play();
            }, 1000)*/
        });

        /*
        this.videojs = videojs("video");
        this.videojs.src(this.src);
        this.listen();*/
        //this.videojs.play();
    },
    showAnnotation: function(text) {
        console.log("showing annotation", text);
        this.textElement = $("<div></div>");
        this.textElement.css({
            'width': '640px',
            'height': '50px',
            'position': 'absolute',
            'bottom': '0px',
            'background-color': 'black'
        });
        this.textElement.html(text);
        this.domElement().append(this.textElement);
    },
    removeAnnotation: function() {
        this.textElement.remove();
    }
});