<template>
  <v-container
    ><v-row>
      <v-col cols="12" md="10" class="mx-auto">
        <h1>Busca los productos por isla o municipio</h1>

        <v-row>
          <v-col cols="12" md="4">
            <v-select
              v-model="selectedIsland"
              :items="islands"
              item-text="name"
              item-value="_id"
              label="Seleccionar Isla"
            >
            </v-select>
          </v-col>

          <v-col cols="12" md="4">
            <v-select
              v-model="selectedMunicipality"
              :items="selectedIslandItems"
              item-text="name"
              item-value="_id"
              label="Seleccionar Municipio"
            >
            </v-select>
          </v-col>
        </v-row>

        <v-btn
          @click="
            listByIsland()
            listByMunicipality()
          "
          >Buscar</v-btn
        >
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
export default {
  data() {
    return {
      islands: [],
      selectedIsland: '',
      municipalities: [],
      selectedMunicipality: '',
    }
  },
  computed: {
    selectedIslandItems() {
      return this.municipalities.filter(
        (item) =>
          item.islandCode._id.toString() === this.selectedIsland.toString()
      )
    },
  },
  async mounted() {
    this.islands = await this.getIslands()
    this.municipalities = await this.getMunicipalities()
  },
  methods: {
    async getIslands() {
      const response = await this.$axios.$get('/islands')
      return response
    },
    async getMunicipalities() {
      const response = await this.$axios.$get('/municipalities')
      return response
    },
    async listByIsland() {
      console.log(this.selectedIsland)
      const response = await this.$axios.$get(
        `/products/islands/${this.selectedIsland}`
      )
      console.log(response)
      return response
    },
    async listByMunicipality() {
      console.log(this.selectedMunicipality)
      const response = await this.$axios.$get(
        `/products/municipalities/${this.selectedMunicipality}`
      )
      console.log(response)
      return response
    },
  },
}
</script>
