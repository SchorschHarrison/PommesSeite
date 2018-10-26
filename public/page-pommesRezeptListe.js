"use strict";

/**
 * Klasse PagePommesRezeptListe: JavaScript für Inhalt von RezeptStartseite
 * Stellt die Listenübersicht über Rezepte zur Verfügung
 *
 * Diese Klasse wird von der App-Klasse zu bestimmten Zeitpunkten instantiiert
 * und aufgerufen
 */

class PagePommesRezeptListe{

  constructor(app) {
      this._app = app;
      this._mainElement = document.getElementById("main-page-rezepte"); //geht in index.html in die main von Rezepte Startseite
  }

  show() {

      this._mainElement.classList.remove("hidden");
  }


  hide() {
      this._mainElement.classList.add("hidden");
  }


}
