/*
 * Klasse PageImageSelect: Funktionalitäten um das Bild zu wechseln
 */
class PageImageSelect {

  constructor(app, pageName, list ,selectedImage) {
    //Werte übergeben
    this._mainElement = document.getElementById("main-page-rezepteNewPicture");
    this._selectedImage = selectedImage;
    this.list = list;
    this._renderDialog();
  }


  hide(){
    this._mainElement.classList.add("hidden");
  }

  show(){
    this._mainElement.classList.remove("hidden");
  }

//Hauptfunktion dieser Klasse
  _renderDialog(){
     //Template von Bilder-Gallerie wird eingefügt
    let template = document.getElementById("template-img-dialog").innerHTML;
    this._mainElement.innerHTML = template;

    //Save-Button verbinden
    this._btn_save = this._mainElement.querySelector(".action.savePicture");

   //Bildauswahl
    let string = "input[value=" + '"' + this._selectedImage + '"]';
    let btn = this._mainElement.querySelector(string).checked = "checked";

    //speichern von value des ausgewählten radioButtons
    this._btn_save.addEventListener("click", () => this.save());

  }


  save(){
//Speichern von ausgewähltem Bild und Bild updaten
    let image =  this._mainElement.querySelector('input[name="Gallerie"]:checked').value;
    this.list.updateImage(image);
  }


}
