<template>
  <div>
    <v-col cols="12" md="4">
      <v-select
        :value="selectedProcedure"
        :items="procedures"
        item-text="procedureName"
        item-value="_id"
        label="Seleccionar trámite"
        :clearable="true"
        @input="setTag"
      >
      </v-select>
    </v-col>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  name: 'SelectProcedure',
  computed: {
    ...mapState(['procedures', 'selectedProcedure']),
  },
  mounted() {
    this.getProcedures()
  },
  methods: {
    ...mapActions(['getProcedures']),
    setTag(val) {
      this.$store.commit('SET_PROCEDURE', val)
    },
  },
}
</script>
