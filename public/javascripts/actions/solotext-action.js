/* Solo Text Action --------------------------------------------------------------------------------------------------*/

SoloTextAction = Action.extend({
    name: 'Solo text',
    cssClassName: 'solo-text',
    run: function() {
        var me = this;
        this.render();
        /*
        window.setTimeout(function() {
            me.unrender();
            Events.trigger('ACTION_COMPLETE', me);
        }, this.duration*1000);*/
        this._super();
    },
    end: function() {
        this.unrender();
        this._super();
    },
    createElement: function() {
        var element = $("<div></div>");
        element.addClass('lab1-solotext-main');
        element.html(this.data);
        // TODO: bind more css to the text here such as transition style and rate.
        return element;
    }
});