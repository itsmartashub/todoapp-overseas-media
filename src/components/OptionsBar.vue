<template>
	<div v-if="show">
		<v-card style="height: calc(100vh - 36px);" >
			<v-toolbar color="pink" dark>
				<v-toolbar-title>Options {{ drawer }}</v-toolbar-title>
				<!-- ovo {{ drawer }} je samo za debug purpose -->
			</v-toolbar>

			<v-list>
				<v-list-group
					v-for="(item, key) in items"
					v-bind:key="key"
					v-model="item.active"
					:prepend-icon="item.action"
					no-action
				>
					<v-list-item slot="activator">
						<v-list-item-content>
							<v-list-item-title>{{ item.title }}</v-list-item-title>
						</v-list-item-content>
					</v-list-item>

					<v-list-item
						v-for="(subItem, key) in item.items"
						v-bind:key="key"
						active-class
						v-on="item.action === 'mdi-sort' ? {  click: () => sort(subItem.by) } : { click: () => filter(subItem.by) }"
					>
						<!-- ovo je es6 forica. dakle, kada kliknemo na list-item tj ili Sort by ili Filter by, ako je item.action jednako mdi-sort onda na klik event opali sort() metod kom prosledjujemo kao argumente subItem.by tj po cemu da sortira, a ako kliknemo na item koji nije mdi-sort, onda filtriraj po onome po sta smo kliknuli -->
						<v-list-item-content>
							<v-list-item-title>{{ subItem.title }}</v-list-item-title>
						</v-list-item-content>
					</v-list-item>
				</v-list-group>

				<v-divider></v-divider>

				<v-list-group prepend-icon="mdi-image-filter-none" no-action>
					<v-list-item slot="activator">
						<v-list-item-content>
							<v-list-item-title>List options</v-list-item-title>
						</v-list-item-content>
					</v-list-item>

					<v-list-item @click="displayNotification()">
						<v-list-item-content>
							<v-list-item-title>Remove list</v-list-item-title>
						</v-list-item-content>
					</v-list-item>

					<v-list-item @click.prevent="openDrawer()">
						<v-list-item-content>
							<v-list-item-title>Change background</v-list-item-title>
						</v-list-item-content>
					</v-list-item>
				</v-list-group>

				<v-divider></v-divider>
			</v-list>
		</v-card>

		<MoreOptions/>
	</div>
</template>

<script>
import MoreOptions from './MoreOptions'

export default {
	name: "optionsBar",

	components: { MoreOptions },

	data: () => ({
		items: [
			{
				action: "mdi-sort",
				title: "Sort by",
				active: true,
				items: [
					{
						title: "Date",
						by: "date"
					},
					{
						title: "Name",
						by: "name"
					}
				]
			},

			{
				action: "mdi-filter-variant",
				title: "Filter by",
				active: false,
				items: [
					{
						title: "Reamining",
						by: "remaining"
					},
					{
						title: "Completed",
						by: "completed"
					},
					{
						title: "All",
						by: "all"
					}
				]
			}
		]
	}),

	computed: {
		show () {
			return this.$route.params.id
		},

		drawer () {
			return this.$store.getters.DRAWER // ui.js/ getters
		}
	},

	methods: {
		sort(value) {
			console.log("Sort by " + value);

			this.$store.dispatch('SORT_BY', { // preferences.js/actions
				value,
				listId: this.$route.params.id
			})
		},

		filter(value) {
			console.log("Filter by " + value);

			this.$store.dispatch('FILTER_BY', { // preferences.js/actions
				value,
				listId: this.$route.params.id
			})
		},

		openDrawer() {
			this.$store.commit('SET_DRAWER', true) // kada god kliknemo na 'change backgound' drawer se otvori, ttj on je true, ovo prihvatamo u stores/modules/ui.js u mutations u SET_DRAWER f-ji, true mu dodje tamo payload
		},

		displayNotification() {
			this.$store.commit('SET_NOTIFICATION', { // ui.js/mutations
				display: true,
				tekst: 'List removed!',
				timeout: 3000,
				alertClass: 'success'
			}) 
		}
	}
}
</script>