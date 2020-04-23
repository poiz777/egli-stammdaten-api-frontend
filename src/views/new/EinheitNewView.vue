<template>
  <DynamicNewViewBuilder :jqr="jqr" :hideCloseButton="true"
                          :addressRelatedModels="addressRelatedModels"></DynamicNewViewBuilder>

</template>

<script>
  import DynamicNewViewBuilder from "./../DynamicNewViewBuilder";

  export default {
    name: "EinheitNewView",

    components: {DynamicNewViewBuilder},

    props: [ "NavConfig", "createNewEntity",  "processCRUDActions", "addressRelatedModels", "sortResultBy", "jqr",],
  }
</script>

<style scoped>

</style>