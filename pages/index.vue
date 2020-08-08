<template>
  <v-container>
    <v-row>
      <v-col cols="12" md="10" class="mx-auto mb-4">
        <h1 class="text-center">Comercia con productos ecológicos</h1>
        <h3 class="text-center">Locales, Saludables y Sabrosos</h3>

        <div class="text-center mt-12 mb-8">
          <span class="orange--text mb-4">Para comprar o vender productos</span>

          <v-spacer />
          <v-btn color="success" nuxt to="/signup">
            Crea una cuenta
          </v-btn>
        </div>

        <div class="text-center">
          <h2>Últimos Productos</h2>
        </div>
        <ProductSlider />

        <div class="text-center mt-12">
          <v-btn color="success" nuxt to="productList">
            <v-icon left>mdi-eye</v-icon>
            Ver todos los productos
          </v-btn>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import ProductSlider from '~/components/ProductSlider'

export default {
  components: { ProductSlider },
}
</script>
