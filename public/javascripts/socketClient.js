var listKey = [38, 40];

var socket = io.connect('http://192.168.1.11:3000');
//Ellie ip St sernin
//var socket = io.connect('http://192.168.0.17:3000');
//var socket = io.connect('http://192.168.10.106:3000');


var update = function(info, ctx) {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

    ctx.fillRect(info[0], info[1], info[2], info[3]);
    ctx.stroke();
    ctx.fillRect(info[4], info[5], info[6], info[7]);
    ctx.stroke();
    //dessin balle
    ctx.fillRect(info[8], info[9], info[10], info[10]);
    ctx.stroke();

    $(".scoreR").text("Score Right : " + info[11]);
    //console.log("ScoreD" + info[11]);
    $(".scoreL").text("Score Left : " + info[12]);
    //console.log("ScoreG" + info[12]);

};

$(document).ready(function() {

    var ctx = $("#myCanvas")[0].getContext("2d");
    var buttonDown = false;
    var buttonUp = false;
    var interval;

    $(document).mouseup(function() {
        buttonDown = false;
        buttonUp = false;
        clearInterval(interval);
    });

    $(document).keydown(function(event) {
        if (listKey.indexOf(event.keyCode) != -1) {
            //console.log(event.keyCode);
            socket.emit("keyPressed", {
                keyCode: event.keyCode
            });
        }
    });

    /*
      All of that needs to be done to enable coninous click throught only mousedown/up event
    */

    function buttonHandler() {
        console.log("Here");
        if (buttonDown === true) {
            socket.emit("keyPressed", {
                keyCode: 40
            });
        } else if (buttonUp === true) {
            socket.emit("keyPressed", {
                keyCode: 38
            });
        }
    }

    $('.buttonUp').mousedown(function(event) {
        buttonUp = true;
        interval = setInterval(buttonHandler,100);
    });

    $('.buttonDown').mousedown(function() {
        buttonDown = true;
        interval = setInterval(buttonHandler,100);
    });

    socket.on("refresh", function(data) {
        //console.log(data.info);
        update(data.info, ctx);

    });

});