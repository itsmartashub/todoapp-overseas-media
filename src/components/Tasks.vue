<template>
	<div>
		<v-card style="height: calc(100vh - 36px); overflow: hidden">

			<v-toolbar color="blue" dark>
				<v-toolbar-title>Title of the list {{ listID }} </v-toolbar-title>

				<v-spacer></v-spacer>

				<v-btn icon>
					<v-icon>mdi-magnify</v-icon>
				</v-btn>
			</v-toolbar>

			<v-list two-line style="height: 80vh; overflow-y: scroll">
				<template
					v-for="(task, key) in tasks"
					
				>
				<!-- Morali smo staviti key u compoennt pvaj <Tasl />, a ne u <template> jer je template samo wrapper -->
					<Task v-bind:key="key" :task="task" :index="key"/>
				</template>
			</v-list>

			<v-divider></v-divider>

			<v-card-actions>
				<v-layout>
					<v-flex>
						<NewTask />
					</v-flex>
				</v-layout>
			</v-card-actions>

		</v-card>

		<!-- <NotesModal /> -->
		<router-view :key="$route.fullPath" name="notes" />
	</div>

</template>

<script>
import Task from './Task'
import NewTask from './NewTask'
import NotesModal from './NotesModal'

export default {
	name: "tasks",
	components: { Task, NewTask, NotesModal },

	data: () => ({
		tasks: [
			{
				id: 1,
				title: "task title",
				subtitle: "This task contains 8 notes",
				isComplete: true
			},
			{
				id: 2,
				title: "task title",
				subtitle: "This task contains 8 notes",
				isComplete: false
			},
			{
				id: 3,
				title: "task title",
				subtitle: "This task contains 8 notes",
				isComplete: false
			},
			{
				id: 4,
				title: "task title",
				subtitle: "This task contains 8 notes",
				isComplete: true
			},
			{
				id: 5,
				title: "task title",
				subtitle: "This task contains 8 notes",
				isComplete: true
			},
			{
				id: 6,
				title: "task title",
				subtitle: "This task contains 8 notes",
				isComplete: false
			},
			{
				id: 7,
				title: "task title",
				subtitle: "This task contains 8 notes",
				isComplete: true
			},
			{
				id: 8,
				title: "task title",
				subtitle: "This task contains 8 notes",
				isComplete: false
			},
			{
				id: 9,
				title: "task title",
				subtitle: "This task contains 8 notes",
				isComplete: false
			},
			{
				id: 10,
				title: "task title",
				subtitle: "This task contains 8 notes",
				isComplete: true
			},
			{
				id: 11,
				title: "task title",
				subtitle: "This task contains 8 notes",
				isComplete: true
			},
			{
				id: 12,
				title: "task title",
				subtitle: "This task contains 8 notes",
				isComplete: false
			}
		]
	}),

	computed: {
		listID () { //! it looks like a function but its not!
			return this.$route.params.id
		}
	}
}
</script>