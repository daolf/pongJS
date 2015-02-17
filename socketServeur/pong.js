var barre = require("./barre.js");
var carre = require("./carre.js");

module.exports = {

    pong: function() {
        this.leftBarre = new barre.barre(0, 0);
        this.rightBarre = new barre.barre(350, 0);
        this.balle = new carre.carre(20, 20);

        this.setSocketBarre = function(socket) {
            console.log("socket: " + this.leftBarre.socket);
            if (this.leftBarre.socket === null) {
                this.leftBarre.socket = socket;
            } else if (this.rightBarre.socket === null) {
                this.rightBarre.socket = socket;
            }
        };

        this.getInfos = function() {
            var infos = [this.leftBarre.info[0], //X
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
                balle.info[0] += balle.speed * balle.direction[0];
                balle.info[1] += balle.speed * balle.direction[1];
                //collisionn balle raquette gauche
                if (
                    (balle.info[1] <= (leftBarre.info[1] + leftBarre.info[3]))
                    && ((balle.info[1] + balle.info[2]) >= leftBarre.info[1])
                ) {
                    if (
                        (balle.info[0] <= (leftBarre.info[0] + leftBarre.info[2])) && ((balle.info[0] + balle.info[2]) >= leftBarre.info[0])
                    ) {
                        console.log("YOLO !!!");
                        balle.direction[0] *= -1;
                    }

                }
                //collicion balle raquette droite
                if (
                    ((balle.info[1] + balle.info[2]) <= (rightBarre.info[1] + rightBarre.info[3])) && ((balle.info[1] + balle.info[2]) >= rightBarre.info[1])
                ) {
                    if (
                        ((balle.info[0] + balle.info[2]) <= (rightBarre.info[0] + rightBarre.info[3])) && ((balle.info[0] + balle.info[2]) >= rightBarre.info[0])
                    ) {
                        console.log("YOLO 2 !!!");
                        balle.direction[0] *= -1;
                    }

                }
                //collision bordure

                //collision raquette bord

            }, 16, this.balle, this.leftBarre, this.rightBarre);
        };

        //on lance l'update physique de la balle
        this.launchPhysics();
    }
};