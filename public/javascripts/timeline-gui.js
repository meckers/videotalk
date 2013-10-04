TimelineGUI = Class.extend({
    init: function(options) {
        $.extend(this, options);
        this.container = $(this.container) || $(document);
        this.listen();
    },
    listen: function() {
        //Events.register('TIMELINE_TICK', this, this.update);
        Events.register("TIMELINE_STARTED", this, this.onStart);
        Events.register("TIMELINE_STOPPED", this, this.onStop);
        Events.register("INDICATOR_DRAG_STOP", this, this.onIndicatorDragStop);
    },
    render: function(totalDuration) {
        this.getDomElement().append(this.getIndicator());
        this.container.append(this.getStartStopElement());
        this.container.append(this.getDomElement());
        var actionBlocks = this.getActionBlocks(totalDuration);
        this.getDomElement().append(actionBlocks);
    },
    onStart: function() {
        console.log("on start");
        this.getStartStopElement().html("||");
    },
    onStop: function() {
        console.log("on stop");
        this.getStartStopElement().html(">");
    },
    update: function(totalDuration, time) {
        this.placeIndicator(totalDuration, time);
    },
    getDomElement: function() {
        this.domElement = this.domElement || this.createDomElement();
        return this.domElement;
    },
    createDomElement: function() {
        var domElement = $("<div></div>");
        domElement.addClass('timeline-gui');
        return domElement;
    },
    getActionBlocks: function(totalDuration) {
        this.actionBlocks = this.actionBlocks || this.createActionBlocks(totalDuration);
        return this.actionBlocks;
    },
    createActionBlocks: function(totalDuration) {
        var container = $('<div></div>');
        container.addClass('action-block-container');
        for(var i=0; i<this.actions.items.length; i++) {
            var item = this.actions.items[i];
            var block = $('<div></div>');
            block.addClass('block ' + item.cssClassName);
            var procentage = item.duration / totalDuration;
            var width = Math.floor(this.getDomElement().width() * procentage) - 1;
            block.css({
                width: width
            });
            block.html('&nbsp;' + item.name);
            container.append(block);
        }
        return container;
    },
    getIndicator: function() {
        this.indicator = this.indicator || this.createIndicator();
        return this.indicator;
    },
    createIndicator: function() {
        var indicator = $('<div></div>');
        indicator.addClass('indicator');
        indicator.draggable({
            axis: 'x',
            containment: 'parent',
            stop: function(e) {
                Events.trigger("INDICATOR_DRAG_STOP", e);
            }
        });
        return indicator;
    },
    onIndicatorDragStop: function(e) {
        Events.trigger("TIMELINE_INDICATOR_MOVED", e);
    },
    getStartStopElement: function() {
        this.startStopElement = this.startStopElement || this.createStartStopElement();
        return this.startStopElement;
    },
    createStartStopElement: function() {
        var startStop = $('<div></div>');
        startStop.addClass('start-stop');
        startStop.on('click', this.onClickStartStop);
        return startStop;
    },
    onClickStartStop: function() {
        Events.trigger("STARTSTOP_CLICKED", this);
    },
    placeIndicator: function(totalDuration, time) {
        var procentage = time / totalDuration;
        var left = Math.floor(this.getDomElement().width() * procentage);
        this.getIndicator().css('left', left + 'px');
    },
    getTime: function(totalDuration) {
        var procentage = this.getIndicator().position().left / this.getDomElement().width();
        return Math.floor(totalDuration * procentage);
    }
});