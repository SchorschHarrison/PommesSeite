class PageImageSelect {

  constructor(app, pageName, list ,selectedImage) {
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

  _renderDialog(){
    let template = document.getElementById("template-img-dialog").innerHTML;
    this._mainElement.innerHTML = template;
    this._btn_save = this._mainElement.querySelector(".action.savePicture");

    let string = "input[value=" + '"' + this._selectedImage + '"]';
    let btn = this._mainElement.querySelector(string).checked = "checked";

    //speichern von value des ausgewählten radioButtons
    //let btn_group =  this._mainElement.querySelector('input[name="Gallerie"]:checked').value;   //document.getElementById('rates').value;
    this._btn_save.addEventListener("click", () => this.save());

  }


  save(){

    let image =  this._mainElement.querySelector('input[name="Gallerie"]:checked').value;
    this.list.updateImage(image);
  }


}
