<template>
	<input
		type="text"
		placeholder="Search..."
		v-model.trim="input"
		v-on:input="search()"
		ref="refInput"
		@blur="closeSearchBar()"
		style="width: 100%"
	>
</template>

<script>
export default {
	name: 'list-search',

	data: () => ({
		input: ''
	}),

	methods: {
		search() {
			// TODO: search the list
			// console.log(this.input);
			this.$store.dispatch('UPDATE_CURATED_LIST', this.input) // data.js/actions
			this.$store.commit('SET_LIST_SEARCH', this.input) // search.js/mutations
		},

		closeSearchBar() {
			this.$store.commit('SET_DISPLAY_SEARCH_LIST', false)
		}
	}
}
</script>

<style scoped>
	input::placeholder {
		color: #fff;
	}
</style>