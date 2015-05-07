var Square = function(x, y) {
    this.info = [x, y, 10];
    this.padding = 10;
    this.speed = 3;
    this.direction = [0.5, 0.2];
};

Square.prototype.init = function(x, y) {
    this.info = [x, y, 10];
    this.padding = 10;
    this.speed = 3;
    this.direction = [0.5, 0.2];
};
Square.prototype.move = function() {
    this.info[0] += this.speed * this.direction[0];
    this.info[1] += this.speed * this.direction[1];
};

Square.prototype.nextMoove = function() {
    var x = this.info[0] + this.speed * this.direction[0];
    var y = this.info[1] + this.speed * this.direction[1];

    return [x, y, this.info[2]];
};

module.exports = Square;