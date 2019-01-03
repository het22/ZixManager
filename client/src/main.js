// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

// http request module
import axios from 'axios'
Vue.prototype.$http = axios;

// global constant
import constant from './util/constant.js'
Vue.prototype.$constant = constant;

// flash message module
import VueFlashMessage from 'vue-flash-message';
Vue.use(VueFlashMessage);

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
