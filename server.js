const Chat = require('./Classes/Chat.js');
const Chatuser = require('./Classes/Chatuser.js');

let express = require('express');

let app = express();
let server = app.listen(80);
let currentChat = '';




app.use(express.static('public'));

console.log("Server started...");

let socket = require('socket.io');
let io = socket(server);

io.on('connection', function(socket){
  console.log(socket.id + "  connected");
  let user;

  socket.on('connect to chat', function(username){
      if(currentChat == ''){
        currentChat = new Chat();
      }
      user = new Chatuser(username, socket);
      //console.log(user);
      currentChat.connectClient(user);
  });

  socket.on('disconnect', function(){
      if(currentChat != '') currentChat.disconnectClient(socket);
  });

  socket.on('message', function(message){
    if(currentChat != '') currentChat.message(user, message);
  });


});
