<template>
	<input
		type="text"
		placeholder="Search..."
		v-model.trim="input"
		v-on:input="search()"
		ref="refInput"
		@blur="closeSearchBar()"
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
			console.log(this.input);
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