export default {
	state: {
		listSearch: ''
	},

	getters: {
		LIST_SEARCH: state => {
			return state.listSearch
		}
	},

	mutations: {
		SET_LIST_SEARCH: (state, payload) => { // SearchBar.vue
			state.listSearch = payload
		}
	},

	actions: {}
}