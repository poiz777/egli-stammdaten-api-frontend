<template>
  <DynamicEntityViewBuilder :createNewEntity="createNewEntity"
                            :processCRUDActions="processCRUDActions"
                            :sortResultBy="sortResultBy"    :jqr="jqr"
                            :addressRelatedModels="addressRelatedModels"></DynamicEntityViewBuilder>
</template>

<script>
  import DynamicEntityViewBuilder from "./../DynamicEntityViewBuilder";

  export default {
    name: "VerkaufseinheitListView",

    components: {DynamicEntityViewBuilder},

    props: [ "NavConfig", "createNewEntity",  "processCRUDActions", "addressRelatedModels", "sortResultBy", "jqr",],
  }
</script>

<style scoped>

</style>