
export const EntityRoutes = {
  "Home": {
    "path": "",
    "model":null,
    "component":	() => import(/* webpackChunkName: "home" */ '../views/LoginView.vue'),
    "routes": {
      "home"       : {"uri": "",            "component" :() => import(/* webpackChunkName: "home" */ '../views/LoginView.vue')},
    }
  },
  "front": {
    "path": "",
    "model":null,
    "component":	() => import(/* webpackChunkName: "home" */ '../views/LoginView.vue'),
    "routes": {
      "front"       : {"uri": "/",            "component" :() => import(/* webpackChunkName: "home" */ '../views/LoginView.vue')},
    }
  },
  "login": {
    "path": "",
    "model":null,
    "component":	() => import(/* webpackChunkName: "login" */ '../views/LoginView.vue'),
    "routes": {
      "front"       : {"uri": "/login",            "component" :() => import(/* webpackChunkName: "home" */ '../views/LoginView.vue')},
    }
  },
  "logout": {
    "path": "",
    "model":null,
    "component":	() => import(/* webpackChunkName: "logout" */ '../views/LoginView.vue'),
    "routes": {
      "front"       : {"uri": "/logout",            "component" :() => import(/* webpackChunkName: "logout" */ '../views/LoginView.vue')},
    }
  },
  "Abteilung": {
    "path": "../Models/Abteilung.js",
    "model":require("../Models/Abteilung.js"),
    "component":	() => import(/* webpackChunkName: "list_abteilung" */ '../views/list/AbteilungListView.vue'),
    "routes": {
      "list"        : {"uri": "/abteilung/list",            "component" : () => import(/* webpackChunkName: "list_abteilung" */ '../views/list/AbteilungListView.vue')},
      "edit"        : {"uri": "/abteilung/edit/:id",        "component": () => import(/* webpackChunkName: "edit_abteilung" */ '../views/edit/AbteilungEditView.vue')},
      "new"         : {"uri": "/abteilung/new",             "component": () => import(/* webpackChunkName: "new_abteilung" */ '../views/new/AbteilungNewView.vue')},

    }
  },

  "Adresse": {
    "path": "../Models/Adresse.js",
    "model":require("../Models/Adresse.js"),
    "component":	() => import(/* webpackChunkName: "list_adresse" */ '../views/list/AdresseListView.vue'),
    "routes": {
      "list"        : {"uri": "/adresse/list",            "component" : () => import(/* webpackChunkName: "list_adresse" */ '../views/list/AdresseListView.vue')},
      "edit"        : {"uri": "/adresse/edit/:id",        "component": () => import(/* webpackChunkName: "edit_adresse" */ '../views/edit/AdresseEditView.vue')},
      "new"         : {"uri": "/adresse/new",             "component": () => import(/* webpackChunkName: "new_adresse" */ '../views/new/AdresseNewView.vue')},

    }
  },

  "AdressVerbindung": {
    "path": "../Models/AdressVerbindung.js",
    "model":require("../Models/AdressVerbindung.js"),
    "component":	() => import(/* webpackChunkName: "list_addresse_verbindung" */ '../views/list/AdressVerbindungListView.vue'),
    "routes": {
      "list"        : {"uri": "/adress-verbindung/list",            "component" : () => import(/* webpackChunkName: "list_adresse_verbindung" */ '../views/list/AdressVerbindungListView.vue')},
      "edit"        : {"uri": "/adress-verbindung/edit/:id",        "component": () => import(/* webpackChunkName: "edit_adresse_verbindung" */ '../views/edit/AdressVerbindungEditView.vue')},
      "new"         : {"uri": "/adress-verbindung/new",             "component": () => import(/* webpackChunkName: "new_adresse_verbindung" */ '../views/new/AdressVerbindungNewView.vue')},


    }
  },

  "Artikel": {
    "path": "../Models/Artikel.js",
    "model":require("../Models/Artikel.js"),
    "component":	() => import(/* webpackChunkName: "list_artikel" */ '../views/list/ArtikelListView.vue'),
    "routes": {
      "list"        : {"uri": "/artikel/list",            "component" : () => import(/* webpackChunkName: "list_artikel" */ '../views/list/ArtikelListView.vue')},
      "edit"        : {"uri": "/artikel/edit/:id",        "component": () => import(/* webpackChunkName: "edit_artikel" */ '../views/edit/ArtikelEditView.vue')},
      "new"         : {"uri": "/artikel/new",             "component": () => import(/* webpackChunkName: "new_artikel" */ '../views/new/ArtikelNewView.vue')},
    }
  },

  "Artikelgruppe": {
    "path": "../Models/Artikelgruppe.js",
    "model":require("../Models/Artikelgruppe.js"),
    "component":	() => import(/* webpackChunkName: "list_artikelgruppe" */ '../views/list/ArtikelgruppeListView.vue'),
    "routes": {
      "list"        : {"uri": "/artikelgruppe/list",            "component" : () => import(/* webpackChunkName: "list_artikelgruppe" */ '../views/list/ArtikelgruppeListView.vue')},
      "edit"        : {"uri": "/artikelgruppe/edit/:id",        "component": () => import(/* webpackChunkName: "edit_artikelgruppe" */ '../views/edit/ArtikelgruppeEditView.vue')},
      "new"         : {"uri": "/artikelgruppe/new",             "component": () => import(/* webpackChunkName: "new_artikelgruppe" */ '../views/new/ArtikelgruppeNewView.vue')},
    }
  },

  "Debitor": {
    "path": "../Models/Debitor.js",
    "model":require("../Models/Debitor.js"),
    "component":	() => import(/* webpackChunkName: "list_debitor" */ '../views/list/DebitorListView.vue'),
    "routes": {
      "list"        : {"uri": "/debitor/list",            "component" : () => import(/* webpackChunkName: "list_debitor" */ '../views/list/DebitorListView.vue')},
      "edit"        : {"uri": "/debitor/edit/:id",        "component": () => import(/* webpackChunkName: "edit_debitor" */ '../views/edit/DebitorEditView.vue')},
      "new"         : {"uri": "/debitor/new",             "component": () => import(/* webpackChunkName: "new_debitor" */ '../views/new/DebitorNewView.vue')},
    }
  },

  "Drucker": {
    "path": "../Models/Drucker.js",
    "model":require("../Models/Drucker.js"),
    "component":	() => import(/* webpackChunkName: "list_drucker" */ '../views/list/DruckerListView.vue'),
    "routes": {
      "list"        : {"uri": "/drucker/list",            "component" : () => import(/* webpackChunkName: "list_drucker" */ '../views/list/DruckerListView.vue')},
      "edit"        : {"uri": "/drucker/edit/:id",        "component": () => import(/* webpackChunkName: "edit_drucker" */ '../views/edit/DruckerEditView.vue')},
      "new"         : {"uri": "/drucker/new",             "component": () => import(/* webpackChunkName: "new_drucker" */ '../views/new/DruckerNewView.vue')},
    }
  },

  "Druckermodell": {
    "path": "../Models/Druckermodell.js",
    "model":require("../Models/Druckermodell.js"),
    "component":	() => import(/* webpackChunkName: "list_druckermodell" */ '../views/list/DruckermodellListView.vue'),
    "routes": {
      "list"        : {"uri": "/druckermodell/list",            "component" : () => import(/* webpackChunkName: "list_druckermodell" */ '../views/list/DruckermodellListView.vue')},
      "edit"        : {"uri": "/druckermodell/edit/:id",        "component": () => import(/* webpackChunkName: "edit_druckermodell" */ '../views/edit/DruckermodellEditView.vue')},
      "new"         : {"uri": "/druckermodell/new",             "component": () => import(/* webpackChunkName: "new_druckermodell" */ '../views/new/DruckermodellNewView.vue')},
    }
  },

  "Einheit": {
    "path": "../Models/Einheit.js",
    "model":require("../Models/Einheit.js"),
    "component":	() => import(/* webpackChunkName: "list_einheit" */ '../views/list/EinheitListView.vue'),
    "routes": {
      "list"        : {"uri": "/einheit/list",            "component" : () => import(/* webpackChunkName: "list_einheit" */ '../views/list/EinheitListView.vue')},
      "edit"        : {"uri": "/einheit/edit/:id",        "component": () => import(/* webpackChunkName: "edit_einheit" */ '../views/edit/EinheitEditView.vue')},
      "new"         : {"uri": "/einheit/new",             "component": () => import(/* webpackChunkName: "new_einheit" */ '../views/new/EinheitNewView.vue')},
    }
  },

  "Kreditor": {
    "path": "../Models/Kreditor.js",
    "model":require("../Models/Kreditor.js"),
    "component":	() => import(/* webpackChunkName: "list_kreditor" */ '../views/list/KreditorListView.vue'),
    "routes": {
      "list"        : {"uri": "/kreditor/list",            "component" : () => import(/* webpackChunkName: "list_kreditor" */ '../views/list/KreditorListView.vue')},
      "edit"        : {"uri": "/kreditor/edit/:id",        "component": () => import(/* webpackChunkName: "edit_kreditor" */ '../views/edit/KreditorEditView.vue')},
      "new"         : {"uri": "/kreditor/new",             "component": () => import(/* webpackChunkName: "new_kreditor" */ '../views/new/KreditorNewView.vue')},
    }
  },

  "Label": {
    "path": "../Models/Label.js",
    "model":require("../Models/Label.js"),
    "component":	() => import(/* webpackChunkName: "list_label" */ '../views/list/LabelListView.vue'),
    "routes": {
      "list"        : {"uri": "/label/list",            "component" : () => import(/* webpackChunkName: "list_label" */ '../views/list/LabelListView.vue')},
      "edit"        : {"uri": "/label/edit/:id",        "component": () => import(/* webpackChunkName: "edit_label" */ '../views/edit/LabelEditView.vue')},
      "new"         : {"uri": "/label/new",             "component": () => import(/* webpackChunkName: "new_label" */ '../views/new/LabelNewView.vue')},
    }
  },

  "LabelVariante": {
    "path": "../Models/LabelVariante.js",
    "model":require("../Models/LabelVariante.js"),
    "component":	() => import(/* webpackChunkName: "list_label_variante" */ '../views/list/LabelVarianteListView.vue'),
    "routes": {
      "list"        : {"uri": "/label-variante/list",            "component" : () => import(/* webpackChunkName: "list_label_variante" */ '../views/list/LabelVarianteListView.vue')},
      "edit"        : {"uri": "/label-variante/edit/:id",        "component": () => import(/* webpackChunkName: "edit_label_variante" */ '../views/edit/LabelVarianteEditView.vue')},
      "new"         : {"uri": "/label-variante/new",             "component": () => import(/* webpackChunkName: "new_label_variante" */ '../views/new/LabelVarianteNewView.vue')},
    }
  },

  "Land": {
    "path": "../Models/Land.js",
    "model":require("../Models/Land.js"),
    "component":	() => import(/* webpackChunkName: "list_land" */ '../views/list/LandListView.vue'),
    "routes": {
      "list"        : {"uri": "/land/list",            "component" : () => import(/* webpackChunkName: "list_land" */ '../views/list/LandListView.vue')},
      "edit"        : {"uri": "/land/edit/:id",        "component": () => import(/* webpackChunkName: "edit_land" */ '../views/edit/LandEditView.vue')},
      "new"         : {"uri": "/land/new",             "component": () => import(/* webpackChunkName: "new_land" */ '../views/new/LandNewView.vue')},
    }
  },

  "Lieferstatus": {
    "path": "../Models/Lieferstatus.js",
    "model":require("../Models/Lieferstatus.js"),
    "component":	() => import(/* webpackChunkName: "list_lieferstatus" */ '../views/list/LieferstatusListView.vue'),
    "routes": {
      "list"        : {"uri": "/lieferstatus/list",            "component" : () => import(/* webpackChunkName: "list_lieferstatus" */ '../views/list/LieferstatusListView.vue')},
      "edit"        : {"uri": "/lieferstatus/edit/:id",        "component": () => import(/* webpackChunkName: "edit_lieferstatus" */ '../views/edit/LieferstatusEditView.vue')},
      "new"         : {"uri": "/lieferstatus/new",             "component": () => import(/* webpackChunkName: "new_lieferstatus" */ '../views/new/LieferstatusNewView.vue')},
    }
  },

  "MischungSorteKomponente": {
    "path": "../Models/MischungSorteKomponente.js",
    "model":require("../Models/MischungSorteKomponente.js"),
    "component":	() => import(/* webpackChunkName: "list_mischung_sorte_komponente" */ '../views/list/MischungSorteKomponenteListView.vue'),
    "routes": {
      "list"        : {"uri": "/mischung-sorte-komponente/list",            "component" : () => import(/* webpackChunkName: "list_mischung_sorte_komponente" */ '../views/list/MischungSorteKomponenteListView.vue')},
      "edit"        : {"uri": "/mischung-sorte-komponente/edit/:id",        "component": () => import(/* webpackChunkName: "edit_mischung_sorte_komponente" */ '../views/edit/MischungSorteKomponenteEditView.vue')},
      "new"         : {"uri": "/mischung-sorte-komponente/new",             "component": () => import(/* webpackChunkName: "new_mischung_sorte_komponente" */ '../views/new/MischungSorteKomponenteNewView.vue')},
    }
  },

  "Preisgruppe": {
    "path": "../Models/Preisgruppe.js",
    "model":require("../Models/Preisgruppe.js"),
    "component":	() => import(/* webpackChunkName: "list_preisgruppe" */ '../views/list/PreisgruppeListView.vue'),
    "routes": {
      "list"        : {"uri": "/preisgruppe/list",            "component" : () => import(/* webpackChunkName: "list_preisgruppe" */ '../views/list/PreisgruppeListView.vue')},
      "edit"        : {"uri": "/preisgruppe/edit/:id",        "component": () => import(/* webpackChunkName: "edit_preisgruppe" */ '../views/edit/PreisgruppeEditView.vue')},
      "new"         : {"uri": "/preisgruppe/new",             "component": () => import(/* webpackChunkName: "new_preisgruppe" */ '../views/new/PreisgruppeNewView.vue')},
    }
  },

  "Produzent": {
    "path": "../Models/Produzent.js",
    "model":require("../Models/Produzent.js"),
    "component":	() => import('../views/list/ProduzentListView.vue'),
    "routes": {
      "list"        : {"uri": "/produzent/list",            "component" : () => import( '../views/list/ProduzentListView.vue')},
      "edit"        : {"uri": "/produzent/edit/:id",        "component": () => import( '../views/edit/ProduzentEditView.vue')},
      "new"         : {"uri": "/produzent/new",             "component": () => import( '../views/new/ProduzentNewView.vue')},
    }
  },

  "Qualitaet": {
    "path": "../Models/Qualitaet.js",
    "model":require("../Models/Qualitaet.js"),
    "component":	() => import(/* webpackChunkName: "list_qualitaet" */ '../views/list/QualitaetListView.vue'),
    "routes": {
      "list"        : {"uri": "/qualitaet/list",            "component" : () => import(/* webpackChunkName: "list_qualitaet" */ '../views/list/QualitaetListView.vue')},
      "edit"        : {"uri": "/qualitaet/edit/:id",        "component": () => import(/* webpackChunkName: "edit_qualitaet" */ '../views/edit/QualitaetEditView.vue')},
      "new"         : {"uri": "/qualitaet/new",             "component": () => import(/* webpackChunkName: "new_qualitaet" */ '../views/new/QualitaetNewView.vue')},
    }
  },

  "Ruestplatz": {
    "path": "../Models/Ruestplatz.js",
    "model":  require("../Models/Ruestplatz.js"),
    "component":	() => import(/* webpackChunkName: "list_ruestplatz" */ '../views/list/RuestplatzListView.vue'),
    "routes": {
      "list"        : {"uri": "/ruestplatz/list",            "component" : () => import(/* webpackChunkName: "list_ruestplatz" */ '../views/list/RuestplatzListView.vue')},
      "edit"        : {"uri": "/ruestplatz/edit/:id",        "component": () => import(/* webpackChunkName: "edit_ruestplatz" */ '../views/edit/RuestplatzEditView.vue')},
      "new"         : {"uri": "/ruestplatz/new",             "component": () => import(/* webpackChunkName: "new_ruestplatz" */ '../views/new/RuestplatzNewView.vue')},
    }
  },

  "Sorte": {
    "path": "../Models/Sorte.js",
    "model":require("../Models/Sorte.js"),
    "component":	() => import(/* webpackChunkName: "list_sorte" */ '../views/list/SorteListView.vue'),
    "routes": {
      "list"        : {"uri": "/sorte/list",            "component" : () => import(/* webpackChunkName: "list_sorte" */ '../views/list/SorteListView.vue')},
      "edit"        : {"uri": "/sorte/edit/:id",        "component": () => import(/* webpackChunkName: "edit_sorte" */ '../views/edit/SorteEditView.vue')},
      "new"         : {"uri": "/sorte/new",             "component": () => import(/* webpackChunkName: "new_sorte" */ '../views/new/SorteNewView.vue')},
    }
  },

  "SorteVariante": {
    "path": "../Models/SorteVariante.js",
    "model":require("../Models/SorteVariante.js"),
    "component":	() => import(/* webpackChunkName: "list_sortevariante" */ '../views/list/SorteVarianteListView.vue'),
    "routes": {
      "list"        : {"uri": "/sorte-variante/list",            "component" : () => import(/* webpackChunkName: "list_sorte_variante" */ '../views/list/SorteVarianteListView.vue')},
      "edit"        : {"uri": "/sorte-variante/edit/:id",        "component": () => import(/* webpackChunkName: "edit_sorte_variante" */ '../views/edit/SorteVarianteEditView.vue')},
      "new"         : {"uri": "/sorte-variante/new",             "component": () => import(/* webpackChunkName: "new_sorte_variante" */ '../views/new/SorteVarianteNewView.vue')},
    }
  },

  "Standort": {
    "path": "../Models/Standort.js",
    "model":require("../Models/Standort.js"),
    "component":	() => import(/* webpackChunkName: "list_standort" */ '../views/list/StandortListView.vue'),
    "routes": {
      "list"        : {"uri": "/standort/list",            "component" : () => import(/* webpackChunkName: "list_verkaufseinheit" */ '../views/list/StandortListView.vue')},
      "edit"        : {"uri": "/standort/edit/:id",        "component": () => import(/* webpackChunkName: "edit_verkaufseinheit" */ '../views/edit/StandortEditView.vue')},
      "new"         : {"uri": "/standort/new",             "component": () => import(/* webpackChunkName: "new_verkaufseinheit" */ '../views/new/StandortNewView.vue')},
    }
  },

  "Verkaufseinheit": {
    "path": "../Models/Verkaufseinheit.js",
    "model":require("../Models/Verkaufseinheit.js"),
    "component":	() => import(/* webpackChunkName: "list_verkaufseinheit" */ '../views/list/VerkaufseinheitListView.vue'),
    "routes": {
      "list"        : {"uri": "/verkaufseinheit/list",            "component" : () => import(/* webpackChunkName: "list_verkaufseinheit" */ '../views/list/VerkaufseinheitListView.vue')},
      "edit"        : {"uri": "/verkaufseinheit/edit/:id",        "component": () => import(/* webpackChunkName: "edit_verkaufseinheit" */ '../views/edit/VerkaufseinheitEditView.vue')},
      "new"         : {"uri": "/verkaufseinheit/new",             "component": () => import(/* webpackChunkName: "new_verkaufseinheit" */ '../views/new/VerkaufseinheitNewView.vue')},
    }
  },

  "Verpackung": {
    "path": "../Models/Verpackung.js",
    "model":require("../Models/Verpackung.js"),
    "component":	() => import(/* webpackChunkName: "list_verpackung" */ '../views/list/VerpackungListView.vue'),
    "routes": {
      "list"        : {"uri": "/verpackung/list",            "component" : () => import(/* webpackChunkName: "list_verpackung" */ '../views/list/VerpackungListView.vue')},
      "edit"        : {"uri": "/verpackung/edit/:id",        "component": () => import(/* webpackChunkName: "edit_verpackung" */ '../views/edit/VerpackungEditView.vue')},
      "new"         : {"uri": "/verpackung/new",             "component": () => import(/* webpackChunkName: "new_verpackung" */ '../views/new/VerpackungNewView.vue')},
    }
  },

  "VerpackungKomponente": {
    "path": "../Models/VerpackungKomponente.js",
    "model":require("../Models/VerpackungKomponente.js"),
    "component":	() => import(/* webpackChunkName: "list_verpackung_komponente" */ '../views/list/VerpackungKomponenteListView.vue'),
    "routes": {
      "list"        : {"uri": "/verpackung-komponente/list",            "component" : () => import(/* webpackChunkName: "list_verpackung_komponente" */ '../views/list/VerpackungKomponenteListView.vue')},
      "edit"        : {"uri": "/verpackung-komponente/edit/:id",        "component": () => import(/* webpackChunkName: "edit_verpackung_komponente" */ '../views/edit/VerpackungKomponenteEditView.vue')},
      "new"         : {"uri": "/verpackung-komponente/new",             "component": () => import(/* webpackChunkName: "new_verpackung_komponente" */ '../views/new/VerpackungKomponenteNewView.vue')},
    }
  },

  "VerpackungKomponenteMenge": {
    "path": "../Models/VerpackungKomponenteMenge.js",
    "model":require("../Models/VerpackungKomponenteMenge.js"),
    "component":	() => import(/* webpackChunkName: "list_verpackung_komponente_menge" */ '../views/list/VerpackungKomponenteMengeListView.vue'),
    "routes": {
      "list"        : {"uri": "/verpackung-komponente-menge/list",            "component" : () => import(/* webpackChunkName: "list_verpackung_komponente_menge" */ '../views/list/VerpackungKomponenteMengeListView.vue')},
      "edit"        : {"uri": "/verpackung-komponente-menge/edit/:id",        "component": () => import(/* webpackChunkName: "edit_verpackung_komponente_menge" */ '../views/edit/VerpackungKomponenteMengeEditView.vue')},
      "new"         : {"uri": "/verpackung-komponente-menge/new",             "component": () => import(/* webpackChunkName: "new_verpackung_komponente_menge" */ '../views/new/VerpackungKomponenteMengeNewView.vue')},
    }
  },


  "VerpackungVariante": {
    "path": "../Models/VerpackungVariante.js",
    "model":require("../Models/VerpackungVariante.js"),
    "component":	() => import(/* webpackChunkName: "list_verpackung_variante" */ '../views/list/VerpackungVarianteListView.vue'),
    "routes": {
      "list"        : {"uri": "/verpackung-variante/list",            "component" : () => import(/* webpackChunkName: "list_verpackung_variante" */ '../views/list/VerpackungVarianteListView.vue')},
      "edit"        : {"uri": "/verpackung-variante/edit/:id",        "component": () => import(/* webpackChunkName: "edit_verpackung_variante" */ '../views/edit/VerpackungVarianteEditView.vue')},
      "new"         : {"uri": "/verpackung-variante/new",             "component": () => import(/* webpackChunkName: "new_verpackung_variante" */ '../views/new/VerpackungNewView.vue')},
    }
  },

  "Zieldefinition": {
    "path": "../Models/Zieldefinition.js",
    "model":require("../Models/Zieldefinition.js"),
    "component":	() => import(/* webpackChunkName: "list_zieldefinition" */ '../views/list/ZieldefinitionListView.vue'),
    "routes": {
      "list"        : {"uri": "/zieldefinition/list",            "component" : () => import(/* webpackChunkName: "list_zieldefinition" */ '../views/list/ZieldefinitionListView.vue')},
      "edit"        : {"uri": "/zieldefinition/edit/:id",        "component": () => import(/* webpackChunkName: "edit_zieldefinition" */ '../views/edit/ZieldefinitionEditView.vue')},
      "new"         : {"uri": "/zieldefinition/new",             "component": () => import(/* webpackChunkName: "new_zieldefinition" */ '../views/new/ZieldefinitionNewView.vue')},
    }
  }
};
