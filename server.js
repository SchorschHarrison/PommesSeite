//import Chat and User Classes
const Chat = require('./Classes/Chat.js');
const Chatuser = require('./Classes/Chatuser.js');


let express = require('express');

let app = express();

//listen for new Connections on port 80
let server = app.listen(80);
let currentChat = '';


//Host public directory on server
app.use(express.static('public'));

console.log("Server started...");

//import socket
let socket = require('socket.io');
let io = socket(server);

//Event: new Connection
io.on('connection', function(socket){
  console.log(socket.id + "  connected");
  let user;

  //Event: Client asks to join the Chatroom
  socket.on('connect to chat', function(username){
      //if no chatroom exists -> create a new chatroom
      if(currentChat == ''){
        currentChat = new Chat();
      }

      //create new User
      user = new Chatuser(username, socket);
      //console.log(user);

      //Connect User to Chat
      currentChat.connectClient(user);
  });

  //Event: Client disconnects
  socket.on('disconnect', function(){
      if(currentChat != '') currentChat.disconnectClient(socket);
  });

  //Event: Client sents a message in chat
  socket.on('message', function(message){
    if(currentChat != '') currentChat.message(user, message);
  });


});
