/* Action Manager ----------------------------------------------------------------------------------------------------*/

// Superclass for all action managers
ActionManager = Class.extend({
    action: null,
    init: function(options) {
        this.action = options.action;
        this.container = options.container || document;
    },
    do: function() {
        if (this.action) {
            console.log("Doing action", this.action);
            this.run(this.action);
        }
    }
});


/* Solo Text Action Manager ------------------------------------------------------------------------------------------*/

SoloTextActionManager = ActionManager.extend({
    run: function() {
        var me = this;
        this.render();
        window.setTimeout(function(action) {
            me.unrender();
            Events.trigger('ACTION_COMPLETE', me.action);
        }, this.action.duration*1000);
    },
    domElement: function() {
        if (!this.element) {
            this.element = this.createElement();
        }
        return this.element;
    },
    createElement: function() {
        var element = $("<div></div>");
        element.addClass('lab1-solotext-main');
        element.html(this.action.data);
        // TODO: bind more css to the text here such as transition style and rate.
        return element;
    },
    render: function() {
        $(this.container).append(this.domElement());

    },
    unrender: function() {
        this.domElement().remove();
    }
});


/* YouTube Action Manager --------------------------------------------------------------------------------------------*/

YouTubeActionManager = ActionManager.extend({
    run: function() {
        var me = this;
        window.setTimeout(function(action) {
            Events.trigger('ACTION_COMPLETE', me.action);
        }, this.action.duration*1000);
    }
});


/* Action types ------------------------------------------------------------------------------------------------------*/

ActionTypes = {
    SOLO_TEXT : { managerClass: SoloTextActionManager },
    YOUTUBE_CLIP : { managerClass: YouTubeActionManager }
}


/* Action ------------------------------------------------------------------------------------------------------------*/

Action = Class.extend({
    manager: null,
    type: null,
    data: null,
    duration: null,

    init: function(options) {
        $.extend(this, options);
    }
});


/* Action list -------------------------------------------------------------------------------------------------------*/

ActionList = Class.extend({
    items: [],
    actionIndex: -1,
    init: function(items) {
        this.items = items || [];
    },
    getAction: function(index) {
        index = index || this.actionIndex;
        return this.items[index];
    },
    next: function() {
        return this.getAction(++this.actionIndex);
    },
    add: function(item) {
        this.items.push(item);
    }
});


/* Collage -----------------------------------------------------------------------------------------------------------*/

Collage = Class.extend({

    actions: null,

    init: function() {
        this.performer = new ActionPerformer();
        this.actions = new ActionList(G.actionData);
        this.listen();
        //this.performNextAction();
        this.performNextAction();
    },

    listen: function() {
        Events.register('ACTION_COMPLETE', this, this.performNextAction);
    },

    performNextAction: function(previousAction) {
        console.log("previous action was", previousAction);
        var action = this.actions.next();
        if (action !== undefined) {
            this.performer.perform(action);
        }
    }

});


/* Action performer --------------------------------------------------------------------------------------------------*/

ActionPerformer = Class.extend({
    init: function() {
    },
    perform: function(action) {
        var manager = new action.type.managerClass({
            action: action,
            container: $("#lab1-stage")
        });
        manager.do();
    }
});





/* Global variables --------------------------------------------------------------------------------------------------*/
var G = {
    pollInterval : null,
    actionData: [
        new Action({
            'type': ActionTypes.SOLO_TEXT,
            'data': 'Välkomna',
            'duration': 5
        }),
        new Action({
            'type': ActionTypes.SOLO_TEXT,
            'data': 'Hej då!',
            'duration': 5
        }),
        new Action({
            'type': ActionTypes.YOUTUBE_CLIP,
            'data': 'http://www.youtube.com/watch?v=t9v95hzURkQ',
            'start': 10,
            'duration': 5
        })
    ]
}





