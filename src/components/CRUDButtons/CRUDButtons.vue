<template>
  <td >
    <router-link :to="_editLink">
      <span class="fa fa-pencil pz-icon pz-edit"
            @click="(e)=>{editAction(e, entity, 'edit');}"
            :data-uid="entity.uid"
            :data-model="entity.className"
            :data-action="'edit'"></span>
      </router-link>

      <!-- <router-link :to="_deactivateLink"> -->
      <span :class="entityStatusClass"
            @click="(e)=>{deActivateAction(e, entity,  'deactivate');}"
            :data-uid="entity.uid"
            :data-model="entity.className"
            :data-action="((entity.deactivated) ? 'activate' : 'deactivate')"></span>
      <!-- </router-link> -->

      <!-- <router-link  :to="_deleteLink"> -->
      <span class="fa fa-trash pz-icon pz-delete"
            @click="(e)=>{deleteAction(e, entity, 'delete');}"
            :data-uid="entity.uid"
            :data-model="entity.className"
            :data-action="'delete'"></span>
      <!-- </router-link> -->
  </td>
</template>
<script>
  import NavMenu      from "../../Data/NavMenu";
  export default {
    name: "CRUDButtons",
    props: ["entity", "editAction", "deActivateAction", "deleteAction"],

    created(){},

    updated(){},

    data() {
      return {
        lastEvent: null,
        responseData: null,
        crudActions: {'delete' : 'delete', 'new': 'new', 'edit': 'edit', 'deactivate': 'deactivate'},
        NavMenu: NavMenu.Menu,
      }
    },

    computed: {
      _editLink: {
        get(){
          return this.computeRouteLink(this.entity.uid, this.entity.className, this.crudActions.edit);
        }
      },
      _deleteLink: {
        get(){
          return this.computeRouteLink(this.entity.uid, this.entity.className, this.crudActions.delete);
        }
      },
      _deactivateLink: {
        get(){
          return this.computeRouteLink(this.entity.uid, this.entity.className, this.crudActions.deactivate);
        }
      },
      _newLink: {
        get(){
          return this.computeRouteLink(this.entity.uid, this.entity.className, this.crudActions.new);
        }
      },
      entityStatusClass: {
        get(){
          if(this.entity.deactivated === true || parseInt(this.entity.deactivated) === 1){
            return 'pz-icon egl-entity-status fa fa-eye'
          }
          return 'pz-icon egl-entity-status fa fa-eye-slash';
        }
      }
    },


    methods: {
      computeRouteLink(uid, model, action){
        const defaultRoute =  "/abteilung/edit/1";
        let linkConfig     = null,  groupKey, navConf, config;
        this.$store.commit('recaptureMenuState', false);

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
        let route   = (linkConfig['routes'] !== undefined && linkConfig['routes'][action]) ? linkConfig['routes'][action] : defaultRoute;
        route       = route.replace(/\/id/gi, `/${uid}`);
        return route;

      }
    }
  }
</script>

