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

        <div v-if="selectedMunicipality">
          <v-btn
            color="#ffa83a"
            class="text-center mb-4"
            @click="listByMunicipality"
            >Buscar productos</v-btn
          >
        </div>

        <div v-if="filteredProducts.length > 0">
          <v-divider></v-divider>
          <v-col cols="12" md="6" class="mx-auto">
            <v-sheet class="pa-2">
              <v-text-field
                v-model="search"
                :placeholder="placeholder"
                :filled="filled"
                :clearable="clearable"
                :counter="counterEn ? counter : false"
                prepend-icon="mdi-magnify"
              ></v-text-field>
            </v-sheet>
          </v-col>
        </div>

        <v-row>
          <ProductCard
            v-for="(product, idx) in filteredProducts"
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
      products: [],
      search: '',
      placeholder: 'Filtra los productos por nombre',
      filled: false,
      clearable: false,
      counterEn: false,
      counter: 0,
    }
  },
  computed: {
    selectedIslandItems() {
      return this.municipalities.filter(
        (item) => item.islandCode._id === this.selectedIsland
      )
    },
    filteredProducts() {
      return this.products.filter((product) => {
        return product.name.match(this.search.toUpperCase())
      })
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
      this.products = await this.$axios.$get(
        `/products/municipalities/${this.selectedMunicipality}`
      )
    },
  },
}
</script>
