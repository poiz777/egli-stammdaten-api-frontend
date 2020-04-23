import RestBridge from"./RestBridge";import Collection from"./Collection";class Debitor{_collection;_className="Debitor";_TOTAL_RECORDS_COUNT=0;_Flow_Aop_Proxy_targetMethodsAndGroupedAdvices;_Flow_Aop_Proxy_groupedAdviceChains;_Flow_Aop_Proxy_methodIsInAdviceMode;_uid;_kurzname;_adressnr;restBridge;responseData=[];_END_POINTS_={add:'/api/1/stammdaten/debitor/add',set:'/api/1/stammdaten/debitor/set',list:'/api/1/stammdaten/debitor/list',show:'/api/1/stammdaten/debitor/show',delete:'/api/1/stammdaten/debitor/delete',deactivate:'/api/1/stammdaten/debitor/deactivate',};constructor(instanceData=null,config={baseURL:null,header:null,config:null,endPoint:null}){this.restBridge=new RestBridge(config);if(instanceData!==null&&typeof instanceData==="object"){this.autoSetClassProps(instanceData);}}
autoSetClassProps(data){let loopKey;for(loopKey in data){if(this.hasOwnProperty(loopKey)||loopKey in this){this[loopKey]=data[loopKey];}}}
async list(params={limit:null,orientation:null,sorting:null,offset:null}){let cueKey,qString=[];let queryString='';if(typeof params==='object'&&Object.keys(params).length>0){for(cueKey in params){const val=params[cueKey];qString.push(`${cueKey}=${val}`);}
queryString=qString.join("&");}
queryString=queryString?`?${queryString}`:queryString;let response=this.restBridge.fetchEntries(`${this._END_POINTS_.list}${queryString}`);response.then(()=>{this.responseData=this.restBridge.response.data;const collection=new Collection('Debitor',this.responseData);this._collection=collection.getDataCollection();});return await response;}
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
get uid(){return this._uid;}
get kurzname(){return this._kurzname;}
get adressnr(){return this._adressnr;}
set Flow_Aop_Proxy_targetMethodsAndGroupedAdvices(Flow_Aop_Proxy_targetMethodsAndGroupedAdvices){this._Flow_Aop_Proxy_targetMethodsAndGroupedAdvices=Flow_Aop_Proxy_targetMethodsAndGroupedAdvices;}
set Flow_Aop_Proxy_groupedAdviceChains(Flow_Aop_Proxy_groupedAdviceChains){this._Flow_Aop_Proxy_groupedAdviceChains=Flow_Aop_Proxy_groupedAdviceChains;}
set Flow_Aop_Proxy_methodIsInAdviceMode(Flow_Aop_Proxy_methodIsInAdviceMode){this._Flow_Aop_Proxy_methodIsInAdviceMode=Flow_Aop_Proxy_methodIsInAdviceMode;}
set uid(uid){this._uid=uid;}
set kurzname(kurzname){this._kurzname=kurzname;}
set adressnr(adressnr){this._adressnr=adressnr;}
fetchFormConfig(){return{"Flow_Aop_Proxy_targetMethodsAndGroupedAdvices":{"type":"text","fieldType":"text","multiLingual":false,"multiFields":false,"readOnly":false,"validation":{"strategies":["NOT_EMPTY","STRING"]},"fieldName":"Flow_Aop_Proxy_targetMethodsAndGroupedAdvices","fieldLabel":"Flow_Aop_Proxy_targetMethodsAndGroupedAdvices","defaultLang":"de","lang":["de","fr","it","en"],"bypassed":false},"Flow_Aop_Proxy_groupedAdviceChains":{"type":"text","fieldType":"text","multiLingual":false,"multiFields":false,"readOnly":false,"validation":{"strategies":["NOT_EMPTY","STRING"]},"fieldName":"Flow_Aop_Proxy_groupedAdviceChains","fieldLabel":"Flow_Aop_Proxy_groupedAdviceChains","defaultLang":"de","lang":["de","fr","it","en"],"bypassed":false},"Flow_Aop_Proxy_methodIsInAdviceMode":{"type":"text","fieldType":"text","multiLingual":false,"multiFields":false,"readOnly":false,"validation":{"strategies":["NOT_EMPTY","STRING"]},"fieldName":"Flow_Aop_Proxy_methodIsInAdviceMode","fieldLabel":"Flow_Aop_Proxy_methodIsInAdviceMode","defaultLang":"de","lang":["de","fr","it","en"],"bypassed":false},"uid":{"type":"input","fieldType":"number","multiLingual":false,"multiFields":false,"readOnly":false,"validation":{"strategies":["NOT_EMPTY","BOOLEAN"]},"fieldName":"uid","fieldLabel":"Uid","defaultLang":"de","lang":["de","fr","it","en"],"bypassed":false},"kurzname":{"type":"input","fieldType":"text","multiLingual":false,"multiFields":false,"readOnly":false,"validation":{"strategies":["NOT_EMPTY","STRING"]},"fieldName":"kurzname","fieldLabel":"Kurzname","defaultLang":"de","lang":["de","fr","it","en"],"bypassed":false},"adressnr":{"type":"input","fieldType":"number","multiLingual":false,"multiFields":false,"readOnly":false,"validation":{"strategies":["NOT_EMPTY","BOOLEAN"]},"fieldName":"adressnr","fieldLabel":"Adressnr","defaultLang":"de","lang":["de","fr","it","en"],"bypassed":false}};}
fetchFieldsConfig(){return{"uid":{"name":"uid","id":"uid","type":"int","inputType":"Number","class":"form-control egl-uid","label":"UID","inputFieldHint":"<span class='egl-hint'>The Unique Identifier (UID) for this Model</span>","placeholder":"100","readOnly":true,"useLabel":true,"defaultLang":"de","inputRequired":true,"isMulti":false,"showInTable":true,"showInForm":true,"validationStrategies":["NUM","NOT_EMPTY"]},"kurzname":{"name":"kurzname","id":"kurzname","type":"string","inputType":"Text","class":"form-control egl-kurzname","label":"Kurzname","inputFieldHint":"<span class='egl-hint'>The abbreviated form of the Name</span>","placeholder":"Kurzform","readOnly":false,"useLabel":true,"defaultLang":"de","inputRequired":false,"isMulti":false,"showInTable":true,"showInForm":true,"validationStrategies":["STRING","NOT_EMPTY"]},"adressnr":{"name":"adressnr","id":"adressnr","type":"int","inputType":"Number","class":"form-control egl-adressnr","label":"AdressNr.","inputFieldHint":"<span class='egl-hint'>The Address Number</span>","placeholder":"99","readOnly":false,"useLabel":true,"defaultLang":"de","inputRequired":true,"isMulti":false,"showInTable":true,"showInForm":true,"validationStrategies":["STRING","NOT_EMPTY"]}};}}
export default Debitor;