<template>
  <section >
      <!-- <transition name="slide" mode="in-out" v-if="animate"> -->
    <VScaleTransition :hide-on-leave="true" :leave-absolute="true">
      <RouterView :createNewEntity="createNewEntity"
                  :processCRUDActions="processCRUDActions"
                  :sortResultBy="sortResultBy"
                  :jqr="jqr"
                  :NavConfig="NavConfig"
                  :addressRelatedModels="addressRelatedModels"></RouterView>
    </VScaleTransition>
      <!-- </transition> -->
  </section>
</template>

<script>
  import { mapState } from 'vuex'
  import SharedMethods from "../../Services/SharedMethods";

  export default {
    name: "ModelRenderer",
    components: {},
    props: [ "NavConfig", "createNewEntity",  "processCRUDActions", "addressRelatedModels", "sortResultBy", "jqr"],
    mixins: [],

    /*=================================*/
    /*===== LIFE CYCLE HOOKS BEGIN ====*/
    /*=================================*/
    created() {
    },

    mounted() {
    },

    updated() {
    },

    /*=================================*/
    /*===== LIFE CYCLE HOOKS: END =====*/
    /*=================================*/

    data() {
      return {
      };
    },
    methods: {
      ...SharedMethods,
    },
    computed: {
      ...mapState([
        "animate",
        "renderData",
        "dataSample",
        "tableFields",
        "ActivityTitleAffixes",
      ]),

      fields: {
        get (){
          return this.NavConfig['data'][this.baseName][this.modelName]['fields'];
        }
      },
    },
  }
</script>

<style scoped>
  .fade-enter-active,
  .fade-leave-active {
    transition-duration: 0.75s;
    transition-property: opacity;
    transition-timing-function: ease;
  }

  .fade-enter,
  .fade-leave-active {
    opacity: 0
  }



  .bounce-enter-active {
    animation: bounce-in .5s;
  }
  .bounce-leave-active {
    animation: bounce-in .5s reverse;
  }
  @keyframes bounce-in {
      0% {
        transform: scale(0);
      }
      50% {
        transform: scale(1.5);
      }
      100% {
        transform: scale(1);
    }
  }

  .slide-leave-active,
  .slide-enter-active {
    transition: 0.35s;
  }
  .slide-enter {
    transform: translate(100%, 0);
  }
  .slide-leave-to {
    transform: translate(-100%, 0);
  }

</style>