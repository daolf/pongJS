module.exports = {
    carre: function(x, y) {
        this.info = [x, y, 10];
        this.padding = 10;
        this.speed = 3;
        this.direction = [0.5, 0.2];


        this.init = function(x, y) {
            this.info = [x, y, 10];
            this.padding = 10;
            this.speed = 3;
            this.direction = [0.5, 0.2];
        };
    }
};