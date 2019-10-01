<template>
	<v-navigation-drawer permanent style="width: 100%; overflow: hidden;">

		<v-toolbar color="blue" dark>
			<v-toolbar-title>Your List</v-toolbar-title>
			
			<v-spacer></v-spacer>

			<v-btn icon>
				<v-icon>mdi-magnify</v-icon>
			</v-btn>
		</v-toolbar>
		
		<v-list>
			<v-list-item color="blue">
				<v-list-item-content>
					<v-list-item-title>Create a new list</v-list-item-title>
				</v-list-item-content>

				<v-list-item-action>
					<v-list-item-title>
						<v-icon>mdi-plus</v-icon>
					</v-list-item-title>
				</v-list-item-action>
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
export default {
	name: "lists",

	data: () => ({
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
	})
}
</script>

<style>

</style>