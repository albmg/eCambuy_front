<template>
  <v-main>
    <v-container>
      <v-row>
        <v-col cols="12" md="12">
          <v-sheet elevation="1" class="pa-6">
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
    </v-container>

    <h2 class="main-title text-center">Productos en venta</h2>
    <!--<v-container>
      <v-row>
        <ProductCard
          v-for="(product, idx) in filteredProducts"
          :key="idx"
          :products="product"
          class="mb-2"
        />
      </v-row>
    </v-container>-->
  </v-main>
</template>

<script>
// import ProductCard from '~/components/ProductCard'

export default {
  // name: 'ProductList',
  // components: {
  //  ProductCard,
  // },
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
  },
  async mounted() {
    this.products = await this.getListProducts()
  },
  methods: {
    async getListProducts() {
      const response = await this.$axios.$get('/products')
      return response
    },
  },
}
</script>

<style scoped>
.main-title {
  color: #5c8d89;
}
</style>
