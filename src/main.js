import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './stores/store.js'
import axios from 'axios'

import vuetify from './plugins/vuetify';

Vue.config.productionTip = false

axios.defaults.baseURL = 'http://localhost:8000/api/' // jbg, ja nemam backend sumfony api i sad sve dalji kod ne vredi, ne mogu da testiram
axios.defaults.withCredentials = true

//! ==================== ZA REFRESH TOKEN - START ====================
let isRefreshing = false
let subscribers = []

axios.interceptors.response.use(
	response => {
		return response
	},
	err => {
		const {
			config, // original rikvest koji saljemo ali je fejlovao
			response: {status, data}
		} = err

		const originalRequest = config

		if (data.message === "Missing token") {
			router.push({ name: "login" });
			return Promise.reject(false);
		}

		if (originalRequest.url.includes("login_check")) {
			return Promise.reject(err);
		}

		if (status === 401 && data.message === 'Expired token') { // 401 znaci da nisam autorizovana, a ovo expired token je ovaj namestio u svom api-ju da bude
			if (!isRefreshing) {
				isRefreshing = true
				store
					.dispatch('REFRESH_TOKEN')
					.then(({status}) => {
						if (status === 200 || status == 204) {
							isRefreshing = false // which means we are done, valjda da se token vise ne rifresuje
						}
						subscribers = []
					})
					.catch(err => {
						console.error(err)
					})
			}

			const requestSubscribers = new Promise(resolve => {
				subscribeTokenRefresh(() => {
					resolve(axios(originalRequest));
				});
			});

			onRefreshed();

			return requestSubscribers;
			
		}
	}
)

function subscribeTokenRefresh(cb) {
  subscribers.push(cb);
}

function onRefreshed() {
  subscribers.map(cb => cb());
}

subscribers = [];
//! ==================== ZA REFRESH TOKEN - END ====================


new Vue({
  router,
  store,
  vuetify,
  axios,
  render: h => h(App)
}).$mount('#app')
