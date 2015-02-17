var barre = require("./barre.js");
var carre = require("./carre.js");

module.exports = {

	pong: function() {
		this.leftBarre = new barre.barre(0, 0);
		this.rightBarre = new barre.barre(100, 0);
    	this.balle = new carre.carre(20,20);
    
		this.setSocketBarre = function(socket) {
			console.log("socket: " + this.leftBarre.socket);
			if (this.leftBarre.socket === null) {
				this.leftBarre.socket = socket;
			}
			else if (this.rightBarre.socket === null) {
				this.rightBarre.socket = socket;
			}
		};

		this.getInfos = function() {
			var infos = [this.leftBarre.info[0],	//X
						this.leftBarre.info[1],		//Y
						this.leftBarre.info[2],		//Largeur
						this.leftBarre.info[3],		//Hauteur					 
						this.rightBarre.info[0],	//X
						this.rightBarre.info[1],	//Y
						this.rightBarre.info[2],	//Largeur
						this.rightBarre.info[3],	//Hauteur
            			this.balle.info[0],			//X
            			this.balle.info[1],			//Y
            			this.balle.info[2]];		//Dimension
			return infos;
		};

		this.getMyBarre = function(socket) {
			if (this.leftBarre.socket === socket) {
				return this.leftBarre;
			}
			else if (this.rightBarre.socket === socket) {
				return this.rightBarre;
			}
			else {
				return null;
			}
		};

		this.launchPhysics = function() {
          	setInterval(function(balle, leftBarre, rightBarre) {
            	balle.info[0] += balle.speed * balle.direction[0];
            	balle.info[1] += balle.speed * balle.direction[1];

          	},16,this.balle, this.leftBarre, this.rightBarre);
		};

    	//on lance l'update physique de la balle
    	this.launchPhysics();
	}
};