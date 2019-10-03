<template>
	<div>
		<v-toolbar-title v-on:dblclick="toggleEdit()" v-if="!editing">{{ listTitle }}</v-toolbar-title>

		<v-form @submit.prevent="submit()" v-show="editing">
			<v-text-field ref="refInput" v-model="newTitle" solo text clearable @blur="stopEverything()"></v-text-field>
		</v-form>
	</div>
	
</template>

<script>
export default {
	props: {
		listTitle: String
	},

	data() {
		return {
			editing: false
		}
	},

	methods: {
		valid() {
			return this.newTitle != null && this.newTitle.trim() !== ''
		},

		toggleEdit() {
			this.editing = true
			this.$nextTick(() => {
				this.$refs.refInput.focus()
			})
		},

		submit() {
			// console.log(this.newTitle);
			if(!this.valid()) {
				this.newTitle = this.listTitle
				return false
			}
			// ako je validno: 
			this.$store.dispatch('UPDATE_LIST_TITLE', { // data.js/actions
				title: this.newTitle,
				listId: this.$route.params.id
			})
			.then(response => {
				this.editing = false
			})
			.catch(err => {
				console.log(err)
			})
		},

		stopEverything() {
			this.editing = false
		}
	},

	mounted() {
		this.newTitle = this.listTitle
	}
}
</script>