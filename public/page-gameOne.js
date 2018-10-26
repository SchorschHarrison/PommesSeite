"use strict";

/**
 * Klasse PageGameOne: JavaScript für GameOne
 *
 * Diese Klasse wird von der App-Klasse zu bestimmten Zeitpunkten instantiiert
 */

class PageGameOne{

  constructor(app) {
      this._app = app;
      this._mainElement = document.getElementById("main-page-gameOne"); //geht in index.html in die main von GameOne
  }

  show() {

      this._mainElement.classList.remove("hidden");
  }


  hide() {
      this._mainElement.classList.add("hidden");
  }






}
