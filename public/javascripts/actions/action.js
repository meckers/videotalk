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