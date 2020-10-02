<template>
  <v-container
    ><v-row>
      <v-col cols="12" md="10" class="mx-auto">
        <h1>Busca los productos por isla o municipio</h1>

        <SelectLocation />

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
import { mapState } from 'vuex'

import ProductCard from '~/components/ProductCard'
import SelectLocation from '~/components/SelectLocation'

export default {
  components: {
    ProductCard,
    SelectLocation,
  },
  data() {
    return {
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
    filteredProducts() {
      return this.products.filter((product) => {
        return product.name.match(this.search.toUpperCase())
      })
    },
    ...mapState(['selectedMunicipality']),
  },

  methods: {
    async listByMunicipality() {
      console.log(this.selectedMunicipality)
      this.products = await this.$axios.$get(
        `/products/municipalities/${this.selectedMunicipality}`
      )
    },
  },
}
</script>
