var listKey = [37, 38, 39, 40];


var socket = io.connect('http://localhost:3000');

var update = function(coord, ctx) {
    ctx.rect(coord[0], coord[1], coord[2], coord[2]);
    ctx.stroke();
};

$(document).ready(function() {

    var ctx = $("#myCanvas")[0].getContext("2d");

    $(document).keydown(function(event) {
        if (listKey.indexOf(event.keyCode) != -1) {
            console.log(event.keyCode);
            socket.emit("keyPressed", {
                keyCode: event.keyCode
            });
        }
    });

    socket.on("refresh", function(data) {
      console.log(data.info);
      update(data.info, ctx);
    });


});