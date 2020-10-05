<template>
  <v-container
    ><v-row>
      <v-col cols="12" md="10" class="mx-auto">
        <h1>Busca los productos por isla o municipio</h1>

        <SelectLocation />

        <div v-if="selectedMunicipality">
          <v-btn color="#ffa83a" class="text-center mb-4" @click="showProducts"
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
import { mapState, mapActions, mapGetters } from 'vuex'

import ProductCard from '~/components/ProductCard'
import SelectLocation from '~/components/SelectLocation'

export default {
  components: {
    ProductCard,
    SelectLocation,
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
    ...mapState(['selectedMunicipality']),
    ...mapGetters(['getProducts']),
  },

  methods: {
    ...mapActions(['setProducts']),

    async showProducts() {
      this.products = await this.setProducts(this.selectedMunicipality)
    },
  },
}
</script>
