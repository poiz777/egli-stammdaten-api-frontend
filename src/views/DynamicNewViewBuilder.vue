<template>
  <section>

    <div class="form-block"  id="pz-form-wrapper"><!-- v-if="showForm" -->
        <EntityForm
                    :jqr="jqr"
                    :hideCloseButton="hideCloseButton"
                    :addressRelatedModels="_addressRelatedModels">

      </EntityForm>
    </div>
  </section>
</template>

<script>
  import SharedMethods  from "../Services/SharedMethods";
  import EntityForm     from "../Forms/EntityForm";
  import { mapState }   from 'vuex';
  import NavMenu        from "../Data/NavMenu";

  export default {
    name: "DynamicNewViewBuilder",

    components: { EntityForm },

    props: [ "NavConfig", "createNewEntity",  "processCRUDActions", "addressRelatedModels", "sortResultBy", "hideCloseButton", "jqr"],

    data() {
      return {
        curRoute: null,
        entityName: null,
        NavMenu: NavMenu.Menu,
      };
    },

    created() {
      this.$store.commit("renderer", this);
      this.$store.commit("currentTask", "edit");
      this.curRoute   = this.$route.fullPath;
      this.entityName = this.$route.name.replace(/_.+$/gi, "");

      this.dynamicallyUpdateCollectionGroup(this, this.NavMenu, this.entityName);
      this.setHtmlPageTitle("Neu(e) " + this.entityName + " erstellen.", this);

      if(!this.activeModel) { this.$store.commit('activeModel',  this.entityName); }

      let formConfig;
      let task      = 'new';
      let selfRef   = this;

      if(this.ActivityTitleAffixes !== undefined){
        const activityTitle = this.ActivityTitleAffixes[this.activeLang][task].prefix + ' ' + this.activeModel + this.ActivityTitleAffixes[this.activeLang][task].suffix;
        this.$store.commit('activityTitle', activityTitle);
      }

      const Model                       = require('../Models/' + this.entityName + '.js');
      const entityObj                   = new Model.default();

      selfRef.$store.commit('currentTask',      task);
      selfRef.$store.commit('targetEntity',     entityObj);
      selfRef.$store.commit('modelName',        ((entityObj  && entityObj.className) ? entityObj.className : null ));
      selfRef.$store.commit('triggerClicked',   true);
      selfRef.$store.commit('showForm',         true);
      selfRef.$store.commit('formConfig',       ((formConfig = entityObj.fetchFieldsConfig()) !== undefined ? formConfig : []));
    },

    mounted() {
      this.recaptureMenuLinkStates(this.curRoute, this);
      this.$store.commit('pageTitle',  this.entityName);
    },

    updated(){},


    methods: {
      ...SharedMethods,
    },

    computed: {
      ...mapState([
        "animate",
        "renderData",
        "dataSample",
        "pageTitle",
        "tableFields",
        "itemsPerPage",
        "activeLang",
        "activeModel",
        "recaptureMenuState",
        "ActivityTitleAffixes",
      ]),

      fields: {
        get (){
          return this.NavConfig['data'][this.baseName][this.modelName]['fields'];
        }
      },

      _addressRelatedModels: {
        get (){
          return this.addressRelatedModels;
        }
      },
    },

    watch: {
      $route: function (val) {
        this.entityName = val.name.replace(/_.+$/gi, "");
        this.curRoute   = val.fullPath;
        this.$store.commit('pageTitle', this.entityName);
        this.injectEntityData();
      },
    }
  };

</script>

<style scoped>

</style>