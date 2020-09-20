<template>
  <v-container>
    <v-row>
      <v-col cols="12" sm="8" md="6" class="mx-auto">
        <v-card>
          <v-card-title class="perfil"
            ><strong>Perfil de usuario</strong></v-card-title
          >
          <v-divider></v-divider>
          <div>
            <v-avatar class="mt-2 ml-2" size="100"
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
            {{ new Date(loggedInUser.signUpDate).toString().substr(0, 15) }}
          </v-card-subtitle>
          <v-card-actions>
            <v-col>
              <SelectImage v-model="image" @imageURL="setImageURL" />
              <v-btn small class="mb-6" color="#a7d7c5" @click="addPhoto"
                ><v-icon left>mdi-cloud-upload</v-icon>Actualizar foto</v-btn
              >
            </v-col>
          </v-card-actions>
        </v-card>

        <v-card>
          <v-card-title class="product-created mt-2"
            ><strong>Productos creados</strong></v-card-title
          >
          <v-divider></v-divider>

          <v-expansion-panels :hover="hover">
            <v-expansion-panel v-for="(profile, idx) in profiles" :key="idx">
              <v-expansion-panel-header
                ><strong>{{ profile.name }}</strong></v-expansion-panel-header
              >
              <v-expansion-panel-content class="text-center">
                {{ new Date(profile.createdDate).toString().substr(0, 15) }}

                <v-btn
                  class="mb-2 ml-10"
                  color="#5c8d89"
                  small
                  dark
                  @click="showProduct(profile._id)"
                  ><v-icon left>mdi-eye</v-icon> Ver producto</v-btn
                >
              </v-expansion-panel-content>
            </v-expansion-panel>
          </v-expansion-panels>
        </v-card>
        <v-card>
          <v-card-title class="fav-products mt-2"
            ><strong>Favoritos</strong></v-card-title
          >
          <v-divider></v-divider>

          <v-expansion-panels>
            <v-expansion-panel
              v-for="(favourite, idx) in favourites"
              :key="idx"
            >
              <v-expansion-panel-header>
                <strong>{{ favourite.name }}</strong></v-expansion-panel-header
              >
              <v-expansion-panel-content class="text-center">
                {{ new Date(favourite.createdDate).toString().substr(0, 15) }}
                <v-btn
                  class="mb-2 ml-10"
                  color="#5c8d89"
                  dark
                  small
                  @click="showProduct(favourite._id)"
                  ><v-icon left>mdi-eye</v-icon> Ver producto</v-btn
                >
              </v-expansion-panel-content>
            </v-expansion-panel>
          </v-expansion-panels>
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
      favourites: '',
      hover: true,
    }
  },
  computed: {
    ...mapGetters(['loggedInUser']),
  },
  async mounted() {
    this.profiles = await this.getProfile()
    this.favourites = await this.getFavourites()
  },
  methods: {
    async getProfile() {
      const response = await this.$axios.$get('/users/me/')
      // console.log(response)
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
      window.location.reload()
      return response
    },
    setImageURL(imageURL) {
      this.image = imageURL
    },
    async getFavourites() {
      const response = await this.$axios.$get('/users/me')
      return response.favouriteProducts
    },
  },
}
</script>

<style scoped>
.product-created,
.fav-products,
.perfil {
  color: #74b49b;
  background-color: #e4e3e3;
}
</style>
