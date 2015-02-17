module.exports = {
    barre: function(x, y) {
        this.info = [x,y,20];
        this.padding = 10;
        this.socket = null;

        this.moveUp = function() {
            this.info[1] -= this.info[2];
        };

        this.moveDown = function() {
            this.info[1] += this.info[2];
        };
    }
};