<template>
	<v-layout row justify-center="">
		<v-dialog v-model="open" max-width="60%" scrollable>

			<v-card>
				<v-card-title>
					<!-- <span class="headline">Task title</span> -->
					<span class="headline">{{ TASK_TITLE }}</span>
				</v-card-title>

				<v-card-text>
					<v-container>
						<v-form @submit.prevent="addNote()">
							<v-textarea
								outlined
								v-model="note"
								label="Note"
								placeholder="Start writing your note here"
							></v-textarea>

							<v-btn color="success" type="submit">Save</v-btn>
						</v-form>
					</v-container>

					<v-list three-line subheader>
						<v-subheader>Notes</v-subheader>
						<!-- {{ NOTES }} -->
						<!-- debagovanje -->
						<v-list-item v-for="(note, key) in NOTES" v-bind:key="key">
							<v-list-item-content>{{ note.note }}</v-list-item-content>

							<v-list-item-action>
								<v-btn icon @click="deleteNote(note.id)">
									<v-icon color="red">mdi-delete</v-icon>
								</v-btn>
							</v-list-item-action>
						</v-list-item>
					</v-list>
				</v-card-text>
				
				<v-card-actions>
					<v-btn color="primary" text @click.stop="open = false">Close</v-btn>
					<v-spacer></v-spacer>
					<v-btn color="red" dark text @click.stop="deleteTask()">Remove task</v-btn>
				</v-card-actions>
			</v-card>

		</v-dialog>
	</v-layout>
</template>

<script>
export default {
	name: "notesModal",

	data: () => ({
		open: true,
		note: '',
		// notes: [
		// 	{
		// 		id: 1,
		// 		note: "Some random note"
		// 	},
		// 	{
		// 		id: 1,
		// 		note: "Some random note"
		// 	},
		// 	{
		// 		id: 1,
		// 		note: "Some random note"
		// 	},
		// 	{
		// 		id: 1,
		// 		note: "Some random note"
		// 	},
		// 	{
		// 		id: 1,
		// 		note: "Some random note"
		// 	},
		// 	{
		// 		id: 1,
		// 		note: "Some random note"
		// 	},
		// 	{
		// 		id: 1,
		// 		note: "Some random note"
		// 	},
		// 	{
		// 		id: 1,
		// 		note: "Some random note"
		// 	},
		// 	{
		// 		id: 1,
		// 		note: "Some random note"
		// 	},
		// 	{
		// 		id: 1,
		// 		note: "Some random note"
		// 	},
		// 	{
		// 		id: 1,
		// 		note: "Some random note"
		// 	},
		// 	{
		// 		id: 1,
		// 		note: "Some random note"
		// 	},
		// 	{
		// 		id: 1,
		// 		note: "Some random note"
		// 	},
		// 	{
		// 		id: 1,
		// 		note: "Some random note"
		// 	},
		// 	{
		// 		id: 1,
		// 		note: "Some random note"
		// 	}
		// ]
	}),

	computed: {
		NOTES () {
			return this.$store.getters.NOTES( // data.js/getters
				this.$route.params.id,
				this.$route.params.taskID
			)
		},

		TASK_TITLE () {
			return this.$store.getters.TASK_TITLE( // data.js/getters
				this.$route.params.id,
				this.$route.params.taskID
			)
		}
	},

	mounted () {
		this.$store.dispatch('GET_NOTES', { // data.js/actions
			listID: this.$route.params.id,
			taskID: this.$route.params.taskID
		})
	},

	watch: {
		open: function (value) {
			if (value === false) {
				this.$route.push({
					name: 'tasks',
					params: { id: this.$route.params.id }
				})
			}
		}
	},
	
	methods: {
		addNote() {
			this.$store.dispatch('POST_NOTE', { // data.js/actions
				note: this.note,
				taskID: this.$route.params.taskID,
				listId: this.$route.params.id
			})
			.then(response => {
				this.note = ''
			})
			.catch(err => {
				this.$store.commit('SET_NOTIFICATION', { // ui.js/mutations
					display: true,
					tekst: 'Something went wrong',
					alertClass: 'error'
				})
			})
		},

		deleteNote(noteID) {
			this.$store.dispatch('DELETE_NOTE', { // data.js/actions
				noteID,
				taskID: this.$route.params.taskID,
				listId: this.$route.params.id
			})
			.then(response => {
				this.$store.commit('SET_NOTIFICATION', { // ui.js/mutations
					display: true,
					tekst: 'Note has been removed!',
					alertClass: 'success'
				})
			})
			.catch(err => {
				this.$store.commit('SET_NOTIFICATION', { // ui.js/mutations
					display: true,
					tekst: 'Something bad happend!',
					alertClass: 'error'
				})
			})
		},

		deleteTask() {
			this.$store.dispatch('DELETE_TASK', { // data.js/actions
				taskID: this.$route.params.taskID,
				listId: this.$route.params.id
			})
			.then(({status}) => {
				if (status === 204) { // 204 znaci da nema contenta sto znaci da je uspesno uklonjen task
					this.$store.commit('SET_NOTIFICATION', { // ui.js/mutations
						display: true,
						tekst: 'Task has been removed!',
						alertClass: 'success'
					})

					this.open = false // da zatvorimo modal u kom smo trenutno
					//? ovo je u watch, zato ne moram ovde
					// this.$router.push({
					// 	name: 'tasks',
					// 	params: { id: this.$route.params.id }
					// })
				} 
			})
			.catch(err => {
				this.$store.commit('SET_NOTIFICATION', { // ui.js/mutations
					display: true,
					tekst: 'Something bad happend!',
					alertClass: 'error'
				})
			})
		}
	},
}
</script>