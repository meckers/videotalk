TimeLine = Class.extend({
    actions: null,
    currentTime: 0,
    tickDuration: 250, // milliseconds
    interval: null,
    gui: null,
    running: false,
    init: function() {
        this.actions = new ActionList(G.actionData);
        this.listen();
        this.render();
    },
    listen: function() {
        Events.register("STARTSTOP_CLICKED", this, this.toggleStartStop);
        Events.register("TIMELINE_INDICATOR_MOVED", this, this.onIndicatorMoved);
    },
    render: function() {
        this.gui = new TimelineGUI({
            container: '#timeline-container',
            actions: this.actions
        });
        this.gui.render(this.getDuration());
    },
    run: function(time) {
        var me = this;
        if (time) {
            this.setTime(time);
        }
        this.interval = window.setInterval(function() {
            me.tick();
        }, this.tickDuration);
        this.running = true;
        Events.trigger("TIMELINE_STARTED", this);
    },
    stop: function() {
        window.clearInterval(this.interval);
        this.running = false;
        Events.trigger("TIMELINE_STOPPED", this);
    },
    toggleStartStop: function() {
        if (this.running) {
            this.stop();
        }
        else {
            this.run();
        }
    },
    getCurrentAction: function() {
        return this.actions.getActionByTime(this.currentTime);
    },
    getDuration: function() {
        return this.actions.getDuration();
    },
    setTime: function(time, reRender) {
        this.currentTime = time;
        if (reRender) {
            this.getCurrentAction().render();
        }
    },
    getTime: function() {
        return this.currentTime;
    },
    tick: function() {
        var totalDuration = this.getDuration();
        this.currentTime += this.tickDuration/1000;
        this.gui.update(totalDuration, this.currentTime);
        if (totalDuration > this.currentTime) {
            Events.trigger("TIMELINE_TICK", this.currentTime);
        }
        else {
            this.stop();
        }
    },
    onIndicatorMoved: function(jQueryEvent) {
        this.setTime(this.gui.getTime(this.getDuration()), true);
        Events.trigger('TIMELINE_MANUAL_UPDATE', null);
    }
});


