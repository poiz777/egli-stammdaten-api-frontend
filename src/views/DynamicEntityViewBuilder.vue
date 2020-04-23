<template>
  <section>
    <!-- <vue-helmet :title="pageTitle" />-->
    <!-- <Intro :pageTitle="pageTitle" v-if="!renderData.length"></Intro> -->
    <section class=" table-responsive">
      <table class="table table-bordered table-striped egl-entity-render-table striped responsive-table highlight"
             v-if="renderData.length >= 0">
        <thead>
        <!-- A TABLE-ROW DEDICATED TO FILTERING RECORDS AS WELL AS THE CREATE-NEW ENTITY BUTTON -->
        <tr class="egl-search-and-new-entity-tr">
          <td class="egl-search-and-new-entity-td" :colspan="(fetchVisibleFields(dataSample).count)+1">
            <div class="col-md-12 row no-lr-pad egl-search-and-new-entity-box">
              <!-- ADD NEW ENTITY BUTTON CONTAINER -->
              <div class="col-md-3 col s3 no-lr-pad egl-new-entity">
                <router-link :to="computeRouteLink(null, dataSample.className, 'new')"
                             class="egl-new-entity-btn"
                             click="createNewEntity"
                             data-task="new"
                             v-if="(dataSample) && addressRelatedModels.length > 0 && addressRelatedModels.indexOf(dataSample.className) === -1">
                  <span class="fa fa-plus-square"></span>&nbsp;Neu
                  <template v-if="dataSample">{{dataSample.className }}</template>
                >
                </router-link>
              </div>
              <div class="col-md-4 col s4 no-lr-pad egl-chained-filter-wrapper" id="egl-chained-filter-wrapper"></div>
              <div class="col-md-5 col s5 no-lr-pad egl-dynamic-search-wrapper" id="egl-dynamic-filter-wrapper">
                <!-- THE DYNAMIC SEARCH + FILTERING PANEL -->
                <DynamicItemSearch ></DynamicItemSearch>
              </div>
            </div>
          </td>
        </tr>

        <!-- TABLE-HEADING: DYNAMICALLY GENERATED FOR EACH ENTITY -->
        <EntityTableHeading :fetchVisibleFields="fetchVisibleFields"
                            :entity="dataSample"
                            :sortByField="sortByField"
                            :entitySample="dataSample"></EntityTableHeading>
        </thead>
        <tbody>
        <template class="" v-if="renderData">
          <template v-for="(entity, iKey1) in renderData">
            <!-- EACH SINGLE TABLE ROW, DYNAMICALLY GENERATED USING THE INFERRED ENTITY-MODEL WITH EACH ITERATION -->
            <EntityTableRow :entity="entity"
                            :preProcessCRUDActions="preProcessCRUDActions"
                            :key="iKey1" :uniqueKey="iKey1"
                            :fetchVisibleFields="fetchVisibleFields"></EntityTableRow>
          </template>
        </template>
        </tbody>
      </table>
      <Paginator :entitySample="dataSample"></Paginator>
    </section>
  </section>
</template>

