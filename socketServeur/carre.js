module.exports = {
    carre: function(x, y) {
        this.info = [x,y,20];
        this.padding = 10;
        this.speed = 1;
        this.direction = [1,0];

        this.moveLeft = function() {
            this.info[0] -= this.info[2];
        };

        this.moveRight = function() {
            this.info[0] += this.info[2];
        };

        this.moveUp = function() {
            this.info[1] -= this.info[2];
        };


        this.moveDown = function() {
            this.info[1] += this.info[2];
        };

        this.launchPhysics = function() {
          //console.log("update physics balle :" + this.info[0] +" "+ this.info[1]);
          setInterval(function(obj) {
            obj.info[0] += obj.speed*obj.direction[0];
            obj.info[1] += obj.speed*obj.direction[1];
          },100,this);
        
        };
    }
};