import Vue from 'vue'
import axios from 'axios'
import _ from 'lodash'

export default {
	state: {
		lists: [],
		curatedLists: []

	},

	getters: {
		LISTS: state => {
			return state.lists
		},

		CURATED_LISTS: (state, getters, rootState) => { // rootState je ako zelimo da pristupimo root state-u, onom u store.js valjda, pa kao svakom stateu koriscenom u vuexu
			if (!state.curatedLists.length && rootState.search.listSearch === '') { // umesto .search.listSearch smo mogli. rootGetters.LIST_SEARCH valjda. Elem ovo prvo if znaci da akoje curatedLists prazna, i ako nemam neku search vrednost onda mi samo daj listu svih tj state.lists
				return state.lists

			} else if (state.curatedLists.length && rootState.search.listSearch !== '') {
				return state.curatedLists

			} else if (rootState.search.listSearch === '') {
				return state.curatedLists
			}
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
				// return stata.lists.find(list => list.id === index).tasks
				return stata.lists.find(list => list.id === index).curatedTasks
			}
		},

		TASK_TITLE: state => (listId, taskId) => {
			if (listId && taskId) {
				return state.lists
					.find(list => list.id === listId) // find the list
					.tasks.find(task => task.id === taskId).title
			}
		},

		NOTES: state => (listId, taskId) => {
			return state.lists
				.find(list => list.id === listId) // find the list
				.tasks.find(task => task.id === taskId).notes
		}

	},

	mutations: {
		SET_LISTS: (state, payload) => {
			state.lists = payload
		},

		ADD_LIST: (state, payload) => {
			state.lists.unshift(payload)
		},

		// SET_TASKS: (state, {data, listID}) => {
		// 	state.lists.find(list => list.id === listID).tasks = data
		// },
		
		SET_TASKS: (state, {data, listID}) => {
			Vue.set(state.lists.find(list => list.id === listID), 'curatedTasks', data) // object, key string ili number, value
			state.lists.find(list => list.id === listID).tasks = data
		},

		ADD_TASK: (state, {data, listId}) => {
			state.lists.find(list => list.id === listID).tasks.push(data)
		},

		SET_TASK_STATUS: (state, {data, taskID, listID}) => {
			state.lists
				.find(list => list.id === listID) // find the list
				.tasks.find(task => task.id === taskID).isComplete = data // find the task and then set its property isCompleted to data
		},

		SET_NOTES: (state, {data, listID, taskID}) => {
			state.lists
				.find(list => list.id === listID) // find the list
				.tasks.find(task => task.id === taskID).notes = data
		},

		ADD_NOTE: (state, {data, listId, taskID}) => {
			state.lists
				.find(list => list.id === listId) // find the list
				.tasks.find(task => task.id === taskID)
				.notes.push(data)
		},

		REMOVE_NOTE: (state, {noteID, listId, taskID}) => {
			let notes = state.lists
				.find(list => list.id === listId) // find the list
				.tasks.find(task => task.id === taskID).notes
			
			let rs = notes.filter(currentNote => { // rs = results. Iz notes zelim da filtriram stvari koje mi NECE trebati, a ono sto mi nece trebati je
				return currentNote.id !== noteID
			}) 

			// valjda kao ne mozemo sa notes = [...rs] jer bi notes kor kao varijablu a ne referecu, npm
			state.lists
				.find(list => list.id === listId) // find the list
				.tasks.find(task => task.id === taskID).notes = [...rs]
		},

		REMOVE_TASK: (state, {taskID, listId}) => {
			let tasks = state.lists
				.find(list => list.id === listId).tasks

			let rs = tasks.filter(currentTask => {
				return currentTask.id !== taskID
			})

			state.lists.find(list => list.id === listId).tasks = [...rs]
		},

		UPDATE_TASK_TITLE: (state, {title, listId}) => {
			if (listId && title) {
				state.lists.find(list => list.id === listId).title = title
			}
		},

		SET_CURATED_LIST: (state, payload) => {
			state.curatedLists = payload
		},

		SET_LIST_SORT_VALUE: (state, {value, listId}) => {
			state.lists.find(list => list.id === listId).preferences.sortValue = value // ovo preferences.sortValue je iz backenda njegovog restful api-a
		},

		SORT_LIST_BY: (state, {value, listId}) => {
			let tasks = state.lists.find(list => list.id === listId).tasks

			let rs = []

			switch (value) {
				case 'name':
					rs = _.sortBy(tasks, task => { // ovo je lodash metod, sortBy za prvo argument uzima niz koji zelimo da soretiramo, a za srugi je callback f-ja koju cemo da koristimo za to
						return task.title
					})
					break
				case 'date':
					rs = _.sortBy(tasks, task => {
						return task.createdAt
					})
					break
			}

			state.lists.find(list => list.id === listId).curatedTasks = [...rs]
		},

		SET_LIST_FILTER_VALUE: (state, {value, listId}) => {
			state.lists.find(list => list.id === listId).preferences.filterValue = value // ovo preferences.filterValue je iz backenda njegovog restful api-a
		},

		FILTER_LIST_BY: (state, {filter_query, listId}) => {
			let tasks = state.lists.find(list => list.id === listId).tasks

			let rs = []

			switch (filter_query) {
				case 'remaining':
					rs = tasks.filter(task => {
						return !task.isComplete
					})
					break
				case 'completed':
					rs = tasks.filter(task => {
						return task.isComplete
					})
					break
				case 'all':
					rs = tasks
					break
			}

			state.lists.find(list => list.id === listId).curatedTasks = [...rs]
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

		GET_TASKS: async ({commit}, payload) => { // payload ovde je listId
			let {data} = await axios.get(`lists/${payload}/tasks`)
			commit('SET_TASKS', { // prosledjujemo list id jer moramo da znamo kojoj listi ovaj task pripada
				data,
				listID: payload
			})

			let preferences = state.lists.find(list => list.id === payload).preferences

			commit('SORT_LIST_BY', { value: preferences.sortValue, listId: payload })

			commit('FILTER_LIST_BY', { filter_query: preferences.filterValue, listId: payload })
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
		},

		TOGGLE_TASK: async ({commit}, {taskID, listID}) => {
			let {data} = await axios.patch(`tasks/${taskID}/status`)
			commit('SET_TASK_STATUS', {
				data,
				taskID,
				listID
			})
		},

		GET_NOTES: async ({commit}, {listID, taskID}) => { // NotesModal.vue
			let {data} = await axios.get(`tasks/${taskID}/notes`)
			commit('SET_NOTES', {
				data, // the notes that i just got from NotesModal.vue
				listID, // list id so i can look for that list
				taskID // task id so i can look for the tasks inside the list
			})
		},

		POST_NOTE: ({commit}, {note, listId, taskID}) => { // NotesModal.vue
			return new Promise((resolve, reject) => {
				axios.post(`tasks/${taskID}/notes`, {
					note
				})
				.then(({data}) => {
					commit('ADD_NOTE', {
						data,
						listId,
						taskID
					})
					resolve(data) // prosledjujemo data or true or whatever
				})
				.catch(err => {
					reject(err)
				})
			})
		},

		DELETE_NOTE: ({commit}, {noteID, listId, taskID}) => {
			return new Promise((resolve, reject) => {
				axios.delete(`notes/${noteID}`)
				.then(({status}) => {
					if (status === 204) {
						commit('REMOVE_NOTE', {
							noteID, listId, taskID
						})

						resolve(status)
					}
				})
				.catch(err => {
					reject(err)
				})
			})
		},

		DELETE_TASK: ({commit}, {taskID, listId}) => {
			return new Promise((resolve, reject) => {
				axios.delete(`/tasks/${taskID}`)
				.then(({status}) => {
					if (status === 204) {
						commit('REMOVE_TASK', { listId, taskID})
						resolve(status)
					}
				})
				.catch(err => { reject(err) })
			})
		},

		UPDATE_LIST_TITLE: ({commit}, {title, listId}) => {
			return new Promise(async (resolve, reject) => {
				let {data, status} = await axios.patch(`lists/${listId}/title`, {
					title
				})
				if (status === 204 || status === 200) {
					commit('UPDATE_TASK_TITLE', { 
						listId, title
					})

					resolve({data, status})
				} else {
					reject({data, status})
				}
			})
		},

		UPDATE_CURATED_LIST: ({commit, state}, inputValue) => {
			let rs = state.lists.filter(list => {
				return list.title.toLowerCase().includes(inputValue)
			})
			commit('SET_CURATED_LIST', rs)
		}
	}
}

// get the lists pf the user, login user ofc