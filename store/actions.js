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

// export const listByMunicipality = async function ({ commit }, municipality) {
//  await this.$axios
//    .$get(`/products/municipalities/${municipality}`)
//    .then((response) => {
//      commit('SET_MUNICIPALITY', response)
//    })
// }

export const setProducts = function ({ commit }, municipality) {
  this.$axios
    .$get(`/products/municipalities/${municipality}`)
    .then((response) => {
      commit('SET_PRODUCTS', response)
    })
}
