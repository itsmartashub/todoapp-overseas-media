<template>
	<v-container fill-height>
		<v-layout align-center justify-center>
			<v-flex xs12 sm8 md8>
				<v-form>
					<v-card class="elevation-12">
						<v-toolbar color="blue" dark>
							<v-toolbar-title>
								Login form
							</v-toolbar-title>
						</v-toolbar>

						<v-alert
							color="error"
							:value="error"
							icon="mdi-close"
						>
							The username or the password are incorrect.
						</v-alert>

						<v-card-text>
							<v-text-field v-model="username" prepend-icon="mdi-person" name="login" label="Login" type="text"></v-text-field>
							
							<v-text-field v-model="password" prepend-icon="mdi-lock" name="password" label="Password" type="password"></v-text-field>
						</v-card-text>
						<v-divider></v-divider>

						<v-card-actions>
							<v-btn :to="{name: 'signup'}" rounded color="indigo" dark>
								Sign up
							</v-btn>
							<v-spacer></v-spacer>
							<v-btn rounded color="primary" dark @click.prevent="login()">
								Login
								<v-icon>mdi-chevron-right</v-icon>
							</v-btn>
						</v-card-actions>
					</v-card>
				</v-form>
			</v-flex>
		</v-layout>
	</v-container>
</template>

<script>
export default {
	name: "login",

	data: () => ({
		username: '',
		password: '',
		error: false
	}),

	methods: {
		login() {
			// this.$router.push('/')
			this.$store.dispatch('LOGIN', { // user.js/actions
				username: this.username,
				password: this.password
			})
			.then(success => {
				this.$router.push('/')
			})
			.catch(err => {
				this.error = true
			})
		}
	}
}
</script>

<style>

</style>