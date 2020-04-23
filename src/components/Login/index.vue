<template>
  <section class="row">
    <div class="col s2"></div>
    <div class="col s8 panel pulse">
      <form method="post" id="form-edit-update-1" @submit="logClientIn" class="egl-form">
        <!-- <span class="fa fa-window-close pz-close-form-box"></span> -->
        <h1 class="egl-form-title-heading"><span class="fa fa-sign-in"></span> Login</h1>
        <!-- USERNAME BLOCK -->
        <div class="form-group col-md-12 col s12" >
          <label class="col-md-4 col s4 egl-required" for="username"><span class="fa fa-user"></span> Username/E-Mail:*</label>
          <div class="col-md-8 col s8">
            <input class="form-control" id="username" name="username" v-model="clientUserName" type="text" value="" required="required" data-value="">
            <span class="egl-form-field-hint-block">
              <span class="fa fa-lightbulb-o"></span>&nbsp;
              <span >
                <span class="egl-hint">Your Identification [Username]</span>
              </span>
            </span>
          </div>
        </div>

        <!-- PASSWORD BLOCK -->
        <div class="form-group col-md-12 col s12" >
          <label class="col-md-4 col s4 egl-required" for="password"><span class="fa fa-lock"></span> Password:*</label>
          <div class="col-md-8 col s8">
            <input class="form-control" id="password" name="password" v-model="clientPassWord" type="text" value="" required="required" data-value="">
            <span class="egl-form-field-hint-block">
              <span class="fa fa-lightbulb-o"></span>&nbsp;
              <span >
                <span class="egl-hint">Your Password</span>
              </span>
            </span>
          </div>
        </div>

        <div class="form-group col s3 offset-s9 col-md-3 col-md-offset-9 egl-extra-pad egl-btn-wrapper"><button
                type="submit" id="login" @click="logClientIn" class="form-control">Login <span class="fa fa-angle-double-right"></span></button></div>
      </form>
    </div>
    <div class="col s2"></div>

  </section>
</template>

<script>
  import SharedMethods from "../../Services/SharedMethods";

  export default {
    props: {},

    data() {
      return {
        curRoute      : null,
        clientPassWord: null,
        clientUserName: null
      };
    },

    created() {
      SharedMethods.setHtmlPageTitle("Login: Egli Stammdaten API", this);
    },

    methods: {
      logClientIn(e){
        e.preventDefault();
      },
    }
  };
</script>
