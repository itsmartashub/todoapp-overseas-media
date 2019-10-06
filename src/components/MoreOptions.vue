<template>
	<v-layout>
		<v-navigation-drawer v-model="open" absolute right>
			<v-list>
				<v-list-item avatar>
					<v-list-item-avatar>
						<img src="https://randomuser.me/api/portraits/men/75.jpg" alt="User Avatar">
					</v-list-item-avatar>

					<v-list-item-content>Overseas Media</v-list-item-content>
				</v-list-item>
			</v-list>
			<v-divider></v-divider>


			<v-form>
				<v-container fluid>
					<v-flex xs12>
						<img :src="imageUrl" alt="" height="150px">

						<v-text-field
							label="Select an image"
							v-model="imageName"
							prepend-icon="mdi-paperclip"
							@click="pickFile"
						>

						</v-text-field>

						<input
							type="file"
							style="display: none"
							ref="refImage"
							accept="image/*"
							@change="onFilePicked"
						/>
					</v-flex>
					<!-- onfilePicked/pickFile samo biramo fajl za aploud, a sa uploadFile aploudujemo fajl na server -->
					<v-btn @click="uploadFile" :loading="loading" :disabled="!imageFile">
						Set as background
						<v-icon right dark>mdi-cloud-upload</v-icon>
					</v-btn>
				</v-container>
			</v-form>
		</v-navigation-drawer>
	</v-layout>
</template>

<script>
export default {
	name: "moreOptions",
	data: () => ({
		// open: false,
		loading: false,
		imageUrl: '',
		imageName: '',
		imageFile: ''
	}),

	computed: { // computed propertiji samo izgledaju kao f-ions ali nisu, koriste se i pozivaju kao data tj podaci
		open: { // s obz da kor set i get ne stavljamo open() vec open:
			get () {
				return this.$store.getters.DRAWER // ui.js/getters. DRAWER pozivamo bez (). getters mora da se RETURN
			},
			set (val) {
				this.$store.commit('SET_DRAWER', val) // ui.js/mutations. ovo ce biti payload u SET_DRAWER
			}
		}
	},

	methods: {
		pickFile() {
			this.$refs.refImage.click() //! kada kliknemo na v-text-field ono ce da opali onFilePicked f-ju jer smo preko ref-a pristupili top inputu koji je inace display: none, i na njemu tako opalili click()
		},

		onFilePicked(e) {
			// preview that image
			// console.log('input clicknut');
			const files = e.target.files // ovo target.files je js property
			console.log(files);

			if(files[0] !== undefined) {
				this.imageName = files[0].name
				if (this.imageName.lastIndexOf(".") <= 0) { // dakle da li imamo neku extenziju na uploadovanom fajlu
					return
				}

				const fr = new FileReader() // ovo je js, nema veze sa Vue. The FileReader object lets web applications asynchronously read the contents of files (or raw data buffers) stored on the user's computer, using File or Blob objects to specify the file or data to read.
				fr.readAsDataURL(files[0])
				fr.addEventListener("load", () => {
					this.imageUrl = fr.result
					this.imageFile = files[0]
				})
			} else {
				this.imageName = ''
				this.imageUrl = ''
				this.imageFile = ''
			}
		},

		uploadFile() {
			console.log(this.imageFile);
			this.loading = true;
			this.$store.dispatch("UPLOAD_BACKGROUND", {
				listId: this.$route.params.id,
				file: this.imageFile
			})
			.then(response => {
				this.loading = false
			})
			.catch(error => {
				this.loading = false
			}) 
		}
	}
}
</script>