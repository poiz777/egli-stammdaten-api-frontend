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
    name: "DynamicEditViewBuilder",

    components: { EntityForm },

    props: [ "NavConfig", "createNewEntity",  "processCRUDActions", "addressRelatedModels", "sortResultBy", "hideCloseButton", "jqr"],

    data() {
      return {
        curRoute: null,
        pageID: null,
        entityName: null,
        NavMenu: NavMenu.Menu,
        addressBoundModels: []
      };
    },

    created() {
      this.$store.commit('renderer', this);
      this.$store.commit("currentTask", "edit");
      this.pageID       = this.$route.params['id'];
      this.curRoute     = this.$route.fullPath;
      this.entityName   = this.$route.name.replace(/_.+$/gi, "");
      this.dynamicallyUpdateCollectionGroup(this, this.NavMenu, this.entityName);
      this.setHtmlPageTitle(this.entityName + " bearbeiten - UID: " + this.pageID, this);
      this.updateStoreData();
    },

    mounted() {
      this.recaptureMenuLinkStates(this.curRoute, this);
      this.$store.commit('pageTitle',  this.entityName);
    },

    updated(){},


    methods: {
      ...SharedMethods,

      updateStoreData(){
        const task = "edit";
        if(this.renderData && this.renderData.length){
          const targetModel = SharedMethods.findItemByUIDInACollection(this.pageID, this.renderData);
          if(targetModel){
            this.$store.commit('targetEntity', targetModel);
          }
          this.$store.commit("activeModel", this.entityName);
        }else{
          let DynamicModel    = require(`../Models/${this.entityName}.js`);
          const entity        = new DynamicModel.default();
          const promise       = entity.show({"uid" : this.pageID});
          this.$store.commit("activeModel", this.entityName);

          promise.then((data) => {
            const mdlObj  = new DynamicModel.default(data.data);
            this.$store.commit("targetEntity", mdlObj);

            if(this.ActivityTitleAffixes !== undefined){
              const activityTitle = this.ActivityTitleAffixes[this.activeLang][task].prefix + ' ' +
              this.activeModel + this.ActivityTitleAffixes[this.activeLang][task].suffix +
                ((this.pageID) ? ` -- UID: ${this.$route.params.id}` : '');
              this.$store.commit('activityTitle', activityTitle);
            }
          });
        }
      },
    },

    computed: {
      ...mapState([
        "animate",
        "currentEvent",
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
        this.pageID     = val.params['id'];
        this.$store.commit('pageTitle', this.entityName);
        this. updateStoreData();
      },
    }
  };

</script>

<style scoped>

</style>