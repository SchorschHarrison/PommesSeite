"use strict";

class PageAppInhalt{

  constructor(app) {
      this._app = app;
      this._mainElement = document.getElementById("main-page-app"); //geht in index.html in die main von App Startseite
  }

  show() {

      this._mainElement.classList.remove("hidden");
  }


  hide() {
      this._mainElement.classList.add("hidden");
  }

    /*show(){
      console.log("salli");
    }*/
}
