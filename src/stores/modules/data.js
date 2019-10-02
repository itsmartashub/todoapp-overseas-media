import axios from 'axios'

export default {
	state: {
		lists: []
	},

	getters: {
		LISTS: state => {
			return state.lists
		}
	},

	mutations: {
		SET_LISTS: (state, payload) => {
			state.lists = payload
		},

		TASKS_COUNT: state => index => {
			if (index) {
				return state.lists.find(list => list.id === index).tasks.length // find by something, and i want to find by index (index of the list). find ide kroz sve liste koje korisnik ima, a mi trazimo da list.id bude isti kao index, za tu listu zelim da dohvatim tasks, tj koliko ima tasks (tasks.length)
			}
		},

		ADD_LIST: (state, payload) => {
			state.lists.unshift(payload)
		}
	},

	actions: {
		GET_LISTS: async ({commit}) => {
			let {data} = await axios.get(`lists`)
			console.log(data)
			commit('SET_LISTS', data)
		},

		POST_LIST: ({commit}, payload) => {
			return new Promise((resolve, reject) => {
				axios.post(`lists`, payload)
					.then(({data, status}) => {
						console.log(data, status)
						resolve({data, status})
						commit('ADD_LIST', data)

						if (status === 200 ) {
							resolve({data, status})
						}
					})
					.catch(err => {
						reject(err)
					})
			})
		}
	}
}

// get the lists pf the user, login user ofc