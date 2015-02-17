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
			var infos = [this.leftBarre.info[0],
						this.leftBarre.info[1],
						this.rightBarre.info[0],
						this.rightBarre.info[1],
            this.balle.info[0],
            this.balle.info[1]];
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
	}
};