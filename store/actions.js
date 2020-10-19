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

export const setProducts = function ({ commit }, municipality) {
  this.$axios
    .$get(`/products/municipalities/${municipality}`)
    .then((response) => {
      commit('SET_PRODUCTS', response)
    })
}

export const getProcedures = function ({ commit }) {
  this.$axios.$get('/procedures').then((response) => {
    commit('SET_PROCEDURES', response)
  })
}

export const setProductsByProcedure = function (
  { commit },
  { municipality, procedure }
) {
  this.$axios
    .$get(`/products/municipalities/${municipality}/procedures/${procedure}`)
    .then((response) => {
      commit('SET_PRODUCTS', response)
    })
}
