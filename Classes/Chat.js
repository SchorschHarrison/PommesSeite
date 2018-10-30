//import user class
const Chatuser = require('./Chatuser.js');


class Chat {

  constructor() {
    //this.name = 'chat';
    //create Array for users;
    this.clients = [];

    //create chatlog (array of messages)
    this.chatlog = [];

    //set limit for chatlog
    this.chatlogLimit = 100;

    //create dummy user for server messages
    this.server = new Chatuser('SERVER', null);
  }



  connectClient(user){
    //send current chatlog to new user
    user.socket.emit('chatlog' , this.chatlog);

    //add user to userlist
    this.clients.push(user);
    console.log(user.username + " joined the chat");

    //send "user has joined" message to the chat
    this.message(this.server, user.username + " has joined the chat.");
    //this.logClients();
  }

  //finding disconnected user in userarray and delete this user
  disconnectClient(socket){

    let username;
    let found = 0;
    for(let i = 0; i < this.clients.length; i++){
      if(this.clients[i].socket.id === socket.id){
        username = this.clients[i].username;
        this.clients.splice(i, 1);
        found = 1;
        //this.logClients();
      }
    }


    if(found > 0) this.message(this.server, username + " has left the chat.");
  }

  logClients(){
    for (var j = 0; j < this.clients.length; j++) {
      console.log(this.clients[j].username);
    }
  }

  message(user, message){
    let logMessage;
      console.log(user.username + " says: " + message);
      //// TODO: Add timestamp
      let time = new Date();
      let timestamp = "(" +  time.getHours() +":" + time.getMinutes() + ":" + time.getSeconds() +")";
      console.log(timestamp);

      logMessage = user.username + " "+ timestamp + ": " + message;
      this.addMessageToLog(logMessage);
      this.sendMessageToClients(logMessage);
  }

  addMessageToLog(message){
    this.chatlog.push(message);

    if(this.chatlog.length > this.chatlogLimit){
      this.chatlog.shift();
    }

  //  console.log(this.chatlog);

  }

//send a message to all connected users
  sendMessageToClients(message){
    for(let i = 0; i < this.clients.length; i++){
    if(this.clients[i] != ''){
      this.clients[i].socket.emit('message', message);
        console.log("message sent to: " + this.clients[i].username);
    }
    }
  }

}

module.exports = Chat;
