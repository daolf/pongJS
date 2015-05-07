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

        this.isCollide = function(objX, objY, objW, objH) {
            if (objX < this.info[0] + this.info[2] && objX + objW > this.info[0] &&
                objY < this.info[1] + this.info[3] && objY + objH > this.info[1]) {

                console.log("Collision détectée !");
                return (true);
            }
            return (false);
        };
    }
};