import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './stores/store.js'
import axios from 'axios'

import vuetify from './plugins/vuetify';

Vue.config.productionTip = false

axios.defaults.baseURL = 'http://localhost:8000/api/' // jbg, ja nemam backend sumfony api i sad sve dalji kod ne vredi, ne mogu da testiram

new Vue({
  router,
  store,
  vuetify,
  axios,
  render: h => h(App)
}).$mount('#app')
