var barre = require("./barre.js");
var carre = require("./carre.js");

module.exports = {

    pong: function() {
        this.leftBarre = new barre.barre(0, 0);
        this.rightBarre = new barre.barre(350, 0);
        this.balle = new carre.carre(20, 20);
        this.height = 400;
        this.width = 400;
        this.maxAngle = 85;

        this.setSocketBarre = function(socket) {
            console.log("socket: " + this.leftBarre.socket);
            if (this.leftBarre.socket === null) {
                this.leftBarre.socket = socket;
            } else if (this.rightBarre.socket === null) {
                this.rightBarre.socket = socket;
            }
        };

        this.getInfos = function() {
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
                this.balle.info[2]
            ]; //Dimension
            return infos;
        };

        this.getMyBarre = function(socket) {
            if (this.leftBarre.socket === socket) {
                return this.leftBarre;
            } else if (this.rightBarre.socket === socket) {
                return this.rightBarre;
            } else {
                return null;
            }
        };



        this.launchPhysics = function() {
            setInterval(function(balle, leftBarre, rightBarre) {
                // balle.info[0] += balle.speed * balle.direction[0];
                // balle.info[1] += balle.speed * balle.direction[1];
                balle.moove();

                /*
                Calcul du vecteur vitesse rebond
                */
                var bounce = function(Y, Height, intersectY) {
                    var relInter = (Y + (Height / 2)) - intersectY;
                    var normaleInter = (relInter / (Height / 2));
                    var bounceAngle = normaleInter * 75;
                    var x = Math.cos(bounceAngle);
                    var y = -Math.sin(bounceAngle);

                    // console.log("---------------------------------------");
                    // console.log("Y = " + Y + "Height = " + Height + "intersectY =" + intersectY);
                    // console.log("RelInter = " + relInter+"Height = " + Height);
                    // console.log("NormaleInter :" + normaleInter);
                    // console.log("BounceAngle = "+bounceAngle);

                    return [x,y];
                };

                //collision balle raquette gauche
                if (leftBarre.isCollide(balle.info[0], balle.info[1], balle.info[2], balle.info[2])) {
                    console.log("Collision raquette gauche !!!");
                    var dirL = bounce(leftBarre.info[1], leftBarre.info[3], balle.info[1]);
                    balle.direction = [-1*dirL[0],dirL[1]];
                }

                //collision balle raquette droite
                if (rightBarre.isCollide(balle.info[0], balle.info[1], balle.info[2], balle.info[2])) {
                    console.log("Collision raquette droite !!!");
                    balle.direction = bounce(rightBarre.info[1], rightBarre.info[3], balle.info[1]);
                }

                //collision bordure
                //bord haut 
                if ((balle.info[1]) < 0){
                  balle.direction[1]*=-1;
                }
                // bord bas
                if ((balle.info[1] + balle.info[2]) > 400){
                  balle.direction[1]*=-1;
                }

                //score

            }, 16, this.balle, this.leftBarre, this.rightBarre);
        };

        //on lance l'update physique de la balle
        this.launchPhysics();
    }
};