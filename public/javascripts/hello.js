// Keycode for arrow
var listKey = [37, 38, 39, 40];


var socket = io.connect('http://localhost:3000');
socket.on('news', function(data) {
    window.alert(data.hello);
    console.log(data);
});

$(document).ready(function() {
    $(document).keydown(function(event) {
        if (listKey.indexOf(event.keyCode) != -1) {
            console.log(event.keyCode);
            socket.emit("keyPressed", {
                keyCode: event.keyCode
            });
        }
    });
});