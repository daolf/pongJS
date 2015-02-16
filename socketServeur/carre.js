function carre(x, y, ctx) {
    this.x = x;
    this.y = y;
    this.ctx = ctx;
    this.length = 20;
}

update = function() {
	ctx.rect(this.x,this.y,this.length,this.length);
};

movLeft = function(padding) {
    this.x -= padding;
};

movRight = function(padding) {
    this.x += padding;
};

movUp = function(padding) {
    this.y += padding;
};


movDown = function(padding) {
    this.y -= padding;
};