<template>
  <v-app>
    <v-toolbar
      :clipped-left="$vuetify.breakpoint.lgAndUp"
      class="elevation-1"
      color="blue-grey lighten-5"
      light
      app
      fixed
    >
      <v-toolbar-title style="width: 300px" class="ml-4">
        <span class="hidden-sm-and-down">
          <img :src="require('@/assets/logo.png')" class="egl-logo">
        </span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn icon class="mr-2">
        <v-badge overlap color="accent">
          <template v-slot:badge>
            10
          </template>
          <v-icon medium color="primary darken-1">notifications</v-icon>
        </v-badge>
      </v-btn>
      <v-btn icon class="mr-4">
        <v-menu
          v-model="value"
          :disabled="disabled"
          :absolute="absolute"
          :open-on-hover="openOnHover"
          :close-on-click="closeOnClick"
          :close-on-content-click="closeOnContentClick"
          :offset-x="offsetX"
          :offset-y="offsetY"
        >
          <template v-slot:activator="{ on }">
            <v-icon  medium color="primary darken-1">person</v-icon>
          </template>
          <v-list>
            <span
              v-for="(item, index) in items"
              :key="index"
            >
              <span>{{ item.title }}</span>
            </span>
          </v-list>
        </v-menu>
      </v-btn>
    </v-toolbar>
    <v-content>

      <Alert :jqr="jqr"
             :addActionButtons="addAlertButtons"
             :actionButtonsTextsArray="alertButtonsTextsArray"
             :alertTitle="alertTitle"
             :alertMessage="alertMessage"
             :renderDialog="renderDialog"
             :updateDialogState="updateDialogState"></Alert>

      <div class="row">
        <div class="col s2">
          <div class="egl-column-left">
            <h1 class="egl-prime-heading">{{ navMenuTitle }}</h1>
            <nav class="egl-nav-menu">
              <Menu   :updateActualData="updateActualData"
                      :jqr="jqr"
                      :setReadyState="setReadyState"
                      :setActiveCollection="setActiveCollection"></Menu>
            </nav>
          </div>
        </div>
        <div class="col s10 egl-main-content-wrapper">
          <div class="egl-column-main">
            <header class="egl-main-top-bar" v-html="_pageHeadingTitle"></header>

            <div class="col-md-12 no-lr-pad egl-form-wrapper">
              <ModelRenderer :createNewEntity="createNewEntity"
                             :processCRUDActions="processCRUDActions"
                             :sortResultBy="sortResultBy"
                             :jqr="jqr"
                             :NavConfig="NavMenu"
                             :addressRelatedModels="_addressRelatedModels"></ModelRenderer>
            </div>
          </div>
        </div>
      </div>

      <div>
        <section class="egl-footer-wrapper" id="egl-footer-wrapper">
          <footer class="egl-footer" id="egl-footer">
            <section class="row egl-footer-inner">
              <aside class="col-md-4 egl-ftr-left"></aside>
              <aside class="col-md-4 egl-ftr-middle"></aside>
              <aside class="col-md-4 egl-ftr-right">
                <span class="egl-ftr-content-right egl-ftr-coy-name">Eglis AG</span>
                <span class="egl-ftr-content-right egl-ftr-coy-address">Riedeggweg 70 C</span><!-- <br />Postfach 3399 -->
                <span class="egl-ftr-content-right egl-ftr-coy-extras"></span>
              </aside>
            </section>
          </footer>
        </section>
      </div>
    </v-content>
  </v-app>
</template>

