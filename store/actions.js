export const getIslands = function ({ commit }) {
  this.$axios.$get('/islands').then((response) => {
    commit('SET_ISLANDS', response)
  })
}

export const getMunicipalities = function ({ commit }) {
  this.$axios.$get('/municipalities').then((response) => {
    commit('SET_MUNICIPALITIES', response)
  })
}

// export const listByMunicipality = function ({ commit }, selectedMunicipality) {
//  this.$axios
//    .$get(`/products/municipalities/${this.selectedMunicipality}`)
//    .then((response) => {
//      commit('SET_MUNICIPALITY', response)
//    })
// }
