"use strict"

class PageGibtEsPommes {


  constructor(app, name) {
    this._app = app;
    this.name = name;


    this.answer = null;
    this.answer_span = document.getElementById('answer');
    this.answer_span.innerHTML = this.answer;
    this._mainElement = document.getElementById("main-page-gibtespommes");
    if(PageGibtEsPommes.socket == ''){
      PageGibtEsPommes.socket = io.connect("http://localhost:80");
      //console.log(PageGibtEsPommes.socket.id);
      PageGibtEsPommes.socket.on('gibt es heute pommes', (pommes) => this.pommesAnzeige(pommes));
    }



    PageGibtEsPommes.socket.emit('gibt es heute pommes');
  }


  show(){
    this._mainElement.classList.remove("hidden");
  }

  hide(){
    this._mainElement.classList.add("hidden");
  }


  pommesAnzeige(pommes){
    if(pommes == 1){
      console.log("Pommes! :D");
      this.answer_span.innerHTML = "ja";
      console.log(this.answer);
    }else{
      console.log("Keine Pommes! :(");
      this.answer_span.innerHTML = "nein";
      console.log(this.answer);
    }
  }
}

PageGibtEsPommes.socket = '';
