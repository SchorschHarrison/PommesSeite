class PageChat {



  constructor(app, name) {
    this.id = PageChat.ids;
    this._app = app;
    this.name = name;
    this.connectedToChat = 0;
    this._mainElement = document.getElementById("main-page-chat");
    this.div_entername = document.getElementById("entername");
    this.div_chat = document.getElementById("chat");
    this.textArea_chatlog = document.getElementById("textArea_chatlog");

    //Made chatlog, btn_enterchat, input_message, btn_send and socket static because it was
    //causing problems when the a new Page was created
    if(PageChat.chatlog == '') PageChat.chatlog = [];

    //create event listener for "enter chat" button
    if(PageChat.btn_enterchat == null){
      PageChat.btn_enterchat = document.getElementById("btn_enterchat");
      PageChat.btn_enterchat.addEventListener("click", () => this.enterChat());
    }

    //create event listener for "input_message" (if enter is pressed)
    if(PageChat.input_message == null){
      PageChat.input_message = document.getElementById("input_message");
      PageChat.input_message.addEventListener("keyup", (event) => this.enterPressed(event));
    }

    //create event listener for "btn_send"
    if(PageChat.btn_send == null) {
      PageChat.btn_send= document.getElementById("btn_send");
      PageChat.btn_send.addEventListener("click", () => this.send());
    }

    //create socket (establish connection) if it doesn't exist
    if(PageChat.socket == null){
      PageChat.socket = io.connect('http://localhost:80');
      PageChat.socket.on('message', (message) => this.recieveMessage(message));
      PageChat.socket.on('chatlog', (_chatlog) => this.recieveChatlog(_chatlog));
      console.log("socket created");
    }




    //PageChat.socket.on('gibt es heute pommes', (pommes) => console.log("Es gibt Pommes!: " + pommes));

    this.div_chat.classList.add("hidden");
    //PageChat.socket.emit('gibt es heute pommes');
    PageChat.ids++;
  }


  //show method
  show(){
    this._mainElement.classList.remove("hidden");
    if(PageChat.connectedToChat > 0){
      this.div_entername.classList.add("hidden");
      this.div_chat.classList.remove("hidden");
    }else {
      this.div_entername.classList.remove("hidden");
      this.div_chat.classList.add("hidden");
    }


  }

  //hide method
  hide(){
    this._mainElement.classList.add("show");
    this.div_entername.classList.add("hidden");
    this.div_chat.classList.add("hidden");
  //  PageChat.socket = null;
  }

  //chatlog recieved handler
  recieveChatlog(_chatlog){
    console.log(_chatlog);
    PageChat.chatlog = _chatlog;
    this.updateTextArea();
  }

  //enter on input_message handler
  enterPressed(event){
    event.preventDefault();

    if(event.keyCode === 13){
      PageChat.btn_send.click();
    }
  }

  //add message to log and constrain log to <= 100 messages
  recieveMessage(message){
    console.log("recieved something");
    PageChat.chatlog.push(message);
    if(PageChat.chatlog.length > 100) PageChat.chatlog.shift();
  //  addMessageToTextArea(message);
    this.updateTextArea();
  }

  //update the texfield
  updateTextArea(){
    this.textArea_chatlog.value = PageChat.chatlog.join("\n");
    this.textArea_chatlog.scrollTop = this.textArea_chatlog.scrollHeight;
  }


  //btn_send handler
  send(){
    console.log("pressed Send " + this.id);

    let message = input_message.value;

    if(message.trim() == '') return;

    PageChat.socket.emit('message', message);
    PageChat.input_message.value = '';



  }

  //btn_enterchat handler
  enterChat(){
    if(PageChat.connectedToChat > 0 ) return;
    let username = document.getElementById("input_name").value;
    if(username.trim() == ''){
      this.noName();
      return;
    }

    //hide enter chat dialog and show chat page
    this.div_entername.classList.add('hidden');
    this.div_chat.classList.remove('hidden');
    PageChat.connectedToChat = 1;
  //  console.log(this.connectedToChat);
    PageChat.socket.emit('connect to chat', username);

  }

  //no name entered
  noName(){
    console.log("Please Enter name");
  }
}


//static class variables (singleton DER HIGHLANDER (Es kann nur einen geben))
PageChat.connectedToChat = 0;
PageChat.socket = null;
PageChat.chatlog = '';
PageChat.btn_send = null;
PageChat.ids = 0;
PageChat.btn_enterchat = null;
PageChat.btn_send = null;
PageChat.input_message = null;
