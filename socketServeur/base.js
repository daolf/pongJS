module.exports = function(io) {
    console.log("Bienvenue sur le serveur !!!");
    io.on('connection', function(socket) {
        var carre = require("./carre.js");
        var myCarre = new carre.carre(0, 0);

        socket.on('keyPressed', function(data) {
            switch (data.keyCode) {
                case 37:
                    myCarre.moveLeft();
                    break;
                case 38:
                    myCarre.moveUp();
                    break;
                case 39:
                    myCarre.moveRight();
                    break;
                case 40:
                    myCarre.moveDown();
                    break;
            }
            console.log("X: "+myCarre.x+"Y: "+myCarre.y);
        });
    });
};