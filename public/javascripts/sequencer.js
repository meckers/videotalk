/* Sequencer ---------------------------------------------------------------------------------------------------------*/

Sequencer = Class.extend({

    actions: null,
    timeLine: null,

    init: function() {
        this.actions = new ActionList(G.actionData);
        this.listen();
        this.performNextAction();
    },

    listen: function() {
        Events.register('ACTION_COMPLETE', this, this.onActionComplete);
    },

    onActionComplete: function(action) {
        action.running = false;
        this.performNextAction();
    },

    performNextAction: function() {
        var action = this.actions.next();
        if (action !== undefined) {
            action.do();
        }
    }

});
