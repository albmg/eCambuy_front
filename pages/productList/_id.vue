<template>
  <v-container>
    <v-col cols="12" sm="10" md="10" lg="6" class="mx-auto">
      <!-- Product Card -->
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

        <v-img class="white--text align-end" height="200px" :src="image">
        </v-img>

        <v-card-title class="pb-0"
          ><v-icon left>mdi-fruit-watermelon</v-icon>{{ name }}
        </v-card-title>
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
      <!-- Start Chat -->
      <!--<div v-if="isAuthenticated">-->
      <v-btn class="mt-2" color="info" block @click="dialog = !dialog">
        <v-icon left>mdi-chat-outline</v-icon> Chat
      </v-btn>
      <!--</div>-->
      <v-dialog v-model="dialogMessage" max-width="680px" hide-overlay>
        <v-card class="text-center">
          <v-card-subtitle
            >Añade un mensaje para ponerte en contacto con el
            vendedor</v-card-subtitle
          >
          <v-text-field
            v-model="text"
            class="text-center"
            label="Añadir mensaje"
            outlined
          ></v-text-field>
          <v-col cols="12" md="6" class="mx-auto">
            <v-btn color="success" @click="startChat(owner._id)"
              ><v-icon left>mdi-send</v-icon>enviar</v-btn
            >
            <v-btn color="error" @click="dialogMessage = !dialogMessage"
              ><v-icon left>mdi-close</v-icon>cerrar</v-btn
            >
          </v-col>
        </v-card>
      </v-dialog>
    </v-col>
    <!-- Chat Messages -->
    <v-col cols="12" md="6">
      <v-dialog v-model="dialog" class="chat" max-width="520px">
        <div v-for="(message, idx) in messages" :key="idx" class="mb-2">
          <div
            v-if="
              loggedInUser._id === owner._id ||
              loggedInUser._id === message.userId._id ||
              loggedInUser._id === (message.toUserId && message.toUserId._id)
            "
          >
            <v-card>
              <v-btn small color="error" @click="dialog = !dialog"
                ><v-icon left>mdi-close</v-icon>Cerrar chat</v-btn
              >
              <v-list-item class="header-card">
                <v-list-item-avatar height="50" color="grey"
                  ><v-img :src="message.userId.photo"> </v-img
                ></v-list-item-avatar>
                <v-list-item-content>
                  <v-list-item-title class="headline">{{
                    message.userId.username
                  }}</v-list-item-title>
                  <v-list-item-subtitle>{{
                    new Date(message.date).toString().substr(0, 25)
                  }}</v-list-item-subtitle>
                  <!--<v-list-item-title class="headline"
                    >para ->
                    {{
                      message.toUserId && message.toUserId.username
                    }}</v-list-item-title
                  >-->
                </v-list-item-content>
              </v-list-item>
              <v-divider></v-divider>

              <v-card-title class="message-text">{{
                message.text
              }}</v-card-title>

              <div v-if="message.userId._id === loggedInUser._id">
                <v-card-actions>
                  <v-btn
                    small
                    class="mx-auto"
                    color="error"
                    @click="deleteMessage(message._id)"
                    ><v-icon left>mdi-delete</v-icon> borrar mensaje</v-btn
                  >
                </v-card-actions>
              </div>
              <v-divider></v-divider>
              <div v-if="message.userId._id !== loggedInUser._id">
                <v-card-text color="success"
                  ><v-text-field
                    v-model="text"
                    label="Responder mensaje"
                  ></v-text-field>
                </v-card-text>
                <v-card-actions>
                  <v-btn
                    small
                    class="mx-auto"
                    color="info"
                    @click="createMessage(message.userId._id)"
                    ><v-icon left>mdi-send</v-icon> Responder mensaje</v-btn
                  >
                </v-card-actions>
              </div>
            </v-card>
          </div>
        </div>
        <v-col class="mx-auto">
          <v-card>
            <v-card-subtitle class="text-center">
              Crea un nuevo chat y ponte en contacto con el vendedor, añadiendo
              un nuevo mensaje.
            </v-card-subtitle>
            <v-card-actions>
              <v-btn small color="info" @click="dialogMessage = !dialogMessage"
                ><v-icon left>mdi-message-plus-outline</v-icon>Añadir nuevo
                mensaje</v-btn
              >

              <v-spacer></v-spacer>
              <v-btn small color="error" @click="dialog = !dialog"
                ><v-icon left>mdi-close</v-icon>Cerrar</v-btn
              >
            </v-card-actions>
          </v-card>
        </v-col>
      </v-dialog>
    </v-col>
  </v-container>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  middleware: 'auth',
  async asyncData({ $axios, params }) {
    const response = await $axios.$get(`/products/${params.id}`)
    return { ...response }
  },
  data() {
    return {
      id: this.$route.params.id,
      dialog: false,
      dialogMessage: false,
      messages: [],
      text: '',
      sheet: false,
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
      console.log(response)
      return response
    },
    async startChat(ownerId) {
      const data = {
        text: this.text,
        toUserId: ownerId,
      }
      const response = await this.$axios.$post(
        `/products/me/${this.id}/messages`,
        data
      )
      window.location.reload()
      return response
    },
    async createMessage(userId) {
      const data = {
        text: this.text,
        toUserId: userId,
      }
      const response = await this.$axios.$post(
        `/products/me/${this.id}/messages`,
        data
      )
      window.location.reload()
      // window.scrollTo(0, document.body.scrollHeight)
      return response
    },
    async deleteMessage(id) {
      const response = confirm('Estás seguro de borrar el mensaje?')
      if (response) {
        await this.$axios.$delete(`/products/me/${this.id}/messages/${id}`)
      }
      window.location.reload()
    },
  },
}
</script>

<style scoped>
.date {
  font-size: 0.8em;
}
.message-text {
  font-style: italic;
  font-size: 1em;
}
.header-card {
  background-color: #52a297;
}
</style>
