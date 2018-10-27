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

      this.rezeptName;
      this.zutaten;
      this.zubereitung;

      //Damit die Seiten NewRezept und NewPicture verschwinden, sobald der Tabreiter "Rezepte" gedrückt wird
      this.hideNewRezept();
      this.hideNewPicture();

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

//Button newRezeptButton - wenn click dann zeige "main-page-rezepteNewRezept"
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

//Zurück zu Rezepten von NewRezept Seite
_backToRezept(){
  this.hideNewRezept();
  this.show();
}

_goBackToNewRezept(){
  this.showNewRezept();
  this.hideNewPicture();
}

_openNewRezept(){
//Zurücksetzen der Werte
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

_openBildAuswahl() {


this.rezeptName = document.querySelector("#main-page-rezepteNewRezept .rezept_name").value.trim();
this.zutaten = document.querySelector("#main-page-rezepteNewRezept .zutaten").value;
this.zubereitung = document.querySelector("#main-page-rezepteNewRezept .zubereitung").value;

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

//Methode nachdem auf den SaveButton gedrückt wurde
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

  if (this._editIndex > -1) {
      this.updateRezepteByIndex(this._editIndex, this._rezeptNew);
  } else {
      this.appendRezept(this._rezeptNew);
  }
console.log(this._rezepte);


    //Seite NewRezept wieder verstecken
    this.hideNewRezept();
    this.show();
}

//Methode nachdem auf den BildAuswahl-Button gedrückt wurde
_saveBildAndExit(){
  console.log("Button bild speichern läuft");


if (document.querySelector('input[name="Gallerie"]:checked') === null){
  alert("Du musst zuerst ein Bild Auswählen");
  return;
}
let bildNummer =  document.querySelector('input[name="Gallerie"]:checked').value;   //document.getElementById('rates').value;

let imagePfad;

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

if (this._editIndex > -1) {
    this.updateRezepteByIndex(this._editIndex, this._rezeptNew);
} else {
    this.appendRezept(this._rezeptNew);
}


console.log(this._rezepte);
  this.hideNewPicture();
  this.show();
}

_listeRezepteErgaenzen(){
  // Alte Einträge verwerfen
  let ol = document.querySelector("#main-page-rezepte > ol");           //Vorrübergehend
//  ol.innerHTML = "";*/

  // Meldung, wenn noch keine Daten vorhanden sind
  //let data = this._app.getData();

  /*if (_rezepte.length < 1) {                                                                       // ERGÄNZEN!!!
      let template = document.getElementById("template-page-list-empty").innerHTML;
      ol.innerHTML = template;
      return;
  }*/

  // Datensätze einfügen
  let template = document.getElementById("main-page-rezepte").innerHTML;
  let index = -1;

  this._rezepte.forEach(rezeptNew => {
      // Index hochzählen
      index++;
      // Neues Element auf Basis des Templates erzeugen
      let dummy = document.createElement("div");
      dummy.innerHTML = template;

      dummy.innerHTML = dummy.innerHTML.replace("$INDEX$", index);
      dummy.innerHTML = dummy.innerHTML.replace("$RECIPE_NAME$", rezeptNew.rezept_name);
      dummy.innerHTML = dummy.innerHTML.replace("$INGREDIENTS$", rezeptNew.zutaten);
      dummy.innerHTML = dummy.innerHTML.replace("$PREPARATIONOFFOOD$", rezeptNew.zubereitung);
      dummy.innerHTML = dummy.innerHTML.replace("IMAGE", rezeptNew.image); //Bild flexibel

    let _addEventListeners = (index) => {
        // Event Listener für <div class="action edit"> registrieren                                     // ERGÄNZEN!!!
        /*let editButton = dummy.querySelector(".action.edit");
        editButton.addEventListener("click", () => this._app.showPage("page-edit", index));

        // Event Listener für <div class="action delete"> registrieren                                     // ERGÄNZEN!!!
        let deleteButton = dummy.querySelector(".action.delete");
        deleteButton.addEventListener("click", () => this._askDelete(index));*/
    };
    _addEventListeners(index);
    // Eintrag nun anzeigen
    let li = dummy.firstElementChild;
    if (li) {
        dummy.removeChild(li);
        ol.appendChild(li);
    }
    });
}



  show() {
      this._listeRezepteErgaenzen();
      this._mainElement.classList.remove("hidden");
  }


  hide() {
      this._mainElement.classList.add("hidden");
  }

  showNewRezept() {
    console.log("Button neues Rezept läuft");
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








  _askDelete(index) {
      // Sicherheitsfrage zeigen
      let answer = confirm("Bist du dir sicher, dass du dieses großartige Pommes-Rezept löschen möchtest?");
      if (!answer) return;

      // Datensatz löschen
      this._app.deleteRezepteByIndex(index);

      // Liste neu ausgeben
      this._renderList();
  }


  /*getRezepte() {
      return this._rezepte;
  }*/

  getRezepteByIndex(index) {
      return this._rezepte[index];
  }

  updateRezepteByIndex(index, rezeptNew) {
      this._rezepte[index] = rezeptNew;
  }

  deleteRezepteByIndex(index) {
        this._rezepte.splice(index, 1);
  }

  appendRezept(rezeptNew) {
      this._rezepte.push(rezeptNew);
      return this._rezepte.length - 1;
  }




}
