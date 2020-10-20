<template>
  <v-container
    ><v-row>
      <v-col cols="12" md="10" class="mx-auto">
        <h1>Busca los productos por isla o municipio</h1>

        <SelectLocation />
        <SelectProcedure />

        <div v-if="selectedMunicipality">
          <div v-if="!selectedProcedure">
            <v-btn
              color="#ffa83a"
              dark
              class="text-center mb-4"
              @click="showProducts"
              >Buscar productos</v-btn
            >
          </div>
          <div v-else>
            <v-btn
              color="#ffa83a"
              dark
              class="text-center mb-4"
              @click="listByProcedure"
              >Buscar productos</v-btn
            >
          </div>
        </div>

        <div v-if="filteredProducts.length > 0">
          <v-divider></v-divider>
          <v-row class="mt-4">
            <v-col cols="12" md="4" class="mx-auto">
              <v-sheet class="pa-2">
                <v-spacer></v-spacer>
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
          </v-row>
        </div>
        <div>
          <v-row>
            <ProductCard
              v-for="(product, idx) in filteredProducts"
              :key="idx"
              :products="product"
              class="mb-2"
            />
          </v-row>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import { mapState, mapActions, mapGetters } from 'vuex'

import ProductCard from '~/components/ProductCard'
import SelectLocation from '~/components/SelectLocation'
import SelectProcedure from '~/components/SelectProcedure'

export default {
  components: {
    ProductCard,
    SelectLocation,
    SelectProcedure,
  },
  data() {
    return {
      search: '',
      placeholder: 'Filtra los productos por nombre',
      filled: false,
      clearable: false,
      counterEn: false,
      counter: 0,
    }
  },
  computed: {
    filteredProducts() {
      return this.getProducts.filter((product) => {
        return product.name.match(this.search.toUpperCase())
      })
    },

    ...mapState(['selectedMunicipality', 'selectedProcedure']),
    ...mapGetters(['getProducts']),
  },

  methods: {
    ...mapActions(['setProducts', 'setProductsByProcedure']),
    async listByProcedure() {
      this.products = await this.setProductsByProcedure({
        municipality: this.selectedMunicipality,
        procedure: this.selectedProcedure,
      })
    },

    async showProducts() {
      this.products = await this.setProducts(this.selectedMunicipality)
    },
  },
}
</script>
