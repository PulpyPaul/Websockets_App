const http = require('http');
const fs = require('fs');
const socketio = require('socket.io');

const port = process.env.PORT || process.env.NODE_PORT || 3000;

const index = fs.readFileSync(`${__dirname}/../client/index.html`);

const onRequest = (request, response) => {
  response.writeHead(200, { 'Content-Type': 'text/html' });
  response.write(index);
  response.end();
};

const app = http.createServer(onRequest).listen(port);

console.log(`Listening on 127.0.0.1: ${port}`);

// pass in the http server into socketio and grab the websocket server as io
const io = socketio(app);

let users = 0;
let ready = 0;

const addObject = (sock) => {
  const socket = sock;

  socket.on('draw', (data) => {
    io.sockets.in('room1').emit('updateCanvas', data);
  });

  socket.on('beginGame', () => {
    io.sockets.in('room1').emit('startGame');
  });

  socket.on('disconnect', () => {
    console.log('disconnected!');
    users--;
    ready = 0;
    io.sockets.in('room1').emit('disconnection', users);
  });

  socket.on('readyUp', () => {
    ready++;
    io.sockets.in('room1').emit('updateReadyStatus', ready);
  });
    
  socket.on('startRound', () => {
     io.sockets.in('room1').emit('restartRound', getRandomColor()); 
  });
};

io.sockets.on('connection', (socket) => {
  console.log('connected!');

  socket.join('room1');

  users++;
  io.sockets.in('room1').emit('newConnection', users);
  addObject(socket);
});

// https://stackoverflow.com/questions/1484506/random-color-generator
const getRandomColor = () => {
    let letters = '0123456789ABCDEF';
    let color = '#';
            
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    
    return color;
}

