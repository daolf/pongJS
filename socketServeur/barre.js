module.exports = {
    barre: function(x, y) {
        this.info = [x,y,10,80,20];
        this.padding = 10;
        this.socket = null;

        this.moveUp = function() {
            this.info[1] -= this.info[4];
        };

        this.moveDown = function() {
            this.info[1] += this.info[4];
        };
    }
};