

class PagePommesRezeptListe {


  constructor(app) {
    this._app = app;
    this._mainElement = document.getElementById("main-page-rezepte");

    //Button wird neuem ActionListener zugeordnet wenn vorher keine Instanz der Klasse existiert
    if(PagePommesRezeptListe.btn_neuesRezept == null){
      PagePommesRezeptListe.btn_neuesRezept = document.getElementById("new_button");
      PagePommesRezeptListe.btn_neuesRezept.addEventListener("click", () => this.neuesRezept());
    }

    //Aufruf der Hauptfunktion
    this._renderList();
  }

  show(){
    this._mainElement.classList.remove("hidden");
  }

  hide(){
    this._mainElement.classList.add("hidden");

    //falls ein Dialog offen ist soll dieser versteckt werden
    if(PagePommesRezeptListe._currentDialoge != null ) {
      PagePommesRezeptListe._currentDialoge.hide();
      PagePommesRezeptListe._currentDialoge = null;
    }
  }

//Hauptfunktion
  _renderList(){
    this._rezepte = this._app.getRezepte();
    // Alte Einträge verwerfen
    let ol = document.getElementById("ol_rezepte");
    ol.innerHTML = "";

    //Wenn Rezeptliste leer soll das template für die leere Liste aufgerfen werden
    if(this._rezepte.length < 1){
      let template = document.getElementById("template-page-list-empty").innerHTML;
      ol.innerHTML = template;
      return;
    }

    // Datensätze einfügen
    let template = document.getElementById("template-rezept-data").innerHTML;
    let index = -1;

    this._rezepte.forEach(dataset => {
        index++;

        // Neues Element auf Basis des Templates erzeugen
        let dummy = document.createElement("div");
        dummy.innerHTML = template;
        dummy.innerHTML = dummy.innerHTML.replace("$INDEX$", index);
        dummy.innerHTML = dummy.innerHTML.replace("$REZEPT_NAME$" , dataset.rezept_name);
        dummy.innerHTML = dummy.innerHTML.replace("$ZUTATEN$" , dataset.zutaten);
        dummy.innerHTML = dummy.innerHTML.replace("$ZUBEREITUNG$" , dataset.zubereitung);
        dummy.innerHTML = dummy.innerHTML.replace("$IMAGE$", dataset.image);

       let _addEventListeners = (index) => {
            // Event Listener für <div class="action edit"> registrieren
            let editButton = dummy.querySelector(".action.edit");
            editButton.addEventListener("click", () => this._showEditDialog(index));

            // Event Listener für <div class="action delete"> registrieren
            let deleteButton = dummy.querySelector(".action.delete");
            deleteButton.addEventListener("click", () => this._askDelete(index));
        };

        //Funktion _addEventListeners
        _addEventListeners(index);

        // Sorgt dafür, dass die Einträge angezeigt werden
        let li = dummy.firstElementChild;

        if (li) {
            dummy.removeChild(li);
            ol.appendChild(li);
        }
    }

  );

  }

  //wechselt ansicht auf Editierklasse
  _showEditDialog(index){
    this.hide();
    let editDialog = new PageRezeptEdit(this._app, "page_edit", index, this);
    PagePommesRezeptListe._currentDialoge = editDialog;
    console.log(editDialog);
    editDialog.show();
  }


//Funktion zum löschen eines Rezepts
  _askDelete(index){
    let answer = confirm("Soll das ausgewählte Rezept wirklich gelöscht werden?");
    if (!answer) return;

    //wenn nicht abbruch durch return, dann Rezept löschen
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
