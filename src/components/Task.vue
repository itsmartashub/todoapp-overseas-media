<template>
	<v-list-item @click.prevent="toggle(index)">
		<v-list-item-action>
			<v-btn icon>
				<v-icon color="pink">mdi-pencil</v-icon>
			</v-btn>
		</v-list-item-action>

		<v-list-item-content>
			<v-list-item-title>{{ task.title }}</v-list-item-title>

			<v-list-item-subtitle>{{ task.subtitle }}</v-list-item-subtitle>
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

	// drugi, nejgov, nacin
	props: {
		task: Object,
		index: Number
	},

	data: () => ({

	}),

	methods: {
		toggle(i) {
			console.log(i)
			// TODO push the changes to the store
		}
	}
}



//! https://www.youtube.com/watch?v=i0qOFbOcrQ0&list=PLqhuffi3fiMNRoRU2dijolTTKOnE_197R&index=3   -   5:20 - 5:38 "what da fOOOOOOKAY..."
</script>


