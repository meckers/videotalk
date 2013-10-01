TimeLine = Class.extend({

    actions: null,
    currentTime: 0,
    tickDuration: 500, // milliseconds
    init: function() {
        this.actions = new ActionList(G.actionData);
    },
    run: function(time) {
        var me = this;
        if (time) {
            this.setTime(time);
        }
        window.setInterval(function() {
            me.tick();
        }, this.tickDuration);
    },
    getCurrentAction: function() {
        return this.actions.getActionByTime(this.currentTime);
    },
    getDuration: function() {
        return this.actions.getDuration();
    },
    setTime: function(time) {
        this.currentTime = time;
    },
    getTime: function() {
        return this.currentTime;
    },
    tick: function() {
        console.log("tick..");
        this.currentTime += this.tickDuration/1000;
        Events.trigger("TIMELINE_TICK", this.currentTime);
    }
});


App = Class.extend({
    currentAction: null,
    init: function(options) {
        $.extend(this, options);
        this.timeLine = new TimeLine();
        this.listen();
        if (this.autoRun) {
            this.run();
        }
    },
    listen: function() {
        Events.register("TIMELINE_TICK", this, this.onTick);
    },
    onTick: function(currentTime) {
        var action = this.timeLine.getCurrentAction();
        if (action !== this.currentAction) {
            console.log("switching to new action", action);
            this.currentAction = action;
            this.currentAction.do();
        }
        else if (action.running) {
            console.log("busy with action", action);
        }
    },
    run: function() {
        console.log("Running timeline");
        this.timeLine.run();
    }
});