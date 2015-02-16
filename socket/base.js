module.exports = function (io) {
    io.on('keyPressed', function (socket) {
      console.log("La touche appuyée est : " + socket.keyCode);
    });
};