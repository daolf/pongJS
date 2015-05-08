
var Racket = function(x, y) {
  this.info = [x,y,10,80,20];
  this.padding = 10;
  this.socket = null;
};
/**
* height: hauteur canvas
*/
Racket.prototype.moveUp = function(height) {
    if (this.info[1] > 0)
        this.info[1] -= this.info[4];
};

/**
* height: hauteur canvas
*/
Racket.prototype.moveDown = function(height) {
    if (this.info[1] + this.info[3] < height)
        this.info[1] += this.info[4];
};

/*
  Return true if the given point is in the racket, else false
*/
Racket.prototype.hasPointIn = function(pointX,pointY) {
  var isIn = false;
  if (pointY >= this.info[1] &&
      pointY <= this.info[1] + this.info[3] &&
      pointX >= this.info[0] &&
      pointX <= this.info[0] + this.info[2]
      ){ isIn = true; }
  return isIn;
};

Racket.prototype.isCollide = function(objX, objY, objW, objH) {
    // We test if all point of given object are in the racket
    if (  this.hasPointIn(objX,objY) || this.hasPointIn(objX + objW,objY) ||
          this.hasPointIn(objX,objY+objH) || this.hasPointIn(objX+objW,objY+objH))
    {
        console.log("Collision détectée !");
        return (true);
    }
    return (false);
};

module.exports = Racket;