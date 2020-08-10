<template>
  <v-col cols="12" sm="6" md="4">
    <v-card>
      <v-img class="white--text align-end" height="200px" :src="products.image">
      </v-img>
      <v-card-title class="pb-2">
        <v-icon left>mdi-fruit-watermelon</v-icon
        >{{ products.name }}</v-card-title
      >
      <v-divider></v-divider>

      <v-card-text class="text--primary">
        <v-icon left>mdi-card-text-outline</v-icon>Descripción:
        {{ products.description }}
      </v-card-text>
      <v-divider></v-divider>

      <v-card-subtitle class="pb-0"
        ><v-icon left>mdi-currency-eur</v-icon>Precio:
        {{ products.price }} Kg</v-card-subtitle
      >
      <v-card-subtitle class="pb-0 mb-2">
        <v-icon left>mdi-google-maps</v-icon>Municipio:
        {{ products.location }}</v-card-subtitle
      >
      <v-divider></v-divider>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="success" block :to="`/productList/${products._id}`">
          <v-icon left>mdi-eye</v-icon>
          Ver producto
        </v-btn>
        <v-spacer></v-spacer>
      </v-card-actions>
    </v-card>
  </v-col>
</template>

<script>
export default {
  name: 'ProductCard',
  props: {
    products: {
      type: Object,
      required: true,
    },
  },
}
</script>
