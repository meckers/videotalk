/* Typewriter text Action --------------------------------------------------------------------------------------------*/

TypewriterTextAction = Action.extend({
    name: 'Typewriter text',
    cssClassName: 'typewriter-text',
    currentChar: 0,
    run: function() {
        var me = this;
        this.render();
        this.interval = window.setInterval(function() {
            me.write();
        }, this.chardelay);
    }
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