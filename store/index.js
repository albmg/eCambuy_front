export const getters = {
  isAuthenticated(state) {
    return state.auth.loggedIn
  },

  loggedInUser(state) {
    return state.auth.user
  },

  getProducts(state) {
    return state.products
  },

  getProducts2(state) {
    return state.products2
  },

  getSelectedIsland(state) {
    return state.selectedIsland
  },

  getSelectedProcedure(state) {
    return state.selectedProcedure
  },
}
