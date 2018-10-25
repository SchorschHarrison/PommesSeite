const Chatuser = require('./Chatuser.js');


class Chat {
  constructor() {
    this.name = 'chat';
    this.clients = [];
    this.chatlog = [];
    this.chatlogLimit = 100;
    this.server = new Chatuser('SERVER', null);
  }


  connectClient(user){
    //// TODO: send chat protocol;
    user.socket.emit('chatlog' , this.chatlog);
    this.clients.push(user);
    console.log(user.username + " joined the chat");
    this.message(this.server, user.username + " has joined the chat.");
  }

  disconnectClient(socket){
    //// TODO: disconnect logic
    let username;
    for(let i = 0; i < this.clients.length; i++){
      if(this.clients[i].socket.id == socket.id){
        username = this.clients[i].username;
        this.clients.splice(i);
      }
    }

    this.message(this.server, username + " has left the chat.");

  }


  message(user, message){
    let logMessage;
      console.log(user.username + " says: " + message);
      //// TODO: Add timestamp
      logMessage = user.username + ": " + message;
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

  sendMessageToClients(message){
    for(let i = 0; i < this.clients.length; i++){
      this.clients[i].socket.emit('message', message);
      console.log("message sent to: " + this.clients[i].username);
    }
  }

}

module.exports = Chat;
