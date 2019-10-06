<template>
	<v-list-item @click.prevent="toggle(index)" ripple>

		<v-list-item-action>
			<v-btn icon @click.stop="openModal()">
				<!-- OVO CLICK.STOP, OVO STOP JE ZA STOP PROPAGATION TJ POSTO PARENT OVOGA IMA VEC NEKI CLICK EVENT, I KAD KLIKNEMO NA OVAJ BTN OKINE SE IPAK TAJ CLICK EVENT SA PARENTA, A NE OVAJ OPENMODAL(), PA DA BI OKINULI OPEN MODAL STAVLJAMO OVDE STOP, DA BI VALJDA STOPIRAO DRUGE CLICK EVENTE RECIMO TOG SA PARENTA -->
				<v-icon color="pink">mdi-pencil</v-icon>
			</v-btn>
		</v-list-item-action>

		<v-list-item-content>
			<v-list-item-title>{{ task.title }}</v-list-item-title>

			<!-- <v-list-item-subtitle>{{ task.subtitle }}</v-list-item-subtitle> -->
			<v-list-item-subtitle>This task contains {{ NOTES_COUNT }} notes</v-list-item-subtitle>
		</v-list-item-content>

		<v-list-item-action-text>
			<!-- <v-icon color="green" v-if="task.isComplete">mdi-check-circle</v-icon>
			<v-icon color="grey" v-else>mdi-check-circle</v-icon> -->
			<v-icon :color="task.isComplete ? 'green' : 'grey'" >mdi-check-circle</v-icon>
		</v-list-item-action-text>

	</v-list-item>
</template>

<script>
export default {
	name: "task",

	// jedan nacin
	// props: [
	// 	'task'
	// ]

	// drugi, njegov, nacin
	props: {
		task: Object,
		index: Number
	},
	
	computed: {
		NOTES_COUNT () {
			return this.task.notes.length
			// return this.$store.getters.NOTES_COUNT( // data.js/getters
			// 	this.$route.params.id,
			// 	this.$route.params.taskID
			// )
		}
	},

	methods: {
		toggle(i) {
			// console.log('toggle f-on: ' +i)
			this.$store.dispatch('TOGGLE_TASK', { // data.js/actions
				taskID: this.task.id,
				listID: this.$route.params.id
			})
			// TODO push the changes to the store
		},

		openModal() {
			this.$router.push({
				name: 'notes',
				params: { taskID: this.task.id }
			})
		}
	}
}



//! https://www.youtube.com/watch?v=i0qOFbOcrQ0&list=PLqhuffi3fiMNRoRU2dijolTTKOnE_197R&index=3   -   5:20 - 5:38 "what da fOOOOOOKAY..."
</script>


