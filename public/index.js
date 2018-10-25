let socket;
let div_entername;
let div_chat;
let input_message;
let chatlog = [];
let textArea_chatlog;
let btn_send;


function initChat(){
  console.log("Chat initilizing...");
  socket = io.connect('http://localhost:80');
  div_entername = document.getElementById("entername");
  div_chat = document.getElementById("chat");
  input_message = document.getElementById("input_message");
  textArea_chatlog = document.getElementById("textArea_chatlog");
  btn_send = document.getElementById("btn_send");

  input_message.addEventListener("keyup", function(event){
    event.preventDefault();

    if(event.keyCode === 13){
      btn_send.click();
    }
  });

  socket.on('message', function(message){
  //  console.log(message);



    chatlog.push(message);
    if(chatlog.length > 100) chatlog.shift();
  //  addMessageToTextArea(message);
    updateTextArea();
  });

  socket.on('chatlog', function(_chatlog){
    console.log(_chatlog);
    chatlog = _chatlog;
    updateTextArea();
  });
}



function updateTextArea(){
  textArea_chatlog.value = chatlog.join("\n");
  textArea_chatlog.scrollTop = textArea_chatlog.scrollHeight;
}


function send(){
  console.log("pressed Send");

  let message = input_message.value;

  if(message.trim() == '') return;

  socket.emit('message', message);
  input_message.value = '';



}

function enterChat(){
  let username = document.getElementById("input_name").value;
  if(username.trim() == ''){
    noName();
    return;
  }

  div_entername.classList.add('hide');
  div_chat.classList.remove('hide');

  socket.emit('connect to chat', username);

}


function noName(){
  console.log("Please Enter name");
}
