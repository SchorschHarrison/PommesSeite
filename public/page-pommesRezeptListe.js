

class PagePommesRezeptListe {


  constructor(app) {
    this._app = app;
    this._mainElement = document.getElementById("main-page-rezepte");
  //  PagePommesRezeptListe._currentDialoge = null;
//    this.currentDialoge_new = null;
    if(PagePommesRezeptListe.btn_neuesRezept == null){
      PagePommesRezeptListe.btn_neuesRezept = document.getElementById("new_button");
      PagePommesRezeptListe.btn_neuesRezept.addEventListener("click", () => this.neuesRezept());
      //console.log(PagePommesRezeptListe.btn_neuesRezept);
    }
    this._renderList();
  }



  show(){
    this._mainElement.classList.remove("hidden");
  }


  hide(){
    this._mainElement.classList.add("hidden");
    if(PagePommesRezeptListe._currentDialoge != null ) {
      PagePommesRezeptListe._currentDialoge.hide();
      PagePommesRezeptListe._currentDialoge = null;
    }
  }


  _renderList(){
    this._rezepte = this._app.getRezepte();
    let ol = document.getElementById("ol_rezepte");
    ol.innerHTML = "";

    if(this._rezepte.length < 1){
      let template = document.getElementById("template-page-list-empty").innerHTML;
      ol.innerHTML = template;
      return;
    }

    let template = document.getElementById("template-rezept-data").innerHTML;
    let index = -1;

    this._rezepte.forEach(dataset => {
        index++;
        //console.log(dataset);
        let dummy = document.createElement("div");
        dummy.innerHTML = template;
        dummy.innerHTML = dummy.innerHTML.replace("$INDEX$", index);
        dummy.innerHTML = dummy.innerHTML.replace("$REZEPT_NAME$" , dataset.rezept_name);
        dummy.innerHTML = dummy.innerHTML.replace("$ZUTATEN$" , dataset.zutaten);
        dummy.innerHTML = dummy.innerHTML.replace("$ZUBEREITUNG$" , dataset.zubereitung);
        dummy.innerHTML = dummy.innerHTML.replace("$IMAGE$", dataset.image);
        //// TODO: Add _addEventListeners


       let _addEventListeners = (index) => {
            // Event Listener für <div class="action edit"> registrieren
            let editButton = dummy.querySelector(".action.edit");
            //editButton.addEventListener("click", () => this._app.showPage("page-edit", index));

            editButton.addEventListener("click", () => this._showEditDialog(index));


            // Event Listener für <div class="action delete"> registrieren
            let deleteButton = dummy.querySelector(".action.delete");
            deleteButton.addEventListener("click", () => this._askDelete(index));
        };




        _addEventListeners(index);


        let li = dummy.firstElementChild;

        if (li) {
            dummy.removeChild(li);
            ol.appendChild(li);
        }
    }


  );

  }

  _showEditDialog(index){
    this.hide();
    let editDialog = new PageRezeptEdit(this._app, "page_edit", index, this);
    PagePommesRezeptListe._currentDialoge = editDialog;
    console.log(editDialog);
    editDialog.show();
  }

  _showEditDialog2(index){
    this.hide();
    let editDialog = new PageRezeptEdit(this._app, "page_edit", index, this);
    PagePommesRezeptListe._currentDialoge_new = editDialog;
    console.log(editDialog);
    editDialog.show();
  }

  _askDelete(index){
    let answer = confirm("Soll das ausgewählte Rezept wirklich gelöscht werden?");
    if (!answer) return;

    this._app.loescheRezept(index);

    console.log("delete: " + index);
    this._renderList();
  }

  neuesRezept(){
    this._showEditDialog(-1);
  }

  showChanges(){
    console.log("chchchchchaaangees");
    this.show();
    PagePommesRezeptListe._currentDialoge.hide();
    this._renderList();
  }

}

PagePommesRezeptListe.btn_neuesRezept = null;
PagePommesRezeptListe._currentDialoge = null;
