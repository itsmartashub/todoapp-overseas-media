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
		DRAWER: state => {
			return state.drawer
		},

		NOTIFICATION: state => {
			return state.notification
		},

		DISPLAY_SEARCH_LIST: state => {
			return state.displaySearchList
		},

		NEW_LIST_FORM: state => {
			return state.newListForm
		}
	}, // getters samo dohvataju podatke iz state


	mutations: {
		SET_DRAWER: (state, payload) =>  { // payload ovde ce biti boolean, dakle ili true ili false
			state.drawer = payload
		},

		SET_NOTIFICATION: (state, { display, tekst, alertClass}) => { // ovo je obbject destructuring, ovo su notification podaci
			state.notification.display = display
			state.notification.text = tekst,
			state.notification.className = alertClass
		},

		SET_DISPLAY_SEARCH_LIST: (state, payload) => { // payload ce biti true ili false
			state.displaySearchList = payload
		},

		SET_NEW_LIST_FORM: (state, payload) => { // payload ce biti true ili false
			state.newListForm = payload
		}
	}, // use mutations to change state properties


	actions: {} // preko mutations menjamo state
}