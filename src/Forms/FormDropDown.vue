<script>
  import Dump from "../Utilities/Dump";
  import {mapState}       from "vuex";

  export default {
    name: "FormDropDown",
    components: {Dump},
    props: ['fieldName', 'cueKey', 'entitySample'],

    data(){
      return {
        ok          : false,
        optsModels  : null,
      }
    },

    created(){
      // this.initializeOptions();
    },

    mounted(){},

    updated(){},

    render(){
      this.initializeOptions();
      return this.preRender();
    },

    methods: {
      preRender(){
        let fldConfig           = this.entitySample.fetchFieldsConfig();
        const optClass          = fldConfig[this.fieldName].optionsClass;
        let isRequired          = (fldConfig[this.fieldName].inputRequired);
        const optMap            = fldConfig[this.fieldName].optionsMap;
        const isNew             = (this.currentTask ===  'new');
        const readOnly          = (this.fieldName  ===  'uid' || fldConfig[this.fieldName].readOnly);
        let options             = this.createOptionsVNodes(optClass, fldConfig, optMap, readOnly, isNew, isRequired);
        return this.createSelectVNode(this.entitySample, isRequired, options);
      },

      /**
       * SETS THE DATA FROM THE OPTIONS MODEL TO THE STORE
       * AND RETURNS A PROMISE CONTAINING THE DATA...
       */
      async initializeOptions() {
        let fldConfig       = this.entitySample.fetchFieldsConfig();
        const optClass      = fldConfig[this.fieldName].optionsClass;
        const selfRef       = this;
        let DynamicModel    = require(`../Models/${optClass}.js`);
        const entity        = new DynamicModel.default();

        if (selfRef.optionsModels && selfRef.optionsModels[optClass]) {
          selfRef.optsModels    = selfRef.optionsModels;
          return selfRef.optionsModels[optClass];
        }else{
          const promise = entity.list({limit: 10000});

          promise.then(() => {
            this.ok               = true;
            let optsModels        = (selfRef.optionsModels !== undefined && selfRef.optionsModels) ? selfRef.optionsModels : {};
            optsModels[optClass]  = (entity.collection) ? entity.collection : [];
            selfRef.optsModels    = optsModels;
            selfRef.$store.commit('optionsModels', optsModels);
          });

          return new Promise((resolve, reject) => {
            resolve(selfRef.optionsModels[optClass]);
            reject()
          });
        }
      },

      /**
       * CREATES THE OPTIONS V-NODES: NO PROMISES
       */
      createOptionsVNodes(optionsClass, fldConfig, optMap, readOnly, isNew){
        let pleaseChoose  = 'Bitte wählen...';
        let choose        = this.$createElement('option', {
          attrs: {
            value: 'Bitte wählen...',
            selected: false,
            readonly: readOnly,
          }
        }, [pleaseChoose]);
        let options         = [choose];
        let payload;

        if(this._optsModels && (payload = this._optsModels[optionsClass])){
          for(let iKey in payload){
            const objModel  = payload[iKey];
            let optValKey   = optMap['value'];
            let optLabelKey = optMap['label'];
            let optVl       = objModel[optValKey];
            let optLbl      = objModel[optLabelKey];
            let selected    = false;

            if( (isNew || (this.entitySample && this.entitySample[this.fieldName] === undefined && this.entitySample[this.fieldName])) ){
              selected      = false;
            }else{
              if(this.entitySample[this.fieldName] && this.entitySample[this.fieldName][optValKey]){
                selected      = this.entitySample[this.fieldName][optValKey] ?
                  (parseInt(optVl) === parseInt((this.entitySample[this.fieldName][optValKey]))) : false;
              }else{selected  = false;}
            }

            if (typeof optLbl === 'object'){
              optLbl      = optLbl[this.activeLang];
              if( this.entitySample[this.fieldName] !== undefined) {
                selected    = isNew ? false : (parseInt(optVl) === parseInt((this.entitySample[this.fieldName][optValKey])));
              }
            }
            // BUILD THE OPTIONS
            let option = this.$createElement('option', {
              attrs: {
                value: optVl,
                selected: selected,
                readonly: readOnly,
              }
            }, [optLbl]);
            options.push(option);
          }
        }
        return options;
      },

      /**
       * CREATES THE DROP-DOWN...
       * FEEDS THE OPTIONS "IN" AT THE SAME TIME - IF SUPPLIED...
       */
      createSelectVNode(entity, required, options=[]){
        return this.$createElement('select', {
          attrs: {
            id: `${this.fieldName}`,
            name: `${this.fieldName}`,
            required: required,
            class: `form-control ${required} egl-${this.fieldName}`,
            'data-value': entity[this.fieldName]
          }
        }, options);
      },
    },

    computed : {
      ...mapState([
        'activeLang',
        'optionsModels',
      ]),

      ok2Render: {
        get() {
          return !!this._optsModels;
        }
      },

      _optsModels: {
        get() {
          return this.optsModels;
        }
      },
    }
  }
</script>

<style scoped>

</style>