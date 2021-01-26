const express = require('express');
const app = express();
const path = require('path');
const server = require('http').createServer(app);
const io = require('socket.io')(server, {
      cors: {
        origin: '*',
      }
    });

// Priority serve any static files.
app.use(express.static(path.resolve(__dirname, '../ui/build')));
// All remaining requests return the React app, so it can handle routing.
app.get('*', function(request, response) {
response.sendFile(path.resolve(__dirname, '../ui/build', 'index.html'));
});
  
app.use(require("cors")())


// NOT WORKING
let tempImage;
io.on('connection', (socket)=> {
      console.log('User Online');
      socket.on('canvas-data', (data)=> {
            socket.broadcast.emit('canvas-data', data);
            if(data!== 'clear-data'){
                  tempImage = data;
            }
      })
      socket.broadcast.emit('canvas-data', tempImage)
})

const server_port = process.env.YOUR_PORT || process.env.PORT || 5000;
server.listen(server_port, () => {
    console.log("Started on : "+ server_port);
})