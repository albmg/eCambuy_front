<template>
  <v-container>
    <v-row>
      <v-col cols="12" md="6" class="mx-auto">
        <v-form v-model="valid">
          <h2>Editar producto</h2>
          <v-text-field
            v-model="name"
            :rules="nameRules"
            label="name"
            required
          ></v-text-field>

          <p>
            Modificar imagen:
            <SelectImage v-model="image" @imageURL="setImageURL" />
          </p>

          <v-textarea
            v-model="description"
            :rules="descriptionRules"
            :counter="325"
            label="description"
            required
          ></v-textarea>

          <v-text-field v-model="price" label="price"> </v-text-field>

          <SelectLocation />

          <v-btn block color="#5c8d89" dark @click="updateProduct">
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
      id: this.$route.params.id,
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
    }
  },
  computed: {
    ...mapState(['selectedIsland', 'selectedMunicipality']),
  },
  async created() {
    const response = await this.$axios.$get(`/products/${this.id}`)
    this.name = response.name
    this.image = response.image
    this.description = response.description
    this.price = response.price
    this.selectedIsland = response.productIsland
    this.selectedMunicipality = response.location
  },

  methods: {
    async updateProduct() {
      const data = {
        name: this.name.toUpperCase(),
        image: this.image,
        description: this.description,
        price: this.price,
        location: this.selectedMunicipality,
        productIsland: this.selectedIsland,
      }
      await this.$axios.$put(`/products/me/${this.id}`, data)
      this.$router.push(`/productList/${this.id}`)
    },
  },
}
</script>
