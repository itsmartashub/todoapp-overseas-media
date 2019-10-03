import axios from 'axios'

export default {
	state: {
		lists: []
	},

	getters: {
		LISTS: state => {
			return state.lists
		},

		TASKS_COUNT: state => index => {
			if (index) {
				return state.lists.find(list => list.id === index).tasks.length // find by something, and i want to find by index (index of the list). find ide kroz sve liste koje korisnik ima, a mi trazimo da list.id bude isti kao index, za tu listu zelim da dohvatim tasks, tj koliko ima tasks (tasks.length)
			}
		},

		LIST_TITLE: state => index => { // ovo index mu valjda dodje id od liste koju smo prosledili ovde iz Tasks.vue (this.$route.params.id) 
			if (index) {
				return state.lists.find(list => list.id === index).title
			}
		},

		TASKS: state => index => {
			if (index) {
				return stata.lists.find(list => list.id === index).tasks
			}
		}

	},

	mutations: {
		SET_LISTS: (state, payload) => {
			state.lists = payload
		},

		ADD_LIST: (state, payload) => {
			state.lists.unshift(payload)
		},

		SET_TASKS: (state, {data, listID}) => {
			state.lists.find(list => list.id === listID).tasks = data
		},

		ADD_TASK: (state, {data, listId}) => {
			state.lists.find(list => list.id === listID).tasks.push(data)
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
		},

		GET_TASKS: async ({commit}, payload) => {
			let {data} = await axios.get(`lists/${payload}/tasks`)
			commit('SET_TASKS', { // prosledjujemo list id jer moramo da znamo kojoj listi ovaj task pripada
				data,
				listID: payload
			}) 
		},

		POST_TASK: async ({commit}, {listId, taskTitle}) => {
			let {data, status} = await axios.post(`/list/${listId}/tasks`, {
				title: taskTitle
			})
			if (status === 200 ) {
				commit('ADD_TASK', {
					data,
					listId
				})
			}
		}
	}
}

// get the lists pf the user, login user ofc