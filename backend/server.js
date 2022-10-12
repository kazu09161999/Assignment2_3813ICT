const path = require('path');
const http = require('http');
const dotenv = require('dotenv');
const morgan = require('morgan');
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const homeRouter = require('./routers/homeRouter');
const socketio = require('socket.io');
const connectDB = require('./database/connection');
const formatMessage = require('./utils/messages');
const { 
  userJoin, 
  getCurrentUser, 
  userLeave, 
  getRoomUsers
} = require('./utils/users');

dotenv.config({path:'config.env'})

const app = express();
const server = http.createServer(app);
const io = socketio(server);

// mongo db connection

connectDB();


app.set('view engine', 'ejs')

// Set static folder
app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use('/', homeRouter)

const botName = 'ChatApp Bot';

// Run when client connects
io.on('connection', socket => {
  socket.on('joinRoom', ({ username, room }) => {
    const user = userJoin(socket.id, username, room);

    socket.join(user.room);
    // Welcome current user
    socket.emit('message', formatMessage(botName,'Welcome to Chat Application'));

    // Broadcast when a user connects
    socket.broadcast
    .to(user.room)
    .emit('message', formatMessage(botName, `${user.username} has joined the chat`));

    // send users and room info
    io.to(user.room).emit('roomUsers', {
      room: user.room,
      users: getRoomUsers(user.room)
    });
  });

 // Listen for chatMessage
  socket.on('chatMessage', (msg) => {
    const user = getCurrentUser(socket.id);
    io.to(user.room).emit('message', formatMessage(user.username, msg));
  });

  // Runs when clients disconnects
  socket.on('disconnect', () => {
    const user = userLeave(socket.id);

    if(user) {
      io.to(user.room).emit(
        'message', 
        formatMessage(botName,`${user.username} has left the chat`));
    };

    // send users and room info
    io.to(user.room).emit('roomUsers', {
      room: user.room,
      users: getRoomUsers(user.room)
    });
  });
});



const PORT = 3000 || process.env.PORT;

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));