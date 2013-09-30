/* Sequencer ---------------------------------------------------------------------------------------------------------*/

Sequencer = Class.extend({

    actions: null,

    init: function() {
        this.actions = new ActionList(G.actionData);
        this.listen();
        this.performNextAction();
    },

    listen: function() {
        Events.register('ACTION_COMPLETE', this, this.performNextAction);
    },

    performNextAction: function(previousAction) {
        console.log("previous action was", previousAction);
        var action = this.actions.next();
        if (action !== undefined) {
            action.do();
        }
    }

});
