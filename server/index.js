const express = require('express');
const app = express();
const path = require('path');
const server = require('http').createServer(app);
const io = require('socket.io')(server, {
      cors: {
            origin: '*',
      }
});
const { joinUser, removeUser, getRoom } = require('./users');

// Priority serve any static files.
app.use(express.static(path.resolve(__dirname, '../ui/build')));
// All remaining requests return the React app, so it can handle routing.
app.get('*', function (request, response) {
      response.sendFile(path.resolve(__dirname, '../ui/build', 'index.html'));
});

app.use(require("cors")())


// NOT WORKING
let tempImage = {};
io.on('connection', (socket) => {
      socket.on('join-room', (data) => {
            joinUser(socket.id, data.username, data.roomName);
            socket.join(data.roomName);
            if (tempImage[data.roomName]) {
                  console.log("HEHE")
                  io.to(data.roomName).emit('canvas-data', tempImage[data.roomName]);
            }

      });

      socket.on('canvas-data', (data) => {
            let room = getRoom(socket.id);
            console.log("Sending to", room)
            io.to(room).emit('canvas-data', data);
            tempImage[room] = data;
      });

      socket.on("disconnect", () => {
            const user = removeUser(socket.id);
            if (user) {
                  console.log(user.username + ' has left');
            }
            console.log("disconnected");
      });
})

const server_port = process.env.YOUR_PORT || process.env.PORT || 5000;
server.listen(server_port, () => {
      console.log("Started on : " + server_port);
})