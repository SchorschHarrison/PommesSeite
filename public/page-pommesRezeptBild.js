"use strict";

/**
 * Klasse PagePommesRezeptBild
 */

class PagePommesRezeptBild{

  constructor(app) {
      this._app = app;
      this._mainElement = document.getElementById("main-page-rezepteBild"); //geht in index.html in die main von rezeptBild
  }

  show() {

      this._mainElement.classList.remove("hidden");
  }


  hide() {
      this._mainElement.classList.add("hidden");
  }


}
