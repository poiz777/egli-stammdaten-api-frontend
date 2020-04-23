<template>
  <DynamicNewViewBuilder :jqr="jqr"  :addressRelatedModels="addressRelatedModels"   :hideCloseButton="true"></DynamicNewViewBuilder>
</template>

<script>
  import DynamicNewViewBuilder from "./../DynamicNewViewBuilder";

  export default {
    name: "AdressVerbindungNewView",

    components: {DynamicNewViewBuilder},

    props: [ "NavConfig", "createNewEntity",  "processCRUDActions", "addressRelatedModels", "sortResultBy", "jqr",],
  }
</script>

<style scoped>

</style>