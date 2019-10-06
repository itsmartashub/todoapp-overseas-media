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
		},

		UPLOAD_BACKGROUND: ({ commit }, { listId, file }) => { // MoreOptions.vue
			return new Promise((resolve, reject) => {
				let formData = new FormData()

				formData.append("image", file)
				formData.append("_method", "PATCH")
				axios
					.post(`lists/${listId}/background`, formData)
					.then(({ data, status }) => {
						if (status === 200) {
							commit("SET_BACKGROUND", { // data.js/mutations
								listId,
								url: data
							})
							resolve({ data, status })
						}
					})
					.catch(error => {
						reject(error);
					})
			})
		},
	}
}