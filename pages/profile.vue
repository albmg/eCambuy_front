<template>
  <v-container>
    <v-row>
      <v-col cols="12" md="6" class="mx-auto">
        <v-avatar size="50"
          ><v-img :src="loggedInUser.photo"> </v-img
        ></v-avatar>
        <SelectImage v-model="image" @imageURL="setImageURL" />
        <v-btn @click="addPhoto">Añadir foto</v-btn>

        <div class="mb-2">
          <strong>Username:</strong>
          {{ loggedInUser.username }}
        </div>

        <div class="mb-2">
          <strong>Email:</strong>
          {{ loggedInUser.email }}
        </div>
        <div class="mb-2">
          <strong>Fecha de registro:</strong>
          {{ new Date(loggedInUser.signUpDate) }}
        </div>
        <v-divider></v-divider>
        <p class="mt-2"><strong>Productos creados</strong></p>
        <div v-for="(profile, idx) in profiles" :key="idx">
          <v-col cols="12" md="12">
            <v-btn
              color="success"
              block
              class="mb-2"
              @click="showProduct(profile._id)"
            >
              {{ profile.name }} <v-spacer></v-spacer>
              {{ new Date(profile.createdDate) }}
            </v-btn>
          </v-col>
        </div>
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
      console.log(response.productsCreated)
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
      console.log(response)
      return response
    },
    setImageURL(imageURL) {
      this.image = imageURL
    },
  },
}
</script>
