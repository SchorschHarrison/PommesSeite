/*JavaScript Datei, welche index.html steuert*/
/**
 * Klasse App: Steuert die gesamte Anwendung
 *
 * Diese Klasse kümmert sich darum, dass die vom Anwender ausgewählte Seite
 * angezeigt wird. Welche Seite angezeigt wird, macht sie im Kopfbereich der Seite kenntlich.
 */

"use strict";

class App {
  /**
   * Konstruktor.
   * @param {Liste} pages Seiten, zwischen denen umgeschaltet werden kann
   */
  constructor(pages) {
      // Verfügbare Seiten und Steuerobjekt der aktuellen Seite
      this._pages = pages;
      this._currentPageObject = null;
      // Interne Methode zum Rendern des Menüs aufrufen
      this._renderMenu();
      }

      ////
      //// Umschalten der aktuell sichtbaren Seite
      ////

      /**
       * Tablaschen zum Umschalten der aktuellen Seite anzeigen. (Interne Methode)
       */
       _renderMenu() {
           let ul = document.querySelector("#app-menu > ul");       //Menüreiter anzeigen
           let template = document.getElementById("template-app-menu-li").innerHTML;

           this._pages.forEach(page => {
               // Versteckte Seiten überspringen
               if (page.hidden) return;

               // Neues Element auf Basis des Templates erzeugen
                 let dummy = document.createElement("ul");

                 dummy.innerHTML = template;
                 dummy.innerHTML = dummy.innerHTML.replace("$NAME$", page.name);
                 dummy.innerHTML = dummy.innerHTML.replace("$LABEL$", page.label);

                 // Event Listener auf das <li>-Element registrieren
                 let li = dummy.firstElementChild;
                 li.addEventListener("click", () => this.showPage(page.name));

                 // Element nun in das Menü umhängen
                 dummy.removeChild(li);
                 ul.appendChild(li);
             });
         }

         /**
          * Umschalten der sichtbaren Seite.
          *
          * @param  {String} name Name der anzuzeigenden Seite, gemäß this.pages
          * @param  {Integer} editIndex Nummer des bearbeiteten Datensatzes (optional)
          */

          showPage(name, editIndex) {
              // Gewünschte Seite suchen
              let newPage = this._pages.find(p => p.name === name);
              
              if (newPage === undefined) {
                  console.error(`Klasse App, Methode showPage(): Ungültige Seite „${name}”`);
                  return;
              }

              // Aktuelle Seite ausblenden
              if (this._currentPageObject != null) {
                  this._currentPageObject.hide();
              }

              // Neue Seite anzeigen und merken
              this._currentPageObject = new newPage.klass(this, name, editIndex);
              console.log(this._currentPageObject);
              this._currentPageObject.show();

              // Aktuelle Seite im Kopfbereich hervorheben
              document.querySelectorAll("#app-menu li").forEach(li => li.classList.remove("active"));
              document.querySelectorAll(`#app-menu li[data-page-name="${name}"]`).forEach(li => li.classList.add("active"));
          }





}
