<template>
  <v-container
    ><v-row>
      <v-col cols="12" md="10" class="mx-auto">
        <h1>Busca los productos por isla o municipio</h1>

        <v-row>
          <v-col cols="12" md="4">
            <v-select
              v-model="selectedIsland"
              :items="islands"
              item-text="name"
              item-value="_id"
              label="Seleccionar Isla"
            >
            </v-select>
          </v-col>

          <v-col cols="12" md="4">
            <v-select
              v-model="selectedMunicipality"
              :items="selectedIslandItems"
              item-text="name"
              item-value="_id"
              label="Seleccionar Municipio"
            >
            </v-select>
          </v-col>
        </v-row>

        <!--<v-btn @click="listByMunicipality">Buscar</v-btn>-->
        <div v-if="selectedMunicipality">
          <v-btn @click="listByMunicipality">Buscar productos</v-btn>
        </div>
        <!--<div v-else><v-btn @click="listByIsland">como</v-btn></div>-->

        <v-row>
          <ProductCard
            v-for="(product, idx) in productos"
            :key="idx"
            :products="product"
            class="mb-2"
          />
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import ProductCard from '~/components/ProductCard'

export default {
  components: {
    ProductCard,
  },
  data() {
    return {
      islands: [],
      selectedIsland: '',
      municipalities: [],
      selectedMunicipality: '',
      productos: [],
    }
  },
  computed: {
    selectedIslandItems() {
      return this.municipalities.filter(
        (item) => item.islandCode._id === this.selectedIsland
      )
    },
  },

  async mounted() {
    this.islands = await this.getIslands()
    this.municipalities = await this.getMunicipalities()
  },
  methods: {
    async getIslands() {
      const response = await this.$axios.$get('/islands')
      return response
    },
    async getMunicipalities() {
      const response = await this.$axios.$get('/municipalities')
      return response
    },
    // async listByIsland() {
    //   console.log(this.selectedIsland)
    //   const response = await this.$axios.$get(
    //     `/products/islands/${this.selectedIsland}`
    //   )
    //   console.log(response)
    //   return response
    // },
    async listByMunicipality() {
      // console.log(this.selectedMunicipality)
      this.productos = await this.$axios.$get(
        `/products/municipalities/${this.selectedMunicipality}`
      )
    },
  },
}
</script>
