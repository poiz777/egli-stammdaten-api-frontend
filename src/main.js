import './plugins/vuetify';

import Vue        from 'vue';
import VueRouter  from 'vue-router';
import store      from './Store/index';
import EgliApi    from './EgliApi';
import router     from './routing/router';
// import VueHelmet  from "vue-helmet";

Vue.use(VueRouter);
// Vue.use(VueHelmet);

Vue.config.devtools       = process.env.NODE_ENV === 'development';
Vue.config.productionTip  = false;

new Vue({
  store     : store,
  el        : '#app',
  router    : router,
  // VueHelmet : VueHelmet,
  render    : h => h(EgliApi)
}).$mount('#app');

window.__VUE_DEVTOOLS_GLOBAL_HOOK__.Vue = EgliApi.constructor;
