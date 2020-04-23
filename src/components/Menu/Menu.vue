<script>
    import NavMenu      from "../../Data/NavMenu";
    import {mapState}   from "vuex";

    export default {
        name: "Menu",
        props: ["updateActualData", "setReadyState", "setActiveCollection", "jqr"],

        data() {
            return {
                lastEvent: null,
                responseData: null,
                NavMenu: NavMenu.Menu,
            }
        },

        computed: {
          ...mapState([
            "reset",
            "renderData",
            "itemsPerPage",
            "dataSample",
            "recaptureMenuState",
            "buildPaginationMatrix",
          ]),
        },

        render(){
          let groupKey;
          let navConf;
          let config;
          let menuListGroups      = [];

          for(groupKey in this.NavMenu){
            navConf   = this.NavMenu[groupKey];
            if(navConf.menuName){
              const gpk         = groupKey;
              const nvc         = navConf;
              let menuIcon      = this.$createElement("span",     {attrs: { class : `egl-menu-icon-fa fa ${navConf.iconClass}`} }, []);
              let menuText      = this.$createElement("article",  {attrs: { class : "col s10 egl-menu-title"} }, [`${navConf.menuName}`]);
              let menuIconBox   = this.$createElement("aside",    {attrs: { class : "col s2 egl-menu-icon-left"} }, [menuIcon]);
              let menuAnchor    = this.$createElement("a",        {attrs: { class : "egl-dormant-link"},  on:{ "click" : (e)=>{ this.manageMenuDisplay(e, gpk, nvc)}} }, [menuIconBox, menuText]);
              let menuBlockBox  = this.$createElement("section",  {attrs: { class : "egl-menu-block"} }, [menuAnchor]);
              let childUL       = this.$createElement("ul", {attrs: { class : "list-group egl-sub-group pz-sub-menu"} }, []);

              for(let gpKey in navConf){
                config  = navConf[gpKey];
                if (typeof config === "object" && gpKey !== 'svgIcons') {
                  let linkIcon    = this.createFAIconVNode("fa-link");
                  const IDN       = this.generateIdentifierFromEntityName( config.title.singular );
                  let anchor      = this.$createElement("router-link", {
                    attrs:  {
                      class     : "egl-action",
                      to        : config.routes.list,
                      "data-idn": `${IDN}`,
                    }},
                    [linkIcon, `  ${config.title.singular}`]
                  );
                  let childLi     = this.$createElement("li", {attrs: { class : "list-group-item egl-child-list-item pz-sub-item", "data-idn": `${IDN}`} }, [anchor]);
                  childUL.children.push(childLi);
                }
              }
              menuBlockBox.children.push(childUL);
              menuListGroups.push(menuBlockBox);
            }
          }

          return this.$createElement("nav", {attrs: { class : "egl-nav-menu"} }, menuListGroups);
        },

        methods: {
            createFAIconVNode(faClass){
                return this.$createElement("span", { attrs: {class: `fa ${faClass}`}}, []);
            },

            capitalizeFirstLetter(string) {
                return string.charAt(0).toUpperCase() + string.slice(1);
            },

            manageMenuDisplay(e, groupKey, navConf){
                this.$store.commit('renderSideBarRight', true);
                this.$store.commit('sideBarRightData', {
                  "groupKey"  : groupKey,
                  "navConf"   : navConf
                });

                this.jqr("a.egl-dormant-link").removeClass('pz-active');
                this.jqr("section.egl-menu-block").removeClass('pz-active');

                if( !this.jqr(e.currentTarget).hasClass("pz-active") ){
                    this.jqr(e.currentTarget).addClass('pz-active');
                }
                if( !this.jqr(e.currentTarget).parent("section.egl-menu-block").hasClass("pz-active") ){
                    !this.jqr(e.currentTarget).parent("section.egl-menu-block").addClass('pz-active');
                }

                // REVEAL THE SUB-MENUS
                const trigger       = e.currentTarget;
                const triggerParent = trigger.parentNode;
                const childUList    = this.jqr(triggerParent).find("ul.pz-sub-menu");
                const subMenuList   = this.jqr("ul.pz-sub-menu").not(childUList);

                subMenuList.fadeOut(100);
                childUList.fadeToggle(100);
                this.$store.commit('pageTitle', ' ');
            },

            generateIdentifierFromEntityName(entityName){
              // STRIP ALL SPACES (REPLACING THEM WITH DASHES) AND THEN LOWER-CASE THE RESULTING STRING
              return (entityName.replace(/ +?/gu, '-')).toLowerCase();
            },
        }
    }
</script>

<style scoped>

</style>