App = Class.extend({
    currentAction: null,
    timeLine: null,
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
        Events.register("TIMELINE_MANUAL_UPDATE", this, this.onManualTimelineUpdate);
    },
    onTick: function(currentTime) {
        var action = this.timeLine.getCurrentAction();
        if (action !== this.currentAction) {
            console.log("switching to new action", action);
            this.trySwitchAction(action, true);
        }
        else if (action.running) {
            console.log("busy with action", action);
        }
    },
    trySwitchAction: function(action, startNew) {
        if (this.currentAction) {
            this.currentAction.end();
        }
        this.currentAction = action;
        if (startNew) {
            this.currentAction.do();
        }
    },
    onManualTimelineUpdate: function() {
        var action = this.timeLine.getCurrentAction();
        this.trySwitchAction(action, false);
    },
    run: function() {
        console.log("Running timeline");
        this.timeLine.run();
    }
});