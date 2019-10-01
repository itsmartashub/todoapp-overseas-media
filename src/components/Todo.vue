<template>
	<div style="height: 100%; max-height: 96.6vh;">
		<v-container fluid fill-height pl-0 pr-0 pt-0 pb-0>
			<v-layout row align-content-space-between justify-space-between>
				<v-flex lg3 pr-2>
					<Lists/>
				</v-flex>

				<v-flex lg6 pr-2 pl-2>
					<!-- <Tasks /> -->
					<!-- Umesto ovog cemo koristiti router-view -->
					<router-view name="tasks" :key="$route.fullPath"/>
					<!-- sa name="tasks" govorimo router-view koji komponent da koristi/otvori/naviguje. E sad, prilikom tog klika na odjerenu listu sa taskovima, moze da se desi da se ne desi taj apdejt komponente prilikom konekcije sa serverom preko ajaxa, i zato bi trebalo ovom router-view da sibnemo nesto originalno za key a to je recimo fullPath rute, da bi znao da treba drugu komponent da ucita (tj istu, ali sa drugim podacima, tipa lista sa drugim id-em) -->
				</v-flex>

				<v-flex lg3 pl-2>
					<!-- a ovaj necemo preko router-viewa vec preko vuexa -->
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

		<Notification />
	</div>
</template>

<script>
import Lists from './Lists'
import Tasks from './Tasks'
import OptionsBar from './OptionsBar'
import Notification from './Notification'

export default {
	name: "todo",
	components: { Lists, Tasks, OptionsBar, Notification }
}
</script>

<style>

</style>