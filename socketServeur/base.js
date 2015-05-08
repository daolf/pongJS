module.exports = function(io) {
    var Pong = require("./pong.js");
    var myPong = new Pong();

    console.log("Bienvenue sur le serveur !!!");
    io.on('connection', function(socket) {

        console.log("Un nouveau client se connecte: " + socket);

        myPong.setSocketRacket(socket);

        //On demande au clients de refraichir leurs vues 60 fois par secondes
        setInterval(
            function() {
                io.sockets.emit("refresh", {
                    info: myPong.getInfos()
                });
                //console.log(myPong.getInfos());
            }, 16);

        // Le client appuis sur une touche et est le proprietaire d'une Racket
        if (myPong.getMyRacket(socket) !== null) {
            socket.on('keyPressed', function(data) {
                switch (data.keyCode) {
                    case 38:
                        myPong.getMyRacket(socket).moveUp(myPong.height);
                        break;
                    case 40:
                        myPong.getMyRacket(socket).moveDown(myPong.height);
                        break;
                }
                // console.log("X: "+myBarre.info[0]+" Y: "+myBarre.info[1]);
            });
        }
    });
};