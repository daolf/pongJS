var listKey = [38, 40];


var socket = io.connect('http://192.168.10.104:3000');

var update = function(myInfo, otherInfo, ctx) {
    ctx.clearRect(0,0, ctx.canvas.width, ctx.canvas.height);
    
    ctx.fillRect(myInfo[0], myInfo[1], 10, 80);
    ctx.stroke();
    ctx.fillRect(otherInfo[0], otherInfo[1], 10, 80);
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
      update(data.myInfo, data.otherInfo, ctx);
    });


});