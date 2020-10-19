<template>
  <v-container>
    <v-col cols="12" sm="10" md="10" lg="6" class="mx-auto">
      <!-- Product Card -->
      <v-card>
        <v-col>
          <v-list-item>
            <v-list-item-avatar height="50" color="grey"
              ><v-img :src="owner.photo"> </v-img
            ></v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-title class="onwer-headline headline">{{
                owner && owner.username
              }}</v-list-item-title>
              <v-list-item-subtitle>{{
                new Date(createdDate).toString().substr(0, 15)
              }}</v-list-item-subtitle>
            </v-list-item-content>
            <v-list-item-action>
              <v-btn text @click="addFavProduct(id)">
                <div v-if="isFavourite">
                  <v-icon class="mdi-36px" color="#5c8d89"
                    >mdi-fruit-grapes-outline</v-icon
                  >
                </div>
                <div v-else><v-icon>mdi-fruit-grapes-outline</v-icon></div>
              </v-btn>
            </v-list-item-action>
          </v-list-item>
        </v-col>

        <v-img class="white--text align-end" height="200px" :src="image">
        </v-img>

        <v-card-title class="pb-0"
          ><v-icon color="#5c8d89" left>mdi-fruit-watermelon</v-icon>{{ name }}
        </v-card-title>
        <v-divider></v-divider>
        <v-card-text color="blue" class="text--primary">
          <v-icon color="#5c8d89" left>mdi-card-text-outline</v-icon>
          {{ description }}
        </v-card-text>
        <v-divider></v-divider>
        <v-card-subtitle class="pb-0"
          ><v-icon color="#5c8d89" left>mdi-currency-eur</v-icon>
          {{ price }} Kg</v-card-subtitle
        >
        <v-card-subtitle class="pb-0 mb-2"
          ><v-icon color="#5c8d89" left>mdi-google-maps</v-icon>
          {{ location.name }} - {{ productIsland.name }}</v-card-subtitle
        >

        <!-- Edit & delete product menu-->
        <v-card-actions>
          <v-col
            v-if="isAuthenticated && loggedInUser._id === owner._id"
            cols="12"
            md="12"
            ><v-divider></v-divider>
            <v-expansion-panels>
              <v-expansion-panel>
                <v-expansion-panel-header>
                  <strong>Opciones</strong></v-expansion-panel-header
                >
                <v-divider></v-divider>

                <v-expansion-panel-content class="text-center">
                  <v-btn
                    class="mb-2"
                    block
                    color="warning"
                    text
                    @click="editProduct"
                    ><v-icon left>mdi-clipboard-edit-outline</v-icon>Editar
                    Producto</v-btn
                  >
                  <v-divider></v-divider>

                  <v-btn block color="error" text @click="deleteProduct"
                    ><v-icon left>mdi-delete</v-icon>Borrar Producto</v-btn
                  >
                </v-expansion-panel-content>
              </v-expansion-panel>
            </v-expansion-panels>
            <v-divider></v-divider>
          </v-col>
        </v-card-actions>
      </v-card>
      <!-- Start Chat -->

      <v-btn class="mt-2" color="#ffa83a" block @click="dialog = !dialog">
        <v-icon left>mdi-chat-outline</v-icon> Chat
      </v-btn>

      <v-dialog v-model="dialogMessage" max-width="680px" hide-overlay>
        <v-card class="text-center">
          <v-card-subtitle
            >Añade un mensaje para ponerte en contacto con el
            vendedor</v-card-subtitle
          >
          <v-text-field
            v-model="text"
            class="text-center"
            color="#a7d7c5"
            label="Añadir mensaje"
            outlined
          ></v-text-field>
          <v-col cols="12" md="6" class="mx-auto">
            <v-btn color="#74b49b" text @click="startChat(owner._id)"
              ><v-icon left>mdi-send</v-icon>enviar</v-btn
            >
            <v-btn color="error" text @click="dialogMessage = !dialogMessage"
              ><v-icon left>mdi-close</v-icon>cerrar</v-btn
            >
          </v-col>
        </v-card>
      </v-dialog>
    </v-col>
    <!-- Chat Messages -->
    <v-col cols="12" md="6">
      <v-dialog v-model="dialog" class="chat" max-width="680px">
        <v-btn small color="error" @click="dialog = !dialog"
          ><v-icon left>mdi-close</v-icon>Cerrar chat</v-btn
        >
        <div v-for="(message, idx) in messages" :key="idx" class="mb-2">
          <div
            v-if="
              loggedInUser._id === owner._id ||
              loggedInUser._id === message.userId._id ||
              loggedInUser._id === (message.toUserId && message.toUserId._id)
            "
          >
            <v-card>
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

              <div v-if="message.userId._id === loggedInUser._id">
                <v-card-title class="message-text">{{
                  message.text
                }}</v-card-title>
                <v-card-actions class="mt-4">
                  <v-btn
                    small
                    class="mx-auto"
                    color="error"
                    @click="deleteMessage(message._id)"
                    ><v-icon left>mdi-delete</v-icon> borrar mensaje</v-btn
                  >
                </v-card-actions>
              </div>
              <div v-else>
                <v-card-title class="message-to">{{
                  message.text
                }}</v-card-title>
                <v-card-text color="#a7d7c5"
                  ><v-text-field
                    v-model="text"
                    label="Responder mensaje"
                  ></v-text-field>
                </v-card-text>
                <v-card-actions>
                  <v-btn
                    small
                    class="mx-auto"
                    color="#a7d7c5"
                    @click="createMessage(message.userId._id)"
                    ><v-icon left>mdi-send</v-icon> Responder mensaje</v-btn
                  >
                </v-card-actions>
              </div>

              <!--<div v-if="message.userId._id === loggedInUser._id"></div>
              <v-divider></v-divider>
              <div v-if="message.userId._id !== loggedInUser._id">
              </div>-->
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
              <v-btn
                small
                color="#74b49b"
                text
                @click="dialogMessage = !dialogMessage"
                ><v-icon left>mdi-message-plus-outline</v-icon>Añadir nuevo
                mensaje</v-btn
              >

              <v-spacer></v-spacer>
              <v-btn small color="error" text @click="dialog = !dialog"
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
    // console.log('-', params.id)
    const response = await $axios.$get(`/products/${params.id}`)
    // console.log('aqui', response)

    return response
  },
  data() {
    return {
      id: this.$route.params.id,
      dialog: false,
      dialogMessage: false,
      messages: [],
      text: '',
      sheet: false,
      isFavourite: false,
    }
  },
  computed: {
    ...mapGetters(['isAuthenticated', 'loggedInUser']),
  },
  async created() {
    this.messages = await this.showMessages()
    this.isFavourite = this.loggedInUser.favouriteProducts.includes(this.id)
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

      return response
    },
    async startChat(ownerId) {
      const data = {
        text: this.text,
        toUserId: ownerId,
      }

      await this.$axios.$post(`/products/me/${this.id}/messages`, data)
      window.location.reload()
    },
    async createMessage(userId) {
      const data = {
        text: this.text,
        toUserId: userId,
      }

      await this.$axios.$post(`/products/me/${this.id}/messages`, data)
      window.location.reload()
    },
    async deleteMessage(id) {
      const response = confirm('Estás seguro de borrar el mensaje?')
      if (response) {
        await this.$axios.$delete(`/products/me/${this.id}/messages/${id}`)
      }
      window.location.reload()
    },
    addFavProduct(id) {
      const data = {
        productId: id,
      }
      this.$axios.$post('/users/me/products', data).then(() => {
        this.isFavourite = !this.isFavourite
      })
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
.message-to {
  font-style: italic;
  font-size: 1em;
  color: #eee;
  background-color: #5c8d89;
}
.header-card {
  background-color: #a7d7c5;
}
.owner-headline {
  color: '#5c8d89';
}
</style>
