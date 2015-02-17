module.exports = function(io) {
    var carre = require("./carre.js");
    var myCarre = new carre.carre(0, 0);

    console.log("Bienvenue sur le serveur !!!");
    io.on('connection', function(socket) {

        socket.emit("refresh",{info: myCarre.info});
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
            console.log("X: "+myCarre.info[0]+" Y: "+myCarre.info[1]);
            socket.emit("refresh",{info: myCarre.info});
        });
    });
};