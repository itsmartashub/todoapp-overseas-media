<template>
	<v-form @submit.prevent="createNewTask()">
		<v-text-field label="Add a new task" append-icon="mdi-plus" solo v-model="title">
			dsadsa
		</v-text-field>
	</v-form>
</template>

<script>
export default {
	name: "newTask",

	data() {
		return {
			title: ''
		}
	},

	methods: {
		async createNewTask() {
			await this.$store.dispatch('POST_TASK', { // data.js/actions
				listId: this.$route.params.id,
				taskTitle: this.title
			})

			this.$store.commit('SET_NOTIFICATION', {
				display: true,
				tekst: 'Task has been created!',
				alertClass: 'success'
			})

			this.title = ''
		}
	}
}
</script>
