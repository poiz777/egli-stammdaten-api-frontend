<template>
  <Login :userData="userData"></Login>
</template>

<script>
  import { mapState } from 'vuex';
  import Login        from "../components/Login";
  export default {
    name: "LoginView",

    components: { Login },

    props: [ "NavConfig", "createNewEntity",  "processCRUDActions", "addressRelatedModels", "sortResultBy", "jqr"],

    computed: {
      ...mapState([
          "user",     // `user` OR `userData` BUT NOT BOTH
          "userData",
          "renderData",
          "dataSample",
          "pageTitle",
        ]),

    }
  }

</script>

<style scoped>

</style>