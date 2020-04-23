<template>
  <DynamicEditViewBuilder :jqr="jqr"    :hideCloseButton="true"
                          :addressRelatedModels="addressRelatedModels"></DynamicEditViewBuilder>
</template>

<script>
  import DynamicEditViewBuilder from "./../DynamicEditViewBuilder";

  export default {
    name: "DruckermodellEditView",

    components: { DynamicEditViewBuilder },

    props: [ "NavConfig", "createNewEntity",  "processCRUDActions", "addressRelatedModels", "sortResultBy", "jqr"],
  }
</script>
<style scoped>

</style>

