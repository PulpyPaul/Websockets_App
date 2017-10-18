const http = require('http');
const fs = require('fs');
const socketio = require('socket.io');
const url = require('url');
const path = require('path');

// port to host on
const port = process.env.PORT || process.env.NODE_PORT || 3000;

// reference to index.html
const index = fs.readFileSync(`${__dirname}/../client/index.html`);

// Fetches all the necessary files
const onRequest = (request, response) => {
  const pathname = url.parse(request.url).pathname;
  const ext = path.extname(pathname);

  // writes the file based on the file extensions to import all external sources
  if (ext) {
    if (ext === '.css') {
      response.writeHead(200, { 'Content-Type': 'text/css' });
    } else if (ext === '.js') {
      response.writeHead(200, { 'Content-Type': 'text/javascript' });
    }
    response.write(fs.readFileSync(path.join(`${__dirname}/../client`, pathname), 'utf8'));
  } else {
    response.writeHead(200, { 'Content-Type': 'text/html' });
    response.write(index);
  }
  response.end();
};

// Creates the server
const app = http.createServer(onRequest).listen(port);

// pass in the http server into socketio and grab the websocket server as io
const io = socketio(app);

// Holds number of users and number of users readied up
let users = 0;
let ready = 0;

// Used to get a random color
// https://stackoverflow.com/questions/1484506/random-color-generator
const getRandomColor = () => {
  const letters = '0123456789ABCDEF';
  let color = '#';

  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }

  return color;
};

// Hooks up socket events and calls
const addObject = (sock) => {
  const socket = sock;

  socket.on('draw', (data) => {
    io.sockets.in('room1').emit('updateCanvas', data);
  });

  socket.on('beginGame', () => {
    io.sockets.in('room1').emit('startGame');
  });

  socket.on('disconnect', () => {
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

// Joins the room, updates users, call hookup to socket events
io.sockets.on('connection', (socket) => {
  socket.join('room1');
  users++;
  io.sockets.in('room1').emit('newConnection', users);
  addObject(socket);
});

