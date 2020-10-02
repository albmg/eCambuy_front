<template>
  <v-container>
    <v-row>
      <v-col cols="12" sm="8" md="6" class="mx-auto">
        <v-form v-model="valid">
          <h2 class="main-title">Añadir producto</h2>
          <v-text-field
            v-model="name"
            :rules="nameRules"
            label="nombre"
            prepend-inner-icon="mdi-fruit-cherries"
            required
          ></v-text-field>

          <p>imagen: <SelectImage v-model="image" @imageURL="setImageURL" /></p>

          <v-textarea
            v-model="description"
            :rules="descriptionRules"
            :counter="325"
            label="descripción"
            prepend-inner-icon="mdi-card-text-outline"
            required
          ></v-textarea>

          <v-text-field
            v-model="price"
            label="precio"
            prepend-inner-icon="mdi-currency-eur"
          >
          </v-text-field>

          <!--<v-text-field
            v-model="location"
            :rules="locationRules"
            label="localización"
            prepend-inner-icon="mdi-map-marker"
            required
          ></v-text-field>-->

          <SelectLocation />

          <v-btn block color="#5c8d89" dark nuxt @click="createProduct">
            Enviar
          </v-btn>
        </v-form>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapState } from 'vuex'

import SelectImage from '~/components/SelectImage'
import SelectLocation from '~/components/SelectLocation'

export default {
  middleware: 'auth',
  components: {
    SelectImage,
    SelectLocation,
  },
  data() {
    return {
      valid: false,
      name: '',
      nameRules: [
        (v) => !!v || 'Nombre del producto requerido',
        (v) => v.length <= 40 || 'Longitud máxima 40 caracteres',
      ],
      image: '',
      imageRules: [(v) => !!v || 'Imagen requerida'],
      description: '',
      descriptionRules: [
        (v) => !!v || 'Descripción requerida',
        (v) => v.length <= 325 || 'Logitud máxima de 325 caracteres',
      ],
      price: '',
    }
  },
  computed: {
    ...mapState(['selectedIsland', 'selectedMunicipality']),
  },
  methods: {
    async createProduct() {
      const data = {
        name: this.name.toUpperCase(),
        image: this.image,
        description: this.description,
        price: this.price,
        location: this.selectedMunicipality,
        productIsland: this.selectedIsland,
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