<script>
  import $              from 'jquery';
  import Alert          from "./Utilities/Alert";
  import NavMenu        from "./Data/NavMenu";
  import ModelRenderer  from "./components/Renderer/ModelRenderer";
  import Menu           from "./components/Menu/Menu";
  import SharedMethods  from "./Services/SharedMethods";
  import { mapState }   from 'vuex'
  import Mappable       from "./Store/MappableStateVariables";

  export default {
    name: 'app',
    components: {
      Menu,
      Alert,
      ModelRenderer,
    },

    render(h){
      return h()
    },

    created(){
      let bodyObj = document.querySelector('body');
      bodyObj.classList.remove("theme-success", "theme-conservative", "theme-joyous");
      bodyObj.classList.add(this.theme);
    },

    data() {
      return {
        jqr                   : $,
        NavMenu               : NavMenu.Menu,
        currentRoute          : "",
        pageHeadingTitle      : "",
        addressRelatedModels  : [],
        items                 : [
          { title: 'Click Me' },
          { title: 'Click Me' },
          { title: 'Click Me' },
          { title: 'Click Me 2' },
        ],
        disabled                : false,
        absolute                : false,
        openOnHover             : false,
        value                   : false,
        closeOnClick            : true,
        closeOnContentClick     : true,
        offsetX                 : false,
        offsetY                 : true,

        // ALERT/DIALOG SETTINGS
        alertTitle              : 'Confirm Your Action.',
        alertMessage            : '',
        addAlertButtons         : true,
        renderDialog            : false,
        alertButtonsTextsArray  : [
          {label: 'Ja',   handler: null, id: 'egl-btn-yes', color: 'green darken-1'},
          {label: 'Nein', handler: null, id: 'egl-btn-no',  color: 'red darken-1'},
        ],
      }
    },

    watch: {
      $route: function (val) {
        this.currentRoute  = val.fullPath;
        console.log(this.currentRoute);
      },
    },

    computed: {
      ...mapState(Mappable),

      _pageHeadingTitle: {
        get() {
          let htmlString = "";
          if(this.pageTitle){
            htmlString += `Verwaltung `;
            htmlString += this.pageTitle.trim() ? `<span>&mdash; ${this.pageTitle}</span>` : "";
            htmlString += `<span class="egl-group-name"> -- ${this.sideBarRightData.groupKey}</span>`
          }else{
            htmlString += this.appName;
          }

          return htmlString;
        },

        set(pageHeadingTitle) {
          this.pageHeadingTitle = pageHeadingTitle;
        },
      },
      _addressRelatedModels: {
        get() {
          this.getModelsUnderAdressenGroup();
          return this.addressRelatedModels;
        },
        set(addressRelatedModels) {
          this.addressRelatedModels  = addressRelatedModels;
        }
      },
    },

    methods: {
      getModelsUnderAdressenGroup(){
        let cueKey;
        if(this.addressRelatedModels.length <= 0){
          for(cueKey in this.NavMenu.adressen){
            const objMenu   = this.NavMenu.adressen[cueKey];
            if(undefined !== objMenu.className) {
              this.addressRelatedModels.push(objMenu.className);
            }
          }
        }
        return this.addressRelatedModels;
      },

      updateDialogState(boolStatus){
        this.renderDialog = boolStatus;
      },

      processCRUDActions(e, entity, task) {
        let selfRef                       = this;
        let dispatcher                    = e.target;
        let deleteQuestion                = SharedMethods.getActionQuestionBase('permanently delete');
        let deactivateQuestion            = SharedMethods.getActionQuestionBase(this.jqr(dispatcher).attr('data-action'));
        const uid                         = dispatcher.getAttribute("data-uid");

        this.$store.commit('modelName',       ((entity && entity.className) ? entity.className : null));
        this.$store.commit('triggerClicked',  true);
        this.$store.commit('targetEntity',    this.findByUID(uid, true));
        let formConfig                    = (this.targetEntity && this.targetEntity.fetchFieldsConfig() !== undefined) ?
          this.targetEntity.fetchFieldsConfig() : [];

        switch (task.toLowerCase()) {
          case 'edit':
            this.$store.commit('showForm',    true);
            this.$store.commit('formConfig',  formConfig);
            break;

          case 'delete':
            this.$store.commit('showForm',    false);
            deleteQuestion += `
<strong style="color:red;">${this.targetEntity.className}</strong> -
specifically that with <strong style="color:red;">ID: ${this.targetEntity.uid}?</strong>
<div class="egl-space-divider"></div>
<strong>IMPORTANT:</strong><br />
<span style="color:#8000a1;font-weight:700;">This operation is <strong style="color:red">NOT REVERSIBLE!!!</strong></span>`;

            this.renderDialog = true;
            this.alertMessage = deleteQuestion;
            this.alertTitle   = 'Entfernung bestätigen.';
            this.alertButtonsTextsArray[0].handler   = (ev)=>{ this.deleteEntity(ev, this.targetEntity.uid) };
            this.alertButtonsTextsArray[1].handler   = (ev)=>{ this.deleteEntity(ev, this.targetEntity.uid) };
            break;

          case 'deactivate':
            this.$store.commit('showForm',    false);
            deactivateQuestion += `
<strong style="color:red;">${this.targetEntity.className}</strong> -
specifically that with <strong style="color:red;">ID: ${this.targetEntity.uid}?</strong>` ;

            this.renderDialog = true;
            this.alertMessage = deactivateQuestion;
            this.alertTitle   = 'Deaktivierung bestätigen.';
            this.alertButtonsTextsArray[0].handler   = (ev)=>{ this.deactivateEntity(ev, this.targetEntity.uid) };
            this.alertButtonsTextsArray[1].handler   = (ev)=>{ this.deactivateEntity(ev, this.targetEntity.uid) };
            break;

          case 'new':
            this.$store.commit('showForm',    true);
            this.$store.commit('formConfig',  formConfig);
            break;

          default:
            this.$store.commit('showForm',    false);
            break;
        }

        if( this.showForm ) {
          this.jqr("#pz-hidden-form-wrapper").fadeIn({duration: 350, complete:function(){
              selfRef.jqr('#egl-form-container').fadeIn(500);
            }});
        }
      },

      deactivateEntity(e, uid){
        if(e.target.getAttribute('id') === 'egl-btn-yes'){
          const promiseObj    = this.targetEntity.deactivate({uid});
          this.conditionallyUpdateRenderData(promiseObj);
        }
      },

      deleteEntity(e, uid){
        if(e.target.getAttribute('id') === 'egl-btn-yes'){
          console.log(uid);
          // TODO: WAIT TILL YOU CONFIRM FROM ADRIAN + BEAT IF THE ENTITY SHOULD REALLY BE DELETED OR FLAGGED AS DELETED.
          // const promiseObj    = this.targetEntity.delete({uid});
          // this.conditionallyUpdateRenderData(promiseObj);
        }
      },

      conditionallyUpdateRenderData(promiseObj){
        let selfRef           = this;
        if( (promiseObj || promiseObj instanceof Promise)){
          promiseObj.then((data)=>{
            const entityData  = (data.data.payload) ? data.data.payload : null;
            const entityUID   = (entityData && entityData.uid) ? entityData.uid : null;

            if(entityData && entityUID){
              let Model       = require('./Models/' + selfRef.targetEntity.className + '.js');
              const entityObj = new Model.default(entityData);
              SharedMethods.updateDataByUID(this, entityUID, entityObj, selfRef.jqr, this.currentTask.toLowerCase());
            }
          });
        }

      },

      createNewEntity(){
        let formConfig;
        let task      = 'new';
        let selfRef   = this;

        if(this.ActivityTitleAffixes !== undefined){
          const activityTitle = this.ActivityTitleAffixes[this.activeLang][task].prefix + ' ' + this.activeModel + this.ActivityTitleAffixes[this.activeLang][task].suffix;
          this.$store.commit('activityTitle', activityTitle);
        }

        const Model                       = require('./Models/' + this.activeModel + '.js');
        const entityObj                   = new Model.default();

        selfRef.$store.commit('currentTask',      task);
        selfRef.$store.commit('targetEntity',     entityObj);
        selfRef.$store.commit('modelName',        ((entityObj  && entityObj.className) ? entityObj.className : null ));
        selfRef.$store.commit('triggerClicked',   true);
        selfRef.$store.commit('showForm',         true);
        selfRef.$store.commit('formConfig',       ((formConfig = entityObj.fetchFieldsConfig()) !== undefined ? formConfig : []));

        this.jqr("#pz-hidden-form-wrapper").fadeIn({duration: 350, complete:function(){
            selfRef.jqr('#egl-form-container').fadeIn(500);
          }});
      },

      setReadyState(readyState) {
        this.$store.commit('isRenderReady', readyState);
      },

      setActiveCollection(collection) {
        this.$store.commit('modelCollection', collection);
        this.$store.commit('activeCollection', collection);
        this.$store.commit('renderData', collection);
        this.$store.commit('filteredCollection', collection);
      },

      getFieldValue(fieldValue, key='bezeichnung'){
        return (typeof fieldValue === 'object') ?  fieldValue[key] :  fieldValue;
      },

      findByUID(uid){
        let key;
        for(key in this.renderData){
          const data = this.renderData[key];
          if(parseInt(data.uid) === parseInt(uid)){
            return this.renderData[key];
          }
        }
        return false;
      },

      updateActualData(data, objNames) {
        this.$store.commit('modelName',   objNames.modelName);
        this.$store.commit('groupName',   objNames.groupName);
        this.$store.commit('pageTitle',   objNames.modelName);
        this.$store.commit('tableFields',         true);
        this.$store.commit('renderData',          data);
        this.$store.commit('dataCollection',      data);
        this.$store.commit('filteredCollection',  data);
      },

      sortResultBy(e, fieldName, orientation='1'){
        const fieldConfig = SharedMethods.getFieldConfigInfo(fieldName, this.dataSample);
        const fieldType   = (fieldConfig) ? fieldConfig.type: null;

        if(orientation === '1'){
          const sorted = this.renderData.sort((a, b) => {
            if((!a[fieldName] || !b[fieldName]) && (a[fieldName] !== 'boolean') && (parseInt(a[fieldName]) !== 0 || parseInt(b[fieldName]) !== 0)){return !!+orientation;}

            if(fieldType){
              if(fieldType ==="MultilingualString"){
                return ( a[fieldName][this.activeLang] > b[fieldName][this.activeLang] ? 1 : -1 );
              }else if( fieldType === 'string'){
                return ( a[fieldName] > b[fieldName] ? 1 : -1 );
              }else if( fieldType === 'number'  || fieldType === 'integer'  || fieldType === 'int' ){
                return ( parseInt(a[fieldName]) > parseInt(b[fieldName]) ? 1 : -1 );
              }else if( fieldType === 'float'   || fieldType === 'double'){
                return ( parseFloat(a[fieldName]) > parseFloat(b[fieldName]) ? 1 : -1 );
              }else if( /^[A-Z]/.test(fieldType) ){
                const fldAccessor = fieldConfig.optionsMap.label;
                return ( a[fieldName][fldAccessor] > b[fieldName][fldAccessor] ? 1 : -1 );
              }
            }
          });
          this.$store.commit('renderData', sorted);
        }else{
          const sorted = this.renderData.sort((a, b) => {
            if((!a[fieldName] || !b[fieldName]) && (a[fieldName] !== 'boolean') && (parseInt(a[fieldName]) !== 0 || parseInt(b[fieldName]) !== 0)){return !!+orientation;}

            if(fieldType){
              if(fieldType === "MultilingualString"){
                return ( a[fieldName][this.activeLang] < b[fieldName][this.activeLang] ? 1 : -1 );
              }else if( fieldType === 'string'){
                return ( a[fieldName] < b[fieldName] ? 1 : -1 );
              }else if( fieldType === 'number'  || fieldType === 'integer'  || fieldType === 'int' ){
                return ( parseInt(a[fieldName]) < parseInt(b[fieldName]) ? 1 : -1 );
              }else if( fieldType === 'float'   || fieldType === 'double'){
                return ( parseFloat(a[fieldName]) < parseFloat(b[fieldName]) ? 1 : -1 );
              }else if( /^[A-Z]/.test(fieldType) ){
                const fldAccessor = fieldConfig.optionsMap.label;
                return ( a[fieldName][fldAccessor] < b[fieldName][fldAccessor] ? 1 : -1 );
              }
            }
          });
          this.$store.commit('renderData', sorted);
        }
      },
    }

  }
</script>

<style>
  @import './assets/css/animate.css';
  @import './assets/css/font-awesome.min.css';
  @import  '../node_modules/materialize-css/dist/css/materialize.css';
  @import './assets/css/egl-api.css';
</style>