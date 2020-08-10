<template>
  <v-container>
    <v-row>
      <v-col cols="12" md="5" class="mx-auto">
        <v-card>
          <v-card-title>Perfil de usuario</v-card-title>
          <v-divider></v-divider>
          <div>
            <v-avatar class="mt-2" size="100"
              ><v-img :src="loggedInUser.photo"> </v-img>
            </v-avatar>
          </div>

          <v-card-title>
            {{ loggedInUser.username }}
          </v-card-title>

          <v-card-subtitle>
            {{ loggedInUser.email }}
          </v-card-subtitle>
          <v-card-subtitle class="mb-2">
            <strong>Fecha de registro:</strong>
            {{ new Date(loggedInUser.signUpDate) }}
          </v-card-subtitle>
          <v-card-actions>
            <SelectImage v-model="image" @imageURL="setImageURL" />
            <v-btn small class="mb-6" color="success" @click="addPhoto"
              >Actualizar foto</v-btn
            >
          </v-card-actions>
        </v-card>

        <v-card>
          <v-card-title class="mt-2"
            ><strong>Productos creados</strong></v-card-title
          >
          <v-divider></v-divider>
          <v-card-subtitle v-for="(profile, idx) in profiles" :key="idx">
            <p>
              <strong>{{ profile.name }}</strong>
            </p>
            <p>{{ new Date(profile.createdDate) }}</p>
            <v-btn
              class="mb-2"
              color="teal"
              dark
              @click="showProduct(profile._id)"
              ><v-icon left>mdi-eye</v-icon> Ver producto</v-btn
            >
            <v-divider></v-divider>
          </v-card-subtitle>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapGetters } from 'vuex'
import SelectImage from '~/components/SelectImage'

export default {
  middleware: 'auth',
  components: SelectImage,
  data() {
    return {
      profiles: '',
      image: '',
    }
  },
  computed: {
    ...mapGetters(['loggedInUser']),
  },
  async mounted() {
    this.profiles = await this.getProfile()
  },
  methods: {
    async getProfile() {
      const response = await this.$axios.$get('/users/me/')
      // console.log(response.productsCreated)
      return response.productsCreated
    },
    showProduct(id) {
      this.$router.push(`/productList/${id}`)
    },
    async addPhoto() {
      const photoData = {
        photo: this.image,
      }
      const response = await this.$axios.$put('/users/me/', photoData)
      // console.log(response)
      return response
    },
    setImageURL(imageURL) {
      this.image = imageURL
    },
  },
}
</script>
