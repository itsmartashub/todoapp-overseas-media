<template>
	<v-container fill-height>
		<v-layout align-center justify-center>
			<v-flex xs12 sm8 md8>
				<v-form>
					<v-card class="elevation-12">
						<v-toolbar color="blue" dark>
							<v-toolbar-title>
								Signup form
							</v-toolbar-title>
						</v-toolbar>

						<v-card-text>
							<v-form>
								<v-alert
									:value="true"
									color="error"
									icon="mdi-alert" 
								>
									This user already exist, try a different set of data.
								</v-alert>

								<v-text-field
									prepend-icon="mdi-account"
									name="signup"
									label="Signup"
									type="text"
									:rules="[rules.required]"
								>
								</v-text-field>

								<v-text-field
									prepend-icon="mdi-email"
									name="email"
									label="Email"
									type="email"
									:rules="[rules.required, rules.email]"
								>
								</v-text-field>

								<v-text-field
									prepend-icon="mdi-lock"
									name="password"
									label="Password"
									type="password"
									:rules="[rules.required, rules.password]"
									v-model="password"
								>
								</v-text-field>

								<v-text-field
									prepend-icon="mdi-lock"
									name="password"
									label="Confirm Password"
									type="password"
									:rules="[rules.required]"
									v-model="confirm_password"
									:error="!valid()"
								>
								</v-text-field>
								
								<v-divider light></v-divider>

								<v-card-actions>
									<v-btn to="/login" rounded color="black" dark>
										Login
									</v-btn>
									<v-spacer></v-spacer>
									<v-btn rounded color="success" @click.prevent="register()">
										Register
										<v-icon>mdi-chevron-right</v-icon>
									</v-btn>
								</v-card-actions>
							</v-form>
						</v-card-text>

					</v-card>
				</v-form>
			</v-flex>
		</v-layout>
	</v-container>
</template>

<script>
export default {
	data: () => ({
		password: '',
		confirm_password: '',
		rules: {
			required: value => !!value || "Required", //! !!value: !value pretvara value u boolean (zelim da vratim ili true ili "Required"), ako ima nesto u polju (dakle nije prazno) value pje dakle true, !value postaje false, i onda !!value opet true, fakticki mu dodje konvertovanje u boolean jer hocu da vratim boolean, ne string, npm. Ako je !!value false, onda zelim da vratim "Required"
			email: value => {
				const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
				return pattern.test(value) || "Invalid e-mail."
			}
		}
	}),

	methods: {

		valid() {
			return this.password === this.confirm_password
		},
		
		register() {
			this.$router.push('/login')
		},
	}
}
</script>