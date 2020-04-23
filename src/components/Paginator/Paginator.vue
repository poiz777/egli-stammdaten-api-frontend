<template>
    <section>
        <section class="col-md-12 s12 egl-pagination-wrapper"
                 id="egl-pagination-wrapper"
                 v-if="activeModel && renderData.length">
            <!-- RESULTS PER PAGE DROP-DOWN CONTAINER -->
            <section class="col-md-3 col s3 no-l-pad egl-records-per-page">
                <template v-if="entitySample">
                    <label class="egl-generic-label">Records Per Page: </label>
                    <select class="form-control" id="itemsPerPageDropDown" v-model="IPP" @change="updateRecordsBasedOnChosenResultsPerPage" @click="updatePreviousResultsPerPageValue">
                        <template v-for="(objVal, iKey) in _rangeObject">
                            <option :value="objVal.value" v-if="objVal.value === IPP" selected="selected" :key="iKey">{{ objVal.label }}</option>
                            <option :value="objVal.value" v-else :key="iKey">{{ objVal.label }}</option>
                        </template>
                    </select>
                </template>
            </section>

            <!-- PAGINATION LINKS WITH PREV & NEXT BUTTONS RESPECTIVELY AT THE EXTREMES -->
            <section class="col-md-9 no-r-pad egl-pagination-slots-wrapper">
                <template v-if="matrix.length > 1">
                    <span class="egl-pagination-num-slot egl-neutral egl-prev"
                          v-if="((matrix[matrix.length -1]['pageNum']) > maxPageBlocks)"
                          :data-page-num="'prev'"
                          @click="(e)=>{fetchNextOrPrevCollection(e, 'prev')}"><span class="fa fa-chevron-left"></span></span>

                    <template v-for="(matrixObj, iKey2) in  matrix">
                        <template v-if="iKey2<=maxPageBlocks-1">
                            <template v-if="matrixObj.visible">
                                    <span class="egl-pagination-num-slot egl-active-page"
                                          v-if="matrixObj.active || parseInt(currentPageNum)===parseInt(matrixObj.pageNum)"
                                          :data-page-num="matrixObj.pageNum"
                                          :key="'_' + iKey2" @click="(e)=>{fetchListByPage(e, matrixObj.pageNum)}">{{ matrixObj.pageNum }}</span>
                                <span class="egl-pagination-num-slot"
                                      v-else
                                      :data-page-num="matrixObj.pageNum"
                                      :key="'_' + iKey2" @click="(e)=>{fetchListByPage(e, matrixObj.pageNum)}">{{ matrixObj.pageNum }}</span>
                            </template>
                        </template>
                        <template v-else-if="iKey2 !== (matrix.length-1)">
                                <span class="egl-pagination-num-slot hidden"
                                      :data-page-num="matrixObj.pageNum"
                                      :key="'_' + iKey2" @click="(e)=>{fetchListByPage(e, matrixObj.pageNum)}">{{ matrixObj.pageNum }}</span>
                        </template>
                    </template>

                    <template v-if="((matrix[matrix.length -1]['pageNum']) > maxPageBlocks)">
                        <span class="egl-pagination-num-slot egl-pagination-ellipses egl-neutral">....</span>
                        <span class="egl-pagination-num-slot egl-neutral egl-last"
                              :data-page-num="matrix[matrix.length -1]['pageNum']"
                              @click="(e)=>{fetchListByPage(e, matrix[matrix.length -1]['pageNum'])}">{{matrix[matrix.length -1]['pageNum'] }}</span>
                        <span class="egl-pagination-num-slot egl-neutral egl-next" :data-page-num="'next'" @click="(e)=>{fetchNextOrPrevCollection(e, 'next')}"><span class="fa fa-chevron-right"></span></span>
                    </template>
                </template>
            </section>
        </section>
    </section>
</template>

