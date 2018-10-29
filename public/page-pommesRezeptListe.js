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
      this._newRezeptElement = document.getElementById("main-page-rezepteNewRezept");
      this._newPictureElement = document.getElementById("main-page-rezepteNewPicture");
      this._newButtonElement = document.getElementById("main-page-rezepteNewButton");

      this.rezeptName;
      this.zutaten;
      this.zubereitung;

      //Damit die Seiten NewRezept und NewPicture verschwinden, sobald der Tabreiter "Rezepte" gedrückt wird
      this.hideNewRezept();
      this.hideNewPicture();

      	//Voreingetragene Rezepte
this._rezepte = [
    {
        rezept_name: "Pommes süß-sauer",
        zutaten: "eine Kartoffel, zwei Süßstoff, zwei TL Säuerungsmittel",
        zubereitung: "1. Kartoffeln mit Schale in etwa gleich große Stifte schneiden. Mit dünnen Stiften werden die Pommes knusprig, bei dickeren Stiften bleiben sie saftig. 2. Wasser in eine große Schüssel füllen und die Pommes gut waschen, um die Stärke abzuwaschen. Danach in einem Sieb abtropfen lassen.",
        image: "pommesBilder/pommesStandard.png",
    },
    {
        rezept_name: "Pommes standard",
        zutaten: "2kg Kartoffeln, 1L Wasser",
        zubereitung: "1. Pommes auf einem Backblech verteilen und in der Speisestärke wälzen. Das macht die Pommes knuspriger. 2. Zubereitung im Backofen: die Kartoffelstifte bei 200°C für ca. 30 Minuten backen. Drehen Sie die Pommes nach der Hälfte der Zeit einmal um, damit sie gleichmäßig garen.",
        image: "pommesBilder/pommesStandard.png",
    },
    ];

    //Buttons, Verknüpfung mit Event-Listener, Aufruf der Funktionen wenn click
    let newRezeptButton = document.getElementById("new_button");
    newRezeptButton.addEventListener("click", () => this._openNewRezept());

    let backToRezeptButton = document.getElementById("back_buttonToRezepte");
    backToRezeptButton.addEventListener("click", () => this._backToRezept());

    let saveButton = this._newRezeptElement.querySelector(".action.save");
    saveButton.addEventListener("click", () => this._saveAndExit());

    let bildButton = this._newRezeptElement.querySelector(".action.bild");
    bildButton.addEventListener("click", () => this._openBildAuswahl());

    let backButton = this._newPictureElement.querySelector(".action.goBack");
    backButton.addEventListener("click", () => this._goBackToNewRezept());

    let saveBildButton = this._newPictureElement.querySelector(".action.savePicture");
    saveBildButton.addEventListener("click", () => this._saveBildAndExit());

  }

//hier kann die _renderMenu
startFunktionRezept(){

}



//Zurück zu Rezepten von NewRezept Seite
_backToRezept(){
  this.hideNewRezept();
  this.show();
}

//Zurück zu neuRezept von newPicture
_goBackToNewRezept(){
  this.showNewRezept();
  this.hideNewPicture();
}

//Aufruf von newRezept-Seite nach click auf newButton
_openNewRezept(){
//Zurücksetzen der Werte, damit bei erneutem click auf newButton die alten Werte weg sind
  document.getElementById('rezept_name').value='';
  document.getElementById('zutaten').value='';
  document.getElementById('zubereitung').value='';
  //Zurücksetzen der RadioButtons
  var ele = document.getElementsByName("Gallerie");
   for(var i=0;i<ele.length;i++)
      ele[i].checked = false;


  this.showNewRezept();
  this.hide();
}

//Zu newPicture von newRezept aus
_openBildAuswahl() {
  //eingebene Daten einlesen
  this.rezeptName = document.querySelector("#main-page-rezepteNewRezept .rezept_name").value.trim();
  this.zutaten = document.querySelector("#main-page-rezepteNewRezept .zutaten").value;
  this.zubereitung = document.querySelector("#main-page-rezepteNewRezept .zubereitung").value;

  //Fehlende Eingaben abfangen
  if (this.rezeptName === "") {
      alert("Du musst zuerst einen Rezeptnamen eintragen.");
      return;
  }
  if (this.zutaten === "") {
      alert("Gib mindestens eine Zutat ein.");
      return;
  }
  if (this.zubereitung === "") {
      alert("Und wie wird das alles zubereitet?");
      return;
  }

  this.showNewPicture();
  this.hideNewRezept();
  this.hide();
}

