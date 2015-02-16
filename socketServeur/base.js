module.exports = function (io) {
	console.log("Bienvenue sur le serveur !!!")
    io.on('connection', function (socket) {
    	socket.on('keyPressed', function (data) {
    		console.log("La touche appuyée est : " + data.keyCode);
    	});
    });
};