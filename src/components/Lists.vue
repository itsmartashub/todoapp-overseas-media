<template>
	<v-navigation-drawer permanent style="width: 100%; overflow: hidden;">

		<v-toolbar color="blue" dark>
			<v-toolbar-title v-if="!DISPLAY_SEARCH_LIST">Your List</v-toolbar-title>

			<SearchBar v-if="DISPLAY_SEARCH_LIST"/>
			
			<v-spacer></v-spacer>

			<v-btn icon @click.prevent="toggleSearchList()">
				<v-icon>mdi-magnify</v-icon>
			</v-btn>
		</v-toolbar>
		
		<v-list>
			<v-list-item color="blue" @click.prevent="openNewListForm()" v-if="!isOpen">
				<v-list-item-content>
					<v-list-item-title>Create a new list</v-list-item-title>
				</v-list-item-content>

				<v-list-item-action>
					<v-list-item-title>
						<v-icon>mdi-plus</v-icon>
					</v-list-item-title>
				</v-list-item-action>
			</v-list-item>

			<v-list-item v-if="openNewListFormValue">
				<NewList />
			</v-list-item>
		</v-list>

		<v-divider></v-divider>

		<v-list style="height: 80vh; overflow-y: scroll">
			<v-list-item
				v-for="(list, key) in lists"
				v-bind:key="key"
				:to="{ name: 'tasks', params: {id: list.id} }"
			>

				<v-list-item-content>
					<v-list-item-title>{{ list.title }}</v-list-item-title>
				</v-list-item-content>

				<v-list-item-action>
					<v-list-item-title>{{ list.tasks }}</v-list-item-title>
				</v-list-item-action>

			</v-list-item>
		</v-list>

	</v-navigation-drawer>
</template>

<script>
import SearchBar from './SearchBar'
import NewList from './NewList'
import { mapGetters } from 'vuex'

export default {
	name: "lists",

	components: { SearchBar, NewList },

	data: () => ({
		// isOpen: false, // 'premesteno' u computed
		lists: [
			{
				id: 1,
				title: "List",
				tasks: 12
			},

			{
				id: 2,
				title: "List",
				tasks: 45
			},
			{
				id: 3,
				title: "List",
				tasks: 66
			},
			{
				id: 4,
				title: "List",
				tasks: 7
			},
			{
				id: 5,
				title: "List",
				tasks: 9
			},{
				id: 1,
				title: "List",
				tasks: 12
			},

			{
				id: 2,
				title: "List",
				tasks: 45
			},
			{
				id: 3,
				title: "List",
				tasks: 66
			},
			{
				id: 4,
				title: "List",
				tasks: 7
			},
			{
				id: 5,
				title: "List",
				tasks: 9
			},
			{
				id: 1,
				title: "List",
				tasks: 12
			},

			{
				id: 2,
				title: "List",
				tasks: 45
			},
			{
				id: 3,
				title: "List",
				tasks: 66
			},
			{
				id: 4,
				title: "List",
				tasks: 7
			},
			{
				id: 5,
				title: "List",
				tasks: 9
			},{
				id: 1,
				title: "List",
				tasks: 12
			},

			{
				id: 2,
				title: "List",
				tasks: 45
			},
			{
				id: 3,
				title: "List",
				tasks: 66
			},
			{
				id: 4,
				title: "List",
				tasks: 7
			},
			{
				id: 5,
				title: "List",
				tasks: 9
			}
		]
	}),

	computed: {
		...mapGetters(['DISPLAY_SEARCH_LIST']),

		openNewListFormValue: {
			get () {
				return this.$store.getters.NEW_LIST_FORM
			},
			set (val) {
				this.$store.commit('SET_NEW_LIST_FORM', true)
			}
		},

		isOpen () { // isOpen ce biti true ili false i apdejtovace se u zavisnosti od vrednosti NEW_LIST_FORM tj da li je otvorena list forma ili ne
			return this.$store.getters.NEW_LIST_FORM
		}
	},

	methods: {
		toggleSearchList() {
			this.$store.commit('SET_DISPLAY_SEARCH_LIST', !this.DISPLAY_SEARCH_LIST)
		},

		openNewListForm() {
			this.$store.commit('SET_NEW_LIST_FORM', true)
		}
	}
}
</script>

<style>

</style>