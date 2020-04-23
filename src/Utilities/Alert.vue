<template>
  <div class="row" justify="center">

    <v-dialog v-model="showDialog" max-width="400">

      <v-card>
        <v-card-title class="headline">{{ alertTitle }}</v-card-title>

        <v-card-text><div v-html="alertMessage"></div></v-card-text>

        <v-card-actions v-if="addActionButtons">
          <v-spacer></v-spacer>
          <template v-if="actionButtonsTextsArray">
            <template v-for="(actionObject, loopIndex) in actionButtonsTextsArray">
              <v-btn :key="loopIndex"  :color="actionObject.color" text  @click="triggerChildDivClick">
                <div :id="`${actionObject.id}`" class="egl-alert-btn" @click="(e)=>{runHandler(e, actionObject.handler)}">{{ actionObject.label }}</div>
              </v-btn>
            </template>
          </template>
        </v-card-actions>
      </v-card>

    </v-dialog>
  </div>
</template>

<script>
  export default {
    name: "Alert",
    props: ["jqr", "addActionButtons", "actionButtonsTextsArray", "alertTitle", "alertMessage", "renderDialog", "updateDialogState"],
    components: {},

    data () {
      return {
      }
    },

    created(){},

    methods:{
      runHandler(e, handler){
        this.updateDialogState(false);
        handler(e);
      },

      triggerChildDivClick(e){
        this.jqr(e.target).find(".egl-alert-btn").trigger("click");
      },
    },

    computed:{
      showDialog:{
        get(){
          return this.renderDialog;
        },
        set(){},
      }
    },

  }
</script>

<style scoped>

</style>