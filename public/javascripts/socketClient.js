var listKey = [38, 40];


var socket = io.connect('http://192.168.10.104:3000');
//var socket = io.connect('http://192.168.10.106:3000');


var update = function(info, ctx) {
    ctx.clearRect(0,0, ctx.canvas.width, ctx.canvas.height);
    
    ctx.fillRect(info[0], info[1], info[2], info[3]);
    ctx.stroke();
    ctx.fillRect(info[4], info[5], info[6], info[7]);
    ctx.stroke();
    //dessin balle
    ctx.fillRect(info[8], info[9], info[10], info[10]);
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