//Zurück zu Rezepten von NewRezept Seite + speichern der Werte in Array
_saveAndExit(){
  //eingebene Daten einlesen
   this.rezeptName = document.querySelector("#main-page-rezepteNewRezept .rezept_name").value.trim();
   this.zutaten = document.querySelector("#main-page-rezepteNewRezept .zutaten").value;
   this.zubereitung = document.querySelector("#main-page-rezepteNewRezept .zubereitung").value;

//dieses Bild wird nur verwendet, wenn kein anderes Bild über anderen Button ausgewählt wurde
  let imageDefault = "pommesBilder/pommesStandard.png"

  //Fehlende Eingaben abfangen
  if (this.rezeptName === "") {
      alert("Du musst zuerst einen Rezeptnamen eintragen.");
      return;
  }
  if (this.zutaten === "") {
      alert("Gib mindestens eine Zutat ein.");
      return;
  }
  if (this.zubereitung === "") {
      alert("Und wie wird das alles zubereitet?");
      return;
  }

//_rezeptNew initialisieren
  this._rezeptNew = {
      rezept_name: "",
      zutaten: "",
      zubereitung: "",
      image: "",
  };

  // Rezept speichern
  this._rezeptNew.rezept_name = this.rezeptName;
  this._rezeptNew.zutaten = this.zutaten;
  this._rezeptNew.zubereitung = this.zubereitung;
  this._rezeptNew.image = imageDefault;

  //Rezept hinzufügen zu Array
  if (this._editIndex > -1) {
      this.updateRezepteByIndex(this._editIndex, this._rezeptNew);
  } else {
      this.appendRezept(this._rezeptNew);
  }

console.log(this._rezepte);

    this.hideNewRezept();
    this.show();
}

//Zurück zu Rezepten von NewPicture Seite + speichern der Werte in Array
_saveBildAndExit(){
  //Fehlende Auswahl abfangen
  if (document.querySelector('input[name="Gallerie"]:checked') === null){
    alert("Du musst zuerst ein Bild Auswählen");
    return;
  }

//speichern von value des ausgewählten radioButtons
  let bildNummer =  document.querySelector('input[name="Gallerie"]:checked').value;   //document.getElementById('rates').value;

//hierin wird der Pfad zum neuen Bild gespeichert
  let imagePfad;

//je nach Auswahl wird entsprechendes Bild gespeichert
  switch(bildNummer) {
    case 'Bild0':
        imagePfad="pommesBilder/pommesStandard.png";
        break;
    case 'Bild1':
        imagePfad="pommesBilder/pommes1.png";
        break;
    case 'Bild2':
        imagePfad="pommesBilder/pommes2.png";
        break;
    case 'Bild3':
        imagePfad="pommesBilder/pommes31.png";
        break;
    case 'Bild4':
        imagePfad="pommesBilder/pommes4.png";
        break;
    case 'Bild5':
        imagePfad="pommesBilder/pommes5.png";
        break;
    case 'Bild6':
        imagePfad="pommesBilder/pommes6.png";
        break;
    case 'Bild7':
        imagePfad="pommesBilder/pommes7.png";
        break;
    case 'Bild8':
        imagePfad="pommesBilder/pommes8.png";
        break;
    case 'Bild9':
        imagePfad="pommesBilder/pommes9.png";
        break;
    case 'Bild10':
        imagePfad="pommesBilder/pommes10.png";
        break;
    case 'Bild11':
        imagePfad="pommesBilder/pommes11.png";
        break;
}

//_rezeptNew initialisieren
  this._rezeptNew = {
      rezept_name: "",
      zutaten: "",
      zubereitung: "",
      image: "",
  };
// Rezept speichern
this._rezeptNew.rezept_name = this.rezeptName;
this._rezeptNew.zutaten = this.zutaten;
this._rezeptNew.zubereitung = this.zubereitung;
this._rezeptNew.image = imagePfad;

//Rezept hinzufügen zu Array
  if (this._editIndex > -1) {
      this.updateRezepteByIndex(this._editIndex, this._rezeptNew);
  } else {
      this.appendRezept(this._rezeptNew);
  }

console.log(this._rezepte);

  this.hideNewPicture();
  this.show();
}


//Show und Hide-Funktionen
  show() {
    this.showNewButton();
    this._mainElement.classList.remove("hidden");
    this.startFunktionRezept();
  }

  hide() {
    this.hideNewButton();
    this._mainElement.classList.add("hidden");
  }

  showNewRezept() {
    this._newRezeptElement.classList.remove("hidden");
  }

  hideNewRezept() {
    this._newRezeptElement.classList.add("hidden");
  }

  showNewPicture() {
    this._newPictureElement.classList.remove("hidden");
  }

  hideNewPicture() {
    this._newPictureElement.classList.add("hidden");
  }

  showNewButton() {
    this._newButtonElement.classList.remove("hidden");
  }

  hideNewButton() {
    this._newButtonElement.classList.add("hidden");
  }






//noch nicht genutzter löschen-Code
  _askDelete(index) {
      // Sicherheitsfrage zeigen
      let answer = confirm("Bist du dir sicher, dass du dieses großartige Pommes-Rezept löschen möchtest?");
      if (!answer) return;

      // Datensatz löschen
      this._app.deleteRezepteByIndex(index);

      // Liste neu ausgeben
      this._renderList();
  }


//Mehrfach verwendeter Code, daher ausgelagert
  updateRezepteByIndex(index, rezeptNew) {
      this._rezepte[index] = rezeptNew;
  }
  appendRezept(rezeptNew) {
      this._rezepte.push(rezeptNew);
      return this._rezepte.length - 1;
  }
//noch nicht genutzter Code zum löschen von Rezepten
  deleteRezepteByIndex(index) {
        this._rezepte.splice(index, 1);
  }


}
