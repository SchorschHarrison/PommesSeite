class PageRezeptEdit {


  constructor(app, pageName, editIndex, list) {
    console.log(pageName + "   "  + editIndex);
    this._app = app;
    this._editIndex = editIndex;
    this._mainElement = document.getElementById("main-page-rezepteNewRezept");
    this._list = list;
    PageRezeptEdit._currentImageDialog = null;

    this._dataset =  {
        rezept_name: "",
        zutaten: "",
        zubereitung: "",
        image: 0,
    };


    if(this._editIndex > -1){
      let dataset = this._app.getDataByIndex(this._editIndex);

      this._dataset.rezept_name = dataset.rezept_name;
      this._dataset.zutaten = dataset.zutaten;
      this._dataset.zubereitung = dataset.zubereitung;
      this._dataset.image = dataset.image;
    }

    this._zeigeEditDialog();


  }


  _zeigeEditDialog(){
    this._mainElement.innerHTML = "";

    let template = document.getElementById("template-edit-rezept").innerHTML;
    this._mainElement.innerHTML = template;

    this._mainElement.innerHTML = this._mainElement.innerHTML.replace("$RECIPE_NAME$", this._dataset.rezept_name);
    this._mainElement.innerHTML = this._mainElement.innerHTML.replace("$INGREDIENTS$", this._dataset.zutaten);
    this._mainElement.innerHTML = this._mainElement.innerHTML.replace("$PREPARATIONOFFOOD$", this._dataset.zubereitung);
    this._mainElement.innerHTML = this._mainElement.innerHTML.replace("$IMAGE$", this._dataset.image);

    console.log(this._mainElement.innerHTML);

    let btn_save = this._mainElement.querySelector(".action.save");
    btn_save.addEventListener("click" , () => this.saveChanges());


    let btn_img = this._mainElement.querySelector(".action.bild");
    btn_img.addEventListener("click", () => this.openImageDialog());

    let btn_back = this._mainElement.querySelector(".action.back");
    btn_back.addEventListener("click", () => this.back());

  }

  hide(){
    this._mainElement.classList.add("hidden");


    if(PageRezeptEdit._currentImageDialog != null){
      PageRezeptEdit._currentImageDialog.hide();
      PageRezeptEdit._currentImageDialog = null;
    }

  }


  show(){
    this._mainElement.classList.remove("hidden");
  }


  openImageDialog(){
    let name = this._mainElement.querySelector(".rezept_name").value.trim();
    let zutaten = this._mainElement.querySelector(".zutaten").value.trim();
    let zubereitung = this._mainElement.querySelector(".zubereitung").value.trim();

    this._dataset.rezept_name = name;
    this._dataset.zutaten = zutaten;
    this._dataset.zubereitung = zubereitung;

    this.hide();
    let dialog = new PageImageSelect(this._app, "img_select", this, this._dataset.image);
    PageRezeptEdit._currentImageDialog = dialog;
    dialog.show();
  }


  updateImage(image){
    this._dataset.image = image;
    this._zeigeEditDialog();
    PageRezeptEdit._currentImageDialog.hide();
    this.show();
  }


  saveChanges(){
    console.log("saving...");

    let name = this._mainElement.querySelector(".rezept_name").value.trim();
    let zutaten = this._mainElement.querySelector(".zutaten").value.trim();
    let zubereitung = this._mainElement.querySelector(".zubereitung").value.trim();


    if(name == ""){
      alert("Gib bitte einen Rezeptnamen ein!");
      return;
    }

    if(zutaten == ""){
      alert("Gib bitte eine Zutat ein!");
      return;
    }

    if(zubereitung == ""){
      alert("Wie soll dein Gericht zubereitet werden?");
      return;
    }


    this._dataset.rezept_name = name;
    this._dataset.zutaten = zutaten;
    this._dataset.zubereitung = zubereitung;




    if(this._editIndex > -1){
      this._app.changeData(this._editIndex, this._dataset);
    }else{
      this._app.appendData(this._dataset);
    }

    this._list.showChanges();
  }

  back(){
    this._list.showChanges();
  }

}

PageRezeptEdit._currentImageDialog = null;
