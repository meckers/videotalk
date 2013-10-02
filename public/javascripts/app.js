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
    },
    onTick: function(currentTime) {
        var action = this.timeLine.getCurrentAction();
        if (action !== this.currentAction) {
            console.log("switching to new action", action);
            if (this.currentAction) {
                this.currentAction.stop();
            }
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