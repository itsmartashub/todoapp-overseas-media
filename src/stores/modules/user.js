import axios from 'axios'

export default {
	state: {},

	getters: {},

	mutations: {},

	actions: {
		LOGIN: ({commit}, payload) => {
			return new Promise((resolve, reject) => {
				axios.post(`login_check`, payload)
					.then(({data, status}) => { // iz responsa uzimamo samo data i status
						if (status === 200) {
							resolve(true)
						}
					})
					.catch(err => {
						reject(err)
					})
			})
		},

		REGISTER: ({commit}, {username, email, password}) => {
			return new Promise((resolve, reject) => {
				axios.post(`register`, {
					username, email, password
				})
				.then(({data, status}) =>{
					if(status === 201) {
						resolve(true)
					}
				})
				.catch(err => {
					reject(err)
				})
			})
		}
	}
}