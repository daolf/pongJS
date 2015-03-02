module.exports = {
    carre: function(x, y) {
        this.info = [x,y,10];
        this.padding = 10;
        this.speed = 1;
        this.direction = [0.5,0.2];

        this.moove = function() {
        	this.info[0] += this.speed * this.direction[0];
        	this.info[1] += this.speed * this.direction[1];
        };

        this.nextMoove = function() {
        	var x = this.info[0] + this.speed * this.direction[0];
        	var y = this.info[1] + this.speed * this.direction[1];

        	return [x, y, this.info[2]];
        };

    }
};