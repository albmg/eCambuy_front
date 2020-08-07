<template>
  <v-container>
    <v-row>
      <v-col cols="12" md="6" class="mx-auto">
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

export default {
  middleware: 'auth',
  data() {
    return {
      profiles: '',
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
  },
}
</script>
