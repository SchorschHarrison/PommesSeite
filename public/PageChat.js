class PageChat {



  constructor(app, name) {
    this.id = PageChat.ids;
    this._app = app;
    this.name = name;
    this.connectedToChat = 0;
    this._mainElement = document.getElementById("main-page-chat");
    this.div_entername = document.getElementById("entername");
    this.div_chat = document.getElementById("chat");
    this.input_message = document.getElementById("input_message");
    this.textArea_chatlog = document.getElementById("textArea_chatlog");
    if(PageChat.btn_send == '') PageChat.btn_send= document.getElementById("btn_send");
    this.btn_enterchat = document.getElementById("btn_enterchat");
    if(PageChat.chatlog == '') PageChat.chatlog = [];


    this.btn_enterchat.addEventListener("click", () => this.enterChat());
    this.input_message.addEventListener("keyup", (event) => this.enterPressed(event));
    PageChat.btn_send.addEventListener("click", () => this.send());

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

  hide(){
    this._mainElement.classList.add("show");
    this.div_entername.classList.add("hidden");
    this.div_chat.classList.add("hidden");
  //  PageChat.socket = null;
  }

  recieveChatlog(_chatlog){
    console.log(_chatlog);
    PageChat.chatlog = _chatlog;
    this.updateTextArea();
  }

  enterPressed(event){
    event.preventDefault();

    if(event.keyCode === 13){
      PageChat.btn_send.click();
    }
  }

  recieveMessage(message){
    console.log("recieved something");
    PageChat.chatlog.push(message);
    if(PageChat.chatlog.length > 100) PageChat.chatlog.shift();
  //  addMessageToTextArea(message);
    this.updateTextArea();
  }

  updateTextArea(){
    this.textArea_chatlog.value = PageChat.chatlog.join("\n");
    this.textArea_chatlog.scrollTop = this.textArea_chatlog.scrollHeight;
  }


  send(){
    console.log("pressed Send " + this.id);

    let message = input_message.value;

    if(message.trim() == '') return;

    PageChat.socket.emit('message', message);
    this.input_message.value = '';



  }

  enterChat(){
    if(PageChat.connectedToChat > 0 ) return;
    let username = document.getElementById("input_name").value;
    if(username.trim() == ''){
      this.noName();
      return;
    }

    this.div_entername.classList.add('hidden');
    this.div_chat.classList.remove('hidden');
    PageChat.connectedToChat = 1;
  //  console.log(this.connectedToChat);
    PageChat.socket.emit('connect to chat', username);

  }


  noName(){
    console.log("Please Enter name");
  }
}

PageChat.connectedToChat = 0;
PageChat.socket = null;
PageChat.chatlog = '';
PageChat.btn_send = '';
PageChat.ids = 0;
