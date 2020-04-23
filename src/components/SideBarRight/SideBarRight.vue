<script>
  import {mapState} from "vuex";
    export default {
        name: "SideBarRight",
        props: ["updateActualData", "setState",  "setReadyState", "setActiveCollection", "jqr"],

        data(){
            return {
              lastGroupKey: null,
            }
        },

        render(){
          let config;
          const navConf   = this._sideBarRightData.navConf;
          const groupKey  = this._sideBarRightData.groupKey;
          let ulMenuBlock = this.$createElement("ul",     {attrs: {class: "list-group egl-sub-group"}}, []);
          let bigMdlIcon  = this.$createElement("div",    {attrs: {class: "egl-model-icon-box"}}, [
            this.$createElement("span",     {attrs: {class: `fa-3x fa ${navConf.iconClass}` }}, [])
          ]);
          for (let gpKey in navConf) {
            config      = navConf[gpKey];
            if (typeof config === "object" && gpKey !== 'svgIcons') {
              const cln       = config.className;
              const IDN       = this.generateIdentifierFromEntityName( config.title.singular );
              let linkIcon    = this.createFAIconVNode("fa-link");
              let anchor      = this.$createElement("a", {
                attrs: {class: "egl-action", "data-idn": `${IDN}` }, on: {
                  "click": (e) => {
                    this.renderEntity(e, groupKey, cln);
                  }
                },
              }, [linkIcon, `  ${config.title.singular}`]);
              let childLi = this.$createElement("li", {attrs: {class: "list-group-item egl-child-list-item pz-sub-item", "data-idn": `${IDN}`}}, [anchor]);
              ulMenuBlock.children.push(childLi);
            }
          }
          return this.$createElement("ul",     {attrs: {class: "list-group egl-sub-group"}}, [bigMdlIcon, ulMenuBlock]);
        },

        methods: {
            generateIdentifierFromEntityName(entityName){
              // STRIP ALL SPACES (REPLACING THEM WITH DASHES) AND THEN LOWER-CASE THE RESULTING STRING
              return (entityName.replace(/ +?/gu, '-')).toLowerCase();
            },

            createFAIconVNode(faClass){
                return this.$createElement("span", { attrs: {class: `fa ${faClass}`}}, []);
            },

            capitalizeFirstLetter(string) {
                return string.charAt(0).toUpperCase() + string.slice(1);
            },

            renderEntity(e, groupName, model){
                e.preventDefault();
                this.setReadyState(false);  // RESET RENDER POSSIBILITY...
                const selfRef               = this;
                let Model                   = require('../../Models/' + this.capitalizeFirstLetter(model) + '.js');

                document.querySelectorAll(".egl-sub-group li").forEach(listItem => {
                  if(listItem.classList.contains("pz-active")){
                    listItem.classList.remove("pz-active");
                  }
                });
                const IDN               = this.jqr(e.target).attr('data-idn');
                const targetLIElements  = this.jqr(`li[data-idn='${IDN}']`);
                targetLIElements.addClass("pz-active");

                const entity = new Model.default();
                console.log(selfRef.itemsPerPage);
                entity.list({limit: selfRef.itemsPerPage}).then(()=>{
                    selfRef.responseData        = entity.collection;
                    selfRef.$store.commit('renderData', entity.collection);
                    selfRef.$store.commit('activeCollection', entity.responseData);
                    selfRef.updateActualData(selfRef.responseData, {groupName: groupName, modelName: model}, selfRef.responseData);
                    selfRef.setActiveCollection(selfRef.responseData);

                    // SET THE `store.currentTRCount`, ETC
                    if(entity.responseData[0]){
                      selfRef.$store.commit('reset',            true);
                      selfRef.$store.commit('isRenderReady',    true);
                      selfRef.$store.commit('activeModel',      model);
                      selfRef.$store.commit('currentTRCount',   entity.responseData[0].TOTAL_RECORDS_COUNT);
                      selfRef.$store.commit('paginationStats',  {prev: null, next: 2, current:1});
                      selfRef.$store.commit('pagination',       {prev: null, next: 2, current:1});
                    }
                });
            },

        },

        updated(){
          document.querySelectorAll(".egl-sub-group li").forEach(listItem => {
            if(listItem.classList.contains("pz-active")){
              listItem.classList.remove("pz-active");
            }
          });
        },

        mounted(){

          document.querySelectorAll(".egl-sub-group li").forEach(listItem => {
            if(listItem.classList.contains("pz-active")){
              listItem.classList.remove("pz-active");
            }
          });
          this.lastGroupKey = this.sideBarRightData.navConf.menuName;
        },

        computed: {
          ...mapState([
            "renderData",
            "dataSample",
            "responseData",
            "sideBarRightData",
          ]),
          ...StoreGetters,

          _sideBarRightData: {
            get () {
              return this.sideBarRightData;
            }
          }


        }
    }
</script>

<style scoped>

</style>