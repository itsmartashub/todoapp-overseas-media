export default {
	state: {
		sort_by: '',
		filter_by: ''
	},

	getters: {},
	mutations: {},

	actions: {
		SORT_BY: ({commit}, {value, listId}) => { // OptionsBar.vue //! USES
			axios.patch(`preferences/${listId}/sort`, {
				sortBy: value
			})
			.then(response => {
				commit('SET_LIST_SORT_VALUE', {value, listId}) // data.js/mutations //! DEFINED
				commit('SORT_LIST_BY', {value, listId}) // data.js/mutations //! DEFINED
 			})
			.catch(err => console.log(err))
		},

		FILTER_BY: ({commit}, {value, listId}) => {
			axios.patch(`preferences/${listId}/filter`, {
				filterBy: value
			})
			.then(response => {
				commit('SET_LIST_FILTER_VALUE', {value, listId}) // data.js/mutations //! DEFINED
				commit('FILTER_LIST_BY', { filter_query: value, listId }) // data.js/mutations //! DEFINED
 			})
			.catch(err => console.log(err))
		}
	}
}