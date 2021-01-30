const express = require('express');
const app = express();
const path = require('path');
const server = require('http').createServer(app);
const io = require('socket.io')(server, {
      cors: {
            origin: '*',
      }
});
const { joinUser, removeUser, getRoom , getUsername} = require('./users');

// Priority serve any static files.
app.use(express.static(path.resolve(__dirname, '../ui/build')));
// All remaining requests return the React app, so it can handle routing.
app.get('*', function (request, response) {
      response.sendFile(path.resolve(__dirname, '../ui/build', 'index.html'));
});

app.use(require("cors")())

let tempImage = {};
io.on('connection', (socket) => {
      socket.on('join-room', (data) => {
            joinUser(socket.id, data.username, data.roomName);
            socket.join(data.roomName);
            if (tempImage[data.roomName]) {
                  io.to(data.roomName).emit('canvas-data', tempImage[data.roomName]);
            }
            let message = {msg: `${data.username} has joined`};
            io.to(data.roomName).emit('chatMsg', message);

      });

      socket.on('canvas-data', (data) => {
            let room = getRoom(socket.id);
            io.to(room).emit('canvas-data', data);
            tempImage[room] = data;
      });

      socket.on('chatMsg', (data) => {
            let room = getRoom(socket.id);
            let username = getUsername(socket.id)
            data.username = username
            if (username && room){
                  io.to(room).emit('chatMsg', data);
            }
      });

      socket.on("disconnect", () => {
            const user = removeUser(socket.id);
            if (user) {
                  let message = {msg: `${user.username} has left`};
                  io.to(user.roomname).emit('chatMsg', message);
            }
      });
})

const server_port = process.env.YOUR_PORT || process.env.PORT || 5000;
server.listen(server_port, () => {
      console.log("Started on : " + server_port);
})