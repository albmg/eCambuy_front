<template>
  <v-container>
    <v-col cols="12" sm="10" md="10" lg="6" class="mx-auto">
      <v-card>
        <v-list-item>
          <v-list-item-avatar height="50" color="grey"
            ><v-img :src="owner.photo"> </v-img
          ></v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title class="headline">{{
              owner && owner.username
            }}</v-list-item-title>
            <v-list-item-subtitle>{{
              new Date(createdDate).toString().substr(0, 15)
            }}</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
        <!--<v-card>
          <v-row class="mx-auto">
            <v-avatar class="ml-2 mt-4" height="50">
              <v-img :src="owner.photo"> </v-img>
            </v-avatar>
            <v-card-title>{{ owner && owner.username }}</v-card-title>
            <v-card-text class="date ml-14">{{
              new Date(createdDate).toString().substr(0, 15)
            }}</v-card-text>
          </v-row>
        </v-card>-->
        <v-img class="white--text align-end" height="200px" :src="image">
        </v-img>

        <v-card-title class="pb-0"
          ><v-icon left>mdi-fruit-watermelon</v-icon>{{ name }}</v-card-title
        >
        <v-divider></v-divider>
        <v-card-text color="blue" class="text--primary">
          <v-icon left>mdi-card-text-outline</v-icon> {{ description }}
        </v-card-text>
        <v-divider></v-divider>
        <v-card-subtitle class="pb-0"
          ><v-icon left>mdi-currency-eur</v-icon> Precio:
          {{ price }} Kg</v-card-subtitle
        >
        <v-card-subtitle class="pb-0 mb-2"
          ><v-icon left>mdi-google-maps</v-icon> Municipio:
          {{ location }}</v-card-subtitle
        >

        <v-card-actions>
          <!--<v-btn color="success" text to="/productList">
            Lista de productos
          </v-btn>
          <v-spacer></v-spacer>-->
          <v-col
            v-if="isAuthenticated && loggedInUser._id === owner._id"
            cols="12"
            md="12"
          >
            <v-divider></v-divider>
            <v-btn class="mb-2" block color="orange" @click="editProduct"
              ><v-icon left>mdi-clipboard-edit-outline</v-icon>Editar
              Producto</v-btn
            >

            <v-btn block color="error" @click="deleteProduct"
              ><v-icon left>mdi-delete</v-icon>Borrar Producto</v-btn
            >
          </v-col>
        </v-card-actions>
      </v-card>
      <div v-if="isAuthenticated">
        <v-btn class="mt-2" color="info" block @click="dialog = !dialog">
          <v-icon left>mdi-chat-outline</v-icon> Chat
        </v-btn>
      </div>
    </v-col>
    <v-col cols="12" md="6">
      <v-dialog v-model="dialog" class="chat" max-width="680px">
        <v-row cols="12" class="mx-auto">
          <v-btn color="info" @click="dialogMessage = !dialogMessage"
            ><v-icon left>mdi-message-plus-outline</v-icon>Añadir nuevo
            mensaje</v-btn
          >
          <v-spacer></v-spacer>
          <v-btn color="error" @click="dialog = !dialog"
            ><v-icon left>mdi-close</v-icon>Cerrar chat</v-btn
          >
        </v-row>

        <div v-for="(message, idx) in messages" :key="idx" class="mb-2">
          <div>
            <v-card>
              <v-card-subtitle>
                <v-img width="50" :src="message.userId.photo"></v-img>
                <p>
                  <strong>{{ message.userId.username }}</strong>
                </p>
                {{ new Date(message.date) }}
                <v-divider></v-divider>
              </v-card-subtitle>
              <v-card-title>{{ message.text }}</v-card-title>
              <v-card-actions>
                <v-btn
                  small
                  class="mx-auto"
                  color="error"
                  @click="deleteMessage(message._id)"
                  ><v-icon left>mdi-delete</v-icon> borrar mensaje</v-btn
                >
              </v-card-actions>
            </v-card>
          </div>
        </div>
      </v-dialog>
      <v-dialog v-model="dialogMessage" max-width="680px">
        <v-card class="text-center">
          <v-text-field v-model="text" label="Añadir mensaje"></v-text-field>
          <v-col cols="12" md="6" class="mx-auto">
            <v-btn color="success" @click="createMessage"
              ><v-icon left>mdi-send</v-icon>enviar</v-btn
            >
            <v-btn color="error" @click="dialogMessage = !dialogMessage"
              ><v-icon left>mdi-close</v-icon>cerrar</v-btn
            >
          </v-col>
        </v-card>
      </v-dialog>
    </v-col>
  </v-container>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  async asyncData({ $axios, params }) {
    const response = await $axios.$get(`/products/${params.id}`)
    console.log(response)
    return { ...response }
  },
  data() {
    return {
      id: this.$route.params.id,
      dialog: false,
      dialogMessage: false,
      messages: [],
      text: '',
    }
  },
  computed: {
    ...mapGetters(['isAuthenticated', 'loggedInUser']),
  },
  async created() {
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
      const response = await this.$axios.$get(`/products/${this.id}/messages`)
      // console.log(response)
      return response
    },
    async createMessage() {
      const data = {
        text: this.text,
      }
      const response = await this.$axios.$post(
        `/products/me/${this.id}/messages`,
        data
      )
      return response
    },
    async deleteMessage(id) {
      const response = confirm('Estás seguro de borrar el mensaje?')
      if (response) {
        await this.$axios.$delete(`/products/me/${this.id}/messages/${id}`)
      }
    },
  },
}
</script>

<style scoped>
.date {
  font-size: 0.8em;
}
</style>
