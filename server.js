//import Chat and User Classes
const Chat = require('./Classes/Chat.js');
const Chatuser = require('./Classes/Chatuser.js');

const rp = require('request-promise');
const url = 'https://www.imensa.de/karlsruhe/mensa-erzbergerstrasse/index.html';


let express = require('express');

let app = express();

//listen for new Connections on port 80
let server = app.listen(80);
let currentChat = '';


//Host public directory on server
app.use(express.static('public'));

console.log("Server started...");

//import socket
let _socket = require('socket.io');
let io = _socket(server);


if(currentChat == ''){
  currentChat = new Chat();
}







//Event: new Connection
io.on('connection', function(socket){
  console.log("chat: " + currentChat);
  console.log(socket.id + "  connected");
  let user;

  //Event: Client asks to join the Chatroom
  socket.on('connect to chat', function(username){
      //if no chatroom exists -> create a new chatroom



      //create new User
      user = new Chatuser(username, socket);
      //console.log(user);


      //Connect User to Chat
      currentChat.connectClient(user);
  });


  socket.on('gibt es heute pommes', function(){

    let pommes = 0;
    rp(url)
      .then(function(html){
        //success!
        //console.log(html);
        let s = "<p class="+ '"aw-meal-description">';
        let a = html.split(s);
        let meals = [];

        for (var i = 0; i < a.length; i++) {
          meals[i] = a[i].split("</p>")[0];
        }
        meals.shift();
        console.log(meals);

        for (var i = 0; i < meals.length; i++) {
          let p = meals[i].split("Pommes");
          if(p.length > 1){
            console.log("pommes gefunden: " + i );
            pommes = 1;
          }
        }

        socket.emit('gibt es heute pommes', pommes);

      })
      .catch(function(err){
        console.log("fehler");
      });

  });

  //Event: Client disconnects
  socket.on('disconnect', function(){
      console.log("Socket: " + socket.id + " disconnected.");
      currentChat.disconnectClient(socket);
    //  console.log(currentChat);
  });

  //Event: Client sents a message in chat
  socket.on('message', function(message){
    if(currentChat != '') currentChat.message(user, message);
  });


});
