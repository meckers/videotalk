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
    getActionByTime: function(time) {
        var duration = this.getDuration();
        var accumulatedTime = 0;
        for(var i=0; i<this.items.length; i++) {
            if (time >= accumulatedTime && time < (accumulatedTime + this.items[i].duration)) {
                return this.items[i];
            }
            accumulatedTime += this.items[i].duration;
        }
    },
    next: function() {
        return this.getAction(++this.actionIndex);
    },
    add: function(item) {
        this.items.push(item);
    },
    getDuration: function() {
        var duration = 0;
        for (var i=0; i<this.items.length; i++) {
            duration += this.items[i].duration;
        }
        return duration;
    }
});