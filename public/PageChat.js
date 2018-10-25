class PageChat {



  constructor() {
    this.socket = io.connect('http://localhost:80');
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


    this.socket.on('message', (message) => this.recieveMessage(message));
    this.socket.on('chatlog', (_chatlog) => this.recieveChatlog(_chatlog));

    this.div_chat.classList.add("hide");

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

    this.socket.emit('message', message);
    this.input_message.value = '';



  }

  enterChat(){
    let username = document.getElementById("input_name").value;
    if(username.trim() == ''){
      this.noName();
      return;
    }

    this.div_entername.classList.add('hide');
    this.div_chat.classList.remove('hide');

    this.socket.emit('connect to chat', username);

  }


  noName(){
    console.log("Please Enter name");
  }



}
