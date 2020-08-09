<template>
  <v-main>
    <v-col cols="12" sm="10" md="10" lg="6" class="mx-auto">
      <v-card>
        <v-card-title>Vendedor:{{ owner && owner.username }}</v-card-title>
        <v-img class="white--text align-end" height="200px" :src="image">
        </v-img>
        <v-spacer></v-spacer>
        <v-card-title class="pb-0">{{ name }}</v-card-title>
        <v-spacer></v-spacer>
        <v-card-subtitle class="pb-0">Precio: {{ price }}</v-card-subtitle>
        <v-card-subtitle class="pb-0"
          >Municipio: {{ location }}</v-card-subtitle
        >
        <v-card-text class="text--primary">
          <div>Descripción: {{ description }}</div>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-btn color="success" text to="/productList">
            Lista de productos
          </v-btn>
          <v-spacer></v-spacer>
          <v-btn color="info" text>
            Chat
          </v-btn>
          <v-spacer></v-spacer>
          <div v-if="isAuthenticated && loggedInUser._id === owner._id">
            <v-btn class="mb-2" block color="orange" @click="editProduct"
              >Editar Producto</v-btn
            >

            <v-btn block color="error" @click="deleteProduct"
              >Borrar Producto</v-btn
            >
          </div>
        </v-card-actions>
      </v-card>
    </v-col>

    <v-col
      v-if="isAuthenticated"
      cols="12"
      sm="10"
      md="10"
      lg="6"
      class="mx-auto"
    >
      <div v-for="(message, idx) in messages" :key="idx" class="mb-2">
        <div>
          <v-card>
            <v-card-subtitle
              >{{ message.userId.username }} a las
              {{ new Date(message.date) }} dice:
            </v-card-subtitle>
            <v-card-title>{{ message.text }}</v-card-title>
          </v-card>
        </div>
      </div>
    </v-col>
  </v-main>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  async asyncData({ $axios, params }) {
    const response = await $axios.$get(`/products/${params.id}`)
    return { ...response }
  },
  data() {
    return {
      id: this.$route.params.id,
      dialog: false,
      messages: [],
    }
  },
  computed: {
    ...mapGetters(['isAuthenticated', 'loggedInUser']),
  },
  async mounted() {
    this.messages = await this.showMessages()
  },
  methods: {
    editProduct() {
      this.$router.push(`/editProduct/${this.id}`)
    },
    async deleteProduct() {
      const response = confirm('Estás seguro de borrar el producto?')
      if (response) {
        await this.$axios.$delete(`/products/me/${this.id}`)
        this.$router.push('/addProductForm')
      }
    },
    async showMessages() {
      const response = await this.$axios.$get(
        `/products/me/${this.id}/messages`
      )
      console.log(response)
      return response
    },
  },
}
</script>
