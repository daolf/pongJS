var Racket = require("./racket.js");
var Square = require("./square.js");


var Pong = function() {
    this.leftRacket = new Racket(30, 0);
    this.rightRacket = new Racket(310, 0);
    this.ball = new Square(50, 50);
    this.height = 350;
    this.width = 350;
    this.maxAngle = 85;
    this.scoreRightPlayer = 0;
    this.scoreLeftPlayer = 0;
    that = this;
    this.launchPhysics();
};

Pong.prototype.setSocketRacket = function(socket) {
    console.log("socket: " + this.leftRacket.socket);
    if (this.leftRacket.socket === null) {
        this.leftRacket.socket = socket;
    } else if (this.rightRacket.socket === null) {
        this.rightRacket.socket = socket;
    }
};

Pong.prototype.getInfos = function() {
    var infos = [
        this.leftRacket.info[0], //X
        this.leftRacket.info[1], //Y
        this.leftRacket.info[2], //Width
        this.leftRacket.info[3], //Heigh          
        this.rightRacket.info[0], //X
        this.rightRacket.info[1], //Y
        this.rightRacket.info[2], //Width
        this.rightRacket.info[3], //Heigh
        this.ball.info[0], //X
        this.ball.info[1], //Y
        this.ball.info[2],
        this.scoreRightPlayer, // scoreRightPlayer
        this.scoreLeftPlayer // scoreLeftPlayer
    ]; //Dimension
    return infos;
};

Pong.prototype.getMyRacket = function(socket) {
    if (this.leftRacket.socket === socket) {
        return this.leftRacket;
    } else if (this.rightRacket.socket === socket) {
        return this.rightRacket;
    } else {
        return null;
    }
};

Pong.prototype.launchPhysics = function() {
    setInterval(function(ball, leftRacket, rightRacket, scoreRightPlayer, scoreLeftPlayer) {
        ball.info[0] += ball.speed * ball.direction[0];
        ball.info[1] += ball.speed * ball.direction[1];

        //collision ball raquette left racket
        if (leftRacket.isCollide(ball.info[0], ball.info[1], ball.info[2], ball.info[2])) {
            console.log("Collision left racket !!!");
            ball.direction[0] *= -1;
        }

        //collision ball right racket
        else if (rightRacket.isCollide(ball.info[0], ball.info[1], ball.info[2], ball.info[2])) {
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
        else if ((ball.info[0] + ball.info[2]) > rightRacket.info[0] + 10) {
            that.scoreLeftPlayer++;
            //On remet la ball au milieu
            console.log("Right player lose ball :" + ball.info);
            ball.init(50, 50);
        }
        //Left player lose
        else if (ball.info[0] < (leftRacket.info[0] + leftRacket.info[2]) - 10) {
            that.scoreRightPlayer++;
            //Put the ball back in the middle
            console.log("Left player lose ball :" + ball.info);
            ball.init(50, 50);
        }
    }, 16, this.ball, this.leftRacket, this.rightRacket, this.scoreRightPlayer, this.scoreLeftPlayer);
};

module.exports = Pong;