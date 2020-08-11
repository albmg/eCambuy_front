<template>
  <v-container>
    <v-row>
      <v-col cols="12" md="10" class="mx-auto mb-4">
        <div>
          <h1 class="main text-center">Comercia con productos ecológicos</h1>
          <h3 class="second text-center">Locales, Saludables y Sabrosos</h3>

          <v-col cols="12" md="6" class="mx-auto">
            <div class="text-center mt-12 mb-8">
              <span class="call orange--text mb-4"
                >Para comprar o vender productos</span
              >

              <v-btn small color="success" text nuxt to="/signup"
                ><v-icon left>mdi-login-variant</v-icon>
                Crea una cuenta
              </v-btn>
            </div>
          </v-col>
        </div>

        <div class="text-center">
          <h2 class="secon">Últimos Productos</h2>
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

<style scoped>
.main {
  font-family: 'Roboto Condensed', sans-serif;
  font-size: 40px;
}
.second {
  font-family: 'Cabin', sans-serif;
  font-size: 18px;
}
.call,
.secon {
  font-family: 'Cabin', sans-serif;
}
.secon {
  font-size: 32px;
}
</style>
