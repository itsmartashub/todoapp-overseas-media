<template>
	<v-snackbar
		v-model="snackbar"
		bottom
		right
		:color="NOTIFICATION.className"
		:timeout="NOTIFICATION.timeout"
	>
		<v-icon dark>mdi-bell-alert</v-icon>
		{{ NOTIFICATION.text }}

		<v-btn text dark @click.prevent="snackbar = false">
			<v-icon icon>mdi-clear</v-icon>
		</v-btn>
	</v-snackbar>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
	name: 'notification',

	computed: {
		...mapGetters(['NOTIFICATION']), // ui.js/getters

		snackbar: {
			get () {
				return this.$store.getters.NOTIFICATION.display
			},
			set (val) {
				this.$store.commit('SET_NOTIFICATION', { // ui.js/mutations
					display: false,
					// tekst: 'ffff',
					// alertClass: ''
				})
			}
		}
	}
}
</script>