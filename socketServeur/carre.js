module.exports = {
    carre: function(x, y) {
        this.x = x;
        this.y = y;
        this.length = 20;
        this.update = function(ctx) {
            ctx.rect(this.x, this.y, this.length, this.length);
            ctx.stroke();
        };
        this.padding = 10;

        this.moveLeft = function() {
            this.x -= this.padding;
        };

        this.moveRight = function() {
            this.x += this.padding;
        };

        this.moveUp = function() {
            this.y += this.padding;
        };


        this.moveDown = function() {
            this.y -= this.padding;
        };
    }
};