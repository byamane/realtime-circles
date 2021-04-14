// Server code for socket.io

var io = require('socket.io')();

// Object to track player's initials
const players = {};

// Listen for new connections from clients (socket)
io.on('connection', function(socket) {
  console.log('Client connected to socket.io');

  socket.on('add-circle', function(data) {
    io.emit('add-circle', data);
  });

  socket.on('clear-circles', function() {
    io.emit('clear-circles');
  });

  socket.on('register-player', function(initials) {
    players[socket.id] = initials;
    io.emit('update-player-list', Object.values(players));
  });
  
  socket.on('disconnect', function() {
    delete players[socket.id];
    io.emit('update-player-list', Object.values(players));
  });

});

module.exports = io;