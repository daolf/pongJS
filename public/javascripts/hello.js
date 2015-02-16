var socket = io.connect('http://localhost:3000');
  socket.on('news', function (data) {
      window.alert(data.hello);
      console.log(data);
  });