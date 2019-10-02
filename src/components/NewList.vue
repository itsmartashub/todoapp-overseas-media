<template>
	<v-container pt-0 pr-0 pb-0 pl-0>
		<v-form ref="refForm" @submit.prevent="submit()">
			<v-text-field
				append-icon="mdi-plus"
				solo
				ref="refInput"
				v-model="title"
				placeholder="Title"
				:rules="[rules.required]"
				@blur="closeForm()"
			>

			</v-text-field>
		</v-form>
	</v-container>
</template>

<script>
export default {
	data: () => ({
		title: '',
		rules: {
			required: value => !!value || "Required"
		}
	}),

	methods: {
		submit() {
			// console.log("submitted");
			this.$store.dispatch('POST_LIST', {
				title: this.title
			})
			// .then(response => {
			.then(({ data }) => {
				this.$store.commit('SET_NOTIFICATION', {
					display: true,
					tekst: 'List has been created!',
					alertClass: 'success'
				})

				this.title = ''
				this.$router.push({
					name: 'tasks',
					params: {
						// id: response.data.id
						id: data.id
					}
				})

				this.$store.commit('SET_NEW_LIST_FORM', false)
			})
		},

		closeForm() {
			this.$store.commit('SET_NEW_LIST_FORM', false)
		}
	},

	mounted() { // dakle kada se kreira i uctia ova komponenta da se fokusira u ovo polje za novu listu
		this.$refs.refInput.focus()
	}
}
</script>