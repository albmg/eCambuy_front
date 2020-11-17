<template>
  <v-card elevation="10" max-width="800" class="mx-auto">
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
        <div class="subtitle">
          {{ lastProduct.location.name }} - {{ lastProduct.productIsland.name }}
        </div>
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
  bottom: 50px;
  background-color: rgba(0, 0, 0, 0.3);
  font-size: 1em !important;
  width: 50%;
}
.subtitle {
  top: -1px;
  right: -1px;
  background-color: #74b49b;
  font-size: 1em;
  font-weight: bold;
  color: white;
  width: 50%;
}
.title,
.subtitle {
  position: absolute;
  padding: 10px;
  text-align: center;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
}
</style>
