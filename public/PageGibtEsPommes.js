class PageGibtEsPommes {


  constructor(app, name) {
    this._app = app;
    this.name = name;
    this._mainElement = document.getElementById("main-page-gibtespommes");
    if(PageGibtEsPommes.socket == '') PageGibtEsPommes.socket = io.connect("http://localhost:80");

    //console.log(PageGibtEsPommes.socket.id);
    PageGibtEsPommes.socket.on('gibt es heute pommes', (pommes) => this.pommesAnzeige(pommes));
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
    }else{
      console.log("Keine Pommes! :(");
    }
  }
}

PageGibtEsPommes.socket = '';
