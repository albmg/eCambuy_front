<template>
  <v-card elevation="10" max-width="1000" class="mx-auto">
    <!--<v-system-bar lights-out></v-system-bar>-->
    <v-carousel
      :continuous="true"
      :cycle="cycle"
      :show-arrows="true"
      height="300"
    >
      <v-carousel-item
        v-for="(lastProduct, idx) in lastProducts"
        :key="idx"
        :src="lastProduct.image"
      >
        <div class="title">
          {{ lastProduct.name }}
        </div>
        <!--<div class="subheading">{{ lastProduct.name }}</div>
        <template v-slot:placeholder>
          <v-row class="fill-height ma-0" align="center" justify="center">
            <v-progress-circular
              indeterminate
              color="grey lighten-5"
            ></v-progress-circular>
          </v-row>
        </template>
        <v-sheet height="100%" tile>
          <v-row class="fill-height" align="center" justify="center">
            <div class="display-3">
              <v-img height="200px" :src="lastProduct.image" />
            </div>
          </v-row>
        </v-sheet>-->
      </v-carousel-item>
    </v-carousel>
  </v-card>
</template>

<script>
export default {
  name: 'ProductSlider',
  data() {
    return {
      lastProducts: [],
      cycle: true,
    }
  },
  async mounted() {
    this.lastProducts = await this.getLastProducts()
  },
  methods: {
    async getLastProducts() {
      const response = await this.$axios.$get('/products/last')
      return response
    },
  },
}
</script>

<style scoped>
.title {
  position: absolute;
  bottom: 50px;
  background-color: rgba(0, 0, 0, 0.3);
  font-size: 2em;
  padding: 10px;
  text-align: center;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
  width: 50%;
}
</style>
