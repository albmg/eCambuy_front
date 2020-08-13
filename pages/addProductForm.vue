<template>
  <v-container>
    <v-row>
      <v-col cols="12" sm="8" md="6" class="mx-auto">
        <v-form v-model="valid">
          <h2 class="main-title">Añadir producto</h2>
          <v-text-field
            v-model="name"
            :rules="nameRules"
            label="name"
            prepend-inner-icon="mdi-fruit-cherries"
            required
          ></v-text-field>

          <p>imagen: <SelectImage v-model="image" @imageURL="setImageURL" /></p>

          <v-textarea
            v-model="description"
            :rules="descriptionRules"
            :counter="325"
            label="description"
            prepend-inner-icon="mdi-card-text-outline"
            required
          ></v-textarea>

          <v-text-field
            v-model="price"
            label="price"
            prepend-inner-icon="mdi-currency-eur"
            suffix="/Kg"
          >
          </v-text-field>

          <v-text-field
            v-model="location"
            :rules="locationRules"
            label="location"
            prepend-inner-icon="mdi-map-marker"
            required
          ></v-text-field>

          <v-btn block color="#5c8d89" dark nuxt @click="createProduct">
            Enviar
          </v-btn>
        </v-form>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import SelectImage from '~/components/SelectImage'

export default {
  middleware: 'auth',
  components: {
    SelectImage,
  },
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
    setImageURL(imageURL) {
      this.image = imageURL
    },
  },
}
</script>

<style scoped>
.main-title {
  color: #5c8d89;
}
</style>