<script>
    import { mapState }     from 'vuex'
    import $ from 'jquery';

    export default {
        name: "Paginator",
        props: ["entitySample"],
        components: {},
        data(){
            return {
              lastBLCount: 0,
              prevResultsPerPage: null,
            }
        },

        created() {},

        mounted() {
            if(this.currentTRCount && this.reset){
                this.updatePageNumberBlockLinksCount();
            }
        },

        updated() {
          if(this.reset){ this.$store.commit('currentPageNum', 1); }
          if(this.entitySample && this.currentTRCount && this.reset){ this.updatePageNumberBlockLinksCount(); }
        },

        watch: {
            reset: function(val){
                if(val){
                    this.buildPaginationMatrix();
                }
            },
        },

        computed: {
            ...mapState([
              "reset",
              "activeModel",
              "rangeObject",
              "renderData",
              "globalRangeObject",
              "reset",
              "theme",
              "matrix",
              "dropDownSteps",
              "currentPageNum",
              "prevPageNum",
              "nextPageNum",
              "itemsPerPage",
              "blockLinksCount",
              "maxPageBlocks",
              "lastPNumSlice",
              "maxItemsPerPage",
              "paginationStats",
              "currentTRCount",
              "shownRange",
              "defaultItemsPerPage",
              "blockLinksMap",
              "StandardIPP",
            ]),

            _rangeObject: {
                get(){
                    this.getRangeObject(this.maxItemsPerPage, this.dropDownSteps);
                    return this.rangeObject;
                },
                set(value){
                     this.$store.commit('rangeObject', value);
                }
            },

            IPP: {
                get(){
                    return this.itemsPerPage;
                },
                set(value){
                    this.$store.commit('itemsPerPage', value);
                },
            },
        },

        methods: {
            getPaginationPages(){
                return this.matrix;
            },
            buildPaginationMatrix(){
              const startNum          = 1;
              let paginationMatrix    = [];
              const blockLinksCount   =  (
                Math.floor(this.currentTRCount/this.itemsPerPage) +
                ( (this.currentTRCount%this.itemsPerPage) ? 1 : 0)
              );
              this.$store.commit('blockLinksCount', blockLinksCount);

              // BUILD THE PAGINATION MATRIX
              for(let pageNum=startNum; pageNum<=this.blockLinksCount; pageNum++){
                const tmpMatrixObj      = {};
                tmpMatrixObj.active     = (pageNum === this.currentPageNum);
                tmpMatrixObj.pageNum    = pageNum;
                tmpMatrixObj.visible    = (pageNum <= this.maxPageBlocks);
                paginationMatrix.push(tmpMatrixObj);
              }
              this.$store.commit('matrix', paginationMatrix);
              return paginationMatrix;
            },

            // TODO: REVISE THE LOGIC HEREIN
            fetchNextOrPrevCollection(e, which='next'){
              let dispatcher;
              let pageNum           = 1;
              let curPageNum        = this.currentPageNum;
              let selfRef           = this;
              const maxPB           = this.maxPageBlocks;
              const pgnSlots        = $("span.egl-pagination-num-slot").not(".egl-neutral");

              switch(which.toLowerCase()){
                case 'next':
                    pageNum         = ((parseInt(curPageNum)+1) > this.currentTRCount) ?
                                        this.currentTRCount : (parseInt(curPageNum)+1);
                    dispatcher      =  $(`.egl-pagination-num-slot[data-page-num=${pageNum}]`);
                    dispatcher.trigger('click');
                    this.$store.commit('currentPageNum', pageNum);
                    break;

                case 'prev':
                    pageNum         = ((parseInt(curPageNum)-1) < 1 ) ? 1 : (parseInt(curPageNum)-1);
                    dispatcher      =  $(`.egl-pagination-num-slot[data-page-num=${pageNum}]`);
                    dispatcher.trigger('click');
                    this.$store.commit('currentPageNum', pageNum);
                    break;

                default:
                  break;
              }

              // GENERATE A MAP OF SHOWN PAGINATION SLOTS.
              let storedCurPgNum    = parseInt(this.currentPageNum);
              if( (storedCurPgNum%maxPB) === 0 && storedCurPgNum >= maxPB){
                if(which.toLowerCase() === 'next'){
                  this.$store.commit('shownRange', selfRef.createNumRange(storedCurPgNum, (storedCurPgNum + maxPB)-1));
                }else if(which.toLowerCase() === 'prev'){
                  this.$store.commit('shownRange',  selfRef.createNumRange((storedCurPgNum-maxPB), storedCurPgNum));
                }
              }

              // MANAGE SHOWN AND HIDDEN PAGINATION SLOTS...
              let offsetLeft, offsetRight;
              if(which.toLowerCase() === 'next'){
                if(this.currentPageNum && this.maxPageBlocks && ((this.currentPageNum-1)%this.maxPageBlocks === 0)) {
                  offsetLeft    = this.getRange(1, this.currentPageNum);
                  offsetRight   = this.getRange((this.currentPageNum + this.maxPageBlocks), this.currentTRCount);
                  this.managePaginationSlotOnPrevOrNextClick(pgnSlots, offsetLeft, offsetRight);
                }
              }else if(which.toLowerCase() === 'prev'){
                if(this.currentPageNum && this.maxPageBlocks && (this.currentPageNum%this.maxPageBlocks === 0 || (this.currentPageNum+1)%this.maxPageBlocks === 0)) {
                  let cPgNum    = Math.abs(this.currentPageNum - this.maxPageBlocks) + this.currentPageNum;
                  offsetLeft  = this.getRange(1, (cPgNum - this.maxPageBlocks));
                  offsetRight = this.getRange((cPgNum + 1), this.currentTRCount);
                  this.managePaginationSlotOnPrevOrNextClick(pgnSlots, offsetLeft, offsetRight);
                }
              }
            },

            getRange(min, max){
              let m, range=[];
              for(m=parseInt(min); m<parseInt(max); m++){
                range.push(m);
              }
              console.log(range);
              return range;
            },

            managePaginationSlotOnPrevOrNextClick(pgnSlots, offsetLeft, offsetRight){
              // MANAGE SHOWN AND HIDDEN PAGINATION SLOTS...
              pgnSlots.removeClass('hidden');
              if(offsetLeft && offsetLeft.length){
                for(let pgNum of offsetLeft){
                  $(`.egl-pagination-num-slot[data-page-num=${pgNum}]`).not('.egl-neutral').addClass('hidden').removeClass('egl-active-page');
                }
              }

              if(offsetRight && offsetRight.length){
                for(let pgNum of offsetRight){
                  $(`.egl-pagination-num-slot[data-page-num=${pgNum}]`).not('.egl-neutral').addClass('hidden').removeClass('egl-active-page');
                }
              }
            },

            createNumRange(from, till){
                let numRange = [];
                for(let i=from; i <=till; i++){
                    numRange.push(i);
                }
                return numRange;
            },

            fetchListByPage(e, pageNum){
                const pgnSlots      = $("span.egl-pagination-num-slot");
                this.$store.commit('currentPageNum', pageNum);
                this.updateRecordsGenerically(e, pageNum);
                pgnSlots.removeClass("egl-active-page");
                $(`span.egl-pagination-num-slot[data-page-num=${pageNum}]`).addClass('egl-active-page');
                $(e.target).addClass('egl-active-page');

                // CLEAR FULL-TEXT SEARCH STATUS:
                $(".fa-trash.pz-clear-search-icon").trigger('click');
            },

            updateRecordsGenerically(e, pageNum){
                const selfRef   = this;
                const Module    = require('../../Models/' + this.entitySample.className + '.js');
                const entity    = new Module.default();

                entity.list({limit: this.itemsPerPage, page: pageNum}).then(()=>{
                    selfRef.responseData  = entity.collection;
                    selfRef.$store.commit('renderData',         selfRef.responseData);
                    selfRef.$store.commit('filteredCollection', selfRef.responseData);
                    selfRef.$store.commit('dataCollection',     selfRef.responseData);
                    selfRef.$store.commit('activeCollection',   selfRef.responseData);

                    selfRef.$store.commit('pagination',         {current:pageNum});
                    selfRef.$store.commit('currentPageNum',     pageNum);
                    selfRef.$store.commit('resetItemsPerPage',  false);
                    selfRef.$store.commit('reset',              false);

                  // UPDATE PAGINATION MATRIX ARRAY
                  let newMatrix       = [];
                  for(let matrixObj of this.matrix){
                    matrixObj.active  = (parseInt(matrixObj.pageNum) === parseInt(pageNum));
                    newMatrix.push(matrixObj);
                  }
                  this.$store.commit('matrix', newMatrix);

                  // RE-ESTABLISH ACTIVE PAGE
                  const pgnSlots      = $("span.egl-pagination-num-slot");
                  pgnSlots.removeClass("egl-active-page");
                  $(`span.egl-pagination-num-slot[data-page-num=${pageNum}]`).addClass('egl-active-page');
                });
            },

            getRangeObject(count, padding=6){
                if(this.globalRangeObject[this.activeModel] === undefined){
                    let rangeObject  = [];
                    rangeObject.push({value:  `${this.StandardIPP}`, "label": `Standard`});
                    for(let i = 0; i <= count; i++){
                        if( (i !== 0) && !(i%padding) ){
                            rangeObject.push( {value: i, "label": i} );
                        }
                    }
                    rangeObject.push( {value: "-1", "label": "All"} );
                    const grObj = {};
                    grObj[this.activeModel] = rangeObject;
                    this.$store.commit('globalRangeObject', grObj);
                    this.$store.commit('rangeObject', grObj[this.activeModel]);
                }
               return this.globalRangeObject[this.activeModel];
            },

            updateRecordsBasedOnChosenResultsPerPage(e){
                const selfRef               = this;
                let entityPromise           = import('../../Models/' + this.entitySample.className + '.js');
                this.$store.commit('itemsPerPage', e.target.value);
                this.updateCurrentPageNumBasedOnResultsPerPage(e.target.value);
                this.buildPaginationMatrix();
                entityPromise.then( (Module)=>{
                    const entity = new Module.default();
                    entity.list({limit: e.target.value, page: this.currentPageNum}).then(()=>{
                        // UPDATE THE ENTITY LIST COLLECTION :
                        selfRef.responseData  = entity.collection;
                        this.$store.commit('renderData', selfRef.responseData);
                        this.$store.commit('dataCollection', selfRef.responseData);
                        this.$store.commit('filteredCollection', selfRef.responseData);
                        // UPDATE PAGINATION SLOTS...
                        this.updatePageNumberBlockLinksCount(entity.collection[0]);
                    });
                });
            },

            updatePreviousResultsPerPageValue(e){
              this.prevResultsPerPage = e.target.value;
            },

            updateCurrentPageNumBasedOnResultsPerPage(resultsPerPage){
              let ratio = Math.floor( (this.prevResultsPerPage/resultsPerPage)*this.currentPageNum );
              ratio     = ratio <= 0 ? 1 : ratio;
              this.$store.commit('currentPageNum', ratio);
            },

            updatePageNumberBlockLinksCount(entitySample=null){
                const blocksPerSide = 4;
                const entityModel   = ( entitySample )? entitySample : this.entitySample;
                const blc =  (
                    Math.floor(entityModel.TOTAL_RECORDS_COUNT/this.itemsPerPage) +
                    ( (entityModel.TOTAL_RECORDS_COUNT%this.itemsPerPage) ? 1 : 0)
                );
                this.$store.commit('blockLinksCount', blc);
                if(this.blockLinksCount - (blocksPerSide*2) > 3){
                    this.$store.commit('blockLinksMap', {left: 4, right:4});
                }else{
                    this.$store.commit('blockLinksMap', {left: 4, right:4});
                }
            },
        },
    }
</script>

<style scoped>

</style>