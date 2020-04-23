<template>
  <span class="egl-form-field-hint-block">
    <span class="fa fa-lightbulb-o"></span>&nbsp;
    <span v-html="fieldHintHTML"></span>
  </span>
</template>

<script>
  export default {
    name: "FormFieldHint",
    props: ["fieldHintHTML"]
  }
</script>

<style scoped>

</style>