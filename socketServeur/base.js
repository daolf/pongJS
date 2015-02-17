module.exports = function(io) {
    var carre = require("./carre.js");
    var barre = require ("./barre.js");
    var myCarre = new carre.carre(15, 15);
    var leftBarre = new barre.barre(0,0);
    var rightBarre = new barre.barre(100,0);

    console.log("Bienvenue sur le serveur !!!");
    io.on('connection', function(socket) {

        console.log("Un nouveau client se connecte: " + socket);

        if(leftBarre.socket === null ) {
          leftBarre.socket = socket;
        }
        else if (rightBarre.socket === null ) {
          rightBarre.socket = socket;
        }
        else {
          console.log("Il y a déjà deux joueurs vous serez donc spectateur");
        }

        //On recherche la barre courante
        var myBarre;
        var otherBarre;
        if (leftBarre.socket === socket ) {myBarre = leftBarre;
                                          otherBarre = rightBarre;}
        if (rightBarre.socket === socket ) {myBarre = rightBarre;
                                          otherBarre = leftBarre;}


        // Le client appuis sur une touche
        socket.on('keyPressed', function(data) {
            switch (data.keyCode) {
                case 38:
                    myBarre.moveUp();
                    break;
                case 40:
                    myBarre.moveDown();
                    break;
            }
            console.log("X: "+myBarre.info[0]+" Y: "+myBarre.info[1]);

            //On demande au clients de refraichir leurs vues
            io.sockets.emit("refresh",{myInfo: myBarre.info,
                                       otherInfo : otherBarre.info});
        });
    });
};