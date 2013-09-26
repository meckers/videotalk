/* Action ------------------------------------------------------------------------------------------------------------*/

// Superclass for all actions
Action = Class.extend({
    type: null,
    data: null,
    duration: null,

    init: function(options) {
        $.extend(this, options);
        this.container = options.container || document;
    },
    do: function() {
        console.log("Doing action", this);
        this.run();
    },
    domElement: function() {
        if (!this.element) {
            this.element = this.createElement();
        }
        return this.element;
    },
    render: function() {
        $(this.container).append(this.domElement());
    },
    unrender: function() {
        this.domElement().remove();
    }
});


/* Solo Text Action --------------------------------------------------------------------------------------------------*/

SoloTextAction = Action.extend({
    run: function() {
        var me = this;
        this.render();
        window.setTimeout(function() {
            me.unrender();
            Events.trigger('ACTION_COMPLETE', me);
        }, this.duration*1000);
    },
    createElement: function() {
        var element = $("<div></div>");
        element.addClass('lab1-solotext-main');
        element.html(this.data);
        // TODO: bind more css to the text here such as transition style and rate.
        return element;
    }
});


/* Typewriter text Action --------------------------------------------------------------------------------------------*/

TypewriterTextAction = Action.extend({
    currentChar: 0,
    run: function() {
        var me = this;
        this.render();
        this.interval = window.setInterval(function() {
            me.write();
        }, this.chardelay);
    },
    createElement: function() {
        var element = $("<div></div>");
        element.addClass('lab1-typewritertext-main');
        return element;
    },
    write: function() {
        var element = this.domElement();
        element.append(this.data.charAt(this.currentChar++))
        console.log(this.currentChar, this.data.length);
        if (this.currentChar == this.data.length-1) {
            window.clearInterval(this.interval);
            this.unrender();
            Events.trigger('ACTION_COMPLETE', this);
        }
    }
});


/* YouTube Action ---------------------------------------------------------------------------------------------------*/

/*
YouTubeAction = Action.extend({
    run: function() {
        this.render();
        this.listen();
    },
    render: function() {
        var me = this;
        this.player = new VideoPlayer({
            'src' : this.data.url,
            'ranges' : [{
                'start': me.data.start,
                'end': me.data.start + me.data.duration
            }]
        });
        var element = this.player.domElement();
        $(element).addClass('active');
        //console.log("adding element to container", element, this.container);
        //$(this.container).append(element);
        this.player.start();
    },
    listen: function() {
        Events.register('VIDEO_TIME_UPDATE', this.onTimeUpdate);
    },
    onTimeUpdate: function(e) {
        console.log("time update handler");
        var annotation = this.data.annotations[0];
        if (this.player.currentTime() > annotation.start && !annotation.showing) {
            console.log("showing annotation", annotation);
            this.player.showAnnotation(annotation.text);
            annotation.showing = true;
        }
        else if (this.player.currentTime() > (annotation.start + annotation.duration) && annotation.showing) {
            console.log("removing annotation");
            this.player.removeAnnotation();
            annotation.showing = false;
        }
    }

});
  */

YouTubeAction = Action.extend({
    run: function() {
        this.render();
    },
    render: function() {
        var me = this;
        this.player = new YouTube({
            'container': this.container,
            'src' : this.data.url,
            'ranges' : [{
                'start': me.data.start,
                'end': me.data.start + me.data.duration
            }]
        });
        Events.register("YOUTUBE_PLAYER_READY", function(element) {
            element
        });
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


/* Global variables --------------------------------------------------------------------------------------------------*/
var G = {
    pollInterval : null,
    actionData: [
        new SoloTextAction({
            'container': '#lab1-stage',
            'data': 'Nu blir det film, om 2 sekunder!',
            'duration': 2
        }),
        /*
        new TypewriterTextAction({
            'container': '#lab1-stage',
            'data': 'Måste bara testa detta först... hej svejs',
            'chardelay': 100
        }), */
        new YouTubeAction({
            'container': '#lab1-stage',
            'data': {
                'start': 10,
                'url': 'http://www.youtube.com/v/ii4Ev8Dyo20',
                'annotations': [{
                    'start': 5,
                    'duration': 2,
                    'text': 'This video is WHACK!'
                }]
            },
            'duration': 10
        }),
        new SoloTextAction({
            'container': '#lab1-stage',
            'data': 'Hej då!',
            'duration': 5
        })
    ]
}





