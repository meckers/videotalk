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