<template>
    <div class="col-md-12 no-lr-pad pz-search-sort-block">
        <div class="pz-card-outer no-lr-pad">
            <aside class="pz-card-wrapper">
                <div class="pz-card-inner pz-emp-slot">
                    <input type="search"
                           class="pz-ft-search form-control"
                           id="pz-ft-search"
                           ref="searchTerm"
                           @input="(e)=>{performFullTextSearch(e);}"
                           @change="(e)=>{resetStateOnClear(e);}"
                           :placeholder="globalFilterPlaceHolder" />
                    <span class="fa fa-filter pz-search-icon"></span>
                    <span class="quantity" v-if="qtBox">
                         {{ qtBox }}
                    </span>
                    <span class="fa fa-trash pz-clear-search-icon"
                          @click="(e)=>{this.clearSearchField(e)}" ></span>
                </div>
            </aside>
        </div>
    </div>
</template>

<script>
  import $              from 'jquery';
  import escapeRegExp   from 'escape-string-regexp';
  import SharedMethods from "../../Services/SharedMethods";
  import { mapState } from 'vuex'
  import Mappable from "../../Store/MappableStateVariables";

  export default {
    props: [],      //"dataSample", "renderData", "qtBox"],

    components: {},

    computed : {
      ...mapState(Mappable),
      __VUE_DEVTOOLS_UID__: {
        get () {
          return this.$store.state.__VUE_DEVTOOLS_UID__;
        },
        set (_vdv_uid_) {
          this.$store.commit('__VUE_DEVTOOLS_UID__', _vdv_uid_);
        },
      },
    },

    data(){
      return {
        pzRefs : {'searchTerm' : 'searchTerm'},
        globalFilterPlaceHolder :"Global nach einer beliebigen Spalte filtern...",
      }
    },
    created(){
      this.$store.commit("DynamicSearch", this);
    },

    methods: {
      resetStateOnClear(event) {
        const initiator       = event.target;
        const searchTerm      = initiator.value;
        if(searchTerm.trim() === ''){ this.clearSearchField(event); }
      },

      performFullTextSearch(event) {
        const selfRef         = this;
        const initiator       = event.target;
        const searchTerm      = initiator.value;
        const resCollection   = new Set([]);    // SEARCH RESULT COLLECTION
        const BreakException  = {};
        this.$store.commit('qtBox', '');

        if (this.filteredCollection !== undefined && this.filteredCollection.length > 0 && searchTerm.trim() !== '') {
          if(searchTerm.trim()){
            this.$store.commit('filteredCollection', this.filteredCollection);
            this.$store.commit('searchIsActive', true);
          }else{
            this.$store.commit('filteredCollection', this.dataCollection);
            this.$store.commit('searchIsActive', false);
          }

          if(this.dataCollection !== undefined && this.dataCollection){
            this.dataCollection.forEach(function(data) {
              const dataValues  = Object.values(data);
              const dataKeys    = Object.keys(data);
              try {
                if (dataValues && dataValues.length > 0) {
                  dataValues.forEach(function (strText, loopIndex) {
                    let searchHayStack;
                    const fieldName   = (dataKeys[loopIndex]).replace(/^_/, '');
                    const fieldConfig = SharedMethods.getFieldConfigInfo(fieldName, selfRef.dataSample);
                    const fieldType   = (fieldConfig) ? fieldConfig.type: null;

                    // PREPARE THE STRING TO BE FIT FOR USE WITHIN REGEX - IE: ESCAPE ALL SPECIAL REGEX CHARACTERS.
                    const rx = new RegExp(escapeRegExp(searchTerm), 'gui');

                    if(fieldType){
                      if(fieldType ==="MultilingualString"){
                        searchHayStack    = strText[selfRef.activeLang];
                      }else if( fieldType === 'string'  || fieldType === 'number'   ||
                                fieldType === 'integer' || fieldType === 'boolean'  ||
                                fieldType === 'bool'    || fieldType === 'int'      ){
                        searchHayStack    = strText;
                      }else if( /^[A-Z]/.test(fieldType) ){ // CHECKS FOR BOUND/DEPENDENT ENTITY MODELS...
                        // WE NEED TO FILTER BASED ON THE LABEL AND NOT THE UID
                        //`fieldConfig.optionsMap` CONTAINS (MOST TIMES) AN OBJECT LIKE SO:  {label: 'bezeichnung', value: 'uid'}
                        const fldAccessor = fieldConfig.optionsMap.label;
                        searchHayStack    = (strText) ? strText[fldAccessor] : "";
                      }
                      if(searchHayStack !== undefined && rx.test(searchHayStack) ){   // NO NEED TO CAST IT TO STRING - IT ALREADY SHOULD BE OR @WORST: NULL. (toString())
                        // PUSH THIS ITEM MODEL TO THE filteredItemsCollection ARRAY...
                        resCollection.add(data);
                        throw BreakException;
                      }
                    }
                  });
                }
              } catch (e) {
                if (e !== BreakException) { throw e; }
              }
            });
            //UPDATE THE DATA-COLLECTION PAYLOAD...
            this.$store.commit('renderData', Array.from(resCollection));
          }
        }else{
          this.$store.commit('qtBox', '');
          this.$store.commit('renderData', this.dataCollection);
        }
        if(Array.from(resCollection).length > 0 ){
          this.$store.commit('qtBox', Array.from(resCollection).length);
        }
      },

      filterRenderedDataByColumn(e, columnName, label){
        const chainedFilterBox      = $("#egl-chained-filter-wrapper");
        const columnFilterForm      = SharedMethods.fetchColumnFilterForm(columnName, label );
        chainedFilterBox.html(columnFilterForm);
        const chainedFilterInner    = chainedFilterBox.find(".egl-chained-filter-inner-box");

        chainedFilterInner.hide().fadeIn(500);
        const removeFilterBtn   = chainedFilterInner.find(".egl-remove-filter");
        const performFilterBtn  = chainedFilterInner.find(".egl-submit-filter");
        const chainedFilterFld  = chainedFilterInner.find("input.form-control.egl-chained-filter-field");

        // IF WE HAVE A `chainedFilterFld`, WE JUST WOULD LIKE TO BIND A KEYUP AND BLUR EVENT TO IT...
        // THIS IS BECAUSE WE ALSO WANT TO PERFORM THE SEARCH IRRESPECTIVE OF IF THE USER CLICKS THE
        // SEARCH BUTTON ON NOT.... THAT IS: AS S/HE TYPES....
        if(chainedFilterFld.length){
          chainedFilterFld.on("input",  (e)=> {
            const fieldVal  = $(e.target).val();
            const fieldName =  $(e.target).attr("name");
            this.runColumnFilterAlgorithm(fieldName, fieldVal);
          });

          chainedFilterFld.on("change", (e)=> {
            const fieldVal  = $(e.target).val();
            const fieldName =  $(e.target).attr("name");
            this.runColumnFilterAlgorithm(fieldName, fieldVal);
          });

          performFilterBtn.on("click", (e)=>{
            const dispatcher  = $(e.target);
            const filterField = $((dispatcher.data())['fieldId']);

            console.log(filterField);
          });
        }

        removeFilterBtn.on("click", function(){
          $(".fa-trash.pz-clear-search-icon").trigger('click');
          chainedFilterInner.fadeOut({duration: 500, complete: function(){
             $(this).remove();
            }})
        });

        /*
        console.log(chainedFilterFld);
        console.log(removeFilterBtn);
        console.log(columnName);
        console.log(label);
        console.log(this.DynamicSearch);
        */
      },

      runColumnFilterAlgorithm(columnName, searchTerm){
        const selfRef         = this;
        const resCollection   = new Set([]);    // SEARCH RESULT COLLECTION
        const BreakException  = {};
        const collection      = this.filteredData.length ? this.filteredData : this.dataCollection;
        this.$store.commit('qtBox', '');

        if (this.filteredCollection !== undefined && this.filteredCollection.length > 0 && searchTerm.trim() !== '') {
          if(searchTerm.trim()){
            this.$store.commit('filteredCollection', this.filteredCollection);
            this.$store.commit('searchIsActive', true);
          }else{
            this.$store.commit('filteredCollection', collection);
            this.$store.commit('searchIsActive', false);
          }

          if(collection !== undefined && collection){
            collection.forEach(function(data) {
              const dataValues  = Object.values(data);
              const dataKeys    = Object.keys(data);
              try {
                if (dataValues && dataValues.length > 0) {
                  dataValues.forEach(function (strText, loopIndex) {
                    let searchHayStack;
                    const fieldName   = (dataKeys[loopIndex]).replace(/^_/, '');
                    const fieldConfig = SharedMethods.getFieldConfigInfo(fieldName, selfRef.dataSample);
                    const fieldType   = (fieldConfig) ? fieldConfig.type: null;

                    // PREPARE THE STRING TO BE FIT FOR USE WITHIN REGEX - IE: ESCAPE ALL SPECIAL REGEX CHARACTERS.
                    const rx    = new RegExp(escapeRegExp(searchTerm), 'gui');

                    if(fieldType && (columnName === fieldName)){
                      if(fieldType ==="MultilingualString"){
                        searchHayStack    = strText[selfRef.activeLang];
                      }else if( fieldType === 'string'  || fieldType === 'number'   ||
                        fieldType === 'integer' || fieldType === 'boolean'  ||
                        fieldType === 'bool'    || fieldType === 'int'      ){
                        searchHayStack    = strText;
                      }else if( /^[A-Z]/.test(fieldType) ){ // CHECKS FOR BOUND/DEPENDENT ENTITY MODELS...
                        // WE NEED TO FILTER BASED ON THE LABEL AND NOT THE UID
                        //`fieldConfig.optionsMap` CONTAINS (MOST TIMES) AN OBJECT LIKE SO:  {label: 'bezeichnung', value: 'uid'}
                        const fldAccessor = fieldConfig.optionsMap.label;
                        searchHayStack    = (strText) ? strText[fldAccessor] : "";
                        console.log(fldAccessor);
                      }
                      if(searchHayStack !== undefined && rx.test(searchHayStack) ){   // NO NEED TO CAST IT TO STRING - IT ALREADY SHOULD BE OR @WORST: NULL. (toString())
                        // PUSH THIS ITEM MODEL TO THE filteredItemsCollection ARRAY...
                        resCollection.add(data);
                        throw BreakException;
                      }
                    }
                  });
                }
              } catch (e) {
                if (e !== BreakException) { throw e; }
              }
            });
            //UPDATE THE DATA-COLLECTION PAYLOAD...
            // this.$store.commit('filteredData',  Array.from(resCollection));
            this.$store.commit('renderData',    Array.from(resCollection));
          }
        }else{
          this.$store.commit('qtBox', '');
          this.$store.commit('renderData', this.dataCollection);    //  this.filteredData;
        }
        if(Array.from(resCollection).length > 0 ){
          this.$store.commit('qtBox', Array.from(resCollection).length);
        }
      },

      clearSearchField() {
        const searchField   = this.$refs.searchTerm;
        searchField.value   = '';
        $(searchField).trigger('keyup');

        this.$store.commit('qtBox', '');
        this.$store.commit('setOnce',false);
        this.$store.commit('searchIsActive',false);
        this.$store.commit('renderData', this.dataCollection);
      },
    }
  };
</script>
<style>
    @import '../../assets/css/DynamicItemSearch.css';
</style>
