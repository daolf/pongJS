var barre = require("./barre.js");
var Square = require("./square.js");


var Pong = function() {
    this.leftBarre = new barre.barre(30, 0);
    this.rightBarre = new barre.barre(310, 0);
    this.ball = new Square(50, 50);
    this.height = 350;
    this.width = 350;
    this.maxAngle = 85;
    this.scoreRightPlayer = 0;
    this.scoreLeftPlayer = 0;
    that = this;
    this.launchPhysics();
};

Pong.prototype.setSocketBarre = function(socket) {
    console.log("socket: " + this.leftBarre.socket);
    if (this.leftBarre.socket === null) {
        this.leftBarre.socket = socket;
    } else if (this.rightBarre.socket === null) {
        this.rightBarre.socket = socket;
    }
};

Pong.prototype.getInfos = function() {
    var infos = [
        this.leftBarre.info[0], //X
        this.leftBarre.info[1], //Y
        this.leftBarre.info[2], //Width
        this.leftBarre.info[3], //Heigh          
        this.rightBarre.info[0], //X
        this.rightBarre.info[1], //Y
        this.rightBarre.info[2], //Width
        this.rightBarre.info[3], //Heigh
        this.ball.info[0], //X
        this.ball.info[1], //Y
        this.ball.info[2],
        this.scoreRightPlayer, // scoreRightPlayer
        this.scoreLeftPlayer // scoreLeftPlayer
    ]; //Dimension
    return infos;
};

Pong.prototype.getMyBarre = function(socket) {
    if (this.leftBarre.socket === socket) {
        return this.leftBarre;
    } else if (this.rightBarre.socket === socket) {
        return this.rightBarre;
    } else {
        return null;
    }
};

Pong.prototype.launchPhysics = function() {
    setInterval(function(ball, leftBarre, rightBarre, scoreRightPlayer, scoreLeftPlayer) {
        ball.info[0] += ball.speed * ball.direction[0];
        ball.info[1] += ball.speed * ball.direction[1];

        //collision ball raquette left racket
        if (leftBarre.isCollide(ball.info[0], ball.info[1], ball.info[2], ball.info[2])) {
            console.log("Collision left racket !!!");
            ball.direction[0] *= -1;
        }

        //collision ball right racket
        else if (rightBarre.isCollide(ball.info[0], ball.info[1], ball.info[2], ball.info[2])) {
            console.log("Collision right racket !!!");
            ball.direction[0] *= -1;
        }

        //collision border
        //border top
        else if ((ball.info[1]) < 0) {
            ball.direction[1] *= -1;
        }
        //bottom border
        else if ((ball.info[1] + ball.info[2]) > 400) {
            ball.direction[1] *= -1;
        }
        //score
        //Right player lose
        else if ((ball.info[0] + ball.info[2]) > rightBarre.info[0] + 10) {
            that.scoreLeftPlayer++;
            //On remet la ball au milieu
            console.log("Right player lose ball :" + ball.info);
            ball.init(50, 50);
        }
        //Left player lose
        else if (ball.info[0] < (leftBarre.info[0] + leftBarre.info[2]) - 10) {
            that.scoreRightPlayer++;
            //Put the ball back in the middle
            console.log("Left player lose ball :" + ball.info);
            ball.init(50, 50);
        }
    }, 16, this.ball, this.leftBarre, this.rightBarre, this.scoreRightPlayer, this.scoreLeftPlayer);
};

module.exports = Pong;