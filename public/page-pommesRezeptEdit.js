"use strict";

/**
 * Klasse PagePommesRezeptEdit
 */

class PagePommesRezeptEdit{

  constructor(app) {
      this._app = app;
      this._mainElement = document.getElementById("main-page-rezepteEdit"); //geht in index.html in die main von rezeptEdit
  }

  show() {

      this._mainElement.classList.remove("hidden");
  }


  hide() {
      this._mainElement.classList.add("hidden");
  }





}
