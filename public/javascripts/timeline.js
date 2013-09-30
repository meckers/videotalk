TimeLine = Class.extend({
    duration: 0,
    currentTime: 0,
    init: function() {

    },
    getLength: function() {
        return this.duration;
    },
    setTime: function(time) {
        this.currentTime = time;
    },
    getTime: function() {
        return this.currentTime;
    },
    run: function(time) {
        if (time) {
            this.setTime(time);
        }
        window.setInterval(this.tick, 250);
    },
    tick: function() {
        Events.trigger("TIMELINE_TICK", this.currentTime);
    }
});