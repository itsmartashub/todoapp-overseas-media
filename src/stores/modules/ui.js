export default {
	state: {
		drawer: false,
		notification: {
			display: false,
			text: "Notification placeholder text",
			timeout: 3000,
			className: 'success'
		},

		displaySearchList: false,
		newListForm: false
	},


	getters: {
		DRAWER: state => { // OptionsBar.vue, MoreOptions.vue
			return state.drawer
		},

		NOTIFICATION: state => {
			return state.notification
		},

		DISPLAY_SEARCH_LIST: state => { // List.vue
			return state.displaySearchList
		},

		NEW_LIST_FORM: state => { // List.vue
			return state.newListForm
		}
	}, // getters samo dohvataju podatke iz state


	mutations: {
		SET_DRAWER: (state, payload) =>  { // OptionsBar.vue, MoreOptions.vue. payload ovde ce biti boolean, dakle ili true ili false
			state.drawer = payload
		},

		SET_NOTIFICATION: (state, { display, tekst, alertClass}) => { // List.vue, OptionsBar.vue, Register.vue. ovo je object destructuring, ovo su notification podaci
			state.notification.display = display
			state.notification.text = tekst,
			state.notification.className = alertClass
		},

		SET_DISPLAY_SEARCH_LIST: (state, payload) => { // List.vue, SearchBar.vue. payload ce biti true ili false
			state.displaySearchList = payload
		},

		SET_NEW_LIST_FORM: (state, payload) => { // List.vue, NewList.vue, payload ce biti true ili false
			state.newListForm = payload
		}
	}, // use mutations to change state properties


	actions: {} // preko mutations menjamo state
}