import RestBridge from"./RestBridge";import Collection from"./Collection";class Artikel{_collection;_className="Artikel";_TOTAL_RECORDS_COUNT=0;_multilingualEntitiesInitialized;_Flow_Aop_Proxy_targetMethodsAndGroupedAdvices;_Flow_Aop_Proxy_groupedAdviceChains;_Flow_Aop_Proxy_methodIsInAdviceMode;_bezeichnung;_artikelnummer;_artikelgruppe;_sorte;_variante;_aktivab;_aktivbis;_gesperrt;_entityManager;_uid;_tstamp;_crdate;_deleted;_sorting;_hidden;_deactivated;restBridge;responseData=[];_END_POINTS_={add:'/api/1/stammdaten/artikel/add',set:'/api/1/stammdaten/artikel/set',list:'/api/1/stammdaten/artikel/list',show:'/api/1/stammdaten/artikel/show',delete:'/api/1/stammdaten/artikel/delete',deactivate:'/api/1/stammdaten/artikel/deactivate',};constructor(instanceData=null,config={baseURL:null,header:null,config:null,endPoint:null}){this.restBridge=new RestBridge(config);if(instanceData!==null&&typeof instanceData==="object"){this.autoSetClassProps(instanceData);}}
autoSetClassProps(data){let loopKey;for(loopKey in data){if(this.hasOwnProperty(loopKey)||loopKey in this){this[loopKey]=data[loopKey];}}}
async list(params={limit:null,orientation:null,sorting:null,offset:null}){let cueKey,qString=[];let queryString='';if(typeof params==='object'&&Object.keys(params).length>0){for(cueKey in params){const val=params[cueKey];qString.push(`${cueKey}=${val}`);}
queryString=qString.join("&");}
queryString=queryString?`?${queryString}`:queryString;let response=this.restBridge.fetchEntries(`${this._END_POINTS_.list}${queryString}`);response.then(()=>{this.responseData=this.restBridge.response.data;const collection=new Collection('Artikel',this.responseData);this._collection=collection.getDataCollection();});return await response;}
async add(params={}){let endPoint=`${this._END_POINTS_.add}`;let response=this.restBridge.createEntry(endPoint,params);response.then(()=>{this.responseData=this.restBridge.response.data;});return await response;}
async update(params={uid:null}){let uid=params.uid;if(params.constructor.name==='FormData'){uid=params.get('uid');}
let endPoint=`${this._END_POINTS_.set}/${uid}`;let response=this.restBridge.updateEntry(endPoint,params);response.then(()=>{this.responseData=this.restBridge.response.data;});return await response;}
async set(params={uid:null}){return await this.update(params);}
async show(params={uid:null}){let endPoint=`${this._END_POINTS_.show}/${params.uid}`;let response=this.restBridge.fetchEntry(endPoint);response.then(()=>{this.responseData=this.restBridge.response.data;});return await response;}
async delete(params={uid:null}){let endPoint=`${this._END_POINTS_.delete}/${params.uid}`;let response=this.restBridge.deleteEntry(endPoint);response.then(()=>{this.responseData=this.restBridge.response.data;});return await response;}
async deactivate(params={uid:null}){let endPoint=`${this._END_POINTS_.deactivate}/${params.uid}`;let response=this.restBridge.deactivateEntry(endPoint);response.then(()=>{this.responseData=this.restBridge.response.data;});return await response;}
set collection(collection){this._collection=collection;}
get collection(){return this._collection;}
get className(){return this._className;}
get TOTAL_RECORDS_COUNT(){return this._TOTAL_RECORDS_COUNT;}
set TOTAL_RECORDS_COUNT(TOTAL_RECORDS_COUNT){this._TOTAL_RECORDS_COUNT=TOTAL_RECORDS_COUNT;}
get multilingualEntitiesInitialized(){return this._multilingualEntitiesInitialized;}
get Flow_Aop_Proxy_targetMethodsAndGroupedAdvices(){return this._Flow_Aop_Proxy_targetMethodsAndGroupedAdvices;}
get Flow_Aop_Proxy_groupedAdviceChains(){return this._Flow_Aop_Proxy_groupedAdviceChains;}
get Flow_Aop_Proxy_methodIsInAdviceMode(){return this._Flow_Aop_Proxy_methodIsInAdviceMode;}
get bezeichnung(){return this._bezeichnung;}
get artikelnummer(){return this._artikelnummer;}
get artikelgruppe(){return this._artikelgruppe;}
get sorte(){return this._sorte;}
get variante(){return this._variante;}
get aktivab(){return this._aktivab;}
get aktivbis(){return this._aktivbis;}
get gesperrt(){return this._gesperrt;}
get entityManager(){return this._entityManager;}
get uid(){return this._uid;}
get tstamp(){return this._tstamp;}
get crdate(){return this._crdate;}
get deleted(){return this._deleted;}
get sorting(){return this._sorting;}
get hidden(){return this._hidden;}
get deactivated(){return this._deactivated;}
set multilingualEntitiesInitialized(multilingualEntitiesInitialized){this._multilingualEntitiesInitialized=multilingualEntitiesInitialized;}
set Flow_Aop_Proxy_targetMethodsAndGroupedAdvices(Flow_Aop_Proxy_targetMethodsAndGroupedAdvices){this._Flow_Aop_Proxy_targetMethodsAndGroupedAdvices=Flow_Aop_Proxy_targetMethodsAndGroupedAdvices;}
set Flow_Aop_Proxy_groupedAdviceChains(Flow_Aop_Proxy_groupedAdviceChains){this._Flow_Aop_Proxy_groupedAdviceChains=Flow_Aop_Proxy_groupedAdviceChains;}
set Flow_Aop_Proxy_methodIsInAdviceMode(Flow_Aop_Proxy_methodIsInAdviceMode){this._Flow_Aop_Proxy_methodIsInAdviceMode=Flow_Aop_Proxy_methodIsInAdviceMode;}
set bezeichnung(bezeichnung){this._bezeichnung=bezeichnung;}
set artikelnummer(artikelnummer){this._artikelnummer=artikelnummer;}
set artikelgruppe(artikelgruppe){this._artikelgruppe=artikelgruppe;}
set sorte(sorte){this._sorte=sorte;}
set variante(variante){this._variante=variante;}
set aktivab(aktivab){this._aktivab=aktivab;}
set aktivbis(aktivbis){this._aktivbis=aktivbis;}
set gesperrt(gesperrt){this._gesperrt=gesperrt;}
set entityManager(entityManager){this._entityManager=entityManager;}
set uid(uid){this._uid=uid;}
set tstamp(tstamp){this._tstamp=tstamp;}
set crdate(crdate){this._crdate=crdate;}
set deleted(deleted){this._deleted=deleted;}
set sorting(sorting){this._sorting=sorting;}
set hidden(hidden){this._hidden=hidden;}
set deactivated(deactivated){this._deactivated=deactivated;}
fetchFormConfig(){return{"multilingualEntitiesInitialized":{"type":"toggleSwitch","fieldType":"toggleSwitch","multiLingual":false,"multiFields":false,"readOnly":false,"validation":{"strategies":["NOT_EMPTY","BOOLEAN"]},"fieldName":"multilingualEntitiesInitialized","fieldLabel":"MultilingualEntitiesInitialized","defaultLang":"de","lang":["de","fr","it","en"],"bypassed":false},"Flow_Aop_Proxy_targetMethodsAndGroupedAdvices":{"type":"text","fieldType":"text","multiLingual":false,"multiFields":false,"readOnly":false,"validation":{"strategies":["NOT_EMPTY","STRING"]},"fieldName":"Flow_Aop_Proxy_targetMethodsAndGroupedAdvices","fieldLabel":"Flow_Aop_Proxy_targetMethodsAndGroupedAdvices","defaultLang":"de","lang":["de","fr","it","en"],"bypassed":false},"Flow_Aop_Proxy_groupedAdviceChains":{"type":"text","fieldType":"text","multiLingual":false,"multiFields":false,"readOnly":false,"validation":{"strategies":["NOT_EMPTY","STRING"]},"fieldName":"Flow_Aop_Proxy_groupedAdviceChains","fieldLabel":"Flow_Aop_Proxy_groupedAdviceChains","defaultLang":"de","lang":["de","fr","it","en"],"bypassed":false},"Flow_Aop_Proxy_methodIsInAdviceMode":{"type":"text","fieldType":"text","multiLingual":false,"multiFields":false,"readOnly":false,"validation":{"strategies":["NOT_EMPTY","STRING"]},"fieldName":"Flow_Aop_Proxy_methodIsInAdviceMode","fieldLabel":"Flow_Aop_Proxy_methodIsInAdviceMode","defaultLang":"de","lang":["de","fr","it","en"],"bypassed":false},"bezeichnung":{"type":"text","fieldType":"text","multiLingual":true,"multiFields":true,"readOnly":false,"validation":{"strategies":["NOT_EMPTY","STRING"]},"fieldName":"bezeichnung","fieldLabel":"Bezeichnung","defaultLang":"de","lang":["de","fr","it","en"],"bypassed":false},"artikelnummer":{"type":"input","fieldType":"text","multiLingual":false,"multiFields":false,"readOnly":false,"validation":{"strategies":["NOT_EMPTY","STRING"]},"fieldName":"artikelnummer","fieldLabel":"Artikelnummer","defaultLang":"de","lang":["de","fr","it","en"],"bypassed":false},"artikelgruppe":{"type":"select","fieldType":"select","multiLingual":false,"multiFields":false,"readOnly":false,"validation":{"strategies":["NOT_EMPTY","STRING"]},"fieldName":"artikelgruppe","fieldLabel":"Artikelgruppe","defaultLang":"de","lang":["de","fr","it","en"],"bypassed":false},"sorte":{"type":"select","fieldType":"select","multiLingual":false,"multiFields":false,"readOnly":false,"validation":{"strategies":["NOT_EMPTY","STRING"]},"fieldName":"sorte","fieldLabel":"Sorte","defaultLang":"de","lang":["de","fr","it","en"],"bypassed":false},"variante":{"type":"select","fieldType":"select","multiLingual":false,"multiFields":false,"readOnly":false,"validation":{"strategies":["NOT_EMPTY","STRING"]},"fieldName":"variante","fieldLabel":"Variante","defaultLang":"de","lang":["de","fr","it","en"],"bypassed":false},"aktivab":{"type":"input","fieldType":"datetime-local","multiLingual":false,"multiFields":false,"readOnly":false,"validation":{"strategies":["NOT_EMPTY","SWISS_DATE_TIME"]},"fieldName":"aktivab","fieldLabel":"Aktivab","defaultLang":"de","lang":["de","fr","it","en"],"bypassed":false},"aktivbis":{"type":"input","fieldType":"datetime-local","multiLingual":false,"multiFields":false,"readOnly":false,"validation":{"strategies":["NOT_EMPTY","SWISS_DATE_TIME"]},"fieldName":"aktivbis","fieldLabel":"Aktivbis","defaultLang":"de","lang":["de","fr","it","en"],"bypassed":false},"gesperrt":{"type":"toggleSwitch","fieldType":"toggleSwitch","multiLingual":false,"multiFields":false,"readOnly":false,"validation":{"strategies":["NOT_EMPTY","BOOLEAN"]},"fieldName":"gesperrt","fieldLabel":"Gesperrt","defaultLang":"de","lang":["de","fr","it","en"],"bypassed":false},"entityManager":{"type":"select","fieldType":"select","multiLingual":false,"multiFields":false,"readOnly":false,"validation":{"strategies":["NOT_EMPTY","STRING"]},"fieldName":"entityManager","fieldLabel":"EntityManager","defaultLang":"de","lang":["de","fr","it","en"],"bypassed":false},"uid":{"type":"input","fieldType":"number","multiLingual":false,"multiFields":false,"readOnly":false,"validation":{"strategies":["NOT_EMPTY","BOOLEAN"]},"fieldName":"uid","fieldLabel":"Uid","defaultLang":"de","lang":["de","fr","it","en"],"bypassed":false},"tstamp":{"type":"input","fieldType":"datetime-local","multiLingual":false,"multiFields":false,"readOnly":false,"validation":{"strategies":["NOT_EMPTY","SWISS_DATE_TIME"]},"fieldName":"tstamp","fieldLabel":"Tstamp","defaultLang":"de","lang":["de","fr","it","en"],"bypassed":true},"crdate":{"type":"input","fieldType":"datetime-local","multiLingual":false,"multiFields":false,"readOnly":false,"validation":{"strategies":["NOT_EMPTY","SWISS_DATE_TIME"]},"fieldName":"crdate","fieldLabel":"Crdate","defaultLang":"de","lang":["de","fr","it","en"],"bypassed":true},"deleted":{"type":"toggleSwitch","fieldType":"toggleSwitch","multiLingual":false,"multiFields":false,"readOnly":false,"validation":{"strategies":["NOT_EMPTY","BOOLEAN"]},"fieldName":"deleted","fieldLabel":"Deleted","defaultLang":"de","lang":["de","fr","it","en"],"bypassed":false},"sorting":{"type":"input","fieldType":"number","multiLingual":false,"multiFields":false,"readOnly":false,"validation":{"strategies":["NOT_EMPTY","BOOLEAN"]},"fieldName":"sorting","fieldLabel":"Sorting","defaultLang":"de","lang":["de","fr","it","en"],"bypassed":false},"hidden":{"type":"toggleSwitch","fieldType":"toggleSwitch","multiLingual":false,"multiFields":false,"readOnly":false,"validation":{"strategies":["NOT_EMPTY","BOOLEAN"]},"fieldName":"hidden","fieldLabel":"Hidden","defaultLang":"de","lang":["de","fr","it","en"],"bypassed":false},"deactivated":{"type":"toggleSwitch","fieldType":"toggleSwitch","multiLingual":false,"multiFields":false,"readOnly":false,"validation":{"strategies":["NOT_EMPTY","BOOLEAN"]},"fieldName":"deactivated","fieldLabel":"Deactivated","defaultLang":"de","lang":["de","fr","it","en"],"bypassed":false}};}
fetchFieldsConfig(){return{"bezeichnung":{"name":"bezeichnung","id":"bezeichnung","type":"MultilingualString","inputType":"Text","class":"form-control egl-bezeichnung","label":"Bezeichnung","inputFieldHint":"<span class='egl-hint'>The Designation Values in Supported Languages</span>","placeholder":"Artikelbezeichnung","readOnly":false,"useLabel":true,"defaultLang":"de","inputRequired":true,"dataAttributes":"data-class='Artikel'","isMulti":true,"showInTable":true,"showInForm":true,"languages":["de","fr","it","en"],"validationStrategies":["STRING","NOT_EMPTY"]},"artikelnummer":{"name":"artikelnummer","id":"artikelnummer","type":"string","inputType":"Text","class":"form-control egl-artikelnummer","label":"Sprache","inputFieldHint":"<span class='egl-hint'>The Article Number</span>","placeholder":"123-KR-BS","readOnly":false,"useLabel":true,"defaultLang":"de","inputRequired":true,"dataAttributes":"data-class='Artikel'","isMulti":false,"showInTable":true,"showInForm":true,"validationStrategies":["STRING","NOT_EMPTY"]},"artikelgruppe":{"name":"artikelgruppe","id":"artikelgruppe","type":"Artikelgruppe","inputType":"DropDown","class":"form-control egl-artikelgruppe","label":"Artikelgruppe","inputFieldHint":"<span class='egl-hint'>The Group \u00abGruppe\u00bb of this Article</span>","readOnly":false,"useLabel":true,"isManyToOne":true,"isEntity":true,"defaultLang":"de","optionsMap":{"value":"uid","label":"bezeichnung"},"optionsClass":"Artikelgruppe","inputOptions":[],"inputRequired":true,"dataAttributes":"data-class='Artikel'","showInTable":true,"showInForm":true,"validationStrategies":["STRING","NOT_EMPTY"]},"sorte":{"name":"sorte","id":"sorte","type":"Sorte","inputType":"DropDown","class":"form-control egl-sorte","label":"Sorte","inputFieldHint":"<span class='egl-hint'>The Variety \u00abSorte\u00bb of this Article</span>","readOnly":false,"useLabel":true,"isManyToOne":true,"isEntity":true,"defaultLang":"de","optionsMap":{"value":"uid","label":"bezeichnung"},"optionsClass":"Sorte","inputOptions":[],"inputRequired":true,"dataAttributes":"data-class='Artikel'","showInTable":true,"showInForm":true,"validationStrategies":["STRING","NOT_EMPTY"]},"variante":{"name":"variante","id":"variante","type":"SorteVariante","inputType":"DropDown","class":"form-control egl-variante","label":"Sorte Variante","inputFieldHint":"<span class='egl-hint'>The Variety Variant \u00abSorteVariante\u00bb of this Article</span>","readOnly":false,"useLabel":true,"isManyToOne":true,"isEntity":true,"defaultLang":"de","optionsMap":{"value":"uid","label":"bezeichnung"},"optionsClass":"SorteVariante","inputOptions":[],"inputRequired":true,"dataAttributes":"data-class='Artikel'","showInTable":true,"showInForm":true,"validationStrategies":["STRING","NOT_EMPTY"]},"aktivab":{"name":"aktivab","id":"aktivab","type":"DateTime","inputType":"DateTime","class":"form-control egl-active-ab","label":"Aktiv ab","inputFieldHint":"<span class='egl-hint'>From which Date/Time-frame is this Label-Variant Active?</span>","placeholder":"01.01.2020","readOnly":false,"useLabel":true,"defaultLang":"de","inputRequired":true,"dataAttributes":"data-class='Artikel'","isMulti":false,"showInTable":false,"showInForm":true,"validationStrategies":["SWISS_DATE"]},"aktivbis":{"name":"aktivbis","id":"aktivbis","type":"DateTime","inputType":"DateTime","class":"form-control egl-active-bis","label":"Aktiv bis","inputFieldHint":"<span class='egl-hint'>Till which Date/Time-frame is this Label-Variant Active?</span>","placeholder":"12.12.2020","readOnly":false,"useLabel":true,"defaultLang":"de","inputRequired":true,"dataAttributes":"data-class='Artikel'","isMulti":false,"showInTable":false,"showInForm":true,"validationStrategies":["SWISS_DATE"]},"gesperrt":{"name":"gesperrt","id":"gesperrt","type":"boolean","inputType":"ToggleSwitch","class":"form-control egl-blocked-gesperrt","label":"Ist gesperrt","inputFieldHint":"<span class='egl-hint'>Is this Article blocked against automatic Changes?</span>","readOnly":false,"useLabel":true,"defaultLang":"de","inputRequired":true,"dataAttributes":"data-class='Artikel'","isMulti":false,"showInTable":true,"showInForm":true,"validationStrategies":["STRING","NOT_EMPTY"]},"uid":{"name":"uid","id":"uid","type":"integer","inputType":"Number","class":"form-control egl-uid","label":"UID","inputFieldHint":"<span class='egl-hint'>The Unique Identifier (UID) for this Model</span>","placeholder":"100","readOnly":true,"useLabel":true,"defaultLang":"de","inputRequired":true,"isMulti":false,"showInTable":true,"showInForm":true,"validationStrategies":["NUM","NOT_EMPTY"]},"deleted":{"name":"deleted","id":"deleted","type":"boolean","inputType":"ToggleSwitch","class":"form-control egl-deleted","label":"Deleted?","inputFieldHint":"<span class='egl-hint'>Is this particular Entity-Instance flagged as Deleted or Not?</span>","readOnly":false,"useLabel":true,"defaultLang":"de","inputRequired":false,"dataAttributes":"data-class='EntityBasisKlasse'","isMulti":false,"showInTable":false,"showInForm":true,"validationStrategies":["BOOL","NOT_EMPTY"]},"sorting":{"name":"sorting","id":"sorting","type":"integer","inputType":"Number","class":"form-control egl-sorting","label":"Sorting","inputFieldHint":"<span class='egl-hint'>A Unique Number used for Sorting a Collection of similar Entity Instances</span>","placeholder":"100","readOnly":false,"useLabel":true,"defaultLang":"de","inputRequired":false,"dataAttributes":"data-class='EntityBasisKlasse'","isMulti":false,"showInTable":false,"showInForm":true,"validationStrategies":["NUM","NOT_EMPTY"]},"hidden":{"name":"hidden","id":"hidden","type":"boolean","inputType":"ToggleSwitch","class":"form-control egl-hidden","label":"Hidden?","inputFieldHint":"<span class='egl-hint'>Is this particular Entity-Instance flagged as Hidden or Not?</span>","readOnly":false,"useLabel":true,"defaultLang":"de","inputRequired":false,"dataAttributes":"data-class='EntityBasisKlasse'","isMulti":false,"showInTable":false,"showInForm":true,"validationStrategies":["BOOL","NOT_EMPTY"]},"deactivated":{"name":"deactivated","id":"deactivated","type":"boolean","inputType":"ToggleSwitch","class":"form-control egl-deactivated","label":"Deactivated?","inputFieldHint":"<span class='egl-hint'>Is this particular Entity-Instance flagged as Deactivated or Not?</span>","readOnly":false,"useLabel":true,"defaultLang":"de","inputRequired":true,"dataAttributes":"data-class='EntityBasisKlasse'","isMulti":false,"showInTable":false,"showInForm":true,"validationStrategies":["BOOL","NOT_EMPTY"]}};}}
export default Artikel;