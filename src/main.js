// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import SuiVue from 'semantic-ui-vue'


Vue.use(SuiVue);
Vue.config.productionTip = false
// axios.defaults.baseURL = 'http://localhost:3000'
axios.defaults.baseURL = 'https://contact-list-nodejs2.appspot.com'
window.Event = new Vue;
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
