<template>
	<div style="height: 100%; max-height: 96.6vh;">
		<v-container fluid fill-height pl-0 pr-0 pt-0 pb-0>
			<v-layout row align-content-space-between justify-space-between>
				<v-flex lg3 pr-2>
					<Lists/>
				</v-flex>

				<v-flex lg6 pr-2 pl-2>
					<Tasks />
				</v-flex>

				<v-flex lg3 pl-2>
					<OptionsBar />
				</v-flex>

			</v-layout>
		</v-container>

		<v-footer color="indigo" height="auto">
			<v-layout justify-center >
				<v-flex indigo white--text text-sm-center>
					&copy;2019
					<strong>OverSeas Media</strong>
				</v-flex>
			</v-layout>
		</v-footer>
	</div>
</template>

<script>
import Lists from './Lists'
import Tasks from './Tasks'
import OptionsBar from './OptionsBar'

export default {
	name: "todo",
	components: { Lists, Tasks, OptionsBar }
}
</script>

<style>

</style>