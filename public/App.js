class App {
  constructor() {


    this._pages = [  // hier sind alle Klassen(Seiten) drin
      { //Startseite - zeigt an ob es heute Pommes gibt oder nicht
        name: "page-list", // Name zum Aufrufen der Seite
        klass: PageGibtEsPommes, // Klasse, die die Seite bereitstellt
        label: "ÜBERSICHT", // Bezeichnung der Seite
        hidden: false, // Seite kann im Menü ausgewählt werden
      },
      { //Chat-Seite
        name: "page-chat", // Name zum Aufrufen der Seite
        klass: PageChat, // Klasse, die die Seite bereitstellt
        label: "CHAT", // Bezeichnung der Seite
        hidden: false, // Seite kann im Menü ausgewählt werden
      },
      {    //Seite zu GameOne
          name: "page-GameOne",               // Name zum Aufrufen der Seite
          klass: PageGameOne,                 // Klasse, die die Seite bereitstellt
          label: "POMMESSPIEL",      // Bezeichnung der Seite
          hidden: false,                      // Seite kann im Menü ausgewählt werden
      },
      {    //Seite zu PommesRezepten Standardseite
          name: "page-PommesRezeptListe",
          klass: PagePommesRezeptListe,
          label: "REZEPTE",
          hidden: false,                       // Seite kann im Menü ausgewählt werden
      },
      {    //Seite zu PommesRezepten Standardseite  Erweiterung 1                                         TEST
          name: "main-page-rezepteNewRezept",
          klass: PagePommesRezeptListe,       //PagePommesRezeptListe wurde nicht versteckt
          label: "",
          hidden: true,                       // Seite kann im Menü ausgewählt werden
      },
      {    //Seite zu PommesRezepten Standardseite  Erweiterung  2                                        TEST
          name: "main-page-rezepteNewPicture",
          klass: PagePommesRezeptListe,
          label: "",
          hidden: true,                       // Seite kann im Menü ausgewählt werden
      },
    ];


    this._rezepte = [
      {
        rezept_name: "Pommes süß-sauer",
        zutaten: "eine Kartoffel, zwei Süßstoff, zwei TL Säuerungsmittel",
        zubereitung: "1. Kartoffeln mit Schale in etwa gleich große Stifte schneiden. Mit dünnen Stiften werden die Pommes knusprig, bei dickeren Stiften bleiben sie saftig. 2. Wasser in eine große Schüssel füllen und die Pommes gut waschen, um die Stärke abzuwaschen. Danach in einem Sieb abtropfen lassen.",
        image: 0,
    },
    {
        rezept_name: "Pommes standard",
        zutaten: "2kg Kartoffeln, 1L Wasser",
        zubereitung: "1. Pommes auf einem Backblech verteilen und in der Speisestärke wälzen. Das macht die Pommes knuspriger. 2. Zubereitung im Backofen: die Kartoffelstifte bei 200°C für ca. 30 Minuten backen. Drehen Sie die Pommes nach der Hälfte der Zeit einmal um, damit sie gleichmäßig garen.",
        image: 0,
    }

    ];






    this._currentPageObject = null;
    this._renderMenu();

  }

  getRezepte(){
    return this._rezepte;
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

  getDataByIndex(index){
    return this._rezepte[index];
  }

  loescheRezept(index){
    this._rezepte.splice(index, 1);
  }

  changeData(index, data){
    this._rezepte[index] = data;
  }

  appendData(data){
    this._rezepte.push(data);
  }
}
