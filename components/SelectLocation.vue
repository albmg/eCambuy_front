<template>
  <v-row>
    <v-col cols="12" md="4">
      <v-select
        :value="selectedIsland"
        :items="islands"
        item-text="name"
        item-value="_id"
        label="Seleccionar Isla"
        @input="setIsland"
      >
      </v-select>
    </v-col>

    <v-col cols="12" md="4">
      <v-select
        :value="selectedMunicipality"
        :items="showMunicipalities"
        item-text="name"
        item-value="_id"
        label="Seleccionar Municipio"
        @input="setMunicipality"
      >
      </v-select>
    </v-col>
  </v-row>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  name: 'SelectLocation',
  computed: {
    ...mapState([
      'islands',
      'municipalities',
      'selectedIsland',
      'selectedMunicipality',
    ]),
    showMunicipalities() {
      return this.municipalities.filter(
        (item) => item.islandCode._id === this.selectedIsland
      )
    },
  },
  mounted() {
    this.getIslands()
    this.getMunicipalities()
  },
  methods: {
    ...mapActions(['getIslands', 'getMunicipalities']),
    setIsland(val) {
      this.$store.commit('SET_ISLAND', val)
    },
    setMunicipality(val) {
      this.$store.commit('SET_MUNICIPALITY', val)
    },
  },
}
</script>
