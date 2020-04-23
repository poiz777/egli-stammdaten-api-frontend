import RestBridge from"./RestBridge";import Collection from"./Collection";class Kreditor{_collection;_className="Kreditor";_TOTAL_RECORDS_COUNT=0;_Flow_Aop_Proxy_targetMethodsAndGroupedAdvices;_Flow_Aop_Proxy_groupedAdviceChains;_Flow_Aop_Proxy_methodIsInAdviceMode;_adresseRepository;_uid;_kurzname;_adressNr;_lieferantWaren;_lieferantPackmaterial;restBridge;responseData=[];_END_POINTS_={add:'/api/1/stammdaten/kreditor/add',set:'/api/1/stammdaten/kreditor/set',list:'/api/1/stammdaten/kreditor/list',show:'/api/1/stammdaten/kreditor/show',delete:'/api/1/stammdaten/kreditor/delete',deactivate:'/api/1/stammdaten/kreditor/deactivate',};constructor(instanceData=null,config={baseURL:null,header:null,config:null,endPoint:null}){this.restBridge=new RestBridge(config);if(instanceData!==null&&typeof instanceData==="object"){this.autoSetClassProps(instanceData);}}
autoSetClassProps(data){let loopKey;for(loopKey in data){if(this.hasOwnProperty(loopKey)||loopKey in this){this[loopKey]=data[loopKey];}}}
async list(params={limit:null,orientation:null,sorting:null,offset:null}){let cueKey,qString=[];let queryString='';if(typeof params==='object'&&Object.keys(params).length>0){for(cueKey in params){const val=params[cueKey];qString.push(`${cueKey}=${val}`);}
queryString=qString.join("&");}
queryString=queryString?`?${queryString}`:queryString;let response=this.restBridge.fetchEntries(`${this._END_POINTS_.list}${queryString}`);response.then(()=>{this.responseData=this.restBridge.response.data;const collection=new Collection('Kreditor',this.responseData);this._collection=collection.getDataCollection();});return await response;}
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
get adresseRepository(){return this._adresseRepository;}
get uid(){return this._uid;}
get kurzname(){return this._kurzname;}
get adressNr(){return this._adressNr;}
get lieferantWaren(){return this._lieferantWaren;}
get lieferantPackmaterial(){return this._lieferantPackmaterial;}
set Flow_Aop_Proxy_targetMethodsAndGroupedAdvices(Flow_Aop_Proxy_targetMethodsAndGroupedAdvices){this._Flow_Aop_Proxy_targetMethodsAndGroupedAdvices=Flow_Aop_Proxy_targetMethodsAndGroupedAdvices;}
set Flow_Aop_Proxy_groupedAdviceChains(Flow_Aop_Proxy_groupedAdviceChains){this._Flow_Aop_Proxy_groupedAdviceChains=Flow_Aop_Proxy_groupedAdviceChains;}
set Flow_Aop_Proxy_methodIsInAdviceMode(Flow_Aop_Proxy_methodIsInAdviceMode){this._Flow_Aop_Proxy_methodIsInAdviceMode=Flow_Aop_Proxy_methodIsInAdviceMode;}
set adresseRepository(adresseRepository){this._adresseRepository=adresseRepository;}
set uid(uid){this._uid=uid;}
set kurzname(kurzname){this._kurzname=kurzname;}
set adressNr(adressNr){this._adressNr=adressNr;}
set lieferantWaren(lieferantWaren){this._lieferantWaren=lieferantWaren;}
set lieferantPackmaterial(lieferantPackmaterial){this._lieferantPackmaterial=lieferantPackmaterial;}
fetchFormConfig(){return{"Flow_Aop_Proxy_targetMethodsAndGroupedAdvices":{"type":"text","fieldType":"text","multiLingual":false,"multiFields":false,"readOnly":false,"validation":{"strategies":["NOT_EMPTY","STRING"]},"fieldName":"Flow_Aop_Proxy_targetMethodsAndGroupedAdvices","fieldLabel":"Flow_Aop_Proxy_targetMethodsAndGroupedAdvices","defaultLang":"de","lang":["de","fr","it","en"],"bypassed":false},"Flow_Aop_Proxy_groupedAdviceChains":{"type":"text","fieldType":"text","multiLingual":false,"multiFields":false,"readOnly":false,"validation":{"strategies":["NOT_EMPTY","STRING"]},"fieldName":"Flow_Aop_Proxy_groupedAdviceChains","fieldLabel":"Flow_Aop_Proxy_groupedAdviceChains","defaultLang":"de","lang":["de","fr","it","en"],"bypassed":false},"Flow_Aop_Proxy_methodIsInAdviceMode":{"type":"text","fieldType":"text","multiLingual":false,"multiFields":false,"readOnly":false,"validation":{"strategies":["NOT_EMPTY","STRING"]},"fieldName":"Flow_Aop_Proxy_methodIsInAdviceMode","fieldLabel":"Flow_Aop_Proxy_methodIsInAdviceMode","defaultLang":"de","lang":["de","fr","it","en"],"bypassed":false},"adresseRepository":{"type":"select","fieldType":"select","multiLingual":false,"multiFields":false,"readOnly":false,"validation":{"strategies":["NOT_EMPTY","STRING"]},"fieldName":"adresseRepository","fieldLabel":"AdresseRepository","defaultLang":"de","lang":["de","fr","it","en"],"bypassed":false},"uid":{"type":"input","fieldType":"number","multiLingual":false,"multiFields":false,"readOnly":false,"validation":{"strategies":["NOT_EMPTY","BOOLEAN"]},"fieldName":"uid","fieldLabel":"Uid","defaultLang":"de","lang":["de","fr","it","en"],"bypassed":false},"kurzname":{"type":"input","fieldType":"text","multiLingual":false,"multiFields":false,"readOnly":false,"validation":{"strategies":["NOT_EMPTY","STRING"]},"fieldName":"kurzname","fieldLabel":"Kurzname","defaultLang":"de","lang":["de","fr","it","en"],"bypassed":false},"adressNr":{"type":"input","fieldType":"number","multiLingual":false,"multiFields":false,"readOnly":false,"validation":{"strategies":["NOT_EMPTY","BOOLEAN"]},"fieldName":"adressNr","fieldLabel":"AdressNr","defaultLang":"de","lang":["de","fr","it","en"],"bypassed":false},"lieferantWaren":{"type":"toggleSwitch","fieldType":"toggleSwitch","multiLingual":false,"multiFields":false,"readOnly":false,"validation":{"strategies":["NOT_EMPTY","BOOLEAN"]},"fieldName":"lieferantWaren","fieldLabel":"LieferantWaren","defaultLang":"de","lang":["de","fr","it","en"],"bypassed":false},"lieferantPackmaterial":{"type":"toggleSwitch","fieldType":"toggleSwitch","multiLingual":false,"multiFields":false,"readOnly":false,"validation":{"strategies":["NOT_EMPTY","BOOLEAN"]},"fieldName":"lieferantPackmaterial","fieldLabel":"LieferantPackmaterial","defaultLang":"de","lang":["de","fr","it","en"],"bypassed":false}};}
fetchFieldsConfig(){return{"uid":{"name":"uid","id":"uid","type":"integer","inputType":"Number","class":"form-control egl-uid","label":"UID","inputFieldHint":"<span class='egl-hint'>The Unique Identifier (UID) for this Model</span>","placeholder":"100","readOnly":true,"useLabel":true,"defaultLang":"de","inputRequired":true,"isMulti":false,"showInTable":true,"showInForm":true,"validationStrategies":["NUM","NOT_EMPTY"]},"kurzname":{"name":"kurzname","id":"kurzname","type":"string","inputType":"Text","class":"form-control egl-kurzname","label":"Kurzname","inputFieldHint":"<span class='egl-hint'>The abbreviated form of the Name</span>","placeholder":"Kurzform","readOnly":false,"useLabel":true,"defaultLang":"de","inputRequired":false,"isMulti":false,"showInTable":true,"showInForm":true,"validationStrategies":["STRING","NOT_EMPTY"]},"adressNr":{"name":"adressNr","id":"adressNr","type":"integer","inputType":"Number","class":"form-control egl-adressnr","label":"AdressNr.","inputFieldHint":"<span class='egl-hint'>The Address Number</span>","placeholder":"99","readOnly":false,"useLabel":true,"defaultLang":"de","inputRequired":true,"isMulti":false,"showInTable":true,"showInForm":true,"validationStrategies":["STRING","NOT_EMPTY"]},"lieferantWaren":{"name":"lieferantWaren","id":"lieferantWaren","type":"boolean","inputType":"ToggleSwitch","class":"form-control egl-eu","label":"Ist Waren Lieferant","inputFieldHint":"<span class='egl-hint'>Is this Creditor also a \u00abGoods\u00bb Supplier?</span>","readOnly":false,"useLabel":true,"defaultLang":"de","inputRequired":true,"dataAttributes":"data-class='Kreditor'","isMulti":false,"showInTable":true,"showInForm":true,"validationStrategies":["STRING","NOT_EMPTY"]},"lieferantPackmaterial":{"name":"lieferantPackmaterial","id":"lieferantPackmaterial","type":"boolean","inputType":"ToggleSwitch","class":"form-control egl-eu","label":"Ist Packmaterial Lieferant","inputFieldHint":"<span class='egl-hint'>Is this Creditor also a \u00abPackage Material\u00bb Supplier?</span>","readOnly":false,"useLabel":true,"defaultLang":"de","inputRequired":true,"dataAttributes":"data-class='Kreditor'","isMulti":false,"showInTable":true,"showInForm":true,"validationStrategies":["STRING","NOT_EMPTY"]}};}}
export default Kreditor;