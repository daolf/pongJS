module.exports = {
    barre: function(x, y) {
        this.info = [x,y,10,80,20];
        this.padding = 10;
        this.socket = null;

        /**
        * height: hauteur canvas
        */
        this.moveUp = function(height) {
            if (this.info[1] > 0)
                this.info[1] -= this.info[4];
        };

        /**
        * height: hauteur canvas
        */
        this.moveDown = function(height) {
            if (this.info[1] + this.info[3] < height)
                this.info[1] += this.info[4];
        };
    }
};