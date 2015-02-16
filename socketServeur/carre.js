module.exports = {
    carre: function(x, y) {
        this.info = [x,y,20];
        this.padding = 10;

        this.moveLeft = function() {
            this.info[0] -= this.info[2];
        };

        this.moveRight = function() {
            this.info[0] += this.info[2];
        };

        this.moveUp = function() {
            this.info[1] += this.info[2];
        };


        this.moveDown = function() {
            this.info[1] -= this.info[2];
        };
    }
};