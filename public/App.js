class App {
  constructor() {


    this._pages = [  // hier sind alle Klassen(Seiten) drin
      { //Startseite - zeigt an ob es heute Pommes gibt oder nicht
        name: "page-list", // Name zum Aufrufen der Seite
        klass: PageGibtEsPommes, // Klasse, die die Seite bereitstellt
        label: "Übersicht", // Bezeichnung der Seite
        hidden: false, // Seite kann im Menü ausgewählt werden
      },
      { //Chat-Seite
        name: "page-chat", // Name zum Aufrufen der Seite
        klass: PageChat, // Klasse, die die Seite bereitstellt
        label: "Chat", // Bezeichnung der Seite
        hidden: false, // Seite kann im Menü ausgewählt werden
      },
      {    //Seite zu GameOne
          name: "page-GameOne",               // Name zum Aufrufen der Seite
          klass: PageGameOne,                 // Klasse, die die Seite bereitstellt
          label: "Lustiges Pommesspiel",      // Bezeichnung der Seite
          hidden: false,                      // Seite kann im Menü ausgewählt werden
      },
      { 	 //Seite zu PommesStartseiteNew
          name: "page-PommesStartseiteNew",
          klass: PagePommesRezeptListe,
          label: "Rezepte anzeigen",
          hidden: false,                      // Seite kann im Menü ausgewählt werden
      },
      {    //Seite zu PommesRezepten Standardseite
          name: "page-PommesRezeptListe",
          klass: PagePommesRezeptListe,
          label: "<a>Pommes Rezepte</a>",
          hidden: true,                       // Seite kann im Menü ausgewählt werden
      },
      { 	 //Seite zu PommesRezeptenNew
          name: "page-PommesRezeptNew",
          klass: PagePommesRezeptEdit,
          label: "Neues Rezept hinzufügen",
          hidden: false,                      // Seite kann im Menü ausgewählt werden
      },
      {   //Seite zu PommesRezeptenEdit
          name: "page-PommesRezeptEdit",
          klass: PagePommesRezeptEdit,
          hidden: true,                      // Seite kann im Menü NICHT ausgewählt werden
      },
      {   //Seite zu PommesRezeptenBild
          name: "page-PommesRezeptBild",
          klass: PagePommesRezeptBild,
          label: "Bild aussuchen",
          hidden: true,                   // Seite kann im Menü NICHT ausgewählt werden
      },
    ]



    this._currentPageObject = null;
    this._renderMenu();

  }


  _renderMenu() {
      let ul = document.querySelector("#app-menu > ul");    //Menüreiter anzeigen
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


  showPage(name, editIndex) {
      // Gewünschte Seite suchen
      let newPage = this._pages.find(p => p.name === name);


      if (newPage === undefined) {
          console.error(`Klasse App, Methode showPage(): Ungültige Seite „${name}”`);
          return;
      }

      // Aktuelle Seite ausblenden
      if(this._currentPageObject != null){
        if(this._currentPageObject.name === newPage.name){
          console.log("samePage");
          return;
        }
      }


      // Aktuelle Seite ausblenden
      if (this._currentPageObject != null) {
          this._currentPageObject.hide();
      }

      // Neue Seite anzeigen und merken
      this._currentPageObject = new newPage.klass(this, name, editIndex);
      this._currentPageObject.show();

      // Aktuelle Seite im Kopfbereich hervorheben
      document.querySelectorAll("#app-menu li").forEach(li => li.classList.remove("active"));
      document.querySelectorAll(`#app-menu li[data-page-name="${name}"]`).forEach(li => li.classList.add("active"));
  }
}
