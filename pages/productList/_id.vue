<template>
  <v-container>
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
          <!--<v-btn color="success" text to="/productList">
            Lista de productos
          </v-btn>
          <v-spacer></v-spacer>-->
          <v-col
            v-if="isAuthenticated && loggedInUser._id === owner._id"
            cols="12"
            md="12"
          >
            <v-btn class="mb-2" block color="orange" @click="editProduct"
              >Editar Producto</v-btn
            >

            <v-btn block color="error" @click="deleteProduct"
              >Borrar Producto</v-btn
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
                  color="warning"
                  @click="dialogEditMessage = !dialogEditMessage"
                  ><v-icon left>mdi-clipboard-edit</v-icon> editar
                  mensaje</v-btn
                >
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
      <v-dialog v-model="dialogEditMessage" max-width="680px">
        <v-card class="text-center">
          <v-text-field v-model="text" label="Editar mensaje"></v-text-field>
          <v-col cols="12" md="6" class="mx-auto">
            <v-btn color="success" @click="editMessage(message._id)"
              ><v-icon left>mdi-send</v-icon>Aceptar</v-btn
            >
            <v-btn color="error" @click="dialogEditMessage = !dialogEditMessage"
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
    return { ...response }
  },
  data() {
    return {
      id: this.$route.params.id,
      dialog: false,
      dialogMessage: false,
      dialogEditMessage: false,
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
    async editMessage(id) {
      const data = {
        text: this.text,
      }
      await this.$axios.$put(`/products/me/${this.id}/messages/${id}`, data)
    },
  },
}
</script>

<style scoped>
.chat {
  position: absolute;
  top: 50px;
}
</style>
