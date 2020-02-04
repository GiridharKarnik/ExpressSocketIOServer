var app = require("express")();
var server = require("http").Server(app);
var io = require("socket.io")(server);

require('colors');

// app.get("/", function(req, res) {
//   res.sendFile(__dirname + "/index.html");
// });

io.on("connection", function(socket) {
  console.log("a user has connected");

  socket.on("message", function(message, callback) {
    console.log(`message: ${message} received from a client`);

    socket.send("Message received");

    //acknoledge by calling the callback.
    callback();
  });

  socket.on("disconnect", function() {
    console.log("A client disconnected from the socket server");
  });

  socket.on('clientAMessage', function(message, fn) {
    console.log("message received from client A".green);

    socket.send('Hello client A', "some more words");
});

socket.on('clientBMessage', function(message) {
    console.log("message received from client B".magenta);

    socket.send('Hello client B');
  });
});

server.listen(8080, function() {
  console.log("listening on port: 3000");
});
