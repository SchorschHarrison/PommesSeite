"use strict"

class PageGibtEsPommes {

// Konstuktor der die Daten vom Server läd und die Textelemente definiert
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

//sorgt dafür, dass man den Inhalt der Seite sehen kann
  show(){
    this._mainElement.classList.remove("hidden");
  }
// sorgt dafür, dass man den Inhalt der Seite nicht sieht
  hide(){
    this._mainElement.classList.add("hidden");
  }

//  Wenn der Server Pommes im HTML Code der Seite Imensa erkennt wird der Metode Pommes Anzeige der wert 1 mitgegeben
// Wird der Methode 1 mitgegeben, so wird auf der Konsole  gelogt, dass es Pommes gibt und der Text auf der seite bekommt den Inhalt Ja; wenn nicht dann nein
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
