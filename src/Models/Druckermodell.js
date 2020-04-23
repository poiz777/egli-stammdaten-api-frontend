import RestBridge from"./RestBridge";import Collection from"./Collection";class Druckermodell{_collection;_className="Druckermodell";_TOTAL_RECORDS_COUNT=0;_Flow_Aop_Proxy_targetMethodsAndGroupedAdvices;_Flow_Aop_Proxy_groupedAdviceChains;_Flow_Aop_Proxy_methodIsInAdviceMode;_hersteller;_modell;_papiertypNormal;_papiertypEinzahlungsschein;_papiertypBriefpapier;_papiertypEtikettenWeiss;_papiertypEtikettenGelb;_papiertypGelb;_papiertypBlau;_papierschachtEinzel;_papierschachtSchacht1;_papierschachtSchacht2;_papierschachtSchacht3;_papierschachtSchacht4;_papierschachtSchacht5;_papierschachtSchacht6;_papierschachtGross;_farboptionSchwarzweiss;_farboptionFarbe;_entityManager;_uid;_tstamp;_crdate;_deleted;_sorting;_hidden;_deactivated;restBridge;responseData=[];_END_POINTS_={add:'/api/1/stammdaten/druckermodell/add',set:'/api/1/stammdaten/druckermodell/set',list:'/api/1/stammdaten/druckermodell/list',show:'/api/1/stammdaten/druckermodell/show',delete:'/api/1/stammdaten/druckermodell/delete',deactivate:'/api/1/stammdaten/druckermodell/deactivate',};constructor(instanceData=null,config={baseURL:null,header:null,config:null,endPoint:null}){this.restBridge=new RestBridge(config);if(instanceData!==null&&typeof instanceData==="object"){this.autoSetClassProps(instanceData);}}
autoSetClassProps(data){let loopKey;for(loopKey in data){if(this.hasOwnProperty(loopKey)||loopKey in this){this[loopKey]=data[loopKey];}}}
async list(params={limit:null,orientation:null,sorting:null,offset:null}){let cueKey,qString=[];let queryString='';if(typeof params==='object'&&Object.keys(params).length>0){for(cueKey in params){const val=params[cueKey];qString.push(`${cueKey}=${val}`);}
queryString=qString.join("&");}
queryString=queryString?`?${queryString}`:queryString;let response=this.restBridge.fetchEntries(`${this._END_POINTS_.list}${queryString}`);response.then(()=>{this.responseData=this.restBridge.response.data;const collection=new Collection('Druckermodell',this.responseData);this._collection=collection.getDataCollection();});return await response;}
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
get Flow_Aop_Proxy_targetMethodsAndGroupedAdvices(){return this._Flow_Aop_Proxy_targetMethodsAndGroupedAdvices;}
get Flow_Aop_Proxy_groupedAdviceChains(){return this._Flow_Aop_Proxy_groupedAdviceChains;}
get Flow_Aop_Proxy_methodIsInAdviceMode(){return this._Flow_Aop_Proxy_methodIsInAdviceMode;}
get hersteller(){return this._hersteller;}
get modell(){return this._modell;}
get papiertypNormal(){return this._papiertypNormal;}
get papiertypEinzahlungsschein(){return this._papiertypEinzahlungsschein;}
get papiertypBriefpapier(){return this._papiertypBriefpapier;}
get papiertypEtikettenWeiss(){return this._papiertypEtikettenWeiss;}
get papiertypEtikettenGelb(){return this._papiertypEtikettenGelb;}
get papiertypGelb(){return this._papiertypGelb;}
get papiertypBlau(){return this._papiertypBlau;}
get papierschachtEinzel(){return this._papierschachtEinzel;}
get papierschachtSchacht1(){return this._papierschachtSchacht1;}
get papierschachtSchacht2(){return this._papierschachtSchacht2;}
get papierschachtSchacht3(){return this._papierschachtSchacht3;}
get papierschachtSchacht4(){return this._papierschachtSchacht4;}
get papierschachtSchacht5(){return this._papierschachtSchacht5;}
get papierschachtSchacht6(){return this._papierschachtSchacht6;}
get papierschachtGross(){return this._papierschachtGross;}
get farboptionSchwarzweiss(){return this._farboptionSchwarzweiss;}
get farboptionFarbe(){return this._farboptionFarbe;}
get entityManager(){return this._entityManager;}
get uid(){return this._uid;}
get tstamp(){return this._tstamp;}
get crdate(){return this._crdate;}
get deleted(){return this._deleted;}
get sorting(){return this._sorting;}
get hidden(){return this._hidden;}
get deactivated(){return this._deactivated;}
set Flow_Aop_Proxy_targetMethodsAndGroupedAdvices(Flow_Aop_Proxy_targetMethodsAndGroupedAdvices){this._Flow_Aop_Proxy_targetMethodsAndGroupedAdvices=Flow_Aop_Proxy_targetMethodsAndGroupedAdvices;}
set Flow_Aop_Proxy_groupedAdviceChains(Flow_Aop_Proxy_groupedAdviceChains){this._Flow_Aop_Proxy_groupedAdviceChains=Flow_Aop_Proxy_groupedAdviceChains;}
set Flow_Aop_Proxy_methodIsInAdviceMode(Flow_Aop_Proxy_methodIsInAdviceMode){this._Flow_Aop_Proxy_methodIsInAdviceMode=Flow_Aop_Proxy_methodIsInAdviceMode;}
set hersteller(hersteller){this._hersteller=hersteller;}
set modell(modell){this._modell=modell;}
set papiertypNormal(papiertypNormal){this._papiertypNormal=papiertypNormal;}
set papiertypEinzahlungsschein(papiertypEinzahlungsschein){this._papiertypEinzahlungsschein=papiertypEinzahlungsschein;}
set papiertypBriefpapier(papiertypBriefpapier){this._papiertypBriefpapier=papiertypBriefpapier;}
set papiertypEtikettenWeiss(papiertypEtikettenWeiss){this._papiertypEtikettenWeiss=papiertypEtikettenWeiss;}
set papiertypEtikettenGelb(papiertypEtikettenGelb){this._papiertypEtikettenGelb=papiertypEtikettenGelb;}
set papiertypGelb(papiertypGelb){this._papiertypGelb=papiertypGelb;}
set papiertypBlau(papiertypBlau){this._papiertypBlau=papiertypBlau;}
set papierschachtEinzel(papierschachtEinzel){this._papierschachtEinzel=papierschachtEinzel;}
set papierschachtSchacht1(papierschachtSchacht1){this._papierschachtSchacht1=papierschachtSchacht1;}
set papierschachtSchacht2(papierschachtSchacht2){this._papierschachtSchacht2=papierschachtSchacht2;}
set papierschachtSchacht3(papierschachtSchacht3){this._papierschachtSchacht3=papierschachtSchacht3;}
set papierschachtSchacht4(papierschachtSchacht4){this._papierschachtSchacht4=papierschachtSchacht4;}
set papierschachtSchacht5(papierschachtSchacht5){this._papierschachtSchacht5=papierschachtSchacht5;}
set papierschachtSchacht6(papierschachtSchacht6){this._papierschachtSchacht6=papierschachtSchacht6;}
set papierschachtGross(papierschachtGross){this._papierschachtGross=papierschachtGross;}
set farboptionSchwarzweiss(farboptionSchwarzweiss){this._farboptionSchwarzweiss=farboptionSchwarzweiss;}
set farboptionFarbe(farboptionFarbe){this._farboptionFarbe=farboptionFarbe;}
set entityManager(entityManager){this._entityManager=entityManager;}
set uid(uid){this._uid=uid;}
set tstamp(tstamp){this._tstamp=tstamp;}
set crdate(crdate){this._crdate=crdate;}
set deleted(deleted){this._deleted=deleted;}
set sorting(sorting){this._sorting=sorting;}
set hidden(hidden){this._hidden=hidden;}
set deactivated(deactivated){this._deactivated=deactivated;}
fetchFormConfig(){return{"Flow_Aop_Proxy_targetMethodsAndGroupedAdvices":{"type":"text","fieldType":"text","multiLingual":false,"multiFields":false,"readOnly":false,"validation":{"strategies":["NOT_EMPTY","STRING"]},"fieldName":"Flow_Aop_Proxy_targetMethodsAndGroupedAdvices","fieldLabel":"Flow_Aop_Proxy_targetMethodsAndGroupedAdvices","defaultLang":"de","lang":["de","fr","it","en"],"bypassed":false},"Flow_Aop_Proxy_groupedAdviceChains":{"type":"text","fieldType":"text","multiLingual":false,"multiFields":false,"readOnly":false,"validation":{"strategies":["NOT_EMPTY","STRING"]},"fieldName":"Flow_Aop_Proxy_groupedAdviceChains","fieldLabel":"Flow_Aop_Proxy_groupedAdviceChains","defaultLang":"de","lang":["de","fr","it","en"],"bypassed":false},"Flow_Aop_Proxy_methodIsInAdviceMode":{"type":"text","fieldType":"text","multiLingual":false,"multiFields":false,"readOnly":false,"validation":{"strategies":["NOT_EMPTY","STRING"]},"fieldName":"Flow_Aop_Proxy_methodIsInAdviceMode","fieldLabel":"Flow_Aop_Proxy_methodIsInAdviceMode","defaultLang":"de","lang":["de","fr","it","en"],"bypassed":false},"hersteller":{"type":"input","fieldType":"text","multiLingual":false,"multiFields":false,"readOnly":false,"validation":{"strategies":["NOT_EMPTY","STRING"]},"fieldName":"hersteller","fieldLabel":"Hersteller","defaultLang":"de","lang":["de","fr","it","en"],"bypassed":false},"modell":{"type":"input","fieldType":"text","multiLingual":false,"multiFields":false,"readOnly":false,"validation":{"strategies":["NOT_EMPTY","STRING"]},"fieldName":"modell","fieldLabel":"Modell","defaultLang":"de","lang":["de","fr","it","en"],"bypassed":false},"papiertypNormal":{"type":"input","fieldType":"text","multiLingual":false,"multiFields":false,"readOnly":false,"validation":{"strategies":["NOT_EMPTY","STRING"]},"fieldName":"papiertypNormal","fieldLabel":"PapiertypNormal","defaultLang":"de","lang":["de","fr","it","en"],"bypassed":false},"papiertypEinzahlungsschein":{"type":"input","fieldType":"text","multiLingual":false,"multiFields":false,"readOnly":false,"validation":{"strategies":["NOT_EMPTY","STRING"]},"fieldName":"papiertypEinzahlungsschein","fieldLabel":"PapiertypEinzahlungsschein","defaultLang":"de","lang":["de","fr","it","en"],"bypassed":false},"papiertypBriefpapier":{"type":"input","fieldType":"text","multiLingual":false,"multiFields":false,"readOnly":false,"validation":{"strategies":["NOT_EMPTY","STRING"]},"fieldName":"papiertypBriefpapier","fieldLabel":"PapiertypBriefpapier","defaultLang":"de","lang":["de","fr","it","en"],"bypassed":false},"papiertypEtikettenWeiss":{"type":"input","fieldType":"text","multiLingual":false,"multiFields":false,"readOnly":false,"validation":{"strategies":["NOT_EMPTY","STRING"]},"fieldName":"papiertypEtikettenWeiss","fieldLabel":"PapiertypEtikettenWeiss","defaultLang":"de","lang":["de","fr","it","en"],"bypassed":false},"papiertypEtikettenGelb":{"type":"input","fieldType":"text","multiLingual":false,"multiFields":false,"readOnly":false,"validation":{"strategies":["NOT_EMPTY","STRING"]},"fieldName":"papiertypEtikettenGelb","fieldLabel":"PapiertypEtikettenGelb","defaultLang":"de","lang":["de","fr","it","en"],"bypassed":false},"papiertypGelb":{"type":"input","fieldType":"text","multiLingual":false,"multiFields":false,"readOnly":false,"validation":{"strategies":["NOT_EMPTY","STRING"]},"fieldName":"papiertypGelb","fieldLabel":"PapiertypGelb","defaultLang":"de","lang":["de","fr","it","en"],"bypassed":false},"papiertypBlau":{"type":"input","fieldType":"text","multiLingual":false,"multiFields":false,"readOnly":false,"validation":{"strategies":["NOT_EMPTY","STRING"]},"fieldName":"papiertypBlau","fieldLabel":"PapiertypBlau","defaultLang":"de","lang":["de","fr","it","en"],"bypassed":false},"papierschachtEinzel":{"type":"input","fieldType":"text","multiLingual":false,"multiFields":false,"readOnly":false,"validation":{"strategies":["NOT_EMPTY","STRING"]},"fieldName":"papierschachtEinzel","fieldLabel":"PapierschachtEinzel","defaultLang":"de","lang":["de","fr","it","en"],"bypassed":false},"papierschachtSchacht1":{"type":"input","fieldType":"text","multiLingual":false,"multiFields":false,"readOnly":false,"validation":{"strategies":["NOT_EMPTY","STRING"]},"fieldName":"papierschachtSchacht1","fieldLabel":"PapierschachtSchacht1","defaultLang":"de","lang":["de","fr","it","en"],"bypassed":false},"papierschachtSchacht2":{"type":"input","fieldType":"text","multiLingual":false,"multiFields":false,"readOnly":false,"validation":{"strategies":["NOT_EMPTY","STRING"]},"fieldName":"papierschachtSchacht2","fieldLabel":"PapierschachtSchacht2","defaultLang":"de","lang":["de","fr","it","en"],"bypassed":false},"papierschachtSchacht3":{"type":"input","fieldType":"text","multiLingual":false,"multiFields":false,"readOnly":false,"validation":{"strategies":["NOT_EMPTY","STRING"]},"fieldName":"papierschachtSchacht3","fieldLabel":"PapierschachtSchacht3","defaultLang":"de","lang":["de","fr","it","en"],"bypassed":false},"papierschachtSchacht4":{"type":"input","fieldType":"text","multiLingual":false,"multiFields":false,"readOnly":false,"validation":{"strategies":["NOT_EMPTY","STRING"]},"fieldName":"papierschachtSchacht4","fieldLabel":"PapierschachtSchacht4","defaultLang":"de","lang":["de","fr","it","en"],"bypassed":false},"papierschachtSchacht5":{"type":"input","fieldType":"text","multiLingual":false,"multiFields":false,"readOnly":false,"validation":{"strategies":["NOT_EMPTY","STRING"]},"fieldName":"papierschachtSchacht5","fieldLabel":"PapierschachtSchacht5","defaultLang":"de","lang":["de","fr","it","en"],"bypassed":false},"papierschachtSchacht6":{"type":"input","fieldType":"text","multiLingual":false,"multiFields":false,"readOnly":false,"validation":{"strategies":["NOT_EMPTY","STRING"]},"fieldName":"papierschachtSchacht6","fieldLabel":"PapierschachtSchacht6","defaultLang":"de","lang":["de","fr","it","en"],"bypassed":false},"papierschachtGross":{"type":"input","fieldType":"text","multiLingual":false,"multiFields":false,"readOnly":false,"validation":{"strategies":["NOT_EMPTY","STRING"]},"fieldName":"papierschachtGross","fieldLabel":"PapierschachtGross","defaultLang":"de","lang":["de","fr","it","en"],"bypassed":false},"farboptionSchwarzweiss":{"type":"input","fieldType":"text","multiLingual":false,"multiFields":false,"readOnly":false,"validation":{"strategies":["NOT_EMPTY","STRING"]},"fieldName":"farboptionSchwarzweiss","fieldLabel":"FarboptionSchwarzweiss","defaultLang":"de","lang":["de","fr","it","en"],"bypassed":false},"farboptionFarbe":{"type":"input","fieldType":"text","multiLingual":false,"multiFields":false,"readOnly":false,"validation":{"strategies":["NOT_EMPTY","STRING"]},"fieldName":"farboptionFarbe","fieldLabel":"FarboptionFarbe","defaultLang":"de","lang":["de","fr","it","en"],"bypassed":false},"entityManager":{"type":"select","fieldType":"select","multiLingual":false,"multiFields":false,"readOnly":false,"validation":{"strategies":["NOT_EMPTY","STRING"]},"fieldName":"entityManager","fieldLabel":"EntityManager","defaultLang":"de","lang":["de","fr","it","en"],"bypassed":false},"uid":{"type":"input","fieldType":"number","multiLingual":false,"multiFields":false,"readOnly":false,"validation":{"strategies":["NOT_EMPTY","BOOLEAN"]},"fieldName":"uid","fieldLabel":"Uid","defaultLang":"de","lang":["de","fr","it","en"],"bypassed":false},"tstamp":{"type":"input","fieldType":"datetime-local","multiLingual":false,"multiFields":false,"readOnly":false,"validation":{"strategies":["NOT_EMPTY","SWISS_DATE_TIME"]},"fieldName":"tstamp","fieldLabel":"Tstamp","defaultLang":"de","lang":["de","fr","it","en"],"bypassed":true},"crdate":{"type":"input","fieldType":"datetime-local","multiLingual":false,"multiFields":false,"readOnly":false,"validation":{"strategies":["NOT_EMPTY","SWISS_DATE_TIME"]},"fieldName":"crdate","fieldLabel":"Crdate","defaultLang":"de","lang":["de","fr","it","en"],"bypassed":true},"deleted":{"type":"toggleSwitch","fieldType":"toggleSwitch","multiLingual":false,"multiFields":false,"readOnly":false,"validation":{"strategies":["NOT_EMPTY","BOOLEAN"]},"fieldName":"deleted","fieldLabel":"Deleted","defaultLang":"de","lang":["de","fr","it","en"],"bypassed":false},"sorting":{"type":"input","fieldType":"number","multiLingual":false,"multiFields":false,"readOnly":false,"validation":{"strategies":["NOT_EMPTY","BOOLEAN"]},"fieldName":"sorting","fieldLabel":"Sorting","defaultLang":"de","lang":["de","fr","it","en"],"bypassed":false},"hidden":{"type":"toggleSwitch","fieldType":"toggleSwitch","multiLingual":false,"multiFields":false,"readOnly":false,"validation":{"strategies":["NOT_EMPTY","BOOLEAN"]},"fieldName":"hidden","fieldLabel":"Hidden","defaultLang":"de","lang":["de","fr","it","en"],"bypassed":false},"deactivated":{"type":"toggleSwitch","fieldType":"toggleSwitch","multiLingual":false,"multiFields":false,"readOnly":false,"validation":{"strategies":["NOT_EMPTY","BOOLEAN"]},"fieldName":"deactivated","fieldLabel":"Deactivated","defaultLang":"de","lang":["de","fr","it","en"],"bypassed":false}};}
fetchFieldsConfig(){return{"uid":{"name":"uid","id":"uid","type":"integer","inputType":"Number","class":"form-control egl-uid","label":"UID","inputFieldHint":"<span class='egl-hint'>The Unique Identifier (UID) for this Model</span>","placeholder":"100","readOnly":true,"useLabel":true,"defaultLang":"de","inputRequired":true,"isMulti":false,"showInTable":true,"showInForm":true,"validationStrategies":["NUM","NOT_EMPTY"]},"deleted":{"name":"deleted","id":"deleted","type":"boolean","inputType":"ToggleSwitch","class":"form-control egl-deleted","label":"Deleted?","inputFieldHint":"<span class='egl-hint'>Is this particular Entity-Instance flagged as Deleted or Not?</span>","readOnly":false,"useLabel":true,"defaultLang":"de","inputRequired":false,"dataAttributes":"data-class='EntityBasisKlasse'","isMulti":false,"showInTable":false,"showInForm":true,"validationStrategies":["BOOL","NOT_EMPTY"]},"sorting":{"name":"sorting","id":"sorting","type":"integer","inputType":"Number","class":"form-control egl-sorting","label":"Sorting","inputFieldHint":"<span class='egl-hint'>A Unique Number used for Sorting a Collection of similar Entity Instances</span>","placeholder":"100","readOnly":false,"useLabel":true,"defaultLang":"de","inputRequired":false,"dataAttributes":"data-class='EntityBasisKlasse'","isMulti":false,"showInTable":false,"showInForm":true,"validationStrategies":["NUM","NOT_EMPTY"]},"hidden":{"name":"hidden","id":"hidden","type":"boolean","inputType":"ToggleSwitch","class":"form-control egl-hidden","label":"Hidden?","inputFieldHint":"<span class='egl-hint'>Is this particular Entity-Instance flagged as Hidden or Not?</span>","readOnly":false,"useLabel":true,"defaultLang":"de","inputRequired":false,"dataAttributes":"data-class='EntityBasisKlasse'","isMulti":false,"showInTable":false,"showInForm":true,"validationStrategies":["BOOL","NOT_EMPTY"]},"deactivated":{"name":"deactivated","id":"deactivated","type":"boolean","inputType":"ToggleSwitch","class":"form-control egl-deactivated","label":"Deactivated?","inputFieldHint":"<span class='egl-hint'>Is this particular Entity-Instance flagged as Deactivated or Not?</span>","readOnly":false,"useLabel":true,"defaultLang":"de","inputRequired":true,"dataAttributes":"data-class='EntityBasisKlasse'","isMulti":false,"showInTable":false,"showInForm":true,"validationStrategies":["BOOL","NOT_EMPTY"]}};}}
export default Druckermodell;