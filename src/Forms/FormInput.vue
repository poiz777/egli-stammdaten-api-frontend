<script>
  import $                from 'jquery';
  import FormFieldHint    from '../components/Partials/FormFieldHint';
  import FormDropDown     from '../Forms/FormDropDown';
  import Dump             from '../Utilities/Dump';
  import Datepicker       from 'vuejs-datepicker';
  import ToggleSwitch     from '../Widgets/ToggleSwitch/ToggleSwitch';
  import OneToManyBuilder from '../components/OneToManyBuilder';
  import {mapState}       from "vuex";

  export default {
    name: "FormInput",
    props: ["fieldName", "label", "id", "type", "cueKey", "addressRelatedModels"],
    components: {FormFieldHint, FormDropDown, Dump, ToggleSwitch, Datepicker, OneToManyBuilder},

    data() {
      return {
        jqr: $,
        dDown: null,
      };
    },

    mounted(){},

    render() {
      // WRAPPER: FORM-GROUP WRAPPER
      let fldConfig     = this.entitySample.fetchFieldsConfig();
      let lbl           = fldConfig[this.fieldName].label;
      let label         = '';
      let inputWrapper  = '';
      const isNew       = (this.currentTask.toLowerCase() === 'new' || this.entitySample[this.fieldName] === undefined );
      const disabled    = (this.addressRelatedModels.indexOf(this.entitySample.className) !== -1);
      const minLength   = (fldConfig[this.fieldName].minLength !== undefined) ? fldConfig[this.fieldName].minLength : null;
      const maxLength   = (fldConfig[this.fieldName].maxLength !== undefined) ? fldConfig[this.fieldName].maxLength : null;
      const readOnly    = (this.fieldName === 'uid' || fldConfig[this.fieldName].readOnly || disabled);
      let isRequired    = (fldConfig[this.fieldName].inputRequired);
      const _IS_REQUIRED_FLAG = isRequired ? 'required' : null;

      // FIELD TYPE
      let type = 'text';
      switch (fldConfig[this.fieldName].inputType.toLowerCase()) {
        case 'number':
        case 'Integer':
        case 'Int':
        case 'float':
        case 'double':
          type = 'number';
          break;

        case 'text':
        case 'string':
          type = 'text';
          break;

        case 'date':
        case 'time':
        case 'datetime':
        case 'datetime-local':
          type = 'datetime-local';
          break;
      }
      if (isNew && this.fieldName === 'uid') {
        return;
      }

      let fgWrapper = this.createChildlessDOMElement('div', {attrs: {class: 'form-group col-md-12 col s12'}});

      // LABEL ITEM
      if (fldConfig[this.fieldName].useLabel) {
        let lblVal = !(isRequired) ? lbl : lbl + "*";
        let lblClass = isRequired ? 'col-md-4 col s4 egl-required' : 'col-md-4 col s4';
        if(this.isToggleSwitchType(fldConfig[this.fieldName].type)){
          label = this.createChildlessDOMElement('label', {attrs: {class: lblClass, 'for': this.fieldName}, on:{click: (e)=>{this.triggerToggleSwitch(e);}}, children: [lblVal]});
        }else{
          label = this.createChildlessDOMElement('label', {attrs: {class: lblClass, 'for': this.fieldName}, children: [lblVal]});
        }
      }

      inputWrapper = this.createChildlessDOMElement('div', {attrs: {class: 'col-md-8 col s8'}});
      // FORM-INPUT ITEM
      if (fldConfig[this.fieldName].isMulti) {
        let tmpKey = 0;
        let multiWrapperDiv = null;
        for (let language of fldConfig[this.fieldName].languages) {
          tmpKey++;
          // CREATE A DIV TO HOLD EACH SEPARATE/SINGLE MULTILINGUAL FIELD
          multiWrapperDiv = this.createChildlessDOMElement('div', {
            attrs: {
              class: 'egl-multi-lang',
              key: `multi-lang-wrap-${tmpKey}`
            }
          });

          // CREATE THE LANGUAGE INDICATOR SIDE-BOX:
          let langIndicator = this.createChildlessDOMElement('span', {
            attrs: {class: 'egl-lang-indicator'},
            children: [language]
          });

          // CREATE THE INPUT FIELDS:
          let attributes    = {
            key     : tmpKey,
            class   : `form-control ${_IS_REQUIRED_FLAG}`,
            type    : 'text',
            value   : isNew ? null : ((this.entitySample[this.fieldName][language]) ? this.entitySample[this.fieldName][language] : ''),
            id      : `${this.fieldName}_${language}`,
            name    : `${this.fieldName}_${language}`,
            required    : _IS_REQUIRED_FLAG,
            'data-value': isNew ? null : ((this.entitySample[this.fieldName][language]) ? this.entitySample[this.fieldName][language] : ''),
          };
          if(maxLength) { attributes['maxLength'] = maxLength; }
          if(minLength) { attributes['minLength'] = minLength; }
          let mlInputField = this.createChildlessDOMElement('input', {
            attrs: attributes, children   : [language]
          });
          multiWrapperDiv.children.push(mlInputField, langIndicator);
          inputWrapper.children.push(multiWrapperDiv);
        }
      }else if(this.hasOneToManyRelation(fldConfig[this.fieldName].inputType)){
        let oneToManyBlock  = this.$createElement('OneToManyBuilder', {
          props: {
            entitySample      : this.entitySample,
            fieldName         : this.fieldName,
            activeLang        : this.activeLang,
            className         : fldConfig[this.fieldName].type,
            cueKey            : Math.ceil(Math.random() * 10709000)
          }
        }, []);
        inputWrapper.children.push(oneToManyBlock);
        

        // THE FIELD-TYPE HERE SHOULD ALSO BE SELECT HOWEVER
        // IT SHOULD SIMPLY HAVE MULTIPLE SELECT CAPABILITY

      }else if (this.isDateRelatedInputType(fldConfig[this.fieldName].type)) {
        const sliceLength = 16;
        let fieldVal = isNew ? null : (this.entitySample[this.fieldName]);
        if (!isNew) {
          fieldVal = /^-/.test(fieldVal) ? fieldVal.replace(/^-/, "") : fieldVal;
          fieldVal = fieldVal ? fieldVal.substr(0, sliceLength) : fieldVal;
        }
        let dateObj = (!isNew) ? new Date(fieldVal) : new Date();

        let input = this.createChildlessDOMElement('Datepicker', {
          props: {
            "input-class": 'form-control',
            id: this.fieldName,
            name: this.fieldName,
            format: "dd.MM.yyyy",
            readonly: readOnly,
            value: dateObj,
            required: _IS_REQUIRED_FLAG,
          }
        }, []);
        inputWrapper.children.push(input);

      } else if (this.isInputType(fldConfig[this.fieldName].type)) {
        const fieldVal  = isNew ? null : (this.entitySample[this.fieldName]);
        let inputAttributes = {
          class: 'form-control',
          id: this.fieldName,
          name: this.fieldName,
          type: type,
          readonly: readOnly,
          value: fieldVal,
          required: _IS_REQUIRED_FLAG,
          'data-value': fieldVal
        };
        if(maxLength) { inputAttributes['maxLength'] = maxLength; }
        if(minLength) { inputAttributes['minLength'] = minLength; }

        let input     = this.createChildlessDOMElement('input', {
          attrs: inputAttributes,
        }, []);
        inputWrapper.children.push(input);

      } else if (this.isToggleSwitchType(fldConfig[this.fieldName].type)) {
        let input = this.createChildlessDOMElement('ToggleSwitch', {
          props: {
            switchUID: this.fieldName,
            switchName: this.fieldName,
            switchState: this.getFieldValue(this.entitySample[this.fieldName]) || this.getFieldValue(this.entitySample[this.fieldName]) === 'true' ? '1' : '0',
            switchOffOnClass: this.getFieldValue(this.entitySample[this.fieldName]) || this.getFieldValue(this.entitySample[this.fieldName]) === 'true' ? 'pz-on' : 'pz-off',
            magnification: readOnly,
            '$': this.jqr,
            required: _IS_REQUIRED_FLAG,
            'data-value': this.entitySample[this.fieldName]
          }
        }, []);
        inputWrapper.children.push(input);
      } else if (fldConfig[this.fieldName].isEntity) {
        let dropDownVN = this.$createElement('FormDropDown', {
          props: {
            entitySample: this.entitySample,
            fieldName   : this.fieldName,
            activeLang  : this.activeLang,
            cueKey      : Math.ceil(Math.random() * 10709000)
          }
        }, []);
        inputWrapper.children.push(dropDownVN);
      }

      if (fldConfig[this.fieldName].inputFieldHint) {
        inputWrapper.children.push(this.$createElement('FormFieldHint', {
          props: {
            fieldHintHTML: fldConfig[this.fieldName].inputFieldHint
          }
        }));
      }
      fgWrapper.children.push(label);
      fgWrapper.children.push(inputWrapper);

      return fgWrapper;
    },

    methods: {

      fieldHasManyToOneRelation(fieldName){
        return (this.entitySample.fetchFieldsConfig())[fieldName].isManyToOne;
      },

      fieldHasOneToManyRelation(fieldName){
        return (this.entitySample.fetchFieldsConfig())[fieldName].isOneToMany;
      },

      fieldIsEntity(fieldName){
        return (this.entitySample.fetchFieldsConfig())[fieldName].isEntity;
      },

      getFieldValue(fieldValue, key = 'bezeichnung') {
        return (typeof fieldValue === 'object') ? fieldValue[key] : fieldValue;
      },

      isDateRelatedInputType(strType) {
        const inputTypes = ['datetime', 'date', 'datetime-local'];
        return (inputTypes.indexOf((strType + '').toLowerCase()) !== -1);
      },

      isInputType(strType) {
        const inputTypes = ['text', 'string', 'number', 'integer', 'int', 'num', 'search', 'email', 'tel', 'url'];
        return (inputTypes.indexOf((strType + '').toLowerCase()) !== -1);
      },

      isTextAreaType(strType) {
        return (['textarea', 'editor', 'html'].indexOf((strType + '').toLowerCase()) !== -1);
      },

      isEntityType(strType) {
        return (/^[A-Z]/.test(strType) && !/multili/.test(strType.toLowerCase()));
      },

      hasOneToManyRelation(inputType) {
        return (inputType.toLowerCase() === 'dropdownmulti' && this.fieldHasOneToManyRelation(this.fieldName));
      },

      isToggleSwitchType(strType) {
        return (strType.toLowerCase() === 'boolean' || strType.toLowerCase() === 'bool' || strType.toLowerCase() === 'toggleswitch');
      },

      triggerToggleSwitch(e){
        const toggleSwitch = this.jqr(`#${this.jqr(e.target).attr('for')} .pz-switch-knob`);
        toggleSwitch.trigger('click');
      },

      createChildlessDOMElement(type = 'div', config = {props: {}, attrs: {}, on: {}, children: []}) {
        let props = config.props !== undefined ? config.props : {};
        let attrs = config.attrs !== undefined ? config.attrs : {};
        let on = config.on !== undefined ? config.on : {};
        let children = config.children !== undefined ? config.children : [];
        return this.$createElement(
          type, {props, attrs, on}, children
        );
      },
    },

    computed: {
      ...mapState([
        "optionsModels",
        "renderer",
        "triggerClicked",
        "renderData",
        "targetEntity",
        "dataSample",
        "activeLang",
        "currentTask",
        "activityTitle",
      ]),
      
      entitySample: {
        get() {
          return this.targetEntity;
        },
        set(entitySample) {
          this.targetEntity = entitySample;
        }
      },

      dropDown: {
        get() {
          return this.dDown;
        },
        set(dropDown) {
          this.dDown = dropDown;
        }
      },
    }
  }

</script>

<style scoped>

</style>