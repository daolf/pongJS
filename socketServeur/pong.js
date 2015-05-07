var barre = require("./barre.js");
var carre = require("./carre.js");


var Pong = function() {
    this.leftBarre = new barre.barre(30, 0);
    this.rightBarre = new barre.barre(350, 0);
    this.balle = new carre.carre(50, 50);
    this.height = 400;
    this.width = 400;
    this.maxAngle = 85;
    this.scoreJoueurD = 0;
    this.scoreJoueurG = 0;
    that = this;
    //on lance l'update physique de la balle
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
        this.leftBarre.info[2], //Largeur
        this.leftBarre.info[3], //Hauteur          
        this.rightBarre.info[0], //X
        this.rightBarre.info[1], //Y
        this.rightBarre.info[2], //Largeur
        this.rightBarre.info[3], //Hauteur
        this.balle.info[0], //X
        this.balle.info[1], //Y
        this.balle.info[2],
        this.scoreJoueurD, // scoreJoueurDroit
        this.scoreJoueurG // scoreJoueurGauche
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
    setInterval(function(balle, leftBarre, rightBarre, scoreJoueurD, scoreJoueurG) {
        balle.info[0] += balle.speed * balle.direction[0];
        balle.info[1] += balle.speed * balle.direction[1];

        //collision balle raquette gauche
        if (leftBarre.isCollide(balle.info[0], balle.info[1], balle.info[2], balle.info[2])) {
            console.log("Collision raquette gauche !!!");
            balle.direction[0] *= -1;
        }

        //collision balle raquette droite
        if (rightBarre.isCollide(balle.info[0], balle.info[1], balle.info[2], balle.info[2])) {
            console.log("Collision raquette droite !!!");
            balle.direction[0] *= -1;
        }

        //collision bordure
        //bord haut 
        if ((balle.info[1]) < 0) {
            balle.direction[1] *= -1;
        }
        // bord bas
        if ((balle.info[1] + balle.info[2]) > 400) {
            balle.direction[1] *= -1;
        }
        //score
        //Joueur droit perd
        if ((balle.info[0] + balle.info[2]) > rightBarre.info[0] + 10) {
            that.scoreJoueurG++;
            //On remet la balle au milieu
            console.log("Joueur droit perd Balle :" + balle.info);
            balle.init(50, 50);
        }
        //Joueur gauche perd
        if (balle.info[0] < (leftBarre.info[0] + leftBarre.info[2]) - 10) {
            that.scoreJoueurD++;
            //On remet la balle au milieu
            console.log("Joueur Gauche perd Balle :" + balle.info);
            balle.init(50, 50);
        }
    }, 16, this.balle, this.leftBarre, this.rightBarre, this.scoreJoueurD, this.scoreJoueurG);
};

module.exports = Pong;