<template>
  <v-container>
    <v-row>
      <v-col cols="12" sm="8" md="6" class="mx-auto">
        <v-form v-model="valid">
          <h2>Añadir producto</h2>
          <v-text-field
            v-model="name"
            :rules="nameRules"
            label="name"
            required
          ></v-text-field>

          <v-text-field
            v-model="image"
            :rules="imageRules"
            label="image"
            required
          ></v-text-field>

          <v-btn raised class="primary" @click="onPickFile">Upload Image</v-btn>
          <input
            ref="fileInput"
            type="file"
            style="display: none;"
            accept="image/*"
            @change="OnFilePicked"
          />
          <v-col cols="12" sm="8" md="10" lg="6" class="mx-auto">
            <v-card>
              <v-img :src="imagePreview" height="200" width="350"></v-img>
            </v-card>
          </v-col>

          <v-textarea
            v-model="description"
            :rules="descriptionRules"
            :counter="325"
            label="description"
            required
          ></v-textarea>

          <v-text-field v-model="price" label="price"> </v-text-field>

          <v-text-field
            v-model="location"
            :rules="locationRules"
            label="location"
            required
          ></v-text-field>

          <v-btn block color="primary" nuxt @click="createProduct">
            Enviar
          </v-btn>
        </v-form>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  middleware: 'auth',
  data() {
    return {
      valid: false,
      name: '',
      nameRules: [
        (v) => !!v || 'Name is required',
        (v) => v.length <= 40 || 'Name must be less than 40 characters',
      ],
      image: '',
      imageRules: [(v) => !!v || 'Image is required'],
      description: '',
      descriptionRules: [
        (v) => !!v || 'Description is required',
        (v) =>
          v.length <= 325 || 'Description must be less than 325 characters',
      ],
      price: '',
      location: '',
      locationRules: [
        (v) => !!v || 'Location is required',
        (v) =>
          v.length <= 325 || 'Description must be less than 325 characters',
      ],
      imagePreview: null,
    }
  },
  methods: {
    async createProduct() {
      const data = {
        name: this.name.toUpperCase(),
        image: this.image,
        description: this.description,
        price: this.price,
        location: this.location,
      }
      const product = await this.$axios.$post('/products/me', data)
      console.log(product)
      this.$router.push(`/productList/${product._id}`)
    },
    onPickFile() {
      this.$refs.fileInput.click()
    },
    OnFilePicked(e) {
      // const files = event.target.files
      // const filename = files[0].name
      // if (filename.lastIndexOf('.') <= 0) {
      //  return alert('Please add a valid file')
      // }
      // const fileReader = new FileReader()
      // fileReader.addEventListener('load', () => {
      //  this.image = fileReader.result
      // })
      // fileReader.readAsDataURL(files[0])
      // this.imageToUpload = files[0]
      const files = this.$refs.fileInput.files
      if (files && files[0]) {
        const fileReader = new FileReader()
        fileReader.addEventListener('load', () => {
          this.imagePreview = fileReader.result
        })
        fileReader.readAsDataURL(files[0])
        this.imagePreview = files[0]
        console.log(this.imagePreview)
      }
    },
  },
}
</script>