<script>
  import EglConstants from "../Services/EglConstants";
  import SharedMethods from "../Services/SharedMethods";
  import DynamicItemSearch from "../components/DynamicItemSearch/DynamicItemSearch";
  import EntityTableRow from "../components/EntityTableRow/EntityTableRow";
  import EntityTableHeading from "../components/EntityTableHeading/EntityTableHeading";
  import Paginator from "../components/Paginator/Paginator";
  import NavMenu      from "../Data/NavMenu";
  import { mapState } from 'vuex';

  export default {
    name: "DynamicEntityViewBuilder",

    components: { Paginator, EntityTableRow, DynamicItemSearch, EntityTableHeading },

    props: [ "NavConfig", "createNewEntity",  "processCRUDActions", "addressRelatedModels", "sortResultBy", "jqr"],

    data() {
      return {
        curRoute: null,
        NavMenu: NavMenu.Menu,
        entityName: null,
      };
    },

    created() {
      this.$store.commit('renderer', this);
      this.curRoute   = this.$route.fullPath;
      this.entityName = this.$route.name.replace(/_.+$/gi, "");
      this.dynamicallyUpdateCollectionGroup(this, this.NavMenu, this.entityName);
      this.injectEntityData();
    },

    mounted() {
      this.recaptureMenuLinkStates(null, this);
      this.setHtmlPageTitle(this.entityName + ": List View.", this);
    },

    updated(){},


    methods: {
      ...SharedMethods,

      computeRouteLink(uid, model, action){
        const defaultRoute =  "/abteilung/edit/1";
        let linkConfig     = null,  groupKey, navConf, config;

        for(groupKey in this.NavMenu){
          navConf   = this.NavMenu[groupKey];
          if(navConf['menuName']) {
            for (let gpKey in navConf) {
              config = navConf[gpKey];
              if (typeof config === "object" && gpKey !== 'svgIcons') {
                if(config['className'] === model){
                  linkConfig  = config;
                  break;
                }
              }
            }
          }
          if(linkConfig) { break; }
        }
        let route = (linkConfig['routes'] !== undefined && linkConfig['routes'][action]) ? linkConfig['routes'][action] : defaultRoute;
        route      = route.replace(/\/id/gi, `/${uid}`);
        route      = route.replace(/create/gi, `new`);
        return route;

      },

      /**
       * THIS METHOD MANAGES CLICK EVENTS ON CRUD BUTTONS...
       * IT MERELY CREATES THE TITLE FOR THE CURRENT ACTION
       * AND HANDS THE WORK OVER TO THE `processCRUDActions()` METHOD
       * @param e
       * @param entity
       * @param task
       */
      preProcessCRUDActions(e, entity, task){
        const activeLang = this.activeLang ? this.activeLang : 'de';
        switch (task) {
          case 'edit':
            this.$store.commit('currentEvent',  EglConstants.CRUD_BTN_EDIT);
            this.$store.commit('currentTask',   EglConstants.EDIT_TASK);
            break;

          case 'deactivate':
            this.$store.commit('currentEvent',  EglConstants.CRUD_BTN_DEACTIVATE);
            this.$store.commit('currentTask',   EglConstants.DEACTIVATE_TASK);
            break;

          case 'delete':
            this.$store.commit('currentEvent',  EglConstants.CRUD_BTN_DELETE);
            this.$store.commit('currentTask',   EglConstants.DELETE_TASK);
            break;

          default:
            this.$store.commit('currentEvent',  EglConstants.CRUD_BTN_EDIT);
            this.$store.commit('currentTask',   EglConstants.EDIT_TASK);
            break;
        }

        if(this.ActivityTitleAffixes){
          let activityTitleTxt  = this.ActivityTitleAffixes[activeLang][task].prefix + entity.className + this.ActivityTitleAffixes[activeLang][task].suffix;
          activityTitleTxt    += (entity.uid) ? ` -- UID: ${entity.uid}` : '';
          this.$store.commit('activityTitle', activityTitleTxt);
        }
        this.processCRUDActions(e, entity, task);
      },
      injectEntityData(){
        this.$store.commit('reset',       false);
        this.$store.commit('animate',     false);

          const selfRef               = this;
          let Model                   = require(`../Models/${this.entityName}.js`);

          document.querySelectorAll(".pz-sub-menu li").forEach(listItem => {
            if(listItem.classList.contains("pz-active")){
              listItem.classList.remove("pz-active");
            }
          });
          this.jqr(".pz-sub-menu li a").addClass("egl-action");

          const IDN               = this.jqr(`a[href*='${this.curRoute}']`).attr('data-idn');
          const targetLIElements  = this.jqr(`li[data-idn='${IDN}']`);
          targetLIElements.addClass("pz-active");


          const entity = new Model.default();
          entity.list({limit: selfRef.itemsPerPage}).then(()=>{
            selfRef.responseData        = entity.collection;
            selfRef.$store.commit('renderData', entity.collection);
            selfRef.$store.commit('dataCollection', entity.collection);
            selfRef.$store.commit('filteredCollection', entity.collection);

            // SET THE `store.currentTRCount`, ETC
            if(entity.responseData[0]){
              selfRef.$store.commit('animate',            true);
              selfRef.$store.commit('reset',              true);
              selfRef.$store.commit('activeModel',        selfRef.entityName);
              selfRef.$store.commit('pageTitle',          selfRef.entityName);
              selfRef.$store.commit('currentTRCount',     entity.responseData[0].TOTAL_RECORDS_COUNT);
              selfRef.$store.commit('dataSample',         entity.collection[0]);
              selfRef.$store.commit('paginationStats',    {prev: null, next: 2, current:1});
              selfRef.$store.commit('pagination',         {prev: null, next: 2, current:1});
              selfRef.$store.commit('dataSample',         entity.collection[0]);
              return true;
            }
          });

      },
    },

    computed: {
      ...mapState([
        "animate",
        "renderData",
        "dataSample",
        "pageTitle",
        "tableFields",
        "itemsPerPage",
        "sideBarRightData",
        "recaptureMenuState",
        "ActivityTitleAffixes",
      ]),

      fields: {
        get (){
          return this.NavConfig['data'][this.baseName][this.modelName]['fields'];
        }
      },
    },

    watch: {
      $route: function (val) {
        this.entityName = val.name.replace(/_.+$/gi, "");
        this.curRoute   = val.fullPath;
        this.$store.commit('pageTitle', this.entityName);
        this.injectEntityData();
        console.log(this.entityName);
        console.log(this.curRoute);
      },
    }
  };

  // const Model                       = require('./Models/' + this.activeModel + '.js');
</script>

<style scoped>

</style>