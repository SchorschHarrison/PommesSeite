class PageChat {



  constructor() {
    this.connectedToChat = 0;
    this._mainElement = document.getElementById("main-page-chat");
    if(PageChat.socket == '') PageChat.socket = io.connect('http://localhost:80');
    this.div_entername = document.getElementById("entername");
    this.div_chat = document.getElementById("chat");
    this.input_message = document.getElementById("input_message");
    this.textArea_chatlog = document.getElementById("textArea_chatlog");
    this.btn_send = document.getElementById("btn_send");
    this.btn_enterchat = document.getElementById("btn_enterchat");
    this.chatlog = [];


    this.btn_enterchat.addEventListener("click", () => this.enterChat());
    this.input_message.addEventListener("keyup", (event) => this.enterPressed(event));
    this.btn_send.addEventListener("click", () => this.send());


    PageChat.socket.on('message', (message) => this.recieveMessage(message));
    PageChat.socket.on('chatlog', (_chatlog) => this.recieveChatlog(_chatlog));
    //PageChat.socket.on('gibt es heute pommes', (pommes) => console.log("Es gibt Pommes!: " + pommes));

    this.div_chat.classList.add("hidden");
    //PageChat.socket.emit('gibt es heute pommes');

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
  }

  recieveChatlog(_chatlog){
    console.log(_chatlog);
    this.chatlog = _chatlog;
    this.updateTextArea();
  }

  enterPressed(event){
    event.preventDefault();

    if(event.keyCode === 13){
      this.btn_send.click();
    }
  }

  recieveMessage(message){
    this.chatlog.push(message);
    if(this.chatlog.length > 100) this.chatlog.shift();
  //  addMessageToTextArea(message);
    this.updateTextArea();
  }

  updateTextArea(){
    this.textArea_chatlog.value = this.chatlog.join("\n");
    this.textArea_chatlog.scrollTop = this.textArea_chatlog.scrollHeight;
  }


  send(){
    console.log("pressed Send");

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
PageChat.socket = '';
