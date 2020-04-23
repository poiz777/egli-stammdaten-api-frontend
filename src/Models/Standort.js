import RestBridge from"./RestBridge";import Collection from"./Collection";class Standort{_collection;_className="Standort";_TOTAL_RECORDS_COUNT=0;_Flow_Aop_Proxy_targetMethodsAndGroupedAdvices;_Flow_Aop_Proxy_groupedAdviceChains;_Flow_Aop_Proxy_methodIsInAdviceMode;_bezeichnung;_identifikation;_drucker;_tstamp;_crdate;_deactivated;_entityManager;_uid;_deleted;_sorting;_hidden;restBridge;responseData=[];_END_POINTS_={add:'/api/1/stammdaten/standort/add',set:'/api/1/stammdaten/standort/set',list:'/api/1/stammdaten/standort/list',show:'/api/1/stammdaten/standort/show',delete:'/api/1/stammdaten/standort/delete',deactivate:'/api/1/stammdaten/standort/deactivate',};constructor(instanceData=null,config={baseURL:null,header:null,config:null,endPoint:null}){this.restBridge=new RestBridge(config);if(instanceData!==null&&typeof instanceData==="object"){this.autoSetClassProps(instanceData);}}
autoSetClassProps(data){let loopKey;for(loopKey in data){if(this.hasOwnProperty(loopKey)||loopKey in this){this[loopKey]=data[loopKey];}}}
async list(params={limit:null,orientation:null,sorting:null,offset:null}){let cueKey,qString=[];let queryString='';if(typeof params==='object'&&Object.keys(params).length>0){for(cueKey in params){const val=params[cueKey];qString.push(`${cueKey}=${val}`);}
queryString=qString.join("&");}
queryString=queryString?`?${queryString}`:queryString;let response=this.restBridge.fetchEntries(`${this._END_POINTS_.list}${queryString}`);response.then(()=>{this.responseData=this.restBridge.response.data;const collection=new Collection('Standort',this.responseData);this._collection=collection.getDataCollection();});return await response;}
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
get bezeichnung(){return this._bezeichnung;}
get identifikation(){return this._identifikation;}
get drucker(){return this._drucker;}
get tstamp(){return this._tstamp;}
get crdate(){return this._crdate;}
get deactivated(){return this._deactivated;}
get entityManager(){return this._entityManager;}
get uid(){return this._uid;}
get deleted(){return this._deleted;}
get sorting(){return this._sorting;}
get hidden(){return this._hidden;}
set Flow_Aop_Proxy_targetMethodsAndGroupedAdvices(Flow_Aop_Proxy_targetMethodsAndGroupedAdvices){this._Flow_Aop_Proxy_targetMethodsAndGroupedAdvices=Flow_Aop_Proxy_targetMethodsAndGroupedAdvices;}
set Flow_Aop_Proxy_groupedAdviceChains(Flow_Aop_Proxy_groupedAdviceChains){this._Flow_Aop_Proxy_groupedAdviceChains=Flow_Aop_Proxy_groupedAdviceChains;}
set Flow_Aop_Proxy_methodIsInAdviceMode(Flow_Aop_Proxy_methodIsInAdviceMode){this._Flow_Aop_Proxy_methodIsInAdviceMode=Flow_Aop_Proxy_methodIsInAdviceMode;}
set bezeichnung(bezeichnung){this._bezeichnung=bezeichnung;}
set identifikation(identifikation){this._identifikation=identifikation;}
set drucker(drucker){this._drucker=drucker;}
set tstamp(tstamp){this._tstamp=tstamp;}
set crdate(crdate){this._crdate=crdate;}
set deactivated(deactivated){this._deactivated=deactivated;}
set entityManager(entityManager){this._entityManager=entityManager;}
set uid(uid){this._uid=uid;}
set deleted(deleted){this._deleted=deleted;}
set sorting(sorting){this._sorting=sorting;}
set hidden(hidden){this._hidden=hidden;}
fetchFormConfig(){return{"Flow_Aop_Proxy_targetMethodsAndGroupedAdvices":{"type":"text","fieldType":"text","multiLingual":false,"multiFields":false,"readOnly":false,"validation":{"strategies":["NOT_EMPTY","STRING"]},"fieldName":"Flow_Aop_Proxy_targetMethodsAndGroupedAdvices","fieldLabel":"Flow_Aop_Proxy_targetMethodsAndGroupedAdvices","defaultLang":"de","lang":["de","fr","it","en"],"bypassed":false},"Flow_Aop_Proxy_groupedAdviceChains":{"type":"text","fieldType":"text","multiLingual":false,"multiFields":false,"readOnly":false,"validation":{"strategies":["NOT_EMPTY","STRING"]},"fieldName":"Flow_Aop_Proxy_groupedAdviceChains","fieldLabel":"Flow_Aop_Proxy_groupedAdviceChains","defaultLang":"de","lang":["de","fr","it","en"],"bypassed":false},"Flow_Aop_Proxy_methodIsInAdviceMode":{"type":"text","fieldType":"text","multiLingual":false,"multiFields":false,"readOnly":false,"validation":{"strategies":["NOT_EMPTY","STRING"]},"fieldName":"Flow_Aop_Proxy_methodIsInAdviceMode","fieldLabel":"Flow_Aop_Proxy_methodIsInAdviceMode","defaultLang":"de","lang":["de","fr","it","en"],"bypassed":false},"bezeichnung":{"type":"input","fieldType":"text","multiLingual":false,"multiFields":false,"readOnly":false,"validation":{"strategies":["NOT_EMPTY","STRING"]},"fieldName":"bezeichnung","fieldLabel":"Bezeichnung","defaultLang":"de","lang":["de","fr","it","en"],"bypassed":false},"identifikation":{"type":"input","fieldType":"text","multiLingual":false,"multiFields":false,"readOnly":false,"validation":{"strategies":["NOT_EMPTY","STRING"]},"fieldName":"identifikation","fieldLabel":"Identifikation","defaultLang":"de","lang":["de","fr","it","en"],"bypassed":false},"drucker":{"type":"select","fieldType":"select","multiLingual":false,"multiFields":false,"readOnly":false,"validation":{"strategies":["NOT_EMPTY","STRING"]},"fieldName":"drucker","fieldLabel":"Drucker","defaultLang":"de","lang":["de","fr","it","en"],"bypassed":false},"tstamp":{"type":"input","fieldType":"number","multiLingual":false,"multiFields":false,"readOnly":false,"validation":{"strategies":["NOT_EMPTY","BOOLEAN"]},"fieldName":"tstamp","fieldLabel":"Tstamp","defaultLang":"de","lang":["de","fr","it","en"],"bypassed":true},"crdate":{"type":"input","fieldType":"number","multiLingual":false,"multiFields":false,"readOnly":false,"validation":{"strategies":["NOT_EMPTY","BOOLEAN"]},"fieldName":"crdate","fieldLabel":"Crdate","defaultLang":"de","lang":["de","fr","it","en"],"bypassed":true},"deactivated":{"type":"input","fieldType":"number","multiLingual":false,"multiFields":false,"readOnly":false,"validation":{"strategies":["NOT_EMPTY","BOOLEAN"]},"fieldName":"deactivated","fieldLabel":"Deactivated","defaultLang":"de","lang":["de","fr","it","en"],"bypassed":false},"entityManager":{"type":"select","fieldType":"select","multiLingual":false,"multiFields":false,"readOnly":false,"validation":{"strategies":["NOT_EMPTY","STRING"]},"fieldName":"entityManager","fieldLabel":"EntityManager","defaultLang":"de","lang":["de","fr","it","en"],"bypassed":false},"uid":{"type":"input","fieldType":"number","multiLingual":false,"multiFields":false,"readOnly":false,"validation":{"strategies":["NOT_EMPTY","BOOLEAN"]},"fieldName":"uid","fieldLabel":"Uid","defaultLang":"de","lang":["de","fr","it","en"],"bypassed":false},"deleted":{"type":"toggleSwitch","fieldType":"toggleSwitch","multiLingual":false,"multiFields":false,"readOnly":false,"validation":{"strategies":["NOT_EMPTY","BOOLEAN"]},"fieldName":"deleted","fieldLabel":"Deleted","defaultLang":"de","lang":["de","fr","it","en"],"bypassed":false},"sorting":{"type":"input","fieldType":"number","multiLingual":false,"multiFields":false,"readOnly":false,"validation":{"strategies":["NOT_EMPTY","BOOLEAN"]},"fieldName":"sorting","fieldLabel":"Sorting","defaultLang":"de","lang":["de","fr","it","en"],"bypassed":false},"hidden":{"type":"toggleSwitch","fieldType":"toggleSwitch","multiLingual":false,"multiFields":false,"readOnly":false,"validation":{"strategies":["NOT_EMPTY","BOOLEAN"]},"fieldName":"hidden","fieldLabel":"Hidden","defaultLang":"de","lang":["de","fr","it","en"],"bypassed":false}};}
fetchFieldsConfig(){return{"uid":{"name":"uid","id":"uid","type":"integer","inputType":"Number","class":"form-control egl-uid","label":"UID","inputFieldHint":"<span class='egl-hint'>The Unique Identifier (UID) for this Model</span>","placeholder":"100","readOnly":true,"useLabel":true,"defaultLang":"de","inputRequired":true,"isMulti":false,"showInTable":true,"showInForm":true,"validationStrategies":["NUM","NOT_EMPTY"]},"deleted":{"name":"deleted","id":"deleted","type":"boolean","inputType":"ToggleSwitch","class":"form-control egl-deleted","label":"Deleted?","inputFieldHint":"<span class='egl-hint'>Is this particular Entity-Instance flagged as Deleted or Not?</span>","readOnly":false,"useLabel":true,"defaultLang":"de","inputRequired":false,"dataAttributes":"data-class='EntityBasisKlasse'","isMulti":false,"showInTable":false,"showInForm":true,"validationStrategies":["BOOL","NOT_EMPTY"]},"sorting":{"name":"sorting","id":"sorting","type":"integer","inputType":"Number","class":"form-control egl-sorting","label":"Sorting","inputFieldHint":"<span class='egl-hint'>A Unique Number used for Sorting a Collection of similar Entity Instances</span>","placeholder":"100","readOnly":false,"useLabel":true,"defaultLang":"de","inputRequired":false,"dataAttributes":"data-class='EntityBasisKlasse'","isMulti":false,"showInTable":false,"showInForm":true,"validationStrategies":["NUM","NOT_EMPTY"]},"hidden":{"name":"hidden","id":"hidden","type":"boolean","inputType":"ToggleSwitch","class":"form-control egl-hidden","label":"Hidden?","inputFieldHint":"<span class='egl-hint'>Is this particular Entity-Instance flagged as Hidden or Not?</span>","readOnly":false,"useLabel":true,"defaultLang":"de","inputRequired":false,"dataAttributes":"data-class='EntityBasisKlasse'","isMulti":false,"showInTable":false,"showInForm":true,"validationStrategies":["BOOL","NOT_EMPTY"]}};}}
export default Standort;