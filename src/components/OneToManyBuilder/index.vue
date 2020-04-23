<script type="text/jsx">
  import { mapState }   from 'vuex'
  import Sorte          from "../../Models/Sorte";


  export default {
    name: "OneToManyBuilder",
    props: [ "entitySample", "fieldName", "className"],

    data(){
      return {
        entityPayload       : [],
        entityModel         : this.entitySample,
        etPayloadSet        : {},
        modelData           : [],
        oneToManyChooser    : '',
        unoToManyCollection : [],
      }
    },

    created(){
      if(!this._modelData.length){
        const objSorts  = new Sorte();    // Sorte SHOULD BE DYNAMIC NOT HARD-CODED...
        objSorts.list({limit: 1000}).then(()=>{
          this.modelData = objSorts.collection;
        });
      }

      let One2ManyModel     = require(`../../Models/${this.targetEntity.className}.js`);
      let objOne2Many       = new One2ManyModel.default();

      if(this.unoToManyCollection.length === 0){
        objOne2Many.list({limit: 500}).then(()=>{
          this.unoToManyCollection = objOne2Many.collection;
          this.getOneToManyChooser(this._entityModel.uid);
        });
      }
      this.fetch()
    },

    mounted(){
    },

    beforeMount(){
    },

    beforeUpdate(){
    },

    updated(){
    },

    render(h){
      this.fetch(h);
      return (
        <div className="row">
          <div className="">{this._oneToManyChooser}</div>
          <div className="">{this.getComponentRenderBlock(h)}</div>
        </div>
      );
    },

    methods: {

      updateEntityModel(e){
        let modelUID          = e.target.value;
        let One2ManyModel     = require(`../../Models/${this.targetEntity.className}.js`);
        let objOne2Many           = new One2ManyModel.default();
        this.entityPayload        = [];

        objOne2Many.show({uid: modelUID}).then((data)=>{
          this.etPayloadSet     = {};
          this._etPayloadSet    = {};
          objOne2Many           = new One2ManyModel.default(data.data);
          this.entityModel      = objOne2Many;

          let loopIndex;
          const modelInstances  = this.getTargetEntityInstance();

          for(loopIndex in modelInstances){
            const modelData = modelInstances[loopIndex];
            const Model     = require(`../../Models/${this.className}.js`);
             let entity      = new Model.default(modelData);
            this.craftEtPayload(entity);
            this.entityPayload.push(entity);
          }
        });
        this.fetch();

      },

      getOneToManyChooser(fieldUID){
        const options = this.getMainChooserOptions(fieldUID);
        const select  =  this.$createElement('select', {
          attrs: {
            id: `${this.fieldName}`,
            name: `${this.fieldName}`,
            required: true,
            class: `form-control egl ${this.fieldName}`,
            'data-value': fieldUID,                         // SorteUID
            'data-uid': `${fieldUID}`                       // MischungsortekomponenteUID
          },
          on: {
            change: this.updateEntityModel,
          }
        }, options);

        this.oneToManyChooser =  this.$createElement('div', {
          attrs: {
            class: `col-md-12 col s12`,
            style: `margin-bottom:10px;`
          }
        }, [select]);
        return this.oneToManyChooser;
      },

      getMainChooserOptions(fieldUID){
        let loopIndex;
        let pleaseChoose  = 'Bitte wählen...';
        let choose        = this.$createElement('option', {
          attrs: {
            value: 'Bitte wählen...',
            selected: false,
          }
        }, [pleaseChoose]);
        let options         = [choose];
        if(this._unoToManyCollection){
          for(loopIndex in this._unoToManyCollection){
            const collectionItem  = this._unoToManyCollection[loopIndex];
            let collectionMix     = `(${collectionItem.uid})  ${collectionItem['bezeichnung'][this.activeLang]}`;
            let option            = this.$createElement('option', {
              attrs: {
                value: collectionItem.uid,
                selected: (collectionItem.uid === fieldUID),
              }
            }, [`${collectionMix}`]);
            options.push(option);
          }
        }
        return options;
      },

      preRender(entityObject){
        if(entityObject !== undefined && entityObject){
          this.craftEtPayload(entityObject);
        }
      },

      craftEtPayload(entityObject){
        let optionsMap, lblKey1, lblKey2, optKey1, optVal1, optVal2, optsMap1;
        let fldConfig   = this.targetEntity.fetchFieldsConfig();
        optionsMap      = fldConfig[this.fieldName].optionsMap;
        const optKeys   = Object.keys(optionsMap);

        if(optKeys.indexOf('label1') && optKeys.indexOf('label2')) {
          lblKey1   = optionsMap['label1'];
          lblKey2   = optionsMap['label2'];
          optKey1   = lblKey1.optionsKey;
          optsMap1  = lblKey1.optionsMap;       // DELIVERS AN OBJECT WITH 2 KEYS: `label` AND `value`
        }

        optVal1     = entityObject[optKey1];    // POINTS TO A SORTE OBJECT FROM WHICH YOU CAN ACCESS BEZEICHNUNG...
        optVal2     = entityObject[lblKey2];    // POINTS TO PERCENTAGE COMPOSITION: ANTEIL

        optVal1     = (typeof optVal1 === 'object') ? optVal1[optsMap1['label']][this.activeLang] : optVal1[optsMap1['label']];
        const sKey  = (optVal1 + optVal2).replace(" ", "_");
        this._etPayloadSet[sKey] = {
          title       : optVal1,
          percentage  : optVal2,
          value       : entityObject[lblKey1['optionsKey']]['uid'],
          model       : entityObject[lblKey1['optionsKey']],
          uid         : entityObject.uid
        };
      },

      buildFieldRow(objData, h){
        const entityName  = this.$route.name.replace(/_.+$/gi, "");
        this.curRoute     = this.$route.fullPath;
        const pageID      = this.$route.params['id'];
        if(!this.dataSample ){
          let One2ManyModel     = require(`../../Models/${entityName}.js`);
          let objOne2Many       = new One2ManyModel.default();
          objOne2Many.show({uid: pageID}).then((data)=>{
            this.$store.commit("dataSample", new One2ManyModel.default(data.data));
          });
        }else{
          let fldConfig       = this.dataSample.fetchFieldsConfig();
          let optionsMap      = fldConfig[this.fieldName].optionsMap;
          const titleName     = optionsMap['label1'].optionsKey;  // sorte
          const percentName   = optionsMap['label2'];             // anteil
          const dataCrumb     = {title: titleName, value: objData.value, uid: objData.uid};
          const titleBlock    = this.buildFieldBlock(dataCrumb, objData.title, 'col-md-6 col s6 egl-title-block-wrapper', 'sorte', dataCrumb);
          const perCentBlock  = this.buildFieldBlock(percentName, objData.percentage, 'col-md-2 col s2 egl-percent-block-wrapper',  'percent', dataCrumb );
          const CRUD_BTNS     = this.buildCRUDButtonsBlock(h, objData.uid);
          let fieldsRow       = this.$createElement('div',
            {
              attrs: {
                'id'    : 'egl-field-row-wrapper',
                'class' : 'egl-field-row-wrapper'
              }
            }, [titleBlock, perCentBlock, CRUD_BTNS]);
          return this.$createElement('div',
            {
              attrs: {
                'class' : 'col-md-12 col s12'
              }
            }, [fieldsRow]);
        }
      },

      buildFieldBlock(fieldName, fieldValue, blockClass='col-md-5 col s5 egl-title-block-wrapper', type='sorte', dataCrumb={}){
        let fieldElement, baseUID, nameOfField;
        nameOfField       = (fieldName.title  !== undefined) ? fieldName.title  : fieldName;
        baseUID           = (fieldName.uid    !== undefined) ? fieldName.uid    : ( (dataCrumb.uid !== undefined) ? dataCrumb.uid : null );
        let fldName       = nameOfField.split('').map( (char, iKey)=>{ return (iKey === 0) ? char.toUpperCase() : char;}).join('');
        fldName          += type.toLowerCase() === 'sorte' ? '' : ' [%]';
        let microLabel    = this.$createElement('span',
          {
            attrs: {
              'class'   : `egl-micro-label egl-micro-label-${nameOfField}`,
              'id'      : `egl-micro-label-${nameOfField}`,
            }
          }, [`${fldName}`]);

        fieldElement  = this.$createElement('div',
          {
            attrs: {
              'class'   : `form-control egl-1-to-many-field ${fieldName} egl-${fldName.toLowerCase()}`,
              'id'      : `${fieldName}_${baseUID}_${this.targetEntity.uid}_${dataCrumb.value}`,
              'name'    : `${fieldName}_${baseUID}`,
            }
          }, [fieldValue]);

        return this.$createElement('div',
          {
            attrs: {
              'class' : blockClass
            }
          }, [microLabel, fieldElement]);
      },

      // eslint-disable-next-line
      buildCRUDButtonsBlock(h, uid){
        const linkTo  = `/mischung-sorte-komponente/edit/${uid}`; // mischung-sorte-komponente
        return (
          <div class="col-md-4 col s4 egl-crud-block-wrapper">
            <span class="fa fa-pencil pz-icon pz-edit" data-link={linkTo} onclick={()=>this.redirectTo(linkTo)} />
          </div>
        );
        /*
            <span className="fa fa-clone pz-icon pz-edit" />
            <span className="fa fa-trash pz-icon pz-delete"/>
            <span className="fa fa-plus-square pz-icon pz-delete"/>
         */
      },

      redirectTo (url){
        window.location.href = url;
      },

      getTargetEntityInstance(){
        return this._entityModel[this.fieldName];
      },

      fetch(){
        if(this._entityPayload.length === 0 ) {
          let loopIndex;
          const modelInstances  = this.getTargetEntityInstance();

          for(loopIndex in modelInstances){
            const modelData = modelInstances[loopIndex];
            const Model     = require(`../../Models/${this.className}.js`);
            let entity      = new Model.default(modelData);
            this.preRender(entity);
            this.entityPayload.push(entity);
          }
        }
      },

      getComponentRenderBlock(h){
        return Object.values(this._etPayloadSet).map((objData) => {
          return this.buildFieldRow(objData, h);
        });

      }
    },

    computed: {
      ...mapState([
        "activeLang",
        "dataSample",
        "targetEntity",
      ]),

      _entityPayload: {
        get (){
          return this.entityPayload;
        },
        set (){}
      },

      _unoToManyCollection: {
        get (){
          return this.unoToManyCollection;
        },
        set (unoToManyCollection){
          this.unoToManyCollection = unoToManyCollection;
        }
      },

      _modelData: {
        get (){
          return this.modelData;
        },
        set (modelData){
          this.modelData = modelData;
        }
      },

      _etPayloadSet: {
        get (){
          return this.etPayloadSet;
        },
        set (){}
      },

      _oneToManyChooser: {
        get (){
          return this.oneToManyChooser;
        },
        set (oneToManyChooser){
          this._oneToManyChooser = oneToManyChooser;
        }
      },

      _entityModel: {
        get (){
          return this.entityModel;
        },
        set (entityModel){
          this.entityModel = entityModel;
        }
      },
    }
  }
</script>

<style scoped>

</style>