<template>
	<v-layout row justify-center="">
		<v-dialog v-model="open" max-width="60%" scrollable>
			<v-card>
				<v-card-title>
					<span class="headline">Task title</span>
				</v-card-title>

				<v-card-text>
					<v-container>
						<v-form>
							<v-textarea
								outlined
								v-model="note"
								label="Note"
								placeholder="Start writing your note here"
							></v-textarea>

							<v-btn color="success">Save</v-btn>
						</v-form>
					</v-container>

					<v-list three-line subheader>
						<v-subheader>Notes</v-subheader>
						
						<v-list-item v-for="(note, key) in notes" v-bind:key="key">
							<v-list-item-content>{{ note.note }}</v-list-item-content>

							<v-list-item-action>
								<v-btn icon>
									<v-icon color="red">mdi-delete</v-icon>
								</v-btn>
							</v-list-item-action>
						</v-list-item>
					</v-list>
				</v-card-text>
				
				<v-card-actions>
					<v-btn color="primary" text>Close</v-btn>
					<v-spacer></v-spacer>
					<v-btn color="red" dark text>Remove task</v-btn>
				</v-card-actions>
			</v-card>

		</v-dialog>
	</v-layout>
</template>

<script>
export default {
	name: "notesModal",

	data: () => ({
		open: true,
		note: '',
		notes: [
			{
				id: 1,
				note: "Some random note"
			},
			{
				id: 1,
				note: "Some random note"
			},
			{
				id: 1,
				note: "Some random note"
			},
			{
				id: 1,
				note: "Some random note"
			},
			{
				id: 1,
				note: "Some random note"
			},
			{
				id: 1,
				note: "Some random note"
			},
			{
				id: 1,
				note: "Some random note"
			},
			{
				id: 1,
				note: "Some random note"
			},
			{
				id: 1,
				note: "Some random note"
			},
			{
				id: 1,
				note: "Some random note"
			},
			{
				id: 1,
				note: "Some random note"
			},
			{
				id: 1,
				note: "Some random note"
			},
			{
				id: 1,
				note: "Some random note"
			},
			{
				id: 1,
				note: "Some random note"
			},
			{
				id: 1,
				note: "Some random note"
			}
		]
	})
}
</script>

<style>

</style>