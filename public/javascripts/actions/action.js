/* Action ------------------------------------------------------------------------------------------------------------*/

// Superclass for all actions
Action = Class.extend({
    type: null,
    data: null,
    duration: null,
    running: false,

    init: function(options) {
        $.extend(this, options);
        this.container = options.container || document;
    },
    do: function() {
        console.log("Doing action", this);
        this.run();
    },
    run: function() {
        this.running = true;
    },
    stop: function() {
        this.running = false;
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
        console.log("unrender", this.domElement());
        this.domElement().remove();
    }
});