export default {
	state: {
		drawer: false,
		notification: {
			display: false,
			text: "Notification placeholder text",
			timeout: 3000,
			className: 'success'
		}
	},


	getters: {
		DRAWER: state => {
			return state.drawer
		},

		NOTIFICATION: state => {
			return state.notification
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
		}
	}, // use mutations to change state properties


	actions: {} // preko mutations menjamo state
}