<template>
  <v-container>
    <v-row>
      <v-col cols="12" md="10" class="mx-auto mb-4">
        <div>
          <h1 class="main-title text-center">
            Comercia con productos ecológicos
          </h1>
          <h2 class="second text-center">Locales, Saludables y Sabrosos</h2>

          <v-col cols="12" md="6" class="mx-auto">
            <div class="text-center mt-12 mb-8">
              <span class="call mb-4">Para comprar o vender productos</span>

              <v-btn small color="#ffa83a" text nuxt to="/signup"
                ><v-icon left>mdi-login-variant</v-icon>
                Crea una cuenta
              </v-btn>
            </div>
          </v-col>
        </div>

        <!--<div class="text-center">
          <h2 class="secon">Últimos Productos</h2>
        </div>-->
        <ProductSlider />

        <div class="text-center mt-12">
          <v-btn color="#ffa83a" dark nuxt to="productList">
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
.main-title {
  font-family: 'Roboto Condensed', sans-serif;
  font-size: 40px;
  color: #5c8d89;
}
.second {
  font-family: 'Cabin', sans-serif;
  font-size: 28px;

  /* color: #74b49b; */
}
.call {
  color: #5c8d89;
  font-family: 'Cabin', sans-serif;
}
.secon {
  font-family: 'Cabin', sans-serif;
  color: #74b49b;
  font-size: 32px;
}
</style>
