<template>
    <section>
        <div class="egl-form-container col-md-12" id="egl-form-container">
            <form :class="`egl-form egl-form-${activityTitle}`" method="post" @submit="saveFormData" :key="formID" :id="formID">
                <span class="fa fa-window-close pz-close-form-box" @click="hideFormViewer" v-if="!hideCloseButton" ></span>

                <h1 class="egl-form-title-heading"> <span class="fa fa-chevron-left pull-left" style="cursor:pointer;" @click="goBack" ></span>  {{ activityTitle }}</h1>

                <template v-for="(fieldName, cueKey) in fetchVisibleFields(targetEntity, 'form').fields">
                    <template v-if="targetEntity.fetchFieldsConfig()[fieldName]">
                        <FormInput :targetEntity="targetEntity"
                                   :key="cueKey"
                                   :currentTask="currentTask"
                                   :currentEvent="currentEvent"
                                   :addressRelatedModels="addressRelatedModels"
                                   :fieldName="fieldName"
                                   :cueKey="cueKey"></FormInput>
                    </template>
                </template>

                <div class="form-group col s3 offset-s9 col-md-3 col-md-offset-9 egl-extra-pad egl-btn-wrapper" v-if="addressRelatedModels.length > 0 && addressRelatedModels.indexOf(activeModel) === -1">
                    <input type="submit" class="form-control" id="saveForm" value="Speichern" @submit="saveFormData" />
                </div>
            </form>
        </div>
    </section>
</template>

<script>
    import FormInput        from "./FormInput";
    import SharedMethods    from "../Services/SharedMethods";
    import {mapState}       from "vuex";

    export default {
        name: "EntityForm",
      props: [ "jqr", "addressRelatedModels", "hideCloseButton"],
        mixins: [],
        components: {FormInput,},

        /*=================================*/
        /*===== LIFE CYCLE HOOKS BEGIN ====*/
        /*=================================*/
        created() {
        },

        mounted() {
        },

        updated() {
            const target    = document.querySelector("#pz-hidden-form-wrapper");
            if(this.triggerClicked){
                target.style.display = "block";
                target.querySelector("#egl-form-container").classList.add('bounceInDown');
            }
            this.$store.commit('triggerClicked', false);
        },

        beforeCreate() {
        },

        beforeMount() {
        },

        beforeUpdate() {
        },
        /*=================================*/
        /*===== LIFE CYCLE HOOKS: END =====*/
        /*=================================*/

        computed : {
          ...mapState([
            "renderer",
            "triggerClicked",
            "renderData",
            "activeModel",
            "targetEntity",
            "dataSample",
            "activeLang",
            "currentTask",
            "currentEvent",
            "activityTitle",
          ]),
          formID:{
            get () {
              let fid = "form-edit-update-" + Math.floor(Math.random()*198765433);
              if(this.targetEntity && this.targetEntity.uid){
                fid =  "form-edit-update-" + this.targetEntity.uid;
              }
              return fid;
            },
          }
        },


        data() {
            return {
            };
        },
        methods: {
            fetchVisibleFields(entity, target='table'){
                return SharedMethods.fetchVisibleFields(entity, target);
            },

            saveFormData(e){
                e.preventDefault();
                const selfRef   = this;
                let fData       = e.target.querySelectorAll("input:not([type='submit']), select, textarea, button");
                let payload     = this.extractFormData(fData);
                let formDataObj = new FormData();
                let savePromise = null;

                for(let key in payload){
                    let value = payload[key];
                    if(typeof value === 'object') value = JSON.stringify(value);
                    formDataObj.append(key, value.replace(/^['"]/, '').replace(/['"]$/, ''));
                }

                // TODO: HERE YOU SHOULD VALIDATE THE USER INPUT & SANITIZE THEM BEFORE FURTHER PROCESSING...

                // CALL AN INSTANCE METHOD: `set()`, `add()`, `delete()` OR `deactivate()` ON THE TARGET ENTITY
                // DEPENDING ON THE TASK AT HAND ....PASSING IT AN INSTANCE FORM-DATA OBJECT
                switch(this.currentTask.toLowerCase()){
                    case 'edit':
                        savePromise = this.targetEntity.set(formDataObj);
                        break;
                    case 'new':
                        savePromise = this.targetEntity.add(formDataObj);
                        break;
                    case 'delete':
                        savePromise = this.targetEntity.delete(formDataObj);
                        break;
                    case 'deactivate':
                        savePromise = this.targetEntity.deactivate(formDataObj);
                        break;
                }

                savePromise.then((data)=>{
                  const entityData  = (data.data.payload) ? data.data.payload : null;
                  const response    = (data.data.response) ? data.data.response : null;
                  const entityUID   = (entityData && entityData.uid) ? entityData.uid : null;
                  let EntityModel   = require('../Models/' + selfRef.targetEntity.className + '.js');
                  const entityObj   = new EntityModel.default(entityData);
                  // const statusText  = (data.data.status) ? data.data.status : null;
                  // const description = (data.data.description) ? data.data.description : null;
                  if(entityUID){
                    const boolFlags = ['deactivated', 'hidden', 'deleted' ];

                    for(let status of boolFlags){
                      if(entityObj[status] !== undefined){
                        entityObj[status]=  (entityObj[status] || (parseInt(entityObj[status]) === 1));
                      }
                    }
                  }
                  if(response === 200){
                    SharedMethods.updateDataByUID(this, entityUID, entityObj, selfRef.jqr, this.currentTask.toLowerCase());
                    SharedMethods.renderHTMLContentWithinAModalBox(`
        <div class="col-md-12 col m12 s12 l12 egl-chained-filter-inner-box" style="text-align:center;color:#85c728;font-size:1.25em;padding-top:4em;padding-bottom:4em;
background: rgba(220, 226, 231, 1.0); order: dashed 1px #bccad6;">
            <h3>Transaction Successful...</h3>
       </div>
                    `, 85, 500, this.goBack);
                  }

                });
            },

            goBack (){
              this.$store.commit('recaptureMenuState', false);
              window.history.back();
            },

            hideFormViewer(){
                const selfRef = this;
                this.jqr("#egl-form-container").fadeOut({duration: 350, complete:function(){
                        selfRef.jqr('#pz-hidden-form-wrapper').fadeOut(350);
                    }});
            },

            getFieldValue(fieldValue, key='bezeichnung'){
                return (typeof fieldValue === 'object') ?  fieldValue[key] :  fieldValue;
            },

            extractFormData(formData, asFormData=false){
                let extract       = {};
                let rootNames     = new Set();
                let formDataObj   = new FormData();

                formData.forEach( (htmlControl)=>{
                    if(/(_(de|fr|it|en))/gi.test(htmlControl.getAttribute("name"))){
                        let rootName = htmlControl.getAttribute("name").replace(/(_(de|fr|it|en))/gui, "");
                        let subName  = htmlControl.getAttribute("name").replace(/(.+)(_)(de|fr|it|en)/gui, "$3");
                        if(Object.keys(extract).indexOf(rootName) === -1){
                            extract[rootName] = {};
                        }
                        extract[rootName][subName] = htmlControl.value;
                        rootNames.add(rootName);
                    }else{
                        extract[htmlControl.getAttribute("name")] = htmlControl.value;
                    }
                });

                rootNames         = [...rootNames];   // Array.from(rootNames);
                for(let fldKey in extract){
                    if(asFormData){
                        formDataObj.set(fldKey, extract[fldKey]);
                    }
                }
                return asFormData ? formDataObj : extract;
            },
        },
    }
</script>

<style scoped>

</style>