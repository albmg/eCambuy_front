<template>
  <v-card elevation="10" max-width="800" class="mx-auto">
    <v-carousel
      :continuous="true"
      :cycle="cycle"
      :show-arrows="true"
      height="450"
      hide-delimiter-background
      delimiter-icon="mdi-minus"
    >
      <v-carousel-item
        v-for="(lastProduct, idx) in lastProducts"
        :key="idx"
        :src="lastProduct.image"
      >
        <div class="title">
          {{ lastProduct.name }}
        </div>

        <v-list dark>
          <v-list-item>
            <v-list-item-avatar>
              <v-img :src="lastProduct.owner.photo" width="50px"></v-img>
            </v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-title>{{
                lastProduct.owner.username
              }}</v-list-item-title>
            </v-list-item-content>
            <v-icon class="hidden-xs-only">mdi-google-maps</v-icon>
            <v-list-item-action class="hidden-xs-only">
              {{ lastProduct.location.name }} -
              {{ lastProduct.productIsland.name }}
            </v-list-item-action>
          </v-list-item>
        </v-list>
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
  background-color: rgba(0, 0, 0, 0.3);
  bottom: 50px;
  font-size: 1em !important;
  width: 50%;
  position: absolute;
  padding: 10px;
  text-align: center;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
}
.paco {
  position: relative;
  bottom: -300px;
}
</style>
